"use client";

import { useEffect, useRef, useState } from "react";
import { journeyCopy } from "@/data/home";
import { useMounted, useReducedMotion } from "@/lib/motion";

// THE COMMERCIAL JOURNEY — 28 Sep 2026, the creative transformation brief,
// section 10. Demand → Pipeline → Conversion → Revenue, as one line.
//
// It replaces the fifth growth figure — the ring of four cards beside a
// numbered list — which said the same four things twice, once in the list and
// once on the cards. Here each stage is said once, on a single line that
// connects them, and the line fills as the reader moves down the page, so
// Demand lights, then Pipeline, then Conversion, then Revenue.
//
// NOT SCROLL-JACKING. Nothing is pinned and the page scrolls at its own speed;
// the progress is read from where the section already is. The brief's own
// caution — "do not over-engineer this" — is why it is a scroll listener and
// a custom property rather than a timeline library.
//
// READABLE WITHOUT IT. The server renders every stage lit and the line full.
// The scroll mechanism only takes over on a client that allows motion, and
// even then an unlit stage keeps its text at the muted tone (5.78 on the
// page ground), so it is dimmer, never missing.
//
// ORIENTATION IS READ FROM THE LAYOUT, not from a breakpoint: horizontal when
// the track is wider than it is tall, vertical otherwise (brief, section 27 —
// desktop horizontal, mobile vertical).

export default function CommercialJourney() {
  const trackRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  // Armed means the scroll decides what is lit. Otherwise everything is.
  const armed = mounted && !reduce;
  const [progressLit, setLit] = useState(0);
  const lit = armed ? progressLit : journeyCopy.stages.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (reduce) {
      // A pass made before the preference was known may have wound the
      // line back; hand it the finished state.
      track.style.removeProperty("--journey");
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = track.getBoundingClientRect();
      const horizontal = rect.width > rect.height;
      const stations = Array.from(
        track.querySelectorAll<HTMLElement>(".journey__stage")
      );

      let progress: number;
      let count: number;

      if (horizontal) {
        // One pass across the row as it rises from the lower quarter of the
        // screen to a little above the middle.
        progress = (vh * 0.8 - rect.top) / (vh * 0.45);
        progress = Math.max(0, Math.min(1, progress));
        count = [0.08, 0.36, 0.64, 0.92].filter(t => progress >= t).length;
      } else {
        // Vertical: a stage lights as it crosses a reading line just below
        // the middle of the screen, and the line fills to that point.
        const line = vh * 0.62;
        progress = Math.max(0, Math.min(1, (line - rect.top) / rect.height));
        count = stations.filter(s => s.getBoundingClientRect().top < line).length;
      }

      track.style.setProperty("--journey", progress.toFixed(3));
      setLit(count);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  return (
    <ol
      className='journey__track'
      ref={trackRef}
      data-armed={armed || undefined}
    >
      {journeyCopy.stages.map((stage, i) => (
        <li
          key={stage.name}
          className={`journey__stage${i < lit ? " is-lit" : ""}`}
        >
          <span className='journey__node' aria-hidden='true' />
          <span className='journey__num' aria-hidden='true'>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h4 className='journey__name'>{stage.name}</h4>
          <p className='journey__line'>{stage.line}</p>
        </li>
      ))}
    </ol>
  );
}
