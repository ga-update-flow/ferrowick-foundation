# The Ferrowick Foundation: crawler-test website

A complete static website for a **fictional** community foundation serving Aquidneck Island, Rhode Island.
Its page hierarchy, navigation, component types, document formats, and the **presence or absence of
grant information** mirror a real funder's site (thestatenislandfoundation.org, inspected 2026-10-19).
The goal is to test whether a grant-opportunity crawler can discover and extract information that is
spread across pages, dropdowns, PDFs, legacy Office files, image-only flyers, and portal pages.

No reference text, logos, photos or documents were copied. All copy, names, organizations, images and
documents are original. Contact details use reserved values (`example.org`, `555-01xx`).

* `docs/REFERENCE_INVENTORY.md`: page-by-page inventory of the reference site that the build follows
* `docs/TEST_REPORT.md`: verification results

## Requirements

* Node.js 18+ (no npm dependencies are needed for the site build itself)
* For regenerating images: `playwright` (Chromium)
* For regenerating documents: Python 3 with `reportlab`, `pypdfium2`, `Pillow`, `python-docx`, `openpyxl`;
  LibreOffice (`soffice`) for `.doc`/`.xls`/`.xlsm`; `ffmpeg` for the fellowship video

## Commands

```bash
npm install            # only needed for image rendering (playwright)
npm run images         # render illustrations, portraits, logo, favicon and flyers → src/static/
npm run docs           # generate PDFs, .doc, .xls/.xlsm and .mp4 → build/docs/
SITE_URL=https://your-host.example npm run build   # assemble the site → dist/
npm run build:all      # all three steps
npm run serve          # preview dist/ at http://localhost:8080
BASE=http://localhost:8080 npm test                # crawl and verify links, files and robots directives
```

`SITE_URL` is used only for absolute URLs in `sitemap.xml`, `robots.txt` and share links. Rebuild with the
final hostname before deploying.

## Project layout

```
content/            Editable content (no HTML templates needed to change these)
  site.mjs          Name, address, phone, email, portal URL, main menu and footer menus
  grants.mjs        Board cycles/deadlines, focus areas and targets, grant types, exclusions, document registry
  people.mjs        Board, staff, In Memoriam profiles (bio: null = intentionally no biography)
  news.mjs          News posts and flyer designs (some posts carry information only inside an image)
  recentGrants.mjs  Fictional awards by board meeting (seeded, reproducible)
scripts/
  build.mjs         Page templates and site assembly
  lib/layout.mjs    Header, dropdown navigation, title bar, footer, icons
  art/              Illustration engine and image renderer
  docs/make_docs.py Document generator
  test/check-site.mjs  Crawler-style verification
src/assets/         CSS, JS (progressive enhancement only), self-hosted fonts
src/static/         Generated images, logo and favicons (committed)
dist/               Build output (deploy this folder)
```

### Common edits

* **Deadlines:** `content/grants.mjs` → `cycles` (used by both Guidelines and Application Process)
* **Grant type names and descriptions:** `content/grants.mjs` → `grantTypes`
* **Targets per focus area:** `content/grants.mjs` → `focusAreas[].targets`
* **Documents:** `content/grants.mjs` → `documents` (paths), `scripts/docs/make_docs.py` (contents)
* **Matching-program details (amount cap, deadline):** `content/news.mjs` → `keystone-matching-program`

## Deployment (Netlify)

`dist/_headers` sets `X-Robots-Tag: noindex, nofollow` on every path, including PDFs. Each HTML page also
carries `<meta name="robots" content="noindex, nofollow">`. `robots.txt` allows crawling so test crawlers
are not blocked.

```bash
SITE_URL=https://<site-name>.netlify.app npm run build
npx netlify-cli deploy --dir dist --prod --site <site-id>      # with NETLIFY_AUTH_TOKEN set
```

You can also drag the `dist/` folder onto **Netlify → your site → Deploys**.

> Anonymous (`--allow-anonymous`) Netlify deploys are password-protected until they are claimed into an
> account, and the claim link expires after one hour. A claimed site, or one deployed with your own token,
> is served publicly with no password.

These directives discourage indexing, but they do not guarantee that the site will stay out of search
results. A search engine can still list a URL that it finds linked elsewhere, without crawling the page.

## Mirrored structures worth knowing about (intentional)

* **Guidelines are HTML, not a PDF**, as on the reference. Application forms exist only as *sample*
  PDFs; applications go through the (demo) portal by invitation after an email to staff.
* **No LOI stage, no award ranges for the grant types, no FAQ page.** The reference has none of these.
* One listed board deadline (October 2026, due August 7) is already past, as on the reference.
* The Program Impact sample application and the Collective Impact Proposal Guidance are **image-only
  scanned PDFs** with no text layer, as on the reference.
* Two news posts ("Deadline Changes for Applicants", "Fellowship Application Is Available") carry their
  information **only inside a flyer image**.
* Fellowship sub-pages (Fellows, Advisory Committee, The Conference) contain only a "will be posted soon"
  heading, matching the reference's placeholder pages.
* External services on the reference are replaced with clearly labeled in-site demonstration destinations:
  `/portal/Home/Logon/` (grant portal), `/forms/...` (RSVP and fellowship forms),
  `/shared/defining-results/` (shared folder), `/external/aquidneck-ledger/...` (newspaper obituaries).
  Demo forms submit nowhere and say so.
