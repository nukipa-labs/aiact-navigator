import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Container,
  Section,
  TLDR,
  Callout,
  SourceCite,
  Sources,
  JsonLd,
  NewsletterSignup,
  Icon
} from '@/components/ui';
import { webPage, breadcrumb } from '@/lib/schema';

const PAGE_URL = 'https://aiact-navigator.com/timeline';

// ---- Canonical official sources (research.md §2, §10) ----
const EURLEX = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj';
const ART113 = 'https://artificialintelligenceact.eu/article/113/';
const IMPL_TIMELINE = 'https://artificialintelligenceact.eu/implementation-timeline/';
const EC_HOME = 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai';
const COUNCIL_OMNIBUS =
  'https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/';
const EP_NUDIFIER =
  'https://www.europarl.europa.eu/news/en/press-room/20260427IPR42011/ai-act-deal-on-simplification-measures-ban-on-nudifier-apps';
const OMNIBUS_PROPOSAL =
  'https://digital-strategy.ec.europa.eu/en/library/digital-omnibus-ai-regulation-proposal';

export const metadata: Metadata = {
  title: 'EU AI Act Timeline & Deadlines (2025-2027) | AI Act Navigator',
  description:
    'The phased EU AI Act deadlines: prohibited practices and AI literacy since 2 Feb 2025, GPAI and penalties since 2 Aug 2025, most high-risk and transparency obligations from 2 Aug 2026, and AI in regulated products from 2 Aug 2027. A living tracker, including the proposed Digital Omnibus postponements.',
  alternates: { canonical: '/timeline' },
  openGraph: {
    title: 'EU AI Act timeline & deadlines: 2025, 2026, 2027',
    description:
      'The phased AI Act deadlines and a live status board on what is still moving, including the proposed Digital Omnibus. Always updated.',
    url: PAGE_URL,
    type: 'article'
  }
};

// ----------------------------------------------------------------------------
// Status pill
// ----------------------------------------------------------------------------

type Status = 'in-force' | 'upcoming' | 'proposed' | 'superseded';

const STATUS_STYLE: Record<Status, string> = {
  'in-force': 'bg-low text-primary border border-primary/25',
  upcoming: 'bg-warn text-accent-deep border border-accent/40',
  proposed: 'bg-transparent text-accent-deep border border-dashed border-accent/60',
  superseded: 'bg-sand-tint text-muted border border-line'
};

const STATUS_LABEL: Record<Status, string> = {
  'in-force': 'In force',
  upcoming: 'Upcoming',
  proposed: 'Proposed, not yet law',
  superseded: 'Superseded'
};

function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-chip px-2.5 py-0.5 font-body text-xs font-semibold ${STATUS_STYLE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

// ----------------------------------------------------------------------------
// Timeline
// ----------------------------------------------------------------------------

type TimelineEvent = {
  date: string;
  title: string;
  meaning: string;
  status: Status;
  dot: 'done' | 'now' | 'upcoming';
  source: { href: string; label: string };
};

const TIMELINE: TimelineEvent[] = [
  {
    date: '1 Aug 2024',
    title: 'The AI Act enters into force',
    meaning:
      'Regulation (EU) 2024/1689 becomes law, 20 days after publication in the Official Journal. The clock starts on the phased application dates.',
    status: 'in-force',
    dot: 'done',
    source: { href: ART113, label: 'Article 113' }
  },
  {
    date: '2 Feb 2025',
    title: 'Prohibited practices + AI literacy apply',
    meaning:
      'The Article 5 bans (e.g. social scoring, untargeted facial-image scraping, manipulative AI) and the Article 4 duty to ensure staff AI literacy take effect. These apply to all AI, not just high-risk.',
    status: 'in-force',
    dot: 'done',
    source: { href: IMPL_TIMELINE, label: 'Implementation timeline' }
  },
  {
    date: '2 Aug 2025',
    title: 'GPAI rules, governance & penalties apply',
    meaning:
      'General-purpose AI model rules (Chapter V), the governance structure (the AI Office and national authorities), and the penalty regime take effect. Codes of Practice become operative.',
    status: 'in-force',
    dot: 'done',
    source: { href: IMPL_TIMELINE, label: 'Implementation timeline' }
  },
  {
    date: '2 Aug 2026',
    title: 'Most high-risk + transparency obligations apply',
    meaning:
      'The big one. Most remaining obligations begin to apply, including the high-risk obligations for stand-alone Annex III systems and the Article 50 transparency duties. A proposed Digital Omnibus would postpone the Annex III high-risk date to 2 December 2027 (see the status board).',
    status: 'upcoming',
    dot: 'now',
    source: { href: EC_HOME, label: 'European Commission' }
  },
  {
    date: '2 Aug 2027',
    title: 'AI in regulated products + older GPAI models',
    meaning:
      'High-risk AI that is a safety component of products regulated under Annex I (machinery, medical devices, toys and more) must comply, and GPAI models placed on the market before 2 Aug 2025 must be brought into compliance.',
    status: 'upcoming',
    dot: 'upcoming',
    source: { href: ART113, label: 'Article 113' }
  }
];

function TimelineDot({ kind }: { kind: TimelineEvent['dot'] }) {
  if (kind === 'now') {
    return (
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute h-5 w-5 rounded-full bg-accent/25" />
        <span className="relative h-3.5 w-3.5 rounded-full bg-accent" />
      </span>
    );
  }
  if (kind === 'done') {
    return <span className="h-3.5 w-3.5 rounded-full bg-primary" />;
  }
  return <span className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-paper" />;
}

// ----------------------------------------------------------------------------
// Status board rows
// ----------------------------------------------------------------------------

type StatusRow = {
  title: string;
  date: string;
  status: Status;
  body: ReactNode;
  source: { href: string; label: string };
};

const STATUS_BOARD: StatusRow[] = [
  {
    title: 'Digital Omnibus: high-risk deadline postponement',
    date: 'Provisional agreement, 7 May 2026',
    status: 'proposed',
    body: (
      <>
        The Commission proposed a Digital Omnibus on AI on 19 November 2025, and co-legislators
        reached a provisional political agreement on 6/7 May 2026. It would push the Annex III
        high-risk date from <strong>2 Aug 2026 to 2 December 2027</strong>, and the Annex I
        product-safety date from <strong>2 Aug 2027 to 2 August 2028</strong>. This is{' '}
        <strong>proposed, not yet law</strong>; it still needs a Parliament plenary vote, formal
        Council adoption and Official Journal publication. Until then, the original dates stand.
      </>
    ),
    source: { href: COUNCIL_OMNIBUS, label: 'Council of the EU' }
  },
  {
    title: 'Digital Omnibus: a 9th Article 5 prohibition',
    date: 'Provisional agreement, May 2026',
    status: 'proposed',
    body: (
      <>
        The same deal would add a new prohibition to Article 5: AI generating non-consensual
        intimate imagery (&ldquo;nudifier&rdquo; apps) and AI-generated child sexual abuse material.
        It is <strong>proposed, not yet law</strong>. We will update this line the moment it is
        adopted.
      </>
    ),
    source: { href: EP_NUDIFIER, label: 'European Parliament' }
  },
  {
    title: 'Article 50 transparency: shorter grace period',
    date: 'Proposed effective 2 Dec 2026',
    status: 'proposed',
    body: (
      <>
        Under the proposed Omnibus, the provider grace period for marking AI-generated content would
        be cut from six months to three, with a new effective date of{' '}
        <strong>2 December 2026</strong>. Proposed, not yet law.
      </>
    ),
    source: { href: COUNCIL_OMNIBUS, label: 'Council of the EU' }
  },
  {
    title: 'GPAI Code of Practice & harmonised standards',
    date: 'Landing through 2026',
    status: 'upcoming',
    body: (
      <>
        The GPAI Code of Practice is in use as a compliance tool while CEN-CENELEC finalises the
        harmonised standards that will give a presumption of conformity. Until those references are
        published in the Official Journal, organisations rely on the Code and frameworks like{' '}
        <Link
          href="/iso-42001"
          className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
        >
          ISO/IEC 42001
        </Link>
        . We will update this as standards land.
      </>
    ),
    source: { href: EC_HOME, label: 'European Commission' }
  }
];

// ----------------------------------------------------------------------------
// Changelog
// ----------------------------------------------------------------------------

const CHANGELOG: { date: string; entry: string }[] = [
  {
    date: '9 Jun 2026',
    entry:
      'Reviewed against the 7 May 2026 provisional Digital Omnibus agreement. Confirmed the binding dates are unchanged and flagged every proposed postponement as not-yet-law.'
  },
  {
    date: '7 May 2026',
    entry:
      'Added the proposed Digital Omnibus changes (high-risk postponement to 2 Dec 2027, 9th Article 5 prohibition, shorter transparency grace period) to the status board.'
  },
  {
    date: '2 Aug 2025',
    entry:
      'Marked the GPAI model rules, governance and penalties as in force.'
  }
];

// ----------------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------------

export default function TimelinePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'EU AI Act timeline & deadlines: 2025, 2026, 2027',
    description:
      'The phased EU AI Act deadlines and a live status board on what is still moving, including the proposed Digital Omnibus.',
    url: PAGE_URL,
    datePublished: '2026-06-09',
    dateModified: '2026-06-09',
    author: { '@type': 'Organization', name: 'AI Act Navigator' },
    publisher: { '@type': 'Organization', name: 'AI Act Navigator' },
    isBasedOn: EURLEX
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When does the EU AI Act apply?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In phases. Prohibited practices and AI literacy since 2 February 2025; GPAI model rules, governance and penalties since 2 August 2025; most high-risk (Annex III) and transparency obligations from 2 August 2026; and AI embedded in regulated products from 2 August 2027.'
        }
      },
      {
        '@type': 'Question',
        name: 'Has the AI Act high-risk deadline been postponed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not yet in law. A proposed Digital Omnibus, agreed provisionally on 7 May 2026, would push the Annex III high-risk date from 2 August 2026 to 2 December 2027. As of June 2026 it still needs a Parliament vote, Council adoption and Official Journal publication, so the original 2 August 2026 date remains the binding default.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is already in force under the AI Act?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Article 5 prohibitions and the Article 4 AI literacy duty (since 2 February 2025), and the general-purpose AI model rules, the AI Office governance structure and the penalty regime (since 2 August 2025). None of these are postponed by the proposed Digital Omnibus.'
        }
      }
    ]
  };

  return (
    <>
      <JsonLd
        data={[
          articleSchema,
          faqSchema,
          webPage({
            name: 'EU AI Act Timeline & Deadlines',
            path: '/timeline',
            description:
              'The phased EU AI Act deadlines and a live status board on what is still moving, including the proposed Digital Omnibus.'
          }),
          breadcrumb([{ name: 'AI Act Timeline & Deadlines', path: '/timeline' }])
        ]}
      />

      {/* Header + answer-first */}
      <Container size="lg" className="pt-16 lg:pt-20">
        <header className="max-w-3xl">
          <h1 className="font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            EU AI Act Timeline &amp; Deadlines
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            The AI Act applies in phases. Some duties are already in force; the big high-risk and
            transparency obligations land on 2 August 2026. Below you will find every phase, plus a
            live status board on the parts that are still moving, including the proposed Digital
            Omnibus.
          </p>
        </header>
      </Container>

      {/* The headline date, big and clear (ink band) */}
      <Section background="ink" className="mt-12" containerSize="lg">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          The date most companies are watching
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-paper/15 p-6 lg:p-8">
            <p className="font-display font-semibold text-4xl lg:text-5xl text-accent leading-none">
              2 August 2026
            </p>
            <p className="mt-4 text-lg text-paper font-medium">
              Most high-risk + transparency obligations
            </p>
            <p className="mt-2 text-paper/80 leading-relaxed">
              From this date, most obligations for high-risk Annex III systems and the Article 50
              transparency duties begin to apply, unless the proposed Digital Omnibus postpones the
              high-risk date.
            </p>
          </div>
          <div className="rounded-card border border-paper/15 p-6 lg:p-8">
            <p className="font-display font-semibold text-4xl lg:text-5xl text-accent leading-none">
              Already in force
            </p>
            <p className="mt-4 text-lg text-paper font-medium">
              Bans, AI literacy, GPAI &amp; penalties
            </p>
            <p className="mt-2 text-paper/80 leading-relaxed">
              The Article 5 prohibitions and Article 4 AI literacy duty (since 2 Feb 2025), and the
              GPAI rules, governance and penalties (since 2 Aug 2025), already apply.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-paper/70">
          Phased application dates set by Article 113.{' '}
          <SourceCite href={ART113}>
            <span className="text-accent">See Article 113</span>
          </SourceCite>
        </p>
      </Section>

      {/* TLDR + what applies to me */}
      <Section background="paper" containerSize="lg">
        <div className="max-w-3xl">
          <TLDR title="What applies to me, and when">
            <p>
              If you run a <strong>prohibited</strong> practice, stop now, the bans have applied
              since 2 February 2025. Every organisation using AI already owes an{' '}
              <strong>AI literacy</strong> duty. If your system is <strong>high-risk</strong> under
              Annex III, your main date is <strong>2 August 2026</strong> (subject to the proposed
              Omnibus postponement). If it is built into a <strong>regulated product</strong>, your
              date is <strong>2 August 2027</strong>.{' '}
              <Link
                href="/risk-classifier"
                className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
              >
                Not sure which tier you are in? Use the risk-tier classifier.
              </Link>
            </p>
          </TLDR>
        </div>

        {/* Mini matrix */}
        <div className="mt-8 overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">
              EU AI Act deadlines by phase and what each one means.
            </caption>
            <thead>
              <tr className="bg-sand text-ink">
                <th
                  scope="col"
                  className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold"
                >
                  What applies
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-paper">
                <th scope="row" className="px-4 py-3 font-mono text-sm text-ink align-top">
                  2 Feb 2025
                </th>
                <td className="px-4 py-3 text-sm text-primary align-top">In force</td>
                <td className="px-4 py-3 text-sm text-muted align-top">
                  Article 5 prohibited practices and Article 4 AI literacy.
                </td>
              </tr>
              <tr className="bg-sand-tint">
                <th scope="row" className="px-4 py-3 font-mono text-sm text-ink align-top">
                  2 Aug 2025
                </th>
                <td className="px-4 py-3 text-sm text-primary align-top">In force</td>
                <td className="px-4 py-3 text-sm text-muted align-top">
                  GPAI model rules, governance (the AI Office) and penalties.
                </td>
              </tr>
              <tr className="bg-paper">
                <th scope="row" className="px-4 py-3 font-mono text-sm text-ink align-top">
                  2 Aug 2026
                </th>
                <td className="px-4 py-3 text-sm text-accent-deep align-top">Upcoming</td>
                <td className="px-4 py-3 text-sm text-muted align-top">
                  Most high-risk (Annex III) and Article 50 transparency obligations. Proposed
                  Omnibus would move the high-risk date to 2 Dec 2027.
                </td>
              </tr>
              <tr className="bg-sand-tint">
                <th scope="row" className="px-4 py-3 font-mono text-sm text-ink align-top">
                  2 Aug 2027
                </th>
                <td className="px-4 py-3 text-sm text-accent-deep align-top">Upcoming</td>
                <td className="px-4 py-3 text-sm text-muted align-top">
                  High-risk AI in regulated (Annex I) products, plus GPAI models placed on the
                  market before 2 Aug 2025.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-sm text-muted">
          Not sure which one is you, or whether the AI Act even applies to you?{' '}
          <Link
            href="/risk-classifier"
            className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid hover:text-accent-deep"
          >
            Try the risk-tier classifier for a personalised answer
          </Link>
          .
        </p>
      </Section>

      {/* Timeline */}
      <Section background="sand" containerSize="lg">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            The phased rollout
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="timeline" className="text-primary text-3xl" />
            Every phase, with sources
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            From entry into force to the last application date, with the source for each step.
          </p>
        </div>
        <ol className="relative mt-12 space-y-8 border-l border-line pl-8">
          {TIMELINE.map((ev) => (
            <li key={ev.date + ev.title} className="relative">
              <span className="absolute -left-[2.55rem] top-1.5 flex items-center justify-center">
                <TimelineDot kind={ev.dot} />
              </span>
              <div className="rounded-card border border-line bg-card p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm text-accent-deep">{ev.date}</span>
                  <StatusPill status={ev.status} />
                </div>
                <h3 className="mt-2 font-display font-semibold text-xl text-ink">{ev.title}</h3>
                <p className="mt-1.5 text-ink/80 leading-relaxed">{ev.meaning}</p>
                <p className="mt-2 text-sm">
                  <SourceCite href={ev.source.href}>{ev.source.label}</SourceCite>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Status board */}
      <Section background="paper" containerSize="lg">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Live status board
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="dashboard" className="text-primary text-3xl" />
            What is settled, and what is still moving
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            The parts of the AI Act that are in flux right now. We mark each one plainly so you are
            not caught out.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {STATUS_BOARD.map((row) => (
            <div key={row.title} className="rounded-card border border-line bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill status={row.status} />
                <span className="font-mono text-xs text-muted">{row.date}</span>
              </div>
              <h3 className="mt-3 font-display font-semibold text-xl text-ink">{row.title}</h3>
              <div className="mt-2 text-ink/80 leading-relaxed">{row.body}</div>
              <p className="mt-3 text-sm">
                <SourceCite href={row.source.href}>{row.source.label}</SourceCite>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-3xl">
          <Callout variant="warn" title="The Digital Omnibus is PROPOSED, not law">
            As of 9 June 2026, the Digital Omnibus on AI is a provisional political agreement only.
            It still needs a Parliament plenary vote, formal Council adoption and Official Journal
            publication. Until that happens, the <strong>2 August 2026</strong> high-risk date and
            the other dates above remain the binding legal default. Treat the proposed postponements
            as not-yet-law and plan against the current dates.
          </Callout>
        </div>
      </Section>

      {/* Changelog */}
      <Section background="sand" containerSize="md">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Changelog
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="update" className="text-primary text-3xl" />
            What we changed, and when
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            This is a living page. Every material edit is logged here.
          </p>
        </div>
        <ul className="mt-12 space-y-4">
          {CHANGELOG.map((c) => (
            <li key={c.date} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <span className="shrink-0 font-mono text-sm text-accent-deep sm:w-28">{c.date}</span>
              <span className="text-ink/80 leading-relaxed">{c.entry}</span>
            </li>
          ))}
        </ul>

        <Sources
          items={[
            {
              href: ART113,
              label: 'Article 113, entry into force and application (artificialintelligenceact.eu)',
              retrieved: '9 Jun 2026'
            },
            {
              href: IMPL_TIMELINE,
              label: 'AI Act implementation timeline',
              retrieved: '9 Jun 2026'
            },
            {
              href: EC_HOME,
              label: 'European Commission: regulatory framework on AI',
              retrieved: '9 Jun 2026'
            },
            {
              href: COUNCIL_OMNIBUS,
              label: 'Council of the EU: provisional agreement on the Digital Omnibus (7 May 2026)',
              retrieved: '9 Jun 2026'
            },
            {
              href: EP_NUDIFIER,
              label: 'European Parliament: AI Act simplification deal and nudifier-app ban',
              retrieved: '9 Jun 2026'
            },
            {
              href: OMNIBUS_PROPOSAL,
              label: 'European Commission: Digital Omnibus on AI regulation proposal',
              retrieved: '9 Jun 2026'
            },
            {
              href: EURLEX,
              label: 'Regulation (EU) 2024/1689 (Artificial Intelligence Act), EUR-Lex',
              retrieved: '9 Jun 2026'
            }
          ]}
        />
      </Section>

      <NewsletterSignup
        variant="band"
        background="forest"
        heading="Get alerted when this changes"
        subcopy="We watch Brussels so you don't. Plain-English alerts the moment a deadline, the Digital Omnibus or a new standard moves."
        source="timeline"
      />
    </>
  );
}
