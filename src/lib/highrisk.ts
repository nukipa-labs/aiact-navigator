/**
 * EU AI Act high-risk use-case reference data.
 *
 * ACCURACY RULES:
 *  - Annex III areas come directly from Annex III of Regulation (EU) 2024/1689.
 *  - Annex I regulated-product categories come from Article 6(1) and Annex I.
 *  - The Article 6(3) filter is faithfully represented: Annex III does NOT
 *    automatically mean high-risk if the system does not pose significant
 *    risk of harm to health, safety or fundamental rights.
 *  - The filter does NOT apply where the system profiles natural persons.
 *  - No invented examples. Every example is grounded in research.md.
 *
 * Sources:
 *  Annex III: https://artificialintelligenceact.eu/annex/3/
 *  Article 6: https://artificialintelligenceact.eu/article/6/
 */

export type AreaCategory = 'annex-iii' | 'annex-i';

export type HighRiskArea = {
  id: string;
  category: AreaCategory;
  /** Short label for the filter chip */
  categoryLabel: string;
  area: string;
  examples: string[];
  note: string;
};

export const HIGH_RISK_AREAS: HighRiskArea[] = [
  // ──────────── ANNEX III ────────────
  {
    id: 'biometrics',
    category: 'annex-iii',
    categoryLabel: 'Annex III',
    area: 'Biometrics (area 1)',
    examples: [
      'Remote biometric identification systems (face, gait, fingerprint)',
      'Biometric categorisation systems inferring attributes from biometric data',
      'Emotion recognition systems used outside prohibited contexts'
    ],
    note:
      'Excludes uses already banned by Article 5 (untargeted facial-image scraping, real-time biometric ID in public for law enforcement without authorisation, and biometric categorisation inferring sensitive attributes). Source: https://artificialintelligenceact.eu/annex/3/'
  },
  {
    id: 'critical-infrastructure',
    category: 'annex-iii',
    categoryLabel: 'Annex III',
    area: 'Critical infrastructure (area 2)',
    examples: [
      'AI used as safety components in road-traffic management systems',
      'AI in management or operation of water, gas or heating distribution',
      'AI safety components in electricity-grid or digital-infrastructure management'
    ],
    note:
      'Covers AI that is a safety component in, or manages/operates, critical infrastructure. The Article 6(3) filter may apply to purely administrative or monitoring tools that do not directly affect safety. Source: https://artificialintelligenceact.eu/annex/3/'
  },
  {
    id: 'education',
    category: 'annex-iii',
    categoryLabel: 'Annex III',
    area: 'Education & vocational training (area 3)',
    examples: [
      'AI determining access or assignment to educational or vocational institutions',
      'AI assessing or evaluating learning outcomes',
      'AI evaluating a person\'s learning level',
      'AI monitoring or proctoring students during exams'
    ],
    note:
      'Covers AI that determines or materially influences educational access or assessment. AI that merely recommends learning resources or provides study aids may qualify for the Article 6(3) filter exception. Source: https://artificialintelligenceact.eu/annex/3/'
  },
  {
    id: 'employment',
    category: 'annex-iii',
    categoryLabel: 'Annex III',
    area: 'Employment & workers management (area 4)',
    examples: [
      'AI for recruitment and selection of candidates (screening CVs, shortlisting)',
      'AI making or substantially influencing decisions on promotion or termination',
      'AI monitoring and evaluating employee performance or behaviour',
      'AI allocating tasks to workers (including gig workers)'
    ],
    note:
      'One of the most compliance-relevant areas for enterprise deployers. HR software vendors offering AI-assisted screening, performance management or workflow automation should assess this area carefully. Source: https://artificialintelligenceact.eu/annex/3/'
  },
  {
    id: 'essential-services',
    category: 'annex-iii',
    categoryLabel: 'Annex III',
    area: 'Access to essential private & public services (area 5)',
    examples: [
      'Credit-scoring and creditworthiness evaluation AI (excluding fraud detection)',
      'AI assessing eligibility for public benefits or social services',
      'AI for life insurance or health insurance risk assessment and pricing',
      'Emergency service dispatch and triage AI'
    ],
    note:
      'Credit scoring and insurance risk assessment are the highest-profile commercial use cases here. These also trigger the Article 27 FRIA requirement for deployers. Fraud-detection AI is excluded from the credit-scoring entry. Source: https://artificialintelligenceact.eu/annex/3/'
  },
  {
    id: 'law-enforcement',
    category: 'annex-iii',
    categoryLabel: 'Annex III',
    area: 'Law enforcement (area 6)',
    examples: [
      'AI assessing the risk of a person committing an offence or re-offending',
      'AI polygraph and similar lie-detection tools',
      'AI evaluating reliability of evidence in criminal investigations',
      'AI profiling individuals in the context of criminal investigations'
    ],
    note:
      'Narrow sector - primarily relevant to law-enforcement authorities and vendors supplying them. Some uses may overlap with Article 5 prohibitions (predictive policing based solely on profiling). Source: https://artificialintelligenceact.eu/annex/3/'
  },
  {
    id: 'migration-asylum',
    category: 'annex-iii',
    categoryLabel: 'Annex III',
    area: 'Migration, asylum & border control (area 7)',
    examples: [
      'AI polygraph or lie-detection tools used in migration/asylum contexts',
      'AI assessing risk of irregular migration or other risks',
      'AI examining or deciding on asylum, visa or residence permit applications',
      'AI detecting or recognising persons at borders'
    ],
    note:
      'Primarily relevant to government/border-control authorities and vendors supplying them. High sensitivity given fundamental rights implications for applicants. Source: https://artificialintelligenceact.eu/annex/3/'
  },
  {
    id: 'justice-democracy',
    category: 'annex-iii',
    categoryLabel: 'Annex III',
    area: 'Administration of justice & democratic processes (area 8)',
    examples: [
      'AI tools that assist judges or judicial authorities in researching, interpreting or applying the law',
      'AI used to influence election or referendum outcomes',
      'AI targeting voters based on political preferences or behaviour'
    ],
    note:
      'Very narrow. Pure legal-research tools that help lawyers find relevant case law may qualify for the Article 6(3) filter if they perform preparatory tasks without replacing judicial judgement. Electoral AI uses raise the most severe fundamental-rights concerns. Source: https://artificialintelligenceact.eu/annex/3/'
  },

  // ──────────── ANNEX I (regulated-product route) ────────────
  {
    id: 'medical-devices',
    category: 'annex-i',
    categoryLabel: 'Annex I product',
    area: 'Medical devices & IVDs',
    examples: [
      'AI clinical decision-support software used as a safety component in a medical device (MDR/IVDR)',
      'AI-enabled diagnostic imaging analysis classified as a medical device',
      'AI systems embedded in in-vitro diagnostic equipment'
    ],
    note:
      'AI that is a safety component of, or is itself, a medical device under Regulation (EU) 2017/745 (MDR) or in-vitro diagnostic device under Regulation (EU) 2017/746 (IVDR), and required to undergo third-party conformity assessment. This is the most commercially significant Annex I category. Source: https://artificialintelligenceact.eu/article/6/'
  },
  {
    id: 'machinery',
    category: 'annex-i',
    categoryLabel: 'Annex I product',
    area: 'Machinery',
    examples: [
      'AI safety functions in industrial robots under the Machinery Regulation (EU) 2023/1230',
      'AI collision-avoidance or emergency-stop systems in automated machinery',
      'AI monitoring systems that constitute safety components in machinery'
    ],
    note:
      'AI that is a safety component of a product regulated under the Machinery Regulation (EU) 2023/1230 (which replaces Directive 2006/42/EC). Third-party conformity assessment triggers the AI Act high-risk classification. Source: https://artificialintelligenceact.eu/article/6/'
  },
  {
    id: 'motor-vehicles',
    category: 'annex-i',
    categoryLabel: 'Annex I product',
    area: 'Motor vehicles & automotive',
    examples: [
      'AI safety systems in vehicles subject to EU vehicle type-approval (Regulation (EU) 2019/2144)',
      'AI advanced driver-assistance systems (ADAS) in scope of the automotive type-approval regulation',
      'AI autonomous emergency braking, lane-keeping or occupant protection systems'
    ],
    note:
      'AI in motor vehicles regulated under EU type-approval legislation (Regulation (EU) 2018/858 and Regulation (EU) 2019/2144). Where these systems must undergo third-party conformity assessment, they trigger the Annex I high-risk route. Source: https://artificialintelligenceact.eu/article/6/'
  },
  {
    id: 'aviation',
    category: 'annex-i',
    categoryLabel: 'Annex I product',
    area: 'Aviation',
    examples: [
      'AI safety components in civil aircraft and equipment under EASA regulations',
      'AI used in flight-control or autopilot systems subject to EU Aviation Safety Agency oversight',
      'AI ground-based safety systems covered by EU aviation safety rules'
    ],
    note:
      'AI that is a safety component of civil aviation products regulated under Regulation (EU) 2018/1139. Typically subject to stringent EASA certification requirements that also trigger the AI Act high-risk classification. Source: https://artificialintelligenceact.eu/article/6/'
  },
  {
    id: 'toys',
    category: 'annex-i',
    categoryLabel: 'Annex I product',
    area: 'Toys',
    examples: [
      'AI embedded in connected toys as a safety component under the Toy Safety Directive (2009/48/EC)',
      'AI content-filtering or interaction systems in toys that constitute a safety feature'
    ],
    note:
      'AI that is a safety component of toys regulated under Directive 2009/48/EC, where the underlying product legislation requires third-party conformity assessment. Source: https://artificialintelligenceact.eu/article/6/'
  },
  {
    id: 'lifts-pressure',
    category: 'annex-i',
    categoryLabel: 'Annex I product',
    area: 'Lifts, pressure equipment & other products',
    examples: [
      'AI safety systems in lifts regulated under Directive 2014/33/EU',
      'AI monitoring in pressure equipment under Directive 2014/68/EU',
      'AI components in radio equipment under Directive 2014/53/EU (RED)'
    ],
    note:
      'Several further product categories in Annex I are less commercially prominent for AI but follow the same rule: AI safety component + third-party conformity assessment required = high-risk. Source: https://artificialintelligenceact.eu/article/6/'
  }
];

export const areaCounts = {
  annexIII: HIGH_RISK_AREAS.filter((a) => a.category === 'annex-iii').length,
  annexI: HIGH_RISK_AREAS.filter((a) => a.category === 'annex-i').length,
  total: HIGH_RISK_AREAS.length
};
