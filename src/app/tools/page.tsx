import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Container,
  Section,
  RevealOnScroll,
  JsonLd,
  NewsletterSignup
} from '@/components/ui';
import { webPage } from '@/lib/schema';

const PAGE_URL = 'https://aiact-navigator.com/tools';

export const metadata: Metadata = {
  title: 'EU AI Act Tools, Templates & Resources | AI Act Navigator',
  description:
    'Free EU AI Act tools: risk-tier classifier, obligations checker, high-risk use case list, AI system inventory, readiness checklist, governance guides, ISO 42001 explainer, and more.',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Free EU AI Act tools and resources',
    description:
      'Risk classifier, obligations checker, AI inventory template, readiness checklist, governance guides, and a plain-English glossary - all free.',
    url: PAGE_URL,
    type: 'website'
  }
};

// ---- SVG glyphs ----------------------------------------------------------------

function CompassGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.3 5.2-5.2 2.3 2.3-5.2 5.2-2.3Z" />
    </svg>
  );
}

function ShieldGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  );
}

function ListGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5h11M9 12h11M9 19h11M3 5h.01M3 12h.01M3 19h.01" />
    </svg>
  );
}

function TableGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  );
}

function ChecklistGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5h11M9 12h11M9 19h11" />
      <path d="m3 5 1.4 1.4L7 4" />
      <path d="m3 12 1.4 1.4L7 11" />
      <path d="m3 19 1.4 1.4L7 18" />
    </svg>
  );
}

function BookGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </svg>
  );
}

function ContourGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7c4-3 14-3 18 0" />
      <path d="M5 12c3.5-2.4 10.5-2.4 14 0" />
      <path d="M7 17c2.8-1.8 7.2-1.8 10 0" />
    </svg>
  );
}

function CertGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M8 14v7l4-2 4 2v-7" />
    </svg>
  );
}

function PeopleGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary transition-colors group-hover:text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

type Tool = {
  title: string;
  value: string;
  href: string;
  glyph: ReactNode;
  badge?: string;
};

const TOOLS: Tool[] = [
  {
    title: 'Risk-Tier Classifier',
    value:
      'Answer a few questions and get the AI Act risk tier for your system - prohibited, high-risk, limited-transparency, or minimal - with tailored next steps.',
    href: '/risk-classifier',
    glyph: <CompassGlyph />
  },
  {
    title: 'Provider vs Deployer Obligations',
    value:
      'Tell us your role and risk tier and get a plain-English breakdown of every obligation that applies to you, with the relevant articles.',
    href: '/obligations',
    glyph: <ListGlyph />
  },
  {
    title: 'High-Risk AI Use Cases (Annex III)',
    value:
      'The full list of 8 high-risk use-case areas under Annex III - biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration, and justice.',
    href: '/high-risk',
    glyph: <ShieldGlyph />
  },
  {
    title: 'AI System Inventory Template',
    value:
      'A free CSV to register every AI system your organisation uses: risk tier, role, owner, oversight assignment, and compliance status. The first step to governance.',
    href: '/ai-inventory',
    glyph: <TableGlyph />,
    badge: 'Free CSV'
  },
  {
    title: 'AI Act Readiness Checklist',
    value:
      'A plain-English checklist from "what is this?" to documented compliance. Covers providers, deployers, GPAI, and SMEs - with the deadlines that are already in force.',
    href: '/checklist',
    glyph: <ChecklistGlyph />,
    badge: 'Free PDF'
  },
  {
    title: 'AI Governance Framework',
    value:
      'How to build an AI governance framework mapped to AI Act obligations: inventory, risk classification, documentation, human oversight, AI literacy, and monitoring.',
    href: '/ai-governance',
    glyph: <ContourGlyph />
  },
  {
    title: 'ISO/IEC 42001 and the AI Act',
    value:
      'What ISO 42001 covers, why it is a strong head-start but not a legal compliance shield, and how it relates to the harmonised standards being developed by CEN-CENELEC.',
    href: '/iso-42001',
    glyph: <CertGlyph />
  },
  {
    title: 'AI Literacy Training (Article 4)',
    value:
      'The Article 4 AI literacy duty in plain English: what it requires, who it applies to (including non-EU entities), and how to build and document a tailored programme.',
    href: '/ai-literacy',
    glyph: <PeopleGlyph />,
    badge: 'In force 2 Feb 2025'
  },
  {
    title: 'AI Act Glossary',
    value:
      'Every AI Act term in plain English: provider, deployer, GPAI, systemic risk, Annex III, conformity assessment, CE marking, AI Office, FRIA, regulatory sandbox, and more.',
    href: '/glossary',
    glyph: <BookGlyph />
  },
  {
    title: 'AI Act Timeline',
    value:
      'The confirmed application dates - 2 Feb 2025, 2 Aug 2025, 2 Aug 2026, 2 Aug 2027 - and the proposed Digital Omnibus changes, clearly marked as proposed-not-yet-law.',
    href: '/timeline',
    glyph: <ContourGlyph />
  },
  {
    title: 'Topics Guide',
    value:
      'In-depth guides on specific AI Act topics: GPAI models, prohibited practices, penalties, conformity assessment, the EU AI Office, and more.',
    href: '/topics',
    glyph: <BookGlyph />
  }
];

export default function ToolsPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free EU AI Act tools and templates',
    url: PAGE_URL,
    itemListElement: TOOLS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.title,
      url: `https://aiact-navigator.com${t.href}`
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aiact-navigator.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: PAGE_URL
      }
    ]
  };

  return (
    <>
      <JsonLd
        data={[
          itemListSchema,
          breadcrumbSchema,
          webPage({
            name: 'EU AI Act Tools, Templates & Resources',
            path: '/tools',
            description:
              'Free EU AI Act tools: risk-tier classifier, obligations checker, high-risk use case list, AI system inventory, readiness checklist, governance guides, ISO 42001 explainer, and more.'
          })
        ]}
      />

      <Container size="lg" className="pt-16 lg:pt-20">
        <header className="max-w-3xl">
          <h1 className="font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            EU AI Act Resources, Tools &amp; Templates
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            Everything here is free. These tools and templates only ask for your email
            if you want a PDF sent to you. Pick the one that matches what you need right now.
          </p>
        </header>
      </Container>

      <Section background="paper" containerSize="lg">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <RevealOnScroll key={tool.href} delay={i}>
              <li className="h-full list-none">
                <Link
                  href={tool.href}
                  className="group flex h-full flex-col rounded-card border border-line bg-card p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-accent hover:shadow-[0_12px_32px_-10px_rgba(15,42,63,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-low">
                      {tool.glyph}
                    </span>
                    {tool.badge && (
                      <span className="inline-flex items-center rounded-chip border border-line-strong bg-sand px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-accent-deep">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 font-display font-semibold text-xl text-ink">
                    {tool.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                    {tool.value}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-semibold text-primary transition-colors group-hover:text-accent-deep">
                    Open
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </li>
            </RevealOnScroll>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl text-sm text-muted">
          This is guidance to help you understand the EU AI Act, not legal advice. Confirm with
          the official sources we link or a qualified adviser for decisions specific to your
          organisation. Last updated: 9 June 2026.
        </p>
      </Section>

      <NewsletterSignup
        variant="band"
        heading="New tools land in The AI Act Brief first"
        subcopy="We watch Brussels so you don't. Get the next tool, template and rule change by email, free."
        source="tools"
      />
    </>
  );
}
