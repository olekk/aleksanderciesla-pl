// Formularz kontaktowy: walidacja, filtr spamu, zapis w D1 i powiadomienie mailem.
// Oba wiązania (DB, MAILER) są opcjonalne, dopóki domena i baza nie są skonfigurowane:
// zgłoszenie jest przyjęte, jeśli udało się je zapisać ALBO wysłać.
import { EmailMessage } from 'cloudflare:email';

export interface FormEnv {
  DB?: D1Database;
  MAILER?: SendEmail;
  MAIL_FROM?: string;
  MAIL_TO?: string;
}

type Payload = Record<string, unknown>;

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function handleForm(request: Request, env: FormEnv): Promise<Response> {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  const imie = str(body.imie, 80);
  const firma = str(body.firma, 120);
  const telefon = str(body.telefon, 30);
  const email = str(body.email, 120);
  const wiadomosc = str(body.wiadomosc, 3000);
  const uslugi = Array.isArray(body.uslugi) ? body.uslugi.map((u) => str(u, 40)).filter(Boolean).slice(0, 8) : [];

  // Spam: wypełnione ukryte pole, wysyłka szybciej niż 3 s po wczytaniu strony albo dużo linków.
  const t = Number(body.t);
  const tooFast = Number.isFinite(t) && t > 0 && Date.now() - t < 3000;
  const links = (wiadomosc.match(/https?:\/\//g) || []).length;
  if (str(body.strona_www, 200) || tooFast || links > 3) {
    return json({ ok: true }); // botowi udajemy sukces
  }

  if (!imie || (!telefon && !email)) return json({ ok: false, error: 'missing_fields' }, 422);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: 'bad_email' }, 422);

  const strona = request.headers.get('Referer') || '';
  let saved = false;
  let sent = false;
  let error = '';

  if (env.MAILER && env.MAIL_FROM && env.MAIL_TO) {
    try {
      const lang = /\/en\//.test(strona) ? '[EN] ' : '';
      const subject = `${lang}Nowe zapytanie ze strony: ${imie}${firma ? ` (${firma})` : ''}`;
      const text = [
        `Imię: ${imie}`,
        `Firma / strona: ${firma || '-'}`,
        `Telefon: ${telefon || '-'}`,
        `E-mail: ${email || '-'}`,
        `Interesuje go: ${uslugi.join(', ') || '-'}`,
        '',
        wiadomosc || '(bez wiadomości)',
        '',
        `Wysłano z: ${strona}`,
      ].join('\n');
      await env.MAILER.send(new EmailMessage(env.MAIL_FROM, env.MAIL_TO, mime(env.MAIL_FROM, env.MAIL_TO, subject, text, email)));
      sent = true;
    } catch (e) {
      error = String(e).slice(0, 500);
    }
  }

  if (env.DB) {
    try {
      await env.DB.prepare(
        'INSERT INTO zgloszenia (imie, firma, telefon, email, uslugi, wiadomosc, strona, mail_wyslany, blad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      )
        .bind(imie, firma, telefon, email, uslugi.join(', '), wiadomosc, strona, sent ? 1 : 0, error || null)
        .run();
      saved = true;
    } catch (e) {
      console.error('D1 insert failed', e);
    }
  }

  if (!saved && !sent) {
    console.error('Formularz: brak zapisu i maila', error);
    return json({ ok: false, error: 'not_configured' }, 503);
  }
  return json({ ok: true });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

// Minimalna wiadomość MIME w UTF-8 (polskie znaki w temacie i treści).
function mime(from: string, to: string, subject: string, text: string, replyTo: string) {
  const b64 = (s: string) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
  const body = b64(text).replace(/.{76}/g, '$&\r\n');
  return [
    `From: Strona aleksanderciesla.pl <${from}>`,
    `To: ${to}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: =?UTF-8?B?${b64(subject)}?=`,
    `Message-ID: <${crypto.randomUUID()}@${from.split('@')[1]}>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    body,
  ].join('\r\n');
}
