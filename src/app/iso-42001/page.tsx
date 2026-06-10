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
const CANONICAL = `${SITE}/iso-42001`;

// Canonical sources (research §9, Art. 40)
const SRC = {
  eurlex:     'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
  art40:      'https://artificialintelligenceact.eu/article/40/',
  stdRequest: 'https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence',
  iso42001:   'https://www.isms.online/frameworks/iso-42001/iso-42001-harmonised-standards-eu-ai-act-presumption-of-conformity/',
  dlaPiper:   'https://www.dlapiper.com/en/insights/publications/2024/01/the-role-of-harmonised-standards-as-tools-for-ai-act-compliance',
  aLign:      'https://www.a-lign.com/articles/preparing-for-eu-ai-act-compliance'
};

export const metadata: Metadata = {
  title: 'ISO/IEC 42001 and the EU AI Act: What It Covers and What It Does Not',
  description:
    'ISO/IEC 42001 is a certifiable AI Management System standard - but it is not an EU harmonised standard and gives no automatic presumption of conformity with the AI Act. Plain-English explainer.',
  alternates: { canonical: '/iso-42001' },
  openGraph: {
    title: 'ISO/IEC 42001 and the EU AI Act',
    description:
      'What ISO 42001 is, why it is a strong governance head-start but not a compliance shield, and how harmonised standards (prEN 18286) map to AI Act obligations.',
    url: CANONICAL,
    type: 'article'
  }
};

const FAQ = [
  {
    q: 'Does ISO/IEC 42001 certification mean I comply with the EU AI Act?',
    a: 'No. ISO/IEC 42001 is an international standard, not a harmonised European standard. It carries no Annex ZA mapping and therefore confers no automatic "presumption of conformity" under Article 40 of the AI Act. That presumption comes only from following harmonised standards whose references are published in the EU Official Journal (OJEU). That said, ISO 42001 certification shows strong governance maturity, and its controls map closely to the harmonised standards being drafted by CEN-CENELEC, so certified organisations are well-positioned to make the step to full conformity once harmonised standards land.'
  },
  {
    q: 'What is the "presumption of conformity" under Article 40?',
    a: 'Article 40 of the AI Act says that an AI system that fully or partly complies with harmonised standards whose references have been published in the Official Journal of the EU is presumed to comply with the corresponding AI Act requirements. This is a legal shortcut: follow the standard, and regulators presume you meet the relevant obligations without further proof. No harmonised AI Act standards have yet been published in the OJEU (as of June 2026), so no presumption of conformity is currently available from any standard.'
  },
  {
    q: 'What is CEN-CENELEC JTC 21 working on?',
    a: 'CEN-CENELEC Joint Technical Committee 21 is developing a family of harmonised AI standards under a European Commission standardisation request issued in May 2023. The work covers approximately 10 areas including risk management, data governance, record-keeping, transparency, human oversight, accuracy, robustness, cybersecurity, quality management, and conformity assessment. The draft prEN 18286 (AI management system) is the most directly relevant to ISO 42001, as it maps closely to 42001 controls - meaning organisations with an existing ISO 42001 implementation can largely reuse those controls once prEN 18286 is finalised and published in the OJEU.'
  },
  {
    q: 'Does ISO/IEC 42001 apply to GPAI models?',
    a: "ISO/IEC 42001 covers AI systems and related governance processes broadly. It addresses the lifecycle of AI from development through deployment and monitoring. For general-purpose AI (GPAI) model providers, the AI Act's Chapter V obligations (technical documentation, copyright policy, training data summary, and - for systemic risk - adversarial testing and incident reporting) go beyond what a management system standard covers. GPAI providers should address those specific obligations directly, with or without ISO 42001 certification."
  },
  {
    q: 'Should I pursue ISO/IEC 42001 certification now or wait for harmonised standards?',
    a: 'The two are not mutually exclusive. ISO 42001 certification now gives you a structured governance framework, documented risk management processes, trained staff, and an auditable record that shows regulators you take AI governance seriously. When harmonised standards arrive, your certified controls will give you a significant head start. The risk of waiting is that AI Act obligations are already in force for some categories (AI literacy and prohibited practices from 2 February 2025; GPAI and penalties from 2 August 2025) and a governance framework is useful regardless of which standard it is anchored to.'
  }
];

export default function ISO42001Page() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a }
            }))
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
              { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE}/tools` },
              { '@type': 'ListItem', position: 3, name: 'ISO/IEC 42001', item: CANONICAL }
            ]
          },
          webPage({
            name: 'ISO/IEC 42001 and the EU AI Act: What It Covers and What It Does Not',
            path: '/iso-42001',
            description:
              'ISO/IEC 42001 is a certifiable AI Management System standard - but it is not an EU harmonised standard and gives no automatic presumption of conformity with the AI Act. Plain-English explainer.'
          }),
          breadcrumb([{ name: 'ISO/IEC 42001', path: '/iso-42001' }])
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container className="relative z-10 py-16 lg:py-24" size="md">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            AI governance standards
          </p>
          <h1 className="mt-4 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            ISO/IEC 42001 and the EU AI Act
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            ISO/IEC 42001 is the international certifiable standard for an AI Management System.
            It is widely adopted as a governance baseline and maps closely to EU AI Act controls.
            But there is a critical legal nuance: on its own, ISO 42001 does{' '}
            <strong>not</strong> give a presumption of conformity with the AI Act.
            Understanding the difference could save you from overconfidence - or unnecessary work.
          </p>

          <div className="mt-8">
            <Callout variant="warn" title="Key legal nuance">
              ISO/IEC 42001 is an <strong>international</strong> standard. It is not a harmonised
              European standard under the AI Act and carries no Annex ZA mapping.
              The legal <strong>presumption of conformity</strong> (Art. 40) comes only from
              harmonised standards published in the EU Official Journal - which are still being
              developed by CEN-CENELEC (JTC 21).{' '}
              <SourceCite href={SRC.iso42001}>
                ISO 42001 and harmonised standards analysis
              </SourceCite>
            </Callout>
          </div>
        </Container>
      </section>

      {/* TL;DR */}
      <Section background="sand" containerSize="md">
        <RevealOnScroll>
          <TLDR title="In short">
            ISO/IEC 42001 is a{' '}
            <strong>strong governance head-start</strong>, not a compliance shield.
            Certified controls will map closely to the EU&apos;s harmonised standards once they land
            (draft prEN 18286 is the most relevant). Until harmonised standards are published in
            the Official Journal, no standard gives automatic legal presumption of conformity with
            the AI Act.{' '}
            <SourceCite href={SRC.art40}>
              AI Act Art. 40
            </SourceCite>
          </TLDR>
        </RevealOnScroll>
      </Section>

      {/* What ISO 42001 is */}
      <Section
        background="paper"
        eyebrow="The standard explained"
        title="What ISO/IEC 42001 actually is"
        containerSize="md"
      >
        <div className="space-y-5 text-ink/90 leading-relaxed">
          <RevealOnScroll>
            <p>
              ISO/IEC 42001:2023 is an international standard for an{' '}
              <strong>AI Management System (AIMS)</strong>. It follows the Plan-Do-Check-Act
              (PDCA) governance cycle familiar from ISO 27001 (information security) and ISO 9001
              (quality). It is designed for any organisation that develops, provides, or uses AI
              systems, regardless of size, sector, or whether those systems are high-risk under the
              AI Act.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  label: 'What it governs',
                  text: 'Policies, roles, processes, risk management, data governance, transparency, human oversight, post-deployment monitoring, and continual improvement for AI systems across their lifecycle.'
                },
                {
                  label: 'Who can use it',
                  text: 'Any organisation - AI provider, deployer, importer or distributor - regardless of size or sector. Particularly useful for deployers that use multiple third-party AI tools and need a unified governance framework.'
                },
                {
                  label: 'Certification',
                  text: 'Organisations can be independently certified by an accredited auditor, giving them a recognised third-party attestation of their AI governance maturity - useful for customer assurance, procurement, and regulatory conversations.'
                },
                {
                  label: 'Relationship to ISO 27001',
                  text: 'ISO 42001 was designed to be integrated with ISO 27001 and ISO 9001. Organisations already certified under 27001 will find many controls familiar; the addition covers AI-specific risks, impact assessments, and use-case governance.'
                }
              ].map((item, i) => (
                <RevealOnScroll key={item.label} delay={i}>
                  <div className="rounded-card border border-line bg-card p-5">
                    <p className="font-display font-semibold text-lg text-ink">{item.label}</p>
                    <p className="mt-2 text-ink/85">{item.text}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* The legal gap */}
      <Section
        background="sand"
        eyebrow="The critical distinction"
        title="International standard vs harmonised standard"
        containerSize="md"
      >
        <div className="space-y-6 text-ink/90 leading-relaxed">
          <RevealOnScroll>
            <p>
              In EU law, a{' '}
              <strong>harmonised standard</strong> is a European standard (EN) developed by a
              recognised European body (CEN, CENELEC, or ETSI) under a European Commission
              standardisation request, whose reference is then published in the{' '}
              <strong>Official Journal of the EU (OJEU)</strong>. Following a harmonised standard
              gives the manufacturer a legal presumption that the corresponding regulatory
              requirements are met - a major practical advantage in conformity assessments.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p>
              ISO/IEC 42001 is published by ISO and IEC - international bodies. It is{' '}
              <strong>not</strong> a European standard and has{' '}
              <strong>no Annex ZA</strong> (the annex that maps a European standard&apos;s clauses
              to specific regulatory requirements). Therefore, holding an ISO 42001 certificate
              does not trigger Article 40&apos;s presumption of conformity.{' '}
              <SourceCite href={SRC.iso42001}>ISO 42001 and harmonised standards</SourceCite>
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <Callout variant="info" title="Article 40 - Presumption of conformity">
              &ldquo;AI systems that are in conformity with harmonised standards or parts thereof the
              references of which have been published in the Official Journal of the European Union
              shall be presumed to be in conformity with the requirements of this Regulation covered
              by those standards&hellip;&rdquo;{' '}
              <SourceCite href={SRC.art40}>Regulation (EU) 2024/1689, Art. 40</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>
      </Section>

      {/* CEN-CENELEC and the path to conformity */}
      <Section
        background="paper"
        eyebrow="The harmonised standards path"
        title="CEN-CENELEC JTC 21 and prEN 18286"
        containerSize="md"
      >
        <div className="space-y-5 text-ink/90 leading-relaxed">
          <RevealOnScroll>
            <p>
              The European Commission issued a{' '}
              <strong>standardisation request in May 2023</strong> to CEN-CENELEC to develop the
              harmonised AI Act standards. Joint Technical Committee 21 (JTC 21) is working on
              approximately 10 standards covering the main AI Act obligation clusters: risk
              management, data governance, record-keeping, transparency, human oversight, accuracy,
              robustness, cybersecurity, quality management, and conformity assessment.{' '}
              <SourceCite href={SRC.stdRequest}>EC standardisation request</SourceCite>
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p>
              The draft standard most relevant to ISO 42001 users is{' '}
              <strong>prEN 18286 (AI management system)</strong>. It maps closely to ISO/IEC 42001
              controls - meaning that organisations already certified to ISO 42001 will be able to
              largely <strong>reuse their existing controls</strong> once prEN 18286 is finalised
              and its reference published in the OJEU.{' '}
              <SourceCite href={SRC.dlaPiper}>DLA Piper: harmonised standards analysis</SourceCite>
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <Callout variant="info" title="Practical implication">
              ISO 42001 today is the best available governance framework and will likely be the
              fastest path to future harmonised standard conformity. It is not, however, a
              substitute for conformity with the harmonised standards once those arrive. Plan now;
              certify under ISO 42001; then transition to harmonised standard compliance as the
              OJEU references land.
            </Callout>
          </RevealOnScroll>
        </div>
      </Section>

      {/* What ISO 42001 covers vs what AI Act requires */}
      <Section
        background="sand"
        eyebrow="Mapping the overlap"
        title="ISO 42001 controls vs AI Act obligations"
        containerSize="md"
      >
        <RevealOnScroll>
          <p className="text-ink/90 leading-relaxed">
            The table below shows how ISO 42001&apos;s main clause areas align with AI Act
            obligation clusters, and where gaps remain:
          </p>
        </RevealOnScroll>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-line">
                <th className="pb-3 pr-6 text-left font-display font-semibold text-ink">ISO 42001 clause area</th>
                <th className="pb-3 pr-6 text-left font-display font-semibold text-ink">Relevant AI Act obligation</th>
                <th className="pb-3 text-left font-display font-semibold text-ink">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ['Risk management (Clause 6, Annex A)', 'Art. 9 - Risk management system', 'Strong overlap'],
                ['Data governance (Annex A.7)', 'Art. 10 - Data and data governance', 'Good baseline'],
                ['Documentation / records (Clauses 7-8)', 'Art. 11-12 - Technical documentation, logging', 'Partial - AI Act is more prescriptive'],
                ['Transparency (Annex A.6)', 'Art. 13 - Transparency to deployers', 'Partial'],
                ['Human oversight (Annex A.6)', 'Art. 14 - Human oversight design', 'Partial'],
                ['Quality management (Clause 10)', 'Art. 17 - Quality management system', 'Strong overlap'],
                ['Impact assessment (Annex A.5)', 'Art. 27 - Fundamental Rights Impact Assessment (FRIA)', 'Good starting point'],
                ['n/a', 'Art. 43 - Conformity assessment; CE marking (Art. 48)', 'Not covered - separate process'],
                ['n/a', 'Art. 53-55 - GPAI model documentation, copyright policy', 'Not covered - model-specific']
              ].map(([col1, col2, col3], i) => (
                <tr key={i} className="text-ink/85">
                  <td className="py-3 pr-6 font-mono text-xs">{col1}</td>
                  <td className="py-3 pr-6">{col2}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center rounded-chip px-2 py-0.5 font-mono text-xs ${
                      col3.startsWith('Strong') ? 'bg-low text-primary' :
                      col3.startsWith('Good') ? 'bg-low text-primary/80' :
                      col3.startsWith('Partial') ? 'bg-sand-tint text-muted' :
                      'bg-paper border border-line text-muted'
                    }`}>
                      {col3}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-muted">
          Coverage ratings are indicative. The actual gap analysis for your organisation depends on
          your AI system types, risk tier, and role (provider vs deployer).
        </p>
      </Section>

      {/* FAQ */}
      <Section background="paper" title="Questions about ISO 42001 and the AI Act" containerSize="md">
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <RevealOnScroll key={item.q} delay={i}>
              <details className="group rounded-card border border-line bg-card p-5 lg:p-6">
                <summary className="cursor-pointer list-none font-display font-semibold text-lg text-ink marker:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent-deep transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-open:rotate-45"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-ink/85 leading-relaxed">{item.a}</p>
              </details>
            </RevealOnScroll>
          ))}
        </div>

        {/* Cross-links + primary CTA */}
        <div className="mt-10 rounded-card border border-line bg-card p-6 lg:p-8">
          <h3 className="font-display font-semibold text-xl text-ink">Next steps</h3>
          <ul className="mt-4 space-y-2 text-ink/85">
            <li>
              Want a full AI Act governance framework?{' '}
              <Link
                href="/ai-governance"
                className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
              >
                Read the AI Governance guide
              </Link>
              .
            </li>
            <li>
              Need to know which obligations apply to you?{' '}
              <Link
                href="/obligations"
                className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
              >
                Use the Provider vs Deployer obligations tool
              </Link>
              .
            </li>
            <li>
              New to the AI Act?{' '}
              <Link
                href="/ai-act"
                className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
              >
                Start with the AI Act overview
              </Link>
              .
            </li>
          </ul>
          <div className="mt-6">
            <Button as="a" href="/checklist" variant="primary">
              Get the AI Act Readiness Checklist
            </Button>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted leading-relaxed">
          This is guidance to help you understand ISO/IEC 42001 and the EU AI Act, not legal or
          certification advice. For decisions specific to your organisation, consult the official
          sources we link or a qualified adviser. Last updated: 9 June 2026.
        </p>

        <Sources
          items={[
            {
              href: SRC.eurlex,
              label: 'Regulation (EU) 2024/1689 (AI Act), EUR-Lex',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.art40,
              label: 'AI Act, Article 40 - Harmonised standards and presumption of conformity',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.stdRequest,
              label: 'European Commission, standardisation request to CEN-CENELEC (May 2023)',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.iso42001,
              label: 'Analysis: ISO 42001 and harmonised standards under the EU AI Act',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.dlaPiper,
              label: 'DLA Piper: The role of harmonised standards as tools for AI Act compliance',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.aLign,
              label: 'A-LIGN: Preparing for EU AI Act compliance',
              retrieved: '9 Jun 2026'
            }
          ]}
        />
      </Section>

      <NewsletterSignup variant="band" />
    </>
  );
}
