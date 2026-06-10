import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { RISK_TIERS } from '@/lib/images';
import {
  Container,
  Section,
  Button,
  TLDR,
  Callout,
  SourceCite,
  Sources,
  JsonLd,
  RevealOnScroll,
  ContourBackground,
  NewsletterSignup,
  Stat,
  Stats,
  Prose,
  Icon
} from '@/components/ui';
import { REVIEWED_BY, DATE_MODIFIED } from '@/lib/schema';

const SITE = 'https://aiact-navigator.com';
const PUBLISHED = '2025-09-01';
const MODIFIED = DATE_MODIFIED;

// Canonical official sources (from /Users/steffeniwan/Claude/AIACT/research.md).
const SRC = {
  eurlex: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
  ecHome: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
  summary: 'https://artificialintelligenceact.eu/high-level-summary/',
  art5: 'https://artificialintelligenceact.eu/article/5/',
  art6: 'https://artificialintelligenceact.eu/article/6/',
  annex3: 'https://artificialintelligenceact.eu/annex/3/',
  art50: 'https://artificialintelligenceact.eu/article/50/',
  art2: 'https://artificialintelligenceact.eu/article/2/',
  art4: 'https://artificialintelligenceact.eu/article/4/',
  art16: 'https://artificialintelligenceact.eu/article/16/',
  art26: 'https://artificialintelligenceact.eu/article/26/',
  art53: 'https://artificialintelligenceact.eu/article/53/',
  art55: 'https://artificialintelligenceact.eu/article/55/',
  gpaiGuidelines: 'https://artificialintelligenceact.eu/gpai-guidelines-overview/',
  codeOfPractice: 'https://artificialintelligenceact.eu/introduction-to-code-of-practice/',
  art99: 'https://artificialintelligenceact.eu/article/99/',
  art40: 'https://artificialintelligenceact.eu/article/40/',
  art113: 'https://artificialintelligenceact.eu/article/113/',
  timeline: 'https://artificialintelligenceact.eu/implementation-timeline/',
  council:
    'https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/',
  iso42001:
    'https://www.isms.online/frameworks/iso-42001/iso-42001-harmonised-standards-eu-ai-act-presumption-of-conformity/'
};

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: 'What is the EU AI Act?',
    a: "The EU AI Act is Regulation (EU) 2024/1689, the world's first comprehensive law on artificial intelligence. It takes a risk-based approach, sorting AI into four tiers, prohibited, high-risk, limited (transparency) risk and minimal risk, with obligations that scale with the risk. General-purpose AI models are regulated on a separate track. It entered into force on 1 August 2024 and applies in phases through 2027."
  },
  {
    q: 'When does the EU AI Act apply?',
    a: 'In phases. The Article 5 prohibitions and the Article 4 AI literacy duty have applied since 2 February 2025. GPAI model rules, governance and penalties since 2 August 2025. Most high-risk (Annex III) and transparency obligations from 2 August 2026, and AI embedded in regulated products from 2 August 2027. A proposed Digital Omnibus would postpone the Annex III high-risk date to 2 December 2027, but that is not yet law as of June 2026.'
  },
  {
    q: 'What are the four risk tiers?',
    a: 'Prohibited (unacceptable) practices are banned outright under Article 5, for example social scoring and untargeted facial-image scraping. High-risk AI, the eight Annex III use-case areas plus AI that is a safety component of regulated products, carries the strictest obligations. Limited-risk AI (chatbots, deepfakes, AI-generated content) carries transparency duties under Article 50. Everything else is minimal-risk with no mandatory obligations.'
  },
  {
    q: 'Does the AI Act apply to non-EU or US companies?',
    a: 'Yes, it can. The Act has extraterritorial reach. A company with no EU establishment is still in scope if it places an AI system or GPAI model on the EU market, or if the output produced by its AI is used in the EU. This "output used in the Union" trigger gives it broad reach comparable to GDPR, and non-EU high-risk providers must appoint an EU authorised representative.'
  },
  {
    q: 'What is the difference between a provider and a deployer?',
    a: 'A provider develops an AI system or GPAI model (or has it developed) and places it on the market or puts it into service under its own name or trademark, and carries the heaviest obligations for high-risk systems. A deployer uses an AI system under its own authority in a professional capacity. A deployer can be reclassified as a provider if it puts its name on a high-risk system, substantially modifies it, or changes its intended purpose.'
  },
  {
    q: 'How are general-purpose AI (GPAI) models regulated?',
    a: 'On a separate track under Chapter V. All GPAI model providers must keep technical documentation, give information to downstream providers, have a policy to comply with EU copyright law, and publish a summary of training content. Models presumed to carry systemic risk (training compute above 10^25 FLOP) face extra duties: model evaluation and adversarial testing, systemic-risk mitigation, serious-incident reporting and cybersecurity. The GPAI Code of Practice helps demonstrate compliance.'
  },
  {
    q: 'What are the penalties under the EU AI Act?',
    a: 'Fines are tiered. Breaching the Article 5 prohibited practices can cost up to €35 million or 7% of worldwide annual turnover, whichever is higher. Most other breaches are capped at €15 million or 3%, and supplying misleading information at €7.5 million or 1%. For SMEs and start-ups the lower of the two figures applies. The penalty regime has been in force since 2 August 2025.'
  },
  {
    q: 'Does ISO/IEC 42001 mean I comply with the AI Act?',
    a: 'Not on its own. ISO/IEC 42001 is the international standard for an AI management system and is strong evidence of governance maturity, but it is not a harmonised European standard under the Act and confers no automatic presumption of conformity. That presumption comes from following harmonised standards once their references are published in the Official Journal. ISO/IEC 42001 is a head-start on the controls, not a legal compliance shield.'
  }
];

export const metadata: Metadata = {
  title: 'EU AI Act Compliance: The Complete Guide',
  description:
    'A plain-English guide to the EU AI Act (Regulation (EU) 2024/1689): the four risk tiers, who must comply, extraterritorial reach, GPAI rules, obligations, deadlines and penalties.',
  alternates: { canonical: '/ai-act' },
  openGraph: {
    type: 'article',
    title: 'EU AI Act Compliance: The Complete Guide',
    description:
      'Plain-English guide to the EU AI Act: the four risk tiers, who complies, GPAI rules, obligations, deadlines and penalties. Sourced and kept current.',
    url: `${SITE}/ai-act`,
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'AI Act Navigator' }]
  }
};

export default function AiActPillarPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EU AI Act Compliance: The Complete Guide',
    description:
      'A plain-English guide to the EU AI Act (Regulation (EU) 2024/1689): the four risk tiers, who must comply, extraterritorial reach, GPAI rules, obligations, deadlines and penalties.',
    inLanguage: 'en',
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/ai-act` },
    author: { '@type': 'Organization', name: 'AI Act Navigator', url: SITE },
    publisher: { '@type': 'Organization', name: 'AI Act Navigator', url: SITE },
    reviewedBy: REVIEWED_BY,
    about: {
      '@type': 'Legislation',
      name: 'Regulation (EU) 2024/1689 (Artificial Intelligence Act)',
      legislationIdentifier: 'Regulation (EU) 2024/1689',
      url: SRC.eurlex
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'What is the EU AI Act?', item: `${SITE}/ai-act` }
    ]
  };

  return (
    <>
      <JsonLd data={[articleSchema, faqSchema, breadcrumbSchema]} />

      {/* Hero */}
      <header className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container size="md" className="relative z-10 py-16 lg:py-24">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            The plain-English explainer
          </p>
          <h1 className="mt-3 font-display font-semibold text-4xl lg:text-6xl text-ink leading-tight">
            EU AI Act compliance: the complete guide
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-ink/80 leading-relaxed">
            The EU AI Act is the world&apos;s first comprehensive law on artificial intelligence. It
            sorts AI into four risk tiers and scales the rules to match, with the strictest
            obligations reserved for a defined set of high-risk uses.{' '}
            <SourceCite href={SRC.eurlex}>Regulation (EU) 2024/1689</SourceCite> sets all of this
            out; this page explains it without the legalese.
          </p>

          <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted">
            <Icon name="verified" className="text-primary text-base" />
            Reviewed by the AI Act Navigator team
          </p>

          <div className="mt-8">
            <TLDR>
              <ul className="space-y-2">
                <li>
                  <strong className="font-semibold">What:</strong> the EU Artificial Intelligence
                  Act, Regulation (EU) 2024/1689, the first horizontal AI law.
                </li>
                <li>
                  <strong className="font-semibold">Approach:</strong> four risk tiers, prohibited,
                  high-risk, limited (transparency) and minimal, with a separate track for
                  general-purpose AI models.
                </li>
                <li>
                  <strong className="font-semibold">Who:</strong> providers and deployers of AI,
                  including non-EU and US companies whose AI reaches the EU.
                </li>
                <li>
                  <strong className="font-semibold">When:</strong> phased. Bans + AI literacy since
                  2 Feb 2025; GPAI + governance + penalties since 2 Aug 2025; most high-risk +
                  transparency from 2 Aug 2026.
                </li>
                <li>
                  <strong className="font-semibold">Penalties:</strong> up to €35m or 7% of
                  worldwide turnover for prohibited practices.
                </li>
              </ul>
            </TLDR>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/risk-classifier" variant="primary">
              Find your risk tier
            </Button>
            <Button href="/glossary" variant="secondary">
              Open the glossary
            </Button>
          </div>
        </Container>
      </header>

      {/* Phased deadlines band */}
      <Section background="ink" eyebrow="The phased deadlines">
        <RevealOnScroll>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <Icon name="event_available" className="text-accent text-3xl" />
              <p className="mt-2 font-display text-3xl lg:text-4xl font-semibold text-accent">
                Already in force
              </p>
              <p className="mt-2 text-paper/80">
                The Article 5 prohibitions and Article 4 AI literacy duty (since 2 Feb 2025), and
                GPAI rules, governance and penalties (since 2 Aug 2025).
              </p>
            </div>
            <div>
              <Icon name="event" className="text-accent text-3xl" />
              <p className="mt-2 font-display text-3xl lg:text-4xl font-semibold text-accent">
                2 August 2026
              </p>
              <p className="mt-2 text-paper/80">
                Most high-risk (Annex III) and Article 50 transparency obligations begin to apply.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-paper/70">
            ⚠️ A proposed Digital Omnibus would push the Annex III high-risk date to 2 December 2027.
            It is PROPOSED, not yet law as of 9 June 2026.{' '}
            <SourceCite href={SRC.council}>Council, provisional agreement</SourceCite>.{' '}
            <Link href="/timeline" className="text-accent underline-offset-2 hover:underline">
              See the full timeline tracker
            </Link>
            .
          </p>
        </RevealOnScroll>
      </Section>

      {/* Main long-form */}
      <Section background="paper">
        <Prose className="max-w-3xl">
          <RevealOnScroll>
            <h2 id="what-it-is" className="inline-flex items-center gap-2">
              <Icon name="smart_toy" className="text-primary text-2xl" />
              What the AI Act is, and how it works
            </h2>
            <p>
              The EU Artificial Intelligence Act, the AI Act for short, is{' '}
              <SourceCite href={SRC.eurlex}>Regulation (EU) 2024/1689</SourceCite>. It is the
              world&apos;s first comprehensive horizontal law on artificial intelligence, setting
              harmonised rules for placing AI systems and general-purpose AI models on the EU market
              and putting them into service, to protect safety and fundamental rights while
              supporting innovation. As a directly applicable EU Regulation it is binding in every
              Member State with no national transposition needed.{' '}
              <SourceCite href={SRC.ecHome}>European Commission</SourceCite>
            </p>
            <p>
              Its central idea is a <strong>risk-based approach</strong>: the obligations scale with
              the level of risk an AI system poses, across four tiers, unacceptable (prohibited),
              high-risk, limited (transparency) risk and minimal risk. General-purpose AI models are
              regulated on a separate track. Most everyday AI sits in the lighter tiers with few or
              no new duties.{' '}
              <SourceCite href={SRC.summary}>High-level summary</SourceCite>
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="risk-tiers" className="inline-flex items-center gap-2">
              <Icon name="stacked_bar_chart" className="text-primary text-2xl" />
              The four risk tiers
            </h2>
            <p>Everything in the Act flows from working out which tier your AI sits in.</p>
          </RevealOnScroll>
        </Prose>

        <RevealOnScroll>
          <figure className="mx-auto mt-8 max-w-3xl">
            <Image
              src={RISK_TIERS.src}
              alt={RISK_TIERS.alt}
              width={RISK_TIERS.width}
              height={RISK_TIERS.height}
              className="w-full rounded-card border border-line"
            />
          </figure>
        </RevealOnScroll>

        {/* Risk tier cards */}
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="block" className="text-danger text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                Prohibited (unacceptable)
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Eight practices banned outright under{' '}
                <Link href="/glossary#prohibited-practice" className="text-primary hover:underline">
                  Article 5
                </Link>
                . Banned since 2 February 2025.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="warning" className="text-accent-deep text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">High-risk</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                AI in the eight{' '}
                <Link href="/high-risk" className="text-primary hover:underline">
                  Annex III
                </Link>{' '}
                areas, or built into regulated products. The strictest obligations.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="visibility" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                Limited (transparency)
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Chatbots, deepfakes and AI-generated content. Must be disclosed or labelled under
                Article 50.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="check_circle" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">Minimal</h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Everything else, such as spam filters and AI in games. No mandatory obligations;
                voluntary codes encouraged.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="prohibited" className="inline-flex items-center gap-2">
              <Icon name="block" className="text-primary text-2xl" />
              Prohibited practices (Article 5)
            </h2>
            <p>
              These uses are deemed an unacceptable risk and are banned outright, with effect from
              2 February 2025.{' '}
              <SourceCite href={SRC.art5}>Article 5</SourceCite>
            </p>
            <ol>
              <li>
                <strong>Subliminal, manipulative or deceptive techniques</strong> that materially
                distort behaviour and cause significant harm.
              </li>
              <li>
                <strong>Exploiting vulnerabilities</strong> due to age, disability or
                socio-economic situation to distort behaviour and cause harm.
              </li>
              <li>
                <strong>Social scoring</strong> that leads to detrimental or unjustified treatment.
              </li>
              <li>
                <strong>Predictive policing based solely on profiling</strong> a person&apos;s risk
                of committing a crime.
              </li>
              <li>
                <strong>Untargeted scraping of facial images</strong> from the internet or CCTV to
                build facial-recognition databases.
              </li>
              <li>
                <strong>Emotion recognition</strong> in the workplace and in education (except
                medical or safety reasons).
              </li>
              <li>
                <strong>Biometric categorisation</strong> inferring sensitive attributes such as
                race, political opinions or sexual orientation.
              </li>
              <li>
                <strong>&ldquo;Real-time&rdquo; remote biometric identification</strong> in public
                spaces for law enforcement, with narrow, authorised exceptions.
              </li>
            </ol>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="warn" title="Proposed, not yet law: a 9th prohibition">
              A proposed Digital Omnibus would add a ninth Article 5 ban, on AI generating
              non-consensual intimate imagery (&ldquo;nudifier&rdquo; apps) and AI-generated child
              sexual abuse material. As of 9 June 2026 this is a provisional political agreement,
              not yet adopted into law.{' '}
              <SourceCite href={SRC.council}>Council, provisional agreement</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>

        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="high-risk" className="inline-flex items-center gap-2">
              <Icon name="warning" className="text-primary text-2xl" />
              High-risk AI: two routes in
            </h2>
            <p>
              An AI system is high-risk by one of two routes.{' '}
              <SourceCite href={SRC.art6}>Article 6</SourceCite>
            </p>
            <ul>
              <li>
                <strong>Route 1, Annex I, safety components.</strong> AI that is a safety component
                of, or is itself, a product covered by existing EU product-safety law (machinery,
                medical devices, toys, lifts, radio equipment, motor vehicles, aviation) and
                required to undergo third-party conformity assessment.
              </li>
              <li>
                <strong>Route 2, Annex III, listed use cases.</strong> Stand-alone AI used in one of
                eight defined areas.
              </li>
            </ul>
            <p>
              The eight <Link href="/high-risk">Annex III areas</Link> are:{' '}
              <SourceCite href={SRC.annex3}>Annex III</SourceCite>
            </p>
            <ol>
              <li>
                <strong>Biometrics</strong> (remote ID, categorisation, emotion recognition where
                not prohibited).
              </li>
              <li>
                <strong>Critical infrastructure</strong> (safety components for traffic, water, gas,
                heating, electricity, digital infrastructure).
              </li>
              <li>
                <strong>Education and vocational training</strong> (admissions, assessment,
                exam proctoring).
              </li>
              <li>
                <strong>Employment and worker management</strong> (recruitment, screening,
                promotion, monitoring).
              </li>
              <li>
                <strong>Access to essential services</strong> (credit scoring, public benefits,
                life and health insurance pricing, emergency triage).
              </li>
              <li>
                <strong>Law enforcement</strong> (risk assessment, polygraphs, evidence
                evaluation, profiling).
              </li>
              <li>
                <strong>Migration, asylum and border control</strong> (risk assessment, application
                examination, person detection).
              </li>
              <li>
                <strong>Administration of justice and democratic processes</strong> (assisting
                judges, influencing elections).
              </li>
            </ol>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="info" title="The Article 6(3) filter: not every Annex III system is high-risk">
              <span className="inline-flex items-start gap-2">
                <Icon name="filter_alt" className="text-primary text-xl shrink-0" />
                <span>
                  An Annex III system is <strong>not</strong> high-risk if it does not pose a
                  significant risk of harm, for example because it performs a narrow procedural
                  task, improves a prior human activity, or does preparatory work without replacing
                  human judgement. Important caveat: the exception <strong>does not apply</strong> if
                  the system profiles natural persons. Don&apos;t assume the filter gets you out, work
                  it through.{' '}
                  <SourceCite href={SRC.art6}>Article 6(3)</SourceCite>
                </span>
              </span>
            </Callout>
          </RevealOnScroll>
        </div>

        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="transparency" className="inline-flex items-center gap-2">
              <Icon name="visibility" className="text-primary text-2xl" />
              Limited risk: the transparency duties (Article 50)
            </h2>
            <p>
              Some AI is not high-risk but still needs to be honest about what it is.{' '}
              <SourceCite href={SRC.art50}>Article 50</SourceCite>
            </p>
            <ul>
              <li>
                <strong>Chatbots:</strong> people must be told they are interacting with an AI,
                unless it is obvious.
              </li>
              <li>
                <strong>AI-generated content:</strong> providers must mark synthetic audio, image,
                video or text in a machine-readable way.
              </li>
              <li>
                <strong>Deepfakes:</strong> deployers must disclose that content is artificially
                generated or manipulated.
              </li>
              <li>
                <strong>Emotion recognition and biometric categorisation:</strong> deployers must
                inform the people exposed to it.
              </li>
            </ul>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="who-must-comply" className="inline-flex items-center gap-2">
              <Icon name="groups" className="text-primary text-2xl" />
              Who must comply, and the extraterritorial reach
            </h2>
            <p>
              The duties fall mainly on two roles, with importers, distributors and product
              manufacturers also caught.{' '}
              <SourceCite href={SRC.art16}>Articles 16 and 26</SourceCite>
            </p>
          </RevealOnScroll>
        </Prose>

        {/* Provider / deployer cards */}
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="construction" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                <Link href="/glossary#provider" className="text-ink hover:text-primary">
                  Provider
                </Link>
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Develops an AI system or GPAI model and places it on the market under its own name.
                Carries the heaviest load for high-risk systems: risk management, data governance,
                documentation, conformity assessment and CE marking.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-6">
              <Icon name="business_center" className="text-primary text-3xl" />
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                <Link href="/glossary#deployer" className="text-ink hover:text-primary">
                  Deployer
                </Link>
              </h3>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">
                Uses an AI system under its own authority in a professional context. Must follow the
                instructions for use, assign human oversight, monitor operation and, in some cases,
                run a Fundamental Rights Impact Assessment.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <Prose className="max-w-3xl mt-8">
          <RevealOnScroll>
            <p>
              A deployer, importer or distributor can be <strong>reclassified as a provider</strong>{' '}
              (taking on full provider duties) if it puts its name on a high-risk system,
              substantially modifies it, or changes its intended purpose.{' '}
              <SourceCite href={SRC.art16}>Article 25</SourceCite> See the full breakdown in the{' '}
              <Link href="/obligations">provider vs deployer obligations guide</Link>.
            </p>
          </RevealOnScroll>
        </Prose>

        <div className="mx-auto max-w-3xl mt-8">
          <RevealOnScroll>
            <Callout variant="info" title="Why US and non-EU companies care">
              The Act has GDPR-style extraterritorial reach. A company with no EU establishment is
              still in scope if it places an AI system or GPAI model on the EU market,{' '}
              <strong>or if the output of its AI is used in the EU</strong>. A US SaaS vendor whose
              AI outputs reach EU users can be a regulated provider or deployer, and non-EU
              high-risk providers must appoint an EU authorised representative.{' '}
              <SourceCite href={SRC.art2}>Article 2</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>

        <Prose className="max-w-3xl mt-12">
          <RevealOnScroll>
            <h2 id="gpai" className="inline-flex items-center gap-2">
              <Icon name="hub" className="text-primary text-2xl" />
              General-purpose AI (GPAI) models
            </h2>
            <p>
              Broadly capable models, such as large language models, are regulated on their own
              track under Chapter V, in force since 2 August 2025. The Commission&apos;s guidelines
              use an indicative marker of more than 10²³ FLOP of training compute to identify a GPAI
              model.{' '}
              <SourceCite href={SRC.gpaiGuidelines}>GPAI guidelines</SourceCite>
            </p>
            <p>
              <strong>All GPAI model providers</strong> (Article 53) must keep technical
              documentation, give information to downstream providers who integrate the model, have
              a policy to comply with EU copyright law, and publish a summary of the content used
              for training. Free and open-source models are exempt from some documentation duties,
              unless they carry systemic risk.{' '}
              <SourceCite href={SRC.art53}>Article 53</SourceCite>
            </p>
            <p>
              <strong>GPAI models with systemic risk</strong> (Article 55), presumed when training
              compute exceeds <strong>10²⁵ FLOP</strong>, face extra duties even when open-source:
              model evaluation including adversarial testing (red-teaming), assessing and mitigating
              systemic risks, reporting serious incidents to the AI Office, and adequate
              cybersecurity.{' '}
              <SourceCite href={SRC.art55}>Article 55</SourceCite>
            </p>
            <p>
              The voluntary <strong>GPAI Code of Practice</strong>, drawn up under the AI Office,
              helps providers demonstrate compliance with Articles 53 and 55 while harmonised
              standards are still being finalised.{' '}
              <SourceCite href={SRC.codeOfPractice}>Code of Practice</SourceCite>
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="timeline" className="inline-flex items-center gap-2">
              <Icon name="schedule" className="text-primary text-2xl" />
              The timeline at a glance
            </h2>
            <ul>
              <li>
                <strong>1 Aug 2024:</strong> the Act enters into force.
              </li>
              <li>
                <strong>2 Feb 2025 (in force):</strong> Article 5 prohibitions and Article 4 AI
                literacy duty apply.
              </li>
              <li>
                <strong>2 Aug 2025 (in force):</strong> GPAI model rules, governance (the AI Office)
                and penalties apply.
              </li>
              <li>
                <strong>2 Aug 2026:</strong> most high-risk (Annex III) and Article 50 transparency
                obligations apply.
              </li>
              <li>
                <strong>2 Aug 2027:</strong> high-risk AI that is a safety component of regulated
                (Annex I) products, plus GPAI models placed on the market before 2 Aug 2025.
              </li>
            </ul>
            <p>
              See the living <Link href="/timeline">timeline tracker</Link> for the proposed Digital
              Omnibus changes and the current status of each date.{' '}
              <SourceCite href={SRC.timeline}>Implementation timeline</SourceCite>
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="penalties" className="inline-flex items-center gap-2">
              <Icon name="gavel" className="text-primary text-2xl" />
              Penalties
            </h2>
            <p>
              Fines are tiered, and the regime has been in force since 2 August 2025.{' '}
              <SourceCite href={SRC.art99}>Article 99</SourceCite>
            </p>
            <ul>
              <li>
                <strong>Prohibited practices (Article 5):</strong> up to{' '}
                <strong>€35 million or 7%</strong> of total worldwide annual turnover, whichever is
                higher.
              </li>
              <li>
                <strong>Other obligations</strong> (including high-risk and transparency): up to{' '}
                <strong>€15 million or 3%</strong>.
              </li>
              <li>
                <strong>Misleading information to authorities:</strong> up to{' '}
                <strong>€7.5 million or 1%</strong>.
              </li>
            </ul>
            <p>
              For SMEs and start-ups, each fine is capped at the <strong>lower</strong> of the
              percentage or the fixed amount, and authorities must weigh proportionality.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="ai-literacy" className="inline-flex items-center gap-2">
              <Icon name="school" className="text-primary text-2xl" />
              AI literacy (Article 4)
            </h2>
            <p>
              In force since 2 February 2025, this is a duty most organisations can act on now.
              Providers and deployers must take measures to ensure, to their best extent, a
              sufficient level of AI literacy among staff and others operating AI on their behalf,
              tailored to their knowledge and the context of use. It applies to{' '}
              <strong>all AI systems</strong>, not just high-risk, and to non-EU entities in scope.{' '}
              <SourceCite href={SRC.art4}>Article 4</SourceCite> See the{' '}
              <Link href="/ai-literacy">AI literacy guide</Link>.
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <h2 id="standards" className="inline-flex items-center gap-2">
              <Icon name="verified_user" className="text-primary text-2xl" />
              ISO 42001 and harmonised standards
            </h2>
            <p>
              <Link href="/iso-42001">ISO/IEC 42001</Link> is the international standard for an AI
              management system, and a strong head-start on the governance controls the Act expects.
              But on its own it is an international standard, not a harmonised European one, and so
              confers <strong>no automatic presumption of conformity</strong> with the Act.{' '}
              <SourceCite href={SRC.iso42001}>ISMS.online</SourceCite>
            </p>
            <p>
              That presumption comes from following <strong>harmonised standards</strong> whose
              references are published in the Official Journal. CEN-CENELEC is still developing them.
              Until they land, ISO/IEC 42001 and the GPAI Code of Practice are practical bridges, not
              legal shields.{' '}
              <SourceCite href={SRC.art40}>Article 40</SourceCite> See our{' '}
              <Link href="/ai-governance">AI governance guide</Link>.
            </p>
          </RevealOnScroll>
        </Prose>

        {/* Flagship tool CTA */}
        <div className="mx-auto max-w-3xl mt-12">
          <RevealOnScroll>
            <div className="rounded-card border border-line bg-low p-6 lg:p-8">
              <h2 className="font-display font-semibold text-2xl text-ink">
                Not sure which tier your AI is in?
              </h2>
              <p className="mt-3 text-ink/80 leading-relaxed">
                The free Risk-Tier Classifier walks you through a few plain-English questions and
                tells you whether your system is prohibited, high-risk, limited-risk or
                minimal-risk, with tailored next steps. No email wall to see your result.
              </p>
              <div className="mt-5">
                <Button href="/risk-classifier" variant="primary">
                  Find your risk tier in two minutes
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* By the numbers */}
      <Section background="sand" eyebrow="By the numbers" title="The EU AI Act in a few figures">
        <RevealOnScroll>
          <Stats>
            <Stat value="4" label="Risk tiers: prohibited, high-risk, limited (transparency), minimal." />
            <Stat
              value="€35m / 7%"
              label="Maximum fine for prohibited practices: €35m or 7% of worldwide turnover."
            />
            <Stat value="2 Aug 2026" label="When most high-risk and transparency obligations apply." />
            <Stat value="8" label="Annex III high-risk use-case areas." />
          </Stats>
          <p className="mt-6 text-sm text-muted">
            Penalty tiers run €35m / 7%, €15m / 3% and €7.5m / 1%; SMEs and start-ups face the lower
            of the two figures. <SourceCite href={SRC.art99}>Article 99</SourceCite>
          </p>
        </RevealOnScroll>
      </Section>

      {/* FAQ */}
      <Section background="paper" eyebrow="FAQ" title="People also ask">
        <div className="mx-auto max-w-3xl">
          <dl className="divide-y divide-line">
            {FAQS.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-lg font-semibold text-ink">{f.q}</dt>
                <dd className="mt-2 text-ink/90 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Sources + closing */}
      <Section background="paper">
        <div className="mx-auto max-w-3xl">
          <Callout variant="info" title="This is guidance, not legal advice">
            This is guidance to help you understand the EU AI Act, not legal advice. For decisions
            specific to your business, confirm with the official sources we link or a qualified
            adviser. We cannot guarantee compliance, and you should be wary of anyone who says they
            can.
          </Callout>

          <Sources
            items={[
              {
                href: SRC.eurlex,
                label: 'Regulation (EU) 2024/1689, Artificial Intelligence Act (EUR-Lex)',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.ecHome,
                label: 'European Commission: Regulatory framework on AI',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.summary,
                label: 'AI Act high-level summary (artificialintelligenceact.eu)',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.annex3,
                label: 'Annex III, high-risk use-case areas',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.gpaiGuidelines,
                label: 'Commission GPAI Guidelines overview',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.codeOfPractice,
                label: 'Introduction to the GPAI Code of Practice',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.art99,
                label: 'Article 99, penalties',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.council,
                label: 'Council of the EU: provisional agreement on the Digital Omnibus (7 May 2026)',
                retrieved: '9 Jun 2026'
              },
              {
                href: SRC.timeline,
                label: 'AI Act implementation timeline',
                retrieved: '9 Jun 2026'
              }
            ]}
          />
        </div>
      </Section>

      <NewsletterSignup variant="band" />
    </>
  );
}
