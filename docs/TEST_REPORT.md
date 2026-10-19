# Test Report: Ferrowick Foundation crawler-test site

Date: 2026-10-19 · Build: `SITE_URL=https://heroic-salamander-c01a83.netlify.app npm run build`

## 1. Automated crawl (`scripts/test/check-site.mjs`, local server)

| Check | Result |
|---|---|
| URLs crawled from `/` + `sitemap.xml` + `robots.txt` | 210 |
| HTML pages reached | 93 |
| Documents reached (PDF/DOC/XLS/XLSM/MP4) | 30 |
| Broken internal links / non-200 responses | **0** |
| HTML pages missing `<meta name="robots" content="noindex, nofollow">` | **0** |
| Files with invalid signatures (`%PDF-`, OLE2 `.doc/.xls`, ZIP `.xlsm`, MP4 `ftyp`) | **0** |
| `href="#"` links | 1 kind: the "Grants" top-level menu item (the reference's "Grants" also has `href="#"`), plus in-page `#content` (skip link) and `#forgot` (portal) |
| External links | 45 (real public resources, social platforms, share links); none point to the reference foundation or its portal |
| `X-Robots-Tag` header | Not testable locally (Python dev server ignores `_headers`). Configured in `dist/_headers` for `/*` and `/*.pdf`. See §5 for the deployed result. |

## 2. Documents

| Document | Pages | Text layer | Mirrors reference |
|---|---|---|---|
| Program Impact Application (sample) | 4 | **none (scanned image)** | Direct Service Application is a scan |
| Organizational Strength / Facilities & Equipment / Rapid Opportunity / Collective Impact applications | 7 / 7 / 4 / 6 | yes, portal-print layout | text PDFs printed from portal |
| Collective Impact Proposal Guidance | 6 | **none (scanned image)** | CI guidance is a scan |
| 3 × Results Worksheet | — | `.doc` (Word 97 binary) | `.doc` |
| 3 × Milestones Workbook | — | `.xls`, `.xlsm`, `.xls` | `.xls`, `.xlsm`, `.xls` |
| 11 × Biennial Report | 3 each | yes | 11 biennial PDFs |
| Highlights 1999–2025, Vision report, North End study | 2 each | yes | history and data-page PDFs |
| Intern + Program Officer job descriptions | 1 each | yes | hiring-post PDFs |
| Fellowship information-session slides + video | 6 pp / 30 s MP4 | yes | Google Slides + video link |

Every PDF opened with `pdfplumber`/`pypdfium2`. The Office files were produced and round-tripped by LibreOffice.

## 3. Layout and behavior (Playwright, Chromium)

* Desktop at 1366px: header, dropdowns (hover and keyboard `:focus-within`), page-title bars, hero images, circle tiles, icon content boxes, CTA band, 4-column footer, and contact content boxes all checked against reference screenshots.
* Mobile at 390px: no horizontal scroll on Home, Education, Application Assistance or News (`scrollWidth = 390`). The menu opens through a CSS checkbox toggle, so it works without JavaScript, and it keeps the full dropdown hierarchy as nested lists.
* With JavaScript disabled, all page content and links render. JavaScript only adds the search overlay, the demo-form notices and client-side search results.

## 4. Presence and absence of information (grep over `dist/**/*.html`)

| Item | Expected (from reference) | Found |
|---|---|---|
| LOI / letter of inquiry | absent | 0 occurrences |
| FAQ page or Q&A accordion | absent | 0 |
| "Coming soon / not available / no deadline" placeholders | absent (except the reference's own fellowship sub-page headings) | 0 (the demo portal's "Not available in this demonstration" is a UI notice) |
| Dollar amounts on Types of Grants, Guidelines, Application Process, Focus Area pages | absent | 0 |
| Board-cycle deadlines | Guidelines + Application Process only | yes, 4 cycles, 1 already past |
| Grant amounts | Recent Grants, board-meeting posts, History total, matching-program cap | yes |
| Pre-application email to staff → invitation (call or portal access code) | present | yes |
| One grant per year; one-year grant period | present | yes |
| Progress + Final report obligation | Results-Based Approach, Grant Portal, Grant Reports | yes |
| Deadline information only inside images | 2 flyer posts | yes |
| References to the real foundation | none | 0 |

## 5. Deployment (GitHub Pages): live crawl

Live URL: **https://hufsa-stack.github.io/ferrowick-foundation/** (repo `hufsa-stack/ferrowick-foundation`, served from `gh-pages`)

| Check (`BASE=https://hufsa-stack.github.io/ferrowick-foundation npm test`) | Result |
|---|---|
| URLs crawled | 209 (92 HTML pages, 30 documents) |
| Broken links / non-200 | **0** |
| Pages missing `noindex, nofollow` meta | **0** |
| Invalid document signatures | **0** |
| No password or login wall | Confirmed: every page and file returns 200 anonymously |
| `X-Robots-Tag` header on pages and PDFs | **Not present.** GitHub Pages cannot set custom headers. Only the per-page meta tags apply; PDFs and Office files carry no noindex signal. |

An earlier anonymous Netlify deploy was password-protected (HTTP 401) and was abandoned in favor of GitHub Pages.

## 6. Existing projects

The workspace contained no other projects. Everything was created in a new directory
(`ferrowick-foundation/`) with its own git repository. No Gilmore, Wrenfield, Santa Fe or other projects
were touched.
