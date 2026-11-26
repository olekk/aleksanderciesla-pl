// Realizacje. Nagrania leżą w public/media/<video>-desktop.mp4 i <video>-mobile.mp4
// (generuje je `npm run videos`).

export type Stat = { value: string; label: string };

// draft: true = tekst przykładowy, na stronie widać plakietkę „przykład”. Usunąć po podmianie na prawdziwy.
export type Quote = { text: string; author: string; role: string; draft?: boolean };

export type Project = {
  slug: string;
  name: string;
  url?: string;
  video: string;
  // Drugie nagranie tej samej firmy (jeden slajd, jeden podpis – na prośbę Olka 26.11.2026).
  video2?: string;
  tagline: string;
  stats?: Stat[];
  page?: string;
};

// TODO(Olek): cytat od Flawiusza po jego akceptacji. Puste = sekcja "Co mówią klienci" ukryta.
// SZKICE do podmiany na prawdziwe słowa klientów przed publikacją (na prośbę Olka 26.11.2026).
export const quotes: Quote[] = [
  {
    text: 'Olek zajął się naszą stroną, sklepem i reklamami. Pierwszy raz wiem, ile kosztuje nas zapytanie i skąd przychodzą klienci. Nie muszę o niczym pamiętać, a co miesiąc dostaję jasny raport.',
    author: 'Flawiusz Pietrzyk',
    role: 'właściciel, ART-PAPIER Czerpalnia Papieru',
    draft: true,
  },
  {
    text: 'Szukałem kogoś, kto nie tylko ustawi reklamy, ale powie, co poprawić w samej ofercie. Dostałem konkretne wskazówki i stronę, z której wreszcie dzwonią klienci.',
    author: 'Właściciel firmy usługowej',
    role: 'klient (anonimowo)',
    draft: true,
  },
];

export const featured: Project[] = [
  {
    slug: 'art-papier',
    name: 'Art Papier (seedpaper.pl)',
    url: 'https://seedpaper.pl',
    video: 'seedpaper',
    tagline: 'Czerpalnia papieru z nasionami spod Gliwic. Nowa strona, sklep B2B, Google Ads, widoczność w AI i system, w którym żadne zapytanie nie ginie.',
    stats: [
      { value: '75,80 → 33,29 zł', label: 'koszt zapytania z Google Ads w 2 tygodnie' },
      { value: '5 dni', label: 'tyle zajęło zbudowanie sklepu' },
      { value: 'ok. 650 zł', label: 'miesięczny budżet reklam' },
    ],
    page: '/art-papier/',
  },
  {
    slug: 'hc-instal',
    name: 'HC INSTAL (hcinstal.pl)',
    url: 'https://hcinstal.pl',
    video: 'hcinstal',
    tagline: 'Firma elektryczna: automatyka budynkowa Loxone, instalacje i pomiary. Strona i sklep z magazynami energii, dzięki któremu firma sprzedaje je na polskim rynku.',
    page: '/hc-instal/',
  },
];

// Strony wdrożone w agencji marketingowej. Projekt graficzny: designerka agencji, wdrożenie (kod): ja.
// TODO(Olek): zgoda byłego szefa i nazwa agencji (wtedy wpisz ją w `agencyName`).
export const agencyName = '';

export const agencySites: Project[] = [
  {
    slug: 'gib-meble',
    name: 'GiB Meble',
    video: 'gibmeble',
    tagline: 'Producent mebli. Wielopoziomowe menu kolekcji i duże zdjęcia aranżacji.',
  },
  {
    slug: 'foto7',
    name: 'Foto7',
    video: 'foto7',
    video2: 'foto7-nasze-marki',
    tagline:
      'Dystrybutor sprzętu fotograficznego. Strona z rozbudowanym menu marek i animacjami, a na podstronie „Nasze marki” logotypy obracają się po najechaniu myszką.',
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
  {
    slug: 'liberta',
    name: 'Liberta Okna',
    video: 'libertaokna',
    tagline: 'Producent okien. Kampania "Hybrid X" przeniesiona na stronę.',
  },
];
