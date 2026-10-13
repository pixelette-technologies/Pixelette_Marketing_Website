"use client";

import {
  useCallback,
  useEffect,
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

// 03 — Maquette interaction. Desktop: hover wakes the miniature world into a
// coordinated collaboration sequence, then settles; leave reverses smoothly.
// Touch: play once when the section enters the viewport and remain active.
// Reduced motion: static final composition, no movement.

type Phase = "rest" | "activating" | "active" | "returning";

const ACTIVATE_MS = 2400;
const RETURN_MS = 800;

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
  const arrived = useInView(rootRef, "0px 0px -25% 0px");
  const [phase, setPhase] = useState<Phase>("rest");

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

  // Reduced motion: always show the completed composition, never animate.
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

  // Mobile / coarse pointer: trigger once on viewport entry.
  useEffect(() => {
    if (!motion || fine || mobilePlayed.current || !arrived) return;
    mobilePlayed.current = true;
    activate();
  }, [arrived, fine, motion, activate]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const onEnter = () => {
    if (!fine || !motion) return;
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
    !motion ? "is-static" : ""
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
