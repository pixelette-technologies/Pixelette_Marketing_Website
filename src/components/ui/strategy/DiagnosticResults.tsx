"use client";

import {
  bands,
  dimensionsById,
  recommendations,
  resultsCopy,
  resultsCta
} from "@/data/strategy";
import {
  QUESTIONS_PER_DIMENSION,
  track,
  type DiagnosticScore,
  type DimensionId
} from "@/lib/strategyDiagnostic";
import Link from "next/link";
import { type CSSProperties, type RefObject, useEffect, useState } from "react";
import ImpactCompass from "./ImpactCompass";

// Results dashboard — clarity compass, dimension scores, impact roadmap.
// Every number and every recommendation comes from `score` (strategyDiagnostic).
// No registration gate. Discuss / Retake live here.

interface DiagnosticResultsProps {
  score: DiagnosticScore;
  headingRef: RefObject<HTMLHeadingElement | null>;
  reveal: boolean;
  onReopen: (index: number) => void;
  onRetake: () => void;
}

const COUNT_DELAY = 250;
const COUNT_MS = 800;

const useCountUp = (value: number, animate: boolean) => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let frame = 0;
    let begin = 0;
    const tick = (now: number) => {
      if (!begin) begin = now;
      const t = Math.min((now - begin - COUNT_DELAY) / COUNT_MS, 1);
      setShown(t <= 0 ? 0 : Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, animate]);

  return animate ? shown : value;
};

const at = (ms: number, extra?: CSSProperties) =>
  ({ "--d": `${ms}ms`, ...extra }) as CSSProperties;

const pad = (n: number) => String(n).padStart(2, "0");

const DiagnosticResults = ({
  score,
  headingRef,
  reveal,
  onReopen,
  onRetake
}: DiagnosticResultsProps) => {
  const band = bands[score.band];
  const shown = useCountUp(score.overall, reveal);

  return (
    <div className={reveal ? "dxResults is-revealing" : "dxResults"}>
      <header className='dxResults__header dxR' style={at(0)}>
        <h2
          className='dxResults__heading'
          ref={headingRef}
          tabIndex={-1}
        >
          {resultsCopy.heading}
        </h2>
        <p className='dxResults__lead'>{resultsCopy.lead}</p>
        <p className='dxResults__band'>
          {band.label} — {band.headline}
        </p>
      </header>

      <div className='dxResults__grid'>
        <div className='dxResults__compass dxR' style={at(200)}>
          <ImpactCompass
            variant='results'
            scores={score.dimensions}
            overall={shown}
            outOf={resultsCopy.outOf}
            overallCaption={resultsCopy.scoreCaption}
            className='impactCompass impactCompass--results'
          />
          <span className='dx-sr'>
            Overall score {score.overall} out of {resultsCopy.outOf}. {band.label}.
          </span>

          <ul className='dxScoreList'>
            {score.dimensions.map(dimension => (
              <li key={dimension.id} className='dxScoreList__item'>
                <span className='dxScoreList__dot' aria-hidden='true' />
                <span className='dxScoreList__name'>
                  {dimensionsById[dimension.id].name}
                </span>
                <span className='dxScoreList__value'>
                  {dimension.percentage}
                  <span className='dx-sr'> out of 100</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className='dxRoadmap dxR' style={at(400)}>
          <h3 className='dxRoadmap__heading'>{resultsCopy.roadmapHeading}</h3>

          {score.uniform && (
            <p className='dxRoadmap__note'>{resultsCopy.uniformNote}</p>
          )}

          <ol className='dxRoadmap__list'>
            {score.focus.map((id: DimensionId, position) => {
              const dimension = dimensionsById[id];
              const move = recommendations[id];
              const firstQuestion =
                (Number(dimension.index) - 1) * QUESTIONS_PER_DIMENSION;
              return (
                <li key={id} className='dxRoadmap__item'>
                  <span className='dxRoadmap__index' aria-hidden='true'>
                    {pad(position + 1)}
                  </span>
                  <div className='dxRoadmap__main'>
                    <h4 className='dxRoadmap__title'>{move.title}</h4>
                    <p className='dxRoadmap__body'>{move.body}</p>
                    <button
                      type='button'
                      className='dxRoadmap__revisit'
                      onClick={() => onReopen(firstQuestion)}
                    >
                      Revisit {dimension.name.toLowerCase()}
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className='dxRoadmap__actions'>
            <Link
              href={resultsCta.cta.to}
              className='btn dxRoadmap__discuss'
              onClick={() => track("strategy_diagnostic_cta_clicked")}
            >
              {resultsCta.cta.label}
            </Link>
            <button
              type='button'
              className='dxRoadmap__retake'
              onClick={onRetake}
            >
              {resultsCta.retake}
            </button>
          </div>
        </div>
      </div>

      <p className='dxResults__note dxR' style={at(600)}>
        {resultsCopy.scaleNote}
      </p>

      <button
        type='button'
        className='dxResults__print'
        onClick={() => window.print()}
      >
        {resultsCopy.print}
      </button>
    </div>
  );
};

export default DiagnosticResults;
