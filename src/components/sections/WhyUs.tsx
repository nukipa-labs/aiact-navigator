import { Section } from '@/components/ui/Section';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

const POINTS = [
  {
    title: 'No upsell',
    body: `We're not selling you compliance software, and there's no demo to book. That means no pressure to "request a quote" at the bottom of every answer. We just explain the rules.`
  },
  {
    title: 'Always current',
    body: 'The AI Act is moving fast: a proposed Digital Omnibus that could shift the high-risk deadline, the GPAI Code of Practice, and harmonised standards still landing. Every page carries the sources we used and the date we last checked them, and we update when things change.'
  },
  {
    title: 'Plain English, with free tools',
    body: 'A risk-tier classifier, an Annex III high-risk lookup, a glossary and a deadline tracker, written for people without a legal team. Terms are explained the first time we use them, then linked to the glossary.'
  }
];

export function WhyUs() {
  return (
    <Section
      background="forest"
      eyebrow="Why use this hub"
      title="Why use this hub"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {POINTS.map((p, i) => (
          <RevealOnScroll key={p.title} delay={i}>
            <div>
              <span aria-hidden="true" className="block h-[2px] w-8 bg-accent" />
              <h3 className="mt-4 font-display font-semibold text-xl text-paper">{p.title}</h3>
              <p className="mt-3 text-paper/80 leading-relaxed">{p.body}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}
