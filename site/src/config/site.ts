// Wszystkie dane marki i kontaktu w jednym miejscu.
// Zmiana nazwy marki = zmiana `brandName` (i ewentualnie logo w Header.astro).
// Puste pole = element znika ze strony (np. bez telefonu nie ma przycisku "Zadzwoń").

export const site = {
  brandName: 'Aleksander Cieśla',
  personName: 'Aleksander Cieśla',
  shortName: 'Olek',
  domain: 'aleksanderciesla.pl',
  url: 'https://aleksanderciesla.pl',

  // TODO(Olek): telefon w formacie do wyświetlenia i do linku tel:
  phone: '',
  phoneHref: '',
  // TODO(Olek): potwierdzić adres (skrzynka na własnej domenie)
  email: 'kontakt@aleksanderciesla.pl',

  area: 'Trójmiasto i Śląsk (Gliwice i okolice)',
  areaShort: 'Trójmiasto i Śląsk',

  // TODO(Olek): na jaką firmę faktury (np. HC INSTAL sp. z o.o., NIP ...). Puste = brak w stopce.
  companyInfo: '',

  // TODO(Olek): zdjęcie twarzy, np. '/img/aleksander.webp' (kwadrat min. 800x800). Puste = monogram.
  photo: '',

  // Ceny pokazywane na stronie. `net: true` dopisuje "netto".
  prices: {
    net: true,
    website: 'od 3 000 zł',
    marketing: '2 000 - 2 500 zł / mies.',
    adBudget: 'zwykle od ok. 600 zł / mies.',
    // TODO(Olek): kwota za porządek z zapytaniami (CRM). Puste = "wycena po rozmowie".
    crm: '',
  },

  // TODO(Olek): potwierdzić, że tak chcesz działać (FAQ i sekcja cen).
  noLongContract: true,

  // TODO(Olek): token Cloudflare Web Analytics (bez ciasteczek). Puste = brak skryptu.
  cfAnalyticsToken: '',
} as const;

export const priceSuffix = site.prices.net ? ' netto' : '';
