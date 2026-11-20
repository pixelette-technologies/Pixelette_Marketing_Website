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
import DiagnosticResults from "./DiagnosticResults";
import DiagnosticStage from "./DiagnosticStage";
import StrategyHero from "./StrategyHero";

// /strategy-positioning — Impact Compass experience (Option 3, 20 Nov 2026).
// Intro → one-question tiles → results dashboard. Scoring unchanged:
// scoreDiagnostic + the same twelve questions.
//
// Phases: idle (intro only), running, halfway (~1.3s), results.
// Server always renders idle (no localStorage); restore via useSyncExternalStore.

type Phase = "idle" | "running" | "halfway" | "results";
type Motion = "still" | "locking" | "leaving";

interface Working {
  answers: Answers;
  step: number;
  phase: Phase;
  resumable: boolean;
}

const FRESH: Working = {
  answers: emptyAnswers(),
  step: 0,
  phase: "idle",
  resumable: false
};

const HALFWAY_AFTER = TOTAL_QUESTIONS / 2 - 1;

const TIMING = { lock: 320, leave: 180, halfway: 1300 };
const TIMING_REDUCED = { lock: 180, leave: 0, halfway: 1300 };

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

  const [working, setWorking] = useState<Working | null>(null);
  const view = working ?? restore(raw);
  const { answers, step, phase, resumable } = view;

  const [motion, setMotion] = useState<Motion>("still");
  const [started, setStarted] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [returning, setReturning] = useState(false);

  const halfwayShown = useRef(false);
  const completionCounted = useRef(false);
  const timers = useRef<number[]>([]);
  const pending = useRef<number | null>(null);
  const focusTarget = useRef<FocusTarget>(null);

  const questionRef = useRef<HTMLParagraphElement | null>(null);
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

  useEffect(() => {
    if (!working) return;
    if (working.phase === "idle" && working.answers.every(a => a === null)) {
      return;
    }
    saveState(working.answers, working.phase === "results");
  }, [working]);

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

  const destination = (
    base: Working
  ):
    | { kind: "question"; step: number }
    | { kind: "halfway" }
    | { kind: "results" } => {
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

  const choose = (index: number, viaPointer: boolean) => {
    if (!viaPointer && pending.current === index) return;
    clearTimers();

    const base: Working = {
      answers: answers.map((answer, i) => (i === step ? index : answer)),
      step,
      phase: "running",
      resumable: false
    };
    setWorking(base);
    markStarted();

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
        ? {
            answers: emptyAnswers(),
            step: 0,
            phase: "running",
            resumable: false
          }
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

  const showIntro = phase === "idle";
  const showStage = phase === "running" || phase === "halfway";
  const showResultsView = phase === "results";

  return (
    <div className='strategyExperience' data-reveal='off'>
      {showIntro && (
        <StrategyHero
          onStart={() => start(false)}
          resumable={resumable}
          onResume={() => start(false)}
          onRestart={() => start(true)}
        />
      )}

      {(showStage || showResultsView) && (
        <div className='dxGround'>
          <Container className='main'>
            <section
              className='dxStage'
              id='diagnostic'
              ref={stageRef}
              aria-labelledby='dx-stage-heading'
            >
              <h2 id='dx-stage-heading' className='dx-sr'>
                {diagnosticIntro.heading}
              </h2>

              {showResultsView ? (
                <DiagnosticResults
                  score={score}
                  headingRef={resultsRef}
                  reveal={reveal}
                  onReopen={reopen}
                  onRetake={() => start(true)}
                />
              ) : (
                <DiagnosticStage
                  answers={answers}
                  step={step}
                  phase={phase}
                  motion={motion}
                  animate={started && !reduced}
                  returning={returning}
                  questionRef={questionRef}
                  halfwayRef={halfwayRef}
                  onChoose={choose}
                  onNext={next}
                  onBack={back}
                  onBackToResults={backToResults}
                />
              )}
            </section>
          </Container>
        </div>
      )}

      {/* Anchor target for Start diagnostic before hydration / when idle */}
      {showIntro && <div id='diagnostic' className='dx-sr' tabIndex={-1} />}
    </div>
  );
};

export default StrategyExperience;
