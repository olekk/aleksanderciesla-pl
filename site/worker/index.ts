// Worker przed statyką: www → apex (301) i noindex na każdym adresie spoza domeny produkcyjnej
// (podgląd *.workers.dev nie może trafić do Google). Pliki z /_astro/ i /media/ omijają Workera
// (run_worker_first w wrangler.jsonc), bo plan Free ma limit wywołań Workera.

interface Env {
  ASSETS: Fetcher;
  PRODUCTION_HOST: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === `www.${env.PRODUCTION_HOST}`) {
      url.hostname = env.PRODUCTION_HOST;
      return Response.redirect(url.toString(), 301);
    }

    const res = await env.ASSETS.fetch(request);
    if (url.hostname === env.PRODUCTION_HOST) return res;

    const out = new Response(res.body, res);
    out.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return out;
  },
} satisfies ExportedHandler<Env>;
