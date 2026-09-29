"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { spread } from "@/lib/spread";
import { useInView, useMotionAllowed } from "@/lib/useInView";

// 04 — THE DUCK POND. Locked implementation specification, 28 Sep 2026.
//
// Attention is being visible; relevance is being distinctive for the right
// reason. Many yellow ducks, ONE pink duck in sunglasses, and the handwritten
// "Stand out for the right reasons" pointing at it.
//
// A VECTOR RENDERING of the supplied reference photograph (29 Sep), drawn as
// close to it as SVG allows: a bright blue day, a classic rubber duck in
// three-quarter view drawn once and reused, ducks in depth bands with the far
// ones out of focus like the photograph's, strong reflections, and rings of
// ripples round the pink duck. Its sunglasses are a separate layer so they can
// move a hair on hover.
//
// EVERY DUCK IS ITS OWN ELEMENT (spec §24) with its own bob period, delay,
// amplitude and tilt, so no two move together, and a reflection and ripple
// that move with it. The water's glints drift slowly. All of it is CSS
// transform and opacity, and all of it pauses when the pond is off screen or
// the tab is hidden; this component only flips that switch. The furthest,
// most blurred band holds still: at that blur its movement could not be seen
// and would only cost paint.
//
// Positions and sizes are read off the reference in its own pixels (1085 x
// 362: duck centre x, waterline y, width) and mapped onto the STAGE, which
// starts where the copy column ends, so no duck sits over the words.
//
// The pond is aria-hidden: the picture carries no meaning the headline does
// not state.

interface DuckSpec {
  /** Reference pixels: centre x, waterline y, width. */
  x: number;
  y: number;
  w: number;
  /** Facing left instead of right. */
  flip?: boolean;
  /** Depth band: 0 sharp, 1 slightly soft, 2 soft, 3 bokeh (still). */
  depth: 0 | 1 | 2 | 3;
  /** One of the few kept on a phone. */
  phone?: boolean;
}

const YELLOW: DuckSpec[] = [
  // the furthest band, near the horizon
  { x: 330, y: 88, w: 60, depth: 3 },
  { x: 505, y: 84, w: 62, depth: 3, flip: true },
  { x: 800, y: 86, w: 60, depth: 3 },
  { x: 40, y: 118, w: 78, depth: 2 },
  { x: 150, y: 128, w: 92, depth: 2, phone: true },
  { x: 245, y: 104, w: 80, depth: 2, flip: true },
  { x: 420, y: 118, w: 86, depth: 2 },
  { x: 628, y: 104, w: 88, depth: 2, flip: true, phone: true },
  { x: 705, y: 128, w: 90, depth: 2 },
  { x: 880, y: 110, w: 86, depth: 2, flip: true },
  { x: 965, y: 132, w: 92, depth: 2 },
  { x: 1060, y: 118, w: 72, depth: 2, flip: true },
  // the middle band
  { x: 350, y: 182, w: 108, depth: 1 },
  { x: 255, y: 208, w: 116, depth: 0 },
  { x: 785, y: 192, w: 136, depth: 0, flip: true, phone: true },
  { x: 70, y: 240, w: 132, depth: 0 },
  { x: 1022, y: 248, w: 134, depth: 0, flip: true },
  // the two big ducks in front
  { x: 170, y: 322, w: 204, depth: 0, phone: true },
  { x: 940, y: 334, w: 212, depth: 0, flip: true, phone: true }
];

const PINK: DuckSpec = { x: 540, y: 244, w: 196, depth: 0, phone: true };

// Reference pixels onto the stage: x across 94% of it, the waterline into the
// water, which starts a third of the way down the band.
const place = (d: DuckSpec, i: number) =>
  ({
    "--x": `${(3 + (d.x / 1085) * 94).toFixed(2)}%`,
    "--y": `${(34 + (d.y / 362) * 62).toFixed(2)}%`,
    "--w": d.w,
    "--z": Math.round(d.y),
    "--dur": `${(3.4 + spread(i, 1) * 2.6).toFixed(2)}s`,
    "--delay": `${(-spread(i, 2) * 5).toFixed(2)}s`,
    "--amp": `${((d.depth ? 1.5 : 3) + spread(i, 3) * 2.5).toFixed(2)}px`,
    "--tilt": `${(0.8 + spread(i, 4) * 1.2).toFixed(2)}deg`,
    "--drift": `${((spread(i, 5) - 0.5) * 8).toFixed(2)}px`,
    // Perspective on the water: a ring near the horizon is seen almost edge
    // on, a ring at the front nearly from above, so the splash is flatter
    // the further back the duck lands.
    "--ring-aspect": (6.4 - (d.y / 362) * 3).toFixed(2)
  }) as CSSProperties;

// --- The entry drop: physics -------------------------------------------------------
//
// One gravity for every duck, so a duck that starts higher falls for longer
// and lands harder, as it would. On impact it plunges and floats back up as a
// damped harmonic oscillator (buoyancy is the spring, the water the damper),
// and the tilt it fell with rocks out on the same damping. The curve is
// SAMPLED into keyframes, so the browser plays the physics rather than an
// easing that resembles it.

const GRAVITY = 3200; // px/s², on screen
const BUOY_HZ = 2.1; // how fast a duck bobs back up
const DAMPING = 0.34; // fraction of critical damping: two or three bobs, then still

interface Drop {
  frames: Keyframe[];
  /** Seconds from release to impact, and to settled. */
  impact: number;
  total: number;
}

function dropFrames(height: number, sink: number, tilt: number): Drop {
  const fall = Math.sqrt((2 * height) / GRAVITY);
  const w = 2 * Math.PI * BUOY_HZ;
  const wd = w * Math.sqrt(1 - DAMPING * DAMPING);
  const decay = DAMPING * w;
  // Scale the impact so the deepest plunge is `sink` px: the first peak of
  // e^(-decay t) sin(wd t) sits at t* = atan(wd / decay) / wd.
  const tPeak = Math.atan(wd / decay) / wd;
  const amp = sink / (Math.exp(-decay * tPeak) * Math.sin(wd * tPeak));
  const settle = 4 / decay;
  const total = fall + settle;

  const frames: Keyframe[] = [];
  const FALL_STEPS = 14;
  for (let k = 0; k <= FALL_STEPS; k++) {
    const t = (fall * k) / FALL_STEPS;
    const y = -height + 0.5 * GRAVITY * t * t;
    frames.push({
      offset: t / total,
      transform: `translateY(${y.toFixed(1)}px) rotate(${tilt.toFixed(2)}deg)`
    });
  }
  const BOB_STEPS = 32;
  for (let k = 1; k <= BOB_STEPS; k++) {
    const t = (settle * k) / BOB_STEPS;
    const e = Math.exp(-decay * t);
    const y = amp * e * Math.sin(wd * t);
    const r = tilt * e * Math.cos(wd * t);
    frames.push({
      offset: Math.min(1, (fall + t) / total),
      transform: `translateY(${y.toFixed(2)}px) rotate(${r.toFixed(2)}deg)`
    });
  }
  return { frames, impact: fall, total };
}

function Duck({
  spec,
  i,
  pink
}: {
  spec: DuckSpec;
  i: number;
  pink?: boolean;
}) {
  const cls = [
    "duck",
    pink ? "duck--pink" : "duck--yellow",
    `duck--depth${spec.depth}`,
    spec.flip ? "duck--flip" : "",
    spec.phone ? "" : "duck--wide"
  ]
    .filter(Boolean)
    .join(" ");
  const symbol = pink ? "#duckPondPink" : "#duckPondYellow";
  return (
    <div className={cls} style={place(spec, i)}>
      {/* On the water: stays at the waterline while the duck drops. */}
      <div className='duck__water'>
        {pink && (
          <>
            <span className='duck__ring duck__ring--1' />
            <span className='duck__ring duck__ring--2' />
            <span className='duck__ring duck__ring--3' />
          </>
        )}
        <span className='duck__ripple' />
        <span className='duck__ripple duck__ripple--late' />
      </div>
      {/* The splash where it lands, played once by the entry drop. */}
      <span className='duck__splash' />
      <span className='duck__splash duck__splash--late' />
      <div className='duck__drop'>
        <div className='duck__bob'>
          <svg
            className='duck__reflection'
            viewBox='0 0 130 110'
            focusable='false'
          >
            <use href={symbol} />
          </svg>
          <svg className='duck__body' viewBox='0 0 130 110' focusable='false'>
            <use href={symbol} />
            {pink && (
              <g className='duck__shades'>
                {/* Across both eyes of a head turned three-quarters right:
                  the near lens larger, the far one foreshortened, an arm
                  running back over the head. */}
                <path className='duck__bridge' d='M48 22 L62 24' />
                <path
                  className='duck__lens'
                  d='M60.5 22.5 Q61 17 68 17 L77.5 17.5 Q82 18 81.5 23.5 Q80.5 32 71 32.5 Q62 32.5 60.5 22.5 Z'
                />
                <path
                  className='duck__lens'
                  d='M85 21 Q85.5 16.5 90 16.5 L98 17 Q102 17.5 101 22.5 Q99.5 30 93 30 Q85.5 30 85 21 Z'
                />
                <path
                  className='duck__bridge'
                  d='M81.5 21 Q83.3 19 85.2 20.6'
                />
                <path className='duck__glint' d='M64.5 21.5 Q68 18.8 74 19.4' />
                <path
                  className='duck__glint'
                  d='M88 20.6 Q90.5 18.4 94.5 18.8'
                />
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function DuckPond({
  annotation
}: {
  annotation: readonly string[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = useInView(rootRef);
  // As with the Post-its, the entry waits until the section is properly in
  // view, not merely near it.
  const arrived = useInView(rootRef, "0px 0px -30% 0px");
  const motion = useMotionAllowed();
  const played = useRef(false);

  // --- The entry, once: the water, then the ducks one by one, the pink duck
  // last, then the note. -------------------------------------------------------
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !motion || played.current) return;
    if (!arrived) {
      // Hide the water and ducks until the entry can play, so it never shows
      // the finished pond and then empties it.
      root.dataset.pond = "armed";
      return;
    }
    played.current = true;
    root.dataset.pond = "on";

    const WATER_MS = 650;
    const STAGGER_MS = 115;
    const PINK_PAUSE_MS = 380;
    const top = root.getBoundingClientRect().top;
    const anims: Animation[] = [];
    const play = (
      el: Element | null,
      frames: Keyframe[],
      opts: KeyframeAnimationOptions
    ) => {
      if (el) anims.push(el.animate(frames, { fill: "backwards", ...opts }));
    };

    // 1. The day comes up.
    root.querySelectorAll(".duckPond__sky, .duckPond__water").forEach(el =>
      play(el, [{ opacity: 0 }, { opacity: 1 }], {
        duration: WATER_MS,
        easing: "ease-out"
      })
    );

    // 2. The ducks, furthest first, the pink duck last. Hidden ones (the
    //    phone drops most of the pond) are skipped.
    const ducks = Array.from(root.querySelectorAll<HTMLElement>(".duck"))
      .filter(d => d.offsetParent !== null)
      .sort((a, b) => {
        if (a.classList.contains("duck--pink")) return 1;
        if (b.classList.contains("duck--pink")) return -1;
        return (
          a.getBoundingClientRect().bottom - b.getBoundingClientRect().bottom
        );
      });

    let pinkLanded = 0;
    ducks.forEach((duck, n) => {
      const pink = duck.classList.contains("duck--pink");
      const rect = duck.getBoundingClientRect();
      // From just above the top of the band to its waterline.
      const height = rect.bottom - top + 30;
      const sink = rect.height * 0.14;
      const tilt = (spread(n, 11) - 0.5) * 16;
      const drop = dropFrames(height, sink, tilt);
      const start =
        WATER_MS * 0.7 + n * STAGGER_MS + (pink ? PINK_PAUSE_MS : 0);
      const landed = start + drop.impact * 1000;
      if (pink) pinkLanded = landed;

      play(duck.querySelector(".duck__drop"), drop.frames, {
        duration: drop.total * 1000,
        delay: start,
        easing: "linear"
      });
      // Nothing on the water, and no reflection, until it is on the water.
      const onWater: Keyframe[] = [
        { opacity: 0 },
        { opacity: 0, offset: drop.impact / drop.total },
        { opacity: 1 }
      ];
      play(duck.querySelector(".duck__water"), onWater, {
        duration: drop.total * 1000,
        delay: start
      });
      // Its resting opacity is .45 (_relevanceSection.scss); end there.
      play(
        duck.querySelector(".duck__reflection"),
        [
          { opacity: 0 },
          { opacity: 0, offset: drop.impact / drop.total },
          { opacity: 0.45 }
        ],
        { duration: drop.total * 1000, delay: start }
      );
      // The splash: two rings out from where it landed.
      duck.querySelectorAll(".duck__splash").forEach((ring, k) =>
        play(
          ring,
          [
            { opacity: 0.85, transform: "translate(-50%, -50%) scale(0.25)" },
            {
              opacity: 0,
              transform: `translate(-50%, -50%) scale(${k ? 1.7 : 2.5})`
            }
          ],
          {
            duration: 1300 + k * 200,
            delay: landed + k * 170,
            easing: "cubic-bezier(0.2, 0.6, 0.35, 1)",
            // Not held before it starts: the ring's resting state is
            // invisible, and holding the first frame showed it early.
            fill: "none"
          }
        )
      );
    });

    // 3. The note, once the pink duck is down.
    root.querySelectorAll(".duckPond__note, .duckPond__arrow").forEach(el =>
      play(el, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 600,
        delay: pinkLanded + 350,
        easing: "ease-out"
      })
    );

    return () => anims.forEach(a => a.finish());
  }, [motion, arrived]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!motion) {
      delete root.dataset.running;
      return;
    }
    root.dataset.running = visible ? "true" : "false";
  }, [motion, visible]);

  return (
    <div className='duckPond' ref={rootRef} aria-hidden='true'>
      <DuckSymbols />

      <div className='duckPond__sky'>
        <svg
          className='duckPond__clouds'
          viewBox='0 0 1440 360'
          preserveAspectRatio='xMidYMid slice'
          focusable='false'
        >
          <defs>
            <filter
              id='duckPondCloudBlur'
              x='-30%'
              y='-60%'
              width='160%'
              height='220%'
            >
              <feGaussianBlur stdDeviation='26' />
            </filter>
          </defs>
          <g className='duckPond__cloud' filter='url(#duckPondCloudBlur)'>
            <ellipse cx='520' cy='150' rx='150' ry='55' />
            <ellipse cx='640' cy='120' rx='120' ry='60' />
            <ellipse cx='900' cy='170' rx='170' ry='50' />
            <ellipse cx='1150' cy='120' rx='140' ry='55' />
            <ellipse cx='1330' cy='190' rx='120' ry='45' />
          </g>
        </svg>
      </div>

      <div className='duckPond__water'>
        <svg
          className='duckPond__glints'
          viewBox='0 0 1440 480'
          preserveAspectRatio='none'
          focusable='false'
        >
          <g className='duckPond__glintRow duckPond__glintRow--a'>
            <path d='M620 150 q30 -6 60 0 t60 0 M900 190 q24 -5 48 0 t48 0 M1180 160 q30 -6 60 0 t60 0' />
            <path d='M700 300 q36 -7 72 0 t72 0 M1040 330 q30 -6 60 0 t60 0' />
          </g>
          <g className='duckPond__glintRow duckPond__glintRow--b'>
            <path d='M760 230 q30 -6 60 0 t60 0 M1100 250 q36 -7 72 0 t72 0 M1320 290 q24 -5 48 0' />
            <path d='M640 400 q40 -8 80 0 t80 0 M980 430 q36 -7 72 0 t72 0' />
          </g>
        </svg>
      </div>

      <div className='duckPond__stage'>
        {YELLOW.map((d, i) => (
          <Duck key={i} spec={d} i={i} />
        ))}
        <Duck spec={PINK} i={YELLOW.length} pink />

        <div className='duckPond__note'>
          <p className='duckPond__noteText'>
            {annotation.map(line => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
        {/* The arrow is placed in stage coordinates, not under the text, so
            it always lands on the pink duck's head. */}
        <svg
          className='duckPond__arrow'
          viewBox='0 0 40 100'
          preserveAspectRatio='none'
          focusable='false'
        >
          <path d='M6 3 C 0 38, 10 70, 32 94' />
          <path d='M19 90 L 33 95 L 34 80' />
        </svg>
      </div>
    </div>
  );
}

// The rubber duck, drawn once, in three-quarter view facing right: a raised
// tail, a round body with a wing, a big round head, a two-part beak, two eyes
// and the glossy highlights that make it read as moulded vinyl. The pink
// symbol is the same drawing in the pink family.
function DuckSymbols() {
  const body = (id: string) => (
    <>
      {/* body and raised tail */}
      <path
        d='M17 62 C 8 52 8 34 14 25 C 21 34 28 41 38 44.5 C 46 47 54 48 62 48 L 80 48 C 100 48 115 58 117 74 C 119 90 101 100 70 100 C 42 100 21 92 17 77 Z'
        fill={`url(#${id}Body)`}
      />
      {/* the shadowed underside at the waterline */}
      <path
        className='duck__under'
        d='M22 84 C 34 96 56 100 72 100 C 96 100 112 92 116 80 C 110 94 92 100 70 100 C 46 100 30 94 22 84 Z'
      />
      {/* wing */}
      <path
        d='M34 66 C 44 54 64 54 75 64 C 67 79 47 82 34 74 Z'
        fill={`url(#${id}Wing)`}
      />
      <path className='duck__shine' d='M40 64 C 48 58 60 58 66 62' />
      {/* head */}
      <circle cx='80' cy='34' r='27' fill={`url(#${id}Head)`} />
      {/* eyes: the near one larger, the far one beside the beak */}
      <ellipse className='duck__eye' cx='73' cy='26' rx='4.4' ry='6' />
      <ellipse className='duck__eye' cx='95' cy='24.5' rx='3.4' ry='5.2' />
      <circle className='duck__eyeGlint' cx='71.8' cy='23.8' r='1.5' />
      <circle className='duck__eyeGlint' cx='94.2' cy='22.6' r='1.1' />
      {/* beak: upper and lower, with a lit ridge */}
      <path
        className='duck__beak'
        d='M88 38 C 100 30 120 31 126 39 C 119 45.5 104 46.5 90 44.5 Z'
      />
      <path
        className='duck__beakShade'
        d='M90 44.5 C 104 46.5 117 46.5 122 44.5 C 118 51.5 104 54.5 92 50 Z'
      />
      <path className='duck__beakRidge' d='M97 35.6 C 106 33 116 33.6 121 37' />
      {/* the glossy highlights */}
      <ellipse
        className='duck__highlight'
        cx='69'
        cy='15'
        rx='9.5'
        ry='5'
        transform='rotate(-24 69 15)'
      />
      <circle className='duck__highlight' cx='62.5' cy='22' r='2' />
      <ellipse
        className='duck__highlight duck__highlight--soft'
        cx='58'
        cy='55'
        rx='17'
        ry='4.2'
        transform='rotate(-6 58 55)'
      />
      <ellipse
        className='duck__highlight duck__highlight--soft'
        cx='17'
        cy='33'
        rx='2.4'
        ry='6'
        transform='rotate(-28 17 33)'
      />
    </>
  );

  const grads = (id: string, tone: "yellow" | "pink") => (
    <>
      <radialGradient id={`${id}Body`} cx='0.42' cy='0.22' r='0.85'>
        <stop offset='0' className={`duckTone--${tone}-light`} />
        <stop offset='0.42' className={`duckTone--${tone}`} />
        <stop offset='0.85' className={`duckTone--${tone}`} />
        <stop offset='1' className={`duckTone--${tone}-shade`} />
      </radialGradient>
      <radialGradient id={`${id}Head`} cx='0.36' cy='0.26' r='0.8'>
        <stop offset='0' className={`duckTone--${tone}-light`} />
        <stop offset='0.5' className={`duckTone--${tone}`} />
        <stop offset='1' className={`duckTone--${tone}-shade`} />
      </radialGradient>
      <linearGradient id={`${id}Wing`} x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' className={`duckTone--${tone}`} />
        <stop offset='1' className={`duckTone--${tone}-shade`} />
      </linearGradient>
    </>
  );

  return (
    <svg className='duckPond__defs' width='0' height='0' focusable='false'>
      <defs>
        {grads("duckPondYellowG", "yellow")}
        {grads("duckPondPinkG", "pink")}
        <symbol id='duckPondYellow' viewBox='0 0 130 110'>
          {body("duckPondYellowG")}
        </symbol>
        <symbol id='duckPondPink' viewBox='0 0 130 110'>
          {body("duckPondPinkG")}
        </symbol>
      </defs>
    </svg>
  );
}
