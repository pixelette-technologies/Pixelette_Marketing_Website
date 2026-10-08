/**
 * The enquiry the assistant takes in the chat. Pure: no network, no storage.
 *
 * Question strings are passed in by the website (or createEnquiryHelpers), so
 * this package never imports a site content module.
 */

export type EnquiryField =
  | 'objective'
  | 'existing'
  | 'deadline'
  | 'success'
  | 'name'
  | 'email'
  | 'company';

export type EnquiryDraft = Record<EnquiryField, string>;

export const EMPTY_DRAFT: EnquiryDraft = {
  objective: '',
  existing: '',
  deadline: '',
  success: '',
  name: '',
  email: '',
  company: '',
};

/** Limits checked early as a courtesy; websites enforce the same ceilings. */
export const ENQUIRY_MAX: Readonly<Record<EnquiryField, number>> = {
  objective: 4000,
  existing: 4000,
  deadline: 200,
  success: 4000,
  name: 120,
  email: 200,
  company: 160,
};

export type EnquiryStep = { field: EnquiryField; ask: string; optional: boolean };

export type EnquiryQuestions = {
  objective: string;
  existing: string;
  deadline: string;
  success: string;
  /** Defaults to the Technologies wording if omitted. */
  name?: string;
  email?: string;
  company?: string;
};

/* The founder's words, 29 September 2026. */
export const ASK_NAME = 'Before we begin, may I take your name?';
export const askEmail = (name: string) =>
  `Thank you, ${name}. And a work email address, so the team can reply?`;
export const greeting = (name: string) =>
  `That is all I need for now, ${name}. How may I help you today?`;
export const DISCOVERY_OPENING =
  'So that the team can help you properly, may I ask a few short questions. Your answers are sent to them with ' +
  'your name and email when we finish. Please feel free to skip any of them, or to stop at any point.';

const QUESTION_START =
  /^(what|how|why|when|where|who|which|can|could|do|does|did|is|are|was|were|will|would|should|may|have|has|tell me|explain)\b/i;

export function looksLikeQuestion(text: string): boolean {
  const value = text.trim();
  return value.endsWith('?') || QUESTION_START.test(value);
}

/**
 * Character for character the pattern Technologies' contact actions use:
 * linear by construction and no display-name or list forms.
 */
export const EMAIL_PATTERN =
  /^[^\s@"<>()[\],;:\\]+@[^\s@"<>()[\],;:\\.]+(?:\.[^\s@"<>()[\],;:\\.]+)*\.[^\s@"<>()[\],;:\\.]{2,}$/;

export function isEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

const SHORT_ANSWERS = new Set([
  'no',
  'none',
  'nil',
  'n/a',
  'na',
  'not',
  'yes',
  'ok',
  'tbc',
  'tbd',
  'asap',
  'now',
  'new',
  'old',
  'web',
  'app',
  'api',
]);

const KEYBOARD_RUNS =
  /^(?:qwer\w*|wert\w*|asdf\w*|sdfg\w*|zxcv\w*|xcvb\w*|hjkl\w*|jkl\w*|wasd|qaz\w*|wsx\w*|poiu\w*|lkjh\w*)$/i;

export function saysSomething(raw: string): boolean {
  return String(raw ?? '')
    .split(/[\s,;/|]+/)
    .filter(Boolean)
    .some(word => {
      const w = word.replace(/[^\p{L}\p{N}/]/gu, '');
      if (!w) return false;
      if (new Set(w.toLowerCase()).size === 1) return false;
      if (/\p{N}/u.test(w)) return true;
      if (w.length >= 2 && w === w.toUpperCase() && /\p{L}/u.test(w)) return true;
      if (SHORT_ANSWERS.has(w.toLowerCase())) return true;
      return w.length >= 3 && /[aeiouy]/i.test(w) && !KEYBOARD_RUNS.test(w);
    });
}

const MUST_SAY_SOMETHING: ReadonlySet<EnquiryField> = new Set([
  'objective',
  'existing',
  'deadline',
  'success',
  'company',
]);

export type AnswerCheck = { ok: true; value: string } | { ok: false; problem: string };

export function checkAnswer(step: EnquiryStep, raw: string): AnswerCheck {
  const typed = String(raw ?? '').trim();
  const value = typed.replace(/[\p{Cf}\s]/gu, '') === '' ? '' : typed;
  if (!value) {
    return step.optional
      ? { ok: true, value: '' }
      : { ok: false, problem: 'I do need that one, if you would. ' + step.ask };
  }
  if (value.length > ENQUIRY_MAX[step.field]) {
    return {
      ok: false,
      problem: `Could you keep that under ${ENQUIRY_MAX[step.field].toLocaleString('en-GB')} characters, please?`,
    };
  }
  if (step.field === 'email' && !isEmail(value)) {
    return { ok: false, problem: 'That does not appear to be a valid email address. ' + step.ask };
  }
  if (MUST_SAY_SOMETHING.has(step.field) && !saysSomething(value)) {
    return {
      ok: false,
      problem:
        'I could not make much of that, I am afraid. ' +
        step.ask +
        (step.optional ? ' Or skip it, if it does not apply.' : ''),
    };
  }
  return { ok: true, value };
}

export function buildEnquirySteps(questions: EnquiryQuestions): readonly EnquiryStep[] {
  return [
    { field: 'objective', ask: questions.objective, optional: false },
    { field: 'existing', ask: questions.existing, optional: true },
    { field: 'deadline', ask: questions.deadline, optional: true },
    { field: 'success', ask: questions.success, optional: true },
    {
      field: 'name',
      ask:
        questions.name ??
        'May I take your name, so the team can address their reply?',
      optional: false,
    },
    {
      field: 'email',
      ask:
        questions.email ??
        'And a work email address, so the team can reply to you directly?',
      optional: false,
    },
    {
      field: 'company',
      ask: questions.company ?? 'Which company are you enquiring on behalf of?',
      optional: true,
    },
  ];
}

/**
 * Build enquiry helpers with site question strings wired in.
 * Discovery skips name and email (already collected at the gate).
 */
export function createEnquiryHelpers(questions: EnquiryQuestions) {
  const ENQUIRY_STEPS = buildEnquirySteps(questions);
  const DISCOVERY_STEPS = ENQUIRY_STEPS.filter(
    s => s.field !== 'name' && s.field !== 'email',
  );

  function checkEmail(raw: string): AnswerCheck {
    return checkAnswer(
      { field: 'email', ask: 'May I take your work email address?', optional: false },
      raw,
    );
  }

  function checkName(raw: string): AnswerCheck {
    const check = checkAnswer(ENQUIRY_STEPS.find(s => s.field === 'name')!, raw);
    if (!check.ok) return { ok: false, problem: `I do need that one, if you would. ${ASK_NAME}` };
    if (check.value.includes('@') || check.value.endsWith('?') || check.value.split(/\s+/).length > 8) {
      return { ok: false, problem: `I will come to that shortly. First, may I take your name?` };
    }
    return check;
  }

  return {
    ENQUIRY_STEPS,
    DISCOVERY_STEPS,
    checkAnswer,
    checkName,
    checkEmail,
    saysSomething,
    looksLikeQuestion,
    ASK_NAME,
    askEmail,
    greeting,
    DISCOVERY_OPENING,
    EMAIL_PATTERN,
    ENQUIRY_MAX,
    EMPTY_DRAFT,
    isEmail,
  };
}

/** Standalone name check using the default name step wording. */
export function checkName(raw: string): AnswerCheck {
  return createEnquiryHelpers({
    objective: '',
    existing: '',
    deadline: '',
    success: '',
  }).checkName(raw);
}

/** Standalone email check. */
export function checkEmail(raw: string): AnswerCheck {
  return checkAnswer(
    { field: 'email', ask: 'May I take your work email address?', optional: false },
    raw,
  );
}
