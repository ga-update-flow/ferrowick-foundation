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
npm run docs           # generate PDFs, .doc, .xls/.xlsm and .mp4 → src/documents/
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
  docs/make_docs.py Document generator (writes src/documents/)
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

## Deployment (GitHub Pages)

Live site: **https://hufsa-stack.github.io/ferrowick-foundation/**

GitHub Pages serves the `gh-pages` branch (Settings → Pages → Deploy from a branch → `gh-pages`, root).
Pushing to `main` does not change the live site.

To put a version on the live site, use the **Deploy a version** workflow
(`.github/workflows/deploy-version.yml`):

1. Open the repository's **Actions** tab.
2. Click **Deploy a version** in the left sidebar.
3. Click **Run workflow** and pick a branch from the dropdown (the original site or any of the 20 version branches).
4. Click the green **Run workflow** button.
5. Wait for both runs ("Deploy a version" and "pages build and deployment") to show green checks, then open the
   page. Browsers may cache pages for up to 10 minutes, so use a hard refresh if the old version still shows.

The workflow builds the chosen branch (setting `SITE_URL` and `BASE_PATH`, for example `/ferrowick-foundation`,
automatically) and replaces the entire contents of `gh-pages` with that build in one normal commit: no
force-push, nothing mixed in from other versions, and Pages settings unchanged. To add a new version branch to
the dropdown, add its name to the `options` list in the workflow.

Generated images (`src/static/`) and documents (`src/documents/`) are committed, so the workflow only needs
Node. Re-run `npm run images` / `npm run docs` locally only if you change art or document content.

Local preview of a subpath build:

```bash
SITE_URL=http://localhost:8080/ferrowick-foundation BASE_PATH=/ferrowick-foundation npm run build
```

### Search-indexing directives

* Every HTML page carries `<meta name="robots" content="noindex, nofollow">`.
* `robots.txt` allows crawling so test crawlers are not blocked. On a GitHub Pages *project* site it sits
  under the subpath, where search engines do not read it.
* **GitHub Pages cannot send custom HTTP headers**, so `X-Robots-Tag: noindex` is **not** applied to the PDFs
  and other documents. The `_headers` file in `dist/` takes effect only on hosts that support it (Netlify,
  Cloudflare Pages).

These directives discourage indexing, but they do not guarantee that the site will stay out of search
results. A search engine can still list a URL that it finds linked elsewhere.

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
