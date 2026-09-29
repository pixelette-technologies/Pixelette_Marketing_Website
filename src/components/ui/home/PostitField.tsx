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
// MOTION, in independent layers so no two fight over one transform:
//   .postit         the fall (CSS, 29 Sep, on instruction): every word note
//                   drops from above the band to below it in a loop, down its
//                   own lane (see LANES), slowly enough to read the word on the way —
//                   16s a pass. Negative delays spread them down the band
//                   from the first frame, so it never starts empty.
//   .postit__sway   a slow +-1 degree sway, each note on its own period.
//   .postit__push   the pointer response (fine pointer only): a few pixels
//                   away and a few degrees of tilt, springing back by CSS
//                   transition. It never flings, and notes never take clicks.
// All of it is paused whenever the section is off screen. Small blurred
// background notes drift down behind the words the same way.
//
// "A clearer path" never moves. Its words cycle through the hero figure's
// colours instead (see _activitySection.scss).
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

// One pass of a word note, top of the band to the bottom: about 65px a second
// on a 900px screen, slow enough to read every word as it passes.
const FALL_SECONDS = 16;

// THE FALL RUNS IN LANES, so no note can cover another's word. A note is
// 13.5% of the stage wide and up to ~17.5% once turned; lanes 22% apart
// leave a clear gap at the widest turn, and the right-hand lane still ends
// short of A clearer path (whose left edge sits at ~63% of the stage). A
// narrow stage shows six notes, in two lanes that clear the same note.
const LANES = [9, 31, 53];
const PHONE_LANES = [16, 44];
// Under 20rem (a portrait tablet, where the copy column keeps half the band)
// A clearer path takes the stage's right half, so the six share one lane on
// the left; the band is tall there, which keeps them well apart.
const TINY_LANES = [24];

interface Slot {
  x: number;
  delay: number;
}

// Splits the notes into lanes by their resting x (leftmost into the left
// lane, and so on, as evenly as the count allows), then spaces each lane's
// notes evenly through one pass in order of their resting height. Each lane
// is offset from the one before by a fraction of a slot, so notes in
// neighbouring lanes never travel side by side either.
function schedule(
  items: { key: string; x: number; y: number }[],
  lanes: number[]
): Map<string, Slot> {
  const slots = new Map<string, Slot>();
  const byX = [...items].sort((a, b) => a.x - b.x);
  let start = 0;
  lanes.forEach((laneX, k) => {
    const count = Math.ceil((byX.length - start) / (lanes.length - k));
    const lane = byX
      .slice(start, start + count)
      .sort((a, b) => a.y - b.y);
    start += count;
    lane.forEach((item, j) => {
      const progress = (j + k / lanes.length) / lane.length;
      slots.set(item.key, { x: laneX, delay: -progress * FALL_SECONDS });
    });
  });
  return slots;
}

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
  const motion = useMotionAllowed();
  const fine = useFinePointer();

  const notes: NoteSpec[] = words
    .filter(word => LAYOUT[word])
    .map(word => ({ word, ...LAYOUT[word] }));

  const wide = schedule(
    notes.map(n => ({ key: n.word, x: n.x, y: n.y })),
    LANES
  );
  const shownNarrow = notes.flatMap(n =>
    n.m ? [{ key: n.word, x: n.m[0], y: n.m[1] }] : []
  );
  const narrow = schedule(shownNarrow, PHONE_LANES);
  const tiny = schedule(shownNarrow, TINY_LANES);

  // --- The falls and the sway run only while on screen ------------------------
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

    // Where each note actually sits, as fractions of the stage, measured on
    // every frame the pointer moves, because the notes are falling. A hidden
    // note measures as zero-sized and is parked far away so it never responds.
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
      measure();
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
                "--sway-delay": `${-spread(i, 10) * 4}s`,
                // The loop: one pace for every note, so none catches another
                // up, in the lane and slot schedule() gave it. Drift and
                // spin are kept small enough not to leave the lane.
                "--dur": `${FALL_SECONDS}s`,
                "--lx": `${wide.get(n.word)?.x ?? n.x}%`,
                "--delay": `${wide.get(n.word)?.delay ?? 0}s`,
                "--mlx": `${narrow.get(n.word)?.x ?? 0}%`,
                "--mdelay": `${narrow.get(n.word)?.delay ?? 0}s`,
                "--tlx": `${tiny.get(n.word)?.x ?? 0}%`,
                "--tdelay": `${tiny.get(n.word)?.delay ?? 0}s`,
                "--drift": `${(spread(i, 2) - 0.5) * 20}px`,
                "--spin": `${(spread(i, 3) - 0.5) * 14}deg`
              } as CSSProperties
            }
          >
            <div className='postit__sway'>
              <div className='postit__push'>
                <div className='postit__paper'>
                  <span className='postit__word'>{n.word}</span>
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
