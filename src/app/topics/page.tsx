import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Container,
  Section,
  Button,
  TLDR,
  SourceCite,
  JsonLd,
  RevealOnScroll,
  ContourBackground,
  NewsletterSignup
} from '@/components/ui';
import { webPage } from '@/lib/schema';
import { TOPICS, SITE, SRC } from '@/lib/topics';

const ONE_LINE: Record<string, string> = {
  'prohibited-ai-practices':
    'The 8 Article 5 bans in plain English - what is forbidden and what penalties attach.',
  'high-risk-ai-systems':
    'Annex I and Annex III classification explained, with the Article 6(3) filter.',
  'general-purpose-ai':
    'GPAI / foundation-model rules (Arts. 53 & 55), systemic risk and the Code of Practice.',
  'provider-vs-deployer':
    'Who is the provider and who is the deployer - and which obligations each carries.',
  'ai-act-for-us-companies':
    'Extraterritorial reach for non-EU companies, the "output used in the EU" test and the authorised representative.',
  'ai-act-penalties':
    '€35m/7%, €15m/3% and €7.5m/1% fine tiers explained, with SME proportionality.',
  'ai-act-vs-gdpr':
    'How the AI Act and GDPR interact - FRIA vs DPIA, dual liability and compliance tips.',
  'transparency-obligations':
    'Article 50 duties: chatbot notices, AI-content labelling, deepfake disclosure and emotion-recognition notification.'
};

export const metadata: Metadata = {
  title: 'EU AI Act topics: plain-English guides by subject',
  description:
    'Plain-English guides to key EU AI Act topics: prohibited practices, high-risk AI, GPAI, provider vs deployer, penalties, GDPR overlap and transparency obligations.',
  alternates: { canonical: '/topics' },
  openGraph: {
    type: 'website',
    title: 'EU AI Act topics: plain-English guides by subject',
    description:
      'Plain-English EU AI Act guides on the topics that matter most: prohibited practices, high-risk AI, GPAI, penalties, GDPR overlap and more.',
    url: `${SITE}/topics`,
    images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'AI Act Navigator' }]
  }
};

export default function TopicsIndexPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'EU AI Act topics',
    itemListElement: TOPICS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.title,
      url: `${SITE}/topics/${t.slug}`
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'EU AI Act topics', item: `${SITE}/topics` }
    ]
  };

  return (
    <>
      <JsonLd
        data={[
          itemListSchema,
          breadcrumbSchema,
          webPage({
            name: 'EU AI Act topics: plain-English guides by subject',
            path: '/topics',
            description:
              'Plain-English guides to key EU AI Act topics: prohibited practices, high-risk AI, GPAI, provider vs deployer, penalties, GDPR overlap and transparency obligations.'
          })
        ]}
      />

      {/* Hero */}
      <header className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container size="md" className="relative z-10 py-16 lg:py-24">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Topic guides
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-6xl text-ink leading-tight">
            EU AI Act by topic
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">
            The EU AI Act (Regulation (EU) 2024/1689) is a complex, 144-article regulation. These
            topic guides cut it into the questions organisations actually ask - what is banned, who
            is regulated, which obligations apply, and what the fines are. Each guide is plain-English
            first, with precise legal citations throughout.{' '}
            <SourceCite href={SRC.highlevelSummary}>AI Act high-level summary</SourceCite>
          </p>

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                <li>
                  The AI Act is a risk-based regulation: obligations scale from outright bans
                  (Article 5) through strict high-risk rules (Annex III / Annex I) to lighter
                  transparency duties (Article 50) and no mandatory rules for minimal-risk AI.
                </li>
                <li>
                  Most high-risk obligations apply from 2 August 2026 under current law (with a
                  proposed Digital Omnibus deferral to 2 December 2027 for Annex III - not yet
                  adopted).
                </li>
                <li>
                  Article 5 prohibitions are already in force (since 2 February 2025); GPAI rules
                  and penalties apply from 2 August 2025.
                </li>
              </ul>
            </TLDR>
          </div>

          <div className="mt-8">
            <Button as="a" href="/risk-classifier" variant="primary">
              Classify your AI system
            </Button>
          </div>
        </Container>
      </header>

      {/* Card grid */}
      <Section background="paper" eyebrow="Choose a topic" title="Key EU AI Act topics">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t, i) => (
            <RevealOnScroll key={t.slug} delay={i}>
              <Link
                href={`/topics/${t.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-card transition hover:border-accent hover:-translate-y-[3px]"
              >
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-xl font-semibold text-ink group-hover:text-primary">
                    {t.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-ink/80 leading-relaxed">
                    {ONE_LINE[t.slug] ?? t.metaDescription}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-accent-deep">
                    {t.title} →
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="sand" align="center">
        <div className="mx-auto max-w-2xl text-center">
          <RevealOnScroll>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-ink">
              Not sure where to start?
            </h2>
            <p className="mt-4 text-ink/80 leading-relaxed">
              Use the risk classifier to find out where your AI system sits in the Act's
              risk tiers, then follow the obligations guide for your role.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button as="a" href="/risk-classifier" variant="primary">
                Classify your AI system
              </Button>
            </div>
            <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/obligations" className="text-primary underline-offset-2 hover:underline">
                Obligations guide
              </Link>
              <Link href="/high-risk" className="text-primary underline-offset-2 hover:underline">
                High-risk use cases
              </Link>
              <Link href="/ai-act" className="text-primary underline-offset-2 hover:underline">
                What is the EU AI Act?
              </Link>
            </nav>
          </RevealOnScroll>
        </div>
      </Section>

      <NewsletterSignup variant="band" />
    </>
  );
}
