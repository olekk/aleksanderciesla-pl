# STAN – aleksanderciesla.pl

Ostatnia aktualizacja: 26.11.2026, runda 3 (elastyczne przewijanie, logotypy, kompleksowa oferta, karuzela, ceny; sekcja 0c). Czeka na telefon, decyzję o domenie i mailu, prawdziwe referencje.

| #   | Do zrobienia                                                         | Kto  | Stan |
| --- | -------------------------------------------------------------------- | ---- | ---- |
| 1   | Szkielet Astro + Worker (noindex poza domeną, www → apex)            | Claude | ✅ |
| 2   | Strona główna (sekcje 1-10 z planu), /art-papier/, /hc-instal/, /strony/ | Claude | ✅ |
| 3   | Nagrania stron skompresowane do `site/public/media/` (26 MB)         | Claude | ✅ |
| 4   | Mail, dane do faktur w `site/src/config/site.ts` (zdjęcie i telefon ✅ 26.11) | Olek | ⏳ |
| 5   | Zgoda Flawiusza na case study + cytat (`site/src/data/projects.ts`)  | Olek | ⏳ |
| 6   | Zgoda byłego szefa agencji (+ nazwa agencji)                         | Olek | ⏳ |
| 7   | Pierwszy deploy na Cloudflare (podgląd workers.dev)                  | Olek | ⏳ |
| 8   | Kupno domeny, DNS na Cloudflare, custom domain                       | Olek | później |
| 9   | Formularz kontaktowy (Worker + D1 + Email Routing) – kod gotowy      | Claude | ✅ |
| 10  | Baza D1 i Email Routing dla formularza (TODO.md)                     | Olek | ⏳ |
| 11  | Prawdziwe referencje w miejsce szkiców (`quotes` w `projects.ts`)     | Olek | ⏳ |
| 12  | Decyzja: domena + kontakt@ czy adres Proton                          | Olek | ⏳ |
| 13  | Potwierdzenie „ok. 10 godzin w tygodniu” za 2 500 zł                 | Olek | ⏳ |

## Dziennik zmian

- 27.11.2026 – Maks. 4 firmy naraz zamiast 3 (na prośbę Olka): `maxClients` w `site.ts`, FAQ liczy z tego pola.
- 27.11.2026 – Prawdziwa opinia Flawiusza Pietrzyka (przesłana przez Olka) zamiast tekstu roboczego; odświeżony zrzut odbicia w menu.
- 27.11.2026 – TEST na prośbę Olka: w menu na iPhonie, w Safari i Firefoksie przy górnej i dolnej krawędzi przewija się odbity w pionie zrzut strony (`public/img/odbicie-*.webp`, ok. 100 kB, ładowany po wczytaniu strony, tylko strona główna); wyłączenie `experiments.reflection: false`.
- 27.11.2026 – Menu: rozmycie soczewki 3 → 2 px, w wersji dla Safari i Firefoksa 20 → 10 px (na prośbę Olka).
- 27.11.2026 – Soczewka na zdjęciu: mocniej nasycone kolory, bez samodzielnego ruchu; pojawia się pod kursorem i wyjeżdża razem z nim poza zdjęcie (na prośbę Olka).
- 27.11.2026 – TEST na prośbę Olka: szklana soczewka WebGL (shader od Olka) nad zdjęciem w „O mnie”, `site/src/components/LensPhoto.astro`; wyłączenie: `experiments.lensPhoto: false` w `site.ts`. Rysuje tylko, gdy zdjęcie jest widoczne.
- 27.11.2026 – Menu w Safari, Firefoksie i na iPhonie: wersja „prawie Liquid Glass” na prośbę Olka (mocniejsze rozmycie z podbitym kolorem, jasne krawędzie, tęczowa obwódka i refleks przesuwające się przy przewijaniu; czysty CSS + zmienne ustawiane przy przewijaniu). Chromium dalej z prawdziwą soczewką.
- 26.11.2026 – Referencje wróciły na stronę (PL i EN): Flawiusz Pietrzyk (Art Papier), Henryk C. (HC INSTAL), Monika M. (sklep second hand), w 3 kolumnach; treść na podstawie opisu Olka, zgoda osób potwierdzona przez Olka.
- 26.11.2026 – Wersja angielska na prośbę Olka: /en/, /en/art-papier/, /en/hc-instal/, /en/strony/. Strony przeniesione do `site/src/templates/` (jeden szablon na oba języki, teksty obok siebie jako `T(pl, en)`), przełącznik PL / EN w hero obok przedstawienia się i w stopce, hreflang w `<head>` i w mapie strony, formularz po angielsku (temat maila z `[EN]`). Lighthouse /en/ na telefonie 99/100/100/100. Obrazek podglądu linku (og.jpg) na razie po polsku.
- 26.11.2026 – Na prośbę Olka: „ART PAPIER” wielkimi literami w realizacjach, „Specjaliści od sprzedaży przez telefon” i „Agenci AI” w zapleczu, nagłówek „Prowadzisz firmę. Czy masz czas na drugi etat jako marketingowiec?”.
- 26.11.2026 – Cennik na prośbę Olka: jeden duży kafel „Marketing i rozwój firmy” (2 500 zł / mies.) z marketingiem oraz bazą klientów i sprzedażą w cenie, zamiast osobnego kafla „po rozmowie”; usunięte pytanie FAQ „Co jeśli nie będzie wyników?”.
- 26.11.2026 – Indeksowanie: mapa strony `/sitemap.xml`, `robots.txt` z mapą, tytuł i opisy pod „Aleksander Cieśla” i „jednoosobowy dział marketingu”, rozszerzony JSON-LD, 404 z noindex; zgłoszenie w Google Search Console po stronie Olka (TODO).
- 26.11.2026 – Runda 5 na prośbę Olka: telefon, koszt konwersji i zapytania 0 → 20 / mies., sekcje „Strona, która ewoluuje” (testy A/B) i „Wsparcie IT i własne narzędzia”, nagłówek „Brzmi znajomo” pod kafelkami, Foto7 jako 2 kafelki, opinia Flawiusza o zaufaniu (szkic) (sekcja 0e).
- 26.11.2026 – Runda 4 na prośbę Olka: przewijanie bez drgań (sekcje doganiają po zahamowaniu), wykres z dwiema liniami, „małych i średnich przedsiębiorstw”, zdjęcie w nagłówku i hero, karuzela w pętli, Foto7 jako jeden slajd, przycisk „Zobacz więcej”, domena jako custom domain, Lighthouse 100 (sekcja 0d).
- 26.11.2026 – Runda 3 na prośbę Olka: elastyczne przewijanie i wolniejsze tło, logotypy firm, bóle jako pytania, „Więcej niż marketing”, zaplecze współpracowników, maks. 3 firmy, strona 3 000 zł i hosting 0 zł, szkice referencji, Art Papier skrócony na głównej, karuzela stron z agencji, sklep z magazynami energii w HC INSTAL, „5 dni” (sekcja 0c).
- 26.11.2026 – Na prośbę Olka: ciemny motyw w stylu Liquid Glass, treść przepisana pod sprzedaż, usunięta sekcja „Co nie wyszło”, HC INSTAL jako osobna firma (bez wzmianki o zarządzie), stopka bez zdania o ciasteczkach, marketing 2 500 zł, budżet reklam od ok. 300 zł, formularz kontaktowy (sekcja 0b).
- 25.11.2026 – Pierwsza wersja strony wg planu (https://claude.ai/artifact/3zDWoqhtv7JazgwNF9h737), nagrania 9 stron, CLAUDE.md z Kartą projektu.

## 0a. Decyzje Claude (do korekty)

- Zwracamy się na „Ty” (plan zostawiał „Ty” / „Państwo” do decyzji).
- Zamówienie Gminy Chełmiec opisane bez nazwy gminy („zamówienie od samorządu … ok. 3 000 zł”), bo zgoda i netto/brutto niepotwierdzone.
- ~~„Bez umowy na rok”~~ usunięte na prośbę Olka (26.11.2026).
- Fonty systemowe (szeryfowe nagłówki, bezszeryfowy tekst) – zero plików fontów, szybciej.
- Sekcja „Co mówią klienci” ukryta, dopóki `quotes` w `projects.ts` jest puste.

## 0b. Przebudowa 26.11.2026

- Źródło: wiadomość Olka z 26.11.2026 (styl Liquid Glass, dark, bardziej sprzedażowo, formularz).
- Nowe sekcje: hero z kartą wyników, pasek firm, „Brzmi znajomo?”, 6 usług, sekcja o widoczności w AI, realizacje, jak pracuję (4 kroki), ceny, o mnie, FAQ (z FAQPage JSON-LD), kontakt z formularzem.
- Formularz: `POST /api/kontakt` w Workerze (`site/worker/form.ts`), honeypot + limit czasu + limit linków, zapis w D1 (`migrations/0001_zgloszenia.sql`), mail przez Cloudflare Email Routing (`send_email`). Bez skonfigurowanej bazy i maila zwraca 503, a strona pokazuje adres e-mail.
- Decyzje Claude (do korekty): plakietka „Tu widać efekty” przy marketingu; obietnica „odezwę się najpóźniej następnego dnia roboczego” po wysłaniu formularza; font Inter (lokalnie, @fontsource); odpowiedź ChatGPT pokazana jako streszczenie, nie cytat.

## 0c. Runda 3 – 26.11.2026

- Źródło: wiadomość Olka z 26.11.2026, 02:16.
- Przewijanie: skrypt w `Base.astro` przesuwa sekcje (`main > *`, stopka) sprężyną zależną od prędkości przewijania; przewinięcie kółkiem za górę lub dół rozciąga całość. Przesunięcia rosną monotonicznie, więc sekcje nie nachodzą na siebie (sprawdzone Playwrightem). Tło (`.aurora-layer`) jedzie z prędkością 0,12 treści. Wyłączone przy `prefers-reduced-motion`. Na telefonie rozciąganie za krawędzią daje sam system (iOS).
- Lokalizacja: jedno zdanie w kontakcie („Jeśli jesteś z Trójmiasta albo ze Śląska, chętnie spotkam się osobiście”), pole `meetArea` w `site.ts`; usunięte z opisu meta i JSON-LD (`areaServed: Polska`).
- Hero: koszt zapytania 33,29 zł (z 75,80) i liczba zapytań 20 (z 14, okresy 6-31.10 i 20.10-18.11.2026 – w eksporcie brak równych okresów, decyzja Claude), „5 dni – tyle zajęło zbudowanie sklepu” (wg Olka; eksport podaje 14.10 decyzja → 29.10 start), „55× AI zacytowało stronę”.
- Logotypy: wycięte z pierwszych klatek nagrań (strony klientów niedostępne z kontenera), białe PNG w `site/public/logos/`.
- Referencje: dwa szkice z plakietką „przykład, do podmiany” (`draft: true`); drugi (anonimowy) jest wymyślony i musi zostać zastąpiony prawdziwym przed publikacją.
- Ceny: strona 3 000 zł netto (bez „od”), hosting 0 zł; marketing 2 500 zł / mies. = „ok. 10 godzin mojej pracy w tygodniu” (do potwierdzenia, Olek mówił niejasno o 2 000 zł); maks. 3 firmy naraz (`maxClients`); „Konto, domena i strona należą do Ciebie” tylko w FAQ.
- Decyzje Claude (do korekty): nazwy grup zaplecza (graficy, fotografowie, filmowcy i twórcy TikTok, osoby od telefonów, narzędzia AI); siła efektu przewijania (maks. 90 px).

## 0d. Runda 4 – 26.11.2026

- Źródło: wiadomości Olka z 26.11.2026, 02:42 (poprawki i wynik Lighthouse z workers.dev: 77 / 100 / 100 / 69).
- Przewijanie: próbowane dwie spokojniejsze wersje (bez odbicia; odwrócony kierunek), na prośbę Olka (26.11.2026, 03:22) przywrócona pierwsza wersja z rundy 3 (K 1.4, MAX 90, sprężyna 0.085 / 0.8).
- Wykres w hero: poglądowy (linie nie są danymi dziennymi), czerwony koszt zapytania w dół, zielona liczba zapytań w górę; liczby obok z eksportu.
- Lighthouse (lokalnie, Lighthouse 12, telefon i komputer): wszystkie strony 100 / 100 / 100 / 100, strona główna na telefonie 99 (LCP 2,2 s przez font przy symulowanym wolnym łączu). Poprawki: CLS 0,594 → 0 (poświaty tła zmieniały pozycję przy zmianie wysokości warstwy; logotypy bez wymiarów), Inter z `public/fonts/` z preloadem (polskie litery wydzielone, 5 KB zamiast 85 KB), logotypy WebP w 2× rozmiarze, plakaty nagrań ładowane blisko ekranu i mniejsze na telefonie, cache dla `/fonts/`, `/logos/`, `/img/`, płynne przewijanie do kotwic dopiero po załadowaniu (z nim Chrome nie mierzył LCP dla adresu z `#realizacje`), opis linku w nagłówku.
- SEO 69 na workers.dev to celowy `noindex` podglądu; na domenie znika.
- Domena: `routes` z `custom_domain` dla apex i www w `wrangler.jsonc` (Olek dodał domenę do Cloudflare 26.11.2026).
- Menu u góry: efekt soczewki (filtr SVG `feDisplacementMap` w `backdrop-filter`, mapa rysowana w `Header.astro`), na prośbę Olka 26.11.2026. Tylko przeglądarki na Chromium; Safari i Firefox nie wspierają filtrów SVG w `backdrop-filter`, tam zostaje rozmycie.
- Obrazek podglądu linku `public/og.jpg` (1200×630, zdjęcie + hasło), szablon `site/scripts/og.html`; wcześniej podgląd brał zrzut GiB Meble. Przycisk w menu w jednej linii na telefonie, większe logo Art Papier (na prośbę Olka 26.11.2026).
- Decyzje Claude (do korekty): w tytule strony „MŚP” zamiast pełnej nazwy (długość tytułu w Google); zdjęcie też w nagłówku zamiast monogramu „AC”.

## 0e. Runda 5 – 26.11.2026

- Źródło: wiadomość Olka z 26.11.2026, 13:23 (przez czat projektu).
- Telefon 695 553 690 w `site.ts` (przycisk w hero, kontakt, stopka, JSON-LD).
- Karta wyników: „Koszt konwersji” 33,29 zł; „Zapytania z reklam” 20 / mies. „z 0” – według Olka (przed kampanią 0), nie z eksportu; „55× w 2 tygodnie”.
- Testy A/B: zrzut dwóch wersji miniaturki i tytułu filmu Kurzgesagt od Olka (26.11.2026, zastąpił rysunek z czarną dziurą), z podanym źródłem (prawo cytatu); `public/img/test-ab-miniaturki-youtube-kurzgesagt.webp`. „Strona ewoluująca”: „cel: nawet 2× więcej zapytań” – to cel, nie wynik (brak danych na 253%). Technicznie: warianty budowane przez Astro, przydział w Workerze (CLAUDE.md, sekcja 10) – do wdrożenia przy pierwszym kliencie.
- Wsparcie IT i własne narzędzia: 3 karty, przykład rozszerzenia do kosztorysów ze stron hurtowni; w cenniku marketingu dopisane testy A/B i wsparcie IT.
- Opinia Flawiusza przepisana o zaufaniu, nadal szkic (`draft: true`) do jego akceptacji.
- Decyzje Claude (do korekty): sekcja A/B i IT między usługami a „3 firmami”; nagłówek „Programista pod telefonem”.
