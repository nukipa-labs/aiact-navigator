import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Prose } from '@/components/ui/Prose';
import { Callout } from '@/components/ui/Callout';
import { JsonLd } from '@/components/ui/JsonLd';
import { webPage, breadcrumb } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About and methodology: how we keep this accurate',
  description:
    'AI Act Navigator is a free hub explaining the EU AI Act in plain English. How we source, update and keep it accurate.',
  alternates: { canonical: '/about' }
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About AI Act Navigator',
            url: 'https://aiact-navigator.com/about',
            description:
              'A plain-English guide to the EU AI Act, built to stay accurate. How we source and update it.'
          },
          webPage({
            name: 'About and methodology: how we keep this accurate',
            path: '/about',
            description:
              'AI Act Navigator is a free hub explaining the EU AI Act in plain English. How we source, update and keep it accurate.'
          }),
          breadcrumb([{ name: 'About', path: '/about' }])
        ]}
      />
      <Container size="md" className="py-16 lg:py-24">
        <header className="max-w-3xl">
          <h1 className="font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            A plain-English guide to the EU AI Act, built to stay accurate.
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            AI Act Navigator is a free hub explaining Regulation (EU) 2024/1689 in plain English.
            No software to sell. No consulting upsell. Just the rules, kept current.
          </p>
          <p className="mt-3 font-display text-lg text-primary">
            Find your way through the EU AI Act.
          </p>
        </header>

        <div className="mt-12">
          <Prose>
            <h2>How we keep this accurate</h2>
            <p>
              This is a regulation that phased in over multiple years and keeps evolving - the
              proposed Digital Omnibus amendments are a recent example. Accuracy is the whole job.
              Here&apos;s how we approach it.
            </p>

            <h3>No software to sell, no consulting upsell</h3>
            <p>
              We don&apos;t sell AI compliance software and we don&apos;t run a consultancy. Nobody pays us to
              point you at a product. That&apos;s deliberate: it means our answers can stay neutral and
              our only goal is to explain the regulation clearly.
            </p>

            <h3>Where our facts come from</h3>
            <p>
              Every factual claim traces back to an official source: the AI Act itself on EUR-Lex,
              the European Commission&apos;s digital strategy pages, the AI Act Explorer at
              artificialintelligenceact.eu (which maps each article to its canonical text), the EU
              AI Office, and Council and Parliament press releases. We link the source so you can
              check our work.
            </p>

            <h3>How we keep it current</h3>
            <p>
              Key pages carry a visible &ldquo;Last updated&rdquo; date. When something material changes -
              a deadline, a new code of practice, a Council/Parliament agreement on amendments -
              we revise the affected pages and send it to subscribers of The AI Act Brief.
            </p>

            <h3>When the rules are not settled</h3>
            <p>
              Sometimes the law is genuinely in flux. The Digital Omnibus on AI, for example,
              reached a provisional political agreement in May 2026 that would postpone most
              high-risk obligations - but it is not yet law as of 9 June 2026. When that is the
              case, we say so plainly and mark it &ldquo;PROPOSED - not yet law&rdquo;, rather than
              treating a proposal as a fait accompli. We would rather tell you &ldquo;this is not
              decided&rdquo; than sound more certain than the facts allow.
            </p>
          </Prose>
        </div>

        <div className="mt-10 max-w-2xl">
          <Callout variant="info" title="This is guidance, not legal advice">
            This is guidance to help you understand the EU AI Act, not legal advice. We&apos;ve
            worked hard to get it right and to link our sources, but for decisions specific to your
            organisation, confirm with the official sources we link or a qualified adviser. We cannot
            guarantee compliance, and you should be wary of anyone who says they can.
          </Callout>
        </div>

        <div className="mt-12 max-w-2xl">
          <Prose>
            <h2>Who&apos;s behind it</h2>
            <p>
              AI Act Navigator is a free information service operated by Nukipa Labs GmbH. It is
              maintained as an editorial project - not by a regulator and not by a vendor.
            </p>

            <h2>Get in touch</h2>
            <p>
              Spotted something out of date, or have a question we should answer? Tell us. We read
              everything and we&apos;d rather hear it from you than leave a mistake live. Email us at{' '}
              <a href="mailto:contact@nukipalabs.com">contact@nukipalabs.com</a>.
            </p>
            <p>
              Want the updates without checking back?{' '}
              <Link href="/subscribe">Subscribe to The AI Act Brief.</Link>
            </p>
          </Prose>
        </div>
      </Container>
    </>
  );
}
