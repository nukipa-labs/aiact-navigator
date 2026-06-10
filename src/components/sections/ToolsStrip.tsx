import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

const TOOLS = [
  {
    title: 'AI Act Risk-Tier Classifier',
    body: 'Answer a few questions and find out whether your AI system is prohibited, high-risk, limited-risk or minimal-risk, with tailored next steps.',
    href: '/risk-classifier'
  },
  {
    title: 'High-Risk AI Use Cases (Annex III)',
    body: 'Look up the eight Annex III areas, from recruitment to credit scoring, and see whether your use case is caught.',
    href: '/high-risk'
  },
  {
    title: 'Provider vs Deployer Obligations',
    body: 'See which duties fall on you depending on whether you build the AI system or use it under your own authority.',
    href: '/obligations'
  },
  {
    title: 'AI Act Timeline & Deadlines',
    body: 'The living timeline of phased dates and what is still unsettled, including the proposed Digital Omnibus.',
    href: '/timeline'
  }
];

export function ToolsStrip() {
  return (
    <Section
      background="paper"
      eyebrow="Free tools"
      title="Free tools, no email wall"
      subtitle="Use them on the page. We'll only ask for your email if you want your result or a PDF sent to you."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((t, i) => (
          <RevealOnScroll key={t.href} delay={i}>
            <Link
              href={t.href}
              className="group block h-full rounded-card border border-line bg-card p-6 transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-accent hover:[transform:translateY(-3px)] hover:shadow-[var(--shadow-card-hover)]"
            >
              <h3 className="font-display font-semibold text-lg text-ink group-hover:text-primary transition-colors">
                {t.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{t.body}</p>
              <span className="mt-4 inline-block text-sm font-medium text-primary">Open →</span>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}
