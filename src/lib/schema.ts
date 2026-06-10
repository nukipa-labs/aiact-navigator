// Shared JSON-LD building blocks so Organization, WebSite, WebPage,
// BreadcrumbList and the reviewer all agree across every page.

export const SITE = 'https://aiact-navigator.com';

// Mirror of the editorial "last reviewed" date (schema-only signal).
export const DATE_MODIFIED = '2026-06-09';

// Named reviewer for E-E-A-T (author/reviewedBy).
export const REVIEWED_BY = {
  '@type': 'Organization',
  name: 'AI Act Navigator Team',
  url: SITE
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
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gunta-Stölzl-Strasse 7',
      postalCode: '80807',
      addressLocality: 'München',
      addressCountry: 'DE'
    }
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
