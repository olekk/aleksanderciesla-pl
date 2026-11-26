# STAN – aleksanderciesla.pl

Ostatnia aktualizacja: 26.11.2026 (przebudowa: ciemny motyw Liquid Glass, nowe treści, formularz; czeka na dane od Olka i podpięcie Cloudflare).

| #   | Do zrobienia                                                         | Kto  | Stan |
| --- | -------------------------------------------------------------------- | ---- | ---- |
| 1   | Szkielet Astro + Worker (noindex poza domeną, www → apex)            | Claude | ✅ |
| 2   | Strona główna (sekcje 1-10 z planu), /art-papier/, /hc-instal/, /strony/ | Claude | ✅ |
| 3   | Nagrania stron skompresowane do `site/public/media/` (26 MB)         | Claude | ✅ |
| 4   | Telefon, mail, zdjęcie, dane do faktur w `site/src/config/site.ts`   | Olek | ⏳ |
| 5   | Zgoda Flawiusza na case study + cytat (`site/src/data/projects.ts`)  | Olek | ⏳ |
| 6   | Zgoda byłego szefa agencji (+ nazwa agencji)                         | Olek | ⏳ |
| 7   | Pierwszy deploy na Cloudflare (podgląd workers.dev)                  | Olek | ⏳ |
| 8   | Kupno domeny, DNS na Cloudflare, custom domain                       | Olek | później |
| 9   | Formularz kontaktowy (Worker + D1 + Email Routing) – kod gotowy      | Claude | ✅ |
| 10  | Baza D1 i Email Routing dla formularza (TODO.md)                     | Olek | ⏳ |

## Dziennik zmian

- 26.11.2026 – Na prośbę Olka: ciemny motyw w stylu Liquid Glass, treść przepisana pod sprzedaż, usunięta sekcja „Co nie wyszło”, HC INSTAL jako osobna firma (bez wzmianki o zarządzie), stopka bez zdania o ciasteczkach, marketing 2 500 zł, budżet reklam od ok. 300 zł, formularz kontaktowy (sekcja 0b).
- 25.11.2026 – Pierwsza wersja strony wg planu (https://claude.ai/artifact/3zDWoqhtv7JazgwNF9h737), nagrania 9 stron, CLAUDE.md z Kartą projektu.

## 0a. Decyzje Claude (do korekty)

- Zwracamy się na „Ty” (plan zostawiał „Ty” / „Państwo” do decyzji).
- Zamówienie Gminy Chełmiec opisane bez nazwy gminy („zamówienie od samorządu … ok. 3 000 zł”), bo zgoda i netto/brutto niepotwierdzone.
- „Bez umowy na rok” włączone flagą `noLongContract` w `site.ts` – do potwierdzenia.
- Fonty systemowe (szeryfowe nagłówki, bezszeryfowy tekst) – zero plików fontów, szybciej.
- Sekcja „Co mówią klienci” ukryta, dopóki `quotes` w `projects.ts` jest puste.

## 0b. Przebudowa 26.11.2026

- Źródło: wiadomość Olka z 26.11.2026 (styl Liquid Glass, dark, bardziej sprzedażowo, formularz).
- Nowe sekcje: hero z kartą wyników, pasek firm, „Brzmi znajomo?”, 6 usług, sekcja o widoczności w AI, realizacje, jak pracuję (4 kroki), ceny, o mnie, FAQ (z FAQPage JSON-LD), kontakt z formularzem.
- Formularz: `POST /api/kontakt` w Workerze (`site/worker/form.ts`), honeypot + limit czasu + limit linków, zapis w D1 (`migrations/0001_zgloszenia.sql`), mail przez Cloudflare Email Routing (`send_email`). Bez skonfigurowanej bazy i maila zwraca 503, a strona pokazuje adres e-mail.
- Decyzje Claude (do korekty): plakietka „Tu widać efekty” przy marketingu; obietnica „odezwę się najpóźniej następnego dnia roboczego” po wysłaniu formularza; font Inter (lokalnie, @fontsource); odpowiedź ChatGPT pokazana jako streszczenie, nie cytat.
