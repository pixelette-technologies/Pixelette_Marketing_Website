"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode
} from "react";
import {
  useFinePointer,
  useInView,
  useMotionAllowed
} from "@/lib/useInView";

// 03 — Maquette interaction.
// Entrance: one-shot layered fade-in when the scene first enters view
// (forms → props → people). Desktop hover then wakes the collaboration
// sequence; leave reverses. Touch plays collaboration once after the
// entrance finishes. Reduced motion: full composition, no movement.

type Phase = "rest" | "activating" | "active" | "returning";

const ACTIVATE_MS = 2400;
const RETURN_MS = 800;
/** Last person delay (1920ms) + fade (950ms), plus a short beat. */
const REVEAL_SETTLE_MS = 3000;

export default function MaquetteSceneMotion({
  className,
  style,
  children
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const mobilePlayed = useRef(false);
  const motion = useMotionAllowed();
  const fine = useFinePointer();
  const arrived = useInView(rootRef, "0px 0px -20% 0px");
  const [phase, setPhase] = useState<Phase>("rest");
  const [revealArmed, setRevealArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const activate = useCallback(() => {
    if (!motion) return;
    clearTimers();
    setPhase("activating");
    const id = window.setTimeout(() => setPhase("active"), ACTIVATE_MS);
    timers.current.push(id);
  }, [clearTimers, motion]);

  const deactivate = useCallback(() => {
    if (!motion) return;
    clearTimers();
    setPhase(prev => (prev === "rest" ? "rest" : "returning"));
    const id = window.setTimeout(() => setPhase("rest"), RETURN_MS);
    timers.current.push(id);
  }, [clearTimers, motion]);

  // Read reduced-motion in layout so we can hide layers before paint when
  // the entrance will run — avoids a full-opaque flash then vanish.
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealArmed(false);
      setRevealed(true);
      return;
    }
    setRevealArmed(true);
  }, []);

  // Reduced motion: settled composition, no collaboration movement.
  useEffect(() => {
    if (!motion) {
      clearTimers();
      setPhase("active");
      return;
    }
    if (!fine && !mobilePlayed.current) {
      setPhase("rest");
    }
  }, [motion, fine, clearTimers]);

  // First time on screen: run the layered fade-in once.
  useEffect(() => {
    if (!revealArmed || !arrived || revealed) return;
    setRevealed(true);
  }, [revealArmed, arrived, revealed]);

  // Mobile / coarse pointer: collaboration once, after the entrance settles.
  useEffect(() => {
    if (!motion || fine || mobilePlayed.current || !arrived || !revealed) {
      return;
    }
    const id = window.setTimeout(() => {
      mobilePlayed.current = true;
      activate();
    }, REVEAL_SETTLE_MS);
    timers.current.push(id);
    return () => window.clearTimeout(id);
  }, [arrived, revealed, fine, motion, activate]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const onEnter = () => {
    if (!fine || !motion || !revealed) return;
    activate();
  };

  const onLeave = () => {
    if (!fine || !motion) return;
    deactivate();
  };

  const isLit = phase === "activating" || phase === "active";
  const classes = [
    className,
    isLit ? "is-active" : "",
    phase === "returning" ? "is-returning" : "",
    !motion ? "is-static" : "",
    revealArmed ? "is-reveal-armed" : "",
    revealed ? "is-revealed" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={classes}
      style={style}
      data-maquette={phase}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
