"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useInView, useMotionAllowed } from "@/lib/useInView";

// 03 — the brick scene's one scripted moment (29 Sep 2026, on instruction):
// when the section arrives, the two builders on the ladders climb in from the
// ladders' feet, rung by rung, and stop where the reference stands them.
//
// It wraps the scene's frame and only reads what BrickScene writes on each
// climber: `data-steps` (how many rungs up it stands) and `data-foot` (the
// offset from there down to the ladder's foot). The drawing itself stays a
// server component.
//
// Like the duck drop: the server and the reduced-motion page show the builders
// where they stand; with motion allowed they are held at the foot ("armed")
// until the section is properly in view, then climb once. The frame carries
// data-crew so the stylesheet can hold hover off until the climb is done.

const STEP_MS = 430; // one rung
const HOLD_MS = 120; // a beat on each rung
const LEFT_START_MS = 0;
const RIGHT_START_MS = 260; // the second builder a little behind the first

export default function BrickSceneMotion({
  className,
  style,
  children
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const arrived = useInView(rootRef, "0px 0px -30% 0px");
  const motion = useMotionAllowed();
  const played = useRef(false);
  const holds = useRef<Animation[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !motion || played.current) return;

    const climbers = Array.from(
      root.querySelectorAll<SVGGElement>(".crew--climb")
    ).map(el => {
      const [fx, fy] = (el.dataset.foot ?? "0 0").split(" ").map(Number);
      return {
        body: el.querySelector<SVGGElement>(".crew__body"),
        steps: Number(el.dataset.steps ?? 0),
        fx,
        fy
      };
    });
    // Every frame has the same two functions, so they interpolate pairwise.
    const at = (fx: number, fy: number, k: number, lift = 0) =>
      `translate(${(fx * k).toFixed(2)}px, ${(fy * k).toFixed(2)}px) translateY(${-lift}px)`;

    if (!arrived) {
      // Hold them at the foot until the climb can play, so it never shows the
      // finished scene and then empties the ladders.
      if (!holds.current.length) {
        for (const c of climbers) {
          const foot = at(c.fx, c.fy, 1);
          const hold = c.body?.animate(
            [{ transform: foot }, { transform: foot }],
            { duration: 1, fill: "forwards" }
          );
          if (hold) holds.current.push(hold);
        }
      }
      root.dataset.crew = "armed";
      return;
    }

    played.current = true;
    root.dataset.crew = "climbing";
    holds.current.forEach(h => h.cancel());
    holds.current = [];

    const anims = climbers.map((c, i) => {
      if (!c.body) return null;
      // Whole rungs, the last one partial, so it stops exactly at rest.
      const rungs = Math.max(1, Math.ceil(c.steps - 0.05));
      const total = rungs * (STEP_MS + HOLD_MS);
      const frames: Keyframe[] = [];
      for (let r = 0; r < rungs; r++) {
        const from = 1 - Math.min(r, c.steps) / c.steps;
        const to = 1 - Math.min(r + 1, c.steps) / c.steps;
        const t0 = (r * (STEP_MS + HOLD_MS)) / total;
        const t1 = t0 + STEP_MS / total;
        frames.push({
          offset: t0,
          transform: at(c.fx, c.fy, from),
          easing: "cubic-bezier(0.45, 0, 0.3, 1)"
        });
        // A small lift mid-step, the body pulling itself up to the next rung.
        frames.push({
          offset: (t0 + t1) / 2,
          transform: at(c.fx, c.fy, (from + to) / 2, 3),
          easing: "cubic-bezier(0.3, 0, 0.3, 1)"
        });
        frames.push({ offset: t1, transform: at(c.fx, c.fy, to) });
      }
      frames.push({ offset: 1, transform: at(c.fx, c.fy, 0) });
      return c.body.animate(frames, {
        duration: total,
        delay: i === 0 ? LEFT_START_MS : RIGHT_START_MS,
        fill: "backwards"
      });
    });

    // The climb plays to the end even if the section scrolls away mid-way:
    // this effect re-runs as `arrived` flips, and must not cut it short.
    const running = anims.filter((a): a is Animation => a !== null);
    Promise.all(running.map(a => a.finished))
      .catch(() => undefined) // cancelled: the builders are at rest anyway
      .finally(() => {
        root.dataset.crew = "done";
      });
  }, [arrived, motion]);

  // Drop the foot-holds if the component goes before the climb ever played.
  useEffect(() => () => holds.current.forEach(h => h.cancel()), []);

  return (
    <div ref={rootRef} className={className} style={style}>
      {children}
    </div>
  );
}
