// Wszystkie dane marki i kontaktu w jednym miejscu.
// Zmiana nazwy marki = zmiana `brandName` (i ewentualnie logo w Header.astro).
// Puste pole = element znika ze strony (np. bez telefonu nie ma przycisku "Zadzwoń").

export const site = {
  brandName: 'Aleksander Cieśla',
  personName: 'Aleksander Cieśla',
  shortName: 'Olek',
  domain: 'aleksanderciesla.pl',
  url: 'https://aleksanderciesla.pl',

  // Telefon od Olka (26.11.2026): format do wyświetlenia i do linku tel:
  phone: '695 553 690',
  phoneHref: '+48695553690',
  // TODO(Olek): potwierdzić adres (skrzynka na własnej domenie)
  email: 'kontakt@aleksanderciesla.pl',

  // Spotkania na miejscu – wspominamy raz, w kontakcie.
  meetArea: 'z Trójmiasta albo ze Śląska',
  meetAreaEn: 'in the Tricity area (Gdańsk, Gdynia, Sopot) or in Silesia',

  // TODO(Olek): na jaką firmę faktury (np. HC INSTAL sp. z o.o., NIP ...). Puste = brak w stopce.
  companyInfo: '',

  // TODO(Olek): zdjęcie twarzy, np. '/img/aleksander.webp' (kwadrat min. 800x800). Puste = monogram.
  photo: '/img/aleksander-ciesla-portret.webp',
  // Mała wersja (112 px) do nagłówka i hero.
  avatar: '/img/aleksander-ciesla-avatar.webp',

  // Ceny pokazywane na stronie. `net: true` dopisuje "netto".
  prices: {
    net: true,
    website: '3 000 zł',
    marketing: '2 500 zł / mies.',
    // TODO(Olek): potwierdzić przelicznik czasu (wiadomość 26.11.2026: „2000 miesięcznie to 10 godzin tygodniowo”?)
    marketingTime: 'ok. 10 godzin mojej pracy w tygodniu',
    adBudget: 'od ok. 300 zł / mies.',
    // TODO(Olek): kwota za porządek z zapytaniami (CRM). Puste = "wycena po rozmowie".
    crm: '',
  },

  // Ilu firm naraz pilnuję (sekcja „Maksymalnie 3 firmy”).
  maxClients: 3,

  // TODO(Olek): token Cloudflare Web Analytics (bez ciasteczek). Puste = brak skryptu.
  cfAnalyticsToken: '',
} as const;

export const priceSuffix = site.prices.net ? ' netto' : '';

// Ceny w wersji angielskiej (te same kwoty, w złotówkach). Przy zmianie ceny wyżej zmień też tutaj.
export const pricesEn = {
  website: 'PLN 3,000',
  marketing: 'PLN 2,500 / month',
  marketingTime: 'approx. 10 hours of my work per week',
  adBudget: 'from approx. PLN 300 / month',
} as const;

export const prices = (lang: 'pl' | 'en') =>
  lang === 'en'
    ? { ...pricesEn, suffix: site.prices.net ? ' net' : '' }
    : { ...site.prices, suffix: priceSuffix };
