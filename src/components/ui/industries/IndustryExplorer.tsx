"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { industries, industryLabels } from "@/data/industries/industries";
import MarketJourney from "./MarketJourney";

// /industries, chapter 02: the eight-market explorer. 30 Sep 2026, to the final
// Industries brief.
//
// DIFFERENT MARKET → DIFFERENT BUYING JOURNEY → DIFFERENT MARKETING THINKING.
// One selector, one panel, and the Market journey as the panel's visual. No
// icons, no imagery and no card grid: the interaction is the picture.
//
// A WAI-ARIA TABLIST with automatic activation. Click, tap and keyboard select
// (arrows, Home, End). NOTHING SELECTS ON HOVER any more — the brief bars
// depending on hover, and a hover select replayed the journey every time a
// mouse crossed the list. Hover is a colour change and nothing else.
//
// ALL EIGHT PANELS ARE IN THE HTML, stacked in one grid cell. The inactive
// seven are visibility: hidden, which takes them out of the accessibility tree
// and the tab order as `hidden` did, but lets two panels overlap for the
// crossfade and holds the frame at the tallest panel's height, so the section
// below never jumps between markets. A crawler and a reader without
// JavaScript still get the whole page; Technology & Innovation shows first.
//
// THE MOTION IS ONE SEQUENCE, about 600ms, run once per selection:
//   1. the left highlight slides to the new market (desktop)
//   2–3. the name, descriptor and three points crossfade
//   4–5. the new journey's labels arrive and the signal travels its five stages
// then it stops. data-journey is "armed" until the explorer is first on screen,
// so the first journey plays where it can be seen rather than off-screen at
// load. Every motion rule sits under prefers-reduced-motion: no-preference, so
// with reduced motion the states change and nothing travels.

type JourneyState = "armed" | "play";

export default function IndustryExplorer() {
  const [active, setActive] = useState(0);
  const [journey, setJourney] = useState<JourneyState | undefined>();
  const [bar, setBar] = useState<{ top: number; height: number } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arm the first journey, and play it when the explorer is first in view.
  useEffect(() => {
    const node = root.current;
    if (!node || !("IntersectionObserver" in window)) return;
    setJourney(state => state ?? "armed");
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setJourney("play");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The sliding highlight. Measured, not computed, because a long name can
  // wrap and make its row taller than the rest.
  useEffect(() => {
    const container = list.current;
    if (!container) return;
    const measure = () => {
      const tab = tabs.current[active];
      if (tab) setBar({ top: tab.offsetTop, height: tab.offsetHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [active]);

  const select = (index: number, focus = false) => {
    const next = (index + industries.length) % industries.length;
    setJourney("play");
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: industries.length - 1
    };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key], true);
    }
  };

  return (
    <div className='marketExplorer' ref={root} data-journey={journey}>
      <div
        className='marketExplorer__list'
        ref={list}
        role='tablist'
        aria-label='Eight markets'
        aria-orientation='vertical'
        data-indicator={bar ? "" : undefined}
      >
        {bar && (
          <span
            className='marketExplorer__bar'
            aria-hidden='true'
            style={{
              transform: `translateY(${bar.top}px)`,
              height: bar.height
            }}
          />
        )}
        {industries.map((industry, index) => {
          const selected = index === active;
          return (
            <button
              key={industry.id}
              ref={node => {
                tabs.current[index] = node;
              }}
              type='button'
              role='tab'
              id={`market-tab-${industry.id}`}
              aria-selected={selected}
              aria-controls={`market-panel-${industry.id}`}
              tabIndex={selected ? 0 : -1}
              className='marketExplorer__tab'
              onClick={() => select(index)}
              onKeyDown={onKeyDown}
            >
              <span className='marketExplorer__index' aria-hidden='true'>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className='marketExplorer__name'>{industry.name}</span>
            </button>
          );
        })}
      </div>

      <div className='marketExplorer__stage'>
        {industries.map((industry, index) => {
          const selected = index === active;
          return (
            <section
              key={industry.id}
              role='tabpanel'
              id={`market-panel-${industry.id}`}
              aria-labelledby={`market-tab-${industry.id}`}
              tabIndex={selected ? 0 : -1}
              className={`marketPanel${selected ? " is-active" : ""}`}
            >
              <header className='marketPanel__head'>
                <h3 className='marketPanel__name'>{industry.name}</h3>
                <p className='marketPanel__descriptor'>{industry.descriptor}</p>
              </header>

              <MarketJourney id={industry.id} stages={industry.journey} />

              <dl className='marketPanel__points'>
                {(["market", "challenge", "approach"] as const).map(key => (
                  <div className='marketPanel__point' key={key}>
                    <dt className='marketPanel__label'>
                      {industryLabels[key]}
                    </dt>
                    <dd className='marketPanel__text'>{industry[key]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>
    </div>
  );
}
