import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Container,
  Section,
  TLDR,
  Callout,
  SourceCite,
  Sources,
  JsonLd,
  NewsletterSignup
} from '@/components/ui';
import { webPage } from '@/lib/schema';
import { HIGH_RISK_AREAS, areaCounts } from '@/lib/highrisk';
import { HighRiskTable } from './HighRiskTable';

const SITE = 'https://aiact-navigator.com';
const PAGE_URL = `${SITE}/high-risk`;

const ART6_URL = 'https://artificialintelligenceact.eu/article/6/';
const ANNEX3_URL = 'https://artificialintelligenceact.eu/annex/3/';
const ANNEX1_URL = 'https://artificialintelligenceact.eu/annex/1/';
const EURLEX_URL = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj';
const HIGHLEVEL_URL = 'https://artificialintelligenceact.eu/high-level-summary/';

export const metadata: Metadata = {
  title: 'High-risk AI use cases under the EU AI Act: Annex III & Annex I reference',
  description:
    'Searchable reference of all 8 Annex III high-risk AI use-case areas and the Annex I regulated-product categories, with the Article 6(3) filter explained. Source: Regulation (EU) 2024/1689.',
  alternates: { canonical: '/high-risk' },
  openGraph: {
    title: 'High-risk AI use cases under the EU AI Act: Annex III & Annex I reference',
    description:
      'All 8 Annex III high-risk AI areas and Annex I product categories - searchable and filterable. Includes the Article 6(3) filter exception. Sourced from Regulation (EU) 2024/1689.',
    url: PAGE_URL,
    type: 'website'
  }
};

export default function HighRiskPage() {
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'High-risk AI use cases under the EU AI Act (Annex III and Annex I)',
    description:
      'Reference dataset of high-risk AI use cases under Regulation (EU) 2024/1689 (EU AI Act): the 8 Annex III use-case areas and the Annex I regulated-product categories that trigger the high-risk classification via Article 6.',
    url: PAGE_URL,
    license: 'https://eur-lex.europa.eu/content/legal-notice/legal-notice.html',
    creator: {
      '@type': 'Organization',
      name: 'AI Act Navigator'
    },
    isBasedOn: EURLEX_URL,
    dateModified: '2026-06-09',
    variableMeasured: ['area', 'category', 'example use cases', 'compliance note'],
    keywords: [
      'EU AI Act',
      'high-risk AI',
      'Annex III',
      'Annex I',
      'Article 6',
      'Regulation (EU) 2024/1689',
      'conformity assessment'
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'High-risk AI', item: PAGE_URL }
    ]
  };

  return (
    <>
      <JsonLd
        data={[
          datasetSchema,
          breadcrumbSchema,
          webPage({
            name: 'High-risk AI use cases under the EU AI Act: Annex III & Annex I reference',
            path: '/high-risk',
            description:
              'Searchable reference of all 8 Annex III high-risk AI use-case areas and the Annex I regulated-product categories, with the Article 6(3) filter explained.'
          })
        ]}
      />

      {/* Header */}
      <Container size="lg" className="pt-16 lg:pt-20">
        <header className="max-w-3xl">
          <h1 className="font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            High-risk AI under the EU AI Act
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            The EU AI Act classifies AI systems as "high-risk" via two independent routes: the{' '}
            <strong>Annex I product route</strong> (AI as a safety component of CE-marked products)
            and the <strong>Annex III use-case route</strong> (8 listed application areas). Use this
            reference to check whether your AI system falls into either category - and whether the
            Article 6(3) filter brings it back out.{' '}
            <SourceCite href={ART6_URL}>Article 6</SourceCite>
          </p>
        </header>

        <div className="mt-8 max-w-3xl">
          <TLDR title="The short version">
            <ul className="space-y-2">
              <li>
                <strong>Route 1 - Annex I (product safety):</strong> AI that is a safety component
                of a product regulated under EU harmonisation law (machinery, medical devices, toys,
                vehicles, aviation, etc.) and required to undergo third-party conformity assessment.
              </li>
              <li>
                <strong>Route 2 - Annex III (8 use-case areas):</strong> Stand-alone AI systems in
                biometrics, critical infrastructure, education, employment, essential services, law
                enforcement, migration/asylum, or administration of justice and democratic processes.
              </li>
              <li>
                <strong>Article 6(3) filter:</strong> An Annex III system is <em>not</em> high-risk
                if it does not pose a significant risk of harm to health, safety or fundamental
                rights - but this exception does <em>not</em> apply where the system profiles
                people.
              </li>
            </ul>
          </TLDR>
        </div>
      </Container>

      {/* Two routes explained */}
      <Section
        background="sand"
        eyebrow="Two routes to high-risk"
        title="How an AI system becomes high-risk"
        containerSize="lg"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {/* Route 1 */}
          <div className="rounded-card border border-primary/25 bg-low p-5">
            <span className="inline-flex items-center rounded-chip bg-low px-2.5 py-0.5 font-body text-xs font-semibold text-primary border border-primary/30">
              Route 1 - Annex I
            </span>
            <h3 className="mt-3 font-display font-semibold text-xl text-ink">
              Safety component of a regulated product
            </h3>
            <p className="mt-2 text-sm text-ink/80 leading-relaxed">
              AI that is a safety component of, or is itself, a product regulated under the EU
              harmonisation laws listed in Annex I (e.g. machinery, medical devices, toys, motor
              vehicles, aviation equipment) <em>and</em> that product is required to undergo
              third-party conformity assessment.{' '}
              <SourceCite href={ANNEX1_URL}>Annex I</SourceCite>
            </p>
            <p className="mt-3 text-sm text-muted">
              Obligations under Route 1 apply from <strong>2 August 2027</strong> under current law
              ([OMNIBUS - PROPOSED] deferred to 2 August 2028 if the Digital Omnibus is adopted -
              not yet law as of 9 June 2026).
            </p>
          </div>

          {/* Route 2 */}
          <div className="rounded-card border border-line-strong bg-card p-5">
            <span className="inline-flex items-center rounded-chip bg-sand px-2.5 py-0.5 font-body text-xs font-semibold text-ink border border-line-strong">
              Route 2 - Annex III
            </span>
            <h3 className="mt-3 font-display font-semibold text-xl text-ink">
              Listed high-risk use-case area
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Stand-alone AI systems that fall in one of the 8 use-case areas in Annex III - unless
              the Article 6(3) filter applies. The filter requires a documented assessment that the
              system does not pose significant risk of harm. It cannot be used if the system profiles
              natural persons.{' '}
              <SourceCite href={ANNEX3_URL}>Annex III</SourceCite>
            </p>
            <p className="mt-3 text-sm text-muted">
              Obligations under Route 2 apply from <strong>2 August 2026</strong> under current law
              ([OMNIBUS - PROPOSED] deferred to 2 December 2027 if the Digital Omnibus is
              adopted - not yet law as of 9 June 2026).
            </p>
          </div>
        </div>

        <div className="mt-6 max-w-3xl">
          <Callout variant="warn" title="Article 6(3) filter - not a free pass">
            The Article 6(3) filter allows an Annex III system to avoid the high-risk
            classification if it does not pose a significant risk of harm. Indicators of
            non-significant risk: the system performs a narrow procedural task; it improves a prior
            human activity; it detects decision-making patterns without replacing human judgement; it
            performs preparatory tasks only. <strong>The filter does not apply</strong> where the
            system profiles natural persons. You must document your filter assessment and be
            prepared to defend it.{' '}
            <SourceCite href={ART6_URL}>Article 6(3)</SourceCite>
          </Callout>
        </div>
      </Section>

      {/* The searchable table */}
      <Section background="paper" containerSize="lg">
        <div className="max-w-3xl mb-8">
          <h2 className="font-display font-semibold text-2xl lg:text-3xl text-ink">
            High-risk AI reference: {areaCounts.total} areas
          </h2>
          <p className="mt-3 text-ink/80 leading-relaxed">
            Showing {areaCounts.annexIII} Annex III use-case areas and {areaCounts.annexI} Annex I
            product categories. Use the search and filter to find relevant areas for your AI system.
          </p>
        </div>

        <HighRiskTable data={HIGH_RISK_AREAS} />

        <p className="mt-6 text-sm text-muted">
          This reference covers the areas defined in Annex III and Annex I of Regulation (EU)
          2024/1689. It is a summary - always confirm the precise scope against the full regulation
          text. This is guidance, not legal advice.
        </p>

        <p className="mt-4 text-sm text-muted">
          Need to classify your specific AI system?{' '}
          <Link
            href="/risk-classifier"
            className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
          >
            Try the risk classifier
          </Link>
          . For the full obligations once classified, see the{' '}
          <Link
            href="/obligations"
            className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
          >
            obligations guide
          </Link>
          .
        </p>

        <Sources
          items={[
            {
              href: ANNEX3_URL,
              label: 'Annex III of Regulation (EU) 2024/1689 - AI Act Explorer',
              retrieved: '9 Jun 2026'
            },
            {
              href: ART6_URL,
              label:
                'Article 6 of Regulation (EU) 2024/1689 - classification as high-risk AI system',
              retrieved: '9 Jun 2026'
            },
            {
              href: ANNEX1_URL,
              label:
                'Annex I of Regulation (EU) 2024/1689 - Union harmonisation legislation',
              retrieved: '9 Jun 2026'
            },
            {
              href: EURLEX_URL,
              label:
                'Regulation (EU) 2024/1689 (EU AI Act) - EUR-Lex',
              retrieved: '9 Jun 2026'
            },
            {
              href: HIGHLEVEL_URL,
              label: 'AI Act high-level summary - AI Act Explorer',
              retrieved: '9 Jun 2026'
            }
          ]}
        />
      </Section>

      <NewsletterSignup
        variant="band"
        heading="Stay up to date with the EU AI Act"
        source="high-risk"
      />
    </>
  );
}
