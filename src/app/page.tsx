import Link from 'next/link';
import { JsonLd, Section, Icon } from '@/components/ui';
import { Hero } from '@/components/sections/Hero';
import { DeadlineBand } from '@/components/sections/DeadlineBand';
import { ProblemSolution } from '@/components/sections/ProblemSolution';
import { Pathways } from '@/components/sections/Pathways';
import { ToolsStrip } from '@/components/sections/ToolsStrip';
import { WhyUs } from '@/components/sections/WhyUs';
import { NewsletterFeature } from '@/components/sections/NewsletterFeature';
import { Stats } from '@/components/sections/Stats';
import { CTABanner } from '@/components/sections/CTABanner';
import { webPage } from '@/lib/schema';

const HOME_DESCRIPTION =
  'Plain-English answers, free tools and trustworthy updates on the EU AI Act (Regulation (EU) 2024/1689), for any company that builds or uses AI.';

type Faq = { q: string; a: string };

const HOME_FAQS: Faq[] = [
  {
    q: 'What is the EU AI Act?',
    a: "The EU AI Act is Regulation (EU) 2024/1689, the world's first comprehensive law on artificial intelligence. It takes a risk-based approach, sorting AI into four tiers, prohibited, high-risk, limited (transparency) risk and minimal risk, with obligations that scale with the risk. General-purpose AI models are regulated on a separate track. It entered into force on 1 August 2024 and applies in phases through 2027."
  },
  {
    q: 'Is my AI system in scope, and what risk tier am I?',
    a: 'Most AI is in scope, but most everyday systems land in the lighter tiers with few or no new duties. A handful of practices are banned outright (Article 5); a defined set of use cases, the eight Annex III areas plus AI built into regulated products, are high-risk and carry the strictest obligations; chatbots and AI-generated content carry transparency duties; everything else is minimal-risk. The free risk-tier classifier at /risk-classifier gives you a plain-English answer.'
  },
  {
    q: 'What are the EU AI Act deadlines?',
    a: 'The Article 5 prohibitions and the Article 4 AI literacy duty have applied since 2 February 2025. GPAI model rules, governance and penalties have applied since 2 August 2025. Most high-risk (Annex III) and transparency obligations apply from 2 August 2026, and AI embedded in regulated products from 2 August 2027. A proposed Digital Omnibus would push the Annex III high-risk date to 2 December 2027, but as of June 2026 that is not yet law. See the full tracker at /timeline.'
  },
  {
    q: 'Who has to comply, and does the AI Act apply to non-EU or US companies?',
    a: 'Duties fall mainly on providers (who develop and place an AI system or GPAI model on the market) and deployers (who use one under their own authority in a professional capacity). Importers, distributors and product manufacturers also have roles. Crucially, the Act has extraterritorial reach: a non-EU or US company is in scope if it places AI on the EU market or if the output of its AI is used in the EU, so it matters well beyond Europe. The /obligations guide breaks down provider vs deployer duties.'
  },
  {
    q: 'What are the penalties under the EU AI Act?',
    a: 'Fines are tiered. Breaching the Article 5 prohibited practices can cost up to €35 million or 7% of worldwide annual turnover, whichever is higher. Most other breaches are capped at €15 million or 3%, and supplying misleading information at €7.5 million or 1%. For SMEs and start-ups the lower of the two figures applies. The penalty regime has been in force since 2 August 2025.'
  }
];

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  return (
    <>
      <JsonLd
        data={[
          webPage({ name: 'AI Act Navigator', path: '/', description: HOME_DESCRIPTION }),
          faqSchema
        ]}
      />
      <Hero />
      <DeadlineBand />
      <ProblemSolution />
      <Pathways />
      <ToolsStrip />
      <WhyUs />
      <NewsletterFeature />
      <Stats />

      {/* On-page FAQ */}
      <Section background="paper" eyebrow="AI Act FAQ" title="Common EU AI Act questions">
        <div className="mx-auto max-w-3xl divide-y divide-line">
          {HOME_FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-card border border-line bg-card my-3 [&_summary]:list-none"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-display text-lg font-semibold text-primary">
                {f.q}
                <Icon
                  name="expand_more"
                  className="shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="px-5 pb-5 -mt-1 text-ink/90 leading-relaxed">
                {f.q === 'Is my AI system in scope, and what risk tier am I?' ? (
                  <p>
                    Most AI is in scope, but most everyday systems land in the lighter tiers with
                    few or no new duties. A handful of practices are banned outright (Article 5); a
                    defined set of use cases, the eight Annex III areas plus AI built into regulated
                    products, are high-risk and carry the strictest obligations; chatbots and
                    AI-generated content carry transparency duties; everything else is minimal-risk.
                    The free{' '}
                    <Link href="/risk-classifier" className="text-primary underline-offset-2 hover:underline">
                      risk-tier classifier
                    </Link>{' '}
                    gives you a plain-English answer.
                  </p>
                ) : f.q === 'What are the EU AI Act deadlines?' ? (
                  <p>
                    The Article 5 prohibitions and the Article 4 AI literacy duty have applied since
                    2 February 2025. GPAI model rules, governance and penalties have applied since
                    2 August 2025. Most high-risk (Annex III) and transparency obligations apply from
                    2 August 2026, and AI embedded in regulated products from 2 August 2027. A
                    proposed Digital Omnibus would push the Annex III high-risk date to 2 December
                    2027, but as of June 2026 that is not yet law. See the full{' '}
                    <Link href="/timeline" className="text-primary underline-offset-2 hover:underline">
                      timeline tracker
                    </Link>
                    .
                  </p>
                ) : f.q === 'Who has to comply, and does the AI Act apply to non-EU or US companies?' ? (
                  <p>
                    Duties fall mainly on providers (who develop and place an AI system or GPAI model
                    on the market) and deployers (who use one under their own authority in a
                    professional capacity). Importers, distributors and product manufacturers also
                    have roles. Crucially, the Act has extraterritorial reach: a non-EU or US company
                    is in scope if it places AI on the EU market or if the output of its AI is used in
                    the EU. The{' '}
                    <Link href="/obligations" className="text-primary underline-offset-2 hover:underline">
                      obligations guide
                    </Link>{' '}
                    breaks down provider vs deployer duties.
                  </p>
                ) : (
                  <p>{f.a}</p>
                )}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
