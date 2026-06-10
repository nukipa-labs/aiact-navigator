import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { NewsletterSignup } from '@/components/ui/NewsletterSignup';
import { ContourBackground } from '@/components/ui/ContourBackground';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { JsonLd } from '@/components/ui/JsonLd';
import { webPage, breadcrumb } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Subscribe to The AI Act Brief',
  description:
    'EU AI Act updates, in plain English, when they actually matter. A plain-English newsletter that tells you what changed, what it means for you, and what to do next.',
  alternates: { canonical: '/subscribe' }
};

const WHAT = [
  `What changed, written so you don't need a law degree to follow it.`,
  'What it means for you - separated by role (provider vs deployer) and company size where it matters.',
  'What to do next, in concrete steps.',
  'A link to the official source, every time, so you can check our work.'
];

const WHO = [
  'Product managers, developers and CTOs who use or build AI and need to stay current on the rules without hiring a lawyer.',
  'Compliance and legal teams who own the AI Act obligations and need to brief leadership on every change.',
  'Non-EU companies whose AI products or outputs reach EU users - and who are in scope whether or not they have an EU office.',
  'Procurement and vendor management teams tracking which AI vendors are compliant.',
  'Advisers and association staff who need to stay authoritative for their clients.'
];

export default function SubscribePage() {
  return (
    <>
      <JsonLd
        data={[
          webPage({
            name: 'Subscribe to The AI Act Brief',
            path: '/subscribe',
            description:
              'EU AI Act updates, in plain English, when they actually matter. A plain-English newsletter that tells you what changed, what it means for you, and what to do next.'
          }),
          breadcrumb([{ name: 'The AI Act Brief', path: '/subscribe' }])
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container className="relative z-10 py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
              The AI Act Brief
            </p>
            <h1 className="mt-4 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
              EU AI Act updates, in plain English, when they actually matter.
            </h1>
            <p className="mt-5 text-lg text-ink/80 leading-relaxed">
              We watch Brussels so you don&apos;t. A plain-English newsletter that tells you what
              changed in the EU AI Act, what it means for your organisation, and what to do next.
            </p>
          </div>
        </Container>
      </section>

      {/* Core capture band */}
      <NewsletterSignup
        variant="band"
        background="ink"
        heading="Start receiving The AI Act Brief"
        subcopy="Enter your email to subscribe. Free, and you can unsubscribe in one click."
        source="subscribe-page"
      />

      {/* Why this exists + cadence */}
      <Section background="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <div>
              <h2 className="font-display font-semibold text-2xl text-ink">Why this exists</h2>
              <p className="mt-3 text-ink/80 leading-relaxed">
                The EU AI Act is phasing in over several years, with different deadlines for
                different obligations - and proposed amendments (like the Digital Omnibus) mean
                some dates are still moving. You cannot read one article in 2024 and be done. So
                instead of asking you to monitor the Official Journal, we do it, and we send you
                the short version when something changes.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <div>
              <h2 className="font-display font-semibold text-2xl text-ink">
                How often you&apos;ll hear from us
              </h2>
              <p className="mt-3 text-ink/80 leading-relaxed">
                Monthly, plus breaking-change alerts. The monthly issue rounds up what moved in
                AI Act implementation. The alerts go out the moment something material lands -
                so a new Council agreement or a published harmonised standard reaches you in
                days, not after your next review cycle.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* What you get */}
      <Section background="sand" title="What's in each issue">
        <ul className="grid gap-4 sm:grid-cols-2">
          {WHAT.map((w, i) => (
            <RevealOnScroll key={w} delay={i}>
              <li className="flex gap-3 rounded-card border border-line bg-card p-5">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-ink">{w}</span>
              </li>
            </RevealOnScroll>
          ))}
        </ul>
      </Section>

      {/* Who reads it */}
      <Section background="paper" title="Who reads The AI Act Brief">
        <ul className="space-y-3 max-w-2xl">
          {WHO.map((w) => (
            <li key={w} className="flex gap-3 text-ink/85">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Independence + consent */}
      <Section background="forest" title="The fine print, kept honest">
        <p className="max-w-2xl text-paper/85 leading-relaxed">
          We have no AI software to sell and no demo to book, so the newsletter exists to
          inform you, not to soften you up for a pitch. We won&apos;t sell or share your email.
          Unsubscribe in one click, any time. See how we handle your data on our{' '}
          <a
            href="/legal/privacy"
            className="underline decoration-dotted underline-offset-2 text-paper/85 hover:text-paper"
          >
            privacy page
          </a>
          .
        </p>
      </Section>
    </>
  );
}
