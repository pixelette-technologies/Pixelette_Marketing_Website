"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useFinePointer, useInView, useMotionAllowed } from "@/lib/useInView";
import { spread } from "@/lib/spread";
import RoomBackdrop from "./RoomBackdrop";

// 02 — THE FALLING POST-ITS. Locked implementation specification, 28 Sep 2026.
//
// Marketing activity as noise, falling; "A clearer path" as the calm
// counterpoint. EVERY NOTE IS ITS OWN ELEMENT, as the spec requires (§11): the
// section is never one flattened picture.
//
// THE RESTING ARRANGEMENT IS THE DESIGN. Positions, turns and colours below
// are read off the approved reference, and that arrangement is what the
// server renders, what a reduced-motion visitor sees and where every note
// lands. Motion is layered on top and only after mount.
//
// MOTION, in three independent layers so no two fight over one transform:
//   .postit__fall   the entry fall (Web Animations API), once per page view:
//                   own delay, own duration, sideways drift, a turn that
//                   settles, starting above the band.
//   .postit__sway   a slow +-1 degree sway after landing, each note on its own
//                   period, paused whenever the section is off screen.
//   .postit__push   the pointer response (fine pointer only): a few pixels
//                   away and a few degrees of tilt, springing back by CSS
//                   transition. It never flings, and notes never take clicks.
// A few small background notes keep drifting down while the section is on
// screen, which is the spec's "remains alive" (§12), and they sit behind the
// foreground notes and never in the copy column.
//
// The whole field is aria-hidden: the words on the notes are the picture, and
// the section's meaning is carried by the headline beside it.

type Tone = "pink" | "rose" | "yellow" | "orange" | "blue" | "green";

interface NoteSpec {
  word: string;
  tone: Tone;
  /** Resting centre, % of the band, wide screen. */
  x: number;
  y: number;
  /** Resting turn, degrees. */
  r: number;
  /** Resting centre on a phone, % of the picture row; omitted = not shown. */
  m?: [number, number];
}

// Read off the reference, in its order where it has one. "More content" is in
// the spec's list and not visible in the image, so it takes the one gap the
// arrangement leaves, upper right.
//
// x is a percentage of the STAGE, not the band. The stage starts where the
// copy column ends (see .postitField__stage), so no note can ever reach the
// headline or the CTA at any width; the reference's positions were mapped
// onto it as x' = 7 + (x - 43) * 88 / 57, the reference's copy column ending
// at about 43% of its width.
const LAYOUT: Record<string, Omit<NoteSpec, "word">> = {
  "More ads": { tone: "pink", x: 14.7, y: 19, r: -17, m: [16, 16] },
  "More emails": { tone: "blue", x: 34, y: 21, r: 4, m: [44, 13] },
  "More posts": { tone: "yellow", x: 10.4, y: 45, r: -6, m: [15, 50] },
  "More meetings": { tone: "green", x: 42.4, y: 39, r: -12, m: [45, 45] },
  "More content": { tone: "rose", x: 57.9, y: 17, r: 11 },
  "More traffic": { tone: "blue", x: 28.6, y: 52, r: -22 },
  "More channels": { tone: "yellow", x: 55.6, y: 55, r: 21 },
  "More leads": { tone: "orange", x: 7, y: 72, r: -9, m: [18, 83] },
  "More spend": { tone: "blue", x: 22.4, y: 79, r: 19 },
  "More tools": { tone: "pink", x: 39.4, y: 71, r: 17 },
  "More reports": { tone: "green", x: 56.4, y: 82, r: 6, m: [47, 81] }
};

// The small, soft notes behind: no words, just colour and depth.
const BACKGROUND: { tone: Tone; x: number; y: number; r: number; s: number }[] =
  [
    { tone: "pink", x: 13, y: 4, r: 24, s: 0.46 },
    { tone: "yellow", x: 25.5, y: 9, r: -30, s: 0.4 },
    { tone: "orange", x: 48.7, y: 5, r: 12, s: 0.44 },
    { tone: "rose", x: 68.8, y: 9, r: -18, s: 0.5 },
    { tone: "green", x: 78, y: 28, r: 32, s: 0.38 },
    { tone: "blue", x: 88.8, y: 44, r: -14, s: 0.42 },
    { tone: "pink", x: 47, y: 95, r: 20, s: 0.4 },
    { tone: "yellow", x: 30, y: 97, r: -8, s: 0.36 }
  ];

const toneVars = (tone: Tone) =>
  ({
    "--face": `var(--note-${tone})`,
    "--shade": `var(--note-${tone}-shade)`
  }) as CSSProperties;

export default function PostitField({
  words,
  clearerPath
}: {
  words: readonly string[];
  clearerPath: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = useInView(rootRef);
  // The fall waits for the section to be properly in view (its top above the
  // lowest 30% of the window), not merely near it: at 1440x900 the band's
  // top edge already shows on load, and with the pausing margin the notes
  // had landed before anyone scrolled to them.
  const arrived = useInView(rootRef, "0px 0px -30% 0px");
  const motion = useMotionAllowed();
  const fine = useFinePointer();
  const played = useRef(false);

  const notes: NoteSpec[] = words
    .filter(word => LAYOUT[word])
    .map(word => ({ word, ...LAYOUT[word] }));

  // --- The entry fall, once, the first time the field is on screen ---------
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !motion || played.current) return;
    if (!arrived) {
      // Hide the foreground until the fall can start, so it never shows the
      // landed arrangement and then jumps to the top.
      root.dataset.postits = "armed";
      return;
    }
    played.current = true;
    root.dataset.postits = "on";

    const height = root.getBoundingClientRect().height;
    const falls = Array.from(
      root.querySelectorAll<HTMLElement>(".postit--fg .postit__fall")
    );
    const animations = falls.map((el, i) => {
      const top = (el.closest<HTMLElement>(".postit")?.offsetTop ?? 0) + 140;
      const from = -Math.min(top, height + 140);
      const drift = (spread(i, 1) - 0.5) * 70;
      const turn = (spread(i, 2) - 0.5) * 50;
      const duration = 1500 + spread(i, 3) * 1000;
      const delay = spread(i, 4) * 900;
      return el.animate(
        [
          {
            transform: `translate(${drift}px, ${from}px) rotate(${turn}deg)`,
            opacity: 0
          },
          { opacity: 1, offset: 0.12 },
          {
            transform: `translate(${-drift * 0.45}px, ${from * 0.42}px) rotate(${-turn * 0.4}deg)`,
            offset: 0.55
          },
          {
            transform: `translate(${drift * 0.15}px, ${from * 0.08}px) rotate(${turn * 0.12}deg)`,
            offset: 0.85
          },
          { transform: "translate(0, 0) rotate(0deg)", opacity: 1 }
        ],
        {
          duration,
          delay,
          easing: "cubic-bezier(0.33, 0.6, 0.4, 1)",
          fill: "backwards"
        }
      );
    });

    return () => animations.forEach(a => a.finish());
  }, [motion, arrived]);

  // --- Background drift and landed sway run only while on screen ------------
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !motion) return;
    root.style.setProperty(
      "--fall",
      `${root.getBoundingClientRect().height + 160}px`
    );
    root.dataset.running = visible ? "true" : "false";
  }, [motion, visible]);

  // --- The pointer: a nudge, never a fling ------------------------------------
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !motion || !fine) return;

    const pushes = Array.from(
      root.querySelectorAll<HTMLElement>(".postit--fg .postit__push")
    );
    const stage =
      root.querySelector<HTMLElement>(".postitField__stage") ?? root;

    // Where each note actually sits, as fractions of the stage, measured
    // when the pointer arrives rather than read from --x/--y: a narrow stage
    // moves the notes to their phone positions. A hidden note measures as
    // zero-sized and is parked far away so it never responds.
    let centres: [number, number][] = [];
    const measure = () => {
      const s = stage.getBoundingClientRect();
      centres = pushes.map(el => {
        const r = el.closest<HTMLElement>(".postit")!.getBoundingClientRect();
        if (!r.width) return [-9, -9];
        return [
          (r.left + r.width / 2 - s.left) / s.width,
          (r.top + r.height / 2 - s.top) / s.height
        ];
      });
    };
    const RADIUS = 150;
    let raf = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      raf = 0;
      const rect = stage.getBoundingClientRect();
      pushes.forEach((el, i) => {
        const dx = centres[i][0] * rect.width - (px - rect.left);
        const dy = centres[i][1] * rect.height - (py - rect.top);
        const d = Math.hypot(dx, dy) || 1;
        const k = d < RADIUS ? (1 - d / RADIUS) ** 2 : 0;
        el.style.setProperty("--px", `${((dx / d) * 9 * k).toFixed(2)}px`);
        el.style.setProperty(
          "--py",
          `${((dy / d) * 9 * k - 3 * k).toFixed(2)}px`
        );
        el.style.setProperty(
          "--pr",
          `${(Math.sign(dx) * 5 * k).toFixed(2)}deg`
        );
        el.style.setProperty("--lift", k.toFixed(3));
      });
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!centres.length) measure();
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      centres = [];
      pushes.forEach(el => {
        el.style.removeProperty("--px");
        el.style.removeProperty("--py");
        el.style.removeProperty("--pr");
        el.style.removeProperty("--lift");
      });
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, [motion, fine]);

  return (
    <div className='postitField' ref={rootRef} aria-hidden='true'>
      <RoomBackdrop id='postitRoom' />

      <div className='postitField__stage'>
        {BACKGROUND.map((n, i) => (
          <div
            key={`bg-${i}`}
            className={`postit postit--bg${i > 2 ? " postit--wide" : ""}`}
            style={
              {
                ...toneVars(n.tone),
                "--x": `${n.x}%`,
                "--y": `${n.y}%`,
                "--r": `${n.r}deg`,
                "--s": n.s,
                "--dur": `${10 + spread(i, 5) * 7}s`,
                "--delay": `${-spread(i, 6) * 14}s`,
                "--drift": `${(spread(i, 7) - 0.5) * 90}px`,
                "--spin": `${(spread(i, 8) - 0.5) * 140}deg`
              } as CSSProperties
            }
          >
            <div className='postit__paper' />
          </div>
        ))}

        {notes.map((n, i) => (
          <div
            key={n.word}
            className={`postit postit--fg${n.m ? "" : " postit--wide"}`}
            style={
              {
                ...toneVars(n.tone),
                "--x": `${n.x}%`,
                "--y": `${n.y}%`,
                "--r": `${n.r}deg`,
                "--mx": `${n.m?.[0] ?? 0}%`,
                "--my": `${n.m?.[1] ?? 0}%`,
                "--sway": `${4.2 + spread(i, 9) * 2.4}s`,
                "--sway-delay": `${-spread(i, 10) * 4}s`
              } as CSSProperties
            }
          >
            <div className='postit__fall'>
              <div className='postit__sway'>
                <div className='postit__push'>
                  <div className='postit__paper'>
                    <span className='postit__word'>{n.word}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className='postit postit--path' style={toneVars("pink")}>
          <div className='postit__paper'>
            <span className='postit__word'>{clearerPath}</span>
            <svg
              className='postit__underline'
              viewBox='0 0 100 12'
              focusable='false'
            >
              <path d='M4 8 C 30 3, 62 4, 96 6' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
