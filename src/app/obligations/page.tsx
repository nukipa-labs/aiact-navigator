import type { Metadata } from 'next';
import Link from 'next/link';
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
import { ObligationsCalculator } from './ObligationsCalculator';

const CANONICAL = 'https://aiact-navigator.com/obligations';

export const metadata: Metadata = {
  title: 'AI Act Obligations Checker: What Must You Do? | AI Act Navigator',
  description:
    'Your EU AI Act duties depend on your role and your risk tier. Answer a few questions and see exactly what applies to you - by article - and from when. Free.',
  alternates: { canonical: '/obligations' },
  openGraph: {
    title: 'What AI Act obligations apply to me?',
    description:
      'Tell us your role and risk tier, and see your EU AI Act obligations article by article, plus when they apply. Free, plain English.',
    url: CANONICAL,
    type: 'website'
  }
};

const EURLEX = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj';
const ART16 = 'https://artificialintelligenceact.eu/article/16/';
const ART26 = 'https://artificialintelligenceact.eu/article/26/';
const ART27 = 'https://artificialintelligenceact.eu/article/27/';
const ART53 = 'https://artificialintelligenceact.eu/article/53/';

const FAQ = [
  {
    q: 'What are the high-risk provider obligations?',
    a: 'A provider of a high-risk AI system carries the fullest set of duties in the Act. These include a risk management system (Article 9), data and data governance (Article 10), technical documentation per Annex IV (Article 11), record-keeping and automatic logging (Article 12), transparency and instructions for use (Article 13), human oversight by design (Article 14), accuracy, robustness and cybersecurity (Article 15), a quality management system (Article 17), a conformity assessment before market placement (Article 43), an EU declaration of conformity and CE marking (Articles 47-48), registration in the EU database (Article 49), and post-market monitoring with serious-incident reporting (Articles 72-73). A non-EU provider must also appoint an EU authorised representative (Article 22).'
  },
  {
    q: 'What does a high-risk deployer have to do?',
    a: "A deployer uses a high-risk AI system under its own authority and has lighter but real duties under Article 26: use the system in line with the provider's instructions, assign human oversight to competent and trained people, make sure input data it controls is relevant and representative, monitor operation and suspend use if risks arise, keep the system's logs for at least six months, inform affected workers and their representatives before workplace deployment, and inform people subject to high-risk decisions. Public bodies, and deployers using the system for credit scoring or insurance pricing, must also carry out a Fundamental Rights Impact Assessment (Article 27)."
  },
  {
    q: 'What is a Fundamental Rights Impact Assessment (FRIA)?',
    a: 'A FRIA is an assessment that certain deployers of high-risk AI must complete before putting the system into use, under Article 27. It applies to deployers that are public bodies or public-service providers, and to systems used for credit scoring or for life and health insurance risk assessment and pricing. It is a deployer duty, not a provider duty, though providers can help by giving clear instructions for use.'
  },
  {
    q: 'What must a general-purpose AI model provider do?',
    a: 'Under Article 53, every GPAI model provider must keep technical documentation of the model, give downstream providers the information they need to integrate it, put in place a policy to comply with EU copyright law (including text-and-data-mining opt-outs), and publish a summary of the content used for training. If the model crosses the systemic-risk threshold (training compute above 10^25 FLOP), Article 55 adds model evaluation and adversarial testing, systemic-risk assessment and mitigation, serious-incident reporting to the AI Office, and adequate cybersecurity. The GPAI Code of Practice is the main tool for showing compliance. These rules have applied since 2 August 2025.'
  }
];

const ROLE_CARDS = [
  {
    title: 'High-risk provider',
    who: 'You develop and brand the high-risk AI system.',
    does: 'The fullest set of duties, across the lifecycle: risk management (Art. 9), data governance (Art. 10), technical documentation (Art. 11), logging (Art. 12), instructions for use (Art. 13), human oversight (Art. 14), accuracy and cybersecurity (Art. 15), a quality management system (Art. 17), conformity assessment (Art. 43), CE marking and declaration of conformity (Arts. 47-48), registration (Art. 49), and post-market monitoring (Arts. 72-73).'
  },
  {
    title: 'High-risk deployer',
    who: 'You use the high-risk system under your own authority.',
    does: 'Use it per the instructions, assign human oversight, keep input data representative, monitor and suspend if needed, keep logs for at least six months, and inform affected workers and people. Public bodies and credit / insurance uses must also run a Fundamental Rights Impact Assessment (Art. 27).'
  },
  {
    title: 'Limited / transparency (any role)',
    who: 'Your system is a chatbot, generates content, or recognises emotion.',
    does: 'The Article 50 disclosure and labelling duties: tell users they are dealing with AI, machine-readably mark AI-generated content (provider), disclose deepfakes (deployer), and inform people exposed to emotion recognition or biometric categorisation.'
  },
  {
    title: 'GPAI model provider',
    who: 'You provide a general-purpose AI model, such as an LLM.',
    does: 'The separate Chapter V track: technical documentation, downstream information, a copyright policy and a training-data summary (Art. 53), plus model evaluation, systemic-risk mitigation and incident reporting (Art. 55) if the model poses systemic risk.'
  }
];

export default function ObligationsPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI Act Obligations Checker',
            url: CANONICAL,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any (web)',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "A free interactive tool that works out which EU AI Act obligations apply to a business based on its role and its AI system's risk tier, with article references and the relevant dates."
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to work out your EU AI Act obligations',
            description:
              "Find your EU AI Act obligations by checking your role, your AI system's risk tier, whether a general-purpose AI model is involved, and whether a Fundamental Rights Impact Assessment applies.",
            step: [
              {
                '@type': 'HowToStep',
                name: 'Check your role',
                text: 'Confirm whether you are a provider, deployer, importer or distributor (Article 3). The provider carries the heaviest obligations.'
              },
              {
                '@type': 'HowToStep',
                name: 'Check your risk tier',
                text: 'Confirm whether your system is prohibited, high-risk, limited/transparency or minimal. If unsure, run the risk classifier first.'
              },
              {
                '@type': 'HowToStep',
                name: 'Check for a general-purpose AI model',
                text: 'Confirm whether you provide a general-purpose AI model, which triggers the separate Chapter V track (Articles 53 and 55).'
              },
              {
                '@type': 'HowToStep',
                name: 'Check whether a FRIA applies',
                text: 'For high-risk deployers, confirm whether you are a public body or use the system for credit or insurance, which triggers a Fundamental Rights Impact Assessment (Article 27).'
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
                name: 'Obligations checker',
                item: CANONICAL
              }
            ]
          },
          webPage({
            name: 'AI Act Obligations Checker: What Must You Do?',
            path: '/obligations',
            description:
              'Your EU AI Act duties depend on your role and your risk tier. Answer a few questions and see exactly what applies to you, by article, and from when. Free.'
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
            AI Act Obligations Checker
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            Your duties under the EU AI Act turn on two things: your role and your risk tier. Tell us
            both and see exactly what applies to you - article by article - and from when. You get a
            plain-English verdict and a tailored checklist, all on this page.
          </p>
          <p className="mt-4 text-sm text-muted leading-relaxed">
            Not sure what tier your system is?{' '}
            <Link href="/risk-classifier" className="text-primary link-underline font-medium">
              Start with the risk classifier
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* The calculator */}
      <Section background="sand" id="calculator">
        <ObligationsCalculator />
      </Section>

      {/* Obligations by role × tier (SEO / GEO supporting section) */}
      <Section background="paper" containerSize="md">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            How duties are assigned
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            <Icon name="groups" className="text-primary text-3xl" />
            Obligations by role and tier
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            The Act crosses your role (provider, deployer, importer, distributor) with your risk tier
            to set your duties. Here are the headline duties for the most common combinations.
          </p>
        </div>
        <div className="mt-12">
        <TLDR>
          Under the EU AI Act, the high-risk provider carries the fullest duties - from risk
          management and technical documentation to conformity assessment, CE marking and post-market
          monitoring. The high-risk deployer uses the system per instructions, keeps human oversight
          and logs, informs affected people, and runs a Fundamental Rights Impact Assessment where it
          is a public body or uses the system for credit or insurance. Limited / transparency systems
          carry Article 50 disclosure duties, minimal-risk systems carry none, and general-purpose AI
          model providers follow a separate track. Most duties apply from 2 August 2026.
        </TLDR>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {ROLE_CARDS.map((card, i) => (
            <RevealOnScroll key={card.title} delay={i}>
              <div className="h-full rounded-card border border-line bg-card p-6">
                <h3 className="font-display font-semibold text-lg text-ink leading-snug">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-accent-deep leading-relaxed">
                  {card.who}
                </p>
                <p className="mt-3 text-ink/85 leading-relaxed">{card.does}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <Prose className="mt-12">
          <h3 className="inline-flex items-center gap-2">
            <Icon name="priority_high" className="text-primary text-xl" />
            Why role and tier matter most
          </h3>
          <p>
            Two questions decide most of your AI Act duties. The first is your tier: a prohibited
            practice cannot be made compliant, a high-risk system carries the fullest duties, a
            limited / transparency system mainly has to be open about what it is, and a minimal-risk
            system has no mandatory duties at all. The second is your role: the provider, who builds
            and brands the AI, shoulders far more than a deployer, who uses it.{' '}
            <SourceCite href={ART16}>Regulation (EU) 2024/1689, Article 16</SourceCite>
          </p>
          <p>
            For a high-risk system, the provider runs the full programme - risk management, data
            governance, technical documentation, logging, instructions for use, human oversight,
            accuracy and cybersecurity, a quality management system, conformity assessment, CE
            marking, registration and post-market monitoring. A deployer's duties are lighter but
            real: use the system as instructed, keep effective human oversight, retain logs, and
            inform the workers and individuals affected.{' '}
            <SourceCite href={ART26}>Regulation (EU) 2024/1689, Article 26</SourceCite>
          </p>
          <p>
            Some deployers carry an extra duty: public bodies and public-service providers, and
            anyone using a high-risk system for credit scoring or insurance risk assessment and
            pricing, must complete a Fundamental Rights Impact Assessment before deployment.{' '}
            <SourceCite href={ART27}>Regulation (EU) 2024/1689, Article 27</SourceCite> Providers of
            general-purpose AI models sit on a separate track, with documentation, downstream
            information, a copyright policy and a training-data summary, plus systemic-risk duties for
            the largest models.{' '}
            <SourceCite href={ART53}>Regulation (EU) 2024/1689, Article 53</SourceCite>
          </p>
        </Prose>

        <div className="mt-8">
          <Callout variant="warn" title="One part of the timeline is still moving">
            A proposed Digital Omnibus on AI, in provisional political agreement as of May 2026, would
            postpone stand-alone Annex III high-risk obligations from 2 August 2026 to 2 December 2027,
            shorten the transparency grace period, and add a ninth Article 5 prohibition. It is not
            law yet, so we treat 2 August 2026 as the operative date in this tool. We will update this
            page if it is adopted.
          </Callout>
        </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section background="sand" containerSize="md">
        <h2 className="inline-flex items-center gap-2 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
          <Icon name="help" className="text-primary text-3xl" />
          Obligations questions people ask
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
          This is guidance to help you understand the EU AI Act, not legal advice. For decisions
          specific to your business, confirm with the official sources we link or a qualified adviser.
        </p>

        <Sources
          items={[
            {
              href: EURLEX,
              label: 'Regulation (EU) 2024/1689 (EU AI Act), full text on EUR-Lex',
              retrieved: '9 Jun 2026'
            },
            {
              href: ART16,
              label: 'AI Act, Article 16 - obligations of providers of high-risk AI systems',
              retrieved: '9 Jun 2026'
            },
            {
              href: ART26,
              label: 'AI Act, Article 26 - obligations of deployers of high-risk AI systems',
              retrieved: '9 Jun 2026'
            }
          ]}
        />
      </Section>
    </>
  );
}
