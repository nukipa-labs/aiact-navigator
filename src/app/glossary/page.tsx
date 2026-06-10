import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { JsonLd } from '@/components/ui';
import { NewsletterSignup } from '@/components/ui';
import { webPage } from '@/lib/schema';
import { GLOSSARY } from '@/lib/glossary';
import { GlossaryList } from './GlossaryList';

const SITE = 'https://aiact-navigator.com';

export const metadata: Metadata = {
  title: 'EU AI Act Glossary: every term in plain English',
  description:
    'Every EU AI Act term decoded in plain English: AI system, GPAI, provider, deployer, high-risk AI, conformity assessment, CE marking, AI Office and more. Sourced from Regulation (EU) 2024/1689.',
  alternates: { canonical: '/glossary' },
  openGraph: {
    type: 'article',
    title: 'EU AI Act Glossary: every term in plain English',
    description:
      'Every EU AI Act term decoded in plain English: provider, deployer, GPAI, high-risk AI, conformity assessment, AI Office and more.',
    url: `${SITE}/glossary`,
    images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'AI Act Navigator' }]
  }
};

export default function GlossaryPage() {
  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'EU AI Act Glossary',
    description:
      'Plain-English definitions of the key terms in the EU AI Act (Regulation (EU) 2024/1689).',
    url: `${SITE}/glossary`,
    hasDefinedTerm: GLOSSARY.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE}/glossary#${t.slug}`,
      name: t.term,
      description: t.formal ? `${t.plain} ${t.formal}` : t.plain,
      inDefinedTermSet: `${SITE}/glossary`
    }))
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'EU AI Act Glossary', item: `${SITE}/glossary` }
    ]
  };

  return (
    <>
      <JsonLd
        data={[
          definedTermSet,
          breadcrumb,
          webPage({
            name: 'EU AI Act Glossary: every term in plain English',
            path: '/glossary',
            description:
              'Every EU AI Act term decoded in plain English: AI system, GPAI, provider, deployer, high-risk AI, conformity assessment, CE marking, AI Office and more. Sourced from Regulation (EU) 2024/1689.'
          })
        ]}
      />

      <Container size="lg" className="py-16 lg:py-24">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            EU AI Act Glossary
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            Every AI Act term, in plain English
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            The EU AI Act (Regulation (EU) 2024/1689) comes with its own vocabulary: GPAI, provider,
            deployer, conformity assessment, systemic risk, FRIA. Here is each term explained simply
            first, then with the precise legal phrasing, so you can read any AI Act document without
            a law degree. Every definition is grounded in the regulation and research.md.
          </p>
          <p className="mt-4 text-sm text-muted">
            Need the bigger picture first?{' '}
            <Link
              href="/ai-act"
              className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
            >
              Read what the EU AI Act is
            </Link>
            , or use the{' '}
            <Link
              href="/risk-classifier"
              className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
            >
              risk classifier
            </Link>
            .
          </p>
        </header>

        <div className="mt-12">
          <GlossaryList />
        </div>

        <p className="mt-12 mx-auto max-w-2xl text-center text-sm text-muted">
          This is guidance, not legal advice. Confirm with the official sources we link
          or a qualified adviser. Definitions reference Regulation (EU) 2024/1689. Last updated: 9 June 2026.
        </p>
      </Container>

      <NewsletterSignup variant="band" />
    </>
  );
}
