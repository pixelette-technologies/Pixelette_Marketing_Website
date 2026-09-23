"use client";

import { Heading, Text } from "@/components/feature";
import {
  QUESTIONS_PER_DIMENSION,
  type DiagnosticScore,
  track
} from "@/lib/strategyDiagnostic";
import {
  bands,
  dimensionsById,
  recommendations,
  resultsCopy,
  resultsCta
} from "@/data/strategy";
import Link from "next/link";
import { Dispatch, FC, RefObject, SetStateAction } from "react";

export interface DiagnosticResultsProps {
  score: DiagnosticScore;
  headingRef: RefObject<HTMLHeadingElement | null>;
  /** Back into a question, answers intact. */
  onReopen: (index: number) => void;
  onRestart: () => void;
  confirming: boolean;
  setConfirming: Dispatch<SetStateAction<boolean>>;
}

// The results. Everything here is derived from `score`, which is computed in
// `src/lib/strategyDiagnostic.ts` — this component decides nothing.
//
// SIX SCALES, NOT A DASHBOARD. Each dimension is a row with a name, a hairline
// track, a filled bar and the percentage as text. The number is rendered
// rather than left to the bar, because a figure whose value cannot be read is
// a figure people assume things about, and the caption underneath says in
// words what this one is. That is the same discipline the home page's growth
// figure holds to by carrying no axis, tick or value at all.
//
// THE BAR WIDTH IS THE ONLY INLINE STYLE, and it is a length. It cannot be
// expressed in a stylesheet because it is a per-visitor value, and the token
// gate's rule is about colour, which this is not.
//
// THE CTA COMES LAST, after the score, the breakdown and the recommendations.
// That ordering is the brief's and it is the only honest one: the page
// promises value before it asks for anything.

/** The dimension name for a row, from the id the score carries. */
const nameOf = (id: DiagnosticScore["strongest"]) => dimensionsById[id].name;

const DiagnosticResults: FC<DiagnosticResultsProps> = ({
  score,
  headingRef,
  onReopen,
  onRestart,
  confirming,
  setConfirming
}) => {
  const band = bands[score.band];

  return (
    <div className='diagnosticResults'>
      <div className='diagnostic__panel card-feature'>
        <Text className='eyebrow'>{resultsCopy.eyebrow}</Text>

        {/* A raw h4 rather than <Heading>: it takes a ref, which the shared
            component does not forward. The .h3 SCALE on an h4 ELEMENT is the
            house split — the section eyebrow is the h2 and the visual .h2 in
            DiagnosticSection is the h3. */}
        <h4
          className='h3 diagnosticResults__heading'
          ref={headingRef}
          tabIndex={-1}
        >
          {resultsCopy.heading}
        </h4>

        <div className='diagnosticScore'>
          <p className='diagnosticScore__value'>
            <span className='diagnosticScore__number'>{score.overall}</span>
            <span className='diagnosticScore__outOf'>
              {" / "}
              {resultsCopy.outOf}
            </span>
          </p>
          <div className='diagnosticScore__band'>
            <p className='diagnosticScore__label'>{band.label}</p>
            <Text className='body'>{band.body}</Text>
          </div>
        </div>

        <div className='diagnosticScales'>
          <Text className='label'>{resultsCopy.breakdownLabel}</Text>

          <ul className='diagnosticScales__list'>
            {score.dimensions.map(dimension => (
              <li key={dimension.id} className='diagnosticScales__row'>
                <span className='diagnosticScales__name'>
                  {dimensionsById[dimension.id].name}
                </span>{" "}
                <span className='diagnosticScales__track' aria-hidden='true'>
                  <span
                    className='diagnosticScales__fill'
                    style={{ width: `${dimension.percentage}%` }}
                  />
                </span>
                <span className='diagnosticScales__value'>
                  {dimension.percentage}%
                </span>
              </li>
            ))}
          </ul>

          <Text className='small diagnosticScales__note'>
            {resultsCopy.scaleNote}
          </Text>
        </div>

        {/* When every dimension scored the same, a strongest and a priority
            area would be the same one named twice. The lib flags it rather
            than leaving each consumer to work it out. */}
        {score.uniform ? (
          <Text className='body diagnosticResults__uniform'>
            {resultsCopy.uniformNote}
          </Text>
        ) : (
          <div className='diagnosticPeaks'>
            <div className='diagnosticPeaks__item'>
              <Text className='label'>{resultsCopy.strongestLabel}</Text>
              <Heading className='h4' level={5}>
                {nameOf(score.strongest)}
              </Heading>
            </div>
            <div className='diagnosticPeaks__item'>
              <Text className='label'>{resultsCopy.priorityLabel}</Text>
              <Heading className='h4 diagnosticPeaks__priority' level={5}>
                {nameOf(score.priority)}
              </Heading>
            </div>
          </div>
        )}
      </div>

      {/* --- Where to focus next ------------------------------------------ */}
      <div className='diagnosticFocus'>
        <Heading className='h3' level={4}>
          {resultsCopy.focusHeading}
        </Heading>
        <Text className='body'>{resultsCopy.focusLead}</Text>

        <ol className='diagnosticFocus__list'>
          {score.focus.map((id, position) => {
            const recommendation = recommendations[id];
            const dimension = dimensionsById[id];
            // Which of the twelve questions opened this dimension, so a
            // visitor can go straight back to the pair that produced it.
            const firstQuestion =
              (Number(dimension.index) - 1) * QUESTIONS_PER_DIMENSION;

            return (
              <li key={id} className='diagnosticFocus__item'>
                <Text className='diagnosticFocus__index'>
                  {String(position + 1).padStart(2, "0")}
                </Text>
                <div className='diagnosticFocus__main'>
                  <Text className='label'>{dimension.name}</Text>
                  <Heading className='h4' level={5}>
                    {recommendation.title}
                  </Heading>
                  <Text className='body'>{recommendation.body}</Text>
                  <button
                    type='button'
                    className='diagnosticFocus__revisit'
                    onClick={() => onReopen(firstQuestion)}
                  >
                    Revisit the {dimension.name.toLowerCase()} questions
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* --- The ask, only now -------------------------------------------- */}
      <div className='diagnosticCta'>
        <Heading className='h3' level={4}>
          {resultsCta.heading}
        </Heading>
        <Text className='body'>{resultsCta.body}</Text>
        <Link
          href={resultsCta.cta.to}
          className='btn'
          onClick={() => track("strategy_diagnostic_cta_clicked")}
        >
          {resultsCta.cta.label}
        </Link>
      </div>

      {/* --- Utilities ----------------------------------------------------- */}
      <div className='diagnosticUtility'>
        {confirming ? (
          <div className='diagnosticUtility__confirm' role='alertdialog'>
            <Text className='body diagnosticUtility__question'>
              {resultsCopy.restartConfirmQuestion}
            </Text>
            <Text className='small'>{resultsCopy.restartConfirmBody}</Text>
            <div className='diagnosticUtility__confirmActions'>
              <button type='button' className='btn2' onClick={onRestart}>
                {resultsCopy.restartConfirm}
              </button>
              <button
                type='button'
                className='btn-ghost'
                onClick={() => setConfirming(false)}
              >
                {resultsCopy.restartCancel}
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              type='button'
              className='diagnosticUtility__action'
              onClick={() => setConfirming(true)}
            >
              {resultsCopy.restart}
            </button>
            {/* The browser's own print dialogue, with a print stylesheet to
                make the page worth printing. No library, no PDF service. */}
            <button
              type='button'
              className='diagnosticUtility__action'
              onClick={() => window.print()}
            >
              {resultsCopy.print}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DiagnosticResults;
