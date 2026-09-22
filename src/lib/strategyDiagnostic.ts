// The Strategy & Positioning Diagnostic — scoring, storage and events.
//
// EVERYTHING THAT DECIDES A NUMBER LIVES HERE, and nothing here renders. The
// copy is in `src/data/strategy`, the markup is in `src/components/ui/strategy`,
// and the arithmetic is in this file so it can be read and checked in one
// place — which matters more than usual, because the page shows a visitor a
// score about their own business and has to be able to stand behind it.
//
// WHAT THE SCORE IS. Twelve questions, two per dimension, each answered on a
// five-point scale worth 0 to 4. Raw maximum 48. The percentage is
// actual / possible x 100, rounded to the nearest whole number, and the same
// formula is used for the six dimension scores against their own maximum of 8.
//
// WHAT THE SCORE IS NOT. There is no model, no weighting, no benchmark, no
// request and no inference. It is not validated against anything and the copy
// never says it is — see the language rules in `diagnosticContent.ts`. Nothing
// is randomised: the same twelve answers always produce the same result.
//
// TIES ARE RESOLVED BY THE CANONICAL ORDER, never by chance and never by
// whichever way `sort` happened to fall. `DIMENSIONS` below is that order, and
// it is the order the methodology states: market, audience, competition,
// positioning, messaging, growth. Earliest wins, for the strongest area, the
// priority area and the three focus areas alike. A stable rule beats a clever
// one here, because a visitor who answers the same way twice must see the same
// page twice.

export const DIMENSIONS = [
  "market",
  "audience",
  "competition",
  "positioning",
  "messaging",
  "growth"
] as const;

export type DimensionId = (typeof DIMENSIONS)[number];

/** 0-4 inclusive, so five options per question. */
export const MAX_PER_QUESTION = 4;
export const QUESTIONS_PER_DIMENSION = 2;
export const TOTAL_QUESTIONS = DIMENSIONS.length * QUESTIONS_PER_DIMENSION; // 12
export const MAX_PER_DIMENSION = QUESTIONS_PER_DIMENSION * MAX_PER_QUESTION; // 8
export const MAX_RAW = TOTAL_QUESTIONS * MAX_PER_QUESTION; // 48

/** How many recommendations the results show. */
export const FOCUS_COUNT = 3;

/** One entry per question, in question order. `null` until answered. */
export type Answers = (number | null)[];

export const emptyAnswers = (): Answers =>
  Array.from({ length: TOTAL_QUESTIONS }, () => null);

/** The shape scoring needs from a question. The full question, with its
 *  prompt and its five options, lives in the content file. */
export interface ScorableQuestion {
  dimension: DimensionId;
}

export type BandId = "foundation" | "developing" | "established" | "strong";

/** The four bands, as boundaries on the 0-100 percentage. Inclusive lower
 *  bound, so 39 is foundation and 40 is developing — the boundary cases the
 *  quality checklist calls out by name. */
const BAND_FLOORS: { id: BandId; from: number }[] = [
  { id: "strong", from: 80 },
  { id: "established", from: 60 },
  { id: "developing", from: 40 },
  { id: "foundation", from: 0 }
];

export function bandFor(percentage: number): BandId {
  // Ordered high to low, so the first floor the score clears is its band.
  return (BAND_FLOORS.find(band => percentage >= band.from) ?? BAND_FLOORS[3])
    .id;
}

/** actual / possible x 100, to the nearest whole number. Guards a zero
 *  denominator so a future change to the question set cannot produce NaN on a
 *  page a visitor is reading. */
export function percentage(actual: number, possible: number): number {
  if (possible <= 0) return 0;
  return Math.round((actual / possible) * 100);
}

export interface DimensionScore {
  id: DimensionId;
  /** 0-8. */
  raw: number;
  /** 0-100. */
  percentage: number;
}

export interface DiagnosticScore {
  /** 0-48. */
  raw: number;
  /** 0-100. */
  overall: number;
  band: BandId;
  /** Always six, in DIMENSIONS order. */
  dimensions: DimensionScore[];
  /** Highest-scoring dimension; earliest in DIMENSIONS order on a tie. */
  strongest: DimensionId;
  /** Lowest-scoring dimension; earliest in DIMENSIONS order on a tie. */
  priority: DimensionId;
  /** The three lowest, most urgent first. Ties fall back to DIMENSIONS order. */
  focus: DimensionId[];
  /** True when all six dimensions scored identically, in which case naming a
   *  strongest and a priority area would be naming the same one twice. The
   *  results section says something else instead. */
  uniform: boolean;
}

/**
 * The whole calculation. Unanswered questions count as 0 so that a partial set
 * still scores — but the results are only ever shown once all twelve are
 * answered, so in practice this is called with a complete set.
 */
export function scoreDiagnostic(
  answers: Answers,
  questions: ScorableQuestion[]
): DiagnosticScore {
  const rawByDimension = new Map<DimensionId, number>(
    DIMENSIONS.map(id => [id, 0])
  );

  questions.forEach((question, index) => {
    const answer = answers[index];
    if (answer === null || answer === undefined) return;
    // Defensive clamp. A stored answer from an older version of the question
    // set could otherwise put the total above its own maximum, and the one
    // thing this file must never do is print a percentage over 100.
    const value = Math.min(Math.max(answer, 0), MAX_PER_QUESTION);
    rawByDimension.set(
      question.dimension,
      (rawByDimension.get(question.dimension) ?? 0) + value
    );
  });

  const dimensions: DimensionScore[] = DIMENSIONS.map(id => {
    const raw = rawByDimension.get(id) ?? 0;
    return { id, raw, percentage: percentage(raw, MAX_PER_DIMENSION) };
  });

  const raw = dimensions.reduce((total, d) => total + d.raw, 0);
  const overall = percentage(raw, MAX_RAW);

  // Ties go to the earliest dimension in the canonical order. `reduce` keeps
  // the incumbent unless the challenger is strictly better, and `dimensions`
  // is already in canonical order, so this is that rule and not a coincidence
  // of how the engine sorts.
  const strongest = dimensions.reduce((best, d) =>
    d.raw > best.raw ? d : best
  ).id;
  const priority = dimensions.reduce((worst, d) =>
    d.raw < worst.raw ? d : worst
  ).id;

  // Same rule, applied to a sort: compare on score, and fall back to canonical
  // position so the order is total rather than merely consistent.
  const order = new Map(DIMENSIONS.map((id, i) => [id, i]));
  const focus = [...dimensions]
    .sort(
      (a, b) =>
        a.raw - b.raw ||
        (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0)
    )
    .slice(0, FOCUS_COUNT)
    .map(d => d.id);

  const uniform = dimensions.every(d => d.raw === dimensions[0].raw);

  return {
    raw,
    overall,
    band: bandFor(overall),
    dimensions,
    strongest,
    priority,
    focus,
    uniform
  };
}

// --- Storage ----------------------------------------------------------------
// localStorage, so an accidental refresh does not destroy twelve answers.
//
// THIS IS THE ONLY THING THE PAGE STORES AND IT NEVER LEAVES THE BROWSER. No
// request carries the answers, there is no backend for them and none was
// invented. It is the visitor's own machine remembering their own input, which
// is why it needs no consent gate — it is not analytics and it is not a
// tracker. See `src/lib/consent.ts` for what the site does send.
//
// Every read and write is wrapped: localStorage throws in a private window
// with site data blocked, and a diagnostic that cannot be taken because
// storage is unavailable would be a far worse failure than one that forgets.

export const STORAGE_KEY = "pmw-strategy-diagnostic";

/** Dispatched on the window after every save or clear, so the closing CTA can
 *  offer "Review my results" without the two components sharing state through
 *  a provider they would otherwise be the only users of. */
export const DIAGNOSTIC_EVENT = "pmw-strategy-diagnostic-change";

/** Bumped if the question set ever changes in a way that makes stored answers
 *  wrong. A stored state from another version is discarded rather than
 *  migrated: twelve answers are ninety seconds of work, and a silently
 *  mis-mapped answer is a wrong score. */
const VERSION = 1;

export interface StoredState {
  v: number;
  answers: Answers;
  completed: boolean;
}

function isValid(value: unknown): value is StoredState {
  if (typeof value !== "object" || value === null) return false;
  const state = value as Partial<StoredState>;
  if (state.v !== VERSION) return false;
  if (typeof state.completed !== "boolean") return false;
  if (!Array.isArray(state.answers)) return false;
  if (state.answers.length !== TOTAL_QUESTIONS) return false;
  return state.answers.every(
    answer =>
      answer === null ||
      (typeof answer === "number" &&
        Number.isInteger(answer) &&
        answer >= 0 &&
        answer <= MAX_PER_QUESTION)
  );
}

/**
 * The three pieces below are a `useSyncExternalStore` source, and that is
 * deliberate rather than decorative.
 *
 * The obvious way to restore a visitor's answers is an effect that reads
 * storage and calls setState. It works, and it is also the thing React's own
 * lint rules now flag: a synchronous setState in an effect body, which means a
 * second render pass on every mount. The subtler problem is that the server
 * cannot read localStorage, so an effect is the only moment the two
 * environments are allowed to disagree — and getting that wrong is a hydration
 * mismatch rather than a visible bug.
 *
 * `useSyncExternalStore` is the API built for exactly this shape: a server
 * snapshot of null, a client snapshot read from storage, and a subscription so
 * a second tab completing the diagnostic updates this one. No effect, no
 * cascading render, and the mismatch is React's to handle rather than ours.
 *
 * `readStoredRaw` returns the RAW STRING rather than a parsed object on
 * purpose. getSnapshot must return a value that is `Object.is`-equal between
 * calls when nothing has changed, and a fresh `JSON.parse` returns a new
 * object every time, which sends React into an infinite render loop. Strings
 * compare by value, so this is stable; parsing is the caller's job, memoised.
 */
export function subscribeToStoredState(onChange: () => void): () => void {
  window.addEventListener(DIAGNOSTIC_EVENT, onChange);
  // Fired by OTHER tabs only, which is precisely the case the custom event
  // above cannot cover.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(DIAGNOSTIC_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function readStoredRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** The server has no storage, so it always renders the untouched page. */
export const readServerSnapshot = (): string | null => null;

export function parseStoredRaw(raw: string | null): StoredState | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveState(answers: Answers, completed: boolean): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: VERSION, answers, completed })
    );
  } catch {
    // Storage unavailable or full. The diagnostic carries on in memory.
  }
  announce();
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // As above.
  }
  announce();
}

function announce(): void {
  try {
    window.dispatchEvent(new Event(DIAGNOSTIC_EVENT));
  } catch {
    // Pre-hydration or a non-browser environment.
  }
}

// --- Analytics --------------------------------------------------------------
// The site's existing Google Analytics 4 tag, and nothing new. gtag is defined
// in layout.tsx and loads on every page under Consent Mode with every signal
// defaulted to denied, so with analytics refused these calls set no cookies —
// the behaviour consent.ts documents at length.
//
// NO ANSWERS AND NO SCORES ARE SENT. The three events carry a name and nothing
// else, which is what the brief asks for and also the only version of this
// that is safe by inspection: a payload cannot leak a field it does not have.

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export type DiagnosticEvent =
  | "strategy_diagnostic_started"
  | "strategy_diagnostic_completed"
  | "strategy_diagnostic_cta_clicked";

export function track(event: DiagnosticEvent): void {
  try {
    (window as GtagWindow).gtag?.("event", event);
  } catch {
    // The tag is blocked, or has not loaded. Never let analytics break a
    // control the visitor is in the middle of using.
  }
}
