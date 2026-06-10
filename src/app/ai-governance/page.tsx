import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Container,
  Section,
  Button,
  TLDR,
  Callout,
  SourceCite,
  Sources,
  JsonLd,
  ContourBackground,
  RevealOnScroll,
  NewsletterSignup
} from '@/components/ui';
import { webPage, breadcrumb } from '@/lib/schema';

const SITE = 'https://aiact-navigator.com';
const CANONICAL = `${SITE}/ai-governance`;

const SRC = {
  eurlex:   'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
  art9:     'https://artificialintelligenceact.eu/article/9/',
  art17:    'https://artificialintelligenceact.eu/article/17/',
  art26:    'https://artificialintelligenceact.eu/article/26/',
  art27:    'https://artificialintelligenceact.eu/article/27/',
  art4:     'https://artificialintelligenceact.eu/article/4/',
  art40:    'https://artificialintelligenceact.eu/article/40/',
  timeline: 'https://artificialintelligenceact.eu/implementation-timeline/'
};

export const metadata: Metadata = {
  title: 'AI Governance for the EU AI Act: Framework, Tools and Obligations | AI Act Navigator',
  description:
    'How to build an AI governance framework that maps to EU AI Act obligations: inventory, risk classification, documentation, human oversight and monitoring. Plain-English guide.',
  alternates: { canonical: '/ai-governance' },
  openGraph: {
    title: 'AI Governance for the EU AI Act',
    description:
      'What an AI governance framework covers, how it maps to AI Act obligations, and its relationship to ISO/IEC 42001.',
    url: CANONICAL,
    type: 'article'
  }
};

const PILLARS = [
  {
    title: 'AI system inventory',
    description:
      'A register of every AI system your organisation develops or uses - what it does, who owns it, where it runs, and what data it touches. The inventory is the foundation of everything else: you cannot classify risk, assign obligations, or demonstrate oversight of systems you have not catalogued.',
    obligation: 'Art. 9 (risk management), Art. 17 (quality management)',
    href: SRC.art9
  },
  {
    title: 'Risk classification',
    description:
      'Mapping each inventoried AI system to the Act\'s risk tiers - prohibited, high-risk (Annex I / Annex III), limited/transparency risk, or minimal risk. Classification determines which obligations apply and by when. A system can also be reclassified when its purpose changes.',
    obligation: 'Art. 5 (prohibited), Art. 6 (high-risk classification)',
    href: SRC.eurlex
  },
  {
    title: 'Documentation and record-keeping',
    description:
      'Technical documentation (Annex IV for high-risk providers), instructions for use, conformity declarations, and the automatic logs that high-risk systems must generate. Deployers must also keep logs for at least 6 months unless other law requires longer.',
    obligation: 'Art. 11-12 (providers), Art. 26(6) (deployers)',
    href: SRC.art26
  },
  {
    title: 'Human oversight',
    description:
      'Designing, assigning and training the natural persons who oversee AI system operation. Providers must build systems so they can be monitored and intervened in; deployers must assign competent, authorised individuals who understand the system\'s limitations.',
    obligation: 'Art. 14 (providers), Art. 26(1)-(2) (deployers)',
    href: SRC.art26
  },
  {
    title: 'AI literacy training',
    description:
      'Article 4 requires providers and deployers to ensure staff and operators have a sufficient level of AI literacy - including technical knowledge, experience, and awareness of context. In force since 2 February 2025. No prescribed curriculum; document your tailored programme.',
    obligation: 'Art. 4 (in force 2 Feb 2025)',
    href: SRC.art4
  },
  {
    title: 'Post-deployment monitoring',
    description:
      'Ongoing collection and review of real-world performance data. High-risk providers must run a post-market monitoring system and report serious incidents; deployers must monitor operation, suspend use when risks arise, and inform the provider or authority. Fundamental Rights Impact Assessments (FRIA) are required for certain deployers.',
    obligation: 'Art. 72-73 (providers), Art. 26-27 (deployers)',
    href: SRC.art27
  }
];

export default function AIGovernancePage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
              { '@type': 'ListItem', position: 2, name: 'AI Governance', item: CANONICAL }
            ]
          },
          webPage({
            name: 'AI Governance for the EU AI Act: Framework, Tools and Obligations',
            path: '/ai-governance',
            description:
              'How to build an AI governance framework that maps to EU AI Act obligations: inventory, risk classification, documentation, human oversight and monitoring. Plain-English guide.'
          }),
          breadcrumb([{ name: 'AI Governance', path: '/ai-governance' }])
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container className="relative z-10 py-16 lg:py-24" size="md">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Governance frameworks
          </p>
          <h1 className="mt-4 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            AI Governance for the EU AI Act
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            The EU AI Act does not prescribe a single governance platform or methodology. But the
            obligations it creates - inventory your AI systems, classify their risk, document
            controls, assign oversight, train staff, and monitor in production - together define
            what a compliant AI governance framework needs to do. This guide maps those obligations
            to the governance pillars that satisfy them.
          </p>
        </Container>
      </section>

      {/* TL;DR */}
      <Section background="sand" containerSize="md">
        <RevealOnScroll>
          <TLDR title="In short">
            AI governance for the AI Act means: <strong>catalogue</strong> every AI system you
            use or provide, <strong>classify</strong> its risk tier, <strong>document</strong>{' '}
            controls per the applicable obligations, <strong>assign</strong> trained human
            overseers, and <strong>monitor</strong> performance post-deployment. AI literacy
            (Art. 4) applies to all organisations in scope, and has been in force since
            2 February 2025.{' '}
            <SourceCite href={SRC.art17}>AI Act Art. 17 (quality management)</SourceCite>
          </TLDR>
        </RevealOnScroll>
      </Section>

      {/* Why governance first */}
      <Section
        background="paper"
        eyebrow="Why it matters"
        title="Why governance comes before compliance"
        containerSize="md"
      >
        <div className="space-y-5 text-ink/90 leading-relaxed">
          <RevealOnScroll>
            <p>
              Most organisations discover they are deployers - not providers - of AI systems. They
              buy AI from vendors, embed it in workflows, and are only dimly aware of which systems
              are high-risk, which obligations apply to them, and what documentation they hold. The
              first governance task is therefore to{' '}
              <strong>know what you have</strong> before you can act on it.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p>
              A governance framework is also the evidence you show a regulator. The AI Act shifts
              obligations to deployers substantially: Article 26 requires deployers to assign
              oversight, keep logs, monitor operation, and notify providers and authorities if
              risks emerge. Without documented governance, you have no paper trail.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <Callout variant="info" title="Already in force">
              <strong>AI literacy (Article 4)</strong> has been binding since{' '}
              <strong>2 February 2025</strong> for all organisations in scope - including
              non-EU entities whose AI outputs are used in the EU. If you have not yet documented
              an AI literacy programme for staff who operate or use AI systems on your behalf,
              that is the first gap to close.{' '}
              <SourceCite href={SRC.art4}>Art. 4 - AI literacy</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Six pillars */}
      <Section
        background="sand"
        eyebrow="The six pillars"
        title="What an AI governance framework needs to cover"
        containerSize="md"
      >
        <div className="space-y-6">
          {PILLARS.map((pillar, i) => (
            <RevealOnScroll key={pillar.title} delay={i % 3}>
              <div className="rounded-card border border-line bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-display font-semibold text-xl text-ink">{pillar.title}</h3>
                  <a
                    href={pillar.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-accent-deep underline decoration-dotted underline-offset-2 hover:decoration-solid"
                  >
                    {pillar.obligation}
                  </a>
                </div>
                <p className="mt-3 text-ink/85 leading-relaxed">{pillar.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* Relationship to ISO 42001 */}
      <Section
        background="paper"
        eyebrow="Standards"
        title="How ISO/IEC 42001 fits in"
        containerSize="md"
      >
        <div className="space-y-5 text-ink/90 leading-relaxed">
          <RevealOnScroll>
            <p>
              ISO/IEC 42001 is the international certifiable AI Management System standard
              (Plan-Do-Check-Act). It provides a governance framework that covers risk management,
              data governance, transparency, human oversight, and continuous improvement - all of
              which map closely to AI Act obligations.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p>
              The important caveat is that ISO 42001 is an{' '}
              <strong>international</strong> standard, not a harmonised European standard.
              It therefore does not provide an automatic legal presumption of conformity with the
              AI Act under Article 40. That presumption comes from harmonised standards being
              developed by CEN-CENELEC (JTC 21), with the draft prEN 18286 mapping closely to
              ISO 42001 controls.{' '}
              <SourceCite href={SRC.art40}>Art. 40 - Presumption of conformity</SourceCite>
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <p>
              In practice: ISO 42001 certification is strong evidence of governance maturity and a
              significant head-start toward harmonised standard compliance. It is not a substitute
              for the AI Act&apos;s specific obligations (conformity assessment, CE marking,
              registration, GPAI documentation), which are separate processes.{' '}
              <Link
                href="/iso-42001"
                className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                Read the full ISO 42001 explainer
              </Link>
              .
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Governance platforms */}
      <Section
        background="sand"
        eyebrow="Tools and platforms"
        title="What governance software typically covers"
        containerSize="md"
      >
        <div className="space-y-5 text-ink/90 leading-relaxed">
          <RevealOnScroll>
            <p>
              A number of commercial AI governance platforms have emerged to help organisations
              manage AI Act obligations at scale. These tools vary widely in scope - from inventory
              registers to full lifecycle compliance suites - but common feature clusters include:
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <ul className="space-y-3">
              {[
                {
                  name: 'Use-case / system register',
                  detail: 'A central catalogue of every AI system in use, with metadata (purpose, vendor, risk tier, owner, data processed).'
                },
                {
                  name: 'Risk classification workflow',
                  detail: 'Guided questionnaires to classify each system against the Act\'s tiers, with rationale recorded for audit.'
                },
                {
                  name: 'Documentation management',
                  detail: 'Templates and version control for technical documentation, instructions for use, and conformity declarations.'
                },
                {
                  name: 'Oversight assignment',
                  detail: 'Role mapping - who is responsible for each system, whether they are trained, and when reviews are due.'
                },
                {
                  name: 'Monitoring and alerting',
                  detail: 'Integration with system logs or performance metrics to surface anomalies and support the deployer\'s incident-reporting duties.'
                },
                {
                  name: 'AI literacy tracking',
                  detail: 'Evidence that staff and operators have completed tailored training, supporting the Article 4 duty.'
                }
              ].map((item, i) => (
                <li key={item.name} className="flex gap-3 rounded-card border border-line bg-card p-4">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <strong className="font-semibold text-ink">{item.name}:</strong>{' '}
                    <span className="text-ink/85">{item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <p className="text-sm text-muted">
              AI Act Navigator does not endorse or review specific vendor products. The{' '}
              <Link href="/ai-inventory" className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid">
                AI System Inventory template
              </Link>{' '}
              gives you a spreadsheet-based starting point that covers the register and risk-tier
              columns; you can migrate to a dedicated platform as your needs grow.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* CTA + cross-links */}
      <Section background="paper" containerSize="md">
        <div className="rounded-card border border-line bg-card p-6 lg:p-8">
          <h3 className="font-display font-semibold text-xl text-ink">Start with the inventory</h3>
          <p className="mt-3 text-ink/85 leading-relaxed">
            The AI System Inventory template is a free spreadsheet register for every AI system
            your organisation uses - with columns for risk tier, role (provider / deployer), owner,
            data processed, and compliance status. The practical first step to AI governance.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button as="a" href="/ai-inventory" variant="primary">
              Get the AI System Inventory template
            </Button>
            <Button as="a" href="/checklist" variant="secondary">
              AI Act Readiness Checklist
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            href="/risk-classifier"
            className="rounded-card border border-line bg-card p-5 transition-[border-color] hover:border-accent"
          >
            <p className="font-display font-semibold text-ink">Risk-tier classifier</p>
            <p className="mt-1 text-sm text-muted">Answer questions and get the risk tier for your AI system.</p>
          </Link>
          <Link
            href="/obligations"
            className="rounded-card border border-line bg-card p-5 transition-[border-color] hover:border-accent"
          >
            <p className="font-display font-semibold text-ink">Obligations tool</p>
            <p className="mt-1 text-sm text-muted">Your specific obligations as a provider or deployer.</p>
          </Link>
          <Link
            href="/iso-42001"
            className="rounded-card border border-line bg-card p-5 transition-[border-color] hover:border-accent"
          >
            <p className="font-display font-semibold text-ink">ISO/IEC 42001</p>
            <p className="mt-1 text-sm text-muted">What ISO 42001 covers and what it does not.</p>
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted leading-relaxed">
          This is guidance to help you understand AI governance under the EU AI Act, not legal
          advice. For decisions specific to your organisation, confirm with the official sources
          we link or a qualified adviser. Last updated: 9 June 2026.
        </p>

        <Sources
          items={[
            {
              href: SRC.eurlex,
              label: 'Regulation (EU) 2024/1689 (EU AI Act), EUR-Lex',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.art9,
              label: 'AI Act, Article 9 - Risk management system',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.art17,
              label: 'AI Act, Article 17 - Quality management system',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.art26,
              label: 'AI Act, Article 26 - Obligations of deployers',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.art27,
              label: 'AI Act, Article 27 - Fundamental Rights Impact Assessment',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.art4,
              label: 'AI Act, Article 4 - AI literacy (in force 2 Feb 2025)',
              retrieved: '9 Jun 2026'
            }
          ]}
        />
      </Section>

      <NewsletterSignup variant="band" />
    </>
  );
}
