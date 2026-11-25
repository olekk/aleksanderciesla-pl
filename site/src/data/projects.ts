// Realizacje. Nagrania leżą w public/media/<video>-desktop.mp4 i <video>-mobile.mp4
// (generuje je `npm run videos`).

export type Stat = { value: string; label: string };

export type Quote = { text: string; author: string; role: string };

export type Project = {
  slug: string;
  name: string;
  url?: string;
  video: string;
  tagline: string;
  stats?: Stat[];
  page?: string;
};

// TODO(Olek): cytat od Flawiusza po jego akceptacji. Puste = sekcja "Co mówią klienci" ukryta.
export const quotes: Quote[] = [
  // {
  //   text: '...',
  //   author: 'Flawiusz Pietrzyk',
  //   role: 'właściciel, ART-PAPIER Czerpalnia Papieru',
  // },
];

export const featured: Project[] = [
  {
    slug: 'art-papier',
    name: 'Art Papier (seedpaper.pl)',
    url: 'https://seedpaper.pl',
    video: 'seedpaper',
    tagline: 'Czerpalnia papieru z nasionami spod Gliwic. Strona, sklep, Google Ads i porządek z zapytaniami.',
    stats: [
      { value: '75,80 → 33,29 zł', label: 'koszt zapytania z Google Ads w 2 tygodnie' },
      { value: '15 dni', label: 'od decyzji do działającego sklepu' },
      { value: 'ok. 650 zł', label: 'miesięczny budżet reklam' },
    ],
    page: '/art-papier/',
  },
  {
    slug: 'hc-instal',
    name: 'HC INSTAL (hcinstal.pl)',
    url: 'https://hcinstal.pl',
    video: 'hcinstal',
    tagline: 'Rodzinna firma elektryczna, w której jestem w zarządzie. Strona o automatyce budynkowej i pomiarach.',
    page: '/hc-instal/',
  },
];

// Strony wdrożone w agencji marketingowej. Projekt graficzny: designerka agencji, wdrożenie (kod): ja.
// TODO(Olek): zgoda byłego szefa i nazwa agencji (wtedy wpisz ją w `agencyName`).
export const agencyName = '';

export const agencySites: Project[] = [
  {
    slug: 'foto7',
    name: 'Foto7',
    video: 'foto7',
    tagline: 'Dystrybutor sprzętu fotograficznego. Strona z rozbudowanym menu marek i animacjami.',
  },
  {
    slug: 'foto7-marki',
    name: 'Foto7 - Nasze marki',
    video: 'foto7-nasze-marki',
    tagline: 'Podstrona z logotypami marek, które obracają się po najechaniu myszką.',
  },
  {
    slug: 'liberta',
    name: 'Liberta Okna',
    video: 'libertaokna',
    tagline: 'Producent okien. Kampania "Hybrid X" przeniesiona na stronę.',
  },
  {
    slug: 'gib-meble',
    name: 'GiB Meble',
    video: 'gibmeble',
    tagline: 'Producent mebli. Wielopoziomowe menu kolekcji i duże zdjęcia aranżacji.',
  },
  {
    slug: 'prodvisor',
    name: 'Prodvisor',
    video: 'prodvisor',
    tagline: 'Doradca produkcji dla branży automotive. Wideo w tle i karty usług.',
  },
  {
    slug: 'auto-centrum',
    name: 'Auto-Centrum Gliwice',
    video: 'auto-centrum-gliwice',
    tagline: 'Warsztat samochodowy. Prosta strona z telefonem i umawianiem wizyty na wierzchu.',
  },
  {
    slug: 'vibeon',
    name: 'Vibeon',
    video: 'vibeon',
    tagline: 'Sklep z kosmetykami CBD. Strona produktowa w dwóch językach.',
  },
];
