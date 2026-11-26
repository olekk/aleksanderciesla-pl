# Start nowej strony – Astro + Cloudflare (instrukcja dla Claude Code)

Wzorzec na podstawie projektów: `seedpaper/seedpaper-astro` (migracja WordPress → Astro 1:1, wersje PL/EN/DE, sklep
ze Stripe i InPost), `seedpaper/printseedpaper.eu` (nowa strona NL/EN z uwag konsultanta) i
`seedpaper/pokazyedukacyjne.pl/pokazyedukacyjne.pl-astro` (pierwsza migracja, z której pochodzą skrypty).

**Jak użyć:** skopiuj ten plik do nowego repo jako `CLAUDE.md`, wypełnij „Kartę projektu” (sekcja 1), resztę zostaw.
Zasady z sekcji 2–17 obowiązują w każdym projekcie, chyba że Karta projektu mówi inaczej. Gdy w trakcie pracy
zapada trwała decyzja dla tego projektu, dopisz ją do Karty albo do sekcji „Zasady projektu” na końcu.

---

## 1. Karta projektu (wypełnić na starcie)

| Pole                 | Wartość                                                                                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nazwa / domena       | `aleksanderciesla.pl`, kanoniczna **bez `www`** (`www` → 301 na apex w Workerze). Domena jeszcze niekupiona (25.11.2026), rejestrator PL (lh.pl), DNS na Cloudflare                                   |
| Właściciel i kontakt | Aleksander (Olek) Cieśla – decyduje i akceptuje treści                                                                                                                                              |
| Tryb                 | **B** – nowa strona na podstawie źródeł (portfolio / wizytówka osobista, nie agencja)                                                                                                               |
| Źródła               | Plan strony: https://claude.ai/artifact/3zDWoqhtv7JazgwNF9h737 (25.11.2026); eksport Art Papier i kontekst „Mój Marketing” (projekt Claude); nagrania stron `portfolio-nagrania/*.mp4` (desktop + mobile) |
| Języki               | tylko polski                                                                                                                                                                                         |
| Tagi i pomiar        | brak GTM/GA4/Ads na start; Cloudflare Web Analytics (bez ciasteczek, bez banera) – token w `site/src/config/site.ts`                                                                                 |
| Formularze           | kontakt: `POST /api/kontakt` w Workerze → D1 + Cloudflare Email Routing (`send_email`, domena bez skrzynki pocztowej)                                                                             |
| Sklep                | nie                                                                                                                                                                                                  |
| Repo / Worker        | `github.com/olekk/aleksanderciesla-pl` (prywatne), Worker `aleksanderciesla-pl` (+ `aleksanderciesla-pl-podglad`) na koncie Cloudflare `teletubis28`                                               |
| Port lokalny         | **4323**                                                                                                                                                                                             |
| Termin               | wersja minimum do wysłania Flawiuszowi Pietrzykowi (Art Papier) – jak najszybciej, koniec listopada 2026                                                                                             |
---

## 2. Źródła danych i ich hierarchia

1. **Żywa strona = źródło prawdy** (tryb A). Tylko ją czytamy, nigdy nic na niej nie zmieniamy (żadnych zmian
   w panelu CMS, wtyczkach, DNS przed przepięciem). HTML i zrzuty zawsze z sesji **niezalogowanej**.
   Kopia HTML w `wp-live/` (lub `live/`), poza gitem.
2. **Backup** (np. `.wpress`, zrzut bazy) – źródło oryginałów zdjęć w pełnej rozdzielczości, ustawień formularzy,
   fontów. Poza gitem (`wp-backup/`). Treść bierzemy z żywej strony (backup bywa starszy).
3. **Ustalenia z właścicielem** – `ustalenia/MM-DD-RR-konsultacja.txt` (transkrypty rozmów, na początku bywa
   wklejona treść maili), zdjęcia od właściciela w `ustalenia/zdj-<data>/` (nazwy plików = tytuły maili / wskazówki).
   Folder w `.gitignore` (hasła, dane osobowe) – nie commitować, nie przepisywać haseł do repo ani odpowiedzi.
4. **Zadania z czatu Claude** – `Claude outputs/zadania-dla-claude-code-RRRR-MM-DD.md` + gotowe treści
   (`*.md` z frontmatterem: tytuł, opis do meta description, adres, data). Wykonywać po kolei; zadanie z datą
   „nie wcześniej niż” – nie ruszać przed tą datą.
5. **Inspiracje** (tryb B) – adresy stron wzorcowych: bierzemy pomysł (układ, mikroanimacja, sposób pokazania
   informacji), nie kopiujemy grafiki ani tekstów. Każdą zapożyczoną ideę zapisać w `docs/PROJEKT.md` w tabeli
   „uwaga / źródło → rozwiązanie”.

Każda decyzja w dokumentacji ma źródło: plik ustaleń, mail, zadanie albo „decyzja Claude (do ewentualnej korekty)”.

---

## 3. Tryb „prawie 1:1” – ile podobieństwa

- Cel: kopia **wizualna** (układ, fonty, kolory, odstępy, hovery, animacje, działanie JS), nie kopia DOM.
  Struktury page buildera (zagnieżdżone `div`, klasy `elementor-*`) nie przenosimy ręcznie; jeśli konwerter
  przenosi CSS oryginału, klasy zmieniamy na krótkie (`elementor-*` → `el-*`) przy tej samej specyficzności.
- **Prawie 1:1, nie za wszelką cenę.** Detal odtwarzamy wiernie, jeśli to proste. Jeśli wierność wymaga
  nieproporcjonalnie dużo CSS/JS (hacki, kilkaset linii pod jeden efekt, ciężka biblioteka, gorszy Lighthouse) –
  robimy wersję podobną i prostszą, a różnicę wpisujemy do `RAPORT.md` → „Świadome różnice względem oryginału”.
- Błędy oryginału (np. niedziałające menu mobilne, ucięte karty, podwójne tagi) naprawiamy i też wpisujemy do
  „Świadomych różnic”.
- **Zero poprawek designu**, dopóki strona nie jest gotowa. Pomysły na ulepszenia → `POPRAWKI.md` (nie wdrażać
  bez zgody). Wyjątek: wyraźne polecenie właściciela / Aleksandra – wtedy zapis „na prośbę … (data)”.
- Rama strony (nagłówek, menu, stopka) – własne komponenty z pomiarów; treść stron – z konwertera albo ręcznie.
- Weryfikacja: zrzuty 1440 / 768 / 390 px, pixelmatch, oględziny. Cel orientacyjny ≥ 90% identycznych pikseli
  (różnice z kompresji zdjęć, animacji i okładek wideo są dopuszczalne).

---

## 4. Stos technologiczny (domyślny – zmieniamy tylko, gdy w danym przypadku coś jest wyraźnie lepsze)

| Warstwa   | Wybór                                                          | Uwagi                                                                             |
| --------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Strona    | **Astro** (najnowsza stabilna), `output: 'static'`, TypeScript | bez frameworka UI; JS tylko jako małe skrypty (wyspy) bez jQuery                  |
| Hosting   | **Cloudflare Workers** (statyka z `dist/` + Worker)            | nie Pages; `wrangler.jsonc`                                                       |
| Backend   | Worker w `site/worker/`                                        | formularze, przekierowania, noindex na podglądach, API sklepu, crony              |
| Baza      | **D1**                                                         | zgłoszenia, rejestr zgód, zamówienia; migracje w `site/migrations/NNNN_nazwa.sql` |
| Pliki     | **R2**                                                         | załączniki formularzy, projekty PDF zamówień, duże wideo                          |
| Poczta    | SMTP z Workera (`worker-mailer`, `cloudflare:sockets`)         | skrzynka `formularz@domena` na serwerze z rekordu MX                              |
| Płatności | **Stripe Checkout**                                            | metody: BLIK, karta, Apple Pay, Link (Klarna wg decyzji)                          |
| Wysyłka   | **InPost ShipX** (+ mapa paczkomatów Geowidget)                | nadawanie z linku w mailu do sklepu                                               |
| Zdjęcia   | `astro:assets` + sharp                                         | AVIF/WebP/JPG, srcset, LQIP                                                       |
| Testy     | Playwright (+ axe), `node --test` dla logiki (ceny)            | skrypty w `scripts/`                                                              |
| Narzędzia | Python 3 (konwerter, inwentarz, zdjęcia), Node 24              | `.nvmrc` = 24                                                                     |
| Pakiety   | npm (pnpm też działa – printseedpaper)                         | jeden menedżer na projekt                                                         |

Node: `source ~/.nvm/nvm.sh && nvm use 24` przed komendami Astro / wrangler.

---

## 5. Struktura repo

```
CLAUDE.md          ten plik (Karta + zasady)
PLAN.md            plan prac i decyzje właściciela z planowania
STAN.md            tablica stanu + dziennik zmian (w sklepie: SKLEP.md) – pierwsze miejsce do czytania
TODO.md            zadania ręczne (konta, panele, DNS, sekrety) – kto / co / stan
RAPORT.md          raport dla właściciela: co zrobione, Lighthouse przed/po, świadome różnice, co po jego stronie
POPRAWKI.md        pomysły na ulepszenia (niewdrożone)
docs/PROJEKT.md    (tryb B) kierunek wizualny: uwaga → rozwiązanie
inventory.json     inwentarz SEO/treści oryginału (tryb A)
scripts/           narzędzia: inwentarz, zrzuty, porównania, konwerter, zdjęcia, Lighthouse, e2e
  image-map.json   oryginał → opisowa nazwa + alt
ref/ out/ diff/    zrzuty oryginału / nowej strony / różnice (poza gitem lub lekkie)
ustalenia/         transkrypty, maile, zdjęcia od właściciela (.gitignore!)
Claude outputs/    zadania i treści z czatu Claude
wp-live/ wp-backup/  kopia HTML i backup oryginału (poza gitem)
site/
  astro.config.mjs  wrangler.jsonc  package.json  .dev.vars (sekrety lokalne, poza gitem)
  migrations/       D1
  worker/           index.ts (routing), form.ts, mail.ts, spam.ts, (sklep: zamowienie.ts, stripe.ts, inpost.ts)
  scripts/          lqip.mjs, indexnow.mjs (po buildzie / po deployu)
  public/           _headers, robots.txt, favicon, fonts/, zdjecia/ (stałe kopie WebP), pliki/
  src/
    assets/zdjecia/ oryginały zdjęć (opisowe nazwy)
    components/     Masthead/Header, Footer, CookieBanner, Tags, YouTube, FormularzOferty…
    content/<jęz>/  treść stron (teksty, alty, meta SEO) – tu poprawia się teksty
    templates/      układy stron (wspólne dla języków)
    pages/          trasy (cienkie pliki `<Page lang="…" />`)
    layouts/ lib/ i18n/ data/ styles/ scripts/
```

`.gitignore`: `node_modules/ dist/ .astro/ .wrangler/ .dev.vars .env* ustalenia/ wp-live/ wp-backup/ lighthouse/ test-results/ .DS_Store __pycache__/`.

---

## 6. Etapy pracy

1. **Inwentaryzacja** (tryb A): mapa strony + menu + stopka → lista URL-i; `inventory.json` (dla każdego URL:
   title, description, robots, canonical, OG/Twitter, JSON-LD, H1–H3, linki wewnętrzne, obrazy z altami i
   wymiarami, wideo, formularze); skrypty zewnętrzne z ID; fonty; zachowania do odtworzenia (hovery, menu
   mobilne, lightbox, akordeony, animacje przy przewijaniu). Zrzuty referencyjne → `ref/`.
   Tryb B: brief z ustaleń → `PLAN.md` + `docs/PROJEKT.md`, lista otwartych pytań do właściciela.
2. **Plan** → `PLAN.md` do akceptacji (stan wyjściowy, etapy, decyzje do podjęcia przez właściciela).
3. **Fundament**: Astro + Worker, tokeny kolorów i typografii w `global.css`, fonty lokalnie, Layout z SEO,
   Header + menu mobilne, Footer, baner zgód, tagi.
4. **Strony**: najpierw strona główna, potem strony z ruchem / reklamami, reszta, blog, 404, polityka prywatności.
   Commit po każdej stronie. Pętla: build → zrzuty → pixelmatch → `geom.mjs` → poprawki.
5. **Zdjęcia**: opisowe nazwy i alty dla wszystkich (sekcja 8), 301 ze starych adresów.
6. **Formularze, zgody, tagi** (sekcje 10–11).
7. **Weryfikacja**: linki wewnętrzne bez 404 (`linkcheck.mjs`), meta vs `inventory.json` (`metacheck.py`),
   test funkcjonalny (`e2e.mjs`), Lighthouse oryginał vs nowa strona (`lighthouse.sh`), `RAPORT.md`.
8. **Podgląd** na `*.workers.dev` (noindex) → akceptacja właściciela.
9. **Przepięcie domeny** (sekcja 14) – tylko po akceptacji.
10. **Po starcie**: obserwacja 404 w logach Workera i Google Search Console przez 2–4 tygodnie.

---

## 7. Konfiguracja – sprawdzone ustawienia

`site/astro.config.mjs`:

```js
export default defineConfig({
  site: "https://example.pl",
  trailingSlash: "always", // adresy jak w WordPressie: /slug/
  build: { format: "directory", inlineStylesheets: "always" }, // CSS w HTML – bez blokujących żądań
  server: { port: 4323 }, // własny port projektu (Karta)
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" }, // przejście między stronami natychmiastowe
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        webp: { quality: 90, smartSubsample: true },
        avif: { quality: 65, effort: 4 },
        jpeg: { quality: 90 },
      },
    },
  },
});
```

`site/wrangler.jsonc` – najważniejsze elementy:

- `assets.directory: "./dist"`, `html_handling: "auto-trailing-slash"`, `not_found_handling: "404-page"`.
- `run_worker_first`: przez Workera tylko strony, API i stare adresy; statyka (`/_astro/*`, `/fonts/*`, `/zdjecia/*`,
  ikony, favicon) z pominięciem Workera – plan Free ma limit 100 tys. wywołań Workera dziennie, statyka jest bez limitu.
- `workers_dev: true`, `preview_urls: true`; Worker dodaje `X-Robots-Tag: noindex` na każdym adresie spoza domeny
  produkcyjnej.
- `vars` (adresy, odbiorcy maili, host SMTP) w pliku z komentarzem „dlaczego”; **sekrety tylko przez**
  `npx wrangler secret put NAZWA` (lokalnie w `site/.dev.vars`), nigdy w repo.
- `env.podglad`: osobny Worker `<nazwa>-podglad`, bez domen, z własną bazą D1, kubełkami R2, mailami do dewelopera
  i Stripe w trybie testowym (`vars`, `d1_databases`, `r2_buckets`, `routes`, `triggers` nie dziedziczą się – wpisać
  je w środowisku od nowa).
- `observability.enabled: true`.

`site/public/_headers`: `/_astro/*` → `max-age=31536000, immutable`; pliki o stałych nazwach (`/zdjecia/*`,
`/fonts/*`…) → `max-age=604800, stale-while-revalidate=86400`.

`package.json` (site):

```json
"build": "astro build && node scripts/lqip.mjs",
"deploy": "npm run build && wrangler deploy --env=\"\"",
"postdeploy": "node scripts/indexnow.mjs",
"deploy:podglad": "npm run build && wrangler deploy --env podglad",
"test": "node --test 'src/lib/*.test.ts'"
```

Zawsze budować przez `npm run build` / `npm run deploy` (nie gołe `astro build` – pomija LQIP).
Styl kodu: Prettier wg `.prettierrc.json` (pojedyncze cudzysłowy; w plikach treści jedna para klucz–tekst na wiersz).

---

## 8. Zdjęcia – zasady przy każdym nowym zdjęciu (bez przypominania)

- **Plik źródłowy** do `site/src/assets/zdjecia/<nazwa>`: JPG (zdjęcia, jakość ~86, maks. 2400 px dłuższy bok) albo
  PNG (grafiki, przezroczystość). Najlepiej ≥ 1200 px dłuższy bok (Google Grafika); mniejsze wgrać, ale poprosić
  właściciela o oryginał.
- **Formaty – automatycznie**: `<Picture … formats={['avif','webp']}>` → AVIF + WebP (+ JPG) w kilku rozmiarach
  (srcset do 2–3× rozmiaru wyświetlania, Retina), rozmyty podgląd LQIP wbudowany w HTML (`scripts/lqip.mjs`),
  stała kopia WebP do 1920 px w `public/zdjecia/<nazwa>.webp` (cel przekierowań, og:image, JSON-LD, Merchant Center).
- **Nazwa** – małe litery, bez polskich znaków, myślniki; co widać + produkt/format + fraza kluczowa marki
  (np. `ulotki-dl-z-nadrukiem-fresenius-przod-papier-z-nasionami.jpg`). **Nazw zdjęć już na produkcji nie zmieniać.**
- **Alt** – w `scripts/image-map.json` (klucz `nowe/<nazwa>` dla zdjęć spoza starego CMS): jedno zdanie w języku
  strony, co widać, z produktem i frazą naturalnie, bez upychania słów kluczowych. Tłumaczenia altów w plikach treści.
  Claude ogląda każde zdjęcie i sam proponuje nazwę i alt; właściciel tylko przegląda.
- **Orientacja** – sprawdzić na podglądzie; telefony zapisują błędny obrót w EXIF (zdjęcia nad stołem). Obrót wpisać
  w piksele i zapisać **bez EXIF**. Przyciąć zbędne krawędzie, dłonie, nieostre fragmenty.
- **Ładowanie**: zdjęcie LCP (hero) z `loading="eager"` + `fetchpriority="high"`, reszta leniwie; wymiary zawsze
  ustawione (CLS = 0).
- **Nie czytać właściwości importowanych obrazów** (`image.width`, `image.src`) w komponentach – Astro kopiuje wtedy
  pełny oryginał do `dist`. Obrazy importować statycznie (glob wciąga wszystkie oryginały do builda).
- **Migracja**: stare adresy (`/wp-content/uploads/...`, także miniatury `-300x200`, `-scaled`, `.jpg.webp`) →
  301 na nowe pliki (Worker, mapa w `site/src/data/image-redirects.json` z `apply_images.py`). Po każdym
  `apply_images.py` sprawdzić `git diff` mapy przekierowań – skrypt usuwa wpisy, gdy lokalnie brak źródła.
- **Zdjęcia produktów (sklep)**: jednolite tło (w seedpaper: szary gradient jak makiety, nie białe, nie drewno).
  Tło wycinane `rembg` model **birefnet-general** (venv w scratchpadzie; radzi sobie z białą kartką na białym stole),
  miękki cień, balans bieli. Sprawdzić krawędzie (obwódka starego tła) i otwory. Obiekt ucięty kadrem – zostawić przy
  brzegu (bez centrowania). Galeria produktu: maks. 5 (główne „zajawkowe” + 4), miniatur tyle, ile zdjęć.
  Zdjęcie używane też na innej stronie – wersja sklepowa pod nową nazwą, oryginał zostaje.
- **Wideo**: YouTube jako okładka (facade) → `youtube-nocookie.com` dopiero po kliknięciu; MP4 z plakatem; plik
  > 25 MB → R2 (limit statyki Workers).
- **Fonty**: lokalnie, woff2, podzbiór latin / latin-ext, `font-display: swap`, preload głównego; ikony (Font Awesome
  itp.) przycięte do użytych znaków. Sprawdzić licencję fontów komercyjnych.

---

## 9. SEO – nie tracimy pozycji (i budujemy nowe)

- **Te same adresy** (z końcowym `/`), title, description, robots, canonical, OG/Twitter, JSON-LD, nagłówki H1–H3,
  treść i linki wewnętrzne – wzorzec w `inventory.json`. Zmiany SEO tylko świadome, na prośbę, zapisane w STANIE.
- Mapa strony jak w oryginale (np. `sitemap_index.xml` + page/post/category z `lastmod` i wpisami `image:`),
  `robots.txt`; nowa podstrona = wpis w mapie.
- Przekierowania 301 w Workerze: stare warianty adresów (`/sitemap.xml`, `/feed/`, `/?page_id=`, bez `/`), stare
  zdjęcia. Prawdziwy status 404. 302 dla adresów „skrótów” (np. `/opinia` → formularz opinii Google).
- Wersje językowe: `hreflang` (+ `x-default`) w `<head>` i w mapie strony; przetłumaczone adresy.
- JSON-LD: Organization/LocalBusiness, WebPage, BreadcrumbList; artykuły `Article` (+ `FAQPage`, gdy jest sekcja
  pytań); produkty `Product` z `Offer`.
- Podgląd `*.workers.dev` zawsze `noindex` (nagłówek z Workera); zdejmowany tylko na domenie produkcyjnej.
- **IndexNow** (Bing, Yandex…): plik klucza w `public/`, `scripts/indexnow.mjs` jako `postdeploy`.
- Po starcie: Google Search Console (mapa, inspekcja adresów), Bing Webmaster, porównanie crawlu przed/po.
- Sklep: plik produktowy Merchant Center (`/sklep/feed.xml`): tytuły z frazami zakupowymi, `google_product_category`,
  `product_type`, `product_highlight`, `product_detail`, czasy obsługi i dostawy w `g:shipping`, różne zdjęcia główne.

---

## 10. Zgody, tagi i pomiar

- **Własny baner zgód** (bez Cookiebota i podobnych): kategorie niezbędne / analityczne / marketingowe, „Akceptuję
  wszystko / Odrzucam / Ustawienia”, przycisk zmiany zgody, zapis w `localStorage`, **rejestr zgód w D1** (anonimowe
  ID, data, wybór). Jeśli stary baner siedzi w GTM – właściciel musi go wstrzymać w GTM (instrukcja w `TODO.md`),
  inaczej będą dwa banery.
- **Consent Mode v2**: `gtag('consent','default', …denied…)` przed tagami, `update` po wyborze.
- Tagi Google (GTM / GA4 / Ads) z tymi samymi ID co oryginał, w jednym komponencie `Tags.astro`, ładowane **po
  pierwszej interakcji** (przewinięcie, dotyk, ruch myszy, klawisz) – nie spowalniają strony.
- **Jedno źródło konwersji**: kod strony albo GTM, nigdy oba (podwójne liczenie). GTM wpięty raz.
- Konwersje: telefon, e-mail (kliknięcia `tel:` / `mailto:`), formularz **po udanej wysyłce** (`generate_lead`,
  z `user_data` za zgodą), zakup na stronie podziękowania (`purchase`, wartość netto, `transaction_id`).
- **Tagi startują tylko na domenie produkcyjnej**, nigdy przy `navigator.webdriver` ani z ciasteczkiem wyłącznika
  pomiaru. **Wyłącznik**: `?bez-pomiaru=1` ustawia ciasteczko `<prefiks>_bez_pomiaru=1` na rok, `?bez-pomiaru=0`
  usuwa; w konsoli „pomiar wyłączony (test)”.
- **Testy na produkcji zawsze z `?bez-pomiaru=1`** – inaczej testowe wizyty, leady i zakupy trafiają do GA4 i Ads.
  Skrypty Playwright importują `chromium` z `scripts/pw.mjs` (ustawia ciasteczko sam); wyjątek: skrypt sprawdzający,
  czy tagi działają.
- Parametry adresu nie mogą kolidować z GA4: nie używać `?s=`, `?q=` (GA4 bierze je za wyszukiwanie) – np. powrót ze
  Stripe z `?sesja=`.
- Heatmapy / nagrania / A/B (gdy potrzebne): PostHog EU albo Microsoft Clarity, po zgodzie analitycznej; A/B
  wariantami budowanymi przez Astro i przydzielanymi w Workerze (bez migotania, canonical do oryginału).

---

## 11. Formularze i poczta

- Wygląd, walidacja i komunikaty jak w oryginale; wysyłka `POST /api/form` do Workera.
- **SMTP przez serwer z rekordu MX domeny** (sprawdzić `dig MX`), nie przez „mail.domena” starego hostingu – stary
  hosting potrafi trzymać martwe kopie skrzynek i maile tam giną. Skrzynka `formularz@domena`, hasło jako sekret.
  DKIM z panelu tego serwera wpisany w DNS, SPF zgodny. Test: mail dochodzi do każdego odbiorcy, nagłówki DKIM pass.
- Każdy odbiorca wysyłany osobno; wynik wysyłki zapisany.
- Każde zgłoszenie (z błędem wysyłki włącznie) w **D1**, załączniki w **R2** – nic nie przepada przy awarii poczty.
- Ochrona: honeypot, filtr spamu (`spam.ts`), limit rozmiaru i typów plików, opcjonalnie Turnstile.
- Do maila: adres strony, źródło wizyty (gclid / UTM – tylko za zgodą marketingową), pole „Skąd o nas wiesz?”.
- Wersje językowe: dopisek `[EN]` / `[DE]` w temacie.
- Port 25 bywa zablokowany lokalnie – skrzynki sprawdzać przez `openssl s_client` na 465/587.

---

## 12. Sklep (gdy jest w Karcie)

Sprawdzony układ z seedpaper.pl – używać tego samego, chyba że projekt ma inne potrzeby:

- Własny koszyk (localStorage) i strony produktów generowane z danych (`src/data/sklep.json`, `src/lib/sklep.ts`);
  logika cen w `src/lib/ceny.ts` z testami `node --test`.
- Zamówienie: firma (NIP → dane z Białej Listy VAT) lub osoba; dostawa paczkomat (mapa InPost) / kurier / odbiór;
  pliki projektu (PDF) do R2; zgody (regulamin, RODO, opcjonalnie prośba o opinię).
- **Stripe Checkout**: metody włączane w panelu Stripe (BLIK, karta, Apple Pay, Link; Klarna wg decyzji).
  Przelewy24 przez Stripe niedostępne dla JDG (od 08.2026) – sprawdzić formę prawną sprzedawcy na starcie.
  Potwierdzenie płatności: powrót klienta + **cron co 10 min** (webhook opcjonalnie). Konto Stripe na dane
  sprzedawcy z regulaminu.
- Maile: do sklepu (z linkiem „Nadaj przesyłkę” → InPost ShipX tworzy etykietę) i do klienta; prośba o opinię Google
  cronem 5–30 dni po wysyłce (tylko za zgodą).
- Strona podziękowania: GA4 `purchase` + konwersja Ads „Zakup”.
- Regulamin, klauzula RODO, polityka prywatności – do akceptacji właściciela (status w STANIE).
- Faktury: program właściciela + KSeF (ustalić na starcie).
- Podgląd sklepu: `--env podglad` ze Stripe testowym (karta 4242 4242 4242 4242), InPost w trybie podglądu (bez
  tworzenia przesyłek), maile do dewelopera. Test e2e całej ścieżki zakupu (`scripts/e2e-sklep.mjs`).
- Plik Merchant Center (sekcja 9).

---

## 13. Wydajność – cel Lighthouse ≥ 95 na telefonie we wszystkich kategoriach

- CSS inline, zero blokujących żądań; brak jQuery; JS tylko tam, gdzie potrzebny; `prefers-reduced-motion`
  respektowane (animacje raz, przy pierwszym przewinięciu).
- Skrypty zewnętrzne (tagi, tłumacz Google, czaty, opinie) dopiero po interakcji lub kliknięciu; widżety typu
  Trustindex zastąpione statycznym HTML z lokalnymi awatarami.
- Zdjęcia i fonty wg sekcji 8; CLS = 0.
- Pomiar: `scripts/lighthouse.sh` (oryginał vs nowa strona, telefon + desktop, z `?bez-pomiaru=1`) → tabela w
  `RAPORT.md` (Performance, Accessibility, Best practices, SEO, LCP, CLS, waga, liczba żądań).
- Na podglądzie SEO pokaże ~69 przez celowy `noindex` – to nie błąd.
- Dostępność: w trybie 1:1 błędy oryginału (kontrast, kolejność nagłówków) → `POPRAWKI.md`; w trybie B od początku
  poprawnie (testy axe w Playwright, jak w printseedpaper.eu).

---

## 14. Wdrożenie i przepięcie domeny

- Repo prywatne na GitHub `olekk`; praca na `main` (większe rzeczy na gałęzi + Worker podglądu).
- **Podgląd** (`npm run deploy:podglad`, migracje D1 podglądu) – Claude wdraża sam, do sprawdzenia.
- **Produkcja** (`npm run deploy`) i migracje D1 na produkcji (`npx wrangler d1 migrations apply <baza> --remote`
  **przed** deployem) – robi Aleksander; Claude podaje gotowe komendy w raporcie i w STANIE („czeka na deploy”).
- Alternatywa (projekt bez backendu, np. printseedpaper.eu): Cloudflare Workers Builds – deploy po każdym pushu na
  `main`, CI w GitHub Actions (typy, build, Playwright + axe).
- **Przepięcie domeny** (tylko po akceptacji właściciela):
  1. Strefa domeny w Cloudflare z **przepisaniem wszystkich rekordów** (MX, SPF, DKIM, DMARC, weryfikacje Google /
     Microsoft / inne, subdomeny) – porównać z eksportem starego DNS.
  2. Zmiana NS u rejestratora → custom domain dla Workera (apex + `www` → 301 na kanoniczną).
  3. Sprawdzić: noindex zniknął, 301 działają, formularz dochodzi, tagi startują (bez wyłącznika).
  4. GSC: mapa strony + inspekcja; IndexNow.
  5. Stary hosting zostaje nietknięty 2–4 tygodnie (rollback = powrót NS / rekordu A). **Poczta**: ustalić, czy jest
     częścią pakietu hostingu, zanim ktokolwiek go wypowie.
  6. Obserwacja 404 w logach Workera; brakujące adresy → przekierowania.

---

## 15. Dokumentacja i dziennik zmian

- **`STAN.md`** (w projekcie ze sklepem: `SKLEP.md`) – na samej górze: „Ostatnia aktualizacja: data (co, gdzie
  wdrożone, co czeka)”, tabela zadań `# | Do zrobienia | Kto | Stan (✅ / ⏳ / później)`, potem **dziennik zmian**
  (najnowsze na górze, data + jedno zdanie + odnośnik do sekcji), potem sekcje `0a, 0b…` ze szczegółami.
  Czytać na starcie każdej sesji, aktualizować po każdej zmianie.
- **Nowa konsultacja / nowe zadania**:
  1. Przeczytać STAN, potem najnowszy plik w `ustalenia/` lub `Claude outputs/`.
  2. Zmiany → nowa sekcja `0x` (co, skąd, decyzje Claude do ewentualnej korekty), aktualizacja tabeli, wpis w dzienniku.
  3. Build, sprawdzenie na zrzutach, commit na `main`, podgląd.
  4. Na koniec raport: co zrobione (z adresami), co otwarte, komendy do wykonania przez Aleksandra.
- `TODO.md` – tylko zadania ręczne (konta, panele, DNS, sekrety, rozmowy) z checkboxami, kto i do kiedy.
- `RAPORT.md` – dla właściciela, prostym językiem: co działa, liczby (Lighthouse, zgodność), świadome różnice, czego
  potrzebujemy od niego (ponumerowane, z dokładną ścieżką kliknięć w panelach).
- Daty zawsze bezwzględne (`10.11.2026`), nie „wczoraj”.
- Komentarze w kodzie i konfiguracji mówią **dlaczego** (np. dlaczego taki serwer SMTP, dlaczego ten wyjątek).
- Commity po polsku, opisowe (co i dlaczego, numer sekcji STANU).

---

## 16. Praca z Claude Code

- Decyzje deweloperskie Claude podejmuje sam, zapisuje je w dokumentacji („decyzja Claude, do korekty”) i wymienia
  w raporcie końcowym – bez pytania o każdy drobiazg. Pyta tylko o rzeczy właściciela (ceny, treści prawne,
  wydatki, konta) albo gdy coś blokuje.
- Nie przerywa pracy po statusie; kończy turę tylko z podanym powodem (pytanie, decyzja właściciela, błąd) albo po
  skończonym etapie.
- Wyniki raportuje rzetelnie: test nie przeszedł – podaje wynik; krok pominięty – mówi to.
- Przed nadpisaniem lub usunięciem – sprawdza, co tam jest. Działania zewnętrzne (maile, posty, zmiany w panelach,
  DNS, produkcja) – tylko na wyraźne polecenie.
- Sekrety i dane osobowe: nigdy w repo, commitach ani odpowiedziach; w `ustalenia/` i `.dev.vars`.
- Treści: w języku strony, ze znakami diakrytycznymi; **bez pauz (U+2014)** – wszędzie (treść, maile, komentarze,
  `.md`, commity); zamiast nich półpauza ze spacjami (`–`) albo łącznik. Konwertery zamieniają pauzy z oryginału.
  Sprawdzenie: `git grep -I $'\xe2\x80\x94'` (ma nic nie zwrócić).
- Edycja treści: w `src/content/<jęz>/`, nie w wygenerowanych układach. Gdy układy są generowane konwerterem –
  trwałe poprawki w konwerterze; po zamknięciu starego CMS konwertera już się nie uruchamia, układy edytuje się wprost.
- Zrzuty stron oryginału z LiteSpeed „delay JS” – skrypty startują po interakcji (skrypt zrzutów rusza myszą).
- Weryfikacja zmian wizualnych: zrzut po zmianie i obejrzenie go, nie tylko udany build.

---

## 17. Narzędzia do skopiowania z `seedpaper/seedpaper-astro`

| Plik                                                                                             | Do czego                                                           |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `scripts/inventory.py`                                                                           | inwentarz SEO/treści żywej strony → `inventory.json`               |
| `scripts/snapshot.mjs`, `screenshot.mjs`, `compare.mjs`, `check.sh`, `geom.mjs`                  | zrzuty 1440/768/390, pixelmatch, pozycje elementów                 |
| `scripts/convert.py`, `content.py`                                                               | konwerter Elementor → Astro, podział układ / treść, trasy językowe |
| `scripts/wpress.py`, `fetch_images.py`                                                           | wyciąganie bazy i oryginałów zdjęć z backupu                       |
| `scripts/image-map.json`, `apply_images.py`, `build_sitemap.py`                                  | nazwy i alty zdjęć, kopie WebP, 301, mapa strony                   |
| `scripts/linkcheck.mjs`, `metacheck.py`, `e2e.mjs`, `e2e-sklep.mjs`                              | weryfikacja linków, meta, działania, sklepu                        |
| `scripts/lighthouse.sh`, `lh-pages.sh`                                                           | Lighthouse oryginał vs nowa strona                                 |
| `scripts/pw.mjs`, `tagi-google.mjs`                                                              | Playwright z wyłącznikiem pomiaru; test tagów                      |
| `site/scripts/lqip.mjs`, `indexnow.mjs`                                                          | rozmyte podglądy zdjęć; IndexNow po deployu                        |
| `site/worker/*`                                                                                  | routing, formularze, SMTP, spam, Stripe, InPost, crony             |
| `site/src/components/CookieBanner.astro`, `Tags.astro`, `YouTube.astro`, `FormularzOferty.astro` | baner zgód, tagi, okładka wideo, formularz                         |
| `site/migrations/*.sql`                                                                          | schemat D1 (zgłoszenia, zgody, zamówienia)                         |
| `site/public/_headers`, `site/wrangler.jsonc`                                                    | cache statyki, konfiguracja Workera z podglądem                    |

Z `seedpaper/printseedpaper.eu`: `scripts/audit-layout.mjs` (ucięty tekst, za mocno przycięte zdjęcia),
`scripts/crop-photos.py` (kadry), testy Playwright + axe, `.github/workflows/ci.yml`, i18n z przetłumaczonymi
adresami (`src/i18n/routes.ts`), fonty przez `fonts` w `astro.config.mjs`.

Skrypty przenosić i dostosowywać (domena, prefiks ciasteczka, ID tagów, nazwy baz), nie kopiować w ciemno.

---

## 18. Pułapki, które już kosztowały czas

- Dwa serwery poczty u hostingodawcy: formularze szły na stary serwer i ginęły – zawsze SMTP z rekordu MX + test
  doręczenia do każdego odbiorcy.
- Stary baner zgód i tagi konwersji w GTM → podwójny baner i podwójne konwersje.
- `image.width` / `image.src` w komponencie → pełne oryginały w `dist`.
- EXIF z telefonu → zdjęcia obrócone po buildzie.
- `apply_images.py` bez lokalnego źródła → usunięte przekierowania (sprawdzać `git diff`).
- Parametr `?s=` w adresie powrotu → śmieci w raportach wyszukiwania GA4.
- Plan Free Workers: 100 tys. wywołań dziennie – statyka musi omijać Workera (`run_worker_first` z wykluczeniami).
- Plik > 25 MB nie wejdzie do statyki Workers – R2.
- Testy na produkcji bez wyłącznika pomiaru → fałszywe leady i zakupy w Ads.
- pnpm odrzuca paczki młodsze niż doba (ustawienie wieku wydań) – nie aktualizować zależności w dniu wydania.
- Kilka projektów lokalnie → kolizja portów `astro dev` / `preview` (port w Karcie).

---

## Zasady projektu (dopisywać w trakcie)

- Dane marki i kontaktu tylko w `site/src/config/site.ts` (puste pole = element znika). Nazwa marki dojdzie później
  jednym polem `brandName` (decyzja z planu 25.11.2026).
- Realizacje (case study, galeria) w `site/src/data/projects.ts`; zwykły plik TS zamiast Content Collections, bo przy
  kilku wpisach prościej (decyzja Claude, do korekty).
- Nagrania: źródła MP4 poza repo; `npm run videos -- <katalog>` koduje je do `site/public/media/` (H.264, 1280 px
  desktop / 520 px telefon, CRF 28, bez dźwięku, plakat WebP). Wideo startuje dopiero, gdy jest widoczne.
- Ton: pierwsza osoba, na „Ty”, krótko, korzyść przed opisem; każda liczba z eksportu Art Papier (bez liczb bez źródła). Ceny jawne, netto: strona od 3 000 zł, marketing 2 500 zł/mies. (zniżki Olek daje indywidualnie, nie na stronie), budżet reklam od ok. 300 zł/mies.
- Wygląd: ciemny motyw w stylu Liquid Glass (klasa `.glass` w `global.css`, poświaty `.aurora`), font Inter lokalnie (na prośbę Olka 26.11.2026).
- HC INSTAL pokazujemy jak osobną firmę (klienta), bez wzmianki o zarządzie (na prośbę Olka 26.11.2026).
- Bez sekcji „co nie wyszło” i bez zdań o ciasteczkach w stopce (na prośbę Olka 26.11.2026).
- Strony z agencji: zawsze dopisek „projekt graficzny: agencja, wdrożenie: ja”.
