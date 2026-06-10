import type { Metadata } from 'next';
import {
  Container,
  Section,
  TLDR,
  Callout,
  SourceCite,
  Sources,
  JsonLd,
  ContourBackground,
  RevealOnScroll,
  Prose,
  Icon
} from '@/components/ui';
import { webPage } from '@/lib/schema';
import { RiskClassifier } from './RiskClassifier';

const CANONICAL = 'https://aiact-navigator.com/risk-classifier';

export const metadata: Metadata = {
  title: 'AI Act Risk Classifier: What Tier Is Your AI System? | AI Act Navigator',
  description:
    'Answer a few plain-English questions to find out your EU AI Act risk tier - prohibited, high-risk, limited/transparency or minimal - your role, and what to do next. Free, caveated guidance.',
  alternates: { canonical: '/risk-classifier' },
  openGraph: {
    title: 'What is my AI Act risk tier? Free EU AI Act risk classifier',
    description:
      'A free, plain-English decision tool to find your EU AI Act risk tier, your role, and your next steps.',
    url: CANONICAL,
    type: 'website'
  }
};

const EURLEX = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj';
const EC_HOME =
  'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai';
const ART5 = 'https://artificialintelligenceact.eu/article/5/';
const ART6 = 'https://artificialintelligenceact.eu/article/6/';
const ART50 = 'https://artificialintelligenceact.eu/article/50/';

const FAQ = [
  {
    q: 'What are the AI Act risk tiers?',
    a: 'The EU AI Act takes a risk-based approach with four tiers for AI systems. Unacceptable risk (prohibited practices under Article 5) is banned outright. High-risk systems - safety components of regulated products, or systems used in one of eight Annex III areas like employment, credit scoring or biometrics - carry the fullest obligations. Limited or transparency risk (Article 50) covers chatbots, deepfakes and other content-generating or interactive AI, which mainly have disclosure and labelling duties. Everything else is minimal risk, with no mandatory obligations. General-purpose AI models are regulated on a separate track.'
  },
  {
    q: 'Does the AI Act apply to companies outside the EU?',
    a: 'Yes, it can. The Act applies to providers placing an AI system or model on the EU market regardless of where they are established, to deployers located in the EU, and - importantly - to providers and deployers outside the EU whenever the output produced by their AI system is used in the Union (Article 2). This "output used in the Union" trigger gives the Act broad extraterritorial reach comparable to GDPR. A non-EU provider of a high-risk system must also appoint an EU authorised representative.'
  },
  {
    q: 'My system is in an Annex III area. Is it automatically high-risk?',
    a: 'Not always. Article 6(3) provides a filter exception: an Annex III system may not be high-risk if it does not pose a significant risk of harm to health, safety or fundamental rights - for example if it only performs a narrow procedural task, improves the result of a prior human activity, or detects decision-making patterns without replacing human judgement. The crucial caveat is that this exception does not apply if the system profiles natural persons. If it profiles people, it stays high-risk.'
  },
  {
    q: 'When do the high-risk and transparency rules apply?',
    a: 'Under the regulation as enacted, most high-risk obligations (stand-alone Annex III systems) and the Article 50 transparency duties apply from 2 August 2026. High-risk AI that is a safety component of an Annex I product applies from 2 August 2027. A proposed Digital Omnibus on AI, in provisional agreement as of May 2026, would postpone Annex III high-risk to 2 December 2027, but it is not yet law as of June 2026 - so plan to the 2 August 2026 date. The Article 5 prohibitions and the AI literacy duty have already been in force since 2 February 2025, and the GPAI rules since 2 August 2025.'
  }
];

export default function RiskClassifierPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI Act Risk Classifier',
            url: CANONICAL,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any (web)',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'A free interactive tool that helps a business work out its EU AI Act risk tier - prohibited, high-risk, limited/transparency or minimal - its role, and what to do next.'
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to classify your AI system under the EU AI Act',
            description:
              'Work out your EU AI Act risk tier by checking your EU nexus, whether the system is a prohibited practice, whether it is high-risk, whether transparency duties apply, and your role.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Check your EU nexus',
                text: "Confirm whether you are established or operating in the EU, place AI on the EU market, or your AI's output is used in the Union (Article 2)."
              },
              {
                '@type': 'HowToStep',
                name: 'Check for prohibited practices',
                text: 'Confirm whether your system does any of the eight Article 5 practices banned since 2 February 2025.'
              },
              {
                '@type': 'HowToStep',
                name: 'Check for high-risk',
                text: 'Confirm whether it is a safety component of an Annex I product or used in one of the eight Annex III areas, then apply the Article 6(3) filter.'
              },
              {
                '@type': 'HowToStep',
                name: 'Check for transparency duties',
                text: 'Confirm whether it is a chatbot, generates or manipulates content, or does emotion recognition / biometric categorisation (Article 50).'
              }
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a }
            }))
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://aiact-navigator.com/'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Tools',
                item: 'https://aiact-navigator.com/tools'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Risk classifier',
                item: CANONICAL
              }
            ]
          },
          webPage({
            name: 'AI Act Risk Classifier: What Tier Is Your AI System?',
            path: '/risk-classifier',
            description:
              'Answer a few plain-English questions to find out your EU AI Act risk tier, your role, and what to do next. Free and caveated guidance.'
          })
        ]}
      />

      {/* Hero intro */}
      <section className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container className="relative z-10 py-16 lg:py-24" size="md">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Free tool
          </p>
          <h1 className="mt-4 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            AI Act Risk Classifier
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            Not sure where your AI system sits under the EU AI Act? Answer a few plain-English
            questions and get a tailored steer: your risk tier, your role, when the rules apply,
            and what to do next.
          </p>
        </Container>
      </section>

      {/* The tool */}
      <Section background="sand" id="classifier">
        <RiskClassifier />
      </Section>

      {/* How the tiers work (SEO / GEO supporting section) */}
      <Section background="paper" containerSize="md">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            The short version
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="conversion_path" className="text-primary text-3xl" />
            How the AI Act risk tiers work
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            The Act sorts AI by the risk it poses, and obligations scale with that risk. Here are
            the four tiers, plus the separate general-purpose AI track, in plain English.
          </p>
        </div>
        <div className="mt-12">
        <TLDR>
          The EU AI Act puts every AI system into one of four tiers. Prohibited practices (Article 5)
          are banned. High-risk systems - Annex I safety components or one of eight Annex III use-cases
          - carry the fullest duties. Limited / transparency risk (Article 50) means disclosure and
          labelling for chatbots and AI-generated content. Everything else is minimal risk, with no
          mandatory duties. General-purpose AI models sit on their own track. Most high-risk and
          transparency duties apply from 2 August 2026.
        </TLDR>

        <Prose className="mt-10">
          <h3 className="inline-flex items-center gap-2">
            <Icon name="block" className="text-primary text-xl" />
            Prohibited - unacceptable risk
          </h3>
          <p>
            Article 5 bans a short list of practices outright, including subliminal or manipulative
            techniques that cause harm, exploiting vulnerabilities, social scoring, predicting
            criminality from profiling alone, untargeted scraping of facial images, emotion
            recognition at work or school, biometric categorisation by sensitive traits, and
            real-time remote biometric identification in public for law enforcement. These have been
            banned since 2 February 2025 and carry the steepest fines.{' '}
            <SourceCite href={ART5}>Regulation (EU) 2024/1689, Article 5</SourceCite>
          </p>

          <h3 className="inline-flex items-center gap-2">
            <Icon name="gpp_maybe" className="text-primary text-xl" />
            High-risk
          </h3>
          <p>
            There are two routes into the high-risk tier. The first is AI that is a safety component
            of a product regulated under Annex I (machinery, medical devices, toys, vehicles and so
            on). The second is AI used in one of eight Annex III areas: biometrics; critical
            infrastructure; education; employment and worker management; access to essential services
            including credit scoring and life or health insurance pricing; law enforcement; migration
            and border control; and justice and democratic processes. An Article 6(3) filter can take
            a narrow-task Annex III system out of the high-risk tier - but never if it profiles
            people.{' '}
            <SourceCite href={ART6}>Regulation (EU) 2024/1689, Article 6</SourceCite>
          </p>

          <h3 className="inline-flex items-center gap-2">
            <Icon name="visibility" className="text-primary text-xl" />
            Limited / transparency risk
          </h3>
          <p>
            Article 50 adds transparency duties for AI that interacts with people or generates
            content. Users must be told when they are dealing with a chatbot; AI-generated or
            manipulated content must be machine-readably marked; deepfakes must be disclosed; and
            people exposed to emotion recognition or biometric categorisation must be informed.{' '}
            <SourceCite href={ART50}>Regulation (EU) 2024/1689, Article 50</SourceCite>
          </p>

          <h3 className="inline-flex items-center gap-2">
            <Icon name="check_circle" className="text-primary text-xl" />
            Minimal risk, plus the GPAI track
          </h3>
          <p>
            Everything not in the tiers above is minimal risk, with no mandatory obligations - though
            the cross-cutting AI literacy duty (Article 4) still applies to all AI. General-purpose AI
            models, such as large language models, are regulated separately under Chapter V, with extra
            duties for models that pose systemic risk.{' '}
            <SourceCite href={EC_HOME}>European Commission, regulatory framework on AI</SourceCite>
          </p>
        </Prose>

        <div className="mt-8">
          <Callout variant="warn" title="One part of the timeline is still moving">
            A proposed Digital Omnibus on AI reached provisional political agreement in May 2026 and
            would postpone stand-alone Annex III high-risk obligations from 2 August 2026 to 2 December
            2027, and add a ninth Article 5 prohibition. It is not law yet, so we treat 2 August 2026
            as the operative date in this tool. We will update the page if it is adopted.
          </Callout>
        </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="sand" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="help" className="text-primary text-3xl" />
          Risk-tier questions people ask
        </h2>
        <div className="mt-12 space-y-4">
          {FAQ.map((item, i) => (
            <RevealOnScroll key={item.q} delay={i}>
              <details className="group rounded-card border border-line bg-card p-5 lg:p-6">
                <summary className="cursor-pointer list-none font-display font-semibold text-lg text-ink marker:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent-deep transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-open:rotate-45"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-ink/85 leading-relaxed">{item.a}</p>
              </details>
            </RevealOnScroll>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted leading-relaxed">
          This is guidance to help you understand the EU AI Act, not legal advice. For
          decisions specific to your business, confirm with the official sources we link or a
          qualified adviser.
        </p>

        <Sources
          items={[
            {
              href: EURLEX,
              label: 'Regulation (EU) 2024/1689 (EU AI Act), full text on EUR-Lex',
              retrieved: '9 Jun 2026'
            },
            {
              href: EC_HOME,
              label: 'European Commission, regulatory framework on artificial intelligence',
              retrieved: '9 Jun 2026'
            }
          ]}
        />
      </Section>
    </>
  );
}
