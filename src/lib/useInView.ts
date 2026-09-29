"use client";

import { useEffect, useState, type RefObject } from "react";

// Two small hooks for the home page's moving illustrations (28 Sep 2026),
// lifted from the pattern ScrollMarquee already uses rather than invented:
//
//   - nothing moves while it is off screen or the tab is hidden, and
//   - nothing moves at all under prefers-reduced-motion.
//
// Both start FALSE, which is also what the server renders. Every moving
// section is therefore drawn in its resting, static arrangement first and
// only switches motion on after mount, so the no-JavaScript page and the
// reduced-motion page are the same picture and neither is a broken one.

/** True while the element is on screen (with a margin) AND the tab is
 *  visible. False on the server, before mount and without IntersectionObserver. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "25% 0px 25% 0px"
): boolean {
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) setOnScreen(entry.isIntersecting);
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return onScreen && tabVisible;
}

/** True when motion is allowed: mounted, and the visitor has NOT asked for
 *  reduced motion. Tracks the preference live. */
export function useMotionAllowed(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAllowed(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return allowed;
}

/** True on a device with a fine pointer that can hover, the only place the
 *  pointer-proximity responses run. */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return fine;
}
