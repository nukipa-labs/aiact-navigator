// Content-hub nav structure. Groups with dropdown panels (NOT mega-glass).
// Every href has a route created by a sibling agent (tool agents / blog agent)
// so no 404-guarding is needed.

export type NavLink = { label: string; href: string; note?: string };
export type NavGroup = {
  label: string;
  href: string; // group landing (clicking the group label goes here)
  items?: NavLink[]; // dropdown panel items
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'The AI Act',
    href: '/ai-act',
    items: [
      { label: 'What is the EU AI Act?', href: '/ai-act' },
      { label: 'AI Act Timeline & Deadlines', href: '/timeline' },
      { label: 'Topics & Guides', href: '/topics' },
      { label: 'AI Act Glossary', href: '/glossary' }
    ]
  },
  {
    label: 'Tools',
    href: '/tools',
    items: [
      { label: 'AI Act Risk-Tier Classifier', href: '/risk-classifier' },
      { label: 'Provider vs Deployer Obligations', href: '/obligations' },
      { label: 'High-Risk AI Use Cases (Annex III)', href: '/high-risk' },
      { label: 'AI System Inventory Template', href: '/ai-inventory' },
      { label: 'AI Act Readiness Checklist', href: '/checklist' }
    ]
  },
  {
    label: 'Governance',
    href: '/ai-governance',
    items: [
      { label: 'AI Governance', href: '/ai-governance' },
      { label: 'ISO/IEC 42001', href: '/iso-42001' },
      { label: 'AI Literacy Training', href: '/ai-literacy' }
    ]
  },
  {
    label: 'About',
    href: '/about'
  }
];

export const SUBSCRIBE_HREF = '/subscribe';

export const PRIMARY_CTA = { label: 'Get the AI Act Checklist', href: '/checklist' };

// Footer columns mirror the nav groups.
export const FOOTER_COLUMNS: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Understand',
    links: [
      { label: 'What is the EU AI Act?', href: '/ai-act' },
      { label: 'Timeline & Deadlines', href: '/timeline' },
      { label: 'Topics & Guides', href: '/topics' },
      { label: 'Glossary', href: '/glossary' }
    ]
  },
  {
    heading: 'Tools',
    links: [
      { label: 'Risk-Tier Classifier', href: '/risk-classifier' },
      { label: 'Obligations Checker', href: '/obligations' },
      { label: 'High-Risk Use Cases', href: '/high-risk' },
      { label: 'AI Inventory Template', href: '/ai-inventory' },
      { label: 'Readiness Checklist', href: '/checklist' }
    ]
  },
  {
    heading: 'Governance',
    links: [
      { label: 'AI Governance', href: '/ai-governance' },
      { label: 'ISO/IEC 42001', href: '/iso-42001' },
      { label: 'AI Literacy Training', href: '/ai-literacy' },
      { label: 'Subscribe to The AI Act Brief', href: '/subscribe' }
    ]
  },
  {
    heading: 'About',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Imprint', href: '/legal/imprint' }
    ]
  }
];
