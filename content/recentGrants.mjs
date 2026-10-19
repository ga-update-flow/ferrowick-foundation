// Fictional grant awards by board meeting. Organizations are invented; any resemblance to real
// organizations is unintended. The generator is seeded so builds are reproducible.

const ORGS = {
  'Community Services': {
    outcomes: [
      'Increases in the number of island residents getting and keeping jobs that meet their employment goals',
      'Increases in the number of individuals and families experiencing poverty that get their basic needs met (food, clothing, shelter) and connect to other needed resources',
      'Increases in the number of residents, particularly youth, that demonstrate leadership in the community, at home, school, or in the workplace',
      'Increases in the availability of social services to stabilize the lives of at-risk individuals and families',
      'Improvements in community service organizations’ effectiveness and efficiency that lead to improved results for those they serve',
    ],
    orgs: [
      ['Lantern Wharf Workforce Collaborative', ['to provide tuition-free marine trades training for island residents', 'to support a job coach for adults re-entering the workforce']],
      ['North End Neighbors Pantry Network', ['to expand weekend pantry hours for families experiencing food insecurity', 'to purchase a refrigerated van for fresh-food rescue']],
      ['Saltbox Tenant Advocacy Project', ['to support eviction-prevention outreach to older adults', 'to fund a bilingual housing navigator']],
      ['Two Bridges Youth Leadership Corps', ['“Island Voices” civic leadership program for high school students', 'to support youth-led neighborhood improvement projects']],
      ['Harbor Light Family Resource Center', ['to stabilize the adult day respite program', 'to engage and retain parents in home-visiting services']],
      ['Bayside Domestic Peace Alliance', ['to support a court advocate serving island survivors', 'to expand emergency shelter capacity during winter months']],
      ['Aquidneck Nonprofit Commons', ['to engage a consultant for shared financial management services', 'technical assistance and operating expenses']],
      ['Wickford Street Mutual Aid Society', ['to engage a board development and communications consultant', 'to purchase a donor management system']],
      ['Island Warming Fund', ['to support emergency heating assistance for households with low incomes', 'to support a fundraising consultant and outreach materials']],
      ['St. Brendan’s Community Kitchen', ['to expand the free community supper program', 'kitchen equipment for the hot-meals program']],
      ['Coastal Re-Entry Partners', ['to support peer mentors for adults returning from incarceration', 'to support a resource coordinator']],
      ['Middletown Senior Circle', ['to expand transportation for older adults to medical appointments', 'to purchase software to manage volunteer drivers']],
    ],
  },
  Education: {
    outcomes: [
      'Increase number of parents who are actively involved in supporting their child’s educational success',
      'To increase the number of pre-K children meeting their developmental milestones',
      'To increase the number of students K-12 that are improving their academic achievement to at or above grade level',
      'Increase number of adult English learners who develop English proficiency to meet educational/career needs',
      'Increases in the number of youth that obtain a high school diploma, HSE or vocational credential',
    ],
    orgs: [
      ['Read Together Aquidneck', ['to support the family literacy coaching model', 'to provide books and reading coaches in pediatric offices']],
      ['Newport Island Public Library Foundation', ['funding will support the “Little Readers” program', 'to support bilingual story times at branch libraries']],
      ['Tidewater Charter Academy', ['funding will provide professional development in structured literacy', 'to support a math intervention specialist']],
      ['Aquidneck Regional School Collaborative', ['to provide professional development and materials for 70 teachers', 'to support a summer literacy institute for K–3 teachers']],
      ['Harborside Theatre Workshop', ['support for teaching artist fees in the literacy-through-drama residency', 'to support professional development for classroom teachers']],
      ['Coggeshall Elementary PTO', ['training and coaching to improve students’ math proficiency', 'to support a family math night series']],
      ['Island Learning Partnership', ['to coordinate North End literacy partners and shared data', 'to support the after-school tutoring corps']],
      ['Open Door Adult Learning Center', ['English for speakers of other languages and civics classes', 'to support a workplace English program for hospitality workers']],
      ['Cape Verdean Cultural Society of Newport County', ['to purchase equipment and materials for an English language program', 'to support a homework help program']],
      ['First Light Early Learning', ['to support developmental screenings for preschool children', 'to support coaching for family child care providers']],
      ['Second Chance Diploma Project', ['to support high school equivalency preparation for young adults', 'to support a career navigator']],
      ['Bridge to College Aquidneck', ['to support college-access advising for first-generation students', 'to support a summer bridge program']],
    ],
  },
  Health: {
    outcomes: [
      'Increases of those at risk for health problems that connect to needed health services',
      'Increases in the number of residents that increase their exercise and/or improve their diet',
      'Increases in available health services for the least advantaged, including mental health services',
      'Increases in the number of residents, particularly youth, that abstain from substance use',
    ],
    orgs: [
      ['Island Community Health Workers', ['for a benefits outreach navigator to help residents understand changing coverage rules', 'to support a community health worker at the North End family center']],
      ['Aquidneck Partnership for Wellness', ['to support community researchers who collect neighborhood health data', 'to support the youth prevention coalition']],
      ['Unified Sports Rhode Island Coast', ['funding to strengthen and expand island programming', 'to support adaptive swim lessons']],
      ['Bayview Senior Fitness Collective', ['to support chair yoga for veterans and older adults', 'to support walking clubs in senior housing']],
      ['Newport County Recovery Network', ['to support recovery coaches in the emergency department', 'to support family support groups']],
      ['Seaside Mobile Wellness', ['to provide preventive screenings at senior housing sites', 'to purchase a portable dental unit']],
      ['Green Acre School Gardens', ['to support garden-based nutrition lessons in three elementary schools', 'to support a summer youth farm crew']],
      ['Calm Harbor Counseling Center', ['to expand sliding-scale counseling for uninsured residents', 'to support a school-based clinician']],
    ],
  },
  'Arts & Culture': {
    outcomes: [
      'Improvements in effectiveness and efficiency of arts organizations that leads to their enhanced sustainability',
      'Increases in number of youth participating in sequential quality arts experiences',
      'Increases in the number of individuals participating in island art and culture offerings',
    ],
    orgs: [
      ['Aquidneck Ballet Ensemble', ['funding will support outreach, marketing and part-time communications staffing', 'to support a strategic planning consultant']],
      ['Lantern Wharf Arts Center', ['to support engagement of a symposium coordinator', 'to support free family studio days']],
      ['Friends of the Wanton-Hazard Cottage', ['to support the photographic storytelling program', 'to support a collections digitization project']],
      ['Narragansett Youth Orchestra', ['to support in-school string residencies for elementary schools', 'to support instrument lending for students']],
      ['Living History Mariners', ['to support maritime-history field studies for middle school students', 'to support interpreter training']],
      ['Island Folk Arts Project', ['to support documentation of island folk traditions', 'to support a community concert series']],
      ['Portsmouth Players Community Theatre', ['to support a teen summer theater intensive', 'to purchase accessible seating and assistive listening devices']],
      ['Second Story Gallery Collective', ['to support a shared ticketing and marketing platform', 'to support a fundraising consultant']],
    ],
  },
};

const AMOUNTS = [5000, 7500, 9999, 10000, 12500, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 50000, 50000, 75000, 100000];
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const fmt = (n) => '$' + n.toLocaleString('en-US');

function meeting(date, seed, order, sizes) {
  const r = rng(seed);
  const sections = order.map((area, i) => {
    const pool = ORGS[area];
    const outcomes = [...pool.outcomes].sort(() => r() - 0.5).slice(0, Math.min(sizes[i], pool.outcomes.length));
    const usedOrgs = new Set();
    return {
      area,
      groups: outcomes.map((outcome) => {
        const n = 1 + Math.floor(r() * 3);
        const grants = [];
        for (let k = 0; k < n; k++) {
          let o; let tries = 0;
          do { o = pool.orgs[Math.floor(r() * pool.orgs.length)]; tries++; } while (usedOrgs.has(o[0]) && tries < 20);
          usedOrgs.add(o[0]);
          const amt = AMOUNTS[Math.floor(r() * AMOUNTS.length)];
          const multi = r() < 0.06;
          grants.push({ org: o[0], amount: multi ? `${fmt(amt)} a year for 3 years` : fmt(amt), purpose: o[1][Math.floor(r() * o[1].length)] });
        }
        return { outcome, grants };
      }),
    };
  });
  return { date, sections };
}

const ORDERS = [
  ['Community Services', 'Education', 'Health', 'Arts & Culture'],
  ['Community Services', 'Health', 'Education', 'Arts & Culture'],
  ['Education', 'Community Services', 'Health', 'Arts & Culture'],
];

// Shown on /recent-grants/ (newest first)
export const recentMeetings = [
  ['October 6th, 2026', 2610], ['July 21st, 2026', 2607], ['May 19th, 2026', 2605], ['February 24th, 2026', 2602],
  ['October 7th, 2025', 2510], ['July 22nd, 2025', 2507], ['May 20th, 2025', 2505], ['February 25th, 2025', 2502],
  ['October 1st, 2024', 2410], ['July 23rd, 2024', 2407], ['May 21st, 2024', 2405], ['February 27th, 2024', 2402],
].map(([d, s], i) => meeting(d, s, ORDERS[i % 3], [4, 3, 2 + (i % 2), 2]));

// Older meetings published as individual news posts
export const archivedMeetings = {
  'october-17-2023': meeting('October 17th, 2023', 2310, ORDERS[0], [3, 2, 2, 1]),
  'july-25-2023': meeting('July 25th, 2023', 2307, ORDERS[1], [3, 2, 2, 2]),
  'may-23-2023': meeting('May 23rd, 2023', 2305, ORDERS[2], [2, 2, 1, 2]),
  'february-28-2023': meeting('February 28th, 2023', 2302, ORDERS[0], [2, 3, 1, 1]),
  'october-11-2022': meeting('October 11th, 2022', 2210, ORDERS[1], [3, 2, 2, 1]),
  'july-19-2022': meeting('July 19th, 2022', 2207, ORDERS[2], [2, 2, 2, 2]),
  'may-17-2022': meeting('May 17th, 2022', 2205, ORDERS[0], [3, 2, 1, 1]),
  'october-19-2021': meeting('October 19th, 2021', 2110, ORDERS[1], [2, 2, 2, 1]),
  'july-20-2021': meeting('July 20th, 2021', 2107, ORDERS[2], [2, 2, 1, 2]),
};
