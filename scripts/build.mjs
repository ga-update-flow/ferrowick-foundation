// Static site generator for the Ferrowick Foundation demo site.
// Usage: node scripts/build.mjs   → writes the complete site to ./dist
import fs from 'node:fs';
import path from 'node:path';
import { layout, esc, icons } from './lib/layout.mjs';
import { site } from '../content/site.mjs';
import { board, staff, memoriam, fellowshipPortrait } from '../content/people.mjs';
import { cycles, boardMonths, documents as D, biennialReports, focusAreas, grantTypes, doNotFund } from '../content/grants.mjs';
import { posts } from '../content/news.mjs';
import { recentMeetings } from '../content/recentGrants.mjs';
import { meetingHtml } from '../content/news.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');
const BASE_URL = (process.env.SITE_URL || 'https://ferrowick-foundation-demo.netlify.app').replace(/\/$/, '');
const up = (y, m, f) => `/wp-content/uploads/${y}/${m}/${f}`;
// Optional subpath for hosts such as GitHub Pages project sites (e.g. BASE_PATH=/ferrowick-foundation).
const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/$/, '');
const withBase = (s) => !BASE_PATH ? s : s
  .replace(/(\s(?:href|src|action|poster)=")\/(?!\/)/g, `$1${BASE_PATH}/`)
  .replace(/(srcset="|, )\/(?!\/)/g, `$1${BASE_PATH}/`)
  .replace(/url\((['"]?)\/(?!\/)/g, `url($1${BASE_PATH}/`)
  .replace('<html lang="en-US">', `<html lang="en-US" data-base="${BASE_PATH}">`)
  .replace('<html lang="en">', `<html lang="en" data-base="${BASE_PATH}">`);

const pages = [];
const recentPosts = posts.slice(0, 5);
function page(p) { pages.push(p); }
const a = (href, text, cls = '') => `<a href="${href}"${cls ? ` class="${cls}"` : ''}>${text}</a>`;
const img = (src, w, h, alt = '', cls = '') => `<img src="${src}" width="${w}" height="${h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} loading="lazy">`;
const fmtDate = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const cats = (p) => p.categories.map((c) => a(`/category/${c.toLowerCase().replace(/\s+/g, '-')}/`, c)).join(', ');
const excerpt = (p, n = 26) => {
  if (p.excerpt !== undefined) return p.excerpt;
  const t = p.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = t.split(' ');
  return words.length > n ? words.slice(0, n).join(' ') + ' [...]' : t;
};

// ---------------------------------------------------------------- Home
const focusByOrder = ['health', 'education', 'arts-culture', 'community-services'].map((s) => focusAreas.find((f) => f.slug === s));
const circles = (extraSep = true) => `<div class="row">${focusByOrder.map((f) => `<div class="col col-1_4 circle-tile">${a(`/focus-areas/${f.slug}/`, img(f.circle, 454, 452, ''))}<h3>${a(`/focus-areas/${f.slug}/`, f.label)}</h3>${extraSep ? '' : ''}</div>`).join('')}</div>`;

page({
  path: '/', title: null, description: 'The Ferrowick Foundation works to improve the quality of life on Aquidneck Island, especially for residents with the fewest resources.',
  body: `<section class="section tight"><div class="container"><div class="mosaic">
    <div>${img(up(2022, '03', 'clinic-visit-611.jpg'), 611, 676, 'A nurse and a parent with a toddler at a well-child visit')}</div>
    <div class="stack">${img(up(2022, '03', 'pantry-day-635.jpg'), 635, 336, 'Volunteers distributing groceries at a neighborhood pantry')}${img(up(2022, '03', 'story-circle-635.jpg'), 635, 336, 'Children listening to a story at the library')}</div>
    <div class="stack">${img(up(2022, '03', 'youth-council-635.jpg'), 635, 336, 'Young people meeting around a conference table')}${img(up(2022, '03', 'beach-cleanup-635.jpg'), 635, 336, 'Volunteers after a shoreline cleanup')}</div>
  </div></div></section>
  <section class="section"><div class="container center"><div class="sep"></div>
    <p class="lead">The mission of The Ferrowick Foundation is to improve the quality of life on Aquidneck Island, especially for residents with the fewest resources. We pursue this mission through grantmaking; community leadership; partnership with grantees, other funders and public agencies; and investments that help local nonprofits grow stronger and more effective.</p>
  </div></section>
  <section class="section"><div class="container">
    <h2 class="center">Recent News</h2>
    <div class="recent-posts">${posts.slice(0, 2).map((p) => `<article>${a(`/${p.slug}/`, img(p.image, 320, 202, ''), 'thumb')}<h4>${a(`/${p.slug}/`, esc(p.title))}</h4><p>${esc(excerpt(p, 34))}</p></article>`).join('')}</div>
    <div class="btn-row">${a('/news/', 'Read More Articles', 'button')}</div>
    <div class="sep-sm"></div>
    <p class="lead center">The Ferrowick Foundation directs its support in four Focus Areas. To find out about our priorities in these areas, see:</p>
    <hr class="gold-sep">
    ${circles()}
  </div></section>
  <section class="section"><div class="container center">
    <h2 class="caps">How to Apply</h2>
    <p><strong style="font-size:22px">Read our guidelines to learn more about our application process.</strong></p>
    <div class="btn-row">${a('/guidelines/', 'Guidelines', 'button')}</div>
  </div></section>`,
});

// ---------------------------------------------------------------- About
page({
  path: '/our-vision-mission-guiding-principles-and-values/', title: 'Our Vision, Mission, Guiding Principles, and Values', titleBar: 'Our Vision, Mission, Guiding Principles, and Values',
  body: `<section class="section"><div class="container"><div class="row">
    <div class="col col-1_2">${img(up(2022, '01', 'make-a-difference.jpg'), 800, 573, 'Community members planning together')}</div>
    <div class="col col-1_2"><h3>OUR MISSION</h3><p>The mission of The Ferrowick Foundation is to improve the quality of life on Aquidneck Island, especially for residents with the fewest resources, with a focus on education, health, community services, and the arts. We pursue this mission through grantmaking; community leadership; partnership with grantees, other funders and public agencies; and investments that help local nonprofits grow stronger and more effective.</p>
    <h3>OUR VISION</h3><p>An Aquidneck Island where neighbors of every background are connected, engaged in civic life, and able to reach their full potential—and where those with the fewest resources have what they need to thrive.</p></div>
  </div>
  <div class="sep"></div>
  <h3>OUR VALUES</h3><p>In working to improve life in Aquidneck Island communities, the Foundation commits to:</p>
  <ul><li>Act with integrity and lead by example</li><li>Be ethical, effective, accountable, approachable and transparent</li><li>Follow and model sound practices in philanthropy and in business</li><li>Advance equity, opportunity and civility across the island</li><li>Add value through knowledge, insight and well-considered risk-taking</li><li>Respond with compassion and flexibility in emergencies and moments of critical need</li></ul>
  <h3>OUR GUIDING PRINCIPLES</h3><p>The following principles guide the Foundation’s work:</p>
  <ul><li>Give priority to efforts that serve residents with the fewest resources</li><li>Operate openly and transparently</li><li>Be goal-oriented and grounded in evidence</li><li>Pursue high-impact strategies while staying responsive to nonprofit and community needs</li><li>Remain flexible, responsive and open to new ideas</li><li>Seize opportunities to make a difference</li><li>Build on the resources already present in the community</li><li>Encourage collaboration and practice it ourselves</li><li>Lead in building partnerships, strengthening nonprofits and developing new solutions</li><li>Partner with community leaders and other funders to focus resources for greater impact</li><li>Treat the nonprofit community with respect</li><li>Measure and evaluate our grants so that we understand their impact and keep learning</li></ul>
  </div></section>`,
});

const personCard = (p, base, cls) => `<div class="col ${cls} person-card">${a(`/${base}/${p.slug}/`, img(p.photo, 200, 234, ''))}<a class="name" href="/${base}/${p.slug}/">${esc(p.name)}</a><span class="role">${esc(p.role)}</span></div>`;
page({
  path: '/board/', title: 'Board', titleBar: 'Board',
  body: `<section class="section"><div class="container"><h2 class="center caps">Meet Our Board</h2><hr class="title-sep"><div class="row">${board.map((b) => personCard(b, 'board', 'col-1_3')).join('')}</div></div></section>`,
});
for (const b of board) {
  page({
    path: `/board/${b.slug}/`, title: b.name, titleBar: b.name,
    body: `<section class="section"><div class="container"><div class="row profile"><div class="col col-1_3">${img(b.large, 397, 400, '')}</div><div class="col col-2_3"><h3>${esc(b.name)}</h3><h4>${esc(b.role)}</h4><hr class="thin-sep">${(b.bio || []).map((p) => `<p>${p}</p>`).join('')}</div></div></div></section>`,
  });
}
page({
  path: '/staff/', title: 'Staff', titleBar: 'Staff',
  body: `<section class="section"><div class="container"><h2 class="center caps">Meet Our Staff</h2><hr class="title-sep"><div class="row">${staff.map((s) => personCard(s, 'staff', 'col-1_5')).join('')}</div></div></section>`,
});
for (const s of staff) {
  page({
    path: `/staff/${s.slug}/`, title: s.name, titleBar: s.name,
    body: `<section class="section"><div class="container"><div class="row profile"><div class="col col-1_3">${img(s.large, 298, 300, '')}</div><div class="col col-2_3"><h3>${esc(s.name)}</h3><h4>${esc(s.role)}</h4><hr class="thin-sep">${s.bio.map((p) => `<p>${p}</p>`).join('')}<p>${a(`mailto:${s.email}`, s.email)}</p></div></div></div></section>`,
  });
}
page({
  path: '/history/', title: 'History', titleBar: 'History',
  body: `<section class="section"><div class="container"><div class="row">
    <div class="col col-2_5">${img(up(2021, 11, 'ferrowick-savings.jpg'), 381, 372, 'The former Ferrowick Savings & Trust building')}</div>
    <div class="col col-3_5" style="display:flex;align-items:center"><h2>Improving Outcomes for Over 25 Years</h2></div></div>
    <div class="sep"></div>
    <h4>More Than $58 Million Granted</h4>
    <p>The Ferrowick Foundation was created in 1999, when Ferrowick Savings &amp; Trust converted from a mutual savings bank and dedicated a portion of its stock to a new charitable foundation for Aquidneck Island. Since then the Foundation has granted more than $58 million to island organizations, making it one of the largest sources of local philanthropy focused on results for the people of Newport, Middletown and Portsmouth. Our grants have supported schools, health centers, food programs, cultural institutions, youth programs and neighborhood groups.</p>
    <p>From the beginning, the Foundation has funded outcome-focused programs and invested in the “capacity” of its grantees—leadership development, technical assistance and management consulting. The Foundation also convenes stakeholders around community issues, serves as a thought partner, and collaborates with other funders.</p>
    <p>In recent years we have turned our attention to island-wide, population-level change. Our results orientation now includes a collective impact approach to understanding issues, setting shared goals and achieving lasting results for the Aquidneck Island community. To read about Ferrowick Foundation highlights from 1999 through 2025, click ${a(D.highlights.href, 'here')}.</p>
  </div></section>`,
});
page({
  path: '/in-memoriam/', title: 'In Memoriam', titleBar: 'In Memoriam',
  body: `<section class="section"><div class="container"><p class="lead">The Ferrowick Foundation celebrates the lives of its Founding Directors and its first Executive Director.</p><div class="sep"></div><div class="row">${memoriam.map((m) => `<div class="col col-1_4 memoriam-card">${a(`/in-memoriam/${m.slug}/`, img(m.photo, 310, 400, ''))}<h3>${esc(m.name)}</h3><h4>${esc(m.role).replace(/(\d{4}) Chairman/, '$1<br>Chairman')}</h4></div>`).join('')}</div></div></section>`,
});
for (const m of memoriam) {
  const first = m.name.replace(/“.*?”\s*/, '').split(' ').slice(-1)[0];
  page({
    path: `/in-memoriam/${m.slug}/`, title: m.name, titleBar: m.name,
    body: `<section class="section"><div class="container"><div class="row profile"><div class="col col-1_4">${img(m.photo, 310, 400, '')}</div><div class="col col-3_4"><h2>${esc(m.name)}</h2><hr class="thin-sep"><h4>${esc(m.role)}</h4>${m.bio.map((p) => `<p>${p}</p>`).join('')}</div></div>
      <p>${m.more}</p><div class="sep-sm"></div><div class="btn-row" style="text-align:left">${a(`/external/aquidneck-ledger/obituaries/${m.externalSlug}/`, `Learn More About ${esc(m.name.replace(/\s*“.*?”/, ''))}`, 'button')}</div></div></section>`,
  });
  // A stand-in for the external newspaper obituary the reference links to.
  page({
    path: `/external/aquidneck-ledger/obituaries/${m.externalSlug}/`, raw: true,
    html: externalLedger(m),
  });
}
page({
  path: '/biennial-report/', title: 'Biennial Report', titleBar: 'Biennial Report',
  body: `<section class="section"><div class="container"><div class="row">
    <div class="col col-1_2">${img(up(2021, 11, 'biennial-covers.jpg'), 400, 410, 'Covers of recent biennial reports')}</div>
    <div class="col col-1_2">${biennialReports.map((r) => `<p>${a(r.href, `Download ${r.period} Biennial Report`)}</p>`).join('')}</div></div>
    <p>You will need a PDF reader such as ${a('https://get.adobe.com/reader/', 'Adobe Acrobat Reader')} to view the Biennial Report files. Most computers already include a free PDF reader.</p>
  </div></section>`,
});

// ---------------------------------------------------------------- Our Approach
const approachBoxes = (list, cols) => `<div class="content-boxes cols-${cols}">${list.map(([href, icon, label]) => `<div class="content-box"><a href="${href}">${icons[icon]}<span class="cb-title">${label}</span></a></div>`).join('')}</div>`;
const APPROACHES = [
  ['/our-approach/results-based-approach/', 'results', 'Results-Based Approach'],
  ['/our-approach/systems-thinking-and-compassionate-systems/', 'systems', 'Systems Thinking'],
  ['/our-approach/diversity-equity-and-inclusion/', 'dei', 'Diversity, Equity, &amp; Inclusion'],
  ['/our-approach/data-driven-decision-making/', 'data', 'Data-Driven Decision Making'],
  ['/our-approach/collective-impact/', 'people', 'Collective Impact'],
];
const hero = (desk, mob, w, h, cls = '') => `<div class="hero-full ${cls}">${img(desk, 1903, h, '', 'desktop')}${img(mob, 777, 518, '', 'mobile')}</div>`;
page({
  path: '/our-approach/', title: 'Our Approach',
  body: `${hero(up(2022, '01', 'harbor-festival.jpg'), up(2022, '01', 'harbor-festival-mobile.jpg'), 1903, 500)}
  <section class="section"><div class="container">
    <h2>Our Approach</h2>
    <p>The Ferrowick Foundation pursues its mission—improving the quality of life on Aquidneck Island, especially for residents with the fewest resources—through work in education, health, community services and the arts. We believe a better quality of life for every islander grows out of committed residents, strong organizations, and people working together toward a shared vision.</p>
    <p>We fund nonprofits for direct services, organizational strengthening and, on a limited basis, facilities and equipment. The Foundation also brings stakeholders together around community issues, serves as a thought partner, and sometimes co-funds work with other foundations. We track and share data about the well-being of island residents and stay close to emerging community needs.</p>
    <div class="sep"></div>
    <p class="lead center">Several approaches shape how we work. For those considering a partnership with the Foundation, here is an introduction to each:</p>
    ${approachBoxes(APPROACHES, 5)}
  </div></section>`,
});
page({
  path: '/our-approach/results-based-approach/', title: 'Results-Based Approach', titleBar: 'Results-Based Approach',
  body: `<section class="section"><div class="container">
    <p>The Foundation’s grantmaking is focused on measurable results for our community rather than on activities or events. Our grants invest in nonprofits that make progress toward one of the target outcomes the Foundation believes will improve the quality of life for islanders, especially those with the fewest resources.</p>
    <p>Each of our four focus areas—${a('/focus-areas/education/', 'Education')}, ${a('/focus-areas/health/', 'Health')}, ${a('/focus-areas/community-services/', 'Community Services')}, and ${a('/focus-areas/arts-culture/', 'Arts &amp; Culture')}—lists target outcomes. Every funding request must align with one of these target outcomes and include an anticipated results statement with clearly defined, measurable outcomes.</p>
    <div class="sep"></div>
    <div class="row"><div class="col col-1_3">${img(up(2022, '01', 'build-day.jpg'), 774, 603, 'Volunteers framing a house')}</div>
    <div class="col col-2_3"><p>The anticipated results statement is central to our review. A strong statement:</p><ul><li>sets ambitious goals,</li><li>includes concrete details about your project,</li><li>and names the information you will use to track progress toward success.</li></ul>
    <p>Click ${a('/shared/defining-results/', 'HERE')} for help defining results.</p></div></div>
    <div class="sep"></div>
    <p>Some nonprofits already use this approach with government agencies and other funders. For those who are newer to it, Foundation staff are glad to work with eligible applicants to develop a strong anticipated results statement. Some organizations may also request Foundation support to build their capacity to set, verify and use results to improve performance.</p>
    <p>Once a grant is approved, grantees report to the Foundation at the midpoint of the grant period (Progress Report) and at the end (Final Report). Grantees describe their progress toward the goals in the project’s anticipated results statement. If those goals are not met, the Foundation wants to know what the grantee learned that will shape future work.</p>
  </div></section>`,
});
page({
  path: '/our-approach/systems-thinking-and-compassionate-systems/', title: 'Systems Thinking and Compassionate Systems', titleBar: 'Systems Thinking and Compassionate Systems',
  body: `<section class="section"><div class="container"><div class="row">
    <div class="col col-1_2">${img(up(2022, '01', 'systems-mapping.jpg'), 600, 473, 'Workshop participants mapping a system with sticky notes')}</div>
    <div class="col col-1_2"><p>We see Aquidneck Island as one interconnected system that crosses the boundaries of any single organization, sector, group or neighborhood.</p>
    <p>Systems thinking is a way of looking at all of the forces that contribute to a problem—and at how those forces interact—so that people can find the points where change is most likely to last. Its roots lie in decades of work on organizational learning, which showed that teams improve when members see the whole picture rather than only their own part of it.</p></div></div>
    <div class="sep"></div>
    <p>“Systems change” builds on systems thinking. It focuses on shifting the conditions that hold a problem in place: policies, practices, resource flows, relationships, power dynamics and mindsets. It asks partners in collective efforts to look beyond any one organization, identify every factor that influences the challenge they want to address, and explore how those factors are connected.</p>
    <p>Practitioners have since extended this work into “compassionate systems,” an approach that pairs systems awareness with attention to human connection and well-being. Seeing the larger forces that shape people’s choices makes it easier to respond to one another with understanding rather than blame.</p>
    <p>The Foundation has supported island educators and community members in training as compassionate systems facilitators. These facilitators now share what they have learned with students and adults in schools and community settings.</p>
    <p>To learn more, read:</p>
    <p>${a('https://www.fsg.org/resource/water_of_systems_change/', 'The Water of Systems Change')}</p>
    <p>or visit the Center for Systems Awareness website ${a('https://www.systemsawareness.org/', 'here.')}</p>
  </div></section>`,
});
page({
  path: '/our-approach/diversity-equity-and-inclusion/', title: 'Diversity, Equity, and Inclusion', titleBar: 'Diversity, Equity, and Inclusion',
  body: `<section class="section"><div class="container"><div class="row">
    <div class="col col-1_3">${img(up(2022, '01', 'kids-art-room.jpg'), 700, 933, 'Children in an art room')}</div>
    <div class="col col-2_3"><p>At The Ferrowick Foundation, we recognize that everyone carries unconscious assumptions and biases—that is part of being human. Left unexamined, though, those biases can cause real harm. Because the Foundation supports systems change to improve quality of life, we work to center diversity, equity and inclusion in everything we do. That means paying attention to who is at the table, whose experience shapes decisions, and how our grants affect residents who have historically had the least access to opportunity.</p>
    <p>We build on values that islanders already share—opportunity, community and fairness—and we hold ourselves accountable for practices that open doors rather than close them.</p>
    <p>Click ${a('/our-vision-mission-guiding-principles-and-values/', 'HERE')} to learn more about our mission, vision, values, and principles.</p></div></div>
  </div></section>`,
});
page({
  path: '/our-approach/data-driven-decision-making/', title: 'Data-Driven Decision Making', titleBar: 'Data-Driven Decision Making',
  body: `<section class="section"><div class="container"><div class="row">
    <div class="col col-1_2">${img(up(2022, '01', 'data-walk.jpg'), 600, 550, 'Residents reviewing community data charts')}</div>
    <div class="col col-1_2"><p>Tracking population-level data goes hand in hand with our Results-Based Approach to grantmaking. We draw on many sources of public data to decide where Foundation resources can do the most good, and we ask applicants to tell us about the data they use to make the same kinds of decisions.</p>
    <p>In 2018 the Foundation commissioned the Narragansett Bay Policy Lab to take a comprehensive look at the well-being of children and families in Newport’s North End, so that we could better understand the factors behind differences in outcomes between neighborhoods.</p></div></div>
    <div class="sep"></div>
    <p>The study compared quantitative and qualitative data on North End residents with data for the rest of Aquidneck Island and the state as a whole, across eight areas of well-being:</p>
    <ul><li>Population and Demographics</li><li>Income and Employment</li><li>Housing Stability</li><li>Physical and Behavioral Health</li><li>Early Childhood</li><li>K–12 Education</li><li>Youth Development</li><li>Family and Community Safety</li></ul>
    <p>The findings confirmed what many residents already knew: North End families face significant disparities in every category, which makes it harder to raise healthy children and to reach opportunities that other neighborhoods take for granted.</p>
    <p>Statewide indicators on children and families are available from ${a('https://www.rikidscount.org/', 'Rhode Island KIDS COUNT')}, which publishes an annual factbook and community-level data.</p>
    <p>The North End study followed an earlier community visioning project, supported by the Foundation, that asked residents a simple question: what can islanders do to improve their own lives and the lives of their neighbors? More than 700 people who live and work on the island contributed thousands of ideas, which were organized into a shared community vision.</p>
    <p>For The Ferrowick Foundation, data like this informs everything we do—and it is a call to action.</p>
    <p>To learn more, read:</p>
    <p>${a(D.wellbeingReport.href, D.wellbeingReport.title)}, Narragansett Bay Policy Lab, Report Commissioned by The Ferrowick Foundation, 2018</p>
    <p>${a(D.visionReport.href, D.visionReport.title)}, prepared with support from The Ferrowick Foundation, 2010</p>
  </div></section>`,
});
page({
  path: '/our-approach/collective-impact/', title: 'Collective Impact', titleBar: 'Collective Impact',
  body: `<section class="section"><div class="container"><div class="row">
    <div class="col col-1_2">${img(up(2021, 12, 'collective-impact-approach.jpg'), 545, 512, 'Diagram of partners around shared results')}</div>
    <div class="col col-1_2"><p>One of Aquidneck Island’s great strengths is its willingness to come together across town lines to solve problems. Building on that tradition, the Foundation was an early supporter of the collective impact framework described by John Kania and Mark Kramer in their 2011 Stanford Social Innovation Review article, “${a('https://ssir.org/articles/entry/collective_impact', 'Collective Impact')}.”</p>
    <p>Collective impact is a disciplined form of cross-sector collaboration. Public agencies, businesses, nonprofits and residents commit to a common agenda for solving a complex problem that no single organization could solve alone. Participants form a steering committee and working groups and pursue population-level change together.</p></div></div>
    <div class="sep"></div>
    <p>Several conditions are generally considered essential to collective impact:</p>
    <ul><li><strong>Common agenda</strong>: Participants share a vision for change, a common understanding of the problem and an agreed approach to solving it.</li><li><strong>Shared measurement</strong>: Data are collected and results measured the same way across all participants, keeping efforts aligned and partners accountable to one another.</li><li><strong>Mutually reinforcing activities</strong>: Each participant does what it does best, coordinated through a shared plan of action.</li><li><strong>Continuous communication</strong>: Frequent, open communication builds trust and keeps objectives aligned.</li><li><strong>Backbone support</strong>: A dedicated organization with its own staff coordinates the initiative and its partners.</li></ul>
    <p>These conditions are strongest when the following principles of practice are in place:</p>
    <ul><li>Design and carry out the initiative with a priority on <strong>equity</strong>.</li><li>Include <strong>community members</strong> in the collaboration.</li><li><strong>Recruit and co-create</strong> with partners from every sector.</li><li>Use data to continuously <strong>learn, adapt</strong> and <strong>improve</strong>.</li><li>Develop leaders with <strong>system leadership</strong> skills.</li><li>Focus on <strong>program and system strategies</strong>.</li><li>Build a culture of <strong>relationships, trust</strong> and <strong>respect</strong>.</li><li><strong>Customize</strong> for local context.</li></ul>
    <p>The Foundation convened and seed-funded its first collective impact initiative in 2012: the Island Youth Prevention Coalition, which brought schools, police, health providers and parents together to reduce underage drinking and vaping.</p>
    <p>Coalition partners went on to achieve measurable results, including a sustained drop in self-reported youth alcohol use and the adoption of consistent prevention curricula in every island middle school. The coalition now receives state and federal support.</p>
    <div class="sep"></div>
    <div class="row"><div class="col col-1_2">${img(up(2022, '01', 'cross-initiative-convening.jpg'), 650, 417, 'Partners from several initiatives meeting together')}</div>
    <div class="col col-1_2"><p>The Foundation continues to champion collective impact as a practical approach to community problem-solving. We have helped launch or sustain several initiatives addressing a range of island priorities, including:</p>
    <ul><li>Island Youth Prevention Coalition</li><li>Aquidneck Maternal and Infant Health Network</li><li>North End Early Learning Partnership</li><li>Island Child Wellness Collaborative</li><li>Pathways to Work Partnership</li><li>Equity Roundtable of Aquidneck Island</li></ul></div></div>
    <div class="sep"></div>
    <p>The Ferrowick Foundation will continue to support the goals of these initiatives. We invite current and prospective grantees to consider how their work connects to them and to talk with us about how we might strengthen that work together.</p>
    <p>To learn more about collective impact and the Foundation’s approach, see:</p>
    <ul><li>“${a('https://ssir.org/articles/entry/collective_impact', 'Collective Impact')},” by John Kania &amp; Mark Kramer, Stanford Social Innovation Review</li><li>The Foundation’s “${a(D.ciGuidance.href, 'Collective Impact Proposal Guidance')}”: for programs or projects that advance collective impact efforts on Aquidneck Island.</li><li>“${a('https://collectiveimpactforum.org/', 'Getting Started')},” resources from the Collective Impact Forum</li></ul>
  </div></section>`,
});

// ---------------------------------------------------------------- Focus Areas
page({
  path: '/focus-areas/', title: 'Focus Areas',
  body: `${hero(up(2022, '01', 'family-park-day.jpg'), up(2022, '01', 'family-park-day-mobile.jpg'), 1903, 430, 'gold-border')}
  <section class="section"><div class="container">
    <p class="lead-quote">“The Ferrowick Foundation works to improve the quality of life on Aquidneck Island, especially for residents with the fewest resources.”</p>
    <div class="sep"></div>
    ${circles()}
    <div class="sep"></div>
    <h2>Focus Areas</h2>
    <p>In every focus area, our work is guided by the Foundation’s ${a('/our-vision-mission-guiding-principles-and-values/', 'Mission, Vision, and Values')} and by several approaches we have found useful when working in our community.</p>
    <p>One is a ${a('/our-approach/results-based-approach/', 'Results-Based Approach')} to grantmaking. We are more interested in the measurable outcomes of grant-supported work than in the activities used to reach them. Each Focus Area lists targets that point to Foundation priorities, and applicants are asked to develop an anticipated results statement aligned with one of those targets. Learn more about our Results-Based Approach ${a('/our-approach/results-based-approach/', 'here')}.</p>
    <div class="sep"></div>
    <p class="lead center">Other approaches that inform our thinking include:</p>
    ${approachBoxes(APPROACHES.slice(1), 4)}
  </div></section>`,
});
for (const f of focusAreas) {
  const [lc, rc] = f.side.cols;
  page({
    path: `/focus-areas/${f.slug}/`, title: f.label,
    body: `${hero(f.hero, f.heroMobile, 1903, 580)}
    <section class="section"><div class="container">
      <h2>${esc(f.heading)}</h2>
      ${f.body.map((p) => `<p>${p}</p>`).join('')}
      <div class="sep"></div>
      <div class="row"><div class="col col-${lc}">${img(f.side.src, f.side.w, f.side.h, '')}</div>
      <div class="col col-${rc}">${f.intro ? `<p>${f.intro}</p>` : ''}<ul class="targets">${f.targets.map((t) => `<li>${t}</li>`).join('')}</ul></div></div>
    </div></section>
    <section class="cta-band" style="background-image:url('${up(2022, '01', 'learning-center-opening.jpg')}')"><div class="container">
      <p class="cta-text">If You Believe Your Project Qualifies For One Of Our Grants, Please Read Through Our Application Guidelines and Requirements</p>
      ${a('/application-process/', 'Learn About The Application Process', 'button xlarge gold')}
    </div></section>`,
  });
}

// ---------------------------------------------------------------- Grants
page({
  path: '/guidelines/', title: 'Guidelines', titleBar: 'Guidelines',
  body: `<section class="section"><div class="container">
    <h2>Grant Eligibility</h2>
    <p>The Foundation supports organizations with current 501(c)(3) status that serve residents of Aquidneck Island (Newport, Middletown and Portsmouth). Prior grantees must have submitted all required reports to be eligible. The Foundation supports organizations with an established track record and demonstrated financial capacity. At the Board of Directors’ discretion, newly established organizations or those using a fiscal sponsor may be considered.</p>
    <h4>Timeline</h4>
    <p>The Ferrowick Foundation Board usually meets in ${boardMonths}.</p>
    <p>${cycles.map((c) => `Applications for our <strong>${c.meeting}</strong> meeting are <strong>due by ${c.due}</strong>.`).join('<br>')}</p>
    <p>__<br>Please leave enough time before the deadline to discuss your request with Foundation staff. Applications received after the deadline will be reviewed at the discretion of the Foundation.<br><strong>For full instructions on how to apply, please see ${a('/application-process/', 'Application Process')}.</strong></p>
    <p class="underscore-rule">_______________________________________________________</p>
    <h3>What We Fund</h3>
    <p>The Ferrowick Foundation looks for projects of 501(c)(3) organizations with the following characteristics:</p>
    <p>• Projects that clearly and directly benefit the Aquidneck Island community with measurable, long-term results<br>• Projects that demonstrate a commitment to ${a('/our-approach/diversity-equity-and-inclusion/', 'diversity, equity and inclusion')}<br>• Projects that can be carried out effectively and ultimately sustained without our funding<br>• Projects that contribute to one of the ${a('/our-approach/collective-impact/', 'Collective Impact')} initiatives supported by the Foundation<br>The Foundation’s Board of Directors may consider applications outside these guidelines when, in its discretion, the project’s goals advance the mission of the Foundation.</p>
    <h3><strong>What We Do Not Fund</strong></h3>
    <ul>${doNotFund.map((x) => `<li>${x}</li>`).join('')}</ul>
    <p>After reviewing the grant guidelines, please contact the Foundation if you need further assistance: ${a(`mailto:${site.email}`, site.email)}</p>
  </div></section>`,
});
page({
  path: '/types-of-grants/', title: 'Types of Grants', titleBar: 'Types of Grants',
  body: `<section class="section"><div class="container">
    <p>The Ferrowick Foundation makes several types of grants to advance its mission and meet the needs of island nonprofits. Foundation staff will talk with applicants about potential requests and help determine which application fits a proposed project.</p>
    ${grantTypes.map((t) => `<p><strong>${t.name}</strong></p>${t.paras.map((p) => `<p>${p.replace('{Focus Area}', a('/focus-areas/', 'Focus Area')).replace('{results}', a('/our-approach/results-based-approach/', 'results'))}</p>`).join('')}`).join('')}
  </div></section>`,
});
page({
  path: '/application-process/', title: 'Application Process', titleBar: 'Application Process',
  body: `<section class="section"><div class="container">
    <p>The Ferrowick Foundation’s grantmaking is devoted entirely to improving the quality of life for Aquidneck Island residents, especially those with the fewest resources.</p>
    <p>To make the best use of Foundation dollars, we have set targets in each of our ${a('/focus-areas/', 'Focus Areas')} that address some of the island’s most pressing challenges, and we have designed an application process that is more of a conversation than a form.</p>
    <p>We know that every nonprofit has limited time for fundraising. Before writing an application, please ${a('/guidelines/', 'review our guidelines')} to see how your work aligns with the Foundation’s targets, and think about the ${a('/our-approach/results-based-approach/', 'anticipated results of the work')} and how you will measure them.</p>
    <p>Once you have reviewed our targets and considered your proposal and its anticipated results, please email Foundation staff a few paragraphs describing the proposal and how it might align with a Foundation target. A member of the Foundation staff will reply with next steps.</p>
    <p>Please note that The Ferrowick Foundation Board meets in early ${boardMonths.replace(', and', ' and')}. To be considered at a Board meeting, a request must be discussed with staff and substantially complete two months before that meeting. That means that applications:</p>
    <ul>${cycles.map((c) => `<li>For the ${c.meeting} meeting, must be submitted by ${c.due}</li>`).join('')}</ul>
    <p>Whether a late application can be considered is at the discretion of the Foundation’s small staff, taking into account the number of applications already scheduled for that meeting, the applicant’s history with the Foundation, and any emergency circumstances.</p>
    <p>Applicants whose proposals align with Foundation guidelines will be invited to a call with Foundation staff or will receive a link and access code for our online grant portal.</p>
    <p>During the call, applicants will share more detail about the proposal, be asked to submit any outstanding reports, and receive suggestions for strengthening the proposal or connecting with potential partners.</p>
    <p>The Foundation makes <strong>one grant per applicant each year</strong>. The grant period is generally one year, with projects of up to 18 months considered when justified. Grantees must complete a grant year before submitting a new request.</p>
  </div></section>`,
});
const docLi = (d) => `<li>${a(d.href, d.title)}</li>`;
page({
  path: '/application-assistance/', title: 'Application Assistance', titleBar: 'Application Assistance',
  body: `<section class="section"><div class="container">
    <h2>Resources for Applicants</h2>
    <h4>Application Questions</h4>
    <p>To preview the questions in our applications and reports, you may review the sample applications below. These samples are provided as a courtesy, for review only. Please note that The Ferrowick Foundation accepts requests only through our online <strong>${a(site.portalUrl, 'Grants Portal')}</strong>.</p>
    <ul class="doc-links">${[D.appProgramImpact, D.appOrgStrength, D.appFacilities, D.appRapid, D.appCollective].map(docLi).join('')}</ul>
    <h4>Results Worksheets</h4>
    <p>The worksheets below will help you write a clear, measurable and verifiable results statement for your application.</p>
    ${[D.wsProgramImpact, D.wsOrgStrength, D.wsFacilities].map((d) => `<p class="doc-bold">• ${a(d.href, d.title)}</p>`).join('')}
    <h4>Milestone Workbooks</h4>
    <p>The workbooks below will help you define the key progress points you expect your organization or participants to reach, the steps you will take to get there, and when you expect each milestone to be achieved.</p>
    ${[D.wbProgramImpact, D.wbOrgStrength, D.wbFacilities].map((d) => `<p class="doc-bold" style="padding-left:28px">• ${a(d.href, d.title)}</p>`).join('')}
    <h4>Collective Impact Guidance</h4>
    <ul class="doc-links doc-bold">${docLi(D.ciGuidance)}</ul>
  </div></section>`,
});
page({
  path: '/to-apply/', title: 'To Apply', titleBar: 'To Apply',
  body: `<section class="section"><div class="container">
    <p><strong>Important:</strong> To make sure you receive all emails from The Ferrowick Foundation, including messages sent by our grant portal system, please add ${a(`mailto:${site.portalSender}`, site.portalSender)} and the domain ${site.emailDomain} to your safe senders list.</p>
    <p>The following link will take you to the Grant Portal: ${a(site.portalUrl, '<strong>Grant Portal</strong>')}</p>
    <p>After you log in, you will see the Applicant Dashboard.</p>
    <p>From the dashboard you can:</p>
    <ul><li>Submit a new application</li><li>Submit a Progress Report or a Final Report</li><li>Continue a saved application or a report already in progress</li><li>View the history of applications and reports you have submitted.</li></ul>
    <p>Please note: by default, the dashboard shows only grants submitted by the applicant who is currently logged in.</p>
    <p>If you are new to an organization, please do not overwrite the previous user’s login information with your own. Instead, contact us to be added as a new user for your organization. If a user leaves an organization while a grant request is active, contact us to add the new contact person, and we will reassign the request and any reports.</p>
    <p><strong>For New Applicants</strong></p>
    <ul><li>If you are invited to submit an application, you will receive an email with a link and an Access Code for the appropriate online application. On the ${a(site.portalUrl, 'Grant Portal')} page, choose “Create a new account.” Enter your organization’s name and tax ID number, the applicant’s contact information, and the name of the organization’s chief executive. Then complete the questions for the funding request.</li>
    <li>The applicant is the person responsible for preparing and submitting the request for the organization (for example, the Development Director, grant writer, Executive Director or another staff member). The primary contact is the Executive Director/CEO.</li>
    <li>Your email address will be your login, and you will set your own password. This address will receive important notifications about the application.</li></ul>
    <p><strong>Grant Portal Tips</strong></p>
    <ul><li>If you forget your password, enter your email address on the login page, click the “Forgot Password” link, and follow the instructions to reset it.</li>
    <li>Once logged in, you can change your password by choosing “Edit Profile” from the menu that displays your name in the upper right corner of the dashboard. You can also update your email address, mailing address and phone number there. Please contact ${a(`mailto:${site.email}`, site.email)} to update your organization’s address or other organizational information.</li>
    <li>To see the full grant history for your organization, choose “View Organization History” from the applicant dashboard menu. By default, the dashboard shows only grants submitted by the user who is logged in.</li>
    <li>If a user leaves an organization while a grant request is active, contact us to add the new contact person, and we will reassign the request and any reports.</li>
    <li>You can print the Application Packet or the Question List as a PDF while working on the application.</li>
    <li>Please pay close attention to the instructions and character limits for each field. Character limits include spaces. We recommend drafting your answers in a word-processing document and then pasting them into the form to avoid losing your work.</li>
    <li>You can save your application and return to it later by clicking “Save” at the bottom of the form.</li>
    <li>When you are finished, be sure to click “Submit”—otherwise your application will not be received.</li>
    <li>You cannot make changes after submitting; please contact us if something on a submitted application needs to change.</li>
    <li>If a request you expect to see is missing from your dashboard, it is probably assigned to another user. Contact us to find out which login it is under and whether you would like it reassigned.</li></ul>
    <p>Please contact ${a(`mailto:${site.email}`, site.email)} if you need further guidance.</p>
  </div></section>`,
});
page({
  path: '/grant-portal/', title: 'Grant Portal', titleBar: 'Grant Portal',
  body: `<section class="section"><div class="container">
    <h2>Access To Your Grant Portal Account</h2>
    <p><strong>Important:</strong> To make sure you receive all emails from The Ferrowick Foundation, including messages sent through our grant portal system, please add ${a(`mailto:${site.portalSender}`, site.portalSender)} and the domain ${site.emailDomain} to your safe senders list.</p>
    <p>If you are new to an organization, please do not overwrite the previous user’s login information with your own. Instead, contact us to be added as a new user for your organization.</p>
    <p>If a user leaves an organization while a grant request is active, contact us to add the new contact person, and we will reassign the request and any reports.</p>
    <p>The following link will take you to the Grant Portal: ${a(site.portalUrl, '<strong>Log in to your account</strong>')}</p>
    <p>If you forget your password, enter your email address on the login page, click the “Forgot Password” link and follow the instructions. The Foundation does not keep a record of your password. Once logged in, you can change your password by choosing “Edit Profile” from the menu that displays your name in the upper right corner of your dashboard. You can also update your email address, mailing address and phone number there.</p>
    <p>After you log in, you will see the Applicant Dashboard.</p>
    <h4>From the dashboard you can:</h4>
    <ul><li>Continue a saved application or a report already in progress.</li><li>Submit a Progress Report or a Final Report.</li><li>View the history of applications and reports you have submitted.</li></ul>
    <p>Please note: by default, the dashboard shows only grants submitted by the applicant who is currently logged in.</p>
    <h4>To submit a Progress Report or Final Report:</h4>
    <p>After logging in to your account, you will see the Applicant Dashboard with your organization’s information and grant history. Scroll down to the section called <strong>Follow-Up Forms</strong>. A blue “Edit” link appears next to the report that is currently due. Click “Edit” to open the report form.</p>
    <p>The report form is pre-filled with information from your application. Please complete all required sections and click “Submit” when you are finished. Timely reports are required for future grant consideration.</p>
    <p>If you need help or clarification, please contact:</p>
    <p>${a(`mailto:${site.email}`, site.email)}</p>
  </div></section>`,
});
page({
  path: '/recent-grants/', title: 'Recent Grants', titleBar: 'Recent Grants', bodyClass: 'recent-grants',
  body: `<section class="section recent-grants"><div class="container">${recentMeetings.map((m, i) => `${i ? `<h4>At the ${m.date} Board Meeting, the Directors of The Ferrowick Foundation approved grants to the organizations seeking the following results:</h4>${meetingHtml(m).replace(/^<p>.*?<\/p>/, '')}` : meetingHtml(m)}<p class="meeting-sep">__ ______________________________________________________________________________________________________</p>`).join('')}</div></section>`,
});
page({
  path: '/grant-reports/', title: 'Grant Reports', titleBar: 'Grant Reports',
  body: `<section class="section"><div class="container">
    <p><strong>To submit a Progress Report or a Final Report:</strong></p>
    <p>After logging in to your account, you will see the Applicant Dashboard with your organization’s information and grant history. Scroll down to the section called <strong>Follow-Up Forms</strong>. A blue “Edit” link appears next to the report that is currently due. Click “Edit” to open the report form. The report form is pre-filled with information from your application. Please complete all required sections and click “Submit” when you are finished. Timely reports are required for future grant consideration.</p>
  </div></section>`,
});

// ---------------------------------------------------------------- Fellowship
page({
  path: '/fellowship/', title: 'Fellowship', titleBar: 'Fellowship',
  body: `<section class="section"><div class="container">
    <h1>The Ferrowick Foundation Rosalind Atherly Fellowship in Social Work</h1>
    <div class="row"><div class="col col-1_3">${img(fellowshipPortrait.path, 308, 400, 'Portrait of Rosalind Atherly')}</div>
    <div class="col col-2_3"><p>In 2021 the Foundation lost its first executive director, Rosalind “Roz” Atherly, who led our work for twenty years.</p>
    <p>The Board created this Fellowship in her name to honor her legacy. Roz always described herself first as a social worker. She earned her master’s degree in social work and began her career at a senior-services agency in Newport, and her training shaped the Foundation’s approach to the community in lasting ways.</p>
    <p>The Foundation launched the Fellowship in 2022 together with our nonprofit partners. As the program has grown, so has our appreciation for the essential role social workers play on the island. Social workers are present at every stage of life and stand with island families in moments of crisis, often when those families have nowhere else to turn.</p></div></div>
    <div class="sep"></div>
    <p>The Fellowship provides financial support to social work students who would otherwise complete their required field internships without pay. Fellows also take part in monthly learning sessions with local professionals that help them build a network of island social workers, and an annual conference extends the Fellowship’s reach. We are grateful to the many island social workers who generously share their time and expertise as presenters and advisors.</p>
    <p>The Foundation is proud to continue this program to strengthen the local profession and support the next generation of Aquidneck Island social workers.</p>
  </div></section>`,
});
page({
  path: '/fellowship/how-to-apply/', title: 'How To Apply', titleBar: 'How To Apply',
  body: `<section class="section"><div class="container">
    <h2>Fellowship Criteria:</h2>
    <ul class="checklist">
      <li>Fellows must currently live on Aquidneck Island.</li>
      <li>Fellows should show a commitment to building their career on Aquidneck Island.</li>
      <li>Fellows should show an active interest in community engagement.</li>
      <li>Fellows must be accepted into a social work program, undergraduate or graduate, and may be enrolled part time or full time when they apply.</li>
      <li>Fellows must commit to a full academic year, from Fall 2026 through Spring 2027.</li>
      <li>Fellows should apply only if no other source—such as a grant or paid employment that counts toward internship hours—is paying for their internship time.</li>
      <li>Fellows must agree to be placed at an Aquidneck Island nonprofit that is willing to participate in the fellowship program and follow its guidelines. Funding is paid to the participating internship site, which pays the Fellow. Funding will not be paid to the Fellow directly.</li>
      <li>Fellows must commit to attending monthly learning sessions throughout the academic year and other events, including networking conferences and media opportunities.</li>
      <li>Fellows must commit to submitting a final report and an experience survey.</li>
    </ul>
    <div class="sep"></div>
    <p><strong>How to Apply:</strong></p>
    <p>The Ferrowick Foundation invites students enrolled in an accredited social work program to apply for the 2026 Ferrowick Foundation Rosalind Atherly Fellowship in Social Work. <strong>The deadline to apply is February 27th 2026</strong>. Please reach out with any questions!</p>
    <p>Before you apply, we <strong>STRONGLY</strong> recommend reviewing the information session presentation and/or video. Doing so will help you prepare a competitive application: ${a(D.fellowshipDeck.href, D.fellowshipDeck.title)} and ${a(D.fellowshipVideo.href, D.fellowshipVideo.title)}.</p>
    <p>We anticipate awarding 2–3 fellowships for the 2026–2027 program year.</p>
    <div class="btn-row" style="text-align:left">${a('/forms/atherly-fellowship-application-2026/', 'Apply Now', 'button')}</div>
  </div></section>`,
});
page({ path: '/fellowship/fellows/', title: 'Fellows', titleBar: 'Fellows', body: `<section class="section"><div class="container"><h1>Profiles of Our Fellows Will Be Posted Soon</h1></div></section>` });
page({ path: '/fellowship/advisory-committee/', title: 'Advisory Committee', titleBar: 'Advisory Committee', body: `<section class="section"><div class="container"><h1>Advisory Committee Member Profiles Will Be Posted Soon</h1></div></section>` });
page({ path: '/fellowship/the-conference/', title: 'The Conference', titleBar: 'The Conference', body: `<section class="section"><div class="container"><h1>Details About the Annual Conference Will Be Posted Soon</h1></div></section>` });

// ---------------------------------------------------------------- News
const PER_PAGE = 10;
const listItem = (p) => `<article>${a(`/${p.slug}/`, img(p.image, 320, 202, ''), 'thumb')}<div><h2>${a(`/${p.slug}/`, esc(p.title))}</h2><p>${esc(excerpt(p))}</p><p class="post-meta">By ${esc(p.author)} | ${fmtDate(p.date)} | ${cats(p)}</p>${a(`/${p.slug}/`, 'Read More', 'read-more')}</div></article>`;
const nPages = Math.ceil(posts.length / PER_PAGE);
const pager = (n, base) => `<nav class="pagination" aria-label="Pagination">${n > 1 ? a(n === 2 ? base : `${base}page/${n - 1}/`, 'Previous') : ''}${Array.from({ length: nPages }, (_, i) => i + 1 === n ? `<span class="current">${i + 1}</span>` : a(i ? `${base}page/${i + 1}/` : base, String(i + 1))).join('')}${n < nPages ? a(`${base}page/${n + 1}/`, 'Next') : ''}</nav>`;
for (let n = 1; n <= nPages; n++) {
  page({
    path: n === 1 ? '/news/' : `/news/page/${n}/`, title: 'News', titleBar: 'News',
    body: `<section class="section"><div class="container"><div class="post-list">${posts.slice((n - 1) * PER_PAGE, n * PER_PAGE).map(listItem).join('')}</div>${pager(n, '/news/')}</div></section>`,
  });
}
for (const c of [...new Set(posts.flatMap((p) => p.categories))]) {
  const slug = c.toLowerCase().replace(/\s+/g, '-');
  page({ path: `/category/${slug}/`, title: c, titleBar: c, body: `<section class="section"><div class="container"><div class="post-list">${posts.filter((p) => p.categories.includes(c)).map(listItem).join('')}</div></div></section>` });
}
posts.forEach((p, i) => {
  const prev = posts[i + 1], next = posts[i - 1];
  const related = posts.filter((x) => x !== p).slice(0, 4);
  const u = encodeURIComponent(`${BASE_URL}/${p.slug}/`), t = encodeURIComponent(p.title);
  page({
    path: `/${p.slug}/`, title: p.title, titleBar: p.title,
    body: `<section class="section single-post"><div class="container">
      <div class="post-nav">${prev ? a(`/${prev.slug}/`, '‹ Previous') : '<span></span>'}${next ? a(`/${next.slug}/`, 'Next ›') : '<span></span>'}</div>
      ${p.noFeatured ? '' : `<div class="featured">${img(p.image, 900, 600, '')}</div><ul class="view-larger"><li>${a(p.image, 'View Larger Image')}</li></ul>`}
      <h2>${esc(p.title)}</h2>
      ${p.html}
      <p class="post-meta">By ${esc(p.author)} | ${fmtDate(p.date)}${p.modified ? ` | Updated ${fmtDate(p.modified)}` : ''} | ${cats(p)}</p>
      <div class="share-box"><h4>Share This Story, Choose Your Platform!</h4>${a(`https://www.facebook.com/sharer.php?u=${u}&t=${t}`, 'Facebook')}${a(`https://www.linkedin.com/shareArticle?mini=true&url=${u}&title=${t}`, 'LinkedIn')}${a(`mailto:?subject=${t}&body=${u}`, 'Email')}</div>
      <section class="related-posts"><h3>Related Posts</h3><div class="grid">${related.map((r) => `<div>${a(`/${r.slug}/`, img(r.image, 500, 383, esc(r.title)))}<h4>${a(`/${r.slug}/`, esc(r.title))}</h4></div>`).join('')}</div></section>
    </div></section>`,
  });
});

// ---------------------------------------------------------------- Contact, search, 404
page({
  path: '/contact/', title: 'Contact', titleBar: 'Contact',
  body: `<section class="section"><div class="container">
    <h3 class="center caps">Contact Info</h3><hr class="title-sep">
    <div class="content-boxes cols-3 contact-boxes">
      <div class="content-box">${icons.phone}<h4>${a(`tel:${site.phone.replace(/[^0-9]/g, '')}`, site.phone)}</h4></div>
      <div class="content-box">${icons.envelope}<h4>${a(`mailto:${site.email}`, site.email)}</h4></div>
      <div class="content-box">${icons.pin}<h4>${site.address.join('<br>')}</h4></div>
    </div>
    <div class="social" style="justify-content:center">${site.social.slice(0, 2).map((s) => `<a href="${s.href}" aria-label="${s.label}" rel="noopener">${icons[s.icon]}</a>`).join('')}</div>
    <div class="sep"></div>
    <h3 class="center caps">Send a Message</h3><hr class="title-sep">
    <p class="center">The Ferrowick Foundation invites new applicants to tell us about the work they hope to fund. Please send a brief description of your project using the form below, and a Foundation staff member will follow up to discuss next steps. Returning applicants, or anyone with another question, may contact the Foundation directly.</p>
    <div id="contact-notice" class="form-notice" role="status"><strong>This is a demonstration site.</strong> Your message was not sent anywhere and nothing was stored. To reach the fictional Ferrowick Foundation in this demo, the listed address is ${site.email}, a reserved example address that does not receive mail.</div>
    <form action="/contact/demo-form-not-sent/" method="get" data-demo-form="contact-notice">
      <div class="form-field"><label for="cf-name">Your Name<span class="req">(Required)</span></label><input id="cf-name" name="your_name" type="text" required></div>
      <div class="form-field"><label for="cf-phone">Phone<span class="req">(Required)</span></label><input id="cf-phone" name="phone" type="tel" placeholder="(999) 999-9999" required></div>
      <div class="form-field"><label for="cf-email">Email<span class="req">(Required)</span></label><input id="cf-email" name="email" type="email" required></div>
      <div class="form-field"><fieldset><legend>Preferred contact method<span class="req">(Required)</span></legend><label class="choice"><input type="checkbox" name="contact_method" value="Phone"> Phone</label><label class="choice"><input type="checkbox" name="contact_method" value="Email"> Email</label></fieldset></div>
      <div class="form-field"><label for="cf-org">Organization’s Name<span class="req">(Required)</span></label><input id="cf-org" name="organization" type="text" required></div>
      <div class="form-field"><fieldset><legend>Are you a 501(c)(3) organization operating on Aquidneck Island?<span class="req">(Required)</span></legend><label class="choice"><input type="radio" name="is_501c3" value="Yes" required> Yes</label><label class="choice"><input type="radio" name="is_501c3" value="No"> No</label></fieldset></div>
      <div class="form-field"><label for="cf-desc">Give us a brief description of the project you are seeking support for.<span class="req">(Required)</span></label><textarea id="cf-desc" name="project_description" required></textarea></div>
      <button class="button" type="submit">Submit</button>
    </form>
  </div></section>`,
});
page({
  path: '/contact/demo-form-not-sent/', title: 'Message Not Sent', titleBar: 'Message Not Sent',
  body: `<section class="section"><div class="container"><p><strong>This is a demonstration website.</strong> Forms on this site are not connected to any mail system or database, so nothing you entered was sent or stored. Please do not enter real personal information.</p><p>${a('/contact/', 'Return to the Contact page')}</p></div></section>`,
});
page({
  path: '/search/', title: 'Search', titleBar: 'Search',
  body: `<section class="section"><div class="container"><form action="/search/" method="get" class="form-field" role="search"><label for="search-query">Search this site</label><div style="display:flex;gap:10px"><input id="search-query" type="text" name="s"><button class="button" type="submit">Search</button></div></form><div id="search-results"><p>Enter a word or phrase to search the site.</p></div><noscript><p>Search results require JavaScript. You can also browse the site using the menu or the <a href="/sitemap.xml">sitemap</a>.</p></noscript></div></section>`,
});
page({
  path: '/404.html', title: 'Page not found', titleBar: 'Error 404 Page', file: '404.html',
  body: `<section class="section"><div class="container"><h2>Oops, This Page Could Not Be Found!</h2><div class="row"><div class="col col-1_3"><h3>Helpful Links</h3><ul><li>${a('/', 'Home')}</li><li>${a('/news/', 'News')}</li><li>${a('/contact/', 'Contact')}</li></ul></div><div class="col col-2_3"><h3>Search Our Website</h3><p>Can’t find what you need? Try a search.</p><form action="/search/" method="get" style="display:flex;gap:10px"><label class="sr-only" for="s404">Search</label><input id="s404" type="search" name="s" class="form-field" style="flex:1;padding:10px"><button class="button" type="submit">Search</button></form></div></div></div></section>`,
});

// ---------------------------------------------------------------- Demo destinations (fictional stand-ins for external services)
const demoForm = ({ path: p, title, intro, fields, notice }) => page({
  path: p, raw: true,
  html: standalone(title, `<h1>${esc(title)}</h1>${intro}
    <div id="demo-notice" class="form-notice" role="status"><strong>Demonstration form.</strong> ${notice} Nothing was submitted or stored.</div>
    <form action="/contact/demo-form-not-sent/" method="get" data-demo-form="demo-notice">${fields}<button class="button" type="submit">Submit</button></form>`),
});
const fld = (id, label, type = 'text', req = true) => `<div class="form-field"><label for="${id}">${label}${req ? '<span class="req">(Required)</span>' : ''}</label>${type === 'textarea' ? `<textarea id="${id}" name="${id}"${req ? ' required' : ''}></textarea>` : `<input id="${id}" name="${id}" type="${type}"${req ? ' required' : ''}>`}</div>`;
demoForm({
  path: '/forms/keystone-forum-rsvp/', title: 'The Keystone Forum – RSVP',
  intro: '<p>Friday, May 2, 2025 · 9:00 am – 12:30 pm · Community Room, Lantern Wharf Commons, Middletown. Hosted by The Ferrowick Foundation.</p>',
  fields: fld('name', 'Name') + fld('organization', 'Organization') + fld('email', 'Email', 'email') + fld('attendees', 'Number attending', 'text', false),
  notice: 'This RSVP form belongs to a fictional event on a demonstration website.',
});
demoForm({
  path: '/forms/fellowship-interest-2024/', title: 'Rosalind Atherly Fellowship in Social Work – Interest Form',
  intro: '<p>Tell us about yourself and we will send details about the Fellowship and upcoming information sessions.</p>',
  fields: fld('name', 'Name') + fld('email', 'Email', 'email') + fld('school', 'Social work program') + fld('town', 'Town of residence'),
  notice: 'This interest form belongs to a fictional fellowship on a demonstration website.',
});
demoForm({
  path: '/forms/atherly-fellowship-application-2026/', title: '2026 Rosalind Atherly Fellowship in Social Work – Application',
  intro: '<p>The Ferrowick Foundation · Application for the 2026–2027 program year.</p>',
  fields: fld('name', 'Full name') + fld('email', 'Email', 'email') + fld('phone', 'Phone', 'tel') + fld('town', 'Town of residence (Newport, Middletown or Portsmouth)') + fld('program', 'Social work program and degree (BSW/MSW)') + fld('status', 'Enrollment status (full time / part time)') + fld('placement', 'Proposed internship site, if known', 'text', false) + fld('essay1', 'Why do you want to build your social work career on Aquidneck Island?', 'textarea') + fld('essay2', 'Describe your community engagement experience.', 'textarea'),
  notice: 'This application belongs to a fictional fellowship on a demonstration website.',
});

// Demonstration grant portal (stand-in for a third-party grants management system).
page({
  path: '/portal/Home/Logon/', raw: true,
  html: portalPage(),
});
// Shared folder listing (stand-in for the cloud-drive folder the reference links to).
page({
  path: '/shared/defining-results/', raw: true,
  html: folderPage(),
});

// ---------------------------------------------------------------- standalone templates
function standalone(title, inner, extraCss = '') {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>${esc(title)}</title><link rel="stylesheet" href="/assets/fonts/fonts.css"><link rel="stylesheet" href="/assets/css/site.css"><style>body{background:#f3f4f6}.sheet{max-width:760px;margin:40px auto;background:#fff;padding:36px 40px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.08)}${extraCss}</style></head><body><main class="sheet">${inner}<p class="demo-note">${esc(site.demoNotice)}</p></main><script src="/assets/js/site.js" defer></script></body></html>`;
}
function portalPage() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Applicant Log On - Grant Portal (Demo)</title><link rel="stylesheet" href="/assets/fonts/fonts.css"><style>
  body{margin:0;font-family:'Source Sans 3',Arial,sans-serif;background:#eef1f4;color:#2b2f33}header{background:#1d3347;color:#fff;padding:14px 28px;display:flex;justify-content:space-between;align-items:center}header b{font-size:20px;letter-spacing:.3px}.wrap{max-width:980px;margin:36px auto;display:grid;grid-template-columns:1fr 1fr;gap:28px;padding:0 16px}.card{background:#fff;border-radius:6px;padding:26px 30px;box-shadow:0 1px 4px rgba(0,0,0,.1)}h1{font-size:24px;margin:0 0 14px}h2{font-size:19px;margin:0 0 10px}label{display:block;font-weight:600;margin:14px 0 4px}input{width:100%;box-sizing:border-box;padding:10px;border:1px solid #c5cbd2;border-radius:4px;font:inherit}button{margin-top:18px;background:#2a6db0;color:#fff;border:0;padding:10px 22px;border-radius:4px;font:inherit;font-weight:600;cursor:pointer}.note{background:#fff7e0;border:1px solid #e3c46b;padding:12px 16px;border-radius:4px;font-size:15px}.form-notice{display:none;margin-top:16px}.form-notice.show{display:block}a{color:#2a6db0}footer{text-align:center;font-size:12px;color:#777;margin:30px 0}@media(max-width:760px){.wrap{grid-template-columns:1fr}}</style></head><body>
  <header><b>Grantwell Portal</b><span>The Ferrowick Foundation</span></header>
  <div class="wrap">
    <section class="card"><h1>Applicant Log On</h1>
      <p class="note"><strong>Demonstration portal.</strong> This page imitates the role of a third-party grant portal for a fictional foundation. No accounts exist, and nothing entered here is sent or stored. Do not enter real credentials.</p>
      <form action="/contact/demo-form-not-sent/" method="get" data-demo-form="portal-notice">
        <label for="email">Email Address</label><input id="email" name="email" type="email" required autocomplete="off">
        <label for="code">Access Code (from your invitation email)</label><input id="code" name="access_code" type="text" required autocomplete="off">
        <button type="submit">Log On</button>
        <p><a href="#forgot">Forgot Password?</a></p>
      </form>
      <div id="portal-notice" class="note form-notice" role="status">This demonstration portal cannot sign you in. In the fictional process, invited applicants would now see the Applicant Dashboard.</div>
    </section>
    <section class="card"><h2>Create a New Account</h2><p>If The Ferrowick Foundation has invited you to apply, use the link and Access Code in your invitation email to create an account. You will enter your organization’s name and tax ID number, the applicant’s contact information, and the name of the organization’s chief executive.</p>
      <h2 id="forgot">Forgot Password</h2><p>Enter your email address on the log on form and choose “Forgot Password?” to receive reset instructions. (Not available in this demonstration.)</p>
      <h2>Applicant Dashboard</h2><ul><li>Submit a new application</li><li>Submit a Progress Report or Final Report</li><li>Continue a saved application or report</li><li>View Organization History</li></ul>
      <p><a href="/to-apply/">Return to The Ferrowick Foundation website</a></p></section>
  </div><footer>${esc(site.demoNotice)}</footer><script src="/assets/js/site.js" defer></script></body></html>`;
}
function folderPage() {
  const files = [D.wsProgramImpact, D.wsOrgStrength, D.wsFacilities, D.wbProgramImpact, D.wbOrgStrength, D.wbFacilities];
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Defining Results – Shared Folder</title><style>body{margin:0;font-family:Arial,Helvetica,sans-serif;background:#fff;color:#202124}header{border-bottom:1px solid #dadce0;padding:14px 24px;font-size:20px}main{max-width:960px;margin:24px auto;padding:0 16px}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:10px 8px;border-bottom:1px solid #e8eaed;font-size:14px}th{color:#5f6368;font-weight:500}a{color:#1a73e8;text-decoration:none}.crumb{color:#5f6368;font-size:14px;margin-bottom:10px}footer{font-size:12px;color:#777;text-align:center;margin:30px}</style></head><body>
  <header>Shared Files</header><main><div class="crumb">Shared with anyone with the link › The Ferrowick Foundation › Defining Results</div>
  <table><thead><tr><th>Name</th><th>Owner</th><th>Last modified</th><th>File type</th></tr></thead><tbody>
  ${files.map((f) => `<tr><td><a href="${f.href}">${path.basename(f.href)}</a></td><td>Ferrowick Foundation</td><td>May 14, 2018</td><td>${f.href.endsWith('.doc') ? 'Word document' : 'Excel workbook'}</td></tr>`).join('')}
  </tbody></table></main><footer>${esc(site.demoNotice)}</footer></body></html>`;
}
function externalLedger(m) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>${esc(m.name.replace(/\s*“.*?”/, ''))} – The Aquidneck Ledger (fictional)</title><style>body{margin:0;font-family:Georgia,serif;color:#222;background:#faf8f3}header{background:#111;color:#fff;padding:16px 24px;font-size:28px;letter-spacing:1px}main{max-width:720px;margin:30px auto;padding:0 16px;line-height:1.7}h1{font-size:34px;line-height:1.2}.dek{color:#555;font-style:italic}footer{font-size:12px;color:#777;text-align:center;margin:30px;font-family:Arial,sans-serif}</style></head><body>
  <header>The Aquidneck Ledger <small style="font-size:13px;opacity:.7">(a fictional newspaper)</small></header><main><p class="dek">Obituaries</p><h1>${esc(m.name)}</h1>
  ${[...m.bio, m.more].map((p) => `<p>${p}</p>`).join('')}<p><a href="/in-memoriam/${m.slug}/">Back to The Ferrowick Foundation</a></p></main><footer>${esc(site.demoNotice)}</footer></body></html>`;
}

// ---------------------------------------------------------------- write output
function writeFile(rel, content) {
  if (/\.(html|css)$/.test(rel)) content = withBase(content);
  const f = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
}
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    if (e.isDirectory()) { fs.mkdirSync(d, { recursive: true }); copyDir(s, d); } else fs.copyFileSync(s, d);
  }
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
copyDir(path.join(ROOT, 'src/static'), DIST);
copyDir(path.join(ROOT, 'src/assets'), path.join(DIST, 'assets'));
if (BASE_PATH) for (const css of ['assets/css/site.css', 'assets/fonts/fonts.css']) writeFile(css, fs.readFileSync(path.join(DIST, css), 'utf8'));
writeFile('.nojekyll', '');
copyDir(path.join(ROOT, 'src/documents'), DIST); // generated documents (see scripts/docs, committed)

const index = [];
for (const p of pages) {
  const html = p.raw ? p.html : layout({ ...p, recentPosts });
  const rel = p.file || path.join(p.path, 'index.html');
  writeFile(rel, html);
  if (!p.raw && !p.file && !p.path.startsWith('/contact/demo')) {
    const text = p.body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
    index.push({ url: BASE_PATH + p.path, title: p.title || 'Home', text: text.slice(0, 6000) });
  }
}
writeFile('search-index.json', JSON.stringify(index));

// sitemap + robots (crawler-accessible; indexing is discouraged via meta robots and X-Robots-Tag instead)
const urls = pages.filter((p) => !p.file && !p.path.startsWith('/contact/demo')).map((p) => p.path);
const docs = [...Object.values(D).map((d) => d.href), ...biennialReports.map((r) => r.href)];
writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls, ...docs].map((u) => `  <url><loc>${BASE_URL}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFile('robots.txt', `# Crawling is allowed so test crawlers can reach every page and document.\n# Indexing is discouraged with <meta name="robots" content="noindex, nofollow"> and X-Robots-Tag headers.\nUser-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`);
// Netlify headers (also understood by Cloudflare Pages)
writeFile('_headers', `/*\n  X-Robots-Tag: noindex, nofollow\n\n/*.pdf\n  X-Robots-Tag: noindex, nofollow\n  Content-Type: application/pdf\n\n/*.doc\n  Content-Type: application/msword\n\n/*.xls\n  Content-Type: application/vnd.ms-excel\n\n/*.xlsm\n  Content-Type: application/vnd.ms-excel.sheet.macroEnabled.12\n`);

console.log(`Built ${pages.length} pages, ${docs.length} documents referenced → ${path.relative(ROOT, DIST)}/  (SITE_URL=${BASE_URL})`);
