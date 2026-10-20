// Grantmaking content: board cycle deadlines, focus areas, grant types and downloadable documents.
// Update deadlines here; Guidelines and Application Process pages both read from `cycles`.

export const boardMonths = 'February, May, July, and October';

// Like the reference, one listed cycle is already in the past at build time.
export const cycles = [
  { meeting: 'October 2026', due: 'August 7th' },
  { meeting: 'February 2027', due: 'December 4th' },
  { meeting: 'May 2027', due: 'March 5th' },
  { meeting: 'July 2027', due: 'May 14th' },
];

const up = (y, m, f) => `/wp-content/uploads/${y}/${m}/${f}`;

// Every downloadable file on the site. `kind` drives which generator builds it.
export const documents = {
  appProgramImpact: { title: 'Program Impact Application', href: up(2021, 10, 'Program-Impact-Application-2022.pdf'), kind: 'application-scanned', type: 'programImpact' },
  appOrgStrength: { title: 'Organizational Strength Application', href: up(2021, 10, 'Organizational-Strength-Application-Form-2022.pdf'), kind: 'application', type: 'orgStrength' },
  appFacilities: { title: 'Facilities & Equipment Application', href: up(2021, 10, 'Facilities-Equipment-Application-Form-2022.pdf'), kind: 'application', type: 'facilities' },
  appRapid: { title: 'Rapid Opportunity Application', href: up(2022, 11, 'Rapid-Opportunity.pdf'), kind: 'application', type: 'rapid' },
  appCollective: { title: 'Collective Impact Application', href: up(2021, '06', 'Collective-Impact-Application-FY2021.pdf'), kind: 'application', type: 'collective' },
  wsProgramImpact: { title: 'Program Impact Results Worksheet', href: up(2018, '05', 'Program-Impact-Results-Worksheet.doc'), kind: 'worksheet', type: 'programImpact' },
  wsOrgStrength: { title: 'Organizational Strength Results Worksheet', href: up(2018, '05', 'Organizational-Strength-Results-Worksheet.doc'), kind: 'worksheet', type: 'orgStrength' },
  wsFacilities: { title: 'Facilities & Equipment Results Worksheet', href: up(2018, '05', 'Facilities-Equipment-Results-Worksheet.doc'), kind: 'worksheet', type: 'facilities' },
  wbProgramImpact: { title: 'Program Impact Milestones Workbook', href: up(2018, '05', 'Program-Impact-Milestones-Wkbk.xls'), kind: 'workbook', type: 'programImpact' },
  wbOrgStrength: { title: 'Organizational Strength Milestones Workbook', href: up(2018, '05', 'Organizational-Strength-Milestones-Wkbk.xlsm'), kind: 'workbook', type: 'orgStrength' },
  wbFacilities: { title: 'Facilities & Equipment Milestones Workbook', href: up(2018, '05', 'Facilities-Equipment-Milestones-Wkbk.xls'), kind: 'workbook', type: 'facilities' },
  ciGuidance: { title: 'Collective Impact Proposal Guidance', href: up(2019, '02', 'FF-CI-Proposal-Guidance-with-attachments-021419.pdf'), kind: 'ci-guidance' },
  highlights: { title: 'Ferrowick Foundation Highlights 1999-2025', href: up(2025, '07', 'Ferrowick-Foundation-Highlights-1999-2025.pdf'), kind: 'highlights' },
  visionReport: { title: 'Vision for Aquidneck Island: Islanders Building Their Future', href: up(2019, '04', 'Vision_For_Aquidneck_Island_FinalReport.pdf'), kind: 'vision' },
  wellbeingReport: { title: 'The North End of Newport: Community-Driven Solutions for Child and Family Well-Being', href: up(2019, '09', 'North-End-Wellbeing-Study-2018.pdf'), kind: 'wellbeing' },
  internJob: { title: '2024 Intern Description', href: up(2024, '09', '2024-Intern-description_.pdf'), kind: 'job', type: 'intern' },
  poJob: { title: 'Program Officer Description', href: up(2024, '09', 'PO-Job-description.pdf'), kind: 'job', type: 'po' },
  fellowshipDeck: { title: 'Information Session Presentation', href: up(2025, 11, 'Atherly-Fellowship-Information-Session-2026.pdf'), kind: 'fellowship-deck' },
  fellowshipVideo: { title: 'Information Session Video', href: up(2025, 11, 'Atherly-Fellowship-Information-Session-2026.mp4'), kind: 'fellowship-video' },
};

export const biennialReports = [
  ['2020/2021', up(2024, '04', 'Download-2020-2021-Biennial-Report.pdf')],
  ['2018/2019', up(2021, 11, 'The-Ferrowick-Foundation-Biennial-Report.pdf')],
  ['2016/2017', up(2021, 11, 'ff_biennial_2016-17_web.pdf')],
  ['2014/2015', up(2021, 11, 'ff-2014-15-biennial_10-23-15.pdf')],
  ['2012/2013', up(2021, 11, '2012-2013-ff-biennial.pdf')],
  ['2010/2011', up(2021, 11, 'biennialreport2011.pdf')],
  ['2008/2009', up(2021, 11, 'biennialreport2009.pdf')],
  ['2006/2007', up(2021, 11, 'biennialreport2007.pdf')],
  ['2004/2005', up(2021, 11, 'biennialreport2005.pdf')],
  ['2002/2003', up(2021, 11, 'biennialreport2003.pdf')],
  ['2000/2001', up(2021, 11, 'biennialreport2001.pdf')],
].map(([period, href]) => ({ period, href }));

// Focus areas. `intro` is null where the reference page has no lead-in sentence before the targets.
export const focusAreas = [
  {
    slug: 'education', label: 'Education', heading: 'Education',
    hero: up(2022, '01', 'library-storytime.jpg'), heroMobile: up(2022, '01', 'library-storytime-mobile.jpg'),
    side: { src: up(2022, '01', 'classroom-learning.jpg'), w: 500, h: 652, cols: ['2_5', '3_5'] },
    circle: up(2021, 12, 'circle-reading.jpg'),
    body: [
      'The Ferrowick Foundation wants every young person on Aquidneck Island to leave school ready for the next step, whether that is college, a credential, or a first job. Strong reading skills come first. We also believe that a child’s sense of belonging and emotional well-being are inseparable from academic progress, and that learning does not stop at graduation: adults who return to the classroom strengthen their families and their neighborhoods.',
      'Over the last decade the Foundation has invested heavily in teachers. Grants have supported island-wide coaching for early-grade literacy, structured math discourse training for middle-school teams, and summer institutes where teachers from Newport, Middletown and Portsmouth plan together. We have also funded training in trauma-informed classroom practice and in culturally responsive teaching for school leaders.',
      'Community partners matter just as much. The Foundation has supported organizations that run after-school tutoring, mentoring and college-access programs, help multilingual families navigate school systems, and bring books into pediatric waiting rooms and laundromats. We also provide backbone funding to the North End Early Learning Partnership, a collective impact effort focused on children from birth to age eight in Newport’s North End.',
    ],
    intro: 'Grant applicants with an Education focus will identify one of the Foundation’s target outcomes below and develop an anticipated results statement which aligns with one of the following:',
    targets: [
      'More K–12 students reading and doing math at or above grade level.',
      'More children from birth to age five reaching age-appropriate developmental milestones.',
      'More parents and caregivers taking an active role in their children’s learning.',
      'More multilingual learners and students with disabilities making academic progress at the same pace as their classmates.',
      'More young people earning a high school diploma, high school equivalency, or industry-recognized credential.',
      'More students from low-income households enrolling in and completing college or post-secondary training.',
      'More adult learners reaching the level of English proficiency they need for work or further education.',
      'More young people leading projects at school or in the community while improving their academic performance.',
    ],
  },
  {
    slug: 'health', label: "Women's Health", heading: "Women's Health",
    hero: up(2021, 12, 'garden-harvest.jpg'), heroMobile: up(2021, 12, 'garden-harvest-mobile.jpg'),
    side: { src: up(2021, 12, 'market-produce.jpg'), w: 400, h: 622, cols: ['1_3', '2_3'] },
    circle: up(2021, 12, 'circle-garden.jpg'),
    body: [
      'Women’s physical and mental health shape every other outcome we care about. Island health indicators show persistent gaps for women in chronic disease, behavioral health and access to care between neighborhoods only a few miles apart, and seasonal employment leaves many women without consistent coverage. The Foundation pays close attention to the conditions outside the clinic—housing, food, transportation and isolation—that drive these differences.',
      'Our grants have helped residents recover from community-wide disruptions, from coastal storms to the COVID-19 pandemic, and have paid for community health workers who connect families to coverage and care. We have also funded nutrition education, school and community gardens, recovery supports, and free fitness programs for older adults. Much of our health grantmaking supports collaborative efforts in which hospitals, schools, faith communities and nonprofits work toward shared measures of progress.',
    ],
    intro: 'Grant applicants with a Women\'s Health focus will identify one of the Foundation’s target outcomes below and develop an anticipated results statement that aligns with one of the following:',
    targets: [
      'More women at risk of poor health outcomes connected to the care and coverage they need.',
      'More women increasing daily physical activity and/or eating a healthier diet.',
      'More women and girls choosing not to use alcohol, tobacco, vaping products or other substances.',
      'Greater availability of health and behavioral health services for women with the fewest resources.',
      'Stronger, more efficient community health organizations that deliver better results for the women they serve.',
    ],
  },
  {
    slug: 'community-services', label: 'Community Services', heading: 'Community Services',
    hero: up(2021, 12, 'pantry-volunteers.jpg'), heroMobile: up(2022, '01', 'pantry-volunteers-mobile.jpg'),
    side: { src: up(2022, '01', 'shoreline-crew.jpg'), w: 528, h: 632, cols: ['2_5', '3_5'] },
    circle: up(2021, 12, 'circle-volunteers.jpg'),
    body: [
      'Foundation grants have helped island nonprofits respond to emergencies, from winter heating crises to the economic fallout of the pandemic. We have supported work on housing stability, domestic violence prevention and child-abuse prevention, and we fund regional intermediaries that provide training and back-office support to small local organizations. A continuing priority is helping working families with low incomes meet basic needs while they build toward greater financial security, and helping young people find their voice as leaders in their neighborhoods.',
    ],
    intro: null,
    targets: [
      'Stronger, more efficient community service organizations that achieve better results for the people they serve.',
      'Greater availability and use of social services that stabilize the lives of individuals and families in crisis.',
      'More individuals and families living in poverty meeting basic needs for food, clothing and shelter and connecting to other resources.',
      'More residents, especially young people, demonstrating leadership in their community, at home, at school or at work.',
    ],
  },
  {
    slug: 'arts-culture', label: 'Arts & Culture', heading: 'Arts and Culture',
    hero: up(2022, '01', 'painter-closeup.jpg'), heroMobile: up(2022, '01', 'painter-closeup-mobile.jpg'),
    side: { src: up(2022, '01', 'studio-class.jpg'), w: 600, h: 462, cols: ['1_2', '1_2'] },
    circle: up(2022, '01', 'circle-art-studio.jpg'),
    body: [
      'Aquidneck Island’s artists, musicians, historians and cultural organizations are part of what makes it a good place to grow up and grow old. The Foundation believes that participation in the arts builds confidence, empathy and creative problem-solving at every age, and that a lively cultural scene supports local businesses and draws neighbors together.',
      'Our Arts and Culture grantmaking has concentrated on helping cultural organizations reach new and more diverse audiences, which in turn strengthens their earned revenue, visibility and partnerships. We are proud to have joined other funders in supporting a shared marketing and ticketing platform for small island arts groups.',
      'Arts education is a second area of concentration. The Foundation funds schools that want to bring in sequential arts instruction and cultural organizations that build long-term school partnerships. Recent grants have supported dance and theater residencies, instrumental music instruction, maritime-history field studies, and summer studio programs for teens.',
    ],
    intro: null,
    targets: [
      'More residents taking part in arts and cultural offerings on Aquidneck Island.',
      'More schools and community organizations offering high-quality arts education.',
      'More young people taking part in multiple arts experiences in or out of school.',
      'Greater diversity, equity and inclusion in the island’s existing arts and cultural offerings.',
      'Stronger, more efficient arts organizations with improved long-term sustainability.',
      'More young people participating in sequential, high-quality arts learning.',
    ],
  },
];

// Grant types: the reference uses bold paragraph sub-heads, not separate pages.
export const grantTypes = [
  {
    name: 'Program Impact Grants',
    paras: [
      'The Foundation invests in programs and projects designed to improve the lives of the people they serve, especially residents with the fewest resources. Funds may be used only for the program or project described in the approved application.',
      'A Foundation grant often covers only part of the cost of the work. The Foundation will consider matching or challenge grants that encourage other funders to participate.',
      'The Ferrowick Foundation cares most about what changes for participants as a result of a grant, rather than about the activities themselves. Each application must align with one of the Foundation’s target outcomes listed under the appropriate {Focus Area} and include an anticipated results statement that describes concrete, measurable {results}.',
    ],
  },
  {
    name: 'Organizational Strength Grants',
    paras: [
      'The Foundation makes grants that help nonprofits achieve and sustain better results by strengthening their infrastructure, management and governance. Projects may include upgrading internal systems, training staff, volunteers or board members, developing a strategic plan, expanding fundraising capacity, or evaluating overall effectiveness.',
      'Applicants for Organizational Strength Grants are asked to anticipate the results of their work and to identify whether the project will increase revenue, decrease expenses, increase the number of people served, or reduce the time it takes to achieve results. Applicants who plan to use Foundation funds to hire a consultant will be asked to submit a proposed scope of work with the application.',
    ],
  },
  {
    name: 'Facilities & Equipment Grants',
    paras: [
      'Funding for these grants is very limited at this time. The Foundation recognizes, however, that sometimes an investment in a building, vehicle or major piece of equipment is the best way to make an organization more efficient or effective. Please contact Foundation staff to discuss a potential request before applying. Facilities & Equipment Grants typically help an organization purchase or improve a physical asset; in most cases Foundation funds are paid over more than one fiscal year and contribute to a project budget that includes several sources.',
    ],
  },
  {
    name: 'Rapid Opportunity Grants',
    paras: [
      'From time to time the Foundation invites requests for projects that could have a significant impact but are limited in duration, cost or scope—for example, an emergency food distribution, a one-time professional training, or a volunteer-led community event. A Rapid Opportunity application must align with one of the Foundation’s target outcomes listed under the appropriate Focus Area. As with all Foundation funding, priority goes to projects that improve the lives of the people served, especially residents with the fewest resources, and funds may be used only for the project described in the approved application. Here too the Foundation is more interested in outcomes than activities, and staff are available to help applicants identify the results they expect.',
    ],
  },
];

export const doNotFund = [
  'Renovations or repairs to houses of worship',
  'Scholarships',
  'Fundraising event sponsorships, journal ads, or program-book ads',
  'Private foundations or individuals',
  'Political campaigns, candidates or lobbying',
  'Medical research',
  'Cemetery associations',
  'Animal welfare organizations',
  'Fraternal and veterans organizations',
  'Business, professional and civic associations or clubs',
  'Memorial fundraising',
  'Tickets to events',
  'Requests from fundraising solicitors on behalf of an organization (the Foundation responds to organizational leaders only).',
];
