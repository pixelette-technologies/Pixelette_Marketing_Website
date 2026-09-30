"use client";

import { Container } from "@/components/common";
import { diagnosticIntro, diagnosticQuestions } from "@/data/strategy";
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
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore
} from "react";
import ClarityBridge from "./ClarityBridge";
import DiagnosticResults from "./DiagnosticResults";
import DiagnosticStage from "./DiagnosticStage";
import ResultsClose from "./ResultsClose";
import StrategyHero from "./StrategyHero";

// /strategy-positioning as ONE experience, 30 Sep 2026 (the final diagnostic
// brief). The hero, the bridge and the diagnostic share state because the
// brief makes them one sequence: "Start the diagnostic" compacts the hero,
// folds the bridge away and brings Question 1 up into the primary position,
// with no reload and focus on the question.
//
// EVERYTHING STILL SERVER-RENDERS. This is a client component, but client
// components render on the server too: the hero, the bridge and Question 1
// are in the HTML, so a crawler and a no-JS reader get the page's argument.
// The server always renders the untouched page (idle), because it cannot read
// localStorage; stored answers arrive through useSyncExternalStore, the same
// mechanism as before — see `src/lib/strategyDiagnostic.ts`.
//
// THE SCORING IS NOT HERE AND DID NOT CHANGE. `scoreDiagnostic` is called
// exactly as it was, with the same twelve questions.
//
// PHASES: idle (Question 1 shown, nothing started), running (one question at
// a time), halfway (the pacing moment after question six, ~1.3s, no button)
// and results. `motion` is the transition between questions: the chosen
// answer LOCKS (320ms, so the visitor sees what they chose), the question
// LEAVES (up 20px and out, 180ms), and the next one enters by mounting.
//
// EVERY TIMED STEP IS PRECOMPUTED AT THE MOMENT OF THE CHOICE, and every
// other action clears the pending timers first. So a timer never reads stale
// state: it applies a whole state that was correct when it was scheduled,
// and if anything happened in between, it never fires.

type Phase = "idle" | "running" | "halfway" | "results";
type Motion = "still" | "locking" | "leaving";

interface Working {
  answers: Answers;
  step: number;
  phase: Phase;
  /** A stored, unfinished set was found on load. */
  resumable: boolean;
}

const FRESH: Working = {
  answers: emptyAnswers(),
  step: 0,
  phase: "idle",
  resumable: false
};

/** After this answer (0-based), the halfway moment. */
const HALFWAY_AFTER = TOTAL_QUESTIONS / 2 - 1;

const TIMING = {
  lock: 320,
  leave: 180,
  halfway: 1300
};
const TIMING_REDUCED = {
  lock: 180,
  leave: 0,
  halfway: 1300
};

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

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(REDUCE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const readReduced = () => window.matchMedia(REDUCE_QUERY).matches;
const readReducedServer = () => false;

type FocusTarget = "question" | "halfway" | "results" | null;

const StrategyExperience = () => {
  const raw = useSyncExternalStore(
    subscribeToStoredState,
    readStoredRaw,
    readServerSnapshot
  );
  const reduced = useSyncExternalStore(
    subscribeReduced,
    readReduced,
    readReducedServer
  );

  // `null` until the visitor touches something; then storage is write-only.
  const [working, setWorking] = useState<Working | null>(null);
  const view = working ?? restore(raw);
  const { answers, step, phase, resumable } = view;

  const [motion, setMotion] = useState<Motion>("still");
  /** The hero is compact once the visitor has started in this visit. A
   *  returning visitor restored straight into their results sees the full
   *  page, because they have not started anything yet. */
  const [started, setStarted] = useState(false);
  /** Animate the result reveal. Only for a result the visitor has just
   *  reached, never for one restored from storage. */
  const [reveal, setReveal] = useState(false);
  /** Reopened a question from the results: answering it goes straight back. */
  const [returning, setReturning] = useState(false);

  const halfwayShown = useRef(false);
  const completionCounted = useRef(false);
  const timers = useRef<number[]>([]);
  /** The answer a pointer choice has scheduled, so the change event that
   *  follows the same click does not cancel it. */
  const pending = useRef<number | null>(null);
  const focusTarget = useRef<FocusTarget>(null);

  const questionRef = useRef<HTMLLegendElement | null>(null);
  const halfwayRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLHeadingElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);

  const timing = reduced ? TIMING_REDUCED : TIMING;

  const clearTimers = useCallback(() => {
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];
    pending.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const later = (ms: number, run: () => void) => {
    timers.current.push(window.setTimeout(run, ms));
  };

  // --- Save -----------------------------------------------------------------
  useEffect(() => {
    if (!working) return;
    if (working.phase === "idle" && working.answers.every(a => a === null)) {
      return;
    }
    saveState(working.answers, working.phase === "results");
  }, [working]);

  // --- Focus ----------------------------------------------------------------
  // Moved only when an action asked for it, and without scrolling: the page
  // decides where it scrolls, the focus only follows.
  useEffect(() => {
    const target = focusTarget.current;
    if (!target) return;
    focusTarget.current = null;
    const node =
      target === "results"
        ? resultsRef.current
        : target === "halfway"
          ? halfwayRef.current
          : questionRef.current;
    node?.focus({ preventScroll: true });
  }, [step, phase, motion]);

  const score = useMemo(
    () => scoreDiagnostic(answers, diagnosticQuestions),
    [answers]
  );

  /** Keep the stage's top in view, without moving if it already is. */
  const bringStageIntoView = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const top = stage.getBoundingClientRect().top;
    const header =
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
      0;
    if (top < header || top > window.innerHeight * 0.4) {
      stage.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start"
      });
    }
  }, [reduced]);

  // --- Actions --------------------------------------------------------------

  const markStarted = () => {
    if (!started) setStarted(true);
    track("strategy_diagnostic_started");
  };

  const showResults = (base: Working, animate: boolean) => {
    setWorking({ ...base, phase: "results" });
    setMotion("still");
    setReturning(false);
    setReveal(animate && !reduced);
    focusTarget.current = "results";
    if (!completionCounted.current) {
      completionCounted.current = true;
      track("strategy_diagnostic_completed");
    }
  };

  /** Where an answered question leads. Pure: it returns what to do. */
  const destination = (
    base: Working
  ): { kind: "question"; step: number } | { kind: "halfway" } | { kind: "results" } => {
    const complete = base.answers.every(answer => answer !== null);
    if (returning && complete) return { kind: "results" };
    if (base.step === HALFWAY_AFTER && !halfwayShown.current) {
      return { kind: "halfway" };
    }
    if (base.step >= TOTAL_QUESTIONS - 1) {
      if (complete) return { kind: "results" };
      return {
        kind: "question",
        step: base.answers.findIndex(answer => answer === null)
      };
    }
    return { kind: "question", step: base.step + 1 };
  };

  /** Lock, leave, arrive. `lock` is 0 for the Next button and Enter, where
   *  the visitor has already seen their choice. */
  const advance = (base: Working, lock: number) => {
    const to = destination(base);
    setMotion(lock > 0 ? "locking" : "leaving");
    if (lock > 0) later(lock, () => setMotion("leaving"));

    later(lock + timing.leave, () => {
      pending.current = null;
      if (to.kind === "results") {
        showResults(base, true);
        return;
      }
      if (to.kind === "question") {
        setWorking({ ...base, step: to.step, phase: "running" });
        setMotion("still");
        focusTarget.current = "question";
        return;
      }
      // Halfway: shown, held, then question seven — no button.
      halfwayShown.current = true;
      setWorking({ ...base, step: base.step + 1, phase: "halfway" });
      setMotion("still");
      focusTarget.current = "halfway";
      later(timing.halfway, () => setMotion("leaving"));
      later(timing.halfway + timing.leave, () => {
        setWorking({ ...base, step: base.step + 1, phase: "running" });
        setMotion("still");
        focusTarget.current = "question";
      });
    });
  };

  /** An answer. `viaPointer` advances by itself after the lock; a keyboard
   *  choice (arrow keys) only selects, and Enter or Next moves on — otherwise
   *  arrowing through five options would skip four questions. */
  const choose = (index: number, viaPointer: boolean) => {
    if (!viaPointer && pending.current === index) return;
    clearTimers();

    const beginning = phase === "idle";
    const base: Working = {
      answers: answers.map((answer, i) => (i === step ? index : answer)),
      step,
      phase: "running",
      resumable: false
    };
    setWorking(base);
    if (beginning) {
      markStarted();
      // The hero and the bridge fold away above the stage. Chrome and Firefox
      // hold the stage still through that with scroll anchoring; this
      // catches a browser that does not, once the fold has finished.
      later(480, bringStageIntoView);
    }

    if (viaPointer) {
      pending.current = index;
      advance(base, timing.lock);
    } else {
      setMotion("still");
    }
  };

  const next = () => {
    if (answers[step] === null) return;
    clearTimers();
    advance({ ...view, phase: "running" }, 0);
  };

  const back = () => {
    clearTimers();
    setMotion("still");
    setWorking({ ...view, step: Math.max(step - 1, 0), phase: "running" });
    focusTarget.current = "question";
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  /** The hero's control, and the resume panel's two. */
  const start = (fresh: boolean) => {
    clearTimers();
    const fromScratch = fresh || phase === "results" || !resumable;
    if (fromScratch) {
      clearState();
      halfwayShown.current = false;
      completionCounted.current = false;
    }
    setWorking(
      fromScratch
        ? { answers: emptyAnswers(), step: 0, phase: "running", resumable: false }
        : { ...view, phase: "running", resumable: false }
    );
    setMotion("still");
    setReveal(false);
    setReturning(false);
    markStarted();
    focusTarget.current = "question";
    scrollToTop();
  };

  const reopen = (index: number) => {
    clearTimers();
    setWorking({ ...view, step: index, phase: "running" });
    setMotion("still");
    setReturning(true);
    focusTarget.current = "question";
    bringStageIntoView();
  };

  const backToResults = () => {
    clearTimers();
    showResults(view, false);
    bringStageIntoView();
  };

  // --- Render ---------------------------------------------------------------

  const compact = started;

  return (
    // data-reveal="off": the site's scroll reveal would otherwise hide this
    // whole block and fade it in, fighting the diagnostic's own motion.
    <div
      className={compact ? "strategyExperience is-compact" : "strategyExperience"}
      data-reveal='off'
    >
      <StrategyHero
        compact={compact}
        onStart={() => start(false)}
      />

      <ClarityBridge collapsed={compact} />

      {/* The instrument's own ground: the page colour, full-bleed, on a page whose
          ground is the warm band. It is what keeps the bridge and the stage
          from running together, and gives the rail a crisp field. */}
      <div className='dxGround'>
      <Container className='main'>
        <section
          className='dxStage'
          id='diagnostic'
          ref={stageRef}
          aria-labelledby='dx-stage-heading'
        >
          {/* The outline needs a heading here; a sighted visitor reads the
              progress row and the question instead. */}
          <h2 id='dx-stage-heading' className='dx-sr'>
            {diagnosticIntro.heading}
          </h2>

          {phase === "results" ? (
            <DiagnosticResults
              score={score}
              headingRef={resultsRef}
              reveal={reveal}
              onReopen={reopen}
            />
          ) : (
            <DiagnosticStage
              answers={answers}
              step={step}
              phase={phase}
              resumable={resumable}
              motion={motion}
              animate={started && !reduced}
              returning={returning}
              questionRef={questionRef}
              halfwayRef={halfwayRef}
              onChoose={choose}
              onNext={next}
              onBack={back}
              onBackToResults={backToResults}
              onResume={() => start(false)}
              onRestart={() => start(true)}
            />
          )}
        </section>
      </Container>
      </div>

      {phase === "results" && (
        <ResultsClose reveal={reveal} onRetake={() => start(true)} />
      )}
    </div>
  );
};

export default StrategyExperience;
