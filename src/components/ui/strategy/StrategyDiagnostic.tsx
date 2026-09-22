"use client";

import { Text } from "@/components/feature";
import {
  diagnosticIntro,
  diagnosticQuestions,
  dimensionsById
} from "@/data/strategy";
import {
  TOTAL_QUESTIONS,
  type Answers,
  clearState,
  emptyAnswers,
  parseStoredRaw,
  readServerSnapshot,
  readStoredRaw,
  saveState,
  scoreDiagnostic,
  subscribeToStoredState,
  track
} from "@/lib/strategyDiagnostic";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore
} from "react";
import DiagnosticResults from "./DiagnosticResults";

type Phase = "idle" | "running" | "results";

interface Working {
  answers: Answers;
  step: number;
  phase: Phase;
  /** A stored, unfinished set was found. Offers resume or start again rather
   *  than dropping somebody back into question 7 with no explanation. */
  resumable: boolean;
}

const FRESH: Working = {
  answers: emptyAnswers(),
  step: 0,
  phase: "idle",
  resumable: false
};

// The instrument. The only stateful surface on this site.
//
// THREE PHASES: idle (the start control), running (one question at a time) and
// results. The section's heading and standfirst are NOT here — they are in
// DiagnosticSection, so they reach a crawler and a no-JS reader regardless of
// what this component is doing.
//
// THE SERVER RENDERS `idle`, ALWAYS, because it cannot read localStorage.
// Stored answers arrive through useSyncExternalStore, which is the API built
// for a value the two environments legitimately disagree about: null on the
// server, the stored string on the client, and React handles the changeover.
// The first attempt read storage in an effect and called setState, which works
// and is also what React's own lint rules now flag — a second render pass on
// every mount. See the note in `src/lib/strategyDiagnostic.ts`.
//
// TWO PIECES OF STATE, NOT FIVE. `working` is the whole view — answers, step,
// phase, resumable — and it is NULL until the visitor touches something, at
// which point it takes over and storage becomes write-only. That null is what
// distinguishes "nothing has happened yet" from "twelve unanswered questions",
// which are the same answer array and very different situations: without it,
// the save effect would immediately write an empty set over a stored one.
//
// THE CONTROLS ARE REAL RADIOS restyled with appearance: none. Not divs with
// onClick. The focus ring lands on the element the browser already focuses,
// arrow keys already move within the group, and the checked state is already
// exposed to assistive technology — none of which is true of the alternative,
// and all of which Accordion.tsx had to be rewritten once to recover. The
// selected row is marked by a class React writes rather than by :has(:checked),
// because React already knows and a state class cannot be defeated by a
// browser that has not shipped :has.
//
// NOTHING IS SENT ANYWHERE. No fetch, no backend, no third party. The answers
// go to localStorage on this machine and the score is computed in
// `src/lib/strategyDiagnostic.ts`. The three analytics events carry a name and
// nothing else.

/** The view a stored state restores to. Pure, so it needs no effect: a
 *  completed set opens on its results, an unfinished one offers to resume at
 *  the first question without an answer, and no stored state at all is the
 *  untouched page. */
const restore = (raw: string | null): Working => {
  const stored = parseStoredRaw(raw);
  if (!stored) return FRESH;

  if (stored.completed) {
    return {
      answers: stored.answers,
      step: TOTAL_QUESTIONS - 1,
      phase: "results",
      resumable: false
    };
  }

  if (stored.answers.every(answer => answer === null)) return FRESH;

  const firstUnanswered = stored.answers.findIndex(answer => answer === null);
  return {
    answers: stored.answers,
    step: firstUnanswered === -1 ? 0 : firstUnanswered,
    phase: "idle",
    resumable: true
  };
};

const StrategyDiagnostic = () => {
  // The stored state, as a raw string, through React's external-store API. See
  // the long note in `src/lib/strategyDiagnostic.ts` for why this is not an
  // effect that calls setState: the server cannot read storage, and this is
  // the one API that makes that difference React's problem rather than ours.
  const raw = useSyncExternalStore(
    subscribeToStoredState,
    readStoredRaw,
    readServerSnapshot
  );

  // `null` until the visitor touches something, at which point the local copy
  // takes over and storage becomes write-only. That is what stops our own
  // saves feeding back in and re-restoring the view underneath somebody who is
  // halfway through question nine.
  const [working, setWorking] = useState<Working | null>(null);
  const view = working ?? restore(raw);
  const { answers, step, phase, resumable } = view;

  const [confirmingRestart, setConfirmingRestart] = useState(false);

  const legendRef = useRef<HTMLLegendElement | null>(null);
  const resultsRef = useRef<HTMLHeadingElement | null>(null);
  /** Nothing takes focus until the visitor has actually done something. */
  const interacted = useRef(false);
  /** One completion event per run. Going back to change question 3 and
   *  returning to the results is the same completion, not a second one, and
   *  counting it twice would quietly inflate the only number anybody will look
   *  at. Reset by restart, which genuinely is a new run. */
  const completionCounted = useRef(false);

  // --- Save -----------------------------------------------------------------
  // On every change, so a refresh mid-question loses at most the current one.
  // An effect is the right tool HERE and was the wrong one for loading: this
  // pushes React's state out to an external system, which is what effects are
  // for, and it calls no setState.
  //
  // `working === null` means nothing has been touched yet, so there is nothing
  // to save and nothing to overwrite a stored set with.
  useEffect(() => {
    if (!working) return;
    if (working.phase === "idle" && working.answers.every(a => a === null)) {
      return;
    }
    saveState(working.answers, working.phase === "results");
  }, [working]);

  // --- Focus ----------------------------------------------------------------
  // Without this, pressing Continue leaves focus on the button and a
  // screen-reader user is never told the question changed. preventScroll stops
  // the browser hauling the panel around under a sighted reader who is already
  // looking at it.
  useEffect(() => {
    if (!interacted.current) return;
    const target = phase === "results" ? resultsRef.current : legendRef.current;
    target?.focus({ preventScroll: true });
  }, [step, phase]);

  const question = diagnosticQuestions[step];
  const answered = answers[step] !== null;
  const isLast = step === TOTAL_QUESTIONS - 1;
  const complete = answers.every(answer => answer !== null);

  const score = useMemo(
    () => scoreDiagnostic(answers, diagnosticQuestions),
    [answers]
  );

  // --- Actions --------------------------------------------------------------
  // Every one of them writes the WHOLE working state, built from `view` rather
  // than from a previous `working`: before the first interaction `working` is
  // null and the view is whatever storage restored, so a functional update
  // would be starting from the wrong place.

  const update = (changes: Partial<Working>) => {
    interacted.current = true;
    setWorking({ ...view, ...changes });
  };

  const begin = (fresh: boolean) => {
    if (fresh) clearState();
    update(
      fresh
        ? { answers: emptyAnswers(), step: 0, phase: "running", resumable: false }
        : { phase: "running", resumable: false }
    );
    track("strategy_diagnostic_started");
  };

  const select = (value: number) => {
    update({
      answers: answers.map((answer, index) =>
        index === step ? value : answer
      )
    });
  };

  /** The one way into the results, so the event is counted in one place. */
  const showResults = () => {
    update({ phase: "results" });
    // Not fired from an effect watching `phase`: that would also fire when a
    // returning visitor is restored straight into their stored results, which
    // is a page load rather than a completion.
    if (!completionCounted.current) {
      completionCounted.current = true;
      track("strategy_diagnostic_completed");
    }
  };

  const goForward = () => {
    if (!isLast) {
      update({ step: step + 1 });
      return;
    }
    showResults();
  };

  const goBack = () => update({ step: Math.max(step - 1, 0) });

  /** From the results back into a specific question. Answers are untouched, so
   *  changing one and returning re-scores rather than restarting. */
  const reopen = (index: number) => update({ step: index, phase: "running" });

  const restart = () => {
    setConfirmingRestart(false);
    completionCounted.current = false;
    clearState();
    update({ answers: emptyAnswers(), step: 0, phase: "idle", resumable: false });
  };

  // --- Render ---------------------------------------------------------------

  if (phase === "results") {
    return (
      <DiagnosticResults
        score={score}
        headingRef={resultsRef}
        onReopen={reopen}
        onRestart={restart}
        confirming={confirmingRestart}
        setConfirming={setConfirmingRestart}
      />
    );
  }

  if (phase === "idle") {
    return (
      <div className='diagnostic__panel card-feature'>
        <div className='diagnosticStart'>
          <Text className='body'>
            {resumable ? diagnosticIntro.resume : diagnosticIntro.assurance}
          </Text>

          <div className='diagnostic__actions'>
            {resumable ? (
              <>
                <button
                  type='button'
                  className='btn'
                  onClick={() => begin(false)}
                >
                  {diagnosticIntro.resumeAction}
                </button>
                <button
                  type='button'
                  className='btn2'
                  onClick={() => begin(true)}
                >
                  {diagnosticIntro.restartAction}
                </button>
              </>
            ) : (
              <button type='button' className='btn' onClick={() => begin(true)}>
                {diagnosticIntro.start}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const dimension = dimensionsById[question.dimension];
  const position = step + 1;

  return (
    <div className='diagnostic__panel card-feature'>
      <div className='diagnosticQuestion'>
        <div className='diagnosticQuestion__meta'>
          <Text className='eyebrow'>{dimension.name}</Text>
          <Text className='diagnosticQuestion__count'>
            {position} / {TOTAL_QUESTIONS}
          </Text>
        </div>

        {/* A real progressbar role, so the position is announced rather than
            being a decorative stripe. The inline width is the only inline
            style on this page and it is a length, not a colour — the token
            gate's rule is about colour and this cannot be expressed in a
            stylesheet. */}
        <div
          className='diagnosticProgress'
          role='progressbar'
          aria-valuemin={1}
          aria-valuemax={TOTAL_QUESTIONS}
          aria-valuenow={position}
          aria-label={`Question ${position} of ${TOTAL_QUESTIONS}`}
        >
          <span
            className='diagnosticProgress__fill'
            style={{ width: `${(position / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>

        {/* min-width: 0 on the fieldset in the stylesheet — a fieldset defaults
            to min-width: min-content and would otherwise refuse to let the
            panel fold. */}
        <fieldset className='diagnosticQuestion__field'>
          <legend
            className='h3 diagnosticQuestion__prompt'
            ref={legendRef}
            tabIndex={-1}
          >
            {question.prompt}
          </legend>

          <div className='diagnosticQuestion__options'>
            {question.options.map((option, index) => (
              <label
                key={option}
                className={
                  answers[step] === index ? "dqOption dqOption--on" : "dqOption"
                }
              >
                <input
                  type='radio'
                  className='dqOption__input'
                  // The step is in the group name so that moving back to a
                  // question does not inherit the previous group's checked
                  // state through a reused DOM node.
                  name={`dq-${step}`}
                  value={index}
                  checked={answers[step] === index}
                  onChange={() => select(index)}
                />
                <span className='dqOption__text'>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className='diagnostic__actions'>
          <button
            type='button'
            className='btn'
            onClick={goForward}
            disabled={!answered}
          >
            {isLast ? "See my results" : "Continue"}
          </button>

          {step > 0 && (
            <button type='button' className='btn2' onClick={goBack}>
              Back
            </button>
          )}

          {/* Once every question has an answer, the last one is always one
              press away — so a visitor who went back to change question 3 is
              not made to click Continue nine more times. */}
          {complete && !isLast && (
            <button
              type='button'
              className='btn2'
              onClick={() => {
                interacted.current = true;
                showResults();
              }}
            >
              Skip to results
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategyDiagnostic;
