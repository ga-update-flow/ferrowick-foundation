// Crawls the site like a simple grant crawler would and verifies links, documents and indexing directives.
// Usage: BASE=http://localhost:8080 node scripts/test/check-site.mjs      (or BASE=https://<deployed-site>)
// Writes a JSON summary to build/test-results.json and exits non-zero on failures.
import fs from 'node:fs';

const BASE = (process.env.BASE || 'http://localhost:8080').replace(/\/$/, '');
const CHECK_EXTERNAL = process.env.CHECK_EXTERNAL === '1';
const origin = new URL(BASE).origin;
const seen = new Map();
const START = new URL(BASE + '/').pathname;
const queue = [START, START + 'sitemap.xml', START + 'robots.txt'];
const external = new Set();
const failures = [];
const pagesMissingNoindex = [];
const docs = [];
const hashOnly = [];

const norm = (u, from) => {
  try {
    const x = new URL(u, origin + from);
    if (x.origin !== origin) { if (/^https?:/.test(x.protocol)) external.add(x.href); return null; }
    return x.pathname + x.search;
  } catch { return null; }
};

while (queue.length) {
  const p = queue.shift();
  if (seen.has(p)) continue;
  let res;
  try { res = await fetch(origin + p, { redirect: 'manual' }); } catch (e) { failures.push({ url: p, error: e.message }); seen.set(p, 0); continue; }
  seen.set(p, res.status);
  if (res.status >= 300 && res.status < 400) { const loc = res.headers.get('location'); if (loc) { const n = norm(loc, p); if (n) queue.push(n); } continue; }
  if (res.status !== 200) { failures.push({ url: p, status: res.status }); continue; }
  const type = res.headers.get('content-type') || '';
  const xrt = res.headers.get('x-robots-tag');
  if (/\.(pdf|docx?|xlsx?|xlsm|mp4)$/i.test(p.split('?')[0])) {
    const buf = Buffer.from(await res.arrayBuffer());
    const magic = buf.subarray(0, 4).toString('hex');
    const ok = p.endsWith('.pdf') ? buf.subarray(0, 5).toString() === '%PDF-' : p.endsWith('.mp4') ? buf.subarray(4, 8).toString() === 'ftyp' : (magic === 'd0cf11e0' || magic === '504b0304');
    docs.push({ url: p, bytes: buf.length, type, xRobotsTag: xrt, validSignature: ok });
    if (!ok) failures.push({ url: p, error: 'invalid file signature' });
    continue;
  }
  const body = await res.text();
  if (type.includes('text/html')) {
    if (!/<meta name="robots" content="noindex, nofollow">/.test(body)) pagesMissingNoindex.push(p);
    for (const m of body.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      const raw = m[1].replace(/&amp;/g, '&');
      if (raw === '#' || raw.startsWith('#')) { hashOnly.push(`${p} → ${raw}`); continue; }
      if (/^(mailto|tel|javascript):/.test(raw)) continue;
      const n = norm(raw, p);
      if (n && !seen.has(n)) queue.push(n);
    }
    for (const m of body.matchAll(/srcset="([^"]+)"/g)) for (const part of m[1].split(',')) { const n = norm(part.trim().split(' ')[0], p); if (n) queue.push(n); }
  } else if (p === '/sitemap.xml') {
    for (const m of body.matchAll(/<loc>([^<]+)<\/loc>/g)) { const u = new URL(m[1]); queue.push(u.pathname); }
  } else if (type.includes('text/css')) {
    for (const m of body.matchAll(/url\(([^)]+)\)/g)) { const u = m[1].replace(/['"]/g, ''); if (!u.startsWith('data:')) { const n = norm(u, p); if (n) queue.push(n); } }
  }
}

let externalResults = [];
if (CHECK_EXTERNAL) {
  for (const u of external) {
    if (/sharer|shareArticle/.test(u)) continue;
    try { const r = await fetch(u, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 link-check' } }); externalResults.push({ url: u, status: r.status }); }
    catch (e) { externalResults.push({ url: u, error: e.message }); }
  }
}

const homeHeaders = Object.fromEntries((await fetch(origin + START)).headers);
const htmlPages = [...seen.entries()].filter(([u, s]) => s === 200 && !/\.[a-z0-9]{2,4}(\?|$)/i.test(u.split('?')[0])).map(([u]) => u);
const summary = {
  base: BASE, crawledUrls: seen.size, htmlPages: htmlPages.length, documents: docs.length,
  failures, pagesMissingNoindex, hashOnlyLinks: [...new Set(hashOnly.map((h) => h.split(' → ')[1]))],
  documentsWithoutXRobotsTag: docs.filter((d) => !d.xRobotsTag).map((d) => d.url),
  homeXRobotsTag: homeHeaders['x-robots-tag'] || null, externalLinks: [...external].length, externalResults,
  docs,
};
fs.mkdirSync('build', { recursive: true });
fs.writeFileSync('build/test-results.json', JSON.stringify(summary, null, 1));
console.log(JSON.stringify({ ...summary, docs: undefined, externalResults: externalResults.filter((r) => r.error || r.status >= 400) }, null, 1));
process.exit(failures.length || pagesMissingNoindex.length ? 1 : 0);
