"use client";

import {
  diagnosticIntro,
  diagnosticQuestions,
  dimensions,
  dimensionsById,
  halfway
} from "@/data/strategy";
import { TOTAL_QUESTIONS, type Answers } from "@/lib/strategyDiagnostic";
import type { KeyboardEvent, MouseEvent, RefObject } from "react";

// One question at a time with selectable answer tiles (Impact Compass Option 3).
// Five real radios — restyled as tiles — so focus, arrows and checked state
// stay native. Pointer advances after the lock; keyboard selects only until
// Enter / Continue. State lives in StrategyExperience.

type Phase = "idle" | "running" | "halfway" | "results";
type Motion = "still" | "locking" | "leaving";

interface DiagnosticStageProps {
  answers: Answers;
  step: number;
  phase: Phase;
  motion: Motion;
  animate: boolean;
  returning: boolean;
  questionRef: RefObject<HTMLLegendElement | null>;
  halfwayRef: RefObject<HTMLDivElement | null>;
  onChoose: (index: number, viaPointer: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  onBackToResults: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

const DiagnosticStage = ({
  answers,
  step,
  phase,
  motion,
  animate,
  returning,
  questionRef,
  halfwayRef,
  onChoose,
  onNext,
  onBack,
  onBackToResults
}: DiagnosticStageProps) => {
  const question = diagnosticQuestions[step];
  const current = question.dimension;
  const selected = answers[step];
  const position = step + 1;
  // Match the approved mock-up: bar tracks question position (e.g. 4/12 → 33%).
  const percent = Math.round((position / TOTAL_QUESTIONS) * 100);

  const bodyClass = [
    "dxBody",
    animate ? "is-entering" : "",
    motion === "leaving" ? "is-leaving" : "",
    motion === "locking" ? "is-locking" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const progress = (
    <div className='dxProgress'>
      <ol className='dxProgress__dimensions'>
        {dimensions.map(dimension => {
          const indices = diagnosticQuestions
            .map((q, i) => (q.dimension === dimension.id ? i : -1))
            .filter(i => i !== -1);
          const done = indices.every(i => answers[i] !== null);
          const asking = phase !== "halfway";
          const isCurrent = asking && dimension.id === current;
          const state = isCurrent ? "current" : done ? "done" : "todo";
          return (
            <li
              key={dimension.id}
              className={`dxProgress__dimension is-${state}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className='dxProgress__mark' aria-hidden='true'>
                {state === "done" ? "✓" : ""}
              </span>
              <span className='dxProgress__name'>{dimension.name}</span>
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

      <div className='dxProgress__meter'>
        <p className='dxProgress__count'>
          Question {pad(position)} / {pad(TOTAL_QUESTIONS)}
        </p>
        <div
          className='dxProgress__bar'
          role='progressbar'
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label={`${percent} percent complete`}
        >
          <span className='dxProgress__fill' style={{ width: `${percent}%` }} />
        </div>
        <span className='dxProgress__pct' aria-hidden='true'>
          {percent}%
        </span>
      </div>
    </div>
  );

  if (phase === "halfway") {
    return (
      <div className='dxShell'>
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
      </div>
    );
  }

  const onPointerChoice = (index: number) => (event: MouseEvent) => {
    if (event.detail === 0) return;
    onChoose(index, true);
  };

  const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onNext();
    }
  };

  return (
    <div className='dxShell'>
      {progress}

      <div key={`q-${step}`} className={bodyClass}>
        <p className='dxQuestion__meta'>
          <span className='dxQuestion__metaMark' aria-hidden='true' />
          {dimensionsById[current].name}
        </p>

        <fieldset
          className={selected === null ? "dxQuestion" : "dxQuestion has-answer"}
          aria-describedby='dx-tile-help'
        >
          <legend
            className='dxQuestion__prompt'
            ref={questionRef}
            tabIndex={-1}
          >
            {question.prompt}
          </legend>

          <p id='dx-tile-help' className='dx-sr'>
            {diagnosticIntro.tileHelp}
          </p>

          <div className='dxTiles'>
            {question.options.map((option, index) => (
              <label
                key={option}
                className={
                  selected === index ? "dxTile is-on" : "dxTile"
                }
                onClick={onPointerChoice(index)}
              >
                <input
                  type='radio'
                  className='dxTile__input'
                  name={`dx-${step}`}
                  value={index}
                  checked={selected === index}
                  onChange={() => onChoose(index, false)}
                  onKeyDown={onKey}
                />
                <span className='dxTile__check' aria-hidden='true'>
                  {selected === index ? "✓" : ""}
                </span>
                <span className='dxTile__text'>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className='dxNav'>
          {step > 0 && (
            <button type='button' className='dxNav__back' onClick={onBack}>
              {diagnosticIntro.back}
            </button>
          )}
          {returning && (
            <button
              type='button'
              className='dxNav__back'
              onClick={onBackToResults}
            >
              {diagnosticIntro.backToResults}
            </button>
          )}
          <button
            type='button'
            className='dxNav__next'
            onClick={onNext}
            disabled={selected === null}
          >
            {diagnosticIntro.next}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticStage;
