// AI Act info-spoke data for /topics and /topics/[slug].
//
// Facts grounded in research.md (Regulation (EU) 2024/1689, verified 2026-06-09).
// Every regulatory claim on the rendered page carries a SourceCite to an
// official source; the SRC map below holds the canonical URLs.
//
// NOTE: sitemap.ts imports TOPICS from this file and uses .slug - keep that export shape.

export const SITE = 'https://aiact-navigator.com';
export const PUBLISHED = '2026-06-09';
export const MODIFIED = '2026-06-09';

// Canonical official sources (from research.md).
export const SRC = {
  eurlex: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
  ecHome: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
  highlevelSummary: 'https://artificialintelligenceact.eu/high-level-summary/',
  article2: 'https://artificialintelligenceact.eu/article/2/',
  article3: 'https://artificialintelligenceact.eu/article/3/',
  article4: 'https://artificialintelligenceact.eu/article/4/',
  article5: 'https://artificialintelligenceact.eu/article/5/',
  article6: 'https://artificialintelligenceact.eu/article/6/',
  article16: 'https://artificialintelligenceact.eu/article/16/',
  article25: 'https://artificialintelligenceact.eu/article/25/',
  article26: 'https://artificialintelligenceact.eu/article/26/',
  article27: 'https://artificialintelligenceact.eu/article/27/',
  article50: 'https://artificialintelligenceact.eu/article/50/',
  article53: 'https://artificialintelligenceact.eu/article/53/',
  article55: 'https://artificialintelligenceact.eu/article/55/',
  article99: 'https://artificialintelligenceact.eu/article/99/',
  article113: 'https://artificialintelligenceact.eu/article/113/',
  annexI: 'https://artificialintelligenceact.eu/annex/1/',
  annexIII: 'https://artificialintelligenceact.eu/annex/3/',
  gpaiGuidelines: 'https://artificialintelligenceact.eu/gpai-guidelines-overview/',
  codeOfPractice: 'https://artificialintelligenceact.eu/introduction-to-code-of-practice/',
  aiOffice: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office',
  omnibus:
    'https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/',
  timeline: 'https://artificialintelligenceact.eu/implementation-timeline/'
} as const;

export type Faq = { q: string; a: string };

export type Topic = {
  slug: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Hero image URL - optional (no images yet). */
  image?: string;
  imageAlt?: string;
  intro: string;
  tldr: string[];
  inScope: string[];
  inScopeNote?: string;
  keyPains: string[];
  steps: string[];
  draftNote?: { title: string; body: string };
  faq: Faq[];
};

export const TOPICS: Topic[] = [
  // --------------------------------------------------------- PROHIBITED PRACTICES
  {
    slug: 'prohibited-ai-practices',
    name: 'Prohibited AI practices',
    title: 'Prohibited AI practices under the EU AI Act (Article 5)',
    metaTitle:
      'Prohibited AI practices under the EU AI Act: the 8 bans explained | AI Act Navigator',
    metaDescription:
      'The EU AI Act bans 8 AI uses as unacceptable risk - including social scoring, real-time biometric surveillance and manipulative AI. Plain-English breakdown of Article 5 with legal citations.',
    intro:
      'Since 2 February 2025, certain AI applications are banned outright in the EU. These are uses the legislator judged to pose an "unacceptable risk" that cannot be mitigated by conditions - the potential harm to people is simply too great. Article 5 lists eight current prohibitions. A provisional political agreement of May 2026 would add a ninth (not yet law). This page walks through each ban in plain English.',
    tldr: [
      'Eight AI uses are banned under Article 5, applicable since 2 February 2025.',
      'The bans cover: manipulative/subliminal techniques, exploiting vulnerabilities, social scoring, predictive policing by profiling, untargeted facial-image scraping, workplace/school emotion recognition, sensitive-attribute biometric categorisation, and real-time remote biometric identification in public for law enforcement.',
      'Penalties for breach: up to €35 million or 7% of global annual turnover (whichever is higher).',
      '[PROPOSED, NOT YET LAW] The Digital Omnibus provisional agreement would add a ninth ban on AI-generated non-consensual intimate imagery and AI-generated CSAM.'
    ],
    inScope: [
      'AI systems using subliminal, manipulative or deceptive techniques that materially distort behaviour and cause significant harm.',
      'AI exploiting vulnerabilities due to age, disability or socio-economic situation to distort behaviour and cause significant harm.',
      'Social-scoring systems that evaluate or classify people based on social behaviour or personal traits and lead to detrimental or unjustified treatment.',
      'Predictive-policing AI that assesses or predicts criminal risk based solely on profiling or personality traits.',
      'AI systems that build or expand facial-recognition databases by untargeted scraping of facial images from the internet or CCTV.',
      'Emotion-recognition AI deployed in workplaces or educational institutions (except for medical or safety reasons).',
      'AI performing biometric categorisation to infer sensitive attributes: race, political opinions, trade-union membership, religious or philosophical beliefs, sex life or sexual orientation.',
      '"Real-time" remote biometric identification in publicly accessible spaces for law enforcement - with very narrow exceptions subject to judicial authorisation.'
    ],
    inScopeNote:
      'Each prohibition has precise scope conditions in Article 5. The narrow law-enforcement exceptions (e.g. searching for missing persons, preventing an imminent terrorist attack) are strictly defined and require prior authorisation.',
    keyPains: [
      "Identifying whether your AI system crosses the manipulative-technique threshold - the test is whether it materially distorts a person's behaviour in a way that impairs informed decision-making and causes or is likely to cause significant harm.",
      'Emotion recognition: while banned in workplaces and schools, it remains allowed in other contexts (e.g. medical) and as a biometric-categorisation system carrying transparency obligations, creating definitional complexity.',
      'Real-time biometric ID: even for law enforcement, the narrow exceptions require prior judicial or administrative authorisation in most cases - and Member States may impose stricter limits.',
      'Penalties are the highest in the Act - €35m/7% - so compliance certainty matters.'
    ],
    steps: [
      'Map every AI system in your portfolio that touches biometrics, emotion recognition, content recommendation, or vulnerability-based personalisation.',
      "For each, check whether any Article 5 prohibition could apply given the system's intended purpose and reasonably foreseeable uses.",
      'If a system falls within a prohibition, it cannot be placed on the market or put into service - it must be withdrawn or fundamentally redesigned.',
      'Document your assessment; keep records in case of regulatory inquiry.',
      'Monitor the Digital Omnibus adoption to track whether the ninth prohibition becomes law before 2 August 2026.'
    ],
    draftNote: {
      title: 'Proposed ninth prohibition - not yet law',
      body:
        'The provisional Digital Omnibus political agreement of 7 May 2026 would add a ninth Article 5 prohibition: AI systems generating non-consensual intimate imagery ("nudifier" apps) and AI-generated child sexual abuse material. Co-legislators intend to adopt the amendment before 2 August 2026, but it is not yet formally adopted. Until then, the eight prohibitions in 2a are the binding legal default.'
    },
    faq: [
      {
        q: 'When did the Article 5 prohibitions take effect?',
        a: 'The prohibited practices under Article 5 have been applicable since 2 February 2025 - six months after the AI Act entered into force on 1 August 2024.'
      },
      {
        q: 'Can the real-time biometric identification prohibition be waived for law enforcement?',
        a: 'Yes, but very narrowly. Law-enforcement agencies may use real-time remote biometric identification in publicly accessible spaces only for specific purposes (targeted search for victims or missing persons, preventing an imminent threat to life or terrorist attack, locating or identifying suspects of serious crimes), and typically only with prior judicial or administrative authorisation. Member States can impose stricter limits.'
      },
      {
        q: 'Is emotion-recognition AI completely banned?',
        a: 'It is banned in the workplace and in educational institutions, except for medical or safety reasons. Outside those contexts it is not prohibited - but deployers must still comply with Article 50 transparency obligations (informing people whose emotions are being inferred).'
      },
      {
        q: 'What happens if we already have a system that falls within a prohibition?',
        a: 'You must withdraw it from the EU market or discontinue its use in the EU. The prohibitions are absolute - there is no conformity-assessment route that would authorise a banned practice. Continued operation risks fines of up to €35 million or 7% of global annual turnover.'
      },
      {
        q: 'Does the Article 5 prohibition on social scoring apply to private companies?',
        a: 'Yes. The ban applies to any provider or deployer, public or private, whose AI system evaluates or classifies people based on their social behaviour or personal traits and leads to detrimental or unjustified treatment across unrelated social contexts or disproportionate to the original context. This covers private credit-scoring and insurance-risk contexts where those conditions are met, though those use cases may also be regulated as high-risk (Annex III) rather than prohibited depending on precise scope.'
      }
    ]
  },

  // --------------------------------------------------------- HIGH-RISK AI SYSTEMS
  {
    slug: 'high-risk-ai-systems',
    name: 'High-risk AI systems',
    title: 'High-risk AI systems: Annex III, Annex I and the Article 6(3) filter',
    metaTitle:
      'High-risk AI systems under the EU AI Act: Annex III, Annex I & the filter | AI Act Navigator',
    metaDescription:
      'Two routes make AI "high-risk" under the EU AI Act: Annex I (safety-critical products) and Annex III (8 use-case areas). Plain-English guide with the Article 6(3) filter explained.',
    intro:
      'Not all AI is created equal, and the AI Act\'s most demanding obligations fall on "high-risk AI systems." There are two independent routes to this classification. Understanding which route applies - and whether the Article 6(3) filter can bring a system out of scope - is the most consequential compliance question for most organisations.',
    tldr: [
      'Route 1 (Annex I): AI that is a safety component of, or itself a regulated product under, EU harmonisation law (machinery, medical devices, toys, motor vehicles, etc.) and required to undergo third-party conformity assessment.',
      'Route 2 (Annex III): Stand-alone AI in one of 8 listed use-case areas - biometrics, critical infrastructure, education, employment, essential services, law enforcement, migration/asylum, justice/democracy.',
      'Article 6(3) filter: an Annex III system is NOT high-risk if it does not pose significant risk of harm - e.g. narrow procedural tasks, pattern detection without replacing human judgement. Exception: does not apply if the system profiles people.',
      'Obligations apply from 2 August 2026 ([OMNIBUS - PROPOSED] deferred to 2 December 2027 for stand-alone Annex III if the Digital Omnibus is adopted).'
    ],
    inScope: [
      'Annex I route: AI that is a safety component of products covered by the CE-marking directives/regulations listed in Annex I, including the Machinery Regulation, Medical Devices Regulation, In Vitro Diagnostic Medical Devices Regulation, Radio Equipment Directive, General Product Safety Regulation, Automotive type-approval, Aviation, Toys, Lifts, Pressure equipment, and Personal Protective Equipment.',
      'Annex III area 1 - Biometrics: remote biometric identification, biometric categorisation, and emotion recognition not covered by Article 5 prohibitions.',
      'Annex III area 2 - Critical infrastructure: AI used as safety components in management or operation of road traffic, water, gas, heating, electricity, and digital infrastructure.',
      'Annex III area 3 - Education & vocational training: AI that determines access or assignment to educational/vocational institutions, assesses learning outcomes, evaluates learning level, or monitors/proctors exams.',
      'Annex III area 4 - Employment & workers management: recruitment and candidate screening, promotion and termination decisions, task allocation and monitoring of performance or behaviour.',
      'Annex III area 5 - Access to essential private & public services: credit-scoring and creditworthiness evaluation (excluding fraud detection); eligibility for public benefits; life and health insurance risk assessment and pricing; emergency service dispatch and triage.',
      'Annex III area 6 - Law enforcement: risk assessment of offending or re-offending, polygraphs, evidence-reliability evaluation, criminal profiling in investigations.',
      'Annex III area 7 - Migration, asylum & border control: polygraphs, risk assessments, examination of asylum/visa/residence applications, detection or recognition of persons.',
      'Annex III area 8 - Administration of justice & democratic processes: AI assisting judicial authorities in researching, interpreting or applying the law; AI influencing election or referendum outcomes or voting behaviour.'
    ],
    inScopeNote:
      'Article 6(3) filter: even if an AI system falls in an Annex III area, it is NOT classified as high-risk if it does not pose a significant risk of harm to health, safety or fundamental rights. Indicators of non-significant risk: the system performs a narrow procedural task; it improves a prior human activity; it only detects decision-making patterns without replacing human judgement; it performs preparatory tasks. Important: the filter does not apply where the system profiles natural persons.',
    keyPains: [
      'Determining which Annex III area applies is fact-sensitive - the same AI capability (e.g. an ML classifier) can fall inside or outside scope depending on its intended purpose and deployment context.',
      'The Article 6(3) filter requires a documented assessment: organisations must be able to justify why their Annex III system does not pose significant risk of harm.',
      'Annex I coverage is wide: any AI embedded in CE-marked products (machinery, medical devices, vehicles) as a safety component likely triggers the Annex I route, which may require involving a notified body.',
      'Timeline uncertainty: the original 2 August 2026 deadline for high-risk obligations may move to 2 December 2027 for Annex III systems under the Digital Omnibus, but this is not yet law as of 9 June 2026.'
    ],
    steps: [
      'Inventory every AI system in your portfolio: document its intended purpose, deployment context and the population of users or affected persons.',
      'Apply the Annex I test: does the AI operate as a safety component of, or is it itself a product governed by, any of the Annex I directives/regulations?',
      'Apply the Annex III test: does the AI fall in one of the 8 listed use-case areas given its intended purpose?',
      'Apply the Article 6(3) filter to Annex III candidates: can you substantiate that the system does not pose significant risk of harm? Document the assessment.',
      'For confirmed high-risk systems: build the Chapter III compliance programme - risk management system, data governance, technical documentation, logging, human oversight, accuracy/robustness, quality management, conformity assessment, EU declaration of conformity, CE marking, registration, post-market monitoring.'
    ],
    faq: [
      {
        q: 'If our AI falls in an Annex III area, is it automatically high-risk?',
        a: 'No - not automatically. Article 6(3) provides a filter: if the system does not pose a significant risk of harm to health, safety or fundamental rights, it is not classified high-risk even if it falls in an Annex III area. However, the filter does not apply if the system profiles people, and you must document your reasoning.'
      },
      {
        q: 'Does the Annex I route require a notified body?',
        a: 'It depends on the underlying product-safety legislation. For many Annex I product categories (e.g. certain medical devices, vehicles), the sectoral law already requires third-party conformity assessment via a notified body, and AI components follow the same route. For some Annex I categories the provider self-assessment is sufficient.'
      },
      {
        q: 'When do high-risk obligations apply?',
        a: 'Under current law (as enacted), most high-risk obligations apply from 2 August 2026. For Annex I safety-component AI, the deadline is 2 August 2027. The Digital Omnibus provisional agreement (not yet law, 9 June 2026) would push the stand-alone Annex III deadline to 2 December 2027 and the Annex I deadline to 2 August 2028.'
      },
      {
        q: 'Is an AI system used internally (not sold) subject to the high-risk rules?',
        a: 'Yes, if a public authority or other organisation deploys a high-risk AI system under its own authority in a professional context, it is a "deployer" and carries the Article 26 deployer obligations. If it also puts the system into service under its own name, it may be reclassified as a provider (Article 25) with the full provider obligations.'
      },
      {
        q: 'Does emotion recognition always trigger the biometrics area in Annex III?',
        a: 'Emotion recognition falls in Annex III area 1 (biometrics) where it is not already prohibited under Article 5 (i.e. it is used outside workplaces and educational institutions, or for medical/safety reasons that exempt it from the Article 5 ban). Even then, the Article 6(3) filter may still apply if the specific deployment does not pose significant risk.'
      }
    ]
  },

  // --------------------------------------------------------- GENERAL-PURPOSE AI
  {
    slug: 'general-purpose-ai',
    name: 'General-purpose AI (GPAI)',
    title: 'General-purpose AI under the EU AI Act: rules for foundation models',
    metaTitle:
      'General-purpose AI (GPAI) rules under the EU AI Act: Articles 53 & 55 explained | AI Act Navigator',
    metaDescription:
      'GPAI model providers face a distinct set of rules under the EU AI Act - separate from the high-risk track. Plain-English guide to Articles 53 and 55, systemic risk and the Code of Practice.',
    intro:
      'General-purpose AI (GPAI) models - the foundation models behind AI assistants, image generators and coding tools - are regulated on a separate track from AI systems. These rules apply to the model providers (not necessarily to downstream deployers), with extra obligations for the most powerful "systemic risk" models. GPAI rules have been applicable since 2 August 2025.',
    tldr: [
      'GPAI rules apply to providers of AI models that can competently perform a wide range of distinct tasks (large language models, multimodal models, etc.).',
      'All GPAI providers (Article 53): technical documentation, information for downstream providers, EU copyright compliance policy, and a public training-data summary.',
      'Open-source exemption: providers of freely available open-source GPAI models are exempt from documentation duties - unless the model has systemic risk.',
      'Extra duties for systemic-risk models (Article 55): adversarial testing, systemic risk assessment/mitigation, serious incident reporting, and cybersecurity measures.',
      'Systemic risk is presumed at >10²⁵ FLOP training compute (Article 51).'
    ],
    inScope: [
      'Any provider that trains or has trained a GPAI model (including fine-tuning a base model to create a new GPAI model) and places it on the EU market or puts it into service, regardless of where the provider is established.',
      'Article 53 obligations for all GPAI providers: technical documentation (per Annex XI/XII), information and documentation for downstream AI system providers integrating the model, an EU copyright law compliance policy (including respecting Text-and-Data-Mining opt-outs), and a publicly available summary of training content.',
      'Article 55 extra obligations for systemic-risk GPAI models (presumed at >10²⁵ FLOP): model evaluation including adversarial testing (red-teaming); assess and mitigate systemic risks at EU level; track, document and report serious incidents to the AI Office without undue delay; ensure adequate cybersecurity.'
    ],
    inScopeNote:
      'Open-source exemption (Article 53): providers of GPAI models released under a free and open-source licence are exempt from the Art. 53(1)(a)-(b) documentation duties. This exemption does NOT apply if the model has systemic risk.',
    keyPains: [
      'Determining whether your model meets the GPAI definition - the GPAI Guidelines use an indicative threshold of >10²³ FLOP for models that generate language/text-to-image/text-to-video, but the legal test is "significant generality and competent performance of a wide range of distinct tasks."',
      'The systemic risk threshold (>10²⁵ FLOP) is currently met only by the largest foundation models, but the Commission can update it by delegated act.',
      'Downstream provider obligations: if you integrate a GPAI model into an AI system you place on the market, you are a provider of that AI system - and the GPAI provider is required to give you the documentation you need for your own compliance.',
      'The GPAI Code of Practice is a voluntary tool but the most practical near-term compliance pathway; non-participation shifts the burden of proof onto the provider to demonstrate compliance by other means.'
    ],
    steps: [
      'Identify whether your model meets the GPAI definition based on its generality, capability breadth, and the GPAI Guidelines compute threshold.',
      'Check whether the model has systemic risk (>10²⁵ FLOP or designated by the Commission); if yes, build the Article 55 compliance programme.',
      'For all GPAI models: prepare technical documentation per Annex XI (for providers) and Annex XII (for downstream providers); document your copyright/TDM compliance policy; draft the public training-data summary per the AI Office template.',
      'If the model is open-source, confirm it qualifies for the Art. 53 exemption and document that assessment.',
      'Consider joining the GPAI Code of Practice process to engage with the AI Office and shape compliance expectations.'
    ],
    draftNote: {
      title: 'GPAI rules are already in force - no postponement',
      body:
        'Unlike most high-risk obligations, the GPAI rules under Chapter V (Articles 51-56) have been fully applicable since 2 August 2025. They are not affected by the Digital Omnibus provisional agreement. The GPAI Code of Practice has been operative since that date.'
    },
    faq: [
      {
        q: 'If I just use a GPAI model (not train it), do I have GPAI obligations?',
        a: 'No, GPAI obligations fall on the model provider (the entity that trained/deployed it). If you use a GPAI model to build an AI system and put that system on the market under your own name, you are an AI system provider and must comply with the AI system rules (including high-risk rules if applicable) - not the GPAI Chapter V rules directly.'
      },
      {
        q: 'Does the open-source exemption cover all obligations?',
        a: 'Only the Article 53(1)(a)-(b) documentation duties are exempted for open-source GPAI providers. All providers (including open-source) must still comply with: copyright compliance policy (Article 53(1)(c)); and the training-data summary (Article 53(1)(d)). And systemic-risk obligations under Article 55 apply to open-source models just as to proprietary ones.'
      },
      {
        q: 'What is the GPAI Code of Practice and is it mandatory?',
        a: 'The Code of Practice is a voluntary compliance tool drawn up by the AI Office, with GPAI model providers and other stakeholders. Compliance with an adequate Code of Practice can serve as evidence of conformity with Articles 53 and 55. It is not mandatory, but declining to follow it means the provider must demonstrate compliance through other means.'
      },
      {
        q: 'My model has >10²³ FLOP but not >10²⁵ FLOP. Does systemic risk apply?',
        a: 'No - systemic risk is presumed only above 10²⁵ FLOP (Article 51). The 10²³ FLOP threshold in the GPAI Guidelines is an indicative marker for the general GPAI classification, not for systemic risk. However, the Commission can designate specific models as having systemic risk regardless of compute if they exhibit high-impact capabilities.'
      },
      {
        q: 'Do GPAI rules apply to fine-tuned or adapted versions of foundation models?',
        a: 'Yes, if the fine-tuned model still meets the GPAI definition (significant generality and wide-range capability), its provider has the GPAI obligations. If fine-tuning creates a specialised, narrow-purpose model, it may fall out of the GPAI definition but could then be an AI system subject to the AI system rules (including potentially the high-risk track).'
      }
    ]
  },

  // --------------------------------------------------------- PROVIDER VS DEPLOYER
  {
    slug: 'provider-vs-deployer',
    name: 'Provider vs deployer',
    title: 'Provider vs deployer under the EU AI Act: who carries which duties',
    metaTitle:
      'Provider vs deployer under the EU AI Act: roles and obligations explained | AI Act Navigator',
    metaDescription:
      'Are you a provider or a deployer under the EU AI Act? The distinction determines which obligations you carry. Plain-English guide to Articles 3, 16, 25 and 26.',
    intro:
      'The EU AI Act distributes obligations across different actors in the AI supply chain. The most important distinction is between a "provider" (the entity that develops or commissions an AI system and places it on the market) and a "deployer" (the entity that puts the system to work in a professional context). Misidentifying your role can leave you either over-compliant or dangerously exposed.',
    tldr: [
      'Provider: develops the AI and puts it on the market under their own name - carries the heaviest obligations (Article 16): risk management, data governance, technical documentation, conformity assessment, CE marking, registration.',
      "Deployer: uses a provider's AI under their own authority in a professional context - carries Article 26 obligations: use per instructions, human oversight, data quality, log retention, staff notification, FRIA (where required).",
      'Reclassification risk (Article 25): a deployer, importer or distributor becomes a provider if they put their own name on a high-risk system, substantially modify it, or change its intended purpose.',
      'Importers and distributors have verification duties but lighter obligations - unless they trigger Article 25 reclassification.'
    ],
    inScope: [
      'Provider obligations (Article 16): implement a risk management system (Art. 9); ensure data governance (Art. 10); prepare technical documentation (Art. 11); enable automatic logging (Art. 12); provide deployer information (Art. 13); design for human oversight (Art. 14); ensure accuracy, robustness and cybersecurity (Art. 15); implement a quality management system (Art. 17); conduct conformity assessment (Art. 43); draw up EU declaration of conformity and affix CE marking (Arts. 47-48); register in the EU database (Art. 49); conduct post-market monitoring and incident reporting (Arts. 72-73).',
      'Deployer obligations (Article 26): use the system in accordance with provider instructions for use; assign human oversight to competent, authorised persons; ensure input data is relevant and representative; monitor operation and suspend use if risks arise; keep logs for at least 6 months; inform affected workers or their representatives before deploying in the workplace; inform natural persons subject to high-risk decisions.',
      'FRIA requirement (Article 27): deployers that are public bodies, or that use AI for credit scoring or life/health insurance risk assessment/pricing, must conduct a Fundamental Rights Impact Assessment before deployment.',
      'Reclassification as provider (Article 25): triggering conditions include: placing own name/trademark on a high-risk AI system; substantially modifying a high-risk AI system; changing the intended purpose of an AI system so that it becomes high-risk.'
    ],
    inScopeNote:
      'Non-EU providers must appoint an EU-based authorised representative (Article 22) who takes on specified responsibilities toward national authorities.',
    keyPains: [
      'Distinguishing "substantial modification" from routine configuration or fine-tuning - a change that alters the fundamental design of a high-risk system, or enables new capabilities in a new context, may trigger Article 25 reclassification.',
      'Understanding what counts as "professional capacity" for deployers - personal non-professional use is excluded from the Act, but a sole trader or freelancer using AI in their business is a deployer.',
      'Contractual allocation: providers and deployers can allocate certain obligations by contract, but neither can contract out of regulatory responsibility for their statutory duties.',
      'Multi-party systems: where multiple providers contribute AI components that are integrated by a third party, each provider carries obligations for their own component.'
    ],
    steps: [
      'Map every AI system in your organisation: for each, identify whether you developed it (provider), or merely use it (deployer), or distribute/import it.',
      'Check for reclassification risk under Article 25: have you branded, substantially modified or changed the intended purpose of any third-party high-risk system?',
      "For deployer roles: review the provider's instructions for use; assign trained human oversight personnel; set up log retention (minimum 6 months); prepare FRIA documentation if applicable.",
      'For provider roles: build out the Chapter III compliance programme for high-risk AI; appoint an EU authorised representative if you are non-EU.',
      'Review your contracts with providers to ensure they give you the information and documentation you need to perform your deployer obligations.'
    ],
    faq: [
      {
        q: 'We use a third-party AI tool internally. Are we a deployer?',
        a: 'Yes, if you use the AI tool under your own authority in a professional context. As a deployer of a high-risk system you carry the Article 26 obligations. If the system is not high-risk, you have lighter or no mandatory obligations - though AI literacy (Article 4) applies regardless.'
      },
      {
        q: 'Can the deployer and provider be the same organisation?',
        a: 'Yes. If you develop an AI system and also use it in-house in a professional context, you are both provider and deployer. You must meet both sets of obligations.'
      },
      {
        q: "We configure and customise a vendor's AI platform for clients - are we now the provider?",
        a: "It depends. If you place the system on the market under your own name, or substantially modify the vendor's high-risk system, or change its intended purpose so it becomes high-risk, Article 25 reclassifies you as the provider with full provider obligations. Configuration within the vendor's intended parameters generally does not trigger reclassification - but the line is not always clear."
      },
      {
        q: 'What documentation must a provider give the deployer?',
        a: 'For high-risk AI, the provider must provide instructions for use (Article 13) containing everything a deployer needs to use the system correctly: technical capabilities and limitations, performance metrics, human oversight instructions, data input requirements, maintenance and logging guidance. Deployers must use the system in accordance with those instructions.'
      },
      {
        q: 'Are importers and distributors exposed to fines?',
        a: 'Yes. Importers and distributors carry verification obligations (Articles 23-24) and can be fined for non-compliance with their own duties under Article 99. And if they trigger Article 25 reclassification, they face the full provider fine exposure (up to €15m/3% for non-compliance, or €35m/7% for prohibited practices).'
      }
    ]
  },

  // --------------------------------------------------------- AI ACT FOR US COMPANIES
  {
    slug: 'ai-act-for-us-companies',
    name: 'AI Act for US companies',
    title: 'EU AI Act for US (and non-EU) companies: extraterritorial scope explained',
    metaTitle:
      'EU AI Act for US companies: who is in scope and what to do | AI Act Navigator',
    metaDescription:
      'The EU AI Act reaches US and non-EU companies if their AI outputs are used in the EU - similar to GDPR. Plain-English guide to Article 2 scope, the "output used in the EU" trigger and the authorised representative requirement.',
    intro:
      'The EU AI Act is not just for EU businesses. Like the GDPR before it, it was designed to reach global providers whose AI products and services affect people in the EU. The "output used in the EU" trigger in Article 2 is the key - even a US company with no EU office or customers can be in scope if the results of its AI reach EU users. This guide explains the extraterritorial reach and what non-EU companies need to do.',
    tldr: [
      'The Act applies to providers that place AI on the EU market or put it into service in the EU - regardless of where the provider is established.',
      'It also applies to providers and deployers established outside the EU where the output of the AI system is used in the EU.',
      'A US SaaS vendor whose AI outputs reach EU users is likely a regulated provider under the Act.',
      'Non-EU providers of high-risk AI must appoint an EU-based authorised representative (Article 22).',
      'Notable exclusions: military/defence/national security; AI solely for scientific R&D; purely personal non-professional use.'
    ],
    inScope: [
      'Providers established outside the EU that place an AI system or GPAI model on the EU market (i.e. make it available to EU users, businesses or public bodies).',
      'Providers established outside the EU where the output produced by the AI system is used in the EU - even if the provider has no EU establishment and no EU customers as such.',
      'Deployers established outside the EU where the output of the AI system they use is applied in the EU.',
      'Importers and distributors of AI systems in the EU supply chain, and product manufacturers placing AI-embedded products on the EU market under their own name.',
      "The authorised representative requirement (Article 22): non-EU providers of high-risk AI systems must appoint an EU-established authorised representative in writing, granting them power to act on the provider's behalf toward EU national authorities."
    ],
    inScopeNote:
      'Exclusions from scope (Article 2): AI used exclusively for military, defence or national security purposes by Member States; AI solely for scientific research and development; AI placed on the market or put into service by international organisations for law enforcement purposes; purely personal non-professional use. Open-source AI is not automatically excluded - it is only exempt where it is not high-risk, not prohibited, and does not carry GPAI systemic risk.',
    keyPains: [
      'The "output used in the EU" test is broad and not yet tested in enforcement - it likely captures any AI service whose outputs (generated content, decisions, recommendations) reach EU-located persons, even if the contract is with a non-EU entity.',
      'Appointing an authorised representative: this requires an EU-established individual or entity with real authority and accountability - it cannot be an empty post-box arrangement.',
      'Simultaneous obligations: a non-EU high-risk AI provider must meet all the same Chapter III obligations as an EU provider (risk management, data governance, conformity assessment, CE marking, registration in the EU database, post-market monitoring).',
      'GPAI extraterritorial scope: a non-EU company training and distributing a GPAI model that EU users access is in scope for GPAI Chapter V obligations.'
    ],
    steps: [
      'Determine whether your AI products or services reach EU users, EU-based businesses, or EU public bodies - if yes, you are likely in scope.',
      'Classify your AI systems under the Act\'s risk tiers (prohibited, high-risk, transparency-risk, minimal risk) to understand which obligations apply.',
      'Identify any high-risk AI systems: these require the full Chapter III compliance programme and an EU authorised representative.',
      'If you provide GPAI models accessible to EU users: assess GPAI Chapter V obligations (applicable since 2 Aug 2025).',
      'Appoint an EU authorised representative for high-risk systems (required by 2 Aug 2026 under current law); register high-risk systems in the EU AI database.',
      'Review contracts with EU customers to ensure they contain the required information and documentation handover for deployers.'
    ],
    faq: [
      {
        q: 'We are a US company with no EU office and our customers are US-based. Are we in scope?',
        a: 'Possibly. The "output used in the EU" trigger means scope depends on whether the AI\'s outputs are used in the EU - not where your customers are. If your US customers use your AI to interact with EU users, or if any EU users directly access your AI, you may be in scope. The analysis is fact-specific.'
      },
      {
        q: 'What is an authorised representative and do we need one?',
        a: 'An authorised representative is an EU-established individual or entity you designate in writing to act on your behalf vis-a-vis EU authorities. For non-EU providers of high-risk AI systems it is mandatory (Article 22). The representative must be genuinely empowered - they can be contacted by authorities, receive and act on orders, and cooperate on conformity assessments.'
      },
      {
        q: 'Is the AI Act like GDPR for AI - in terms of extraterritorial reach?',
        a: 'The analogy is apt. Like GDPR, the AI Act uses a market-effects principle: if you are offering AI in or targeting the EU market, or your AI outputs are used in the EU, you are subject to the rules regardless of where you are based. The penalty exposure is similar in scale: up to €35m/7% of global turnover for the most serious breaches.'
      },
      {
        q: 'When do these obligations actually apply to us?',
        a: 'Article 5 prohibitions have applied since 2 February 2025. GPAI rules (Chapter V) apply from 2 August 2025. Most other obligations - including high-risk AI - apply from 2 August 2026 under current law (with the Digital Omnibus possibly deferring high-risk Annex III to 2 December 2027, but this is not yet adopted as of 9 June 2026).'
      },
      {
        q: 'Are open-source AI models we distribute exempt?',
        a: 'Open-source GPAI models are exempt from some Article 53 documentation duties - but this exemption does NOT apply if the model has systemic risk. And the open-source exemption does not override the prohibitions (Article 5) or the high-risk AI rules. So if you distribute an open-source high-risk AI system, you carry provider obligations.'
      }
    ]
  },

  // --------------------------------------------------------- AI ACT PENALTIES
  {
    slug: 'ai-act-penalties',
    name: 'AI Act penalties',
    title: 'EU AI Act penalties and fines: the three tiers explained',
    metaTitle:
      'EU AI Act fines and penalties: €35m/7%, €15m/3%, €7.5m/1% explained | AI Act Navigator',
    metaDescription:
      'The EU AI Act has three penalty tiers - up to €35m/7% of global turnover for the worst breaches. Plain-English breakdown of Article 99, SME proportionality and who enforces.',
    intro:
      'The EU AI Act has some of the largest administrative fines in EU regulation history. Penalties are graduated: the most serious breaches (prohibited practices) attract the highest fines, and smaller organisations benefit from a proportionality rule that caps fines at the lower of the percentage or the fixed amount. Penalties became enforceable from 2 August 2025.',
    tldr: [
      'Three tiers: €35m/7% (prohibited practices) → €15m/3% (other obligations, incl. high-risk non-compliance) → €7.5m/1% (misleading information).',
      'The fine is whichever is higher of the fixed amount and the percentage of global annual turnover - except for SMEs, where it is whichever is lower.',
      'GPAI model providers can be fined by the AI Office up to €15m/3% under Article 101.',
      'Penalties applicable from 2 August 2025.'
    ],
    inScope: [
      'Tier 1 - Breach of Article 5 prohibited practices: up to €35,000,000 or 7% of total worldwide annual turnover (preceding financial year), whichever is higher.',
      'Tier 2 - Non-compliance with other obligations (high-risk requirements, transparency obligations, deployer/importer/distributor duties, notified body obligations): up to €15,000,000 or 3% of worldwide annual turnover, whichever is higher.',
      'Tier 3 - Supplying incorrect, incomplete or misleading information to national authorities or notified bodies: up to €7,500,000 or 1% of worldwide annual turnover, whichever is higher.',
      'GPAI model providers (Article 101): the AI Office can impose fines of up to €15,000,000 or 3% of worldwide annual turnover for GPAI-specific violations.',
      'EU institutions and bodies (Article 100): the European Data Protection Supervisor can fine - up to €1,500,000 for Article 5 violations, €750,000 for other violations.'
    ],
    inScopeNote:
      'SME and start-up proportionality (Article 99(6)): for SMEs (including start-ups), each fine is capped at the LOWER of the percentage threshold or the fixed amount - the reverse of the general rule, which takes the higher. National authorities must also consider proportionality and the specific circumstances.',
    keyPains: [
      'The "higher of" rule means a large company breaching a prohibition faces a minimum of the lower of €35m/7% - the headline fine exposure is the higher: so a €10bn-revenue company could face €700m.',
      'The "misleading information" tier (€7.5m/1%) catches errors in conformity-assessment submissions and regulatory reporting, not just deliberate deception.',
      'The AI Office has direct enforcement authority over GPAI model providers - national authorities do not have primary jurisdiction over GPAI Chapter V compliance.',
      'Penalties apply from 2 August 2025, so GPAI and governance obligations are already subject to fines today.'
    ],
    steps: [
      'Priority-rank your compliance risks: Article 5 prohibitions (in force since Feb 2025) carry the highest penalty exposure and should be addressed first.',
      'Ensure GPAI compliance is underway - GPAI Chapter V obligations are already enforceable (from 2 Aug 2025).',
      'For high-risk systems: build the Chapter III programme targeting the 2 August 2026 deadline (or the proposed 2 December 2027 if the Omnibus is adopted).',
      'Implement robust regulatory-reporting processes: errors in information to notified bodies or authorities attract the Tier 3 penalty.',
      'For SMEs: document your SME status to benefit from the proportionality cap; note you still have the same obligations, just a lower maximum fine.'
    ],
    faq: [
      {
        q: 'When did AI Act penalties become enforceable?',
        a: 'Penalties became applicable from 2 August 2025 - the same date as the GPAI and governance provisions. Note that Article 5 prohibitions have applied since 2 February 2025, but enforcement via Article 99 fines commenced from 2 August 2025.'
      },
      {
        q: 'Is a €35m fine a minimum or a maximum?',
        a: 'It is a maximum. In practice authorities must consider proportionality, severity, duration, the degree of responsibility, and whether the organisation cooperated. The Commission and national authorities cannot impose a fine above the ceiling, but there is no legal minimum below which they cannot go.'
      },
      {
        q: 'We are a start-up - how does the SME rule work?',
        a: 'For SMEs (including start-ups), each fine is capped at the lower of the percentage threshold or the fixed amount. So for a prohibited-practice breach, the fine ceiling is the lower of 7% of turnover or €35m - not the higher. This protects small companies where 7% of their turnover would be less than €35m.'
      },
      {
        q: 'Who enforces the AI Act?',
        a: 'National authorities designated by each EU Member State enforce the Act for AI systems within their jurisdiction. The AI Office (European Commission) has exclusive EU-level enforcement jurisdiction over GPAI model providers. The European Data Protection Supervisor enforces against EU institutions.'
      },
      {
        q: 'Can my company be fined under both the AI Act and GDPR?',
        a: 'Yes - the two regulations are independent. An AI system that violates both the AI Act\'s prohibited practices and GDPR\'s data-protection requirements can attract penalties under each. The AI Act does not create an immunity from GDPR fines, and vice versa. Coordination between the AI Office, national AI authorities and data-protection authorities is expected for overlapping cases.'
      }
    ]
  },

  // --------------------------------------------------------- AI ACT VS GDPR
  {
    slug: 'ai-act-vs-gdpr',
    name: 'AI Act vs GDPR',
    title: 'EU AI Act vs GDPR: how the two laws interact',
    metaTitle:
      'EU AI Act vs GDPR: overlaps, differences and how to comply with both | AI Act Navigator',
    metaDescription:
      'The AI Act and GDPR both apply to many AI systems. Plain-English guide to the overlaps - FRIA vs DPIA, fundamental rights, dual liability - and how to handle both frameworks together.',
    intro:
      'For organisations that process personal data with AI - which is most organisations - the AI Act and the GDPR will often apply simultaneously. They are not duplicates: GDPR regulates data processing rights; the AI Act regulates AI system safety and fundamental rights. But they overlap significantly, and compliance programmes must account for both. This guide maps the key intersections.',
    tldr: [
      'Both apply independently: an AI system can breach the AI Act (e.g. prohibited practice, missing conformity assessment) AND GDPR (e.g. unlawful processing, inadequate DPIA) at the same time - double fines are possible.',
      'FRIA (AI Act Art. 27) vs DPIA (GDPR Art. 35): both are risk assessments - the FRIA is mandatory for certain AI deployers regardless of whether personal data is processed; the DPIA is required where processing is likely to result in high risk to natural persons. They overlap but cover different ground.',
      'AI Act high-risk systems that process personal data will almost always require both a FRIA and a DPIA.',
      "Lawful basis: GDPR still governs whether you can process the personal data your AI uses. The AI Act doesn't create new lawful bases and doesn't override GDPR consent or legitimate interest requirements."
    ],
    inScope: [
      'GDPR applies to any processing of personal data, including data used to train AI, data processed by AI in operation, and outputs that constitute personal data.',
      'AI Act applies to AI systems meeting the Article 3(1) definition, regardless of whether they process personal data - but most commercially relevant AI systems do.',
      'Overlapping scope: AI systems that use personal data and fall in Annex III high-risk categories (e.g. credit scoring, biometrics, employment screening, law enforcement profiling) are subject to both regimes simultaneously.',
      'FRIA (Article 27 AI Act) vs DPIA (Article 35 GDPR): the FRIA assesses impact on fundamental rights broadly (safety, dignity, equality, due process - beyond data protection); the DPIA focuses on data-protection-specific risks. An organisation may use a combined assessment for efficiency but must ensure both regulatory requirements are fully met.',
      'Biometric data: GDPR Article 9 categorises biometric data as special-category data with heightened protection; the AI Act imposes separate restrictions and prohibitions on biometric AI. Both apply cumulatively.'
    ],
    inScopeNote:
      'The AI Act expressly preserves GDPR rights and obligations (Recital 9). It does not replace GDPR and does not grant any exemption from GDPR compliance. The fundamental rights framework in the AI Act is broader than GDPR and includes rights that GDPR does not protect.',
    keyPains: [
      'Governance misalignment: privacy/DPO teams own GDPR compliance; AI governance or risk teams may own AI Act compliance. Keeping both aligned requires cross-functional coordination.',
      'Defining "personal data" in AI contexts: model outputs (generated content, predictions) may constitute personal data about individuals even if no obvious identifier is present.',
      'Automated decision-making: GDPR Article 22 (right to not be subject to purely automated decisions producing significant effects) intersects with the AI Act\'s human oversight requirements but is not identical - the tests differ.',
      'Training data: GDPR\'s data minimisation and purpose limitation principles constrain how personal data can be collected and used for AI training, which interacts with the AI Act\'s data-governance requirements (Article 10).'
    ],
    steps: [
      'Map AI systems that process personal data - for each, determine which provisions of both the AI Act and GDPR apply.',
      'For high-risk AI systems that process personal data: combine your FRIA and DPIA assessments where possible, but ensure both checklists are fully addressed.',
      'Assign clear ownership: the DPO should be involved in AI Act compliance for all AI that touches personal data.',
      'Review automated decision-making practices for both GDPR Article 22 compliance and AI Act human oversight requirements.',
      'Ensure AI training datasets comply with GDPR\'s data minimisation and purpose limitation - document this in the AI Act\'s Article 10 data-governance records.',
      'Update your Records of Processing Activities (ROPA) to reflect AI processing activities and their AI Act classification.'
    ],
    faq: [
      {
        q: 'If we have done a DPIA, do we still need a FRIA?',
        a: 'They are separate requirements. A DPIA under GDPR Article 35 covers data-protection-specific risks. A FRIA under AI Act Article 27 covers a wider set of fundamental rights (safety, non-discrimination, dignity, due process) and is specifically triggered by the AI Act deployer obligations (for public bodies and for credit scoring/insurance). You may structure a combined assessment, but you must satisfy both.'
      },
      {
        q: 'Can we be fined under both laws for the same AI failure?',
        a: 'Yes. The AI Act and GDPR are independent legal regimes. An AI system that, for example, makes discriminatory credit decisions using unlawfully processed personal data could attract GDPR fines (up to €20m/4%) and AI Act fines (up to €15m/3% for high-risk non-compliance). There is no general "one fine" principle between the two regimes.'
      },
      {
        q: 'Does the AI Act\'s prohibition on emotion recognition affect our existing GDPR biometric data processing?',
        a: 'The AI Act prohibition on workplace and educational-institution emotion recognition is an AI-Act-specific ban that applies regardless of GDPR lawful basis. Even if you have GDPR consent for biometric processing, you cannot use an emotion-recognition AI in those contexts under the AI Act. GDPR and AI Act must both be satisfied independently.'
      },
      {
        q: 'Our AI processes no personal data - do we have GDPR obligations?',
        a: 'No GDPR obligations arise where no personal data is processed. You still have AI Act obligations (including high-risk rules, transparency obligations and prohibited-practice checks) which apply regardless of personal-data involvement.'
      },
      {
        q: 'How does the AI Act\'s data governance (Article 10) relate to GDPR?',
        a: 'Article 10 requires that training, validation and test data for high-risk AI are relevant, representative, sufficiently free of errors and complete. This overlaps with GDPR\'s accuracy principle (Article 5(1)(d)) and data minimisation - but Article 10 is not a GDPR provision and applies even to non-personal data. Both must be satisfied where personal data is used in training.'
      }
    ]
  },

  // --------------------------------------------------------- TRANSPARENCY OBLIGATIONS
  {
    slug: 'transparency-obligations',
    name: 'Transparency obligations',
    title: 'Transparency obligations under the EU AI Act (Article 50)',
    metaTitle:
      'EU AI Act transparency obligations: chatbots, deepfakes and AI-generated content | AI Act Navigator',
    metaDescription:
      'Article 50 of the EU AI Act requires disclosure when AI interacts with people or generates content. Plain-English guide to chatbot notices, AI-content labelling, deepfake disclosure and emotion-recognition notification.',
    intro:
      'Not every AI use is banned or strictly regulated - many AI systems sit in a "limited/transparency risk" tier where the main obligation is to be honest about the AI\'s role. Article 50 sets out four distinct transparency duties covering chatbots, AI-generated content, deepfakes and emotion/biometric categorisation systems. These obligations apply from 2 August 2026 for most providers.',
    tldr: [
      'Chatbots and conversational AI: users must be told they are interacting with an AI system - unless it is obvious.',
      'AI-generated/synthetic content: providers must mark outputs (audio, image, video, text) in a machine-readable format as artificially generated or manipulated.',
      'Deepfakes: deployers must disclose when content has been artificially generated or manipulated - with limited carve-outs for artistic/satirical works with appropriate labelling.',
      'Emotion recognition and biometric categorisation: deployers must inform the people being processed.',
      '[OMNIBUS - PROPOSED] The Digital Omnibus provisional agreement would reduce the grace period for AI-content marking to 3 months (effective 2 December 2026 instead of 2 August 2026).'
    ],
    inScope: [
      'Chatbots and conversational AI systems (Article 50(1)): providers must ensure that natural persons interacting with AI are informed they are interacting with an AI system - unless it is evident from context or the system is used for criminal-investigations or similar lawful purposes.',
      'AI-generated content - machine-readable marking (Article 50(2)): providers of AI systems generating synthetic audio, image, video or text content must ensure outputs are machine-readably marked as artificially generated or manipulated. Technical standards to be developed.',
      'Deepfakes - deployer disclosure (Article 50(4)): deployers who use AI to generate or manipulate content showing real persons, places or events that falsely appears authentic must disclose the artificial nature. Carve-out for legitimate artistic, creative or satirical works, provided the content is clearly labelled.',
      'AI-generated text for public information (Article 50(3)): deployers publishing AI-generated text to inform the public on matters of public interest must disclose the AI-generated nature - unless this text has undergone substantial human editing.',
      'Emotion recognition and biometric categorisation (Article 50(5)): deployers of AI systems that recognise or infer emotions, or categorise natural persons based on biometric data, must inform the persons concerned in advance.'
    ],
    inScopeNote:
      'Article 50 transparency obligations apply from 2 August 2026 for providers (subject to the proposed Digital Omnibus adjustment for AI-content marking). They are separate from and lighter than the high-risk obligations. Many AI systems will only be subject to Article 50, not to Chapter III high-risk requirements.',
    keyPains: [
      'Machine-readable marking standards for AI-generated content are still being developed - providers cannot yet buy a simple technical solution off the shelf.',
      'The "obvious AI" exception for chatbots is narrow: where a system is branded as an AI assistant, users are likely informed; but where AI is embedded in a human-seeming interface, disclosure is required.',
      'Deepfake disclosure in creative/satirical contexts requires clear labelling - the artistic carve-out does not mean no disclosure, only that a different labelling form is acceptable.',
      'Emotion recognition notification must be given "in advance" to the persons concerned - this can create operational challenges in contexts like retail or transport.'
    ],
    steps: [
      'Identify every AI system that has a conversational or interactive interface: implement a visible AI-disclosure notice for users.',
      'Audit AI systems that generate synthetic audio, image, video or text: prepare for machine-readable marking when the technical standards land.',
      'Review any use of AI to generate content depicting real people, places or events: implement deepfake disclosure where the content could mislead.',
      'Identify emotion-recognition or biometric-categorisation deployments: design advance notification to affected persons.',
      'Monitor the Digital Omnibus adoption for possible changes to the AI-content marking timeline.'
    ],
    draftNote: {
      title: '[PROPOSED] Digital Omnibus changes to Article 50 - not yet law',
      body:
        'The provisional Digital Omnibus political agreement of 7 May 2026 would reduce the grace period for AI-generated content marking (Art. 50(2)) from 6 months to 3 months, making the effective date 2 December 2026 rather than 2 August 2026. This is not yet formally adopted. Until adoption, the 2 August 2026 deadline in current law remains binding.'
    },
    faq: [
      {
        q: 'Does every AI chatbot need an "I am an AI" notice?',
        a: 'Yes, unless it is clear from the context that the user is interacting with an AI - for example a product explicitly branded as "AI Assistant." Where there is any ambiguity about whether the user understands they are talking to an AI, a disclosure is required. The obligation falls on the provider of the chatbot system.'
      },
      {
        q: 'What does "machine-readable marking" for AI-generated content mean?',
        a: 'It means embedding metadata or a signal in the output file that allows automated systems (not just humans) to detect that the content is AI-generated or manipulated. Standards are still being developed by the Commission and standardisation bodies. Existing technologies like C2PA watermarking are candidate approaches.'
      },
      {
        q: 'Are Article 50 violations subject to the same fines as high-risk non-compliance?',
        a: 'Yes - Article 50 violations fall under the Tier 2 penalty: up to €15 million or 3% of worldwide annual turnover. This is the same tier as non-compliance with other obligations, including high-risk requirements.'
      },
      {
        q: 'Do these transparency obligations apply to internal AI tools?',
        a: 'The chatbot disclosure obligation applies where a natural person is interacting with the AI system - so an internal employee-facing AI assistant is covered. The emotion-recognition and biometric-categorisation notification applies whenever persons are subject to the system, including employees. AI-generated content marking mainly concerns outputs disseminated externally, but the provider obligation attaches to the system regardless.'
      },
      {
        q: 'Can you use satirical deepfakes without restriction?',
        a: 'The artistic/satirical carve-out does not remove the disclosure requirement - it only permits a different form: the content must be "clearly labelled" as artificially generated or manipulated. A deepfake political satire video is allowed as long as it carries visible labelling; it cannot simply be published without any disclosure of its AI-generated nature.'
      }
    ]
  }
];

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}
