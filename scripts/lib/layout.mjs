import { site, nav, footerAboutMenu, footerFocusMenu } from '../../content/site.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const icons = {
  search: '<svg viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M505 442.7 405.3 343c28.4-34.9 45.7-79.4 45.7-127.5C451 96.5 354.5 0 235.5 0S20 96.5 20 215.5 116.5 431 235.5 431c48.1 0 92.6-17.3 127.5-45.7L462.7 485c11.7 11.7 30.7 11.7 42.4 0 11.6-11.7 11.6-30.6-.1-42.3zM235.5 371c-85.9 0-155.5-69.6-155.5-155.5S149.6 60 235.5 60 391 129.6 391 215.5 321.4 371 235.5 371z"/></svg>',
  facebook: '<svg viewBox="0 0 320 512" aria-hidden="true"><path fill="currentColor" d="M279 288l14-93h-89v-60c0-25 13-50 53-50h40V6S260 0 225 0c-73 0-121 44-121 125v70H23v93h81v224h100V288z"/></svg>',
  linkedin: '<svg viewBox="0 0 448 512" aria-hidden="true"><path fill="currentColor" d="M100 448H7V149h93zM54 108C24 108 0 83 0 53a54 54 0 0 1 108 0c0 30-24 55-54 55zm394 340h-93V302c0-35-1-79-48-79-48 0-56 37-56 77v148h-93V149h89v41h1c13-24 43-48 88-48 94 0 112 62 112 142v164z"/></svg>',
  instagram: '<svg viewBox="0 0 448 512" aria-hidden="true"><path fill="currentColor" d="M224 141c-64 0-115 51-115 115s51 115 115 115 115-51 115-115-51-115-115-115zm0 190c-41 0-75-34-75-75s34-75 75-75 75 34 75 75-34 75-75 75zm146-194a27 27 0 1 1-54 0 27 27 0 0 1 54 0zm76 27c-2-36-10-68-36-94s-58-34-94-36c-37-2-148-2-185 0-36 2-68 10-94 36S3 128 1 164c-2 37-2 148 0 185 2 36 10 68 36 94s58 34 94 36c37 2 148 2 185 0 36-2 68-10 94-36s34-58 36-94c2-37 2-148 0-185z"/></svg>',
  phone: '<svg viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M497 361l-112-48a24 24 0 0 0-28 7l-50 61A371 371 0 0 1 130 204l61-50a24 24 0 0 0 7-28L150 14a24 24 0 0 0-28-14L18 24A24 24 0 0 0 0 48c0 257 208 464 464 464a24 24 0 0 0 24-18l24-104a24 24 0 0 0-15-29z"/></svg>',
  envelope: '<svg viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M502 191c4-3 10 0 10 5v204c0 27-22 48-48 48H48c-27 0-48-21-48-48V196c0-5 6-8 10-5 22 18 52 40 154 114 21 15 57 47 92 47 36 0 72-33 92-47 102-74 132-96 154-114zM256 320c23 0 57-29 73-41 133-96 143-104 173-128 6-4 10-11 10-19v-19c0-27-22-48-48-48H48C21 64 0 85 0 112v19c0 8 4 15 10 19 30 24 40 32 173 128 16 12 50 41 73 41z"/></svg>',
  pin: '<svg viewBox="0 0 384 512" aria-hidden="true"><path fill="currentColor" d="M172 501C27 291 0 269 0 192 0 86 86 0 192 0s192 86 192 192c0 77-27 99-172 309a24 24 0 0 1-40 0zm20-229a80 80 0 1 0 0-160 80 80 0 0 0 0 160z"/></svg>',
  results: '<svg viewBox="0 0 384 512" aria-hidden="true"><path fill="currentColor" d="M336 64h-80a64 64 0 0 0-128 0H48C22 64 0 86 0 112v352c0 26 22 48 48 48h288c26 0 48-22 48-48V112c0-26-22-48-48-48zM192 40a24 24 0 1 1 0 48 24 24 0 0 1 0-48zm121 209L170 391a12 12 0 0 1-17 0l-82-83a12 12 0 0 1 0-17l28-28a12 12 0 0 1 17 0l46 46 107-106a12 12 0 0 1 17 0l28 28a12 12 0 0 1-1 18z"/></svg>',
  systems: '<svg viewBox="0 0 100 72" aria-hidden="true"><circle cx="36" cy="40" r="13" fill="none" stroke="currentColor" stroke-width="9"/><circle cx="36" cy="40" r="21.1" fill="none" stroke="currentColor" stroke-width="8.1" stroke-dasharray="6.75 6.75"/><circle cx="76" cy="20" r="6" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="76" cy="20" r="10.5" fill="none" stroke="currentColor" stroke-width="4.5" stroke-dasharray="3.75 3.75"/><circle cx="76" cy="54" r="6" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="76" cy="54" r="10.5" fill="none" stroke="currentColor" stroke-width="4.5" stroke-dasharray="3.75 3.75"/></svg>',
  dei: '<svg viewBox="0 0 100 72" aria-hidden="true"><path fill="currentColor" d="M50 66 C20 46 8 32 8 20 A16 16 0 0 1 40 14 L50 24 L60 14 A16 16 0 0 1 92 20 C92 32 80 46 50 66Z"/><path d="M22 34 L44 34 M56 34 L78 34" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>',
  data: '<svg viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M332 352h40c6 0 12-5 12-12V212c0-6-6-12-12-12h-40c-6 0-12 6-12 12v128c0 7 6 12 12 12zm96 0h40c6 0 12-5 12-12V116c0-6-6-12-12-12h-40c-6 0-12 6-12 12v224c0 7 6 12 12 12zm-288 0h40c6 0 12-5 12-12v-64c0-6-6-12-12-12h-40c-6 0-12 6-12 12v64c0 7 6 12 12 12zm96 0h40c6 0 12-5 12-12V180c0-6-6-12-12-12h-40c-6 0-12 6-12 12v160c0 7 6 12 12 12zM496 400H48V80c0-9-7-16-16-16H16C7 64 0 71 0 80v336c0 18 14 32 32 32h464c9 0 16-7 16-16v-16c0-9-7-16-16-16z"/></svg>',
  people: '<svg viewBox="0 0 640 512" aria-hidden="true"><path fill="currentColor" d="M96 224a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm448 0a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm32 32h-64c-18 0-34 7-45 19 40 22 69 62 75 109h66c18 0 32-14 32-32v-32c0-35-29-64-64-64zm-256 0a112 112 0 1 0 0-224 112 112 0 0 0 0 224zm77 32h-8a155 155 0 0 1-138 0h-8c-64 0-115 52-115 115v29c0 26 21 48 48 48h288c27 0 48-22 48-48v-29c0-63-52-115-115-115zm-224-13c-12-12-28-19-45-19H64c-35 0-64 29-64 64v32c0 18 14 32 32 32h66c6-47 35-87 75-109z"/></svg>',
};

const isCurrent = (item, path) => {
  if (item.href === path) return true;
  if (item.children) return item.children.some((c) => c.href === path) || (item.href !== '/' && item.href !== '#' && path.startsWith(item.href));
  return false;
};

function header(path) {
  const items = nav.map((item) => {
    const cur = isCurrent(item, path) || (item.section && item.section === sectionOf(path)) ? ' class="current"' : '';
    const top = item.href === '#'
      ? `<a href="#" aria-haspopup="true">${esc(item.label)}</a>`
      : `<a href="${item.href}"${item.children ? ' aria-haspopup="true"' : ''}>${esc(item.label)}</a>`;
    const sub = item.children ? `<ul class="sub">${item.children.map((c) => `<li><a href="${c.href}"${c.href === path ? ' class="current" aria-current="page"' : ''}>${esc(c.label)}</a></li>`).join('')}</ul>` : '';
    return `<li${cur}>${top}${sub}</li>`;
  }).join('');
  return `<header class="site-header">
  <div class="container">
    <a class="logo" href="/" aria-label="${esc(site.name)} home"><img src="/assets/img/logo.png" srcset="/assets/img/logo.png 1x, /assets/img/logo@2x.png 2x" width="230" height="104" alt="${esc(site.name)}"></a>
    <input type="checkbox" id="menu-toggle" class="menu-toggle-input">
    <label for="menu-toggle" class="menu-toggle">☰ Menu</label>
    <nav class="main-nav" aria-label="Main Menu">
      <ul>${items}<li><a class="search-toggle" href="/search/" aria-label="Search">${icons.search}</a></li></ul>
    </nav>
  </div>
  <div class="search-overlay" role="search">
    <form action="/search/" method="get"><label class="sr-only" for="hs">Search</label><input id="hs" type="search" name="s" placeholder="Search..."><button class="button" type="submit">Search</button><button type="button" class="close" aria-label="Close search">×</button></form>
  </div>
</header>`;
}

const GRANT_PAGES = ['/guidelines/', '/types-of-grants/', '/application-process/', '/application-assistance/', '/to-apply/', '/grant-portal/', '/recent-grants/', '/grant-reports/'];
function sectionOf(path) { return GRANT_PAGES.includes(path) ? '/grants/' : null; }

function footer(path, recentPosts) {
  const menu = (items) => `<ul class="footer-menu">${items.map((i) => `<li><a href="${i.href}"${i.href === path ? ' class="current"' : ''}>${esc(i.label)}</a></li>`).join('')}</ul>`;
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-cols">
      <section>
        <h4>Contact Info</h4>
        <p>${site.address.join('<br>')}</p>
        <p>Phone: <a href="tel:${site.phone.replace(/[^0-9]/g, '')}">${site.phone}</a><br>Email: <a href="mailto:${site.email}">${site.email}</a></p>
        <div class="social">${site.social.map((s) => `<a href="${s.href}" aria-label="${s.label}" rel="noopener">${icons[s.icon]}</a>`).join('')}</div>
        <a class="report-badge" href="/biennial-report/">Biennial Report<br>2020–2021<strong>Read online</strong></a>
      </section>
      <nav aria-label="About">${menu(footerAboutMenu)}</nav>
      <nav aria-label="Focus Areas">${menu(footerFocusMenu)}</nav>
      <section>
        <h4>Recent Posts</h4>
        <ul class="footer-posts">${recentPosts.map((p) => `<li><a href="/${p.slug}/">${esc(p.title)}</a></li>`).join('')}</ul>
      </section>
    </div>
    <p class="demo-note">${esc(site.demoNotice)}</p>
  </div>
</footer>`;
}

export function layout({ path, title, titleBar, description, body, recentPosts, bodyClass = '' }) {
  const fullTitle = title ? `${title} - ${site.titleSuffix}` : `Home - ${site.titleSuffix}`;
  const bar = titleBar ? `<section class="page-title-bar"><h1>${esc(titleBar)}</h1></section>` : '';
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(fullTitle)}</title>
${description ? `<meta name="description" content="${esc(description)}">` : ''}
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/assets/fonts/fonts.css">
<link rel="stylesheet" href="/assets/css/site.css">
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#content">Skip to content</a>
${header(path)}
<main id="content">
${bar}
${body}
</main>
${footer(path, recentPosts)}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}
