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
  RevealOnScroll,
  ContourBackground,
  Icon
} from '@/components/ui';
import { webPage, breadcrumb } from '@/lib/schema';
import { PackForm } from './PackForm';

const SITE = 'https://aiact-navigator.com';
const PUBLISHED = '2026-06-09';
const MODIFIED = '2026-06-09';

const SRC = {
  eurlex:   'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
  art9:     'https://artificialintelligenceact.eu/article/9/',
  art17:    'https://artificialintelligenceact.eu/article/17/',
  art26:    'https://artificialintelligenceact.eu/article/26/',
  art6:     'https://artificialintelligenceact.eu/article/6/',
  art3:     'https://artificialintelligenceact.eu/article/3/'
};

const CSV_HREF = '/downloads/ai-system-inventory-template.csv';

const COLUMNS = [
  { col: 'system_id', desc: 'A unique identifier for the AI system in your register.' },
  { col: 'system_name', desc: 'The commercial or internal name of the system.' },
  { col: 'vendor', desc: 'The provider of the system (internal if built in-house).' },
  { col: 'role', desc: 'Your organisation\'s role: Provider, Deployer, Both, or Other.' },
  { col: 'intended_purpose', desc: 'What the system does in your context, in plain English.' },
  { col: 'risk_tier', desc: 'Prohibited / High-risk / Limited-transparency / Minimal - after applying the risk classifier.' },
  { col: 'annex_iii_area', desc: 'If high-risk under Annex III, which of the 8 use-case areas applies.' },
  { col: 'owner', desc: 'The person in your organisation responsible for this system.' },
  { col: 'data_processed', desc: 'Types of personal or sensitive data the system handles.' },
  { col: 'human_oversight_assigned', desc: 'Yes / No - whether a trained oversight person is assigned.' },
  { col: 'literacy_training_done', desc: 'Yes / No - whether AI literacy training is documented for users of this system.' },
  { col: 'compliance_status', desc: 'Your current compliance status: Not started / In progress / Compliant / Under review.' },
  { col: 'notes', desc: 'Anything else relevant: deadlines, open gaps, linked documentation.' }
];

const FAQ = [
  {
    q: 'Do I have to use a spreadsheet? Can I use a dedicated tool?',
    a: 'The AI Act does not prescribe a format for your AI inventory. A spreadsheet works well for smaller organisations or as a starting point. Larger organisations with many AI systems typically migrate to a dedicated governance platform that provides workflow, role management, and integration with other compliance systems. The template here gives you the columns you need; you can export them into any system later.'
  },
  {
    q: 'Which AI systems should I include?',
    a: 'Include every AI system your organisation develops, places on the market, or uses under its authority in a professional context - including systems provided by third-party vendors. Start with the systems that clearly fall within the AI Act\'s scope (see Article 2), then work through the borderline cases. If in doubt, include it: an over-inclusive inventory is easier to trim than an incomplete one. The risk classifier tool can help you determine the tier for each system.'
  },
  {
    q: 'We use many AI features embedded in SaaS products. Do they all count?',
    a: "Potentially, yes. When a SaaS product you use in a professional context includes AI features - an AI assistant, an automated scoring or ranking function, AI-generated suggestions - you are likely a deployer of those AI systems. Article 26 deployer obligations apply to each. In practice, triage by risk: AI features that clearly fall in the minimal-risk tier need much less governance attention than those that could be high-risk. The inventory helps you see the whole picture at once."
  },
  {
    q: 'Is an AI inventory a legal requirement?',
    a: "There is no Article that says 'you must maintain an AI inventory.' However, the combination of obligations - risk management (Art. 9), quality management (Art. 17), human oversight assignment (Art. 26), AI literacy documentation (Art. 4), and the ability to cooperate with national authorities (Art. 21 / 26) - effectively requires you to know exactly which AI systems you use, their risk tier, and their governance status. An inventory is the practical instrument for meeting those overlapping obligations and demonstrating compliance."
  }
];

export const metadata: Metadata = {
  title: 'AI System Inventory Template (Free CSV) | AI Act Navigator',
  description:
    'A free CSV template for registering every AI system your organisation uses under the EU AI Act - with columns for risk tier, role, owner, oversight, and compliance status.',
  alternates: { canonical: '/ai-inventory' },
  openGraph: {
    title: 'AI System Inventory Template (Free CSV) - EU AI Act',
    description:
      'Register every AI system your organisation uses, classify its risk tier, and track compliance status. Free template, no login required.',
    url: `${SITE}/ai-inventory`,
    type: 'article'
  }
};

export default function AIInventoryPage() {
  const howToSteps = [
    {
      name: 'List every AI system you use or provide',
      text: 'Work through each business function and list every AI system in use - from your own products to embedded AI in SaaS tools. If in doubt, include it.'
    },
    {
      name: 'Classify the risk tier',
      text: 'For each system, run through the AI Act risk classification: prohibited, high-risk (Annex I or Annex III), limited/transparency risk, or minimal risk. Use the risk classifier tool to help.'
    },
    {
      name: 'Record the role, owner, and data',
      text: 'Is your organisation the provider, the deployer, or both? Who owns the system? What data does it process? These columns determine your obligations.'
    },
    {
      name: 'Assign oversight and literacy status',
      text: 'For each system, note whether a trained human oversight person is assigned and whether AI literacy training is documented for the users of that system.'
    },
    {
      name: 'Track and review',
      text: 'Mark the compliance status and keep the register updated as you adopt new systems, as the rules change, and as systems are retired.'
    }
  ];

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to build an AI System Inventory for the EU AI Act',
            description:
              'Register every AI system your organisation uses under the EU AI Act, classify its risk tier, and track compliance status.',
            datePublished: PUBLISHED,
            dateModified: MODIFIED,
            step: howToSteps.map((s, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: s.name,
              text: s.text
            }))
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a }
            }))
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
              { '@type': 'ListItem', position: 2, name: 'AI System Inventory Template', item: `${SITE}/ai-inventory` }
            ]
          },
          webPage({
            name: 'AI System Inventory Template (Free CSV)',
            path: '/ai-inventory',
            description:
              'A free CSV template for registering every AI system your organisation uses under the EU AI Act - with columns for risk tier, role, owner, oversight, and compliance status.'
          }),
          breadcrumb([{ name: 'AI System Inventory', path: '/ai-inventory' }])
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container size="md" className="relative z-10 py-16 lg:py-24">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Free template
          </p>
          <h1 className="mt-4 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            AI System Inventory Template
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            You cannot classify risk, assign oversight, or demonstrate compliance for AI systems
            you have not catalogued. This free CSV template gives you the columns to register
            every AI system your organisation develops or uses - with risk tier, role, owner,
            oversight assignment, and compliance status. The practical first step to EU AI Act
            compliance.
          </p>
        </Container>
      </section>

      {/* TL;DR */}
      <Section background="sand" containerSize="md">
        <RevealOnScroll>
          <TLDR>
            An <strong>AI system inventory</strong> is a register of every AI system your
            organisation develops or uses. For each system: record its{' '}
            <strong>intended purpose</strong>, your <strong>role</strong> (provider or deployer),
            its <strong>risk tier</strong>, the <strong>owner</strong>, and the{' '}
            <strong>compliance status</strong>. Required as a practical matter by overlapping
            obligations under Arts.{' '}
            <SourceCite href={SRC.art9}>9 (risk management)</SourceCite>,{' '}
            <SourceCite href={SRC.art17}>17 (quality management)</SourceCite>, and{' '}
            <SourceCite href={SRC.art26}>26 (deployer obligations)</SourceCite>.
          </TLDR>
        </RevealOnScroll>
      </Section>

      {/* Why an inventory */}
      <Section background="paper" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="inventory_2" className="text-primary text-3xl" />
          Why you need an AI inventory
        </h2>
        <div className="mt-10">
          <RevealOnScroll>
            <div className="space-y-4 text-ink/90 leading-relaxed">
              <p>
                The EU AI Act creates obligations that depend on knowing what AI systems you use,
                what they do, and what risk tier they fall in. Without a register, you cannot:
              </p>
              <ul className="space-y-3">
                {[
                  'Determine which systems are high-risk and therefore subject to the most demanding obligations.',
                  'Assign human oversight to the right systems (Art. 14 for providers, Art. 26 for deployers).',
                  'Demonstrate that AI literacy training covers every system and role that uses AI (Art. 4).',
                  'Respond to a regulator\'s request for information about your AI systems (Art. 21 / 26).',
                  'Track compliance progress and identify gaps before a deadline.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Callout variant="info" title="Most organisations are deployers">
                If you buy AI from a vendor and use it in your business, you are a{' '}
                <strong>deployer</strong>. Article 26 deployer obligations apply even when you did
                not build the system. An inventory is how you track all the systems you deploy
                and the obligations that come with each.{' '}
                <SourceCite href={SRC.art3}>Art. 3 - Definitions (provider / deployer)</SourceCite>
              </Callout>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Template columns */}
      <Section background="sand" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="table_view" className="text-primary text-3xl" />
          Template columns explained
        </h2>
        <RevealOnScroll>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-line">
                  <th className="pb-3 pr-6 text-left font-display font-semibold text-ink">Column</th>
                  <th className="pb-3 text-left font-display font-semibold text-ink">What to put in it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {COLUMNS.map((col) => (
                  <tr key={col.col} className="text-ink/85">
                    <td className="py-3 pr-6 font-mono text-xs">{col.col}</td>
                    <td className="py-3">{col.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealOnScroll>
      </Section>

      {/* How to use it */}
      <Section background="paper" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="checklist" className="text-primary text-3xl" />
          How to fill in the inventory
        </h2>
        <div className="mt-10">
          <ol className="space-y-4">
            {howToSteps.map((s, i) => (
              <RevealOnScroll key={s.name} delay={i}>
                <li className="flex gap-4 rounded-card border border-line bg-card p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-chip bg-primary font-mono text-sm font-semibold text-paper">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-lg text-ink">{s.name}</p>
                    <p className="mt-1 text-ink/85 leading-relaxed">{s.text}</p>
                  </div>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </Section>

      {/* Download (gated via PackForm) */}
      <Section background="sand" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="download" className="text-primary text-3xl" />
          Download the template
        </h2>
        <div className="mt-10">
          <RevealOnScroll>
            <PackForm />
          </RevealOnScroll>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="paper" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="help" className="text-primary text-3xl" />
          Questions about the AI inventory
        </h2>
        <div className="mt-10 space-y-6">
          {FAQ.map((f, i) => (
            <RevealOnScroll key={f.q} delay={i}>
              <div className="rounded-card border border-line bg-card p-6">
                <h3 className="font-display font-semibold text-xl text-ink">{f.q}</h3>
                <p className="mt-3 text-ink/90 leading-relaxed">{f.a}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* Cross-links */}
      <Section background="ink" containerSize="md">
        <h2 className="font-display font-semibold text-3xl lg:text-4xl leading-tight text-paper">
          Keep going
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/risk-classifier"
            className="rounded-card border border-paper/20 bg-paper/5 p-5 transition-colors hover:border-accent"
          >
            <p className="font-display font-semibold text-lg text-paper">Risk-tier classifier</p>
            <p className="mt-1 text-sm text-paper/80">
              Determine the risk tier for each system in your inventory.
            </p>
          </Link>
          <Link
            href="/ai-governance"
            className="rounded-card border border-paper/20 bg-paper/5 p-5 transition-colors hover:border-accent"
          >
            <p className="font-display font-semibold text-lg text-paper">AI governance framework</p>
            <p className="mt-1 text-sm text-paper/80">
              From inventory to full governance - the six pillars mapped to AI Act obligations.
            </p>
          </Link>
          <Link
            href="/obligations"
            className="rounded-card border border-paper/20 bg-paper/5 p-5 transition-colors hover:border-accent"
          >
            <p className="font-display font-semibold text-lg text-paper">Obligations tool</p>
            <p className="mt-1 text-sm text-paper/80">
              Your specific obligations as provider or deployer for each risk tier.
            </p>
          </Link>
          <Link
            href="/checklist"
            className="rounded-card border border-paper/20 bg-paper/5 p-5 transition-colors hover:border-accent"
          >
            <p className="font-display font-semibold text-lg text-paper">Readiness checklist</p>
            <p className="mt-1 text-sm text-paper/80">
              Every step to get AI Act-ready, in one free PDF.
            </p>
          </Link>
        </div>
        <p className="mt-8">
          <Button as="a" href="/checklist" variant="primary">
            Get the free Readiness Checklist
          </Button>
        </p>
      </Section>

      {/* Sources */}
      <Section background="paper" containerSize="md">
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
              label: 'AI Act, Article 26 - Obligations of deployers of high-risk AI systems',
              retrieved: '9 Jun 2026'
            },
            {
              href: SRC.art6,
              label: 'AI Act, Article 6 - Classification rules for high-risk AI systems',
              retrieved: '9 Jun 2026'
            }
          ]}
        />
        <p className="mt-8 text-sm text-muted leading-relaxed">
          This is guidance to help you understand the EU AI Act, not legal advice. For decisions
          specific to your organisation, confirm with the official sources we link or a qualified
          adviser. Last updated: 9 June 2026.
        </p>
      </Section>
    </>
  );
}
