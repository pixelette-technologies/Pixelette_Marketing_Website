"use client";

import {
  diagnosticIntro,
  diagnosticQuestions,
  dimensions,
  dimensionsById,
  halfway
} from "@/data/strategy";
import { TOTAL_QUESTIONS, type Answers } from "@/lib/strategyDiagnostic";
import type { CSSProperties, KeyboardEvent, MouseEvent, RefObject } from "react";

// The diagnostic while it is being taken: the six-dimension progress, then
// ONE question on the Clarity Rail (or the halfway moment, or the resume
// panel). State lives in StrategyExperience; this renders it.
//
// THE CLARITY RAIL IS FIVE REAL RADIOS. Restyled with appearance: none, not
// divs with onClick, so the focus ring, arrow keys and the checked state are
// the browser's own. On a desktop they sit on one line between "Less clear"
// and "More clear"; below 768px the same five inputs stack as five tappable
// rows — the brief's "do not force the horizontal rail into a narrow
// format". The five statements are the live wording, lowest first, so the
// position on the rail IS the score, as it always was.
//
// POINTER AND KEYBOARD DIFFER ON PURPOSE. A click or tap advances by itself
// after a short lock. An arrow key only selects — native radios check the
// option they move to, so auto-advancing on arrows would skip a question per
// keypress — and Enter or Next moves on. `event.detail` is 0 for a click the
// keyboard caused and 1+ for a real one, which is how the two are told apart.

type Phase = "idle" | "running" | "halfway" | "results";
type Motion = "still" | "locking" | "leaving";

interface DiagnosticStageProps {
  answers: Answers;
  step: number;
  phase: Phase;
  resumable: boolean;
  motion: Motion;
  /** Entrance animation for a newly arrived question. Off before the visitor
   *  starts (so the page does not animate on load) and under reduced motion. */
  animate: boolean;
  returning: boolean;
  questionRef: RefObject<HTMLLegendElement | null>;
  halfwayRef: RefObject<HTMLDivElement | null>;
  onChoose: (index: number, viaPointer: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  onBackToResults: () => void;
  onResume: () => void;
  onRestart: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

const DiagnosticStage = ({
  answers,
  step,
  phase,
  resumable,
  motion,
  animate,
  returning,
  questionRef,
  halfwayRef,
  onChoose,
  onNext,
  onBack,
  onBackToResults,
  onResume,
  onRestart
}: DiagnosticStageProps) => {
  const question = diagnosticQuestions[step];
  const current = question.dimension;
  const selected = answers[step];
  const position = step + 1;

  const bodyClass = [
    "dxBody",
    animate ? "is-entering" : "",
    motion === "leaving" ? "is-leaving" : "",
    motion === "locking" ? "is-locking" : ""
  ]
    .filter(Boolean)
    .join(" ");

  // --- The six dimensions ---------------------------------------------------
  // Complete when both of its questions are answered and it is not the one
  // being asked. Burgundy tick, pink dot, neutral ring, and the state is
  // also in words for a screen reader: never colour alone.
  const progress = (
    <div className='dxProgress'>
      <ol className='dxProgress__dimensions'>
        {dimensions.map(dimension => {
          const indices = diagnosticQuestions
            .map((q, i) => (q.dimension === dimension.id ? i : -1))
            .filter(i => i !== -1);
          const done = indices.every(i => answers[i] !== null);
          const asking = phase !== "halfway" && !(phase === "idle" && resumable);
          const isCurrent = asking && dimension.id === current;
          const state = isCurrent ? "current" : done ? "done" : "todo";
          return (
            <li
              key={dimension.id}
              className={`dxProgress__dimension is-${state}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              {/* A tick for done; the dot and the ring are drawn in CSS so
                  they are crisp at any size. */}
              <span className='dxProgress__mark' aria-hidden='true'>
                {state === "done" ? "✓" : ""}
              </span>
              {dimension.name}
              <span className='dx-sr'>
                {state === "done"
                  ? " (complete)"
                  : state === "current"
                    ? " (current)"
                    : " (not started)"}
              </span>
            </li>
          );
        })}
      </ol>

      <div
        className='dxProgress__count'
        role='progressbar'
        aria-valuemin={1}
        aria-valuemax={TOTAL_QUESTIONS}
        aria-valuenow={position}
        aria-label={`Question ${position} of ${TOTAL_QUESTIONS}`}
      >
        {position} of {TOTAL_QUESTIONS}
      </div>

      {/* The only inline style besides the rail's: a per-visitor length. */}
      <span className='dxProgress__track' aria-hidden='true'>
        <span
          className='dxProgress__fill'
          style={{
            width: `${(answers.filter(a => a !== null).length / TOTAL_QUESTIONS) * 100}%`
          }}
        />
      </span>
    </div>
  );

  // --- Resume ---------------------------------------------------------------
  if (phase === "idle" && resumable) {
    return (
      <>
        {progress}
        <div className='dxBody dxResume'>
          <p className='dxResume__text'>{diagnosticIntro.resume}</p>
          <div className='dxResume__actions'>
            <button type='button' className='btn' onClick={onResume}>
              {diagnosticIntro.resumeAction}
            </button>
            <button type='button' className='btn2' onClick={onRestart}>
              {diagnosticIntro.restartAction}
            </button>
          </div>
        </div>
      </>
    );
  }

  // --- Halfway --------------------------------------------------------------
  if (phase === "halfway") {
    return (
      <>
        {progress}
        <div
          key='halfway'
          className={`${bodyClass} dxHalfway`}
          role='status'
          ref={halfwayRef}
          tabIndex={-1}
        >
          <p className='dxHalfway__eyebrow'>{halfway.eyebrow}</p>
          <p className='dxHalfway__heading'>{halfway.heading}</p>
          <p className='dxHalfway__body'>{halfway.body}</p>
        </div>
      </>
    );
  }

  // --- A question -----------------------------------------------------------
  const onPointerChoice = (index: number) => (event: MouseEvent) => {
    if (event.detail === 0) return; // a keyboard-caused click
    onChoose(index, true);
  };

  const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onNext();
    }
  };

  const railStyle = {
    "--dx-sel": selected ?? 0
  } as CSSProperties;

  return (
    <>
      {progress}

      <div key={`q-${step}`} className={bodyClass}>
        {/* Outside the fieldset: a legend must be its first child. */}
        <p className='dxQuestion__meta'>
          {pad(position)} / {TOTAL_QUESTIONS} — {dimensionsById[current].name}
        </p>

        <fieldset
          className={selected === null ? "dxQuestion" : "dxQuestion has-answer"}
          aria-describedby='dx-rail-help'
        >
          <legend
            className='dxQuestion__prompt'
            ref={questionRef}
            tabIndex={-1}
          >
            {question.prompt}
          </legend>

          <p id='dx-rail-help' className='dx-sr'>
            {diagnosticIntro.railHelp}
          </p>

          <div className='dxRail' style={railStyle}>
            <span className='dxRail__end dxRail__end--less' aria-hidden='true'>
              {diagnosticIntro.railLess}
            </span>

            <div className='dxRail__stops'>
              {question.options.map((option, index) => (
                <label
                  key={option}
                  className={
                    selected === index ? "dxRail__stop is-on" : "dxRail__stop"
                  }
                  onClick={onPointerChoice(index)}
                >
                  <input
                    type='radio'
                    className='dxRail__input'
                    // The step is in the name so returning to a question does
                    // not inherit another group's checked state.
                    name={`dx-${step}`}
                    value={index}
                    checked={selected === index}
                    onChange={() => onChoose(index, false)}
                    onKeyDown={onKey}
                  />
                  <span className='dxRail__text'>{option}</span>
                </label>
              ))}
            </div>

            <span className='dxRail__end dxRail__end--more' aria-hidden='true'>
              {diagnosticIntro.railMore}
            </span>
          </div>
        </fieldset>

        <div className='dxNav'>
          {step > 0 && (
            <button type='button' className='dxNav__action' onClick={onBack}>
              ← {diagnosticIntro.back}
            </button>
          )}
          {returning && (
            <button
              type='button'
              className='dxNav__action'
              onClick={onBackToResults}
            >
              {diagnosticIntro.backToResults}
            </button>
          )}
          <button
            type='button'
            className='dxNav__action dxNav__action--next'
            onClick={onNext}
            disabled={selected === null}
          >
            {diagnosticIntro.next} →
          </button>
        </div>

        {phase === "idle" && (
          <p className='dxBody__assurance'>{diagnosticIntro.assurance}</p>
        )}
      </div>
    </>
  );
};

export default DiagnosticStage;
