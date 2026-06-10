// Pure logic + content for the "What must I do under the AI Act?" obligations checker.
// No React here. The client component consumes these shapes.
//
// The Act assigns duties by ROLE (provider / deployer / importer / distributor)
// crossed with RISK TIER (prohibited / high / limited / minimal), with a separate
// general-purpose AI (GPAI) track. Article references come from the fact brief:
//   - High-risk provider: Arts. 9-17, 43, 47-49, 72-73, 22 (non-EU rep).
//   - High-risk deployer: Art. 26 (use per instructions, oversight, logs >=6 months,
//     inform workers/affected persons), Art. 27 (FRIA for public bodies, credit,
//     insurance).
//   - Limited / transparency: Art. 50.
//   - Minimal: no mandatory duties; voluntary codes.
//   - GPAI provider: Art. 53; +Art. 55 systemic-risk.
//
// Every steer is honest and caveated: this is guidance to help you orient, not a
// legal determination.

export type AnswerValue = string;

export type Option = {
  value: AnswerValue;
  label: string;
  // optional one-line helper under the option label
  hint?: string;
};

export type QuestionId = 'role' | 'tier' | 'gpai' | 'fria';

export type Question = {
  id: QuestionId;
  heading: string;
  subtext?: string;
  options: Option[];
  optional?: boolean;
};

export type Answers = Partial<Record<QuestionId, AnswerValue>>;

// Operative date for high-risk / transparency duties, with the honest omnibus note.
export const HIGH_RISK_DATE = '2 August 2026';
export const OMNIBUS_CAVEAT =
  'A proposed Digital Omnibus on AI would postpone stand-alone Annex III high-risk obligations to 2 December 2027, but it is not yet law as of June 2026 - so plan to 2 August 2026.';

// ---------------------------------------------------------------------------
// The questions.
// ---------------------------------------------------------------------------

export const QUESTIONS: Record<QuestionId, Question> = {
  role: {
    id: 'role',
    heading: 'What is your role in relation to the AI system?',
    subtext:
      'The Act assigns duties by role (Article 3). The provider, who builds and brands the AI, carries the heaviest load. A deployer uses it under its own authority. Importers and distributors move it along the chain.',
    options: [
      {
        value: 'provider',
        label: 'Provider - we develop the AI and put it out under our own name or brand',
        hint: 'You build the system or model (or have it built) and place it on the market or into service under your name or trademark.'
      },
      {
        value: 'deployer',
        label: 'Deployer - we use the AI under our own authority',
        hint: "You use an AI system in a professional capacity, for example running a vendor's tool internally."
      },
      {
        value: 'importer',
        label: "Importer - we bring a non-EU provider's AI into the EU market",
        hint: "You are in the EU and place an AI system bearing a non-EU entity's name on the market."
      },
      {
        value: 'distributor',
        label: 'Distributor - we make an AI system available along the chain',
        hint: 'You are in the supply chain (other than provider or importer) and make a system available on the EU market.'
      }
    ]
  },

  tier: {
    id: 'tier',
    heading: "Which best describes your AI system's risk tier?",
    subtext:
      'Obligations scale with the tier. If you are not sure, run the risk classifier first - it walks you through the tiers. You can pick "not sure" here and we will steer you to the safer, fuller assumption.',
    options: [
      {
        value: 'prohibited',
        label: 'Prohibited - it may be an Article 5 banned practice',
        hint: 'For example social scoring, manipulative techniques causing harm, or untargeted facial-image scraping.'
      },
      {
        value: 'high',
        label: 'High-risk - Annex I safety component or an Annex III use-case',
        hint: 'For example credit scoring, recruitment, biometrics, or a safety component of a regulated product.'
      },
      {
        value: 'limited',
        label: 'Limited / transparency - chatbot, content generation or deepfakes',
        hint: 'It interacts with people, generates or manipulates content, or does emotion recognition / biometric categorisation.'
      },
      {
        value: 'minimal',
        label: 'Minimal - none of the above',
        hint: 'For example a spam filter, a recommendation engine or AI in a video game.'
      },
      {
        value: 'unsure-tier',
        label: 'I am not sure',
        hint: 'We will default to the fuller high-risk assumption and point you to the risk classifier.'
      }
    ]
  },

  gpai: {
    id: 'gpai',
    heading: 'Is a general-purpose AI model involved?',
    subtext:
      'A general-purpose AI (GPAI) model - such as a large language model or foundation model - sits on a separate track (Chapter V), in force since 2 August 2025. This is in addition to anything that applies to a specific AI system.',
    options: [
      {
        value: 'gpai-provider',
        label: 'Yes - we are the provider of a general-purpose AI model',
        hint: 'You train or develop a broadly capable model and offer it for others to build on.'
      },
      {
        value: 'gpai-using',
        label: "We only use or build on someone else's general-purpose model",
        hint: 'You integrate a third-party model; the GPAI provider duties sit with them, but you may be a provider of the downstream system.'
      },
      {
        value: 'gpai-no',
        label: 'No general-purpose model is involved',
        hint: 'You work with specific-purpose AI systems only.'
      }
    ]
  },

  fria: {
    id: 'fria',
    optional: true,
    heading: 'Are you a public body, or is the system used for credit or insurance?',
    subtext:
      'This flags whether you must carry out a Fundamental Rights Impact Assessment (FRIA) before deploying a high-risk system (Article 27). It applies to public bodies and public-service providers, and to systems used for credit scoring or for life and health insurance risk assessment and pricing.',
    options: [
      {
        value: 'fria-public',
        label: 'We are a public body or provide public services',
        hint: 'For example a government agency, school, hospital or other public-service provider.'
      },
      {
        value: 'fria-credit-insurance',
        label: 'The system is used for credit scoring or insurance pricing',
        hint: 'Creditworthiness assessment, or life and health insurance risk assessment and pricing.'
      },
      {
        value: 'fria-neither',
        label: 'Neither of these',
        hint: 'You are a private deployer outside credit and insurance.'
      },
      {
        value: 'fria-unsure',
        label: 'I am not sure',
        hint: 'We will flag the FRIA duty so you can check whether it applies.'
      }
    ]
  }
};

// Order of the full flow. Branching is computed in nextStep().
export const FLOW_ORDER: QuestionId[] = ['role', 'tier', 'gpai', 'fria'];

export function nextStep(current: QuestionId, answers: Answers): QuestionId | null {
  switch (current) {
    case 'role':
      return 'tier';

    case 'tier':
      // Prohibited ends the flow: there is nothing to "comply" with - it is banned.
      if (answers.tier === 'prohibited') return null;
      return 'gpai';

    case 'gpai': {
      // The FRIA question only matters for a high-risk (or unsure) deployer.
      const isHigh = answers.tier === 'high' || answers.tier === 'unsure-tier';
      const isDeployer = answers.role === 'deployer';
      if (isHigh && isDeployer) return 'fria';
      return null;
    }

    case 'fria':
      return null;

    default:
      return null;
  }
}

// The steps the user will actually see, given their answers.
export function plannedSteps(answers: Answers): QuestionId[] {
  const steps: QuestionId[] = ['role'];
  let cur: QuestionId = 'role';
  for (;;) {
    const nxt = nextStep(cur, answers);
    if (nxt === null) break;
    steps.push(nxt);
    cur = nxt;
    if (steps.length > FLOW_ORDER.length) break; // safety
  }
  return steps;
}

// ---------------------------------------------------------------------------
// Result computation.
// ---------------------------------------------------------------------------

export type Segment =
  | 'prohibited'
  | 'high-provider'
  | 'high-deployer'
  | 'high-importer-distributor'
  | 'limited'
  | 'minimal'
  | 'gpai-provider'
  | 'unsure';

export type Result = {
  segment: Segment;
  // The plain-English verdict shown in the result box.
  verdict: string;
  // Short label used for the result heading + email payload.
  headline: string;
  // When the duties begin to apply (with the omnibus caveat where relevant).
  appliesFrom: string;
  // Tailored checklist of next steps (each typically carries an article reference).
  nextSteps: string[];
  // A branch-specific caveat (rendered as a warn callout).
  caveat?: string;
  // A compact summary string sent to /api/lead as `result`.
  summary: string;
};

const CLOSING: string[] = [
  'Use our free AI Act Checklist to work through this in order, and keep an eye on the rules - the Digital Omnibus on AI was still in provisional agreement as of May 2026.',
  'This is a starting point. Confirm your exact duties against the official sources we link, or with a qualified adviser.'
];

// A GPAI add-on appended where a GPAI model provider is involved.
function gpaiProviderSteps(): string[] {
  return [
    'As a GPAI model provider, on the separate Chapter V track you must keep technical documentation of the model, give downstream providers the information they need to integrate it, put in place a policy to comply with EU copyright law (including text-and-data-mining opt-outs), and publish a summary of the content used for training (Article 53).',
    'If your model crosses the systemic-risk threshold (training compute above 10^25 FLOP), Article 55 adds model evaluation and adversarial testing (red-teaming), systemic-risk assessment and mitigation, serious-incident reporting to the AI Office, and adequate cybersecurity. Open-source models are not exempt from the systemic-risk duties.',
    'The GPAI Code of Practice is the main voluntary tool for demonstrating compliance with Articles 53 and 55 pending harmonised standards.'
  ];
}

export function computeResult(answers: Answers): Result {
  const { role, tier, gpai, fria } = answers;

  const isGpaiProvider = gpai === 'gpai-provider';
  const unsureTier = tier === 'unsure-tier';
  const treatHigh = tier === 'high' || unsureTier;

  // -------------------------------------------------------------------------
  // 1. Prohibited -> there is no compliance path; it is banned.
  // -------------------------------------------------------------------------
  if (tier === 'prohibited') {
    return {
      segment: 'prohibited',
      headline: 'A prohibited practice cannot be made compliant',
      verdict:
        "If your system is an Article 5 prohibited practice, there is no set of obligations that makes it lawful in the EU - the practice is banned outright, and breaches carry the Act's steepest penalties (up to €35 million or 7% of worldwide annual turnover).",
      appliesFrom:
        'Already in force: the Article 5 prohibitions have applied since 2 February 2025.',
      nextSteps: [
        'Confirm exactly which Article 5 practice your system might match - the bans are narrowly drawn and a few have carve-outs (for example real-time remote biometric ID by law enforcement has narrow, authorised exceptions).',
        'If it genuinely is prohibited, redesign so the banned element is removed, or do not place or use it in the EU.',
        'Get qualified legal advice before going further - this is the highest-stakes part of the Act.',
        ...CLOSING
      ],
      caveat:
        'A proposed Digital Omnibus would add a ninth prohibition (AI generating non-consensual intimate imagery / AI-CSAM), but that is not yet law as of June 2026.',
      summary:
        'PROHIBITED practice (Article 5): no compliance path; banned since 2 Feb 2025; fines up to €35m / 7% turnover. Advised to confirm the practice and seek legal advice.'
    };
  }

  // -------------------------------------------------------------------------
  // 2. High-risk PROVIDER -> the fullest obligation set.
  // -------------------------------------------------------------------------
  if (treatHigh && role === 'provider') {
    const friaNote =
      fria === 'fria-public' || fria === 'fria-credit-insurance'
        ? 'You also flagged a public-body / credit / insurance context. While the Fundamental Rights Impact Assessment (Article 27) is a deployer duty, as a provider you should make sure your instructions for use help deployers meet it.'
        : undefined;
    return {
      segment: 'high-provider',
      headline: 'High-risk provider - the fullest set of duties',
      verdict: `As the provider of a high-risk AI system${
        unsureTier ? ' (we defaulted to high-risk because you were not sure)' : ''
      }, you carry the heaviest obligations in the Act short of an outright ban. These run across the system's whole lifecycle, from design to post-market monitoring.`,
      appliesFrom: `High-risk obligations apply from ${HIGH_RISK_DATE}. ${OMNIBUS_CAVEAT}`,
      nextSteps: [
        'Establish a continuous, lifecycle risk management system (Article 9) and a quality management system (Article 17).',
        'Meet the data and data governance requirements for relevant, representative and appropriately error-free training, validation and test data (Article 10).',
        'Draw up technical documentation per Annex IV (Article 11) and ensure automatic logging / record-keeping (Article 12).',
        'Provide transparency and clear instructions for use to deployers (Article 13), design the system for effective human oversight (Article 14), and meet accuracy, robustness and cybersecurity requirements (Article 15).',
        'Run the conformity assessment before market placement (Article 43), draw up the EU declaration of conformity and affix CE marking (Articles 47-48), and register the system in the EU database (Article 49).',
        'Put post-market monitoring in place and report serious incidents (Articles 72-73). If you are established outside the EU, appoint an EU authorised representative (Article 22).',
        ...(friaNote ? [friaNote] : []),
        ...(isGpaiProvider ? gpaiProviderSteps() : []),
        ...CLOSING
      ],
      caveat: unsureTier
        ? 'You were not sure of your tier, so we assumed high-risk - the safer default. Run the risk classifier to confirm; the Article 6(3) filter can take a narrow-task Annex III system out of high-risk, but never if it profiles people.'
        : 'Check the Article 6(3) filter honestly: a narrow procedural or preparatory Annex III task may not be high-risk - unless it profiles natural persons, in which case it stays high-risk.',
      summary: `HIGH-RISK PROVIDER${unsureTier ? ' (defaulted; tier unsure)' : ''}. Duties: risk mgmt (Art.9), data governance (Art.10), tech docs (Art.11), logging (Art.12), instructions (Art.13), human oversight (Art.14), accuracy/robustness/cybersecurity (Art.15), QMS (Art.17), conformity assessment (Art.43), DoC + CE (Arts.47-48), registration (Art.49), post-market monitoring + incidents (Arts.72-73); non-EU rep (Art.22). From ${HIGH_RISK_DATE} (omnibus postponement to 2 Dec 2027 not yet law).${
        isGpaiProvider ? ' Also GPAI provider track (Art.53/55).' : ''
      }`
    };
  }

  // -------------------------------------------------------------------------
  // 3. High-risk DEPLOYER -> Article 26 duties + FRIA where applicable.
  // -------------------------------------------------------------------------
  if (treatHigh && role === 'deployer') {
    const friaApplies =
      fria === 'fria-public' || fria === 'fria-credit-insurance';
    const friaStep = friaApplies
      ? 'Carry out a Fundamental Rights Impact Assessment before you put the system into use (Article 27) - this applies to you because you are a public body / public-service provider or you use the system for credit scoring or insurance risk assessment and pricing.'
      : fria === 'fria-unsure'
        ? 'Check whether the Fundamental Rights Impact Assessment applies to you (Article 27). It is required for public bodies and public-service providers, and for credit-scoring and insurance risk-assessment / pricing uses.'
        : undefined;
    return {
      segment: 'high-deployer',
      headline: 'High-risk deployer - lighter than a provider, but real',
      verdict: `As a deployer of a high-risk AI system${
        unsureTier ? ' (we defaulted to high-risk because you were not sure)' : ''
      }, your duties are lighter than the provider's but still substantive, centred on using the system properly and protecting the people it affects (Article 26).`,
      appliesFrom: `High-risk obligations apply from ${HIGH_RISK_DATE}. ${OMNIBUS_CAVEAT}`,
      nextSteps: [
        "Use the system strictly in accordance with the provider's instructions for use (Article 26).",
        'Assign human oversight to competent, trained and authorised people, and make sure input data you control is relevant and sufficiently representative.',
        'Monitor operation; suspend use and inform the provider or authority if a risk arises.',
        'Keep the logs the system generates for at least 6 months (unless other law requires longer).',
        'Inform affected workers and their representatives before deploying at the workplace, and inform natural persons who are subject to high-risk decisions.',
        ...(friaStep ? [friaStep] : []),
        ...(isGpaiProvider ? gpaiProviderSteps() : []),
        ...CLOSING
      ],
      caveat: unsureTier
        ? 'You were not sure of your tier, so we assumed high-risk - the safer default. Run the risk classifier to confirm; the Article 6(3) filter can take a narrow-task Annex III system out of high-risk, but never if it profiles people.'
        : 'Note that putting your own name on a high-risk system, or substantially modifying it or its intended purpose, can reclassify you as a provider with the full provider duties (Article 25).',
      summary: `HIGH-RISK DEPLOYER${unsureTier ? ' (defaulted; tier unsure)' : ''}. Duties (Art.26): use per instructions, human oversight, representative input data, monitor + suspend, keep logs >=6 months, inform workers + affected persons.${
        friaApplies ? ' FRIA required (Art.27).' : ' FRIA only if public body / credit / insurance (Art.27).'
      } From ${HIGH_RISK_DATE} (omnibus postponement to 2 Dec 2027 not yet law).${
        isGpaiProvider ? ' Also GPAI provider track (Art.53/55).' : ''
      }`
    };
  }

  // -------------------------------------------------------------------------
  // 4. High-risk IMPORTER / DISTRIBUTOR -> verification + chain duties.
  // -------------------------------------------------------------------------
  if (treatHigh && (role === 'importer' || role === 'distributor')) {
    const isImporter = role === 'importer';
    return {
      segment: 'high-importer-distributor',
      headline: isImporter
        ? 'High-risk importer - verify before you place it'
        : 'High-risk distributor - verify before you pass it on',
      verdict: `As ${
        isImporter ? 'an importer' : 'a distributor'
      } of a high-risk AI system${
        unsureTier ? ' (we defaulted to high-risk because you were not sure)' : ''
      }, your core duty is to check that the provider did its job before you ${
        isImporter ? 'place the system on the EU market' : 'make the system available'
      }, and to act if something is wrong.`,
      appliesFrom: `High-risk obligations apply from ${HIGH_RISK_DATE}. ${OMNIBUS_CAVEAT}`,
      nextSteps: [
        isImporter
          ? 'Before placing the system on the market, verify the provider carried out the conformity assessment, drew up the technical documentation, affixed CE marking, and prepared the EU declaration of conformity and instructions for use. Keep these available for authorities.'
          : 'Before making the system available, verify it bears CE marking and is accompanied by the EU declaration of conformity and instructions for use, and that the provider and importer met their obligations.',
        'Do not place or make available a system you know, or should know, does not conform; if you have already done so, take corrective action and inform the provider and authorities.',
        'Cooperate with competent authorities and keep the documentation needed to demonstrate conformity.',
        'Remember that putting your own name on a high-risk system, or substantially modifying it, makes you a provider with the full provider duties (Article 25).',
        ...(isGpaiProvider ? gpaiProviderSteps() : []),
        ...CLOSING
      ],
      caveat: unsureTier
        ? 'You were not sure of your tier, so we assumed high-risk - the safer default. Run the risk classifier to confirm.'
        : undefined,
      summary: `HIGH-RISK ${
        isImporter ? 'IMPORTER' : 'DISTRIBUTOR'
      }${unsureTier ? ' (defaulted; tier unsure)' : ''}: verify provider's conformity assessment, CE marking, DoC and instructions before ${
        isImporter ? 'placing on market' : 'making available'
      }; act on non-conformity; cooperate with authorities; Art.25 reclassification risk. From ${HIGH_RISK_DATE}.${
        isGpaiProvider ? ' Also GPAI provider track (Art.53/55).' : ''
      }`
    };
  }

  // -------------------------------------------------------------------------
  // 5. Limited / transparency tier (any role) -> Article 50.
  // -------------------------------------------------------------------------
  if (tier === 'limited') {
    return {
      segment: 'limited',
      headline: 'Limited / transparency duties (Article 50)',
      verdict:
        'Your system is in the limited / transparency tier. The obligation here is mainly to be open: tell people when they are dealing with AI, and label AI-generated or manipulated content. The duty falls mostly on providers, with deepfake disclosure on deployers.',
      appliesFrom: `Article 50 transparency duties apply from ${HIGH_RISK_DATE}. A proposed Digital Omnibus would shorten the provider grace period for labelling AI-generated content (new effective date around 2 December 2026), but that is not yet law as of June 2026.`,
      nextSteps: [
        'For chatbots / conversational AI, ensure users are told they are interacting with an AI system, unless that is already obvious (Article 50).',
        'For AI-generated or manipulated content (text, image, audio, video), mark the output as artificially generated in a machine-readable format (Article 50) - this is a provider duty.',
        'For deepfakes, disclose that the content is artificially generated or manipulated (with limited carve-outs for clearly artistic or satirical work) - this is a deployer duty.',
        'For emotion recognition or biometric categorisation, inform the people exposed to it.',
        ...(isGpaiProvider ? gpaiProviderSteps() : []),
        ...CLOSING
      ],
      caveat:
        'Transparency duties sit on top of, not instead of, anything else. If the same system is also used in an Annex III area, the heavier high-risk obligations apply as well.',
      summary: `LIMITED / TRANSPARENCY tier (Art.50). Role: ${
        role ?? 'unspecified'
      }. Disclose AI interaction, machine-readably label AI-generated content (provider), disclose deepfakes (deployer), inform on emotion recognition / biometric categorisation. From ${HIGH_RISK_DATE}.${
        isGpaiProvider ? ' Also GPAI provider track (Art.53/55).' : ''
      }`
    };
  }

  // -------------------------------------------------------------------------
  // 6. Minimal tier -> no mandatory duties (but AI literacy + any GPAI track).
  // -------------------------------------------------------------------------
  if (tier === 'minimal') {
    return {
      segment: isGpaiProvider ? 'gpai-provider' : 'minimal',
      headline: isGpaiProvider
        ? 'No system-tier duties, but the GPAI track applies'
        : 'Minimal risk - no mandatory obligations',
      verdict: isGpaiProvider
        ? 'Your specific AI system is minimal-risk with no mandatory obligations, but because you provide a general-purpose AI model, the separate Chapter V track still applies to that model.'
        : 'Your system is in the minimal-risk tier. The Act places no mandatory obligations on it. You may adopt voluntary codes of conduct to signal trustworthiness.',
      appliesFrom: isGpaiProvider
        ? 'No system-tier duties. GPAI model rules (Chapter V) have applied since 2 August 2025; pre-existing models must comply by 2 August 2027.'
        : 'No mandatory obligations for minimal-risk systems. The cross-cutting AI literacy duty (Article 4) has applied since 2 February 2025.',
      nextSteps: [
        'No mandatory AI Act obligations apply to a minimal-risk system. Voluntary codes of conduct are encouraged.',
        'Do not forget the AI literacy duty (Article 4), which applies to all AI regardless of tier and has been in force since 2 February 2025: ensure staff who operate the AI have a sufficient level of AI literacy.',
        'Re-check the tier if the system changes - adding a chatbot, content generation, or an Annex III use can move it up into transparency or high-risk territory. The risk classifier can help.',
        ...(isGpaiProvider ? gpaiProviderSteps() : []),
        ...CLOSING
      ],
      caveat:
        'Tiers depend on how the system is used, not just what it is. A change in features or use-case can push a minimal-risk system into a higher tier with real duties.',
      summary: `${
        isGpaiProvider ? 'MINIMAL system + GPAI PROVIDER track' : 'MINIMAL-RISK'
      }: no mandatory system-tier duties; AI literacy (Art.4) still applies; voluntary codes encouraged. Role: ${
        role ?? 'unspecified'
      }.${isGpaiProvider ? ' GPAI: Art.53 (+Art.55 if >10^25 FLOP).' : ''}`
    };
  }

  // -------------------------------------------------------------------------
  // 7. GPAI provider with an unsure / non-high tier that fell through -> GPAI focus.
  //    (Reached when tier is unsure but role is importer/distributor, etc. - rare;
  //    treated as a GPAI-led result if a GPAI provider, else the unsure default.)
  // -------------------------------------------------------------------------
  if (isGpaiProvider) {
    return {
      segment: 'gpai-provider',
      headline: 'General-purpose AI model provider',
      verdict:
        'As the provider of a general-purpose AI model, the separate Chapter V track applies to you regardless of any specific downstream system, with extra duties if your model poses systemic risk.',
      appliesFrom:
        'GPAI model rules (Chapter V) have applied since 2 August 2025. Models placed on the market before that date must be brought into compliance by 2 August 2027.',
      nextSteps: [...gpaiProviderSteps(), ...CLOSING],
      caveat:
        'If you also place a specific AI system on the market (for example a high-risk or transparency-tier application built on your model), the duties for that tier apply on top. Run the risk classifier for the system itself.',
      summary:
        'GPAI MODEL PROVIDER (Chapter V): tech docs, downstream info, copyright policy, training-data summary (Art.53); +model eval/red-teaming, systemic-risk mitigation, incident reporting, cybersecurity (Art.55) if >10^25 FLOP. From 2 Aug 2025.'
    };
  }

  // -------------------------------------------------------------------------
  // 8. Genuinely unsure -> point to the risk classifier, default to caution.
  // -------------------------------------------------------------------------
  return {
    segment: 'unsure',
    headline: 'Start with your risk tier',
    verdict:
      'We could not pin down your obligations because the risk tier was unclear. Your duties under the AI Act depend first on which tier your system is in, then on your role. The fastest way forward is to settle the tier.',
    appliesFrom: `Most high-risk and transparency duties apply from ${HIGH_RISK_DATE}. ${OMNIBUS_CAVEAT}`,
    nextSteps: [
      'Run the risk classifier to settle your tier (prohibited, high-risk, limited/transparency or minimal). That single answer shapes most of your duties.',
      'Then come back and pick your tier here to see the duty-by-duty list for your role.',
      'In the meantime, remember the AI literacy duty (Article 4) applies to all AI and has been in force since 2 February 2025.',
      ...CLOSING
    ],
    caveat:
      'This is a cautious default. Settle the tier first, then re-run this checker to get the precise obligations for your role.',
    summary: `Tier unclear - advised to run the risk classifier first. Role: ${
      role ?? 'unspecified'
    }. AI literacy (Art.4) applies regardless.`
  };
}
