import { Section } from '@/components/ui/Section';
import { Stat, Stats as StatsGrid } from '@/components/ui/Stat';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function Stats() {
  return (
    <Section
      background="sand"
      eyebrow="By the numbers"
      title="The EU AI Act in a few numbers"
      subtitle="The figures worth keeping in your head. Each one is set in law or in the official guidance we link from the pillar page."
    >
      <RevealOnScroll>
        <StatsGrid>
          <Stat
            value="4"
            label="Risk tiers the Act sorts AI into: prohibited, high-risk, limited (transparency) risk and minimal risk."
          />
          <Stat
            value="€35m / 7%"
            label="The maximum fine for breaching the Article 5 prohibited-practice bans: €35 million or 7% of worldwide annual turnover, whichever is higher."
          />
          <Stat
            value="2 Aug 2026"
            label="When most high-risk (Annex III) and Article 50 transparency obligations begin to apply, unless the proposed Digital Omnibus postpones it."
          />
          <Stat
            value="8"
            label="Annex III high-risk areas, from biometrics and employment to credit scoring and law enforcement."
          />
        </StatsGrid>
      </RevealOnScroll>
      <p className="mt-8 text-sm text-muted">
        Penalty tiers run €35m / 7% for prohibited practices, €15m / 3% for other breaches and €7.5m
        / 1% for supplying misleading information. For SMEs and start-ups the lower of the two figures
        applies.
      </p>
    </Section>
  );
}
