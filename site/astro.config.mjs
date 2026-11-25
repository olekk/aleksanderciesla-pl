// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aleksanderciesla.pl',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' }, // CSS w HTML – bez blokujących żądań
  server: { port: 4323 }, // port projektu (Karta w CLAUDE.md)
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
