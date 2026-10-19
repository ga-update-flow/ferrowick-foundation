# Reference Inventory — thestatenislandfoundation.org

Inspected 2026-10-19 (live site, WordPress/Avada theme). This inventory is the
blueprint for the fictional Ferrowick Foundation site. Every structural decision
in the build traces back to a line here. **Reference text, logo, photos and
documents were NOT copied**. Only structure, component types and the
presence or absence of information were mirrored.

## 1. Global chrome

| Element | Reference | Notes |
|---|---|---|
| Header | Logo left (icon above wordmark, gold left bar + gold underline); horizontal menu right; search icon (overlay search form, GET `/?s=`) | White background, ~134px tall. Active item: blue text + blue top bar |
| Main menu (order) | Home · About Us ▾ · Our Approach ▾ · Focus Areas ▾ · Grants ▾ · Fellowship ▾ · News · Contact · 🔍 | Dropdowns on hover |
| About Us ▾ (parent → mission page) | Our Mission and Vision · Board · Staff · History · In Memoriam · Biennial Report | |
| Our Approach ▾ | Results-Based Approach · Systems Thinking and Compassionate Systems · Diversity, Equity, and Inclusion · Data-Driven Decision Making · Collective Impact | |
| Focus Areas ▾ | Education · Health · Community Services · Arts & Culture | |
| Grants ▾ (parent href="#", **no landing page**) | Guidelines · Types of Grants · Application Process · Application Assistance · To Apply · Grant Portal · Recent Grants · Grant Reports | |
| Fellowship ▾ | Background (= /fellowship/) · How To Apply · Fellows · Advisory Committee · The Conference | |
| Page title bar | Solid blue band, centered white serif H1 | Present on all inner pages **except** Home, Focus Areas (+4 sub-pages) and Our Approach (these use a hero photo instead) |
| Footer | 4 columns: (1) "Contact Info" address/phone/email + social icons + transparency badge; (2) About menu (Mission, History, Board, Staff, In Memoriam, Contact); (3) Focus-area menu; (4) "Recent Posts" (5 latest, chevron list with rules) | No copyright bar |
| Fonts / colors | Serif slab headings, humanist sans body, condensed nav; blue #365495, gold #c19e54 | |

## 2. Pages, layouts, components

| URL | Layout / section order | Components | Information present | Information ABSENT |
|---|---|---|---|---|
| `/` | (1) photo mosaic: 1 tall + 2×2; (2) centered mission paragraph; (3) "Recent News" H2 + 2 posts (thumbnail left, title, excerpt) + **"Read More Articles"** button → /news/; (4) intro line + gold rule + 4 circular image links (Health, Education, Arts & Culture, Community Services) with H3 labels; (5) "HOW TO APPLY" H2 + bold line + **"Guidelines"** button → /guidelines/ | buttons ×2, circle tiles ×4 | mission | deadlines, amounts, portal |
| `/our-vision-mission-guiding-principles-and-values/` | 1/2 image + 1/2 (OUR MISSION, OUR VISION); full: OUR VALUES list (6), OUR GUIDING PRINCIPLES list (12) | lists | | |
| `/board/` | "MEET OUR BOARD" + rule; 8 cards in 1/3 columns: photo, linked name, role | person cards | | |
| `/board/<name>/` | 1/3 photo, 2/3 H3 name, H4 role, rule, **bio on some, none on others** | | | bio (for some members) |
| `/staff/` | "MEET OUR STAFF" + rule; 5 cards in 1/5 columns | person cards | | |
| `/staff/<name>/` | 1/3 photo, 2/3 name/role/bio + individual email | | staff email | |
| `/history/` | 2/5 image + 3/5 H2; H4 "More Than $X Granted" + 3 paragraphs; "click here" → external highlights PDF (OneDrive) | | cumulative $ granted | |
| `/in-memoriam/` | intro line; 4 cards 1/4 cols (photo, H3 name, H4 role/years) | | | |
| `/in-memoriam/<name>/` | 1/4 photo, 3/4 H2/H4/bio; full-width paragraph; **"Learn More About …"** button → external obituary | button | | |
| `/biennial-report/` | 1/2 cover image + 1/2 list of 11 "Download YYYY/YYYY Biennial Report" PDF links; Acrobat note | PDF links | | |
| `/our-approach/` | full-width hero photo; H2 + 2 paras; centered intro line; **5 icon content boxes** (gold icons) linking to sub-pages | content boxes | | |
| `/our-approach/results-based-approach/` | intro paras (links to 4 focus pages); 1/3 image + 2/3 list of what a results statement does; "Click HERE for assistance in defining results" → **external shared folder**; 2 paras incl. **Progress Report (mid-point) + Final Report** obligation | | reporting obligations | deadlines, amounts |
| `/our-approach/systems-thinking-and-compassionate-systems/` | 1/2 image + 1/2 text; full-width text; "To learn more" external links | | | |
| `/our-approach/diversity-equity-and-inclusion/` | 1/3 image + 2/3 text; link to mission page | | | |
| `/our-approach/data-driven-decision-making/` | 1/2 image + 1/2 text; list of 8 categories; external data links + local report PDF | | | |
| `/our-approach/collective-impact/` | 1/2 img + 1/2 text; 5 conditions list; 8 principles list; 1/2 img + 1/2 initiative list (6); further-reading links incl. **CI Proposal Guidance PDF** | | | |
| `/focus-areas/` | gold-bordered wide hero; italic mission quote; 4 circle tiles; H2 "Focus Areas" + 2 paras; centered line; **4 gold icon content boxes** (other approaches) | circle tiles, content boxes | | |
| `/focus-areas/education/` | wide hero; H2 + 3 paras; 2/5 image + 3/5 (intro sentence + **8 target outcomes**); dark photo CTA band: headline + gold **"Learn About The Application Process"** button → /application-process/ | CTA band | target outcomes | deadlines, amounts, eligibility |
| `/focus-areas/health/` | same; 1/3 image + 2/3 (intro sentence + **5 targets**) | | | |
| `/focus-areas/community-services/` | same; 2/5 image + 3/5 **4 targets, NO intro sentence** | | | |
| `/focus-areas/arts-culture/` | H2 "Arts and Culture"; 3 paras; 1/2 image + 1/2 **6 targets, NO intro sentence** | | | |
| `/guidelines/` (HTML, **no PDF**) | H2 Grant Eligibility (501(c)(3), serve local residents, reports current, track record; new orgs/fiscal sponsor at Board discretion); H4 Timeline: board meeting months + **4 "Applications for our MONTH YYYY meeting are due by DATE"** lines (bold), one of which is already past; late = discretion; link to Application Process; underscore rule; H3 What We Fund (4 bullet chars); H3 What We Do Not Fund (13-item list); contact email | | deadlines | award amounts, LOI deadline |
| `/types-of-grants/` | intro para; 4 bold-paragraph sub-heads each followed by 1–3 paras: Direct Service, Capacity Building, Capital Improvement ("very limited", contact staff first, multi-year payout), Focused Opportunity | | | amounts, deadlines, dedicated pages per type |
| `/application-process/` | paragraphs: mission focus; targets; review guidelines first; **email staff a few paragraphs first (pre-inquiry)**; board meets end of 4 months, due 2 months prior; 4-item deadline list; late discretion; aligned applicants get a call or **portal link + access code (invitation)**; **one grant per applicant per year; grant period generally one year** | | process, deadlines, grant period | amounts, LOI form, Apply button |
| `/application-assistance/` | H2 Resources for Applicants; H4 Application Questions: para (online portal only; link "Grants Portal" → external portal) + list of **5 sample application PDFs**; H4 Results Worksheets: **3 .doc**; H4 Milestone Workbooks: **3 .xls/.xlsm**; H4 Collective Impact Guidance: **1 PDF** | doc links | | |
| `/to-apply/` | safe-senders note (portal vendor address + domain); portal link; dashboard capabilities list; new user instructions; "For New Applicants" list (**invited → access code by email**); "Grant Portal Tips" list (10) | | | |
| `/grant-portal/` | H2 Access To Your Grant Portal Account; notes; "Log in to your account" → portal; H4 lists; H4 progress/final report instructions | | | |
| `/recent-grants/` | Per board meeting (newest first, back several years): intro "At the DATE Board Meeting…"; H3 per focus area; outcome line; "Org: $amount – purpose" lines | long text | grant amounts per org | |
| `/grant-reports/` | 2 paragraphs (how to submit Progress/Final Report in portal) | | | report due dates |
| `/fellowship/` | H1 fellowship name; 1/3 portrait + 2/3 history; full-width paras | | | stipend amount |
| `/fellowship/how-to-apply/` | H2 "Fellowship Criteria:" checklist (9 items, icon list); separator; "How to Apply:" para with **deadline (already past)**; presentation + video links (external); "2–4 fellows" anticipated; **"Apply Now"** button → external form | checklist, button | deadline, # of awards | stipend amount |
| `/fellowship/fellows/`, `/advisory-committee/`, `/the-conference/` | Title bar + single H1 "…Coming Soon" | | | everything |
| `/news/` | Blog list, 10 per page, thumbnail + H2 + excerpt + meta + "Read More"; pagination to /news/page/2/ | | | |
| Posts | Title bar = post title; featured image; H2; body; meta; share links; "Related Posts" carousel; prev/next | | | |
| — Forum post | event date/time/place; RSVP → external form; contact | | | |
| — Matching program post | Full program guidelines in HTML: goals, eligibility list, match rules, **2:1 match up to cap**, timeline (deadline **past**), specifics, advisory committee, contact | | amount cap, deadline | |
| — Fellowship application post | **image only** (flyer); no HTML text | | info only in image | |
| — Deadline Changes post | **image only** (flyer) | | info only in image | |
| — Hiring post | 2 links to job-description **PDFs** | | | |
| — Fellowship in Social Work (2023) | flyer image + "Learn more and apply" button → external form | | | |
| — Board meeting results posts | lists of grants | | | |
| `/contact/` | "CONTACT INFO" + rule; **3 content boxes** (phone, email, address) with icons; social circles; "SEND A MESSAGE" + rule; intro (new applicants describe project → staff follow up); form: Name, Phone, Email, Preferred contact (checkbox Phone/Email), Organization name, 501(c)(3) operating locally? (Yes/No), project description; Submit | form | | |
| 404 | "Error 404 Page" title bar | | | |
| **FAQ** | **Does not exist** (no /faq/, no accordion, no Q&A anywhere) | — | — | everything |

## 3. Documents

| Location | Document | Format on reference | Notes |
|---|---|---|---|
| Application Assistance | Direct Service Application | PDF, **scanned images, no text layer**, 6 pp | |
| | Capacity Building Application | PDF, text (portal print), 7 pp | |
| | Capital Improvement Application | PDF, text, 7 pp | |
| | Focused Opportunity Application | PDF, text, 4 pp | |
| | Collective Impact Application | PDF, text, 7 pp | |
| | 3 × Results Worksheet | **.doc** | 4-step worksheet |
| | 3 × Milestones Workbook | **.xls, .xlsm, .xls** | multi-tab workbook with examples |
| | Collective Impact Proposal Guidance | PDF, **scanned, no text layer**, 22 pp | also linked from Collective Impact page |
| Biennial Report | 11 biennial reports | PDF | |
| History | Highlights 1997–2025 | PDF via external file share | |
| Data-Driven page | Local vision report | PDF | |
| Hiring post | Intern + Program Officer descriptions | PDF | |
| Grant guidelines | — | **HTML only (no PDF)** | |
| Application form | — | **No downloadable blank form to submit**; portal only | |

## 4. Presence / absence summary (for crawler test)

* Deadlines: Guidelines + Application Process (4 board cycles, one already past); matching program post (past); fellowship How To Apply (past). Flyer images (image-only).
* **No LOI** stage/deadline anywhere; instead a pre-application **email to staff**, then invitation (call or portal access code).
* **No award ranges** for the core grant types. Amounts appear only in Recent Grants, History total, and the matching-program cap.
* Portal: external, login + access code, referenced from Application Assistance, To Apply, Grant Portal.
* No "Apply Now" on core grant pages; only the Fellowship has "Apply Now".
* No FAQ page.
