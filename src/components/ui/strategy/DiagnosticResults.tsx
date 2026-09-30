"use client";

import {
  bands,
  dimensionReadings,
  dimensionsById,
  recommendations,
  resultsCopy
} from "@/data/strategy";
import {
  QUESTIONS_PER_DIMENSION,
  type DiagnosticScore,
  type DimensionId,
  tierFor
} from "@/lib/strategyDiagnostic";
import { type CSSProperties, type RefObject, useEffect, useState } from "react";

// The result. Everything here is derived from `score`, which is computed in
// `src/lib/strategyDiagnostic.ts` — this component decides nothing.
//
// WHAT CHANGES WITH THE ANSWERS, per the final brief (30 Sep 2026):
//   - the band, its headline and its narrative follow the overall score
//     (BAND_FLOORS: 0 / 40 / 60 / 80);
//   - each dimension's reading follows ITS OWN score (TIER_FLOORS: low below
//     45, medium 45-74, high 75+);
//   - the three dimensions in "What this could mean commercially" and "Your
//     three highest-leverage moves" are `score.focus`, the three lowest, the
//     same selection "Where to focus next" always used.
//
// THE REVEAL is a sequence, not a dump: the score counts up (800ms), then the
// band, the headline, the profile (each marker travels from "Unclear" to its
// place) and the reading, on staggered CSS delays. It runs only for a result
// the visitor has just reached, never for one restored from storage, and not
// at all under reduced motion. The final values are in the markup from the
// first frame; the animation only withholds them visually, and the score's
// real value is always in the accessible text.

interface DiagnosticResultsProps {
  score: DiagnosticScore;
  headingRef: RefObject<HTMLHeadingElement | null>;
  reveal: boolean;
  onReopen: (index: number) => void;
}

const COUNT_DELAY = 250;
const COUNT_MS = 800;

/** 0 up to `value`, easing out. Renders the final value when not animating. */
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

/** A staggered reveal delay, as a custom property the stylesheet reads. */
const at = (ms: number, extra?: CSSProperties) =>
  ({ "--d": `${ms}ms`, ...extra }) as CSSProperties;

const pad = (n: number) => String(n).padStart(2, "0");

const DiagnosticResults = ({
  score,
  headingRef,
  reveal,
  onReopen
}: DiagnosticResultsProps) => {
  const band = bands[score.band];
  const shown = useCountUp(score.overall, reveal);
  const percentOf = (id: DimensionId) =>
    score.dimensions.find(d => d.id === id)?.percentage ?? 0;

  return (
    <div className={reveal ? "dxResults is-revealing" : "dxResults"}>
      {/* --- The diagnosis ------------------------------------------------ */}
      <div className='dxVerdict'>
        <p className='dxVerdict__eyebrow dxR' style={at(0)}>
          {resultsCopy.eyebrow}
        </p>

        <p className='dxVerdict__score'>
          <span className='dxVerdict__number' aria-hidden='true'>
            {shown}
          </span>
          <span className='dx-sr'>
            {score.overall} out of {resultsCopy.outOf}
          </span>
          <span className='dxVerdict__outOf' aria-hidden='true'>
            / {resultsCopy.outOf}
          </span>
        </p>

        <p className='dxVerdict__band dxR' style={at(1000)}>
          {band.label}
        </p>

        <h3
          className='dxVerdict__headline dxR'
          style={at(1150)}
          ref={headingRef}
          tabIndex={-1}
        >
          {band.headline}
        </h3>

        <p className='dxVerdict__narrative dxR' style={at(1300)}>
          {band.narrative}
        </p>
      </div>

      {/* --- Your clarity profile ----------------------------------------- */}
      <div className='dxProfile dxR' style={at(1500)}>
        <h3 className='dxSection__heading'>{resultsCopy.profileHeading}</h3>

        <ul className='dxProfile__list'>
          {score.dimensions.map((dimension, i) => (
            <li
              key={dimension.id}
              className='dxSpectrum'
              style={at(1600 + i * 90, {
                "--pos": `${dimension.percentage}%`
              } as CSSProperties)}
            >
              <span className='dxSpectrum__name'>
                {dimensionsById[dimension.id].name}
              </span>
              <span className='dxSpectrum__end dxSpectrum__end--lo' aria-hidden='true'>
                {resultsCopy.profileLow}
              </span>
              <span className='dxSpectrum__track' aria-hidden='true'>
                <span className='dxSpectrum__marker' />
              </span>
              <span className='dxSpectrum__end dxSpectrum__end--hi' aria-hidden='true'>
                {resultsCopy.profileHigh}
              </span>
              <span className='dxSpectrum__value'>
                {dimension.percentage}
                <span className='dx-sr'> out of 100</span>
              </span>
            </li>
          ))}
        </ul>

        <p className='dxProfile__note'>
          {score.uniform ? `${resultsCopy.uniformNote} ` : ""}
          {resultsCopy.scaleNote}
        </p>
      </div>

      {/* --- What this could mean commercially ---------------------------- */}
      <div className='dxCommercial dxR' style={at(2500)}>
        <h3 className='dxSection__heading'>{resultsCopy.commercialHeading}</h3>
        <p className='dxSection__lead'>{resultsCopy.commercialLead}</p>

        <ul className='dxCommercial__list'>
          {score.focus.map(id => {
            const percent = percentOf(id);
            const reading = dimensionReadings[id][tierFor(percent)];
            return (
              <li key={id} className='dxReading'>
                <p className='dxReading__eyebrow'>
                  {dimensionsById[id].name} — {percent}
                </p>
                <h4 className='dxReading__headline'>{reading.headline}</h4>
                <p className='dxReading__body'>{reading.body}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* --- Your three highest-leverage moves ---------------------------- */}
      <div className='dxMoves dxR' style={at(2700)}>
        <h3 className='dxSection__heading'>{resultsCopy.movesHeading}</h3>
        <p className='dxSection__lead'>{resultsCopy.movesLead}</p>

        <ol className='dxMoves__list'>
          {score.focus.map((id, position) => {
            const dimension = dimensionsById[id];
            const move = recommendations[id];
            // The first of this dimension's two questions, so a visitor can
            // go straight back to the pair that produced it.
            const firstQuestion =
              (Number(dimension.index) - 1) * QUESTIONS_PER_DIMENSION;
            return (
              <li key={id} className='dxMove'>
                <p className='dxMove__index'>
                  {pad(position + 1)}
                  <span className='dxMove__dimension'> — {dimension.name}</span>
                </p>
                <div className='dxMove__main'>
                  <h4 className='dxMove__title'>{move.title}</h4>
                  <p className='dxMove__body'>{move.body}</p>
                  <button
                    type='button'
                    className='dxMove__revisit'
                    onClick={() => onReopen(firstQuestion)}
                  >
                    Revisit the {dimension.name.toLowerCase()} questions
                  </button>
                </div>
              </li>
            );
          })}
        </ol>

        {/* The browser's own print dialogue; the print stylesheet makes the
            result worth printing. */}
        <button
          type='button'
          className='dxMove__revisit dxResults__print'
          onClick={() => window.print()}
        >
          {resultsCopy.print}
        </button>
      </div>
    </div>
  );
};

export default DiagnosticResults;
