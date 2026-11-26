// Zrzut całej strony do „odbicia” w menu na iPhonie, w Safari i w Firefoksie (test na prośbę Olka 27.11.2026).
// Tamte przeglądarki nie wyginają tła pod szkłem, więc w krawędziach menu przewija się odbity w pionie zrzut strony.
// Uruchomienie po zmianach na stronie głównej (przy działającym `npx astro preview --port 4323`):
//   node scripts/reflection.cjs
// Wynik: public/img/odbicie-telefon.webp i public/img/odbicie-komputer.webp (mała rozdzielczość, i tak jest rozmyte).
const { chromium } = require('playwright');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

const base = process.argv[2] || 'http://localhost:4323/';
const out = path.join(__dirname, '..', 'public', 'img');

(async () => {
  const browser = await chromium.launch();
  for (const [name, width, scale] of [
    ['telefon', 390, 0.4],
    ['komputer', 1440, 0.3],
  ]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(base, { waitUntil: 'load' });
    await page.evaluate(async () => {
      document.querySelectorAll('.pre').forEach((e) => e.classList.remove('pre'));
      document.querySelectorAll('video[data-poster]').forEach((v) => (v.poster = v.dataset.poster + '.webp'));
      const h = document.querySelector('.site-header');
      if (h) h.style.visibility = 'hidden';
      // Przewijamy całą stronę, żeby dociągnęły się leniwe obrazki.
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(1500);
    const png = path.join(out, `odbicie-${name}.png`);
    await page.screenshot({ path: png, fullPage: true });
    const webp = path.join(out, `odbicie-${name}.webp`);
    const w = Math.round(width * scale);
    // sharp jest w zależnościach Astro.
    execFileSync('node', ['-e', `require('sharp')(${JSON.stringify(png)}).resize({width:${w}}).webp({quality:35}).toFile(${JSON.stringify(webp)}).then(()=>require('fs').unlinkSync(${JSON.stringify(png)}))`], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
    });
    console.log(webp);
    await page.close();
  }
  await browser.close();
})();
