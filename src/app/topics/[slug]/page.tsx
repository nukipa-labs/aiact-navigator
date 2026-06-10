import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Container,
  Section,
  Button,
  TLDR,
  Callout,
  SourceCite,
  Sources,
  JsonLd,
  RevealOnScroll,
  ContourBackground,
  NewsletterSignup,
  Prose,
  Icon
} from '@/components/ui';
import {
  TOPICS,
  getTopic,
  SITE,
  PUBLISHED,
  MODIFIED,
  SRC
} from '@/lib/topics';
import { REVIEWED_BY } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTopic(slug);
  if (!t) return {};
  const url = `${SITE}/topics/${t.slug}`;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: `/topics/${t.slug}` },
    openGraph: {
      type: 'article',
      title: t.metaTitle,
      description: t.metaDescription,
      url,
      publishedTime: PUBLISHED,
      modifiedTime: MODIFIED,
      images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'AI Act Navigator' }]
    }
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const t = getTopic(slug);
  if (!t) notFound();

  const url = `${SITE}/topics/${t.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.title,
    description: t.metaDescription,
    inLanguage: 'en',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    // only include image if present
    ...(t.image ? { image: t.image } : {}),
    author: { '@type': 'Organization', name: 'AI Act Navigator', url: SITE },
    publisher: { '@type': 'Organization', name: 'AI Act Navigator', url: SITE },
    reviewedBy: REVIEWED_BY,
    about: {
      '@type': 'Legislation',
      name: 'Regulation (EU) 2024/1689 (EU AI Act)',
      legislationIdentifier: 'Regulation (EU) 2024/1689',
      url: SRC.eurlex
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'EU AI Act topics', item: `${SITE}/topics` },
      { '@type': 'ListItem', position: 3, name: t.title, item: url }
    ]
  };

  return (
    <>
      <JsonLd data={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <header className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container size="md" className="relative z-10 py-16 lg:py-24">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            EU AI Act topic guide
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-6xl text-ink leading-tight">
            {t.title}
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">{t.intro}</p>

          <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted">
            <Icon name="verified" className="text-primary text-base" />
            Reviewed by the AI Act Navigator team · Last updated 9 June 2026
          </p>

          {/* Optional hero image - only rendered if present */}
          {t.image && t.imageAlt ? (
            <div className="relative mt-8 h-[260px] w-full overflow-hidden rounded-card sm:h-[320px] lg:h-[400px] bg-sand-tint">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.image}
                alt={t.imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                {t.tldr.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="/risk-classifier" variant="primary">
              Classify your AI system
            </Button>
            <Button as="a" href="/obligations" variant="secondary">
              Obligations guide
            </Button>
          </div>
        </Container>
      </header>

      {/* What this topic covers */}
      <Section background="paper" eyebrow="Scope">
        <div className="mx-auto max-w-3xl">
          <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="category" className="text-primary text-3xl" />
            What this covers
          </h2>
          <RevealOnScroll>
            <Prose className="mt-6">
              <ul>
                {t.inScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {t.inScopeNote ? <p className="text-muted">{t.inScopeNote}</p> : null}
              <p>
                Source:{' '}
                <SourceCite href={SRC.eurlex}>Regulation (EU) 2024/1689 (EUR-Lex)</SourceCite>
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Key compliance challenges */}
      <Section background="sand" eyebrow="Compliance challenges">
        <div className="mx-auto max-w-3xl">
          <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="priority_high" className="text-primary text-3xl" />
            Key compliance challenges
          </h2>
          <RevealOnScroll>
            <Prose className="mt-6">
              <ul>
                {t.keyPains.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                The EU AI Act applies a risk-based approach: obligations scale with the level of
                risk posed.{' '}
                <SourceCite href={SRC.highlevelSummary}>AI Act high-level summary</SourceCite>
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* What to do */}
      <Section background="paper" eyebrow="What to do">
        <div className="mx-auto max-w-3xl">
          <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="checklist" className="text-primary text-3xl" />
            What to do
          </h2>
          <RevealOnScroll>
            <Prose className="mt-6">
              <ol>
                {t.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p>
                For the full obligations breakdown, see the{' '}
                <Link href="/obligations">AI Act obligations guide</Link>, and for role-specific
                duties see the{' '}
                <Link href="/topics/provider-vs-deployer">provider vs deployer guide</Link>.
              </p>
            </Prose>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Proposed/draft note */}
      {t.draftNote ? (
        <Section background="sand">
          <div className="mx-auto max-w-3xl">
            <RevealOnScroll>
              <Callout variant="warn" title={t.draftNote.title}>
                {t.draftNote.body}{' '}
                <SourceCite href={SRC.omnibus}>Council press release, 7 May 2026</SourceCite>
              </Callout>
            </RevealOnScroll>
          </div>
        </Section>
      ) : null}

      {/* FAQ */}
      <Section background={t.draftNote ? 'paper' : 'sand'} eyebrow="FAQ">
        <div className="mx-auto max-w-3xl">
          <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="help" className="text-primary text-3xl" />
            {t.name}: common questions
          </h2>
          <dl className="mt-6 divide-y divide-line">
            {t.faq.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-lg font-semibold text-ink">{f.q}</dt>
                <dd className="mt-2 text-ink/90 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* CTA + cross-links */}
      <Section background="sand" align="center">
        <div className="mx-auto max-w-2xl text-center">
          <RevealOnScroll>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-ink">
              Get AI Act-ready
            </h2>
            <p className="mt-4 text-ink/80 leading-relaxed">
              Use the risk classifier to find your system's tier, then explore the obligations and
              checklist for your role.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button as="a" href="/risk-classifier" variant="primary">
                Classify your AI system
              </Button>
            </div>
            <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/obligations" className="text-primary underline-offset-2 hover:underline">
                Obligations
              </Link>
              <Link href="/high-risk" className="text-primary underline-offset-2 hover:underline">
                High-risk use cases
              </Link>
              <Link href="/glossary" className="text-primary underline-offset-2 hover:underline">
                Glossary
              </Link>
              <Link href="/ai-act" className="text-primary underline-offset-2 hover:underline">
                What is the EU AI Act?
              </Link>
            </nav>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Sources + disclaimer */}
      <Section background="paper">
        <div className="mx-auto max-w-3xl">
          <Callout variant="info" title="This is guidance, not legal advice">
            This is guidance to help you understand how the EU AI Act applies to{' '}
            {t.name.toLowerCase()}, not legal advice. For decisions specific to your organisation,
            confirm with the official sources we link or a qualified legal adviser.
          </Callout>

          <Sources
            items={[
              {
                href: SRC.eurlex,
                label: 'Regulation (EU) 2024/1689 (EU AI Act) - EUR-Lex',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.ecHome,
                label: 'European Commission: AI regulatory framework',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.highlevelSummary,
                label: 'AI Act Explorer: high-level summary',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.timeline,
                label: 'AI Act implementation timeline',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.omnibus,
                label: 'Council of the EU: Digital Omnibus provisional agreement, 7 May 2026',
                retrieved: '9 Jun 2026'
              }
            ]}
          />
        </div>
      </Section>

      <NewsletterSignup variant="band" />
    </>
  );
}
