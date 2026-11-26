// Mapa strony dla Google i Binga (indeksowanie włączone na prośbę Olka 26.11.2026).
// Nowa podstrona = nowy wpis tutaj (CLAUDE.md, sekcja 9).
import type { APIRoute } from 'astro';
import { site } from '../config/site';

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/art-papier/', priority: '0.8' },
  { path: '/hc-instal/', priority: '0.8' },
  { path: '/strony/', priority: '0.6' },
];

// Każda strona jest też po angielsku pod /en/... (hreflang w mapie, na prośbę Olka 26.11.2026).
export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const abs = (path: string) => new URL(path, site.url).href;
  const urls = pages
    .flatMap((p) => {
      const alt = [
        `<xhtml:link rel="alternate" hreflang="pl" href="${abs(p.path)}"/>`,
        `<xhtml:link rel="alternate" hreflang="en" href="${abs('/en' + p.path)}"/>`,
        `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(p.path)}"/>`,
      ].join('');
      return [p.path, '/en' + p.path].map(
        (path) =>
          `  <url><loc>${abs(path)}</loc><lastmod>${lastmod}</lastmod><priority>${p.priority}</priority>${alt}</url>`,
      );
    })
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
