# STAN – aleksanderciesla.pl

Ostatnia aktualizacja: 25.11.2026 (wersja minimum zbudowana, czeka na dane od Olka i podpięcie Cloudflare).

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
| 9   | Formularz kontaktowy (Worker + D1 + SMTP)                            | Claude | później |

## Dziennik zmian

- 25.11.2026 – Pierwsza wersja strony wg planu (https://claude.ai/artifact/3zDWoqhtv7JazgwNF9h737), nagrania 9 stron, CLAUDE.md z Kartą projektu.

## 0a. Decyzje Claude (do korekty)

- Zwracamy się na „Ty” (plan zostawiał „Ty” / „Państwo” do decyzji).
- Zamówienie Gminy Chełmiec opisane bez nazwy gminy („zamówienie od samorządu … ok. 3 000 zł”), bo zgoda i netto/brutto niepotwierdzone.
- „Bez umowy na rok” włączone flagą `noLongContract` w `site.ts` – do potwierdzenia.
- Fonty systemowe (szeryfowe nagłówki, bezszeryfowy tekst) – zero plików fontów, szybciej.
- Sekcja „Co mówią klienci” ukryta, dopóki `quotes` w `projects.ts` jest puste.
