import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Container,
  Section,
  Button,
  TLDR,
  Callout,
  SourceCite,
  Sources,
  JsonLd,
  ContourBackground,
  RevealOnScroll,
  NewsletterSignup
} from '@/components/ui';
import { KitForm } from './KitForm';
import { webPage, breadcrumb } from '@/lib/schema';

const SITE = 'https://aiact-navigator.com';
const CANONICAL = `${SITE}/ai-literacy`;

const SRC = {
  eurlex:   'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
  art4:     'https://artificialintelligenceact.eu/article/4/',
  art2:     'https://artificialintelligenceact.eu/article/2/',
  art3:     'https://artificialintelligenceact.eu/article/3/',
  timeline: 'https://artificialintelligenceact.eu/implementation-timeline/'
};

export const metadata: Metadata = {
  title: 'AI Literacy Training (Article 4, EU AI Act): What It Requires',
  description:
    'Article 4 AI literacy duty has been in force since 2 February 2025. Applies to all providers and deployers in scope, including non-EU entities. No prescribed curriculum - document tailored training.',
  alternates: { canonical: '/ai-literacy' },
  openGraph: {
    title: 'AI Literacy Training (Article 4, EU AI Act)',
    description:
      'What the Article 4 AI literacy duty requires, who it applies to, and how to build a programme. In force since 2 February 2025.',
    url: CANONICAL,
    type: 'article'
  }
};

const FAQ = [
  {
    q: 'Who does the AI literacy duty apply to?',
    a: "Article 4 applies to providers and deployers of AI systems. It applies to both EU and non-EU entities that are in scope under Article 2 - including non-EU providers whose AI systems are placed on the EU market, and non-EU deployers whose AI outputs are used in the EU. It applies to all AI systems under the Act, not just high-risk ones. If you are a company using any AI tool in a professional capacity and your use is within the Act's scope, Article 4 applies to you."
  },
  {
    q: 'What does "sufficient AI literacy" mean?',
    a: 'The Act does not define a prescribed minimum. It requires that, "to the best extent possible", providers and deployers ensure a sufficient level of AI literacy for their staff and other persons operating or using AI systems on their behalf - taking into account those persons\'s technical knowledge, experience, education, and training, as well as the context of use. In practice this means: assess the AI literacy needs of the people using your AI systems, design training tailored to those needs, deliver it, and document that you have done so.'
  },
  {
    q: 'Is there a prescribed curriculum or certification?',
    a: 'No. The AI Act does not prescribe a specific curriculum, hours of training, or certification requirement. This flexibility allows organisations to design training that fits their context. The obligation is to take "measures" to ensure sufficient literacy, and to be able to demonstrate those measures if asked by a supervisory authority. The most important practical step is documentation: a written programme, completion records, and a rationale for why the training is appropriate for the roles in question.'
  },
  {
    q: 'Does Article 4 apply to minimal-risk AI systems too?',
    a: "Yes. Article 4 is in Chapter I (General Provisions) and applies to all providers and deployers in scope - it is not limited to high-risk systems. If your employees use an AI chatbot, an AI-assisted drafting tool, or any other AI system in a professional context, the literacy duty applies to those users, regardless of whether the system is high-risk."
  },
  {
    q: 'When did Article 4 come into force?',
    a: 'Article 4 came into force on 2 February 2025, six months after the Regulation entered into force on 1 August 2024. It is not affected by the proposed Digital Omnibus changes, which only postpone some high-risk obligations. The AI literacy duty is enforceable now.'
  },
  {
    q: 'What if our AI vendors provide training? Does that satisfy Article 4?',
    a: "Vendor-provided training can contribute to your AI literacy programme, but Article 4 places the obligation on you - the provider or deployer - to ensure sufficient literacy for your staff in your context. Vendor training covers the general product, not your specific deployment context, use cases, risks, and organisational role. You should supplement or contextualise vendor training with your own programme, and document both."
  }
];

const PROGRAMME_STEPS = [
  {
    step: '1',
    title: 'Map your AI use',
    text: 'Identify every AI system your organisation uses or provides, and which staff interact with them. The AI System Inventory template is a good starting point. Without this map, you cannot know whose literacy needs to be assessed.'
  },
  {
    step: '2',
    title: 'Assess literacy gaps',
    text: "For each role that interacts with an AI system, assess the current literacy level against the knowledge needed to use the system safely and within its intended purpose. Consider: technical knowledge, understanding of the system's limitations, awareness of applicable rules, and ability to recognise and escalate risks."
  },
  {
    step: '3',
    title: 'Design tailored training',
    text: 'Design or source training that closes the identified gaps. Different roles need different depth: a human-oversight officer reviewing AI-assisted decisions needs deeper training than a staff member occasionally using an AI writing tool. Tailor accordingly. Document the rationale.'
  },
  {
    step: '4',
    title: 'Deliver and record',
    text: 'Deliver the training and record completion - name, role, date, content covered. Keep records in a format you can produce to a supervisory authority. For staff who join later or whose roles change, ensure onboarding includes the relevant AI literacy component.'
  },
  {
    step: '5',
    title: 'Review and update',
    text: 'AI literacy needs change as you adopt new systems, as the AI Act\'s obligations evolve, and as staff change roles. Build in an annual review and a trigger for review whenever a significant new AI system is adopted or when a material regulatory change occurs.'
  }
];

export default function AILiteracyPage() {
  return (
    <>
      <JsonLd
        data={[
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
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
              { '@type': 'ListItem', position: 2, name: 'AI Literacy', item: CANONICAL }
            ]
          },
          webPage({
            name: 'AI Literacy Training (Article 4, EU AI Act): What It Requires',
            path: '/ai-literacy',
            description:
              'Article 4 AI literacy duty has been in force since 2 February 2025. Applies to all providers and deployers in scope, including non-EU entities. No prescribed curriculum - document tailored training.'
          }),
          breadcrumb([{ name: 'AI Literacy', path: '/ai-literacy' }])
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container className="relative z-10 py-16 lg:py-24" size="md">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            In force since 2 February 2025
          </p>
          <h1 className="mt-4 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
            AI Literacy Training (Article 4)
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed">
            Article 4 of the EU AI Act requires providers and deployers to ensure their staff
            have a sufficient level of AI literacy. It applies to all AI systems - not just
            high-risk - and has been in force since <strong>2 February 2025</strong>. There is
            no prescribed curriculum, but you need to document a tailored programme and be able
            to show it to regulators.
          </p>

          <div className="mt-8">
            <Callout variant="warn" title="Already enforceable">
              Article 4 came into force on <strong>2 February 2025</strong>. It is not affected
              by the proposed Digital Omnibus amendments, which only defer some high-risk
              obligations. If you have not yet documented an AI literacy programme for your
              staff, this is the most immediate gap to close.{' '}
              <SourceCite href={SRC.art4}>Art. 4 - AI literacy</SourceCite>
            </Callout>
          </div>
        </Container>
      </section>

      {/* TL;DR */}
      <Section background="sand" containerSize="md">
        <RevealOnScroll>
          <TLDR title="In short">
            Providers and deployers must take measures to ensure staff and operators have
            sufficient AI literacy - accounting for their technical background and the context
            of use. Applies to <strong>all AI systems</strong>, applies to{' '}
            <strong>non-EU entities</strong> in scope, has been in force since{' '}
            <strong>2 February 2025</strong>, and there is no prescribed curriculum.
            Document your programme.{' '}
            <SourceCite href={SRC.art4}>Regulation (EU) 2024/1689, Art. 4</SourceCite>
          </TLDR>
        </RevealOnScroll>
      </Section>

      {/* What Art. 4 says */}
      <Section
        background="paper"
        eyebrow="The text explained"
        title="What Article 4 actually requires"
        containerSize="md"
      >
        <div className="space-y-6 text-ink/90 leading-relaxed">
          <RevealOnScroll>
            <div className="rounded-card border border-line bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent-deep">Article 4 - AI literacy</p>
              <p className="mt-3 text-ink leading-relaxed">
                &ldquo;Providers and deployers of AI systems shall take measures to ensure, to their
                best extent, a sufficient level of AI literacy of their staff and other persons
                dealing with the operation and use of AI systems on their behalf, taking into
                account their technical knowledge, experience, education and training and the
                context the AI systems are to be used in, and considering the persons or groups
                of persons on whom the AI systems are to be used.&rdquo;
              </p>
              <p className="mt-2 text-sm text-muted">
                Regulation (EU) 2024/1689, Article 4.{' '}
                <SourceCite href={SRC.art4}>View on AI Act Explorer</SourceCite>
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p>
              Unpacking the key elements:
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <ul className="space-y-4">
              {[
                {
                  term: '"Providers and deployers"',
                  explanation: 'Both the entity that develops/places an AI system on the market (provider) and the entity that uses it in a professional context (deployer). Most organisations are deployers; some are both. Applies to EU and non-EU entities in scope under Article 2.'
                },
                {
                  term: '"To their best extent"',
                  explanation: 'This is not an absolute standard. Regulators will assess proportionality. A small deployer using a single AI tool has different obligations than a large provider developing many systems. Document what you have done and why it is proportionate to your context.'
                },
                {
                  term: '"Staff and other persons dealing with the operation and use"',
                  explanation: 'This covers employees, contractors, and any person acting on your behalf who operates or uses AI systems. It does not require training everyone in the organisation - only those who interact with AI systems in their role.'
                },
                {
                  term: '"Taking into account their technical knowledge, experience, education and training"',
                  explanation: 'The training must be contextualised to the person. An engineer who built the system needs different training than a customer-service representative using an AI tool to draft responses. Assess and tailor; do not use a one-size-fits-all approach.'
                },
                {
                  term: '"And the context the AI systems are to be used in"',
                  explanation: 'Staff using an AI system for HR decisions face different risks and need different knowledge than staff using an AI system for internal search. The training content should reflect the specific risks and obligations of the deployment context.'
                }
              ].map((item, i) => (
                <RevealOnScroll key={item.term} delay={i}>
                  <li className="rounded-card border border-line bg-card p-5">
                    <p className="font-display font-semibold text-lg text-ink">{item.term}</p>
                    <p className="mt-2 text-ink/85">{item.explanation}</p>
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Who it applies to */}
      <Section
        background="sand"
        eyebrow="Scope"
        title="Who the Article 4 duty applies to"
        containerSize="md"
      >
        <div className="space-y-5 text-ink/90 leading-relaxed">
          <RevealOnScroll>
            <p>
              Article 4 applies to <strong>providers</strong> and <strong>deployers</strong> of
              AI systems in scope under Article 2. Critically, this includes{' '}
              <strong>non-EU entities</strong>:
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <ul className="space-y-3">
              {[
                'EU providers placing AI systems on the EU market or putting them into service in the EU.',
                'EU deployers using AI systems under their authority in a professional capacity.',
                'Non-EU providers placing AI systems on the EU market.',
                'Non-EU providers and deployers where the output of the AI system is used in the EU.',
                'Importers of AI systems into the EU; distributors making AI available in the EU.'
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <Callout variant="info" title="Non-EU companies are in scope">
              A US company whose AI-powered software is used by EU customers is potentially a
              provider in scope. Its deployer customers in the EU are definitely in scope. Both
              face the Article 4 duty for their respective staff.{' '}
              <SourceCite href={SRC.art2}>Art. 2 - Scope</SourceCite>
            </Callout>
          </RevealOnScroll>
        </div>
      </Section>

      {/* How to build a programme */}
      <Section
        background="paper"
        eyebrow="Practical steps"
        title="How to build your AI literacy programme"
        containerSize="md"
      >
        <ol className="space-y-4">
          {PROGRAMME_STEPS.map((s, i) => (
            <RevealOnScroll key={s.step} delay={i}>
              <li className="flex gap-4 rounded-card border border-line bg-card p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-chip bg-primary font-mono text-sm font-semibold text-paper">
                  {s.step}
                </span>
                <div>
                  <p className="font-display font-semibold text-lg text-ink">{s.title}</p>
                  <p className="mt-1 text-ink/85 leading-relaxed">{s.text}</p>
                </div>
              </li>
            </RevealOnScroll>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section background="sand" title="AI literacy questions" containerSize="md">
        <div className="space-y-4">
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
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
      </Section>

      {/* Gated kit */}
      <Section background="paper" containerSize="md">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Free starter kit
          </p>
          <h2 className="mt-3 font-display font-semibold text-3xl lg:text-4xl leading-tight text-ink">
            AI Literacy Starter Kit
          </h2>
          <p className="mt-4 text-base lg:text-lg leading-relaxed text-muted">
            A ready-to-adapt AI literacy programme template: a gap-assessment worksheet, a
            role-based training matrix, and a completion log template. Leave your email and we
            will send it to you.
          </p>
        </div>
        <div className="mt-10 max-w-lg">
          <RevealOnScroll>
            <KitForm />
          </RevealOnScroll>
          <p className="mt-4 text-sm text-muted">
            Or, take the full readiness journey with the{' '}
            <Link href="/checklist" className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid">
              AI Act Readiness Checklist
            </Link>{' '}
            or{' '}
            <Link href="/subscribe" className="text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid">
              subscribe to The AI Act Brief
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* Cross-links */}
      <Section background="sand" containerSize="md">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/ai-governance"
            className="rounded-card border border-line bg-card p-5 transition-[border-color] hover:border-accent"
          >
            <p className="font-display font-semibold text-ink">AI Governance framework</p>
            <p className="mt-1 text-sm text-muted">All six pillars - from inventory to monitoring - mapped to AI Act obligations.</p>
          </Link>
          <Link
            href="/ai-act"
            className="rounded-card border border-line bg-card p-5 transition-[border-color] hover:border-accent"
          >
            <p className="font-display font-semibold text-ink">AI Act overview</p>
            <p className="mt-1 text-sm text-muted">The regulation explained from scratch - what it is, who it covers, and the timeline.</p>
          </Link>
        </div>
      </Section>

      <p className="mx-auto max-w-3xl px-4 pb-8 pt-2 text-sm text-muted leading-relaxed">
        This is guidance to help you understand Article 4 of the EU AI Act, not legal advice.
        For decisions specific to your organisation, confirm with the official sources we link
        or a qualified adviser. Last updated: 9 June 2026.
      </p>

      <Sources
        items={[
          {
            href: SRC.eurlex,
            label: 'Regulation (EU) 2024/1689 (EU AI Act), EUR-Lex',
            retrieved: '9 Jun 2026'
          },
          {
            href: SRC.art4,
            label: 'AI Act, Article 4 - AI literacy (AI Act Explorer)',
            retrieved: '9 Jun 2026'
          },
          {
            href: SRC.art2,
            label: 'AI Act, Article 2 - Scope',
            retrieved: '9 Jun 2026'
          },
          {
            href: SRC.timeline,
            label: 'AI Act implementation timeline (artificialintelligenceact.eu)',
            retrieved: '9 Jun 2026'
          }
        ]}
      />

      <NewsletterSignup variant="band" />
    </>
  );
}
