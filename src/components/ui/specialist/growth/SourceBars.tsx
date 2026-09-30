"use client";

import {
  formatNumber,
  type GrowthBars
} from "@/data/services/specialist/growthIntelligenceDemo";
import type { RevealPhase } from "./hooks";

// The supporting bars: one measure by source. HTML, not svg — a list whose
// every value is printed as text beside its bar, so nothing is read off the
// bar length alone. The bars the insight is about are pink AND tagged "In
// focus" in words. The same four sources sit in the same rows in every mode,
// so a mode change grows or shrinks each bar in place (600ms, CSS).

interface SourceBarsProps {
  bars: GrowthBars;
  phase: RevealPhase;
}

const SourceBars = ({ bars, phase }: SourceBarsProps) => {
  const max =
    bars.max ?? Math.max(...bars.items.map(item => item.value)) * 1.15;

  return (
    <figure className='giBars' data-phase={phase}>
      <figcaption className='giBars__caption'>
        <span className='giFigure__title'>{bars.title}</span>
        <span className='giFigure__unit'>{bars.unitNote}</span>
      </figcaption>
      <ul className='giBars__list'>
        {bars.items.map(item => {
          const focus = bars.focus.includes(item.label);
          return (
            <li
              key={item.label}
              className={focus ? "giBars__row is-focus" : "giBars__row"}
            >
              <span className='giBars__label'>
                {item.label}
                {focus && <span className='giBars__tag'>In focus</span>}
              </span>
              <span className='giBars__track' aria-hidden='true'>
                <span
                  className='giBars__fill'
                  style={{
                    transform: `scaleX(${Math.min(1, item.value / max)})`
                  }}
                />
              </span>
              <span className='giBars__value'>
                {formatNumber(item.value, bars.format)}
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
};

export default SourceBars;
