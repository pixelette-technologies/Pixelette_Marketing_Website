"use client";

import { RefObject, useEffect, useRef, useState } from "react";

// The motion plumbing for the Growth Intelligence view. Everything here is a
// ONE-SHOT: a reveal that happens once, a tween that runs to its target and
// stops. Nothing loops, polls or simulates live data — after a transition the
// view is still, which the brief requires.

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** "static": server render, no JS, or reduced motion — draw the final state.
 *  "armed":  JS is up and the element has not been seen — hold the marks at
 *            their start (undrawn lines, empty bars, zeroed figures).
 *  "shown":  seen once — play the entrance, then never again. */
export type RevealPhase = "static" | "armed" | "shown";

export function useRevealOnce(
  ref: RefObject<Element | null>,
  reduced: boolean
): RevealPhase {
  const [phase, setPhase] = useState<RevealPhase>("static");

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !("IntersectionObserver" in window)) return;

    setPhase("armed");
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          // A frame after arming, so the start state has painted and the
          // transition has something to run from.
          requestAnimationFrame(() => setPhase("shown"));
          observer.disconnect();
        }
      },
      // Not a visibility ratio: on a phone the view is several screens
      // tall, so no ratio above zero is ever reached. Its top a fifth of
      // the way up the screen is the trigger instead.
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
    // Arm once. A later reduce preference is handled by the CSS, which drops
    // every transition, so re-running this would only replay the entrance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return reduced ? "static" : phase;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Moves an array of numbers to a new target over `duration`, then stops.
 *  It restarts ONLY when the target changes, reading `animate` at that
 *  moment: false jumps. Arrays of different length jump too. */
export function useTween(
  target: number[],
  duration: number,
  animate: boolean
): number[] {
  const [current, setCurrent] = useState(target);
  const from = useRef(target);
  const frame = useRef(0);
  const key = target.join(",");

  useEffect(() => {
    cancelAnimationFrame(frame.current);
    const start = from.current;
    if (!animate || start.length !== target.length) {
      from.current = target;
      setCurrent(target);
      return;
    }
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const e = easeOutCubic(t);
      const next = target.map((value, i) => start[i] + (value - start[i]) * e);
      from.current = next;
      setCurrent(next);
      if (t < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
    // `key` stands in for `target`, whose identity changes every render, and
    // `animate` is deliberately read only when the target moves: a flag
    // flipping mid-tween must not cut the tween short.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, duration]);

  return current;
}

/** The rendered width of an element, so an svg can be drawn at its real
 *  pixel size and its text stays legible at 360px as well as at 1440px. */
export function useElementWidth(
  ref: RefObject<Element | null>,
  fallback: number
): number {
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(entries => {
      const next = Math.round(entries[0].contentRect.width);
      if (next > 0) setWidth(next);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return width;
}
