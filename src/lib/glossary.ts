// AI Act Glossary terms. Plain-English first, then the precise/legal phrasing.
// Grounded in research.md (Regulation (EU) 2024/1689, verified 2026-06-09).
// Used by /glossary (DefinedTerm schema) and linkable from the /ai-act pillar.
// Anchor slugs must match: #provider, #deployer, #prohibited-practice,
// #high-risk-ai, #ai-literacy, #systemic-risk, #gpai, #conformity-assessment

export type GlossaryTerm = {
  slug: string;
  term: string;
  /** Plain-English definition, shown first. */
  plain: string;
  /** The precise / legal phrasing, shown in muted text below. Optional. */
  formal?: string;
  /** Related term slugs. */
  seeAlso?: string[];
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'eu-ai-act',
    term: 'EU AI Act',
    plain:
      "The world's first comprehensive horizontal law on artificial intelligence. It sets harmonised rules for placing AI systems and general-purpose AI models on the EU market, aiming to ensure safety, fundamental rights protection and trustworthy AI while supporting innovation.",
    formal:
      'Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 laying down harmonised rules on artificial intelligence. Entered into force 1 August 2024; fully applicable from 2 August 2026, with phased exceptions. Source: https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
    seeAlso: ['risk-based-approach', 'ai-system', 'gpai', 'annex-iii']
  },
  {
    slug: 'risk-based-approach',
    term: 'Risk-based approach',
    plain:
      "The AI Act's core design principle: obligations scale with the level of risk an AI system poses. Systems that pose unacceptable risk are banned outright; high-risk systems face the strictest obligations; lower-risk systems face lighter or no mandatory rules.",
    formal:
      'Four tiers: unacceptable risk (Article 5 prohibitions), high-risk (Chapter III), limited/transparency risk (Article 50), and minimal risk. GPAI models are regulated on a separate track (Chapter V). Source: https://artificialintelligenceact.eu/high-level-summary/',
    seeAlso: ['prohibited-practice', 'high-risk-ai', 'transparency-obligation', 'gpai']
  },
  {
    slug: 'ai-system',
    term: 'AI system',
    plain:
      'A machine-based system that - for a given set of objectives - infers from inputs how to generate outputs such as predictions, content, recommendations or decisions. It operates with some autonomy and may adapt after deployment.',
    formal:
      'Article 3(1): "a machine-based system that is designed to operate with varying levels of autonomy and that may exhibit adaptiveness after deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments."',
    seeAlso: ['gpai', 'high-risk-ai', 'provider', 'deployer']
  },
  {
    slug: 'gpai',
    term: 'GPAI (general-purpose AI model)',
    plain:
      'A broadly capable AI model - such as a large language model - that can perform many distinct tasks and be integrated into many downstream applications. The AI Act puts GPAI models on a separate regulatory track from AI systems.',
    formal:
      'Article 3(63): "an AI model, including where such an AI model is trained with a large amount of data using self-supervision at scale, that displays significant generality and is capable of competently performing a wide range of distinct tasks regardless of the way the model is placed on the market." Regulated under Chapter V (applicable from 2 Aug 2025).',
    seeAlso: ['foundation-model', 'systemic-risk', 'ai-system', 'provider']
  },
  {
    slug: 'provider',
    term: 'Provider',
    plain:
      'The entity that develops an AI system or GPAI model (or has it developed) and places it on the EU market or puts it into service under its own name or trademark. Providers carry the heaviest obligations under the Act.',
    formal:
      'Article 3(3): "a natural or legal person, public authority, agency or other body that develops an AI system or a general-purpose AI model and places it on the market or puts the system into service under its own name or trademark, whether for payment or free of charge." Source: https://artificialintelligenceact.eu/article/3/',
    seeAlso: ['deployer', 'importer-distributor', 'high-risk-ai', 'conformity-assessment']
  },
  {
    slug: 'deployer',
    term: 'Deployer',
    plain:
      'An entity that uses an AI system under its own authority in a professional context. Deployers do not develop the AI but they decide how it is used and bear significant obligations - especially for high-risk systems.',
    formal:
      'Article 3(4): "a natural or legal person, public authority, agency or other body that uses an AI system under its authority except where the AI system is used in the course of a personal non-professional activity." Source: https://artificialintelligenceact.eu/article/3/',
    seeAlso: ['provider', 'high-risk-ai', 'fria', 'ai-literacy']
  },
  {
    slug: 'importer-distributor',
    term: 'Importer & distributor',
    plain:
      'An importer is an EU-based entity that places on the EU market an AI system made by a non-EU provider. A distributor is anyone else in the supply chain who makes an AI system available on the EU market. Both carry compliance verification duties and can be reclassified as providers if they substantially modify a system.',
    formal:
      'Article 3(6)-(7): Importer - "a natural or legal person located or established in the Union that places on the market an AI system that bears the name or trademark of a natural or legal person established outside the Union." Distributor - "a natural or legal person in the supply chain, other than the provider or the importer, that makes an AI system available on the Union market." Source: https://artificialintelligenceact.eu/article/3/',
    seeAlso: ['provider', 'deployer']
  },
  {
    slug: 'high-risk-ai',
    term: 'High-risk AI',
    plain:
      'AI that is a safety component of a regulated product (Annex I route) or falls in one of the 8 listed use-case areas in Annex III, posing significant risk to health, safety or fundamental rights. Providers of high-risk AI must pass a conformity assessment before placing it on the market.',
    formal:
      'Article 6: "High-risk AI system" reaches this classification via two routes: (1) AI that is a safety component of, or itself a product covered by, the EU harmonisation legislation in Annex I and required to undergo third-party conformity assessment; (2) AI listed in Annex III. An Article 6(3) filter allows the Annex III classification to be set aside if the system does not pose significant risk of harm. Source: https://artificialintelligenceact.eu/article/6/',
    seeAlso: ['annex-iii', 'annex-i', 'conformity-assessment', 'risk-based-approach']
  },
  {
    slug: 'prohibited-practice',
    term: 'Prohibited practice (Article 5)',
    plain:
      'An AI use deemed an unacceptable risk and banned outright since 2 February 2025. The eight bans cover manipulative techniques, exploiting vulnerabilities, social scoring, predictive policing by profiling, untargeted facial-image scraping, workplace/school emotion recognition, biometric categorisation inferring sensitive attributes, and real-time biometric identification in public spaces by law enforcement.',
    formal:
      'Article 5 of Regulation (EU) 2024/1689. Applicable from 2 February 2025. [OMNIBUS - PROPOSED] A provisional political agreement of 7 May 2026 would add a ninth prohibition: AI generating non-consensual intimate imagery and AI-generated CSAM. Not yet law as of 9 June 2026. Source: https://artificialintelligenceact.eu/article/5/',
    seeAlso: ['risk-based-approach', 'high-risk-ai', 'transparency-obligation']
  },
  {
    slug: 'transparency-obligation',
    term: 'Transparency obligation (Article 50)',
    plain:
      'Lighter duties that apply to AI systems that interact with people or generate content without being outright banned or high-risk. Key examples: chatbots must tell users they are talking to an AI; AI-generated content must be machine-readably marked; deepfakes must be disclosed; emotion-recognition systems must inform the people being observed.',
    formal:
      'Article 50 (applicable from 2 Aug 2026 for providers; [OMNIBUS - PROPOSED] grace period possibly shortened to 3 months / effective 2 Dec 2026 for AI-generated content marking under the Digital Omnibus provisional agreement). Source: https://artificialintelligenceact.eu/article/50/',
    seeAlso: ['risk-based-approach', 'prohibited-practice', 'ai-system']
  },
  {
    slug: 'conformity-assessment',
    term: 'Conformity assessment',
    plain:
      "The process of verifying that a high-risk AI system meets the Act's requirements before it goes to market. Depending on the system type, this can be a self-assessment by the provider or a third-party assessment by a notified body.",
    formal:
      'Article 43. For most Annex III systems a provider self-assessment is permitted; for high-risk AI in biometric identification and most Annex I product categories a notified body must be involved. Source: https://artificialintelligenceact.eu/article/43/',
    seeAlso: ['notified-body', 'ce-marking', 'eu-declaration-of-conformity', 'high-risk-ai']
  },
  {
    slug: 'ce-marking',
    term: 'CE marking',
    plain:
      'The mark a provider affixes to a conformant high-risk AI system (or its documentation) to signal it meets EU requirements and can circulate freely in the single market.',
    formal:
      'Article 48. Only systems that have successfully completed a conformity assessment and whose provider has drawn up an EU declaration of conformity may bear the CE marking. Source: https://artificialintelligenceact.eu/article/48/',
    seeAlso: ['conformity-assessment', 'eu-declaration-of-conformity', 'notified-body']
  },
  {
    slug: 'notified-body',
    term: 'Notified body',
    plain:
      'An independent third-party conformity-assessment organisation designated by an EU Member State to assess certain high-risk AI systems on behalf of providers.',
    formal:
      'Article 3(22) and Chapter IV (Articles 28-39). Member States notify their designated conformity-assessment bodies to the Commission. Notified bodies assess high-risk AI systems where the applicable legislation or Annex requires third-party assessment.',
    seeAlso: ['conformity-assessment', 'ce-marking', 'high-risk-ai']
  },
  {
    slug: 'eu-declaration-of-conformity',
    term: 'EU declaration of conformity',
    plain:
      "The provider's signed statement - drawn up before market placement - that a high-risk AI system meets all relevant requirements of the Act and any other applicable EU law.",
    formal:
      'Article 47: providers of high-risk AI systems must draw up an EU declaration of conformity containing the information in Annex V: identity of the provider, system description, applicable requirements, notified body details (if any), and a signed declaration of conformity. Source: https://artificialintelligenceact.eu/article/47/',
    seeAlso: ['conformity-assessment', 'ce-marking', 'high-risk-ai']
  },
  {
    slug: 'ai-office',
    term: 'AI Office',
    plain:
      'The European Commission body responsible for overseeing GPAI models, supervising and enforcing the GPAI rules, supporting the Code of Practice process, and coordinating AI Act implementation across the EU.',
    formal:
      "Established under Article 64 of the AI Act; operational from 2 Aug 2025. The AI Office is part of the European Commission's DG CNECT and has sole EU-level enforcement authority over GPAI model providers. Source: https://digital-strategy.ec.europa.eu/en/policies/ai-office",
    seeAlso: ['gpai', 'systemic-risk', 'gpai-code-of-practice']
  },
  {
    slug: 'systemic-risk',
    term: 'Systemic risk',
    plain:
      'Risk specific to the most powerful GPAI models - those trained on more than 10²⁵ FLOP - that could have large-scale adverse effects across the EU. Models presumed to have systemic risk face extra duties including adversarial testing and incident reporting.',
    formal:
      'Articles 51 and 55. A GPAI model is presumed to have high-impact capabilities and systemic risk when its training compute exceeds 10²⁵ FLOPs. Extra obligations: model evaluation (incl. red-teaming), systemic risk assessment and mitigation, serious-incident reporting to the AI Office, and adequate cybersecurity. Source: https://artificialintelligenceact.eu/article/55/',
    seeAlso: ['gpai', 'ai-office', 'foundation-model', 'gpai-code-of-practice']
  },
  {
    slug: 'foundation-model',
    term: 'Foundation model',
    plain:
      'Industry term for a large AI model trained on broad data and adaptable to many tasks - GPT, Claude, Gemini and similar. In the AI Act this maps to "GPAI model." The Act does not use the phrase "foundation model."',
    formal:
      'Not a defined term in Regulation (EU) 2024/1689. The equivalent statutory concept is "general-purpose AI model" (Article 3(63)). See also the GPAI Guidelines indicative threshold of >10²³ FLOP for models generating language/text-to-image/text-to-video. Source: https://artificialintelligenceact.eu/gpai-guidelines-overview/',
    seeAlso: ['gpai', 'systemic-risk']
  },
  {
    slug: 'annex-iii',
    term: 'Annex III',
    plain:
      'The list of 8 use-case areas where stand-alone AI systems are automatically classified as high-risk: biometrics; critical infrastructure; education; employment; access to essential services; law enforcement; migration and border control; and administration of justice and democratic processes.',
    formal:
      'Annex III of Regulation (EU) 2024/1689. Subject to the Article 6(3) filter exception: an Annex III system is not high-risk if it does not pose a significant risk of harm to health, safety or fundamental rights (e.g. it performs a narrow procedural task), except where it profiles natural persons. Source: https://artificialintelligenceact.eu/annex/3/',
    seeAlso: ['high-risk-ai', 'annex-i', 'conformity-assessment', 'risk-based-approach']
  },
  {
    slug: 'annex-i',
    term: 'Annex I',
    plain:
      'The list of EU product-safety laws (machinery, medical devices, toys, motor vehicles, aviation equipment, etc.) whose in-scope products become high-risk AI when AI is a safety component. The "product route" to high-risk classification.',
    formal:
      'Annex I of Regulation (EU) 2024/1689 (Article 6(1) route to high-risk). AI that is a safety component of, or itself a product regulated under, one of the listed directives/regulations and required to undergo third-party conformity assessment is classified high-risk. Source: https://artificialintelligenceact.eu/article/6/',
    seeAlso: ['high-risk-ai', 'annex-iii', 'conformity-assessment']
  },
  {
    slug: 'ai-literacy',
    term: 'AI literacy',
    plain:
      "The Article 4 duty, in force since 2 February 2025, for providers and deployers to ensure their staff and anyone else who operates or uses AI systems on their behalf has a sufficient level of knowledge about AI - tailored to that person's role, experience and the context of use.",
    formal:
      'Article 4 (applicable from 2 Feb 2025): "Providers and deployers of AI systems shall take measures to ensure, to their best extent, a sufficient level of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf." No prescribed curriculum; organisations must document appropriate training. Source: https://artificialintelligenceact.eu/article/4/',
    seeAlso: ['provider', 'deployer', 'ai-system']
  },
  {
    slug: 'post-market-monitoring',
    term: 'Post-market monitoring',
    plain:
      "The provider's ongoing obligation to actively collect and review data on a high-risk AI system's real-world performance after it is deployed, so that emerging risks can be detected and addressed promptly.",
    formal:
      'Article 72: providers must have a post-market monitoring plan (per Annex VIII) and report serious incidents or malfunctions to national authorities without undue delay. Deployers must keep system-generated logs for at least 6 months. Source: https://artificialintelligenceact.eu/article/72/',
    seeAlso: ['provider', 'deployer', 'high-risk-ai']
  },
  {
    slug: 'fria',
    term: 'FRIA (Fundamental Rights Impact Assessment)',
    plain:
      'A structured assessment that certain deployers must carry out before deploying a high-risk AI system. It identifies which fundamental rights might be affected and what safeguards are in place. Required for public-body deployers and for credit-scoring and insurance-risk use cases.',
    formal:
      'Article 27. Mandatory for: deployers that are public authorities or bodies providing public services; deployers using high-risk systems for credit scoring (excl. fraud detection) and life & health insurance risk assessment/pricing. Must document the system, its purpose, the fundamental rights affected, and oversight measures. Source: https://artificialintelligenceact.eu/article/27/',
    seeAlso: ['deployer', 'high-risk-ai', 'annex-iii']
  },
  {
    slug: 'regulatory-sandbox',
    term: 'Regulatory sandbox',
    plain:
      'A controlled, supervised environment set up by national authorities where innovators can develop and test AI systems under regulatory guidance before they reach the market, with legal certainty and lighter compliance requirements.',
    formal:
      'Articles 57-63. Member States must establish at least one national AI regulatory sandbox by 2 August 2026 ([OMNIBUS - PROPOSED] postponed to 2 August 2027 under the provisional Digital Omnibus agreement). The Commission may establish an EU-level sandbox. Source: https://artificialintelligenceact.eu/article/57/',
    seeAlso: ['provider', 'ai-system']
  },
  {
    slug: 'gpai-code-of-practice',
    term: 'GPAI Code of Practice',
    plain:
      'A voluntary compliance tool developed under the AI Office to help GPAI model providers demonstrate conformity with Articles 53 and 55 (GPAI obligations), pending harmonised EU standards. Covers transparency, copyright compliance, and safety and security.',
    formal:
      'Article 56. The Commission convened the Code of Practice process; it has chapters on transparency, copyright, and safety & security. An adequate Code of Practice can serve as evidence of compliance. Source: https://artificialintelligenceact.eu/introduction-to-code-of-practice/',
    seeAlso: ['gpai', 'systemic-risk', 'ai-office']
  }
];
