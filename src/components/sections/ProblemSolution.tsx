import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function ProblemSolution() {
  return (
    <Section background="paper">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <RevealOnScroll>
          <div>
            <h2 className="font-display font-semibold text-3xl lg:text-4xl text-ink leading-tight">
              Just been told your AI system might be &ldquo;high-risk&rdquo;? Start here.
            </h2>
            <p className="mt-5 text-ink/80 text-base lg:text-lg leading-relaxed">
              Your legal team, a customer, or a board member just flagged the EU AI Act, and now
              you&apos;re trying to work out whether the tool you built or bought is &ldquo;prohibited,&rdquo;
              &ldquo;high-risk,&rdquo; or barely touched by the rules at all. The deadlines, the
              jargon and the talk of seven-figure fines make it feel bigger than it is.
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <div className="rounded-card bg-low border-l-[3px] border-primary p-6 lg:p-8">
            <p className="text-ink text-base lg:text-lg leading-relaxed">
              Take a breath. The AI Act sorts AI into four risk tiers, and most everyday systems land
              in the lightest ones with few or no new duties. The work is figuring out which tier your
              system falls in, and whether you&apos;re the &ldquo;provider&rdquo; who builds it or the
              &ldquo;deployer&rdquo; who uses it. We&apos;ll help you do exactly that, in plain English.
              No jargon, no sales pitch.
            </p>
            <p className="mt-5">
              <Link href="/risk-classifier" className="text-primary font-medium link-underline">
                Not sure if the AI Act even applies to you? Find your risk tier in two minutes →
              </Link>
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
