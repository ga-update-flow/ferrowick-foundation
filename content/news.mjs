// News posts (newest first). Some posts intentionally carry their information only inside an image,
// mirroring the reference site's flyer posts. `html` is the post body; `images` are rendered flyers.
import { archivedMeetings } from './recentGrants.mjs';
import { staff, memoriam } from './people.mjs';

const up = (y, m, f) => `/wp-content/uploads/${y}/${m}/${f}`;

// ---------- flyer designs (rendered to images by scripts/art/render-images.mjs) ----------
const F = "font-family:'Source Sans 3',sans-serif;";
const SLAB = "font-family:'Zilla Slab',serif;";
const logoBlock = (color = '#234E70') => `<div style="display:flex;align-items:center;gap:10px"><div style="width:7px;height:46px;background:#C9963F"></div><div style="${F}font-weight:700;color:${color};font-size:22px;line-height:22px">The Ferrowick<br>Foundation</div></div>`;
const qr = (seed, size = 120) => {
  let s = seed, cells = '';
  for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
    const on = finder ? (x % 6 === 0 || y % 6 === 0 || (x % 7 > 1 && x % 7 < 5 && y % 7 > 1 && y % 7 < 5) || x === 20 || y === 20) : s % 3 === 0;
    if (on) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="-1 -1 23 23" style="background:#fff"><g fill="#111">${cells}</g></svg>`;
};

export const flyers = [
  {
    path: up(2025, '04', 'Keystone-Forum-Flyer.png'), w: 1300, h: 1004,
    html: `<div style="width:1300px;height:1004px;background:linear-gradient(135deg,#F4F1EA,#E3ECF2);${F}position:relative;color:#1f2d3a">
      <div style="position:absolute;left:60px;top:50px">${logoBlock()}</div>
      <div style="position:absolute;left:60px;top:150px;width:560px">
        <div style="${SLAB}font-size:84px;line-height:88px;color:#234E70">The Keystone<br>Forum</div>
        <div style="margin-top:22px;font-size:30px;line-height:40px">A half-day working session on new fundraising strategies for island nonprofits</div>
        <div style="margin-top:34px;font-size:28px;line-height:42px"><b>Friday, May 2, 2025</b><br>9:00 am – 12:30 pm<br>Community Room, Lantern Wharf Commons<br>75 Lantern Wharf Way, Middletown</div>
      </div>
      <div style="position:absolute;right:70px;top:120px;width:470px;height:470px;transform:rotate(45deg);border:14px solid #C9963F;background:#fff"></div>
      <div style="position:absolute;right:160px;top:270px;width:290px;text-align:center;${SLAB}font-size:44px;color:#234E70;line-height:50px">Keystone<br>Matching<br>Grant Program</div>
      <div style="position:absolute;left:60px;bottom:60px;display:flex;gap:28px;align-items:center">${qr(77, 150)}<div style="font-size:30px;line-height:40px"><b>Scan to RSVP</b><br>Space is limited — please register early.</div></div>
      <div style="position:absolute;right:70px;bottom:70px;width:480px;font-size:24px;line-height:33px;text-align:right">All are welcome to attend. Only eligible organizations may apply for matching funds.</div>
    </div>`,
  },
  {
    path: up(2025, '04', 'keystone-logo.jpg'), w: 433, h: 184, type: 'jpeg',
    html: `<div style="width:433px;height:184px;background:#fff;display:flex;align-items:center;justify-content:center;gap:18px;border:1px solid #ddd;box-sizing:border-box">
      <svg width="90" height="90" viewBox="0 0 90 90"><path d="M20 80 L30 15 L60 15 L70 80 Z" fill="none" stroke="#C9963F" stroke-width="6"/><path d="M38 15 L42 50 L48 50 L52 15" fill="#234E70"/></svg>
      <div style="${SLAB}font-style:italic;font-size:30px;line-height:32px;color:#234E70">The Keystone<br>Matching Grant<br>Program</div></div>`,
  },
  {
    path: up(2024, '09', 'Atherly-Fellowship-2025-flyer-791x1024.png'), w: 791, h: 1024,
    html: `<div style="width:791px;height:1024px;background:#2E3B55;color:#fff;${F}position:relative;overflow:hidden">
      <div style="position:absolute;right:-60px;top:-60px;width:260px;height:260px;border-radius:50%;background:#C9963F;opacity:.9"></div>
      <div style="position:absolute;left:44px;top:46px">${logoBlock('#fff')}</div>
      <div style="position:absolute;left:44px;top:140px;width:700px;${SLAB}font-size:44px;line-height:50px">The 2025 Ferrowick Foundation<br>Rosalind Atherly Fellowship<br>in Social Work</div>
      <div style="position:absolute;left:44px;top:350px;font-size:28px;font-weight:700;color:#F3D28C">ONE-YEAR FELLOWSHIP · FALL 2025 – SPRING 2026</div>
      <div style="position:absolute;left:44px;top:410px;font-size:30px;line-height:52px">Are you …<br>☑ an Aquidneck Island resident?<br>☑ a BSW or MSW student?<br>☑ looking for a paid internship?<br>☑ ready to build a professional network?</div>
      <div style="position:absolute;left:44px;top:690px;width:700px;font-size:24px;line-height:34px">Fellows receive support for an internship at an island nonprofit and join monthly learning sessions with local social workers.</div>
      <div style="position:absolute;left:44px;top:800px;font-size:26px">Join a virtual information session: <b>October 16 at 12 pm</b> or <b>October 16 at 7 pm</b></div>
      <div style="position:absolute;left:44px;top:860px;font-size:26px;font-weight:700;color:#F3D28C">Application deadline: February 28, 2025</div>
      <div style="position:absolute;left:44px;bottom:44px;font-size:22px">Questions? info@example.org</div>
      <div style="position:absolute;right:44px;bottom:34px;background:#C9963F;color:#1f2d3a;font-weight:700;font-size:30px;padding:14px 34px;border-radius:40px">APPLY NOW ›</div>
    </div>`,
  },
  {
    path: up(2024, '09', 'Fellowship-applications-open-thumb.jpg'), w: 1000, h: 766, type: 'jpeg',
    html: `<div style="width:1000px;height:766px;background:#2E3B55;color:#fff;${F}display:flex;flex-direction:column;justify-content:center;padding:70px;box-sizing:border-box">
      <div style="font-size:30px;color:#F3D28C;font-weight:700;letter-spacing:2px">NOW ACCEPTING APPLICATIONS</div>
      <div style="${SLAB}font-size:76px;line-height:82px;margin-top:20px">Rosalind Atherly<br>Fellowship in Social Work</div>
      <div style="margin-top:40px">${logoBlock('#fff')}</div></div>`,
  },
  {
    path: up(2024, '09', 'Now-Hiring-1.png'), w: 773, h: 1000,
    html: `<div style="width:773px;height:1000px;background:#fff;${F}position:relative;overflow:hidden;color:#1f2d3a">
      <div style="position:absolute;left:40px;top:40px">${logoBlock()}</div>
      <div style="position:absolute;right:0;top:120px;width:330px;height:420px;background:#D9DEE4;clip-path:polygon(25% 0,100% 0,100% 100%,25% 100%,0 50%)"></div>
      <div style="position:absolute;right:30px;top:220px;${SLAB}font-weight:700;font-size:84px;line-height:96px;color:#234E70;text-align:right">NOW<br>HIRING</div>
      <div style="position:absolute;left:40px;top:150px;width:360px;font-size:26px;line-height:38px;font-weight:600">The Ferrowick Foundation is looking for people who want to make a difference for Aquidneck Island residents. If you share our values, we invite you to join our small team.</div>
      <div style="position:absolute;left:0;bottom:0;width:773px;height:340px;background:#234E70"></div>
      <div style="position:absolute;left:0;bottom:320px;width:773px;height:40px;background:#C9963F;transform:skewY(-3deg)"></div>
      <div style="position:absolute;left:40px;bottom:230px;color:#fff;font-size:30px;font-weight:700">Open Positions:</div>
      <div style="position:absolute;left:60px;bottom:130px;color:#fff;font-size:28px;line-height:44px">✔ Student Intern<br>✔ Program Officer</div>
      <div style="position:absolute;left:40px;bottom:40px;color:#fff;font-size:22px">Job descriptions are linked below this post.</div>
      <div style="position:absolute;right:40px;bottom:150px;color:#fff;font-size:22px;line-height:34px;text-align:right">Email: info@example.org</div>
    </div>`,
  },
  {
    path: up(2024, '06', '6.13.24-deadline-change-flyer.png'), w: 794, h: 1123,
    html: `<div style="width:794px;height:1123px;background:repeating-conic-gradient(from 0deg at 50% 30%,#E9C46A 0 10deg,#F1D38A 10deg 20deg);${F}position:relative;color:#1f2d3a">
      <div style="position:absolute;left:60px;right:60px;top:150px;height:150px;border:8px solid #1f2d3a;border-radius:40px;background:#fff;display:flex;align-items:center;justify-content:center;${SLAB}font-weight:700;font-size:96px;letter-spacing:6px">NOTICE</div>
      <div style="position:absolute;left:0;right:0;top:340px;text-align:center;font-size:44px;font-weight:700">Grant Deadlines Are Changing</div>
      <div style="position:absolute;left:30px;right:30px;top:430px;bottom:150px;background:#fff;border-radius:36px;padding:50px 40px;box-sizing:border-box;text-align:center;font-size:26px;line-height:38px">
        The Ferrowick Foundation Board has approved its review calendar for the coming fiscal year. We will continue to review applications four times a year, <b>but the deadlines are earlier than in past years</b> so that staff have more time to work with each applicant.<br><br>
        Completed applications are due:<br><br>
        <b>Friday, August 9, 2024 for our October Board review<br>Friday, December 6, 2024 for our February Board review<br>Friday, March 7, 2025 for our May Board review<br>Friday, May 9, 2025 for our July Board review</b>
      </div>
      <div style="position:absolute;left:0;right:0;bottom:60px;text-align:center;font-size:24px">Questions? Contact Foundation staff at info@example.org</div>
    </div>`,
  },
  {
    path: up(2023, 11, 'Atherly-Fellowship-FLYER-FINAL.jpg'), w: 800, h: 916, type: 'jpeg',
    html: `<div style="width:800px;height:916px;background:#F4F1EA;${F}position:relative;overflow:hidden;color:#1f2d3a">
      <div style="position:absolute;left:0;top:0;width:800px;height:520px;background:#234E70;border-bottom-right-radius:400px 120px"></div>
      <div style="position:absolute;left:40px;top:36px">${logoBlock('#fff')}</div>
      <div style="position:absolute;right:40px;top:40px;width:520px;text-align:right;${SLAB}color:#F3D28C;font-size:58px;line-height:62px">Rosalind Atherly Fellowship in Social Work</div>
      <div style="position:absolute;left:40px;top:250px;width:220px;height:220px;border-radius:50%;background:#F3D28C;display:flex;align-items:center;justify-content:center;text-align:center;font-weight:700;font-size:26px;line-height:32px">NEXT COHORT<br>BEGINS<br>FALL 2024!</div>
      <div style="position:absolute;right:40px;top:270px;width:440px;text-align:right;color:#fff;font-size:26px;line-height:36px">Fellows receive support to further their education and career. To learn more and apply, use the link below this post.</div>
      <div style="position:absolute;left:40px;top:560px;width:720px;font-size:26px;line-height:36px">Aquidneck Island residents who are social work students are invited to a virtual information session:</div>
      <div style="position:absolute;left:40px;top:680px;display:flex;gap:40px">
        <div style="background:#fff;border-radius:20px;padding:20px 30px;display:flex;gap:20px;align-items:center"><div style="text-align:center;font-weight:700;font-size:44px;line-height:44px">14<br><span style="font-size:24px">NOV</span></div><div style="font-size:28px;font-weight:700">@ 6:00 PM</div>${qr(31, 90)}</div>
        <div style="background:#fff;border-radius:20px;padding:20px 30px;display:flex;gap:20px;align-items:center"><div style="text-align:center;font-weight:700;font-size:44px;line-height:44px">16<br><span style="font-size:24px">NOV</span></div><div style="font-size:28px;font-weight:700">@ 12:00 PM</div>${qr(59, 90)}</div>
      </div></div>`,
  },
];

// Small "logo" images for board-meeting posts (fictional grantees).
const grantLogo = (file, name, color, shape) => ({
  path: up(2023, '07', file), w: 225, h: 225, type: 'jpeg',
  html: `<div style="width:225px;height:225px;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;${F}">
    <svg width="110" height="90" viewBox="0 0 110 90">${shape(color)}</svg>
    <div style="${SLAB}font-size:20px;line-height:22px;text-align:center;color:${color};margin-top:8px;padding:0 10px">${name}</div></div>`,
});
const wave = (c) => `<path d="M5 60 Q30 30 55 60 T105 60" stroke="${c}" stroke-width="8" fill="none"/><circle cx="55" cy="25" r="16" fill="${c}"/>`;
const leaf = (c) => `<path d="M55 85 C10 60 20 10 55 5 C90 10 100 60 55 85Z" fill="${c}"/><path d="M55 85 L55 20" stroke="#fff" stroke-width="4"/>`;
const book = (c) => `<path d="M10 20 L55 30 L100 20 L100 80 L55 90 L10 80Z" fill="${c}"/><path d="M55 30 L55 90" stroke="#fff" stroke-width="4"/>`;
const star = (c) => `<path d="M55 5 L67 38 L102 38 L74 58 L84 88 L55 70 L26 88 L36 58 L8 38 L43 38Z" fill="${c}"/>`;
flyers.push(
  grantLogo('NEPN-Logo-R.jpg', 'North End Neighbors Pantry Network', '#2F8A8A', leaf),
  grantLogo('RTA-Logo-R.jpg', 'Read Together Aquidneck', '#234E70', book),
  grantLogo('APW-Logo-R.jpg', 'Aquidneck Partnership for Wellness', '#3E7D4F', wave),
  grantLogo('LWAC-Logo-R.jpg', 'Lantern Wharf Arts Center', '#B8483A', star),
  grantLogo('HLFRC-Logo-R.jpg', 'Harbor Light Family Resource Center', '#C9963F', wave),
);

// ---------- helpers to render meeting results ----------
export function meetingHtml(m, lead = 'approved grants to organizations seeking the following results:') {
  let h = `<p>At the ${m.date} Board Meeting, the Directors of The Ferrowick Foundation ${lead}</p>`;
  for (const s of m.sections) {
    h += `<h3>${s.area}</h3>`;
    for (const g of s.groups) {
      h += `<p class="outcome"><strong>${g.outcome}</strong></p>`;
      for (const x of g.grants) h += `<p><em>${x.org}</em>: ${x.amount} – ${x.purpose[0].toUpperCase() + x.purpose.slice(1)}.</p>`;
    }
  }
  return h;
}

const roz = memoriam.find((m) => m.slug === 'rosalind-roz-atherly');
const rq = staff[0];

const meetingPost = (slug, title, date, image, author = 'Denise Holloway') => ({
  slug: `${slug}-board-meeting-results`, title, date, author, categories: ['Board Meetings', 'News'], image,
  html: meetingHtml(archivedMeetings[slug]),
});

export const posts = [
  {
    slug: 'keystone-forum', title: 'The Keystone Forum', date: '2025-04-23', author: 'Foundation', categories: ['News'],
    image: up(2025, '04', 'Keystone-Forum-Flyer.png'),
    html: `<p>To help applicants plan new fundraising strategies, the Foundation will host a half-day forum on <strong>Friday, May 2nd, from 9:00 am – 12:30 pm in the Community Room at Lantern Wharf Commons</strong>. Only organizations that meet the eligibility requirements may apply for matching funds, but representatives of any island nonprofit are welcome to attend, space permitting.</p>
<p>For <strong>eligibility details</strong>, please see our <a href="/keystone-matching-program/">previous post</a>.</p>
<p>To <strong>RSVP</strong> for The Keystone Forum, scan the QR code on the flyer or register through <a href="/forms/keystone-forum-rsvp/">this link</a>. Space is limited, so please register as soon as possible.</p>
<p>Questions about the Keystone Matching Grant Program may be directed to <strong>Tobias Mendel-Ayers, Special Projects Manager</strong>, at <a href="mailto:tmendel-ayers@example.org">tmendel-ayers@example.org</a></p>`,
  },
  {
    slug: 'keystone-matching-program', title: 'The Keystone Matching Grant Program Guidelines', date: '2025-04-23', modified: '2025-06-09', author: 'Foundation', categories: ['News'],
    image: up(2025, '04', 'keystone-logo.jpg'),
    html: `<p>We have been delighted by the response to our announcement of the <strong>Keystone Matching Grant Program</strong>. Our hope is that this incentive will encourage island grantees to take stock of the relationships and resources around them and try a fundraising approach that is new to them, strengthening their long-term sustainability. Many organizations have already begun applications, and we expect a competitive pool.</p>
<p>Below are the <strong>UPDATED</strong> program guidelines. The updates clarify the Foundation’s interest in new fundraising strategies and respond to questions we have heard from applicants. Working with the Board members who serve as the program’s Advisory Committee, we have added answers to:</p>
<ul><li>Is there a limit on how much the Foundation will match for a single applicant?</li><li>What counts as “new money”?</li><li>When can an applicant begin raising funds that will qualify for a match?</li></ul>
<p>Please read the guidelines carefully. They will guide your proposal and will be used by the Foundation to evaluate submissions. Please share them with everyone in your organization who is helping prepare your proposal.</p>
<p><strong>Reminder: The application deadline is Friday, July 25.</strong></p>
<p>Let us know if you would like to schedule a time to talk through your proposal ideas.</p>
<p><img src="${up(2025, '04', 'keystone-logo.jpg')}" alt="" width="300" height="127"></p>
<p><strong>PROGRAM GUIDELINES</strong></p>
<p><em>Updated June 9, 2025</em><br><em>Replaces all earlier versions</em></p>
<p><strong>PROGRAM GOALS</strong>: Island nonprofits deliver essential services, yet few have the time, staff or flexible funding to invest in their own fundraising infrastructure. This year the Foundation is offering an incentive for island grantees to mobilize the people around them—board members, staff, volunteers, donors and participants—to try new ways of raising money, with Foundation dollars matching what they raise as unrestricted operating support. The program’s purpose is to help organizations build lasting fundraising capacity by trying something they have not tried before.</p>
<p><strong>ELIGIBILITY TO APPLY</strong>: To be eligible, a nonprofit organization must:</p>
<ul><li>be recognized by the Internal Revenue Service as a 501(c)(3) organization</li><li>be based on Aquidneck Island</li><li>have received a Ferrowick Foundation grant of $7,500 or more during the last four years and satisfactorily completed all grant requirements</li><li>have an active Board of Directors whose members will each make a personal financial contribution to the organization during the current fiscal year.</li></ul>
<p>Applicants may hold a current Foundation grant. This program is an additional resource, not a substitute for regular grants.</p>
<p><strong>WHAT MAY BE MATCHED</strong>: The Foundation will match funds raised from non-governmental sources that are new to the organization, or that represent an increase from an existing source when the increase results from a new strategy. Examples include:</p>
<ul><li>Strategies that increase the number and size of employer matching gifts</li><li>New foundation or corporate grants, especially those secured through a board member’s or supporter’s relationship</li><li>Revenue from new membership campaigns, particularly those in which current members recruit new members</li><li>Giving campaigns, beyond regular membership dues, annual appeals or board giving, that take a new approach</li><li>Revenue from new crowdfunding, social media or website strategies</li></ul>
<p>Other strategies will be considered as part of the fundraising plan in the application. A committee of Foundation Board members will work with staff to answer questions not covered by these guidelines. The members of the Keystone Matching Grant Program Advisory Committee are: Margaret Halloran Price, Desmond T. Okafor, Corinne B. Ashby, and Walter J. Pemberton, Jr.</p>
<p><strong>WHAT DO WE MEAN BY “NEW MONEY?”</strong>: We are asking grantees to stretch by trying a strategy they have not used before. That can be an entirely new activity or a new twist on an existing one—for example, adding a monthly giving option to a year-end appeal, adding a live auction to an annual dinner, offering an incentive in a membership drive, or mailing to a neighborhood or community you have not asked before. Previous donors qualify for a match when their gift responds to a new strategy.</p>
<p><strong>REQUEST LIMITATION</strong>: The Keystone Matching Grant Program will match new funds on a 2:1 basis for up to the first $200,000 raised. For example, if an approved organization raises $10,000, the Foundation will provide $20,000. If an organization is approved to raise $200,000 in new money, the Foundation’s match would total $400,000. Organizations may raise more, but the Foundation match is limited to the first $200,000 raised. We encourage applicants to set goals that are ambitious but realistic. The Foundation may approve less than the amount requested; the number of awards will depend on the number of applications, the amounts requested and the quality of the proposals.</p>
<p><strong>PROGRAM TIMELINE</strong>:</p>
<ul><li>April 2025 – Applications released</li><li>July 25, 2025 – Application deadline</li><li>October 7, 2025 – Awards announced</li><li>October 2025 – June 30, 2026 – Grantees submit documentation of matching funds</li></ul>
<p>Applications are due July 25. Matching funds must be raised after the Foundation Board approves the application. The Foundation will accept documentation of matching funds through June 30, 2026.</p>
<p><strong>PROGRAM SPECIFICS</strong>:</p>
<p>Applications will include an estimate of the amount the organization plans to raise for the Foundation to match.</p>
<p>Applications should include a detailed fundraising plan that describes:</p>
<ul><li>a timeline</li><li>the strategy and the source of new funds</li><li>the people and partners involved</li><li>and the estimated cost of raising the funds</li></ul>
<p>The Foundation will not match the value of in-kind donations.</p>
<p>To receive matching funds, grantees must submit evidence of new funds raised, such as:</p>
<ul><li>copies of checks with a note from the donor</li><li>an award letter from a funder</li><li>ACH payment receipts that reference the match</li><li>or other documentation approved by the Foundation</li></ul>
<p>Matching funds may be requested in a single payment or in monthly installments.</p>
<p>Keystone grantees will be required to submit a final report.</p>
<p>Funds raised may be used for general operating support or for any program the grantee chooses.</p>
<p>As always, please contact us with questions. Questions about the Keystone Matching Grant Program may be directed to <strong>Tobias Mendel-Ayers, Special Projects Manager</strong>, at <a href="mailto:tmendel-ayers@example.org">tmendel-ayers@example.org</a>.</p>`,
  },
  {
    slug: 'the-ferrowick-foundation-fellowship-application-is-available', title: 'The Ferrowick Foundation Fellowship Application Is Available', date: '2024-09-12', author: 'Foundation', categories: ['News'],
    image: up(2024, '09', 'Fellowship-applications-open-thumb.jpg'), noFeatured: true,
    html: `<p><img src="${up(2024, '09', 'Atherly-Fellowship-2025-flyer-791x1024.png')}" alt="" width="791" height="1024"></p>`,
  },
  {
    slug: 'come-join-us-were-hiring', title: 'Come Join Us- We’re Hiring!', date: '2024-09-09', author: 'Foundation', categories: ['Uncategorized'],
    image: up(2024, '09', 'Now-Hiring-1.png'),
    html: `<p>&nbsp;</p><p><a href="${up(2024, '09', '2024-Intern-description_.pdf')}">2024 Intern Description</a></p><p><a href="${up(2024, '09', 'PO-Job-description.pdf')}">Program</a> Officer Description</p>`,
    excerpt: '2024 Intern Description Program Officer Description',
  },
  {
    slug: 'http-ferrowickfoundation-org-wp-content-uploads-2024-06-deadline-change-flyer-png-2', title: 'Deadline Changes for Applicants', date: '2024-06-13', author: 'Foundation', categories: ['News'],
    image: up(2024, '06', '6.13.24-deadline-change-flyer.png'), html: '',
  },
  {
    slug: 'rosalind-atherly-fellowship-in-social-work', title: 'Rosalind Atherly Fellowship in Social Work', date: '2023-11-08', author: 'admin', categories: ['News'],
    image: up(2023, 11, 'Atherly-Fellowship-FLYER-FINAL.jpg'),
    html: `<div class="btn-row"><a class="button" href="/forms/fellowship-interest-2024/">Learn more and apply</a></div>`,
    excerpt: 'Learn more and apply',
  },
  meetingPost('october-17-2023', 'October 17, 2023 Board Meeting Results', '2023-11-02', up(2023, '07', 'HLFRC-Logo-R.jpg')),
  meetingPost('july-25-2023', 'July 25, 2023 Board Meeting Results', '2023-08-08', up(2023, '07', 'NEPN-Logo-R.jpg')),
  meetingPost('may-23-2023', 'May 23, 2023 Board Meeting Results', '2023-06-06', up(2023, '07', 'RTA-Logo-R.jpg')),
  meetingPost('february-28-2023', 'February 28, 2023 Board Meeting Results', '2023-03-14', up(2023, '07', 'APW-Logo-R.jpg')),
  meetingPost('october-11-2022', 'October 11, 2022 Board Meeting Results', '2022-12-13', up(2023, '07', 'LWAC-Logo-R.jpg')),
  meetingPost('july-19-2022', 'July 19, 2022 Board Meeting Results', '2022-09-01', up(2022, '01', 'learning-center-opening.jpg')),
  meetingPost('may-17-2022', 'May 17, 2022 Board Meeting Results', '2022-06-21', up(2022, '03', 'pantry-day-635.jpg')),
  {
    slug: 'fellowship-to-honor-roz-atherly', title: 'Fellowship To Honor Roz Atherly', date: '2022-03-18', author: 'admin', categories: ['News'],
    image: roz.photo,
    html: `<p>The Board of Directors of the Ferrowick Foundation has established the Rosalind Atherly Fellowship in Social Work to honor the Foundation’s first executive director, who began her career as a social worker and never stopped thinking like one.</p><p>The Fellowship will support social work students from Aquidneck Island who complete their field placements at island nonprofits. The first cohort of Fellows will begin in the fall. More information is available on the <a href="/fellowship/">Fellowship</a> page.</p>`,
  },
  {
    slug: 'rosemary-quintal-is-appointed-executive-director', title: 'Rosemary Quintal is appointed Executive Director', date: '2022-03-18', author: 'admin', categories: ['News'],
    image: rq.large,
    html: `<p>The Board of Directors of the Ferrowick Foundation is pleased to announce the appointment of Rosemary Quintal as Executive Director. Rosemary joined the Foundation as Program Officer in 2008 and has served as Acting Executive Director since early 2021.</p><p>“Rosemary knows our grantees and our community as well as anyone,” said Board Chair Margaret Halloran Price. “We are confident she will carry the Foundation’s work forward with the same care Roz Atherly brought to it for twenty years.”</p>`,
  },
  meetingPost('october-19-2021', 'October 19, 2021 Board Meeting Results', '2022-01-28', up(2022, '03', 'story-circle-635.jpg')),
  meetingPost('july-20-2021', 'July 20, 2021 Board Meeting Results', '2022-01-28', up(2022, '03', 'youth-council-635.jpg')),
  {
    slug: 'in-memoriam-rosalind-a-roz-atherly', title: 'IN MEMORIAM: ROSALIND A. “ROZ” ATHERLY', date: '2021-02-16', author: 'admin', categories: ['News'],
    image: roz.photo,
    html: `<p>It is with great sadness that the Ferrowick Foundation shares the news of the passing of Rosalind “Roz” Atherly, the Foundation’s first executive director, who led our work from 2000 to 2020.</p><p>Roz brought a social worker’s eye to philanthropy. She insisted that the Foundation listen first, measure what matters, and stay close to the people our grants are meant to serve. Her legacy lives on in the many organizations she helped to grow.</p><p>Read more on our <a href="/in-memoriam/rosalind-roz-atherly/">In Memoriam</a> page.</p>`,
  },
];
