// Wersje językowe (na prośbę Olka 26.11.2026): polska pod /, angielska pod /en/.
// Teksty obu wersji stoją obok siebie w szablonach jako T('polski', 'English'), żeby przy zmianie tekstu
// od razu było widać, co poprawić w drugim języku (decyzja Claude, do korekty).
export type Lang = 'pl' | 'en';

export const tr = (lang: Lang) => (pl: string, en: string) => (lang === 'en' ? en : pl);

// Adres strony w danym języku: '/art-papier/' → '/en/art-papier/'.
export const href = (lang: Lang, path: string) => (lang === 'en' ? `/en${path}` : path);

// Adres tej samej strony w drugim języku (dla przełącznika i hreflang).
export const otherPath = (lang: Lang, path: string) =>
  lang === 'en' ? path.replace(/^\/en(?=\/)/, '') || '/' : `/en${path}`;
