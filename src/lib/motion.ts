"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type RefObject
} from "react";

// The questions every moving part on the site asks before it moves.
//
// 28 Sep 2026, the creative transformation brief. Motion stopped being a short
// list of registered exceptions and became part of the home page's design, so
// the checks each component used to write for itself live here once. The rule
// they enforce is the brief's: nothing is hidden waiting for an animation, and
// the page reads completely with motion off.

const REDUCE = "(prefers-reduced-motion: reduce)";

const subscribeReduce = (onChange: () => void) => {
  const query = window.matchMedia(REDUCE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** True when the visitor has asked for less motion. False on the server, so
 *  the markup the server sends is always the finished, motionless state — an
 *  animation opts in afterwards, never the other way round. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE).matches,
    () => false
  );
}

const noSubscription = () => () => {};

/** False on the server and during hydration, true after. For state that may
 *  only be applied on a client — "this figure is about to animate" — and must
 *  never be in the server's HTML. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noSubscription,
    () => true,
    () => false
  );
}

/** Whether `ref` is on screen.
 *
 *  `once` latches true the first time it enters, for effects the brief says
 *  play a single time. Without it the value follows the element, which is
 *  what a continuous drawing needs so it can stop spending frames while
 *  nobody can see it. A browser with no IntersectionObserver is told
 *  everything is on screen, which is the state that shows everything. */
export function useInView(
  ref: RefObject<Element | null>,
  { once = false, margin = "0px 0px -15% 0px" } = {}
): boolean {
  const [inView, setInView] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once, margin]);

  return inView;
}

/** A design token read at runtime, for the one kind of drawing CSS cannot
 *  colour: a canvas. The token gate bars colour literals anywhere in src/, and
 *  it is right to — so a canvas asks the stylesheet what its colours are
 *  rather than carrying a second copy of the palette. */
export function readToken(el: Element, name: string): string {
  return getComputedStyle(el).getPropertyValue(name).trim();
}
