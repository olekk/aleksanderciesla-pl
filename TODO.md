# TODO (zadania ręczne)

- [ ] Olek: telefon, e-mail, dane do faktur (zdjęcie jest od 26.11.2026) → `site/src/config/site.ts`
- [ ] Olek: kwota za CRM (czy pokazywać), potwierdzić „bez umowy na rok”
- [ ] Olek: zgoda Flawiusza + cytat; netto/brutto zamówienia Chełmiec
- [ ] Olek: zgoda byłego szefa agencji, nazwa agencji (`agencyName` w `projects.ts`)
- [ ] Olek: Cloudflare → Workers & Pages → Create → Import a repository → `olekk/aleksanderciesla-pl`;
      Root directory `site`, Build command `npm run build`, Deploy command `npx wrangler deploy`
- [ ] Olek: kupić aleksanderciesla.pl (lh.pl), NS na Cloudflare, w `wrangler.jsonc` odkomentować `routes`
- [ ] Olek: Cloudflare Web Analytics → token do `cfAnalyticsToken`
- [ ] Olek (formularz, po podpięciu domeny): `cd site && npx wrangler d1 create aleksanderciesla-pl`, wpisać id
      w `wrangler.jsonc` (odkomentować `d1_databases`), `npx wrangler d1 migrations apply aleksanderciesla-pl --remote`;
      Cloudflare → domena → Email → Email Routing: włączyć, dodać i zweryfikować adres docelowy, wpisać go w `MAIL_TO`,
      odkomentować `send_email`
- [ ] Olek: numer telefonu do `site/src/config/site.ts` (`phone`, `phoneHref`) – pokaże się przy każdym „porozmawiajmy”
- [ ] Olek: prawdziwe słowa Flawiusza i drugiego klienta w miejsce szkiców (`site/src/data/projects.ts`, `quotes`)
- [ ] Olek: decyzja domena + `kontakt@aleksanderciesla.pl` (przekierowanie na skrzynkę Proton przez Email Routing) czy sam adres Proton
- [ ] Olek (indeksowanie, 26.11.2026): Google Search Console → Dodaj usługę → „Domena” → aleksanderciesla.pl → weryfikacja rekordem TXT (Cloudflare potrafi dodać go jednym kliknięciem) → Mapy witryn → wpisać `sitemap.xml` → Prześlij. Potem Sprawdzanie adresu URL → `https://aleksanderciesla.pl/` → „Poproś o zindeksowanie”.
- [ ] Olek: Bing Webmaster Tools → „Importuj z Google Search Console” (Bing zasila też ChatGPT i Copilota).
