// Global identity, navigation and footer for the fictional Ferrowick Foundation.
// Edit here to rename the foundation or change contact details site-wide.

export const site = {
  name: 'The Ferrowick Foundation',
  shortName: 'Ferrowick Foundation',
  titleSuffix: 'Ferrowick Foundation',
  region: 'Aquidneck Island',
  towns: ['Newport', 'Middletown', 'Portsmouth'],
  address: ['75 Lantern Wharf Way, Suite 2C', 'Middletown, RI 02842'],
  phone: '(401) 555-0148',
  email: 'info@example.org',
  portalSender: 'administrator@example.net',
  emailDomain: '@example.org',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  ],
  // The fictional grant portal lives inside this site at a vendor-style path.
  portalUrl: '/portal/Home/Logon/?urlkey=ferrowick',
  demoNotice:
    'Independent demonstration website. The Ferrowick Foundation is fictional and is not affiliated with any real foundation.',
};

// Main menu, mirroring the reference order and dropdown hierarchy.
export const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us', href: '/our-vision-mission-guiding-principles-and-values/', children: [
      { label: 'Our Mission and Vision', href: '/our-vision-mission-guiding-principles-and-values/' },
      { label: 'Board', href: '/board/' },
      { label: 'Staff', href: '/staff/' },
      { label: 'History', href: '/history/' },
      { label: 'In Memoriam', href: '/in-memoriam/' },
      { label: 'Biennial Report', href: '/biennial-report/' },
    ],
  },
  {
    label: 'Our Approach', href: '/our-approach/', children: [
      { label: 'Results-Based Approach', href: '/our-approach/results-based-approach/' },
      { label: 'Systems Thinking and Compassionate Systems', href: '/our-approach/systems-thinking-and-compassionate-systems/' },
      { label: 'Diversity, Equity, and Inclusion', href: '/our-approach/diversity-equity-and-inclusion/' },
      { label: 'Data-Driven Decision Making', href: '/our-approach/data-driven-decision-making/' },
      { label: 'Collective Impact', href: '/our-approach/collective-impact/' },
    ],
  },
  {
    label: 'Focus Areas', href: '/focus-areas/', children: [
      { label: 'Education', href: '/focus-areas/education/' },
      { label: 'Health', href: '/focus-areas/health/' },
      { label: 'Community Services', href: '/focus-areas/community-services/' },
      { label: 'Arts & Culture', href: '/focus-areas/arts-culture/' },
    ],
  },
  {
    // Like the reference, "Grants" has no landing page of its own.
    label: 'Grants', href: '#', section: '/grants/', children: [
      { label: 'Guidelines', href: '/guidelines/' },
      { label: 'Types of Grants', href: '/types-of-grants/' },
      { label: 'Application Process', href: '/application-process/' },
      { label: 'Application Assistance', href: '/application-assistance/' },
      { label: 'To Apply', href: '/to-apply/' },
      { label: 'Grant Portal', href: '/grant-portal/' },
      { label: 'Recent Grants', href: '/recent-grants/' },
      { label: 'Grant Reports', href: '/grant-reports/' },
    ],
  },
  {
    label: 'Fellowship', href: '/fellowship/', children: [
      { label: 'Background', href: '/fellowship/' },
      { label: 'How To Apply', href: '/fellowship/how-to-apply/' },
      { label: 'Fellows', href: '/fellowship/fellows/' },
      { label: 'Advisory Committee', href: '/fellowship/advisory-committee/' },
      { label: 'The Conference', href: '/fellowship/the-conference/' },
    ],
  },
  { label: 'News', href: '/news/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerAboutMenu = [
  { label: 'Our Mission and Vision', href: '/our-vision-mission-guiding-principles-and-values/' },
  { label: 'History', href: '/history/' },
  { label: 'Board', href: '/board/' },
  { label: 'Staff', href: '/staff/' },
  { label: 'In Memoriam', href: '/in-memoriam/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerFocusMenu = [
  { label: 'Education', href: '/focus-areas/education/' },
  { label: 'Health', href: '/focus-areas/health/' },
  { label: 'Community Services', href: '/focus-areas/community-services/' },
  { label: 'Arts & Culture', href: '/focus-areas/arts-culture/' },
];
