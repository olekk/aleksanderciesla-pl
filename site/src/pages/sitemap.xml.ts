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

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(
      (p) =>
        `  <url><loc>${new URL(p.path, site.url).href}</loc><lastmod>${lastmod}</lastmod><priority>${p.priority}</priority></url>`,
    )
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
