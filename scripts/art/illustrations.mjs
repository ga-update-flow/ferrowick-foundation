// Procedural flat-style SVG illustrations for the Ferrowick Foundation demo site.
// Every image is original and generated here; no third-party photos are used.

const SKIN = ['#F2D0B5', '#E0AC86', '#C68A5E', '#A86B45', '#7A4B2E', '#5C3820', '#F5DCC4', '#D49A74'];
const HAIR = ['#2B1D14', '#4A2F1E', '#7A5232', '#C9A26B', '#1B1B1B', '#8A8A8A', '#B5562E', '#3B2A20'];
const CLOTH = ['#234E70', '#C9963F', '#3E7D4F', '#B8483A', '#6C5B9E', '#2F8A8A', '#E0B64A', '#D96C4E', '#4E6E9E', '#8DB580', '#F4F1EA', '#5A5A6E'];

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

// A standing or seated person, feet at (x, y). h = total height.
export function person(r, x, y, h, o = {}) {
  const skin = o.skin || pick(r, SKIN), hair = o.hair || pick(r, HAIR);
  const top = o.top || pick(r, CLOTH), bottom = o.bottom || pick(r, ['#2E3440', '#3B4A63', '#5B4636', '#22303C', '#6B6B78']);
  const u = h / 100, head = 13 * u, bodyW = 30 * u;
  const seated = o.seated, facing = o.facing || 0;
  const hy = y - (seated ? 72 : 100) * u + head;
  let g = `<g>`;
  if (!seated) {
    g += `<rect x="${x - 11 * u}" y="${y - 44 * u}" width="${9 * u}" height="${44 * u}" rx="${3 * u}" fill="${bottom}"/>`;
    g += `<rect x="${x + 2 * u}" y="${y - 44 * u}" width="${9 * u}" height="${44 * u}" rx="${3 * u}" fill="${bottom}"/>`;
    g += `<ellipse cx="${x - 7 * u}" cy="${y - u}" rx="${7 * u}" ry="${3 * u}" fill="#2a2a2a"/><ellipse cx="${x + 7 * u}" cy="${y - u}" rx="${7 * u}" ry="${3 * u}" fill="#2a2a2a"/>`;
  } else {
    g += `<rect x="${x - 12 * u}" y="${y - 16 * u}" width="${34 * u}" height="${12 * u}" rx="${5 * u}" fill="${bottom}"/>`;
  }
  const by = hy + head * 0.8;
  const bh = (seated ? 40 : 52) * u;
  g += `<path d="M${x - bodyW / 2} ${by + bh} L${x - bodyW / 2 + 2 * u} ${by + 8 * u} Q${x} ${by - 2 * u} ${x + bodyW / 2 - 2 * u} ${by + 8 * u} L${x + bodyW / 2} ${by + bh} Z" fill="${top}"/>`;
  // arms
  const arm = o.arms || 'down';
  const aw = 7 * u;
  if (arm === 'down') {
    g += `<rect x="${x - bodyW / 2 - aw + 2 * u}" y="${by + 8 * u}" width="${aw}" height="${36 * u}" rx="${3.5 * u}" fill="${top}"/>`;
    g += `<rect x="${x + bodyW / 2 - 2 * u}" y="${by + 8 * u}" width="${aw}" height="${36 * u}" rx="${3.5 * u}" fill="${top}"/>`;
    g += `<circle cx="${x - bodyW / 2 - aw / 2 + 2 * u}" cy="${by + 45 * u}" r="${4 * u}" fill="${skin}"/><circle cx="${x + bodyW / 2 + aw / 2 - 2 * u}" cy="${by + 45 * u}" r="${4 * u}" fill="${skin}"/>`;
  } else if (arm === 'up') {
    g += `<rect x="${x - bodyW / 2 - aw + 3 * u}" y="${by - 26 * u}" width="${aw}" height="${36 * u}" rx="${3.5 * u}" fill="${top}" transform="rotate(-15 ${x - bodyW / 2} ${by + 8 * u})"/>`;
    g += `<rect x="${x + bodyW / 2 - 3 * u}" y="${by - 26 * u}" width="${aw}" height="${36 * u}" rx="${3.5 * u}" fill="${top}" transform="rotate(15 ${x + bodyW / 2} ${by + 8 * u})"/>`;
  } else if (arm === 'front') {
    g += `<rect x="${x - bodyW / 2}" y="${by + 22 * u}" width="${bodyW}" height="${aw}" rx="${3.5 * u}" fill="${top}" opacity="0.92"/>`;
    g += `<circle cx="${x + bodyW / 2 + 2 * u}" cy="${by + 25 * u}" r="${4 * u}" fill="${skin}"/>`;
  }
  // neck + head + hair
  g += `<rect x="${x - 3.5 * u}" y="${hy + head * 0.5}" width="${7 * u}" height="${8 * u}" fill="${skin}"/>`;
  const style = o.hairStyle ?? Math.floor(r() * 5);
  if (style === 2) g += `<ellipse cx="${x}" cy="${hy + head * 0.5}" rx="${head * 1.15}" ry="${head * 1.35}" fill="${hair}"/>`;
  if (style === 3) g += `<circle cx="${x}" cy="${hy - head * 0.1}" r="${head * 1.35}" fill="${hair}"/>`;
  g += `<circle cx="${x + facing * 2 * u}" cy="${hy}" r="${head}" fill="${skin}"/>`;
  if (style === 0) g += `<path d="M${x - head} ${hy - 1 * u} A${head} ${head} 0 0 1 ${x + head} ${hy - 1 * u} Q${x} ${hy - head * 0.6} ${x - head} ${hy - 1 * u}Z" fill="${hair}"/>`;
  if (style === 1) g += `<path d="M${x - head * 1.05} ${hy + 2 * u} A${head * 1.05} ${head * 1.05} 0 0 1 ${x + head * 1.05} ${hy + 2 * u} L${x + head * 0.8} ${hy - 2 * u} Q${x} ${hy - head * 0.5} ${x - head * 0.8} ${hy - 2 * u}Z" fill="${hair}"/>`;
  if (style === 2 || style === 3) g += `<path d="M${x - head} ${hy - 2 * u} A${head} ${head} 0 0 1 ${x + head} ${hy - 2 * u} Q${x} ${hy - head * 0.4} ${x - head} ${hy - 2 * u}Z" fill="${hair}"/>`;
  if (style === 4) g += `<path d="M${x - head * 1.02} ${hy} A${head * 1.02} ${head * 1.02} 0 0 1 ${x + head * 1.02} ${hy} Z" fill="${hair}"/>`;
  if (o.mask) g += `<rect x="${x - head * 0.7}" y="${hy + head * 0.1}" width="${head * 1.4}" height="${head * 0.6}" rx="${2 * u}" fill="#9FC9E8"/>`;
  if (o.glasses) g += `<g stroke="#222" stroke-width="${0.9 * u}" fill="none"><circle cx="${x - 4 * u}" cy="${hy}" r="${3 * u}"/><circle cx="${x + 4 * u}" cy="${hy}" r="${3 * u}"/></g>`;
  if (o.hold) g += o.hold(x, by, u);
  return g + `</g>`;
}

const book = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" rx="1"/><rect x="${x + w * 0.15}" y="${y + h * 0.1}" width="${w * 0.12}" height="${h * 0.8}" fill="#ffffff" opacity=".35"/>`;

function shelf(r, x, y, w, h, rows = 4) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#8A6142"/>`;
  const rh = h / rows;
  for (let i = 0; i < rows; i++) {
    const ry = y + i * rh;
    s += `<rect x="${x + 6}" y="${ry + 6}" width="${w - 12}" height="${rh - 10}" fill="#5E3F2A"/>`;
    let bx = x + 8;
    while (bx < x + w - 20) {
      const bw = 6 + r() * 10, bh = (rh - 16) * (0.7 + r() * 0.3);
      s += book(bx, ry + rh - 4 - bh, bw, bh, pick(r, CLOTH));
      bx += bw + 1.5;
    }
  }
  return s;
}

function tree(x, y, s, c = '#3E7D4F') {
  return `<rect x="${x - 5 * s}" y="${y - 70 * s}" width="${10 * s}" height="${70 * s}" fill="#6B4A2F"/>` +
    `<circle cx="${x}" cy="${y - 95 * s}" r="${42 * s}" fill="${c}"/><circle cx="${x - 30 * s}" cy="${y - 70 * s}" r="${28 * s}" fill="${c}"/><circle cx="${x + 30 * s}" cy="${y - 72 * s}" r="${30 * s}" fill="${c}"/>`;
}

function crate(r, x, y, w, h) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#B98A55"/><rect x="${x}" y="${y + h * 0.45}" width="${w}" height="${h * 0.1}" fill="#9C7244"/>`;
  for (let i = 0; i < 6; i++) s += `<circle cx="${x + w * (0.12 + i * 0.15)}" cy="${y - 4}" r="${w * 0.08}" fill="${pick(r, ['#D9534F', '#7FB04F', '#F0A830', '#E8D14A', '#5BA35B'])}"/>`;
  return s;
}

const sky = (w, h, a = '#CFE3EE', b = '#F4F8FA') => `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#sky)"/>`;

function crowd(r, w, baseY, n, hMin, hMax, opts = {}) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = (w / (n + 1)) * (i + 1) + (r() - 0.5) * (w / n) * 0.5;
    s += person(r, x, baseY + r() * 10, hMin + r() * (hMax - hMin), { arms: opts.arms ? pick(r, opts.arms) : 'down' });
  }
  return s;
}

// ---- scenes -----------------------------------------------------------------
export const SCENES = {
  clinic(w, h, seed) {
    const r = rng(seed);
    let s = `<rect width="${w}" height="${h}" fill="#F3E6D3"/><rect y="${h * 0.78}" width="${w}" height="${h * 0.22}" fill="#C9B79C"/>`;
    s += `<rect x="${w * 0.08}" y="${h * 0.12}" width="${w * 0.3}" height="${h * 0.28}" fill="#CFE3EE" stroke="#fff" stroke-width="10"/>`;
    s += `<rect x="${w * 0.55}" y="${h * 0.15}" width="${w * 0.32}" height="${h * 0.18}" rx="6" fill="#fff"/><text x="${w * 0.71}" y="${h * 0.26}" font-family="sans-serif" font-size="${w * 0.04}" fill="#234E70" text-anchor="middle" font-weight="700">WELL CHILD</text>`;
    s += `<rect x="${w * 0.3}" y="${h * 0.6}" width="${w * 0.5}" height="${h * 0.06}" fill="#E8EEF2"/><rect x="${w * 0.32}" y="${h * 0.66}" width="${w * 0.04}" height="${h * 0.12}" fill="#9AA"/><rect x="${w * 0.74}" y="${h * 0.66}" width="${w * 0.04}" height="${h * 0.12}" fill="#9AA"/>`;
    s += person(r, w * 0.27, h * 0.95, h * 0.62, { top: '#F4F1EA', mask: true, arms: 'front' });
    s += person(r, w * 0.55, h * 0.6, h * 0.22, { seated: true, top: '#9FC9E8' });
    s += person(r, w * 0.78, h * 0.96, h * 0.6, { top: '#2E3440', mask: true, arms: 'front' });
    return s;
  },
  food(w, h, seed) {
    const r = rng(seed);
    let s = sky(w, h) + `<rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="#B7B2A8"/>`;
    s += `<rect x="${w * 0.05}" y="${h * 0.08}" width="${w * 0.35}" height="${h * 0.55}" fill="#B88B6E"/>`;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) s += `<rect x="${w * (0.08 + i * 0.08)}" y="${h * (0.14 + j * 0.15)}" width="${w * 0.04}" height="${h * 0.08}" fill="#E6EEF2"/>`;
    s += `<path d="M${w * 0.45} ${h * 0.25} L${w * 0.95} ${h * 0.25} L${w * 0.9} ${h * 0.38} L${w * 0.5} ${h * 0.38}Z" fill="#2F8A8A"/>`;
    s += crowd(r, w, h * 0.98, 6, h * 0.5, h * 0.62);
    s += `<rect x="${w * 0.1}" y="${h * 0.72}" width="${w * 0.8}" height="${h * 0.06}" fill="#8A6142"/>`;
    for (let i = 0; i < 6; i++) s += crate(r, w * (0.13 + i * 0.12), h * 0.78, w * 0.1, h * 0.14);
    return s;
  },
  reading(w, h, seed) {
    const r = rng(seed);
    let s = `<rect width="${w}" height="${h}" fill="#EFE6D6"/>` + shelf(r, 0, 0, w, h * 0.62, 3);
    s += `<rect y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="#7FA36F"/>`;
    for (let i = 0; i < 7; i++) s += `<rect y="${h * (0.66 + i * 0.05)}" width="${w}" height="${h * 0.015}" fill="#6D9160"/>`;
    s += person(r, w * 0.68, h * 0.92, h * 0.55, { seated: true, glasses: true, arms: 'front', hold: (x, by, u) => `<rect x="${x - 30 * u}" y="${by + 10 * u}" width="${44 * u}" height="${26 * u}" fill="#fff"/><rect x="${x - 8 * u}" y="${by + 10 * u}" width="${2 * u}" height="${26 * u}" fill="#ccc"/><circle cx="${x - 18 * u}" cy="${by + 22 * u}" r="${6 * u}" fill="#4E6E9E"/>` });
    for (let i = 0; i < 5; i++) s += person(r, w * (0.1 + i * 0.1), h * (0.98 - (i % 2) * 0.05), h * 0.32, { seated: true });
    return s;
  },
  meeting(w, h, seed) {
    const r = rng(seed);
    let s = `<rect width="${w}" height="${h}" fill="#E9EEF1"/><rect x="${w * 0.62}" y="${h * 0.08}" width="${w * 0.32}" height="${h * 0.4}" fill="#fff" stroke="#c7cfd6" stroke-width="4"/>`;
    for (let i = 0; i < 4; i++) s += `<rect x="${w * 0.65}" y="${h * (0.14 + i * 0.08)}" width="${w * (0.15 + r() * 0.1)}" height="${h * 0.025}" fill="#9fb0bf"/>`;
    s += crowd(r, w, h * 0.92, 5, h * 0.45, h * 0.52);
    s += `<path d="M0 ${h * 0.7} L${w} ${h * 0.62} L${w} ${h} L0 ${h}Z" fill="#3B3F46"/>`;
    for (let i = 0; i < 4; i++) s += `<rect x="${w * (0.15 + i * 0.2)}" y="${h * (0.7 - i * 0.02)}" width="${w * 0.08}" height="${h * 0.05}" fill="#fff" transform="rotate(-3)"/><rect x="${w * (0.25 + i * 0.2)}" y="${h * (0.62 - i * 0.02)}" width="${w * 0.015}" height="${h * 0.08}" fill="#BFE0F2" opacity=".8"/>`;
    return s;
  },
  cleanup(w, h, seed) {
    const r = rng(seed);
    let s = sky(w, h, '#BFD9C4', '#E6F0E2') + `<rect y="${h * 0.75}" width="${w}" height="${h * 0.25}" fill="#5D7F4A"/>`;
    for (let i = 0; i < 7; i++) s += tree(w * (i * 0.17), h * 0.8, h / 380, pick(r, ['#3E7D4F', '#4F8F55', '#2F6B42']));
    s += crowd(r, w, h * 0.95, 7, h * 0.45, h * 0.55, { arms: ['down', 'down', 'up'] });
    for (let i = 0; i < 6; i++) s += `<ellipse cx="${w * (0.25 + i * 0.09)}" cy="${h * 0.93}" rx="${w * 0.04}" ry="${h * 0.06}" fill="#1E1E22"/>`;
    return s;
  },
  park(w, h, seed) {
    const r = rng(seed);
    let s = sky(w, h, '#CDE4C8', '#EAF3E3') + `<rect y="${h * 0.65}" width="${w}" height="${h * 0.35}" fill="#7FB04F"/>`;
    for (let i = 0; i < 10; i++) s += tree(w * (i * 0.11), h * 0.68, h / 520, '#5E9A55');
    s += `<rect y="${h * 0.6}" width="${w}" height="${h * 0.03}" fill="#C8C8C0"/>`;
    for (let i = 0; i < 6; i++) {
      const x = w * (0.08 + i * 0.17);
      s += person(r, x, h * 1.08, h * 0.95, { arms: i % 3 === 0 ? 'up' : 'down' });
      if (i % 2 === 0) s += person(r, x + w * 0.05, h * 1.0, h * 0.42);
    }
    return s;
  },
  garden(w, h, seed) {
    const r = rng(seed);
    let s = sky(w, h, '#D4E8F2', '#F2F7EC') + `<rect y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="#6E4F35"/>`;
    for (let i = 0; i < 5; i++) {
      s += `<rect x="${w * (0.03 + i * 0.2)}" y="${h * 0.66}" width="${w * 0.17}" height="${h * 0.12}" fill="#8A6142"/>`;
      for (let j = 0; j < 5; j++) s += `<ellipse cx="${w * (0.05 + i * 0.2 + j * 0.03)}" cy="${h * 0.64}" rx="${w * 0.012}" ry="${h * 0.05}" fill="#4F9A47"/>`;
    }
    s += crowd(r, w, h * 0.98, 5, h * 0.42, h * 0.55, { arms: ['front', 'down'] });
    for (let i = 0; i < 3; i++) s += crate(r, w * (0.2 + i * 0.25), h * 0.85, w * 0.12, h * 0.12);
    return s;
  },
  artclass(w, h, seed) {
    const r = rng(seed);
    let s = `<rect width="${w}" height="${h}" fill="#F6EEDF"/>`;
    for (let i = 0; i < 5; i++) s += `<rect x="${w * (0.05 + i * 0.19)}" y="${h * 0.1}" width="${w * 0.14}" height="${h * 0.18}" fill="${pick(r, CLOTH)}" opacity=".85"/><circle cx="${w * (0.12 + i * 0.19)}" cy="${h * 0.19}" r="${h * 0.05}" fill="${pick(r, ['#F0A830', '#fff', '#D96C4E'])}"/>`;
    s += crowd(r, w, h * 0.85, 4, h * 0.38, h * 0.48, { arms: ['front'] });
    s += `<rect y="${h * 0.66}" width="${w}" height="${h * 0.34}" fill="#D9C4A0"/>`;
    for (let i = 0; i < 9; i++) s += `<circle cx="${w * (0.08 + i * 0.1)}" cy="${h * (0.75 + r() * 0.15)}" r="${h * 0.025}" fill="${pick(r, ['#D9534F', '#4E6E9E', '#F0A830', '#3E7D4F', '#6C5B9E'])}"/>`;
    s += `<rect x="${w * 0.15}" y="${h * 0.72}" width="${w * 0.22}" height="${h * 0.14}" fill="#fff"/><path d="M${w * 0.17} ${h * 0.82} q${w * 0.05} -${h * 0.1} ${w * 0.1} 0 t${w * 0.08} -${h * 0.02}" stroke="#2F8A8A" stroke-width="${h * 0.01}" fill="none"/>`;
    return s;
  },
  painting(w, h, seed) {
    const r = rng(seed);
    let s = `<rect width="${w}" height="${h}" fill="#EDE3D2"/>`;
    s += `<rect x="${w * 0.42}" y="${h * 0.08}" width="${w * 0.4}" height="${h * 0.7}" fill="#fff" stroke="#8A6142" stroke-width="${h * 0.02}"/>`;
    s += `<circle cx="${w * 0.55}" cy="${h * 0.3}" r="${h * 0.12}" fill="#E0B64A"/><path d="M${w * 0.43} ${h * 0.65} Q${w * 0.55} ${h * 0.4} ${w * 0.66} ${h * 0.55} T${w * 0.81} ${h * 0.45} L${w * 0.81} ${h * 0.77} L${w * 0.43} ${h * 0.77}Z" fill="#2F8A8A"/>`;
    s += `<path d="M${w * 0.43} ${h * 0.72} Q${w * 0.6} ${h * 0.6} ${w * 0.81} ${h * 0.7} L${w * 0.81} ${h * 0.77} L${w * 0.43} ${h * 0.77}Z" fill="#234E70"/>`;
    s += person(r, w * 0.25, h * 1.15, h * 1.1, { arms: 'front', top: '#B8483A' });
    s += `<ellipse cx="${w * 0.12}" cy="${h * 0.86}" rx="${w * 0.08}" ry="${h * 0.06}" fill="#C9A26B"/>` + [0, 1, 2, 3].map(i => `<circle cx="${w * (0.08 + i * 0.025)}" cy="${h * 0.85}" r="${h * 0.012}" fill="${['#D9534F', '#4E6E9E', '#F0A830', '#3E7D4F'][i]}"/>`).join('');
    return s;
  },
  classroom(w, h, seed) {
    const r = rng(seed);
    let s = `<rect width="${w}" height="${h}" fill="#E6EFE8"/><rect x="${w * 0.1}" y="${h * 0.08}" width="${w * 0.8}" height="${h * 0.32}" fill="#2F4A3A" stroke="#8A6142" stroke-width="${h * 0.015}"/>`;
    s += `<text x="${w * 0.5}" y="${h * 0.26}" font-family="Georgia,serif" font-size="${h * 0.08}" fill="#F4F1EA" text-anchor="middle">a b c  1 2 3</text>`;
    s += person(r, w * 0.5, h * 0.82, h * 0.45, { arms: 'front' });
    s += `<rect y="${h * 0.72}" width="${w}" height="${h * 0.28}" fill="#C8A878"/>`;
    for (let i = 0; i < 4; i++) s += person(r, w * (0.15 + i * 0.23), h * 1.02, h * 0.3, { seated: true });
    return s;
  },
  celebration(w, h, seed) {
    const r = rng(seed);
    let s = `<rect width="${w}" height="${h}" fill="#3B4A63"/><rect width="${w}" height="${h * 0.25}" fill="#E8E1D2"/>`;
    s += `<text x="${w * 0.5}" y="${h * 0.17}" font-family="Georgia,serif" font-size="${h * 0.09}" fill="#234E70" text-anchor="middle" font-weight="700">GRAND OPENING · LEARNING CENTER</text>`;
    for (let i = 0; i < 18; i++) s += `<circle cx="${r() * w}" cy="${h * (0.3 + r() * 0.2)}" r="${h * 0.035}" fill="${pick(r, ['#C9963F', '#F4F1EA', '#B8483A', '#4E6E9E'])}"/>`;
    s += crowd(r, w, h * 1.05, 11, h * 0.6, h * 0.75, { arms: ['down', 'up', 'down'] });
    s += `<rect x="0" y="${h * 0.72}" width="${w}" height="${h * 0.02}" fill="#B8483A"/>`;
    return s;
  },
  festival(w, h, seed) {
    const r = rng(seed);
    let s = sky(w, h, '#F4D9A8', '#FBEFD9') + `<rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="#9BB57A"/>`;
    for (let i = 0; i < 14; i++) s += `<path d="M${i * w / 14} ${h * 0.08} L${(i + 0.5) * w / 14} ${h * 0.2} L${(i + 1) * w / 14} ${h * 0.08}Z" fill="${pick(r, ['#C9963F', '#B8483A', '#234E70', '#2F8A8A'])}"/>`;
    s += `<path d="M0 ${h * 0.08} Q${w / 2} ${h * 0.14} ${w} ${h * 0.08}" stroke="#555" fill="none" stroke-width="2"/>`;
    s += `<rect x="${w * 0.62}" y="${h * 0.3}" width="${w * 0.3}" height="${h * 0.12}" fill="#F4F1EA"/><path d="M${w * 0.6} ${h * 0.3} L${w * 0.77} ${h * 0.18} L${w * 0.94} ${h * 0.3}Z" fill="#B8483A"/>`;
    s += crowd(r, w, h * 1.02, 14, h * 0.6, h * 0.75, { arms: ['down', 'up'] });
    return s;
  },
  house(w, h, seed) {
    const r = rng(seed);
    let s = sky(w, h);
    s += `<rect x="${w * 0.25}" y="${h * 0.3}" width="${w * 0.5}" height="${h * 0.45}" fill="none" stroke="#B98A55" stroke-width="${w * 0.012}"/>`;
    for (let i = 1; i < 6; i++) s += `<rect x="${w * (0.25 + i * 0.083)}" y="${h * 0.3}" width="${w * 0.01}" height="${h * 0.45}" fill="#B98A55"/>`;
    s += `<path d="M${w * 0.2} ${h * 0.32} L${w * 0.5} ${h * 0.1} L${w * 0.8} ${h * 0.32}" stroke="#9C7244" stroke-width="${w * 0.015}" fill="none"/>`;
    s += `<rect y="${h * 0.75}" width="${w}" height="${h * 0.25}" fill="#A68A64"/>`;
    s += crowd(r, w, h * 0.98, 5, h * 0.45, h * 0.55, { arms: ['up', 'front', 'down'] });
    return s;
  },
  stickies(w, h, seed) {
    const r = rng(seed);
    let s = `<rect width="${w}" height="${h}" fill="#F5F5F0"/><rect x="${w * 0.04}" y="${h * 0.05}" width="${w * 0.92}" height="${h * 0.62}" fill="#fff" stroke="#ccc"/>`;
    const pts = [];
    for (let i = 0; i < 16; i++) { const x = w * (0.08 + r() * 0.8), y = h * (0.1 + r() * 0.48); pts.push([x, y]); }
    pts.forEach((p, i) => { const q = pts[(i * 5 + 3) % pts.length]; s += `<path d="M${p[0]} ${p[1]} Q${(p[0] + q[0]) / 2} ${p[1] - 30} ${q[0]} ${q[1]}" stroke="#4E6E9E" fill="none" stroke-width="1.5"/>`; });
    pts.forEach(p => s += `<rect x="${p[0] - w * 0.035}" y="${p[1] - h * 0.035}" width="${w * 0.07}" height="${h * 0.07}" fill="${pick(r, ['#F7E07B', '#F5A3A3', '#9FD3C7', '#FBC78D'])}"/>`);
    s += crowd(r, w, h * 1.1, 4, h * 0.55, h * 0.6, { arms: ['up', 'down'] });
    return s;
  },
  chart(w, h, seed) {
    const r = rng(seed);
    let s = `<rect width="${w}" height="${h}" fill="#EEF2F5"/><rect x="${w * 0.06}" y="${h * 0.06}" width="${w * 0.88}" height="${h * 0.6}" fill="#fff" stroke="#c7cfd6"/>`;
    for (let i = 0; i < 8; i++) { const bh = h * (0.1 + r() * 0.4); s += `<rect x="${w * (0.12 + i * 0.1)}" y="${h * 0.6 - bh}" width="${w * 0.06}" height="${bh}" fill="${i % 2 ? '#234E70' : '#C9963F'}"/>`; }
    s += crowd(r, w, h * 1.1, 4, h * 0.55, h * 0.6, { arms: ['front', 'down'] });
    return s;
  },
  network(w, h, seed) {
    const r = rng(seed);
    let s = `<rect width="${w}" height="${h}" fill="#F4F1EA"/>`;
    const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.34;
    const labels = ['Schools', 'Health', 'Families', 'Funders', 'Nonprofits', 'Government', 'Faith', 'Business'];
    labels.forEach((l, i) => {
      const a = (i / labels.length) * Math.PI * 2, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#C9963F" stroke-width="4"/>`;
      s += `<circle cx="${x}" cy="${y}" r="${R * 0.24}" fill="#234E70"/><text x="${x}" y="${y + 5}" font-family="sans-serif" font-size="${R * 0.1}" fill="#fff" text-anchor="middle">${l}</text>`;
    });
    s += `<circle cx="${cx}" cy="${cy}" r="${R * 0.34}" fill="#C9963F"/><text x="${cx}" y="${cy - 4}" font-family="Georgia,serif" font-size="${R * 0.11}" fill="#fff" text-anchor="middle">Shared</text><text x="${cx}" y="${cy + R * 0.12}" font-family="Georgia,serif" font-size="${R * 0.11}" fill="#fff" text-anchor="middle">Results</text>`;
    return s;
  },
  bank(w, h, seed) {
    let s = sky(w, h) + `<rect x="${w * 0.1}" y="${h * 0.3}" width="${w * 0.8}" height="${h * 0.6}" fill="#D8CDB8"/>`;
    s += `<path d="M${w * 0.05} ${h * 0.32} L${w * 0.5} ${h * 0.08} L${w * 0.95} ${h * 0.32}Z" fill="#C4B79C"/>`;
    for (let i = 0; i < 5; i++) s += `<rect x="${w * (0.17 + i * 0.15)}" y="${h * 0.38}" width="${w * 0.06}" height="${h * 0.45}" fill="#EFE8DA"/>`;
    s += `<rect x="${w * 0.05}" y="${h * 0.86}" width="${w * 0.9}" height="${h * 0.06}" fill="#B8AD95"/><rect y="${h * 0.92}" width="${w}" height="${h * 0.08}" fill="#8F9A8A"/>`;
    s += `<text x="${w * 0.5}" y="${h * 0.3}" font-family="Georgia,serif" font-size="${w * 0.045}" fill="#5E523E" text-anchor="middle">FERROWICK SAVINGS · 1888</text>`;
    return s;
  },
  harbor(w, h, seed) {
    const r = rng(seed);
    let s = sky(w, h, '#BBD6E6', '#F3EBDD') + `<rect y="${h * 0.6}" width="${w}" height="${h * 0.4}" fill="#3F6E8C"/>`;
    for (let i = 0; i < 8; i++) s += `<rect x="${r() * w}" y="${h * (0.65 + r() * 0.3)}" width="${w * 0.08}" height="2" fill="#9FC3D8"/>`;
    s += `<path d="M${w * 0.72} ${h * 0.6} L${w * 0.75} ${h * 0.2} L${w * 0.79} ${h * 0.2} L${w * 0.82} ${h * 0.6}Z" fill="#F4F1EA"/><rect x="${w * 0.735}" y="${h * 0.3}" width="${w * 0.07}" height="${h * 0.05}" fill="#B8483A"/><rect x="${w * 0.745}" y="${h * 0.13}" width="${w * 0.05}" height="${h * 0.07}" fill="#C9963F"/>`;
    s += `<path d="M${w * 0.2} ${h * 0.66} L${w * 0.4} ${h * 0.66} L${w * 0.37} ${h * 0.72} L${w * 0.23} ${h * 0.72}Z" fill="#B8483A"/><path d="M${w * 0.3} ${h * 0.64} L${w * 0.3} ${h * 0.4} L${w * 0.38} ${h * 0.62}Z" fill="#fff"/>`;
    return s;
  },
  reports(w, h, seed) {
    let s = `<rect width="${w}" height="${h}" fill="#fff"/>`;
    const cols = ['#234E70', '#C9963F', '#2F8A8A'];
    cols.forEach((c, i) => {
      const x = w * (0.08 + i * 0.12), y = h * (0.08 + i * 0.1);
      s += `<rect x="${x + 6}" y="${y + 6}" width="${w * 0.6}" height="${h * 0.72}" fill="#00000022"/><rect x="${x}" y="${y}" width="${w * 0.6}" height="${h * 0.72}" fill="${c}"/>`;
      s += `<text x="${x + w * 0.05}" y="${y + h * 0.12}" font-family="Georgia,serif" font-size="${w * 0.05}" fill="#fff">Biennial Report</text><text x="${x + w * 0.05}" y="${y + h * 0.2}" font-family="sans-serif" font-size="${w * 0.04}" fill="#fff">${['2020–2021', '2022–2023', '2024–2025'][i]}</text>`;
    });
    return s;
  },
};

// Illustrated head-and-shoulders portrait used for fictional board/staff/memoriam members.
export function portrait(w, h, seed, o = {}) {
  const r = rng(seed);
  const bg = o.bg || pick(r, ['#D8E3EA', '#E8DDCB', '#DCE6D5', '#E6D8DC', '#D9D9E6']);
  const skin = o.skin || pick(r, SKIN), hair = o.hair || pick(r, HAIR), top = o.top || pick(r, ['#234E70', '#3B4A63', '#5A5A6E', '#2F8A8A', '#B8483A', '#6C5B9E', '#3E7D4F', '#8A6142']);
  const cx = w / 2, R = Math.min(w, h) * 0.2, cy = h * 0.42;
  const style = o.hairStyle ?? Math.floor(r() * 5);
  let s = `<rect width="${w}" height="${h}" fill="${bg}"/>`;
  // back hair (long styles)
  if (style === 2) s += `<path d="M${cx - R * 1.25} ${cy} Q${cx - R * 1.35} ${cy + R * 2.1} ${cx - R * 0.6} ${cy + R * 2.2} L${cx + R * 0.6} ${cy + R * 2.2} Q${cx + R * 1.35} ${cy + R * 2.1} ${cx + R * 1.25} ${cy} Z" fill="${hair}"/>`;
  if (style === 3) s += `<circle cx="${cx}" cy="${cy - R * 0.15}" r="${R * 1.45}" fill="${hair}"/>`;
  // shoulders + collar
  s += `<path d="M${cx - w * 0.46} ${h} Q${cx - w * 0.44} ${cy + R * 1.7} ${cx - R * 0.55} ${cy + R * 1.45} L${cx + R * 0.55} ${cy + R * 1.45} Q${cx + w * 0.44} ${cy + R * 1.7} ${cx + w * 0.46} ${h} Z" fill="${top}"/>`;
  s += `<rect x="${cx - R * 0.38}" y="${cy + R * 0.7}" width="${R * 0.76}" height="${R * 0.85}" fill="${skin}"/>`;
  s += `<path d="M${cx - R * 0.55} ${cy + R * 1.45} L${cx} ${cy + R * 2.15} L${cx + R * 0.55} ${cy + R * 1.45}" fill="${skin}"/>`;
  if (o.collar !== false) s += `<path d="M${cx - R * 0.6} ${cy + R * 1.42} L${cx - R * 0.1} ${cy + R * 2.25} L${cx - R * 0.35} ${cy + R * 2.4}Z M${cx + R * 0.6} ${cy + R * 1.42} L${cx + R * 0.1} ${cy + R * 2.25} L${cx + R * 0.35} ${cy + R * 2.4}Z" fill="#ffffff" opacity=".85"/>`;
  // head
  s += `<ellipse cx="${cx - R}" cy="${cy + R * 0.1}" rx="${R * 0.16}" ry="${R * 0.24}" fill="${skin}"/><ellipse cx="${cx + R}" cy="${cy + R * 0.1}" rx="${R * 0.16}" ry="${R * 0.24}" fill="${skin}"/>`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${R * 0.95}" ry="${R * 1.12}" fill="${skin}"/>`;
  // front hair
  if (style === 0) s += `<path d="M${cx - R * 0.98} ${cy - R * 0.1} Q${cx - R} ${cy - R * 1.25} ${cx} ${cy - R * 1.2} Q${cx + R} ${cy - R * 1.25} ${cx + R * 0.98} ${cy - R * 0.1} Q${cx + R * 0.6} ${cy - R * 0.75} ${cx - R * 0.98} ${cy - R * 0.1}Z" fill="${hair}"/>`;
  if (style === 1) s += `<path d="M${cx - R * 1.02} ${cy + R * 0.2} Q${cx - R * 1.1} ${cy - R * 1.35} ${cx} ${cy - R * 1.25} Q${cx + R * 1.1} ${cy - R * 1.35} ${cx + R * 1.02} ${cy + R * 0.2} Q${cx + R * 0.7} ${cy - R * 0.6} ${cx - R * 0.2} ${cy - R * 0.55} Q${cx - R * 0.8} ${cy - R * 0.5} ${cx - R * 1.02} ${cy + R * 0.2}Z" fill="${hair}"/>`;
  if (style === 2 || style === 3) s += `<path d="M${cx - R * 1.05} ${cy + R * 0.1} Q${cx - R * 1.05} ${cy - R * 1.3} ${cx} ${cy - R * 1.25} Q${cx + R * 1.05} ${cy - R * 1.3} ${cx + R * 1.05} ${cy + R * 0.1} Q${cx + R * 0.4} ${cy - R * 0.9} ${cx - R * 1.05} ${cy + R * 0.1}Z" fill="${hair}"/>`;
  if (style === 4) s += `<path d="M${cx - R * 0.96} ${cy - R * 0.25} Q${cx} ${cy - R * 1.45} ${cx + R * 0.96} ${cy - R * 0.25} Q${cx} ${cy - R * 0.95} ${cx - R * 0.96} ${cy - R * 0.25}Z" fill="${hair}" opacity=".85"/>`;
  // face
  s += `<circle cx="${cx - R * 0.33}" cy="${cy + R * 0.05}" r="${R * 0.07}" fill="#2a2a2a"/><circle cx="${cx + R * 0.33}" cy="${cy + R * 0.05}" r="${R * 0.07}" fill="#2a2a2a"/>`;
  s += `<path d="M${cx - R * 0.28} ${cy + R * 0.5} Q${cx} ${cy + R * 0.7} ${cx + R * 0.28} ${cy + R * 0.5}" stroke="#7a3b2e" stroke-width="${R * 0.07}" fill="none" stroke-linecap="round"/>`;
  if (o.glasses) s += `<g stroke="#2a2a2a" stroke-width="${R * 0.05}" fill="none"><circle cx="${cx - R * 0.33}" cy="${cy + R * 0.05}" r="${R * 0.24}"/><circle cx="${cx + R * 0.33}" cy="${cy + R * 0.05}" r="${R * 0.24}"/><path d="M${cx - R * 0.09} ${cy + R * 0.05} L${cx + R * 0.09} ${cy + R * 0.05}"/></g>`;
  if (o.mono) s = `<g filter="url(#mono)">${s}</g>`;
  return s;
}

export function svgDoc(w, h, body, mono = false) {
  const f = mono ? `<defs><filter id="mono"><feColorMatrix type="saturate" values="0"/></filter></defs>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${f}${body}</svg>`;
}
