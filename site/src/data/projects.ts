// Realizacje. Nagrania leżą w public/media/<video>-desktop.mp4 i <video>-mobile.mp4
// (generuje je `npm run videos`).

export type Stat = { value: string; label: string };

// draft: true = tekst przykładowy, na stronie widać plakietkę „przykład”. Usunąć po podmianie na prawdziwy.
export type Quote = { text: string; author: string; role: string; textEn?: string; roleEn?: string; draft?: boolean };

export type Project = {
  slug: string;
  name: string;
  url?: string;
  video: string;
  // Drugie nagranie tej samej firmy (jeden slajd, jeden podpis – na prośbę Olka 26.11.2026).
  video2?: string;
  tagline: string;
  taglineEn?: string;
  stats?: Stat[];
  page?: string;
};

// Opinie klientów (na prośbę Olka 26.11.2026, treść na podstawie jego opisu współpracy).
// Zgoda wszystkich trzech osób na treść: potwierdzona przez Olka 26.11.2026. draft: true = ukryta.
export const quotes: Quote[] = [
  {
    // Prawdziwa opinia od Flawiusza (przesłana przez Olka 27.11.2026), słowo w słowo.
    text: 'Profesjonalna firma zaangażowana w obsługę, odpowiadająca na potrzeby klienta. Strona, sklep internetowy, reklama, poczta czy konfiguracja hostingu – wszystko OK. Polecam.',
    textEn:
      'A professional business, committed to service and responsive to the customer’s needs. Website, online shop, advertising, email and hosting setup – all OK. Recommended.',
    author: 'Flawiusz Pietrzyk',
    role: 'właściciel, ART-PAPIER Czerpalnia Papieru',
    roleEn: 'owner, ART-PAPIER paper mill',
  },
  {
    text: 'Olek zbudował nam sklep internetowy i zajął się promocją magazynów energii. Pomógł też stworzyć bazę klientów, więc wiemy, kto pytał i do kogo wrócić. Po sprzedaży nie zostawia klientów samych: kontaktuje się z producentem, umawia i rozwiązuje problemy techniczne, prowadzi rozmowy po angielsku i tłumaczy przy wizytach na miejscu. To dział sprzedaży i obsługi klienta w jednej osobie.',
    textEn:
      'Olek built our online shop and took care of promoting our energy storage systems. He also helped us set up a customer database, so we know who asked and whom to get back to. After the sale he doesn’t leave customers on their own: he deals with the manufacturer, arranges and solves technical issues, handles conversations in English and interprets during on-site visits. A sales and customer service department in one person.',
    author: 'Henryk C.',
    role: 'właściciel, HC INSTAL',
    roleEn: 'owner, HC INSTAL',
  },
  {
    text: 'Z Olkiem rozwijamy nasz sklep internetowy z rzeczami z drugiej ręki. Poza samym sklepem dostaję konkretne porady i wsparcie przy kluczowych decyzjach: jak poukładać magazyn i jak usprawnić pracę przy upcyklingu. Patrzy na całą firmę, a nie tylko na stronę.',
    textEn:
      'Olek and I are growing our online second-hand shop together. Beyond the shop itself, I get concrete advice and support with key decisions: how to organise the stockroom and how to streamline our upcycling work. He looks at the whole business, not just the website.',
    author: 'Monika M.',
    role: 'właścicielka sklepu second hand',
    roleEn: 'owner of a second-hand shop',
  },
];

export const featured: Project[] = [
  {
    slug: 'art-papier',
    name: 'Art Papier (seedpaper.pl)',
    url: 'https://seedpaper.pl',
    video: 'seedpaper',
    tagline: 'Czerpalnia papieru z nasionami spod Gliwic. Nowa strona, sklep B2B, Google Ads, widoczność w AI i system, w którym żadne zapytanie nie ginie.',
    taglineEn: 'Seed paper mill near Gliwice. New website, B2B shop, Google Ads, AI visibility and a system where no enquiry gets lost.',
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
    taglineEn: 'Electrical company: Loxone building automation, installations and testing. Website and an online shop for energy storage systems that lets the company sell them on the Polish market.',
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
    taglineEn: 'Furniture manufacturer. Multi-level collection menu and large interior photos.',
  },
  {
    slug: 'foto7',
    name: 'Foto7',
    video: 'foto7',
    video2: 'foto7-nasze-marki',
    tagline:
      'Dystrybutor sprzętu fotograficznego. Strona z rozbudowanym menu marek i animacjami, a na podstronie „Nasze marki” logotypy obracają się po najechaniu myszką.',
    taglineEn:
      'Photography equipment distributor. A site with an extensive brand menu and animations; on the “Our brands” page the logos rotate on hover.',
  },
  {
    slug: 'prodvisor',
    name: 'Prodvisor',
    video: 'prodvisor',
    tagline: 'Doradca produkcji dla branży automotive. Wideo w tle i karty usług.',
    taglineEn: 'Production consultancy for the automotive industry. Background video and service cards.',
  },
  {
    slug: 'auto-centrum',
    name: 'Auto-Centrum Gliwice',
    video: 'auto-centrum-gliwice',
    tagline: 'Warsztat samochodowy. Prosta strona z telefonem i umawianiem wizyty na wierzchu.',
    taglineEn: 'Car repair shop. A simple site with the phone number and booking up front.',
  },
  {
    slug: 'vibeon',
    name: 'Vibeon',
    video: 'vibeon',
    tagline: 'Sklep z kosmetykami CBD. Strona produktowa w dwóch językach.',
    taglineEn: 'CBD cosmetics shop. A bilingual product site.',
  },
  {
    slug: 'liberta',
    name: 'Liberta Okna',
    video: 'libertaokna',
    tagline: 'Producent okien. Kampania "Hybrid X" przeniesiona na stronę.',
    taglineEn: 'Window manufacturer. The “Hybrid X” campaign brought to the website.',
  },
];
