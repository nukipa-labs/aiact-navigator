import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

type Card = { title: string; body: string; href: string; tag: string };

const CARDS: Card[] = [
  {
    tag: 'Understand',
    title: 'What is the EU AI Act?',
    body: 'The plain-English explainer: the risk-based approach, the four tiers, who it covers, and why it reaches non-EU companies too.',
    href: '/ai-act'
  },
  {
    tag: 'Classify',
    title: 'What risk tier is my AI?',
    body: 'Answer a few questions and find out whether your AI system is prohibited, high-risk, limited-risk or minimal-risk, with next steps.',
    href: '/risk-classifier'
  },
  {
    tag: 'Track',
    title: 'Deadlines & timeline',
    body: 'The phased dates, what applies when, and a live status board on the proposed Digital Omnibus and other moving parts.',
    href: '/timeline'
  },
  {
    tag: 'Guides',
    title: 'Topics & guides',
    body: 'Plain-English guides to obligations, GPAI, AI literacy, ISO 42001 and more, with what to do first for each.',
    href: '/topics'
  }
];

function NeedleGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 text-primary group-hover:text-accent transition-colors"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 4 L14.5 12 L12 11 L9.5 12 Z" fill="currentColor" stroke="none" />
      <path d="M12 20 L14.5 12 L12 13 L9.5 12 Z" opacity="0.4" />
    </svg>
  );
}

function PathwayCard({ card, delay }: { card: Card; delay: number }) {
  return (
    <RevealOnScroll delay={delay}>
      <Link
        href={card.href}
        className="group block h-full rounded-card border border-line bg-card p-6 transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-accent hover:[transform:translateY(-3px)] hover:shadow-[var(--shadow-card-hover)]"
      >
        <NeedleGlyph />
        <p className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
          {card.tag}
        </p>
        <h3 className="mt-2 font-display font-semibold text-xl text-ink">{card.title}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed">{card.body}</p>
        <span className="mt-4 inline-block text-sm font-medium text-primary">Open →</span>
      </Link>
    </RevealOnScroll>
  );
}

export function Pathways() {
  return (
    <Section
      background="sand"
      eyebrow="Start here"
      title="Start where you are"
      subtitle="Four routes through the regulation, depending on what you need right now."
    >
      {/* Asymmetric zig-zag layout (not an identical 3-up grid) */}
      <div className="grid gap-5 md:grid-cols-6">
        <div className="md:col-span-4">
          <PathwayCard card={CARDS[0]} delay={0} />
        </div>
        <div className="md:col-span-2">
          <PathwayCard card={CARDS[1]} delay={1} />
        </div>
        <div className="md:col-span-2">
          <PathwayCard card={CARDS[2]} delay={2} />
        </div>
        <div className="md:col-span-4">
          <PathwayCard card={CARDS[3]} delay={3} />
        </div>
      </div>
    </Section>
  );
}
