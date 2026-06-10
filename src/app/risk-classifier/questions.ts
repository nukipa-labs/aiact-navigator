// Pure logic + content for the "What is my AI Act risk tier?" decision tool.
// No React here. The client component consumes these shapes.
// Every regulatory steer is honest and caveated: this is guidance to orient you,
// not a legal determination.

export type AnswerValue = string;

export type Option = {
  value: AnswerValue;
  label: string;
  // optional one-line helper under the option label
  hint?: string;
};

export type Question = {
  id: QuestionId;
  // short mono step caption is derived from position; this is the heading
  heading: string;
  // plain-English subtext under the heading
  subtext?: string;
  options: Option[];
  optional?: boolean;
};

export type QuestionId =
  | 'eu-nexus'
  | 'prohibited'
  | 'high-risk'
  | 'transparency'
  | 'role'
  | 'gpai';

export type Answers = Partial<Record<QuestionId, AnswerValue>>;

// ---------------------------------------------------------------------------
// The questions. Branching is computed in nextStep() below, not hard-wired in
// each option, so the flow stays honest and easy to reason about.
// ---------------------------------------------------------------------------

export const QUESTIONS: Record<QuestionId, Question> = {
  'eu-nexus': {
    id: 'eu-nexus',
    heading: 'Where does your AI system sit relative to the EU?',
    subtext:
      'The AI Act reaches well beyond EU borders. It applies if you place an AI system on the EU market, if you use one within the EU, or even if you and your AI are outside the EU but the output it produces is used in the Union (Article 2).',
    options: [
      {
        value: 'in-eu',
        label: 'We are established in the EU, or we use the AI within the EU',
        hint: 'An organisation registered in an EU Member State, or a deployer operating from inside the Union.'
      },
      {
        value: 'place-on-eu',
        label: 'We are outside the EU but place the AI on the EU market',
        hint: 'You sell, license or otherwise make your AI system or model available to EU customers.'
      },
      {
        value: 'output-in-eu',
        label: "We are outside the EU but the AI's output is used in the EU",
        hint: 'Your AI runs abroad, but its predictions, content or decisions reach people or businesses in the Union.'
      },
      {
        value: 'none',
        label: 'None of these - no EU connection at all',
        hint: 'Nothing you build or operate reaches the EU market or EU users.'
      }
    ]
  },

  prohibited: {
    id: 'prohibited',
    heading: 'Does your system do any of these things?',
    subtext:
      'Article 5 bans a short list of "unacceptable risk" practices outright. These have been prohibited since 2 February 2025. Read each carefully - even one match changes everything.',
    options: [
      {
        value: 'yes',
        label: 'Yes, at least one of these applies',
        hint: 'Manipulative or subliminal techniques that cause harm; exploiting vulnerabilities (age, disability, socio-economic situation); social scoring; predicting criminality from profiling alone; untargeted scraping of facial images; emotion recognition at work or school; biometric categorisation by sensitive traits (race, beliefs, sex life); or real-time remote biometric identification in public for law enforcement.'
      },
      {
        value: 'no',
        label: 'No, none of these apply',
        hint: 'You are confident your system does none of the eight banned practices above.'
      },
      {
        value: 'unsure',
        label: 'I am not sure',
        hint: 'We will treat this as a flag to check Article 5 carefully - the penalties here are the highest in the Act.'
      }
    ]
  },

  'high-risk': {
    id: 'high-risk',
    heading: 'Is your system high-risk in either of these ways?',
    subtext:
      "There are two routes into the high-risk tier. Either route puts you in the Act's strictest category short of an outright ban.",
    options: [
      {
        value: 'yes',
        label: 'Yes - it is a safety component of a regulated product, or used in an Annex III area',
        hint: 'Route 1 (Annex I): a safety component of a product like machinery, medical devices, toys or vehicles. Route 2 (Annex III): biometrics; critical infrastructure; education; employment and worker management; access to essential services (incl. credit scoring and life/health insurance pricing); law enforcement; migration and border control; or justice and democratic processes.'
      },
      {
        value: 'no',
        label: 'No - it does none of those things',
        hint: 'It is not a safety component of a regulated product and is not used in any of the eight Annex III areas.'
      },
      {
        value: 'unsure',
        label: 'I am not sure',
        hint: 'We will steer you toward the high-risk path and flag the narrow-task exception to check.'
      }
    ]
  },

  transparency: {
    id: 'transparency',
    heading: 'Does your system do any of these?',
    subtext:
      'Article 50 adds transparency duties for systems that interact with people or generate content, even when they are not high-risk.',
    options: [
      {
        value: 'yes',
        label: 'Yes - it interacts with people or generates/manipulates content',
        hint: 'A chatbot or conversational AI; generates or manipulates text, image, audio or video (including deepfakes); or performs emotion recognition or biometric categorisation.'
      },
      {
        value: 'no',
        label: 'No - none of those',
        hint: 'It does not talk to people, generate synthetic content, or recognise emotion / categorise people biometrically.'
      }
    ]
  },

  role: {
    id: 'role',
    heading: 'What is your role in relation to this AI system?',
    subtext:
      'The Act assigns different duties depending on whether you build the AI or use it. This tailors the next steps we show you (Article 3 definitions).',
    options: [
      {
        value: 'provider',
        label: 'Provider - we develop the AI and put it out under our own name or brand',
        hint: 'You build the system or model (or have it built) and place it on the market or into service under your name or trademark.'
      },
      {
        value: 'deployer',
        label: 'Deployer - we use the AI under our own authority',
        hint: "You use an AI system in a professional capacity, for example a company running a vendor's tool internally."
      },
      {
        value: 'importer-distributor',
        label: 'Importer or distributor - we bring it in or pass it along the chain',
        hint: 'An EU importer placing a non-EU system on the market, or a distributor making one available.'
      },
      {
        value: 'unsure-role',
        label: 'I am not sure which we are',
        hint: 'We will give you a steer either way. Note that putting your name on a high-risk system, or substantially modifying it, can make you a provider (Article 25).'
      }
    ]
  },

  gpai: {
    id: 'gpai',
    optional: true,
    heading: 'Is your model a general-purpose AI model?',
    subtext:
      'A general-purpose AI (GPAI) model shows broad capability and can be plugged into many downstream applications - a large language model or foundation model, for example. GPAI sits on a separate regulatory track (Chapter V), in force since 2 August 2025.',
    options: [
      {
        value: 'gpai-yes',
        label: 'Yes, we provide a general-purpose AI model',
        hint: 'For example an LLM or foundation model you train and offer to others to build on.'
      },
      {
        value: 'gpai-no',
        label: 'No, it is a specific-purpose AI system',
        hint: 'It is built for a defined task, not a broadly capable model offered for downstream use.'
      },
      {
        value: 'gpai-unsure',
        label: 'I am not sure',
        hint: 'We will note the GPAI track so you can check it.'
      }
    ]
  }
};

// Order of the *potential* full flow. Actual visible steps depend on branching.
export const FLOW_ORDER: QuestionId[] = [
  'eu-nexus',
  'prohibited',
  'high-risk',
  'transparency',
  'role',
  'gpai'
];

// ---------------------------------------------------------------------------
// Branching. Given the answers so far and the current question, return the next
// question id, or null when we have enough to show a result.
// ---------------------------------------------------------------------------

export function nextStep(current: QuestionId, answers: Answers): QuestionId | null {
  switch (current) {
    case 'eu-nexus':
      // No EU connection -> likely out of scope, but verify the output trigger. Stop.
      if (answers['eu-nexus'] === 'none') return null;
      return 'prohibited';

    case 'prohibited':
      // A prohibited practice ends the flow immediately: it is banned, full stop.
      if (answers.prohibited === 'yes') return null;
      return 'high-risk';

    case 'high-risk':
      // High-risk (or unsure, treated as high-risk) -> skip the transparency
      // question (it is the higher tier) and go straight to role tailoring.
      if (answers['high-risk'] === 'yes' || answers['high-risk'] === 'unsure') {
        return 'role';
      }
      return 'transparency';

    case 'transparency':
      return 'role';

    case 'role':
      return 'gpai';

    case 'gpai':
      return null;

    default:
      return null;
  }
}

// The total number of steps the user will actually see, given their answers.
// Used for the "Step X of N" caption and the progress route line.
export function plannedSteps(answers: Answers): QuestionId[] {
  const steps: QuestionId[] = ['eu-nexus'];
  let cur: QuestionId = 'eu-nexus';
  // Walk the branch using committed answers; for not-yet-answered steps assume
  // the longest honest path so the dot count is stable once a branch is set.
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

export type Tier =
  | 'prohibited'
  | 'high'
  | 'limited'
  | 'minimal'
  | 'out'
  | 'gpai-note';

export type Result = {
  tier: Tier;
  // Short label used for the email payload + result heading.
  headline: string;
  // The plain-English verdict shown in the result box.
  verdict: string;
  // Tailored checklist of next steps.
  nextSteps: string[];
  // When the rules begin to apply for this tier.
  appliesFrom?: string;
  // A one-line caveat specific to this branch (rendered as a warn callout).
  caveat?: string;
  // A compact summary string sent to /api/lead as `result`.
  summary: string;
};

// Reused date lines. The high-risk / transparency operative date is 2 Aug 2026,
// with the not-yet-law omnibus postponement noted honestly.
const HIGH_RISK_FROM =
  'High-risk obligations apply from 2 August 2026. A proposed "Digital Omnibus on AI" would postpone stand-alone Annex III high-risk systems to 2 December 2027, but that is not yet law as of June 2026, so plan to 2 August 2026.';
const TRANSPARENCY_FROM =
  'Article 50 transparency duties apply from 2 August 2026. A proposed Digital Omnibus would shorten the provider grace period for labelling AI-generated content (new effective date around 2 December 2026), but that is not yet law as of June 2026.';
const PROHIBITED_FROM =
  'Already in force: the Article 5 prohibitions have applied since 2 February 2025, alongside the AI literacy duty.';
const GPAI_FROM =
  'GPAI model rules (Chapter V) have applied since 2 August 2025. Models placed on the market before that date must be brought into compliance by 2 August 2027.';

// A short role-tailored closing step, shared across in-scope tiers.
function roleClosing(role: AnswerValue | undefined): string {
  switch (role) {
    case 'provider':
      return 'As a likely provider (you put the AI out under your own name), the heaviest obligations fall on you. Use our obligations checker to see your full duty list by article.';
    case 'deployer':
      return "As a likely deployer (you use the AI under your authority), your duties are lighter than a provider's but real - especially human oversight and informing affected people. See the obligations checker for your list.";
    case 'importer-distributor':
      return 'As an importer or distributor, you must check that the provider did its job before you place or pass on the system. Note: putting your own name on a high-risk system, or modifying it substantially, can make you a provider (Article 25).';
    default:
      return 'Your exact duties depend on whether you are the provider or the deployer. Run the obligations checker to pin that down.';
  }
}

// A GPAI note appended where the user flagged a general-purpose model.
function gpaiNote(gpai: AnswerValue | undefined): string | undefined {
  if (gpai === 'gpai-yes' || gpai === 'gpai-unsure') {
    return 'You flagged a general-purpose AI model. On top of anything above, the separate GPAI track applies: technical documentation, downstream information, a copyright policy and a training-data summary (Article 53), plus systemic-risk duties (Article 55) if training compute exceeds 10^25 FLOP. The GPAI Code of Practice is the main tool for showing compliance.';
  }
  return undefined;
}

export function computeResult(answers: Answers): Result {
  const nexus = answers['eu-nexus'];
  const prohibited = answers.prohibited;
  const highRisk = answers['high-risk'];
  const transparency = answers.transparency;
  const role = answers.role;
  const gpai = answers.gpai;

  const closing: string[] = [
    'This tool is a starting point. Confirm your exact tier and duties against the official sources we link, or with a qualified adviser.'
  ];

  // 1. No EU connection -> likely out of scope, but verify the output trigger.
  if (nexus === 'none') {
    return {
      tier: 'out',
      headline: 'The AI Act likely does not apply to you',
      verdict:
        'Based on your answers, the EU AI Act likely does not apply, because your AI is neither placed on the EU market, used within the EU, nor produces output used in the Union.',
      nextSteps: [
        "Re-check the \"output used in the Union\" trigger before you rule it out. The Act reaches non-EU providers and deployers whenever their AI's output is used in the EU (Article 2) - a reach comparable to GDPR. A foreign SaaS tool whose results reach EU users can be in scope.",
        'If an EU customer or partner asks you about AI Act compliance anyway, ask which of their uses brings your output into the Union, then run this check again.',
        'Subscribe to keep an eye on the rules - scope and timelines are still moving (the Digital Omnibus on AI was in provisional agreement as of May 2026).',
        ...closing
      ],
      caveat:
        'Scope can hinge on a single data flow. If any output of your AI ends up being used by people or businesses in the EU, you may be in scope as a provider or deployer. When in doubt, treat yourself as in scope and verify.',
      summary:
        'Likely out of scope: no EU market placement, EU use, or EU-used output. Advised to re-check the Article 2 "output used in the Union" extraterritorial trigger.'
    };
  }

  const nexusReminder =
    nexus === 'output-in-eu' || nexus === 'place-on-eu'
      ? ' Note: you are in scope even without an EU establishment - because you place the AI on the EU market or its output is used in the Union (Article 2). A non-EU provider of a high-risk system must appoint an EU authorised representative (Article 22).'
      : '';

  // 2. Prohibited practice -> banned outright.
  if (prohibited === 'yes') {
    return {
      tier: 'prohibited',
      headline: 'This looks like a prohibited practice',
      verdict:
        "Based on your answer, your system may fall under the Article 5 prohibited practices - the \"unacceptable risk\" tier. These uses are banned outright in the EU, and breaches carry the Act's steepest penalties: up to €35 million or 7% of worldwide annual turnover.",
      nextSteps: [
        'Stop and confirm exactly which Article 5 practice your system might match. The bans are narrowly drawn and some have carve-outs (for example real-time remote biometric ID by law enforcement has narrow, authorised exceptions).',
        'If it genuinely is a prohibited practice, you cannot place it on the EU market or use it in the Union - redesign so the prohibited element is removed, or do not offer it in the EU.',
        'Get qualified legal advice before going further. This is the highest-stakes corner of the Act.',
        ...closing
      ],
      appliesFrom: PROHIBITED_FROM,
      caveat:
        'A proposed Digital Omnibus would add a 9th prohibition (AI generating non-consensual intimate imagery / AI-CSAM), but that is not yet law as of June 2026. The eight existing prohibitions are already enforceable.',
      summary:
        'Possible PROHIBITED practice (Article 5, "unacceptable risk"). Banned since 2 Feb 2025; fines up to €35m / 7% turnover. Advised to confirm the exact practice and seek legal advice.'
    };
  }

  // 3. High-risk (or unsure, treated as the safer high-risk default).
  if (highRisk === 'yes' || highRisk === 'unsure') {
    const wasUnsure = highRisk === 'unsure';
    return {
      tier: 'high',
      headline: wasUnsure
        ? 'Treat this as high-risk until you confirm otherwise'
        : 'This looks like a high-risk AI system',
      verdict: `Based on your answers, your system likely falls in the high-risk tier${
        wasUnsure ? ' (we defaulted here because you were not sure - the safer assumption)' : ''
      }. That is the Act's strictest tier short of an outright ban, and it carries the fullest set of obligations.${nexusReminder}`,
      nextSteps: [
        'Confirm which route applies: a safety component of an Annex I product, or use in one of the eight Annex III areas. The route shapes how you assess conformity.',
        'Check the Article 6(3) filter exception honestly. An Annex III system may NOT be high-risk if it only performs a narrow procedural or preparatory task, improves a prior human activity, or detects decision patterns without replacing human judgement. But if it profiles natural persons, it stays high-risk - no exception.',
        roleClosing(role),
        ...(gpaiNote(gpai) ? [gpaiNote(gpai) as string] : []),
        'Use our high-risk lookup to confirm the Annex III area, and the obligations checker for your duty-by-duty list.',
        ...closing
      ],
      appliesFrom: HIGH_RISK_FROM,
      caveat:
        'High-risk classification turns on detail. Work through the Annex III areas and the Article 6(3) filter before you conclude either way - and remember profiling always keeps a system high-risk.',
      summary: `Likely HIGH-RISK tier${wasUnsure ? ' (defaulted; user unsure)' : ''}. Role: ${
        role ?? 'unspecified'
      }. Operative date 2 Aug 2026 (proposed omnibus postponement to 2 Dec 2027, not yet law). Check Art. 6(3) filter; profiling keeps it high-risk.${
        gpai === 'gpai-yes' ? ' Also flagged GPAI (Art. 53/55 track).' : ''
      }`
    };
  }

  // 4. Limited / transparency risk.
  if (transparency === 'yes') {
    return {
      tier: 'limited',
      headline: 'This looks like limited / transparency risk',
      verdict: `Based on your answers, your system is not prohibited or high-risk, but it does interact with people or generate content - so the Article 50 transparency duties apply. The obligation here is mainly to be open: tell people they are dealing with AI, and label AI-generated or manipulated content.${nexusReminder}`,
      nextSteps: [
        'If it is a chatbot or conversational AI, make sure users are told they are interacting with an AI system (unless that is already obvious).',
        'If it generates or manipulates content (text, image, audio, video, including deepfakes), mark the output as artificially generated in a machine-readable way, and disclose deepfakes to viewers (with limited carve-outs for clearly artistic or satirical work).',
        'If it does emotion recognition or biometric categorisation, inform the people exposed to it.',
        roleClosing(role),
        ...(gpaiNote(gpai) ? [gpaiNote(gpai) as string] : []),
        'See the obligations checker for the exact Article 50 wording that fits your case.',
        ...closing
      ],
      appliesFrom: TRANSPARENCY_FROM,
      caveat:
        'Transparency duties sit on top of, not instead of, any other rules. If the same system is also used in an Annex III area, the heavier high-risk obligations apply as well.',
      summary: `Likely LIMITED / TRANSPARENCY tier (Article 50). Role: ${
        role ?? 'unspecified'
      }. Disclosure / labelling duties from 2 Aug 2026 (proposed omnibus changes not yet law).${
        gpai === 'gpai-yes' ? ' Also flagged GPAI (Art. 53/55 track).' : ''
      }`
    };
  }

  // 5. Minimal / no risk.
  return {
    tier: 'minimal',
    headline: 'This looks like minimal risk',
    verdict: `Based on your answers, your system falls in the minimal-risk tier: not prohibited, not high-risk, and without the interaction or content-generation features that trigger transparency duties. The Act places no mandatory obligations on minimal-risk systems.${nexusReminder}`,
    nextSteps: [
      'No mandatory AI Act obligations apply to a minimal-risk system. You may adopt voluntary codes of conduct if you wish to signal trustworthiness.',
      'Do not forget the AI literacy duty (Article 4), which applies to all AI regardless of tier and has been in force since 2 February 2025: ensure staff who operate the AI have a sufficient level of AI literacy.',
      'Re-run this check if the system changes - adding a chatbot, content generation, or an Annex III use can move it into a higher tier.',
      ...(gpaiNote(gpai) ? [gpaiNote(gpai) as string] : []),
      ...closing
    ],
    appliesFrom:
      'No mandatory obligations for minimal-risk systems. The cross-cutting AI literacy duty (Article 4) has applied since 2 February 2025.',
    caveat:
      'Tiers are about how the system is used, not just what it is. A change in features or use-case can push a minimal-risk system up into transparency or high-risk territory.',
    summary: `Likely MINIMAL-RISK tier: no mandatory obligations. Role: ${
      role ?? 'unspecified'
    }. AI literacy duty (Art. 4) still applies. Voluntary codes of conduct encouraged.${
      gpai === 'gpai-yes' ? ' Also flagged GPAI (Art. 53/55 track).' : ''
    }`
  };
}
