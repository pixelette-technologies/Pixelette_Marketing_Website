"use client";

import { useEffect, useRef, useState } from "react";

// BlockGuard's five figures, counted once as they come into view. 30 Sep 2026.
//
// THE FINAL VALUES ARE THE SERVER'S HTML. Nothing is zeroed that is not also,
// in the same pass, handed to a live observer — the ScrollReveal rule — and
// nothing is zeroed that is already on screen. So no JavaScript, reduced
// motion, a missing IntersectionObserver or a reload half-way down the page
// all show the finished numbers and nothing moves.
//
// ONE SEQUENCE, UNDER 1.2 SECONDS: each figure counts for 900ms on an ease-out,
// the five starting 60ms apart, then it stops and the text is set back to the
// case study's own string, character for character. No odometer, no loop.
//
// A screen reader never hears a number mid-count: the moving digits are
// aria-hidden and a visually hidden copy holds the final value.

export interface Figure {
  /** The before value, where the case study gives one. Not counted. */
  from?: string;
  /** The case study's value, exactly as published. */
  to: string;
  label: string;
}

const DURATION = 900;
const STAGGER = 60;

interface Parsed {
  value: number;
  decimals: number;
  grouped: boolean;
  suffix: string;
}

// "160", "16.9k", "2,435". Anything else is shown as given and never counted.
const parse = (text: string): Parsed | null => {
  const match = /^([\d,]+(?:\.(\d+))?)([a-zA-Z]*)$/.exec(text);
  if (!match) return null;
  return {
    value: Number(match[1].replace(/,/g, "")),
    decimals: match[2]?.length ?? 0,
    grouped: match[1].includes(","),
    suffix: match[3]
  };
};

const format = (n: number, p: Parsed) =>
  n.toLocaleString("en-GB", {
    minimumFractionDigits: p.decimals,
    maximumFractionDigits: p.decimals,
    useGrouping: p.grouped
  }) + p.suffix;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function FigureReveal({ figures }: { figures: Figure[] }) {
  const list = useRef<HTMLUListElement>(null);
  // null means "show the published values", which is also the server's state.
  const [shown, setShown] = useState<string[] | null>(null);

  useEffect(() => {
    const node = list.current;
    if (!node || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    const parsed = figures.map(figure => parse(figure.to));
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        let done = true;
        const next = figures.map((figure, i) => {
          const p = parsed[i];
          if (!p) return figure.to;
          const t = Math.min(
            1,
            Math.max(0, (now - start - i * STAGGER) / DURATION)
          );
          if (t < 1) done = false;
          return t < 1 ? format(p.value * easeOut(t), p) : figure.to;
        });
        setShown(done ? null : next);
        if (!done) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    setShown(
      figures.map((figure, i) => (parsed[i] ? format(0, parsed[i]) : figure.to))
    );
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [figures]);

  return (
    <ul className='workFigures' ref={list}>
      {figures.map((figure, i) => (
        <li
          key={figure.label}
          className={`workFigures__item${figure.from ? " workFigures__item--change" : ""}`}
        >
          <span className='workFigures__value'>
            <span className='workFigures__sr'>
              {figure.from ? `From ${figure.from} to ${figure.to}` : figure.to}
            </span>
            {figure.from && (
              <span className='workFigures__from' aria-hidden='true'>
                {figure.from}
                <span className='workFigures__arrow'>→</span>
              </span>
            )}
            <span className='workFigures__to' aria-hidden='true'>
              {shown ? shown[i] : figure.to}
            </span>
          </span>
          <span className='workFigures__label'>{figure.label}</span>
        </li>
      ))}
    </ul>
  );
}
