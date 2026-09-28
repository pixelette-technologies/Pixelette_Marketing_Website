"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type {
  EvidenceProgression,
  EvidenceTotal
} from "@/data/results/caseStudies";
import { useReducedMotion } from "@/lib/motion";

// The figures in "Proof, not promises". 28 Sep 2026.
//
// Two kinds of figure, drawn two ways, because they ARE two kinds:
//
//   PROGRESSIONS  a before and an after. Drawn as a track to scale: the "from"
//                 mark sits where the before value falls on a line that ends at
//                 the after value. 5 of 160 is three per cent of the way along,
//                 and that sliver IS the story — it is the one piece of honest
//                 data visualisation these numbers allow, because both ends are
//                 management's own figures.
//   TOTALS        campaign counts with no before. Large numerals, no track: a
//                 bar with no baseline would invent one.
//
// THE ANIMATION PLAYS ONCE, on first entering the viewport (brief, section 7).
// The server sends every figure at its final value and every track full, so
// no JavaScript, a reduce preference, or a figure already on screen at load
// all show the finished state. Only a figure the observer first reports as
// BELOW the viewport is wound back, out of sight, and played when it arrives.
//
// The moving digits are aria-hidden. Each figure's final value is also in the
// DOM once as real text, so a screen reader reads "160", never "83".

type Phase = "final" | "armed" | "play";

const DURATION = 1400;

/** The display string for a value mid-count, in the same format as the
 *  approved final string, so the figure never changes shape as it counts. */
function formatLike(display: string, value: number): string {
  if (/k$/i.test(display)) {
    const suffix = display.slice(-1);
    return `${(value / 1000).toFixed(1)}${suffix}`;
  }
  if (display.includes(",")) return Math.round(value).toLocaleString("en-GB");
  return String(Math.round(value));
}

function Count({
  from,
  to,
  display,
  phase
}: {
  from: number;
  to: number;
  display: string;
  phase: Phase;
}) {
  // Only the play phase has a moving value; the other two are derived.
  const [counted, setCounted] = useState(() => formatLike(display, from));

  useEffect(() => {
    if (phase !== "play") return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      // The last frame is the approved string itself, not a formatted
      // approximation of it.
      setCounted(t < 1 ? formatLike(display, from + (to - from) * eased) : display);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, from, to, display]);

  const text =
    phase === "final" ? display : phase === "armed" ? formatLike(display, from) : counted;

  return (
    <span className='count'>
      {/* The sizer holds the final string's width, so nothing moves while
          the digits change. */}
      <span className='count__sizer' aria-hidden='true'>
        {display}
      </span>
      <span className='count__live' aria-hidden='true'>
        {text}
      </span>
      <span className='sr-only'>{display}</span>
    </span>
  );
}

export default function ProofFigures({
  progressions,
  totals
}: {
  progressions: EvidenceProgression[];
  totals: EvidenceTotal[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("final");

  // One observer does both jobs. Its first report says where the figures are
  // at hydration: below the viewport means nobody has seen them, so they are
  // wound back; anywhere else and they stay final. Every later report that
  // finds them on screen plays them, once.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !("IntersectionObserver" in window)) return;

    let first = true;
    let armed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          const below = entry.boundingClientRect.top > (entry.rootBounds?.height ?? window.innerHeight);
          if (!entry.isIntersecting && below) {
            armed = true;
            setPhase("armed");
          } else {
            observer.disconnect();
          }
          return;
        }
        if (armed && entry.isIntersecting) {
          setPhase("play");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <div className='proofFigures' ref={ref} data-phase={phase}>
      <ul className='proofFigures__progressions'>
        {progressions.map(p => (
          <li key={p.label} className='progression'>
            <p className='progression__values'>
              <span className='progression__from'>{p.fromLabel}</span>
              <span className='progression__arrow' aria-hidden='true'>
                →
              </span>
              <span className='sr-only'>to</span>
              <span className='progression__to'>
                <Count from={p.from} to={p.to} display={p.toLabel} phase={phase} />
              </span>
            </p>
            <p className='progression__label'>{p.label}</p>
            <span
              className='progression__track'
              aria-hidden='true'
              style={{ "--from": p.from / p.to } as CSSProperties}
            >
              <span className='progression__fill' />
              <span className='progression__mark' />
            </span>
          </li>
        ))}
      </ul>

      <ul className='proofFigures__totals'>
        {totals.map(t => (
          <li key={t.label} className='total'>
            <span className='total__value'>
              <Count from={0} to={t.value} display={t.display} phase={phase} />
            </span>
            <span className='total__label'>{t.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
