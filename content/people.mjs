// Fictional board, staff and memorial profiles. All names and biographies are invented.
// `bio: null` intentionally mirrors reference profiles that show no biography.

const img = (y, m, f) => `/wp-content/uploads/${y}/${m}/${f}`;

export const board = [
  { slug: 'margaret-halloran-price', name: 'Margaret Halloran Price', role: 'Chair', photo: img(2022, '01', 'margaret-rec.jpg'), large: img(2021, 11, 'margaret-price.jpg'), seed: 201, opts: { hairStyle: 2 }, bio: null },
  {
    slug: 'desmond-t-okafor', name: 'Desmond T. Okafor', role: 'Vice Chair', photo: img(2022, '01', 'desmond-rec.jpg'), large: img(2021, 11, 'desmond-o.jpg'), seed: 202, opts: { hairStyle: 4, glasses: true },
    bio: [
      'Desmond T. Okafor is the managing principal of Okafor & Lisle Planning Group, a firm that advises municipalities across southern New England on waterfront redevelopment and housing policy. He previously served for nine years on the Middletown Planning Board, including four as its chair.',
      'A graduate of the University of Rhode Island and the Heller School at Brandeis University, Mr. Okafor joined the Ferrowick Foundation Board in 2011. He chairs the Board’s Grants Committee and serves as an advisor to the Keystone Matching Grant Program.',
    ],
  },
  {
    slug: 'ines-albuquerque-ward-ph-d', name: 'Inês Albuquerque-Ward, Ph.D', role: 'Secretary', photo: img(2022, '01', 'ines-rec.jpg'), large: img(2021, 11, 'ines-aw.jpg'), seed: 203, opts: { hairStyle: 3, glasses: true },
    bio: [
      'Dr. Inês Albuquerque-Ward is a developmental psychologist and the former director of research at a regional early-childhood network. Her work has focused on kindergarten readiness among children in multilingual households.',
      'She joined the Board in 2014 and serves on the Education and Evaluation committees.',
    ],
  },
  { slug: 'theodore-r-lindqvist', name: 'Theodore R. Lindqvist', role: 'Treasurer', photo: img(2022, '01', 'theodore-rec.jpg'), large: img(2021, 11, 'theodore-l.jpg'), seed: 204, opts: { hairStyle: 0 }, bio: null },
  {
    slug: 'nadia-farrow-castellanos', name: 'Nadia Farrow Castellanos', role: 'Board Member', photo: img(2022, '01', 'nadia-rec.jpg'), large: img(2021, 11, 'nadia-fc.jpg'), seed: 205, opts: { hairStyle: 1 },
    bio: [
      'Nadia Farrow Castellanos is a retired public-school principal who led two Newport elementary schools over a 28-year career. She is a past president of the Aquidneck Island Reading Council and continues to volunteer as a literacy tutor.',
    ],
  },
  { slug: 'corinne-b-ashby', name: 'Corinne B. Ashby', role: 'Board Member', photo: img(2022, '01', 'corinne-rec.jpg'), large: img(2021, 11, 'corinne-a.jpg'), seed: 206, opts: { hairStyle: 2 }, bio: null },
  {
    slug: 'walter-j-pemberton-jr', name: 'Walter J. Pemberton, Jr.', role: 'Board Member', photo: img(2022, '01', 'walter-rec.jpg'), large: img(2021, 11, 'walter-p.jpg'), seed: 207, opts: { hairStyle: 0, glasses: true },
    bio: [
      'Walter J. Pemberton, Jr. is a former executive vice president of Ferrowick Savings & Trust and was among the bank officers who helped establish the Foundation in 1999. He has served on the boards of several island health and human service organizations.',
    ],
  },
  {
    slug: 'gloria-n-achebe-reyes', name: 'Gloria N. Achebe-Reyes', role: 'Board Member', photo: img(2022, '01', 'gloria-rec.jpg'), large: img(2021, 11, 'gloria-ar.jpg'), seed: 208, opts: { hairStyle: 3 },
    bio: [
      'Gloria N. Achebe-Reyes is a nurse practitioner and the founder of a mobile wellness program that brings preventive screenings to senior housing sites in Newport County. She joined the Board in 2020.',
    ],
  },
];

export const staff = [
  {
    slug: 'rosemary-quintal', name: 'Rosemary Quintal', role: 'Executive Director', email: 'rquintal@example.org', photo: img(2022, '01', 'rosemary-rec.jpg'), large: img(2021, 11, 'rosemary-quintal.jpg'), seed: 301, opts: { hairStyle: 2 },
    bio: [
      'Rosemary Quintal joined the Ferrowick Foundation as Program Officer in 2008 and was appointed Executive Director in 2022. Before joining the Foundation she led the Aquidneck Island Arts Alliance, where she launched a folk-arts documentation project and a small-grants program for neighborhood cultural groups.',
      'She serves on the advisory committee of a statewide arts-education coalition and holds a law degree from Roger Williams University.',
    ],
  },
  {
    slug: 'tobias-mendel-ayers', name: 'Tobias Mendel-Ayers', role: 'Special Projects Manager', email: 'tmendel-ayers@example.org', photo: img(2022, '08', 'tobias.jpg'), large: img(2022, '08', 'tobias-mendel-ayers-298x300.jpg'), seed: 302, opts: { hairStyle: 4, glasses: true },
    bio: [
      'Tobias Mendel-Ayers is the Special Projects Manager for the Ferrowick Foundation. His work centers on Foundation initiatives including the Keystone Matching Grant Program and the Rosalind Atherly Fellowship in Social Work.',
      'An Aquidneck Island native, Tobias holds a bachelor’s degree from Salve Regina University and a master’s degree in public administration.',
    ],
  },
  {
    slug: 'priya-raman', name: 'Priya Raman', role: 'Program Officer', email: 'praman@example.org', photo: img(2025, '04', 'priya-raman-256x300.jpg'), large: img(2025, '04', 'priya-raman-298x300.jpg'), seed: 303, opts: { hairStyle: 2 },
    bio: [
      'Priya Raman joined the Foundation in 2025 as Program Officer. She works with applicants in all four Focus Areas and coordinates site visits and grant reporting.',
    ],
  },
  {
    slug: 'denise-holloway', name: 'Denise Holloway', role: 'Office Manager', email: 'dholloway@example.org', photo: img(2023, 12, 'denise-200.jpg'), large: img(2023, 12, 'denise-holloway-298x300.jpg'), seed: 304, opts: { hairStyle: 3 },
    bio: [
      'Denise Holloway manages the Foundation’s office operations, board meeting logistics and grant portal user accounts.',
    ],
  },
  {
    slug: 'elliot-szabo', name: 'Elliot Szabo', role: 'Special Projects Assistant', email: 'eszabo@example.org', photo: img(2025, '04', 'Untitled-design-elliot.png'.replace('.png','.jpg')), large: img(2025, '04', 'elliot-szabo-298x300.jpg'), seed: 305, opts: { hairStyle: 1, glasses: true },
    bio: [
      'Elliot Szabo supports the Foundation’s special projects, including fellowship programming and convenings for nonprofit partners.',
    ],
  },
];

export const memoriam = [
  {
    slug: 'cornelius-a-brightman', name: 'Cornelius A. Brightman', role: 'Founding Chairman 1999-2010', photo: img(2022, '01', 'cornelius-brightman.jpg'), seed: 401, opts: { hairStyle: 0 },
    bio: [
      'Cornelius A. Brightman was the founding Chairman and President of the Ferrowick Foundation. A lifelong Portsmouth resident, he spent nearly four decades at Ferrowick Savings & Trust, rising from teller to chief executive officer.',
      'He began his banking career in 1966 after graduating from Providence College, and he led the bank through its conversion in 1999, when the Foundation was created with a gift of the bank’s stock.',
    ],
    more: 'After retiring from the bank in 2007, Mr. Brightman continued as Chairman of the Foundation and served on the boards of a local hospital and a maritime museum. He passed away in 2010 at the age of 68.',
    externalSlug: 'cornelius-a-brightman-banker-and-civic-leader',
  },
  {
    slug: 'harold-hal-venner', name: 'Harold “Hal” Venner', role: 'Founding Board Member 1999-2018 Chairman 2010-2018', photo: img(2022, '01', 'harold-venner.jpg'), seed: 402, opts: { hairStyle: 4, glasses: true },
    bio: [
      'Harold “Hal” Venner was a founding member of the Foundation’s Board and succeeded Cornelius Brightman as Chairman in 2010.',
      'An attorney by training, he guided the Foundation’s shift toward results-based grantmaking.',
    ],
    more: 'Mr. Venner practiced law in Newport for more than forty years and was a familiar presence at island youth sporting events, which he sponsored generously. He died in 2018.',
    externalSlug: 'harold-venner-attorney-philanthropist',
  },
  {
    slug: 'lucille-marchetti', name: 'Lucille Marchetti', role: 'Founding Board Member 1999-2017', photo: img(2022, '01', 'lucille-marchetti-clear.jpg'), seed: 403, opts: { hairStyle: 2 },
    bio: [
      'Lucille Marchetti served on the Foundation’s Board from its founding until 2017. A former school nurse, she championed the Foundation’s early investments in children’s health.',
    ],
    more: 'Mrs. Marchetti was active in her parish and in the island’s garden clubs. She died in 2017.',
    externalSlug: 'lucille-marchetti-school-nurse-volunteer',
  },
  {
    slug: 'rosalind-roz-atherly', name: 'Rosalind “Roz” Atherly', role: 'Executive Director 2000-2020', photo: img(2022, '01', 'rosalind-atherly2.jpg'), seed: 404, opts: { hairStyle: 3, glasses: true },
    bio: [
      'Roz Atherly served as the first executive director of the Ferrowick Foundation for twenty years. She oversaw the Foundation’s annual grantmaking and built many of the partnerships that continue to shape its work.',
    ],
    more: 'Trained as a social worker, she began her career at a senior-services agency in Newport. She passed away in 2021 at the age of 70. The Foundation’s Fellowship in Social Work is named in her honor.',
    externalSlug: 'rosalind-atherly-championed-island-nonprofits',
  },
];

// Fellowship background portrait
export const fellowshipPortrait = { path: img(2022, '01', 'roz-atherly-mem.jpg'), w: 308, h: 400, seed: 404, opts: { hairStyle: 3, glasses: true } };
