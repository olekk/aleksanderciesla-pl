# TODO (zadania ręczne)

- [ ] Olek: telefon, e-mail, zdjęcie (kwadrat, `site/public/img/`), dane do faktur → `site/src/config/site.ts`
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
