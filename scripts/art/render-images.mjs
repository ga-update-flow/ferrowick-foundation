// Renders every site image (scenes, portraits, logo, flyers) to static files with Chromium.
// Usage: node scripts/art/render-images.mjs   (requires the `playwright` package)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { SCENES, portrait, svgDoc } from './illustrations.mjs';
import { board, staff, memoriam, fellowshipPortrait } from '../../content/people.mjs';
import { flyers } from '../../content/news.mjs';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(path.join(process.env.NODE_PATH || '', 'playwright')); }

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const OUT = path.join(ROOT, 'src/static');
const FONTS = fs.readFileSync(path.join(ROOT, 'src/assets/fonts/fonts.css'), 'utf8')
  .replace(/url\(\/assets\/fonts\//g, `url(file://${ROOT}/src/assets/fonts/`);

const U = (y, m, f) => `wp-content/uploads/${y}/${m}/${f}`;

// [output path, width, height, scene, seed]
const SCENE_IMAGES = [
  [U(2022, '03', 'clinic-visit-611.jpg'), 611, 676, 'clinic', 11],
  [U(2022, '03', 'pantry-day-635.jpg'), 635, 336, 'food', 12],
  [U(2022, '03', 'story-circle-635.jpg'), 635, 336, 'reading', 13],
  [U(2022, '03', 'youth-council-635.jpg'), 635, 336, 'meeting', 14],
  [U(2022, '03', 'beach-cleanup-635.jpg'), 635, 336, 'cleanup', 15],
  [U(2021, '12', 'circle-garden.jpg'), 454, 452, 'garden', 21],
  [U(2021, '12', 'circle-reading.jpg'), 454, 452, 'reading', 22],
  [U(2022, '01', 'circle-art-studio.jpg'), 454, 452, 'artclass', 23],
  [U(2021, '12', 'circle-volunteers.jpg'), 454, 452, 'cleanup', 24],
  [U(2022, '01', 'family-park-day.jpg'), 1903, 430, 'park', 31],
  [U(2022, '01', 'family-park-day-mobile.jpg'), 777, 518, 'park', 31],
  [U(2022, '01', 'library-storytime.jpg'), 1903, 580, 'reading', 41],
  [U(2022, '01', 'library-storytime-mobile.jpg'), 777, 575, 'reading', 41],
  [U(2022, '01', 'classroom-learning.jpg'), 500, 652, 'classroom', 42],
  [U(2021, '12', 'garden-harvest.jpg'), 1903, 700, 'garden', 51],
  [U(2021, '12', 'garden-harvest-mobile.jpg'), 777, 508, 'garden', 51],
  [U(2021, '12', 'market-produce.jpg'), 400, 622, 'food', 52],
  [U(2021, '12', 'pantry-volunteers.jpg'), 1903, 596, 'food', 61],
  [U(2022, '01', 'pantry-volunteers-mobile.jpg'), 777, 573, 'food', 61],
  [U(2022, '01', 'shoreline-crew.jpg'), 528, 632, 'cleanup', 62],
  [U(2022, '01', 'painter-closeup.jpg'), 1903, 528, 'painting', 71],
  [U(2022, '01', 'painter-closeup-mobile.jpg'), 777, 585, 'painting', 71],
  [U(2022, '01', 'studio-class.jpg'), 600, 462, 'artclass', 72],
  [U(2022, '01', 'learning-center-opening.jpg'), 1600, 620, 'celebration', 81],
  [U(2022, '01', 'harbor-festival.jpg'), 1903, 500, 'festival', 91],
  [U(2022, '01', 'harbor-festival-mobile.jpg'), 777, 556, 'festival', 91],
  [U(2022, '01', 'make-a-difference.jpg'), 800, 573, 'meeting', 101],
  [U(2021, '11', 'ferrowick-savings.jpg'), 381, 372, 'bank', 102],
  [U(2022, '01', 'build-day.jpg'), 774, 603, 'house', 103],
  [U(2022, '01', 'systems-mapping.jpg'), 600, 473, 'stickies', 104],
  [U(2022, '01', 'kids-art-room.jpg'), 700, 933, 'artclass', 105],
  [U(2022, '01', 'data-walk.jpg'), 600, 550, 'chart', 106],
  [U(2021, '12', 'collective-impact-approach.jpg'), 545, 512, 'network', 107],
  [U(2022, '01', 'cross-initiative-convening.jpg'), 650, 417, 'meeting', 108],
  [U(2021, '11', 'biennial-covers.jpg'), 400, 410, 'reports', 109],
  [U(2022, '01', 'harbor-view.jpg'), 1200, 630, 'harbor', 110],
];

// Illustrated portraits for every fictional person (card size and profile size).
const strip = (p) => p.replace(/^\//, '');
const PEOPLE = [
  ...board.flatMap((b) => [{ path: strip(b.photo), w: 200, h: 234, seed: b.seed, opts: b.opts }, { path: strip(b.large), w: 397, h: 400, seed: b.seed, opts: b.opts }]),
  ...staff.flatMap((b) => [{ path: strip(b.photo), w: 200, h: 234, seed: b.seed, opts: b.opts }, { path: strip(b.large), w: 298, h: 300, seed: b.seed, opts: b.opts }]),
  ...memoriam.map((b) => ({ path: strip(b.photo), w: 310, h: 400, seed: b.seed, opts: { ...b.opts, mono: true }, mono: true })),
  { path: strip(fellowshipPortrait.path), w: 308, h: 400, seed: fellowshipPortrait.seed, opts: { ...fellowshipPortrait.opts, mono: true }, mono: true },
];

async function main() {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  const shot = async (rel, w, h, html, type = 'jpeg') => {
    const file = path.join(OUT, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    await page.setViewportSize({ width: w, height: h });
    const tmp = path.join(ROOT, 'build/tmp-render.html');
    fs.mkdirSync(path.dirname(tmp), { recursive: true });
    fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}html,body{margin:0;padding:0}</style></head><body>${html}</body></html>`);
    await page.goto('file://' + tmp, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const opts = { path: file, clip: { x: 0, y: 0, width: w, height: h }, omitBackground: type === 'png' };
    if (type === 'jpeg') opts.quality = 82;
    opts.type = type;
    await page.screenshot(opts);
    console.log('wrote', rel);
  };

  for (const [rel, w, h, scene, seed] of SCENE_IMAGES) await shot(rel, w, h, svgDoc(w, h, SCENES[scene](w, h, seed)));
  for (const p of PEOPLE) await shot(p.path, p.w, p.h, svgDoc(p.w, p.h, portrait(p.w, p.h, p.seed, p.opts || {}), p.mono), 'jpeg');

  // Logo (2x) — lighthouse mark above a two-line wordmark, brass bar at left, brass rule beneath.
  const logoHtml = (scale) => `<div style="width:${230 * scale}px;height:${104 * scale}px;position:relative;font-family:'Source Sans 3';">
    <svg style="position:absolute;left:${74 * scale}px;top:${2 * scale}px" width="${80 * scale}" height="${40 * scale}" viewBox="0 0 80 40">
      <path d="M2 38 Q20 32 40 36 T78 34" stroke="#234E70" stroke-width="2.4" fill="none"/>
      <path d="M33 34 L36 10 L44 10 L47 34 Z" fill="#234E70"/><rect x="35.2" y="17" width="9.6" height="3.4" fill="#fff"/><rect x="34.6" y="24" width="10.8" height="3.4" fill="#fff"/>
      <rect x="35" y="5" width="10" height="5" fill="#C9963F"/><path d="M34 5 L40 0 L46 5 Z" fill="#234E70"/>
      <path d="M46 7 L72 1 L72 13 Z" fill="#C9963F" opacity=".55"/><path d="M34 7 L8 1 L8 13 Z" fill="#C9963F" opacity=".35"/>
      <path d="M8 38 L14 30 L22 30 L26 36Z" fill="#234E70"/><path d="M16 30 L16 22 L22 29Z" fill="#234E70"/>
    </svg>
    <div style="position:absolute;left:0;top:${46 * scale}px;width:${8 * scale}px;height:${52 * scale}px;background:#C9963F"></div>
    <div style="position:absolute;left:${16 * scale}px;top:${44 * scale}px;color:#234E70;font-weight:700;font-size:${23 * scale}px;line-height:${24 * scale}px;letter-spacing:-.2px">The Ferrowick<br>Foundation</div>
    <div style="position:absolute;left:${8 * scale}px;top:${98 * scale}px;width:${210 * scale}px;height:${3 * scale}px;background:#C9963F"></div></div>`;
  await shot('assets/img/logo@2x.png', 460, 208, logoHtml(2), 'png');
  await shot('assets/img/logo.png', 230, 104, logoHtml(1), 'png');
  const fav = (s) => `<div style="width:${s}px;height:${s}px;background:#234E70;border-radius:${s * 0.18}px;position:relative">
    <svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M26 54 L29 18 L35 18 L38 54 Z" fill="#fff"/><rect x="27.5" y="10" width="9" height="8" fill="#C9963F"/><path d="M26 10 L32 4 L38 10Z" fill="#fff"/><path d="M38 12 L60 6 L60 20Z" fill="#C9963F" opacity=".8"/><path d="M6 56 Q20 50 32 54 T60 52" stroke="#C9963F" stroke-width="4" fill="none"/></svg></div>`;
  await shot('favicon-32x32.png', 32, 32, fav(32), 'png');
  await shot('apple-touch-icon.png', 180, 180, fav(180), 'png');
  await shot('assets/img/favicon-512.png', 512, 512, fav(512), 'png');

  // Flyers and post images (text lives only in the image for some posts, mirroring the reference).
  for (const f of flyers) await shot(strip(f.path), f.w, f.h, f.html, f.type || 'png');

  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
