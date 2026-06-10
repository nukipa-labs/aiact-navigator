import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ContourBackground } from '@/components/ui/ContourBackground';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

type Phase = {
  date: string;
  status: 'In force' | 'Upcoming';
  who: string;
  note: string;
};

const PHASES: Phase[] = [
  {
    date: '2 Feb 2025',
    status: 'In force',
    who: 'Prohibited practices + AI literacy.',
    note: 'The Article 5 bans (e.g. social scoring, manipulative AI) and the Article 4 duty to ensure staff AI literacy already apply.'
  },
  {
    date: '2 Aug 2025',
    status: 'In force',
    who: 'GPAI rules, governance & penalties.',
    note: 'General-purpose AI model rules, the AI Office, and the penalty regime are now in force.'
  },
  {
    date: '2 Aug 2026',
    status: 'Upcoming',
    who: 'Most high-risk + transparency obligations.',
    note: 'The big one: most Annex III high-risk obligations and the Article 50 transparency duties begin to apply.'
  },
  {
    date: '2 Aug 2027',
    status: 'Upcoming',
    who: 'AI as a safety component of regulated products.',
    note: 'High-risk AI embedded in Annex I products (e.g. machinery, medical devices) and pre-Aug-2025 GPAI models must be in compliance.'
  }
];

export function DeadlineBand() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper py-16 lg:py-20">
      <ContourBackground className="opacity-60" />
      <Container className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          The phased deadlines
        </p>
        <RevealOnScroll>
          <p className="mt-4 max-w-3xl font-display font-semibold text-3xl lg:text-4xl text-paper leading-tight">
            <span className="text-accent">2 August 2026</span> is the date most companies are
            counting down to: most high-risk and transparency obligations begin to apply.
          </p>
        </RevealOnScroll>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p, i) => (
            <RevealOnScroll key={p.date} delay={i}>
              <div className="rounded-card border border-paper/15 bg-paper/[0.04] p-5 h-full">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-display font-semibold text-xl lg:text-2xl text-accent">
                    {p.date}
                  </div>
                  <span
                    className={
                      'shrink-0 rounded-chip px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide ' +
                      (p.status === 'In force'
                        ? 'bg-accent/20 text-accent'
                        : 'border border-paper/30 text-paper/70')
                    }
                  >
                    {p.status}
                  </span>
                </div>
                <p className="mt-3 font-medium text-paper text-sm">{p.who}</p>
                <p className="mt-2 text-sm text-paper/70 leading-relaxed">{p.note}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-paper/75">
            ⚠️ A proposed Digital Omnibus on AI would push the Annex III high-risk date from
            2 August 2026 to 2 December 2027. As of 9 June 2026 this is{' '}
            <strong className="text-paper">PROPOSED, not yet law</strong>, so the binding dates
            above still stand. We&apos;ll tell you the moment that changes.
          </p>
          <Link
            href="/risk-classifier"
            className="shrink-0 text-accent font-medium link-underline"
          >
            What applies to me? →
          </Link>
        </div>
      </Container>
    </section>
  );
}
