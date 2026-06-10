// Shared JSON-LD building blocks so Organization, WebSite, WebPage,
// BreadcrumbList and the reviewer all agree across every page.

export const SITE = 'https://aiact-navigator.com';

// Mirror of the editorial "last reviewed" date (schema-only signal).
export const DATE_MODIFIED = '2026-06-09';

// Topics the hub demonstrably covers — an E-E-A-T expertise signal,
// shared by the Organization and the editorial reviewer.
const KNOWS_ABOUT = [
  'EU AI Act',
  'Regulation (EU) 2024/1689',
  'AI governance',
  'High-risk AI systems (Annex III)',
  'General-purpose AI (GPAI) models',
  'AI Act conformity assessment',
  'AI Act transparency obligations',
  'AI literacy (Article 4)',
  'ISO/IEC 42001'
];

// Editorial reviewer for E-E-A-T (author/reviewedBy). Organization-level
// (no individual named), enriched with subject-matter expertise signals.
export const REVIEWED_BY = {
  '@type': 'Organization',
  name: 'AI Act Navigator editorial team',
  url: SITE,
  description:
    'Independent analysts who track the EU AI Act and its implementation, and review every page on this site against primary sources (EUR-Lex, the European Commission and the AI Office).',
  knowsAbout: KNOWS_ABOUT
} as const;

// The site's address (the operating publisher's registered address).
const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Gunta-Stölzl-Strasse 7',
  postalCode: '80807',
  addressLocality: 'München',
  addressRegion: 'Bavaria',
  addressCountry: 'DE'
} as const;

// The site's Organization, with address, imprint, VAT and social profiles.
export const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'AI Act Navigator',
  url: SITE,
  logo: `${SITE}/brand/og.png`,
  description:
    'Plain-English guidance, free tools and templates for the EU AI Act (Regulation (EU) 2024/1689).',
  foundingDate: '2025',
  email: 'contact@nukipalabs.com',
  knowsAbout: KNOWS_ABOUT,
  address: ADDRESS,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'editorial',
    email: 'contact@nukipalabs.com',
    availableLanguage: ['en']
  },
  sameAs: [
    'https://github.com/nukipa-labs',
    'https://nukipalabs.com',
    'https://www.linkedin.com/company/nukipa-labs'
  ],
  publisher: {
    '@type': 'Organization',
    name: 'Nukipa Labs GmbH',
    legalName: 'Nukipa Labs GmbH',
    url: `${SITE}/legal/imprint`,
    email: 'contact@nukipalabs.com',
    vatID: 'DE456506273',
    address: ADDRESS
  }
};

export const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: 'AI Act Navigator',
  url: SITE,
  inLanguage: 'en',
  publisher: { '@id': `${SITE}/#organization` }
};

type Crumb = { name: string; path: string };

/** WebPage node with dateModified + named reviewer, tied to the WebSite + Organization. */
export function webPage(opts: { name: string; path: string; description?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE}${opts.path}#webpage`,
    url: `${SITE}${opts.path}`,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE}/#website` },
    dateModified: DATE_MODIFIED,
    reviewedBy: REVIEWED_BY,
    publisher: { '@id': `${SITE}/#organization` }
  };
}

/** BreadcrumbList from a hub -> subpage trail (always starts at Home). */
export function breadcrumb(trail: Crumb[]) {
  const items: Crumb[] = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path === '/' ? '/' : c.path}`
    }))
  };
}
