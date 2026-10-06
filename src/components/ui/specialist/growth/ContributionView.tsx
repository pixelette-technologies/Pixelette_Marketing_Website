"use client";

import type { GrowthMix } from "@/data/services/specialist/growthIntelligenceDemo";
import { useId } from "react";
import type { RevealPhase } from "./hooks";

// The contribution ring. Four segments in the fixed source order and the
// fixed brand order — burgundy, pink, warm grey, blush — so a source keeps
// its colour across modes. The ring is a restrained summary; the legend
// beside it carries every label AND value in text, which is what the palette
// needs (its adjacent pairs sit in the colour-blind floor band, so they are
// never the only signal). A 2-unit surface gap separates segments.
//
// The caveat under it is part of the figure, not small print: contribution is
// an estimate and the ring must not imply perfect attribution.
//
// Built on the circumference-100 circle, so a segment's dash IS its
// percentage and a mode change is a CSS transition of dasharray and offset.

const R = 15.9155; // 2πr = 100
const GAP = 1.2;

interface ContributionViewProps {
  mix: GrowthMix;
  phase: RevealPhase;
}

const ContributionView = ({ mix, phase }: ContributionViewProps) => {
  const titleId = useId();
  // Start at 12 o'clock and run clockwise: each segment is offset by the sum
  // of the ones before it.
  const segments = mix.items.map((item, index) => ({
    ...item,
    index,
    length: Math.max(0, item.value - GAP),
    offset:
      25 - mix.items.slice(0, index).reduce((sum, prev) => sum + prev.value, 0)
  }));

  return (
    <figure className='giMix' data-phase={phase}>
      <figcaption className='giMix__caption'>
        <span className='giFigure__title' id={titleId}>
          {mix.title}
        </span>
      </figcaption>
      <div className='giMix__body'>
        <svg
          className='giMix__ring'
          viewBox='0 0 42 42'
          role='img'
          aria-labelledby={titleId}
          aria-describedby={`${titleId}-legend`}
        >
          <circle cx='21' cy='21' r={R} className='giMix__track' />
          {segments.map(segment => (
            <circle
              key={segment.label}
              cx='21'
              cy='21'
              r={R}
              className={`giMix__segment giMix__segment--${segment.index}`}
              style={{
                strokeDasharray: `${segment.length} ${100 - segment.length}`,
                strokeDashoffset: segment.offset
              }}
            />
          ))}
        </svg>
        <ul className='giMix__legend' id={`${titleId}-legend`}>
          {segments.map(segment => (
            <li className='giMix__item' key={segment.label}>
              <span
                className={`giMix__swatch giMix__swatch--${segment.index}`}
                aria-hidden='true'
              />
              <span className='giMix__label'>{segment.label}</span>
              <span className='giMix__value'>{segment.value}%</span>
            </li>
          ))}
        </ul>
      </div>
      <p className='giMix__note'>{mix.note}</p>
    </figure>
  );
};

export default ContributionView;
