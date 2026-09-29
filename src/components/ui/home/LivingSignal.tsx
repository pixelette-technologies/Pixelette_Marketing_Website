"use client";

import { useEffect, useRef } from "react";

// THE LIVING SIGNAL — the hero's visual. "Intelligent Editorial", Phase 1A.
//
// 28 Sep 2026, third drawing: rebuilt to a concept image supplied by the user
// and treated as the absolute reference for form.
//
// THE FORM, taken from the reference:
//   - one sideways teardrop filling the frame: two broad wings of fine
//     hairlines, above and below a warmer central band, every line sweeping
//     left to right into a single point at the right edge;
//   - a crown of warm lines falling into the point from the upper right, and
//     a few long, faint arcs framing the whole shape;
//   - thousands of points of many sizes — loose and scattered at the left,
//     clustering along the lines, dense and fine towards the point;
//   - a soft haze behind the wings and a lit point where everything arrives.
//
// THE COLOUR — REVERSED LATER THE SAME DAY. This drawing was first translated
// into the brand's wine and crimson. The locked implementation spec (28 Sep,
// sections 01-04) says the broader treatment was the approved one: blue,
// violet, pink and a restrained orange, and NOT to recolour the signal pink.
// So the reference's own colours are back, as the --signal-* tokens. Every
// value is still a design token read at runtime; the token gate bars colour
// literals in src/.
//
// Ported onto feat/home-sections-01-04 from commit 3906c3a. The later,
// uncommitted "larger, smoother, pointer light" round is NOT part of this.
//
// THE LABELS are the reference's two rail groups, top right and bottom right,
// set as HTML so they are real type, with the words of the final approved
// reference ("Ideas / Intelligence / Action / Growth", "A more commercial
// tomorrow"). THE NOTE, "From insight to impact" with its arrow, is approved
// by the spec as part of the visual. All of it is picture, not information,
// so the figure stays aria-hidden.
//
// PERFORMANCE: the dense scene (~4,400 points, ~350 lines) is drawn every
// frame only during the three-and-a-half-second resolve. Once settled it is
// rendered once into two cached layers, and each ambient frame is two image
// draws, the glow and a few travelling signals.
//
// MOTION POLICY
//   - The resolve plays ONCE per page view and never restarts: points drift
//     in from a looser scatter and the lines find their way to the point.
//   - Afterwards: the point's light breathes by a few per cent and a few
//     signals travel inwards, at half frame rate.
//   - Nothing runs while the figure is off screen or the tab is hidden.
//   - prefers-reduced-motion: the resolved composition, drawn once.
//
// THE POINTER — 29 Sep 2026, an enhancement on instruction (not a redesign).
// Fine pointer only; it replaces the earlier few-pixel depth shift.
//   - THE MAGNET. Anywhere near the figure — above it, below it or on it —
//     the lines and points lean towards the pointer: below the figure the
//     wings are drawn down, above it they are drawn up. The pull fades out
//     towards the point, so every line still arrives at FOCUS.
//   - ON THE FIGURE (inside the teardrop): the lines glow, and the orange
//     signals multiply and run at many times their speed with long lit
//     tails, start to end — light at speed, arriving at the point.
//   - THE POINTS near the pointer glow, and are drawn in by it with real
//     physics: each is a mass on a spring to its place, pulled by a softened
//     inverse-square force. They gather round the pointer, lag and swing
//     when it moves fast, and spring home with one overshoot when it goes.
//     The few large points are heavier: slower, and they travel less.
//   - Both ease in and out. While the pointer is engaged the scene is drawn
//     live at full frame rate; otherwise the cached layers are used as before.

type Pt = [number, number];
type Rgb = [number, number, number];

export interface LivingSignalLabels {
  top: readonly string[];
  bottom: readonly string[];
}

// Where everything arrives: at the right edge, a little above centre.
const FOCUS: Pt = [0.955, 0.46];
const N = 48; // samples per line

type Family = "upper" | "lower" | "band" | "crown" | "frame";
const FAMILIES: Family[] = ["frame", "upper", "lower", "band", "crown"];

// Palette slots, filled from tokens at start-up.
const DEEP = 0;
const BODY = 1;
const DUSK = 2;
const BRAND = 3;
const SIGNAL = 4;
const ALPHAS = [0.32, 0.58, 0.85];
const HALO_ALPHAS = [0.22, 0.4, 0.62];

interface Line {
  fam: Family;
  pts: Float32Array; // px, x/y interleaved
  live: Float32Array; // pts, bent by the magnet
  strong: boolean;
  delay: number;
}

interface Dot {
  x: number;
  y: number;
  r: number;
  c: number; // palette slot
  a: number; // alpha bucket
  near: boolean; // the nearer depth layer
  dx: number; // intro displacement, px
  dy: number;
  delay: number;
}

interface Signal {
  line: number;
  s: number;
  speed: number;
  warp: boolean; // one of the extra travellers seen only on hover
}

// --- Timing -----------------------------------------------------------------

const SETTLED = 3.5;
const GLOW_AT = 2.2;

// --- The pointer ------------------------------------------------------------

const MAGNET = 0.55; // share of the distance to the pointer a point moves
const REACH_X = 0.36; // the field's spread, of width
const REACH_Y = 0.55; // and of height, broad so a pointer outside still pulls
const PULL_CAP = 0.17; // the most a point moves, of height
const WARP = 18; // how many times faster the signals run at full hover

// The points near the pointer, each a small mass on a spring to its place,
// pulled by a softened inverse-square force (Plummer: strongest a little way
// out, zero at the pointer itself, so they gather round it, not onto it).
const DOT_REACH = 180; // px: beyond this the force is nil
const DOT_SOFT = 40; // px: the softening length
const DOT_PULL = 1.6e6; // the force's strength
const DOT_SPRING = 16; // per unit mass: every point rings at ~4 rad/s
const DOT_DAMPING = 0.3; // of critical, so a flung point overshoots once
const DOT_GLOW = 110; // px: how near the pointer a point starts to glow

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);

const bezier = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]
  ];
};

const toRgb = (hex: string): Rgb => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.replace(/./g, c => c + c) : h;
  const n = parseInt(full.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgba = ([r, g, b]: Rgb, a: number) => `rgba(${r},${g},${b},${a})`;

export default function LivingSignal({
  labels,
  annotation
}: {
  labels?: LivingSignalLabels;
  annotation?: readonly string[];
}) {
  const figureRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    const canvas = canvasRef.current;
    if (!figure || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(figure);
    const token = (name: string) => toRgb(css.getPropertyValue(name).trim());
    // 28 Sep, locked spec: the reference's own colours, not the brand's.
    // The slot NAMES are kept from the brand-coloured drawing so the
    // geometry below did not have to change; read them as positions in the
    // picture, not as brand roles.
    const pal: Rgb[] = [
      token("--signal-deep"), // DEEP: the navy at the top of the upper wing
      token("--signal-blue"), // BODY: the upper wing
      token("--signal-violet"), // DUSK: the lower wing
      token("--signal-magenta"), // BRAND: where the wings close on the point
      token("--signal-orange") // SIGNAL: the warm band and the lit point
    ];
    const deeper = token("--signal-violet");
    const tint = token("--signal-haze");
    const wash = token("--signal-wash");
    const page = token("--signal-spark");

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let seed = 20260928;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const gauss = () => {
      const u = Math.max(1e-6, rand());
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
    };

    let w = 0;
    let h = 0;
    let dpr = 1;
    let lines: Line[] = [];
    let dots: Dot[] = [];
    let signals: Signal[] = [];
    let wings: number[] = [];
    let grads: Record<Family, CanvasGradient> | null = null;
    // The settled scene, cached: lines, haze and far points; near points.
    let far: HTMLCanvasElement | null = null;
    let near: HTMLCanvasElement | null = null;
    // The hover glow: the lines redrawn thick at quarter resolution, so
    // scaling it back up is itself most of the blur.
    let bloom: HTMLCanvasElement | null = null;
    let bloomCtx: CanvasRenderingContext2D | null = null;
    // The same, for the glow round the points near the pointer.
    let sheen: HTMLCanvasElement | null = null;
    let sheenCtx: CanvasRenderingContext2D | null = null;
    // The points' physics, one slot per dot: offset from rest, velocity,
    // mass; and, written each live frame, where each is drawn and how
    // brightly it glows.
    let ox = new Float32Array(0);
    let oy = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let mass = new Float32Array(0);
    let dpx = new Float32Array(0);
    let dpy = new Float32Array(0);
    let glow = new Float32Array(0);
    let dotsAwake = false;
    let dotPull = 0;

    // The figure's box inside the (larger) canvas, in CSS px.
    let offX = 0;
    let offY = 0;
    // A context drawing in the figure's px, at `s` device px per CSS px.
    const toScene = (c: CanvasRenderingContext2D, s: number) =>
      c.setTransform(s, 0, 0, s, offX * s, offY * s);
    // Clear, or lay a same-sized layer over, the whole canvas, bleed and all.
    const wipe = (c: CanvasRenderingContext2D) => {
      c.save();
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, c.canvas.width, c.canvas.height);
      c.restore();
    };
    const stamp = (
      c: CanvasRenderingContext2D,
      src: HTMLCanvasElement,
      filter?: string
    ) => {
      c.save();
      c.setTransform(1, 0, 0, 1, 0, 0);
      if (filter) c.filter = filter;
      c.drawImage(src, 0, 0, c.canvas.width, c.canvas.height);
      c.restore();
    };

    // --- The scene ---------------------------------------------------------

    const layout = () => {
      // 29 Sep: the canvas bleeds past the figure (see .livingSignal__canvas)
      // so the magnet can carry lines and points beyond the figure's box
      // without their being cut at its edge. The scene is still laid out in
      // the figure's own box, w × h; (offX, offY) is where that box sits in
      // the canvas, and toScene() puts every context into it.
      const rect = canvas.getBoundingClientRect();
      const box = figure.getBoundingClientRect();
      w = box.width;
      h = box.height;
      offX = box.left - rect.left;
      offY = box.top - rect.top;
      const narrow = w < 520;
      dpr = Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      toScene(ctx, dpr);
      far = null;
      near = null;
      const quarter = () => {
        const q = document.createElement("canvas");
        q.width = Math.max(1, Math.round(canvas.width / 4));
        q.height = Math.max(1, Math.round(canvas.height / 4));
        const qc = q.getContext("2d");
        if (qc) toScene(qc, dpr / 4);
        return [q, qc] as const;
      };
      [bloom, bloomCtx] = quarter();
      [sheen, sheenCtx] = quarter();

      seed = 20260928;
      const k = narrow ? 0.5 : 1;
      const F = FOCUS;

      // Each family: how many lines, and where a line's three free control
      // points fall. All end at FOCUS travelling rightwards.
      const frameArcs: [Pt, Pt, Pt][] = [
        [
          [0.3, 0.05],
          [0.55, -0.03],
          [0.92, 0.12]
        ],
        [
          [0.48, 0.99],
          [0.76, 0.98],
          [0.94, 0.78]
        ],
        [
          [0.36, 0.94],
          [0.66, 1.0],
          [0.9, 0.84]
        ]
      ];
      let arc = 0;
      const shape: Record<Family, [number, () => [Pt, Pt, Pt]]> = {
        upper: [
          Math.round(150 * k),
          () => {
            const sx = 0.03 + rand() * 0.3;
            const sy = Math.min(0.4, Math.max(0.1, 0.26 + gauss() * 0.06));
            return [
              [sx, sy],
              [sx + 0.3 + rand() * 0.12, sy - 0.02 - rand() * 0.06],
              [0.74 + rand() * 0.07, F[1] + (sy - F[1]) * 0.28]
            ];
          }
        ],
        lower: [
          Math.round(170 * k),
          () => {
            const sx = 0.02 + rand() * 0.32;
            const sy = Math.min(0.9, Math.max(0.55, 0.7 + gauss() * 0.07));
            return [
              [sx, sy],
              [sx + 0.3 + rand() * 0.12, sy + 0.01 + rand() * 0.04],
              [0.73 + rand() * 0.08, F[1] + (sy - F[1]) * 0.28]
            ];
          }
        ],
        band: [
          Math.round(50 * k),
          () => {
            const sx = 0.02 + rand() * 0.3;
            const sy = 0.4 + rand() * 0.15;
            return [
              [sx, sy],
              [sx + 0.3, sy + (rand() - 0.5) * 0.04],
              [0.7, F[1] + (sy - F[1]) * 0.2]
            ];
          }
        ],
        crown: [
          Math.round(28 * k),
          () => {
            const sx = 0.5 + rand() * 0.32;
            const sy = 0.05 + rand() * 0.2;
            return [
              [sx, sy],
              [sx + 0.12, sy + 0.1],
              [0.88 + rand() * 0.04, F[1] - 0.08 - rand() * 0.06]
            ];
          }
        ],
        // The long arcs that frame the shape, fixed rather than random.
        frame: [frameArcs.length, () => frameArcs[arc++ % frameArcs.length]]
      };

      const delayOf: Record<Family, number> = {
        frame: 0.15,
        upper: 0.3,
        lower: 0.42,
        band: 0.55,
        crown: 0.7
      };

      lines = [];
      for (const fam of FAMILIES) {
        const [count, next] = shape[fam];
        for (let n = 0; n < count; n++) {
          const [p0, p1, p2] = next();
          const pts = new Float32Array(N * 2);
          for (let i = 0; i < N; i++) {
            const [x, y] = bezier(p0, p1, p2, F, i / (N - 1));
            pts[i * 2] = x * w;
            pts[i * 2 + 1] = y * h;
          }
          lines.push({
            fam,
            pts,
            live: pts.slice(),
            strong: fam === "frame" || rand() < 0.3,
            delay: delayOf[fam] + rand() * 0.45
          });
        }
      }

      // --- Points ----------------------------------------------------------
      dots = [];
      const add = (x: number, y: number, c: number) => {
        const big = rand() < 0.03;
        const r = big ? 1.4 + rand() ** 2 * 1.8 : 0.35 + rand() * 0.85;
        const a = big ? 2 : rand() < 0.45 ? 0 : rand() < 0.65 ? 1 : 2;
        const angle = rand() * Math.PI * 2;
        const drift = (16 + rand() * 50) * (x < w * 0.5 ? 1.3 : 0.8);
        dots.push({
          x,
          y,
          c,
          r: r * (narrow ? 0.9 : 1),
          a,
          near: big,
          dx: Math.cos(angle) * drift,
          dy: Math.sin(angle) * drift,
          delay: 0.05 + rand() * 0.8
        });
      };

      // Along the lines: clustered, tighter towards the point.
      const drawable = lines.filter(l => l.fam !== "frame");
      const along = Math.round(3200 * k);
      for (let n = 0; n < along; n++) {
        const line = drawable[Math.floor(rand() * drawable.length)];
        const s = rand() * 0.93;
        const i = Math.floor(s * (N - 1));
        const spread = (0.004 + 0.045 * Math.pow(1 - s, 1.2)) * h;
        const x = line.pts[i * 2] + gauss() * 0.01 * w;
        const y = line.pts[i * 2 + 1] + gauss() * spread;
        const r = rand();
        let c: number;
        if (line.fam === "band" || line.fam === "crown") {
          c = r < 0.55 ? SIGNAL : r < 0.85 ? BRAND : DUSK;
        } else if (s > 0.75 && r < 0.45) {
          c = BRAND;
        } else if (line.fam === "upper") {
          // The upper wing is the reference's blue field.
          c = r < 0.34 ? DEEP : r < 0.8 ? BODY : r < 0.93 ? DUSK : BRAND;
        } else {
          // The lower wing runs violet into magenta.
          c = r < 0.45 ? DUSK : r < 0.72 ? BRAND : r < 0.9 ? BODY : SIGNAL;
        }
        add(x, y, c);
      }

      // The loose field: a teardrop envelope, widest at the left, closing on
      // the point.
      const loose = Math.round(1800 * k);
      for (let n = 0; n < loose; n++) {
        const nx = Math.pow(rand(), 0.85) * 0.97;
        const half = 0.4 * Math.pow(Math.max(0, 1 - nx / F[0]), 0.55) + 0.025;
        const ny = F[1] + gauss() * half * 0.75;
        if (ny < 0.01 || ny > 0.99) continue;
        const r = rand();
        // The reference's loose field is blue speckle with warm flecks.
        add(
          nx * w,
          ny * h,
          r < 0.42 ? BODY : r < 0.62 ? DUSK : r < 0.84 ? SIGNAL : DEEP
        );
      }

      // A sprinkling everywhere, so the edge of the shape is never a line.
      const stray = Math.round(260 * k);
      for (let n = 0; n < stray; n++) {
        const r = rand();
        add(
          rand() * 0.9 * w,
          rand() * h,
          r < 0.55 ? BODY : r < 0.8 ? SIGNAL : BRAND
        );
      }

      // A rebuilt scene starts at rest. Mass goes with area, so the few
      // large points are the slow, heavy ones.
      const n = dots.length;
      ox = new Float32Array(n);
      oy = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      dpx = new Float32Array(n);
      dpy = new Float32Array(n);
      glow = new Float32Array(n);
      mass = Float32Array.from(dots, d => 0.5 + d.r * d.r);
      dotsAwake = false;

      // --- Signals: a few small travellers, for the settled state ----------
      signals = [];
      const travellers = Math.round(26 * k);
      wings = [];
      lines.forEach((l, i) => {
        if (l.fam !== "frame" && l.fam !== "crown") wings.push(i);
      });
      for (let n = 0; n < travellers; n++) {
        signals.push({
          line: wings[Math.floor(rand() * wings.length)],
          s: 0.25 + rand() * 0.75,
          speed: 0.045 + rand() * 0.04,
          warp: false
        });
      }
      // And a larger pool that only shows while the pointer is on the figure.
      const warpers = Math.round(140 * k);
      for (let n = 0; n < warpers; n++) {
        signals.push({
          line: wings[Math.floor(rand() * wings.length)],
          s: rand(),
          speed: 0.05 + rand() * 0.05,
          warp: true
        });
      }

      // --- Gradients: each family darkens and warms towards the point ------
      const span = (stops: [number, string][], x0 = 0) => {
        const g = ctx.createLinearGradient(x0, 0, F[0] * w, 0);
        for (const [o, c] of stops) g.addColorStop(o, c);
        return g;
      };
      // Upper wing blue into violet; lower wing violet into magenta. Both
      // close on magenta at the point, as the reference does.
      grads = {
        upper: span([
          [0, rgba(pal[BODY], 0)],
          [0.16, rgba(pal[BODY], 0.28)],
          [0.5, rgba(pal[DEEP], 0.42)],
          [0.8, rgba(deeper, 0.55)],
          [1, rgba(pal[BRAND], 0.85)]
        ]),
        lower: span([
          [0, rgba(pal[DUSK], 0)],
          [0.16, rgba(pal[DUSK], 0.26)],
          [0.5, rgba(pal[DUSK], 0.42)],
          [0.8, rgba(pal[BRAND], 0.58)],
          [1, rgba(pal[BRAND], 0.85)]
        ]),
        band: span([
          [0, rgba(pal[SIGNAL], 0)],
          [0.2, rgba(pal[SIGNAL], 0.24)],
          [0.7, rgba(pal[BRAND], 0.42)],
          [1, rgba(pal[SIGNAL], 0.85)]
        ]),
        crown: span(
          [
            [0, rgba(pal[SIGNAL], 0.08)],
            [0.6, rgba(pal[SIGNAL], 0.3)],
            [1, rgba(pal[BRAND], 0.7)]
          ],
          0.5 * w
        ),
        frame: span([
          [0, rgba(pal[BODY], 0.04)],
          [0.5, rgba(pal[BODY], 0.18)],
          [1, rgba(pal[BRAND], 0.35)]
        ])
      };
    };

    // --- The magnet ----------------------------------------------------------

    // Where the pointer is, in the canvas's own px, and whether it is in the
    // magnet's zone or on the teardrop itself.
    const pointer = {
      cx: 0,
      cy: 0,
      has: false,
      x: 0,
      y: 0,
      inZone: false,
      onFigure: false
    };
    // The magnet follows the pointer with a little lag; k is its strength.
    const mag = { x: 0, y: 0, k: 0 };
    let hover = 0;

    // The field: every point leans towards the magnet, most strongly at a
    // middle distance, and not at all at FOCUS. Written into fx/fy.
    let fx = 0;
    let fy = 0;
    const field = (x: number, y: number) => {
      fx = 0;
      fy = 0;
      if (mag.k <= 0) return;
      const anchor = Math.pow(clamp01((FOCUS[0] * w - x) / (0.55 * w)), 0.7);
      if (anchor <= 0) return;
      const ddx = mag.x - x;
      const ddy = mag.y - y;
      const sx = REACH_X * w;
      const sy = REACH_Y * h;
      const g = Math.exp(
        -(ddx * ddx) / (2 * sx * sx) - (ddy * ddy) / (2 * sy * sy)
      );
      const p = MAGNET * mag.k * g * anchor;
      const cap = PULL_CAP * h;
      fy = cap * Math.tanh((ddy * p) / cap);
      fx = cap * 0.4 * Math.tanh((ddx * p * 0.3) / (cap * 0.4));
    };

    const deform = () => {
      for (const l of lines) {
        const p = l.pts;
        const q = l.live;
        for (let i = 0; i < p.length; i += 2) {
          field(p[i], p[i + 1]);
          q[i] = p[i] + fx;
          q[i + 1] = p[i + 1] + fy;
        }
      }
    };

    // Inside the teardrop: the same envelope the loose points are drawn in.
    const onShape = (x: number, y: number) => {
      const nx = x / w;
      const ny = y / h;
      if (nx < -0.02 || nx > FOCUS[0] + 0.03) return false;
      const half = 0.4 * Math.pow(Math.max(0, 1 - nx / FOCUS[0]), 0.55) + 0.04;
      return Math.abs(ny - FOCUS[1]) < half;
    };

    const approach = (from: number, to: number, rate: number, dt: number) => {
      const next = from + (to - from) * (1 - Math.exp(-rate * dt));
      return Math.abs(next - to) < 0.001 ? to : next;
    };

    const updatePointer = (dt: number) => {
      pointer.inZone = false;
      pointer.onFigure = false;
      if (pointer.has && w && h) {
        // In the scene's px: the figure's box, not the bleeding canvas.
        const rect = figure.getBoundingClientRect();
        pointer.x = pointer.cx - rect.left;
        pointer.y = pointer.cy - rect.top;
        pointer.inZone =
          pointer.x > -0.1 * w &&
          pointer.x < 1.1 * w &&
          pointer.y > -0.5 * h &&
          pointer.y < 1.5 * h;
        pointer.onFigure = pointer.inZone && onShape(pointer.x, pointer.y);
      }
      if (pointer.inZone) {
        if (mag.k < 0.01) {
          mag.x = pointer.x;
          mag.y = pointer.y;
        } else {
          mag.x = approach(mag.x, pointer.x, 7, dt);
          mag.y = approach(mag.y, pointer.y, 7, dt);
        }
      }
      mag.k = approach(
        mag.k,
        pointer.inZone ? 1 : 0,
        pointer.inZone ? 3.5 : 2,
        dt
      );
      hover = approach(
        hover,
        pointer.onFigure ? 1 : 0,
        pointer.onFigure ? 4 : 1.6,
        dt
      );
    };

    // One step of the points' physics, and where each is drawn. Every point
    // is a mass on a spring to its place (its resting spot, moved by the
    // broad magnet). Near the pointer a softened inverse-square force pulls
    // it in; when the pointer goes, the spring brings it home, overshooting
    // once. Semi-implicit Euler at 120Hz or finer, so it cannot blow up.
    const stepDots = (t: number, dt: number) => {
      const on = pointer.inZone;
      dotPull = approach(dotPull, on ? 1 : 0, on ? 5 : 3, dt);
      const bent = mag.k > 0;
      const steps = dt > 0 ? Math.min(6, Math.ceil(dt * 120)) : 0;
      const hs = steps ? dt / steps : 0;
      const px = pointer.x;
      const py = pointer.y;
      const R2 = DOT_REACH * DOT_REACH;
      const E2 = DOT_SOFT * DOT_SOFT;
      const test = (DOT_REACH + 40) * (DOT_REACH + 40);
      let awake = false;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const e = ease((t - d.delay) / 1.7);
        let bx = d.x + d.dx * (1 - e);
        let by = d.y + d.dy * (1 - e);
        if (bent) {
          field(bx, by);
          bx += fx;
          by += fy;
        }
        let x = ox[i];
        let y = oy[i];
        let u = vx[i];
        let v = vy[i];
        const qx = px - bx;
        const qy = py - by;
        const near = dotPull > 0 && qx * qx + qy * qy < test;

        if (near || x || y || u || v) {
          const m = mass[i];
          const k = DOT_SPRING * m;
          const c = 2 * DOT_DAMPING * Math.sqrt(k * m);
          // Pull grows with size, but slower than mass: the big points
          // answer later and travel less.
          const q = DOT_PULL * Math.pow(m, 0.7) * dotPull;
          for (let s = 0; s < steps; s++) {
            let ax = -k * x - c * u;
            let ay = -k * y - c * v;
            if (near) {
              const rx = qx - x;
              const ry = qy - y;
              const r2 = rx * rx + ry * ry;
              if (r2 < R2) {
                const soft = r2 + E2;
                const cut = 1 - r2 / R2;
                const f = (q * cut * cut) / (soft * Math.sqrt(soft));
                ax += f * rx;
                ay += f * ry;
              }
            }
            u += (ax / m) * hs;
            v += (ay / m) * hs;
            x += u * hs;
            y += v * hs;
          }
          if (
            !near &&
            Math.abs(x) + Math.abs(y) < 0.02 &&
            Math.abs(u) + Math.abs(v) < 0.05
          ) {
            x = y = u = v = 0;
          } else {
            awake = true;
          }
          ox[i] = x;
          oy[i] = y;
          vx[i] = u;
          vy[i] = v;
        }

        dpx[i] = bx + x;
        dpy[i] = by + y;
        let g = 0;
        if (dotPull > 0) {
          const gx = px - dpx[i];
          const gy = py - dpy[i];
          const dd = Math.sqrt(gx * gx + gy * gy);
          if (dd < DOT_GLOW) g = dotPull * (1 - dd / DOT_GLOW) ** 2;
        }
        glow[i] = g;
      }
      dotsAwake = awake;
    };

    // --- Drawing -------------------------------------------------------------

    const drawHaze = (c: CanvasRenderingContext2D, k: number) => {
      if (k <= 0) return;
      const blot = (x: number, y: number, r: number, col: Rgb, a: number) => {
        const g = c.createRadialGradient(x * w, y * h, 0, x * w, y * h, r * w);
        g.addColorStop(0, rgba(col, a * k));
        g.addColorStop(1, rgba(col, 0));
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
      };
      blot(0.42, 0.3, 0.34, tint, 0.9);
      blot(0.44, 0.66, 0.36, tint, 0.9);
      blot(0.8, FOCUS[1], 0.26, wash, 0.4);
    };

    const drawLines = (
      c: CanvasRenderingContext2D,
      t: number,
      live = false,
      thick = 1
    ) => {
      if (!grads) return;
      for (const fam of FAMILIES) {
        const strong = new Path2D();
        const faint = new Path2D();
        for (const l of lines) {
          if (l.fam !== fam) continue;
          const reveal = ease((t - l.delay) / 1.9);
          if (reveal <= 0.01) continue;
          const upto = Math.floor(reveal * (N - 1));
          const p = l.strong ? strong : faint;
          const pts = live ? l.live : l.pts;
          p.moveTo(pts[0], pts[1]);
          for (let i = 1; i <= upto; i++) p.lineTo(pts[i * 2], pts[i * 2 + 1]);
        }
        c.strokeStyle = grads[fam];
        c.lineWidth = (fam === "frame" ? 0.7 : 0.65) * thick;
        c.globalAlpha = 1;
        c.stroke(strong);
        c.lineWidth = 0.45 * thick;
        c.globalAlpha = 0.55;
        c.stroke(faint);
      }
      c.globalAlpha = 1;
    };

    const drawDots = (
      c: CanvasRenderingContext2D,
      t: number,
      which: boolean,
      live = false
    ) => {
      const paths = pal.map(() => ALPHAS.map(() => new Path2D()));
      // Live, the points near the pointer glow: a halo in their own colour,
      // three strengths, and a white-hot centre on the nearest.
      const halos = pal.map(() => HALO_ALPHAS.map(() => new Path2D()));
      const cores = new Path2D();
      let lit = false;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (d.near !== which) continue;
        let x: number;
        let y: number;
        let r = d.r;
        let a = d.a;
        if (live) {
          // stepDots has placed it this frame.
          x = dpx[i];
          y = dpy[i];
          const g = glow[i];
          if (g > 0.03) {
            lit = true;
            r *= 1 + 0.35 * g;
            if (g > 0.25) a = 2;
            const hr = d.r * (2.2 + 3 * g) + 1.2;
            const hp = halos[d.c][g > 0.55 ? 2 : g > 0.25 ? 1 : 0];
            hp.moveTo(x + hr, y);
            hp.arc(x, y, hr, 0, Math.PI * 2);
            if (g > 0.35) {
              const cr = d.r * 0.55 + 0.3;
              cores.moveTo(x + cr, y);
              cores.arc(x, y, cr, 0, Math.PI * 2);
            }
          }
        } else {
          const e = ease((t - d.delay) / 1.7);
          x = d.x + d.dx * (1 - e);
          y = d.y + d.dy * (1 - e);
        }
        const p = paths[d.c][a];
        p.moveTo(x + r, y);
        p.arc(x, y, r, 0, Math.PI * 2);
      }
      // The halos go through a quarter-size layer and a blur, so they are a
      // soft bloom behind the points, not rings round them.
      const sc = sheenCtx;
      if (lit && sheen && sc) {
        wipe(sc);
        halos.forEach((row, ci) =>
          row.forEach((p, ai) => {
            sc.fillStyle = rgba(pal[ci], HALO_ALPHAS[ai]);
            sc.fill(p);
          })
        );
        stamp(c, sheen, `blur(${3 * dpr}px)`);
      }
      paths.forEach((row, ci) =>
        row.forEach((p, ai) => {
          c.fillStyle = rgba(pal[ci], ALPHAS[ai]);
          c.fill(p);
        })
      );
      if (lit) {
        c.fillStyle = rgba(page, 0.9);
        c.fill(cores);
      }
    };

    // `boost` is the hover: the point burns larger and brighter.
    const drawGlow = (c: CanvasRenderingContext2D, k: number, boost = 0) => {
      if (k <= 0) return;
      const x = FOCUS[0] * w;
      const y = FOCUS[1] * h;
      const r = 0.15 * Math.min(w, h * 1.1) * (1 + 0.45 * boost);
      const a = (v: number) => Math.min(1, v * k * (1 + 0.5 * boost));
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(page, a(0.95)));
      g.addColorStop(0.05, rgba(page, a(0.7)));
      g.addColorStop(0.12, rgba(pal[SIGNAL], a(0.42)));
      g.addColorStop(0.4, rgba(pal[SIGNAL], a(0.1)));
      g.addColorStop(1, rgba(pal[SIGNAL], 0));
      c.fillStyle = g;
      c.fillRect(x - r, y - r, r * 2, r * 2);
    };

    // The glow on the lines while the pointer is on the figure.
    const drawBloom = (c: CanvasRenderingContext2D, t: number) => {
      if (hover <= 0 || !bloom || !bloomCtx) return;
      wipe(bloomCtx);
      drawLines(bloomCtx, t, true, 4);
      c.save();
      c.globalAlpha = 0.5 * hover;
      stamp(c, bloom, `blur(${3 * dpr}px)`);
      c.restore();
    };

    // A point `s` of the way along a line, interpolated between samples.
    const at = (pts: Float32Array, s: number): Pt => {
      const f = clamp01(s) * (N - 1);
      const i = Math.min(N - 2, Math.floor(f));
      const u = f - i;
      return [
        pts[i * 2] + (pts[i * 2 + 2] - pts[i * 2]) * u,
        pts[i * 2 + 1] + (pts[i * 2 + 3] - pts[i * 2 + 1]) * u
      ];
    };

    // The travellers. At rest, a few short orange dashes drifting inwards.
    // On hover they, and a pool of others, run up to WARP times faster with
    // a long tail fading to a white-hot head: light at speed.
    const drawSignals = (
      c: CanvasRenderingContext2D,
      dt: number,
      k: number
    ) => {
      const speedUp = 1 + WARP * hover * hover;
      const tail = 0.045 + 0.2 * hover;
      c.lineCap = "round";
      for (const sg of signals) {
        const shown = sg.warp ? hover : k;
        if (shown <= 0.01) continue;
        sg.s += sg.speed * speedUp * dt;
        if (sg.s > 1) {
          // At speed, the light starts from the very start of the lines.
          sg.s = hover > 0.3 ? Math.random() * 0.12 : 0.25;
          if (sg.warp)
            sg.line = wings[Math.floor(Math.random() * wings.length)];
        }
        const rest = Math.min(1, (sg.s - 0.25) / 0.15, (1 - sg.s) / 0.1);
        const fast = Math.min(1, (1 - sg.s) / 0.05);
        const fade = Math.max(0, rest + (fast - rest) * hover);
        const alpha = (0.75 + 0.25 * hover) * shown * fade;
        if (alpha <= 0.01) continue;

        const pts = lines[sg.line].live;
        const s0 = Math.max(0, sg.s - tail);
        const [x0, y0] = at(pts, s0);
        const [x1, y1] = at(pts, sg.s);
        c.beginPath();
        c.moveTo(x0, y0);
        const last = Math.floor(clamp01(sg.s) * (N - 1));
        for (let i = Math.ceil(s0 * (N - 1)); i <= last; i++)
          c.lineTo(pts[i * 2], pts[i * 2 + 1]);
        c.lineTo(x1, y1);

        const g = c.createLinearGradient(x0, y0, x1, y1);
        // At rest this is the old solid dash; the fade and the hot head
        // come in with the hover.
        g.addColorStop(0, rgba(pal[SIGNAL], 0.6 * (1 - hover)));
        g.addColorStop(0.75, rgba(pal[SIGNAL], 1));
        g.addColorStop(1, rgba(hover > 0.15 ? page : pal[SIGNAL], 1));
        c.strokeStyle = g;
        if (hover > 0.05) {
          c.lineWidth = 2.5 + 3 * hover;
          c.globalAlpha = alpha * 0.22;
          c.stroke();
        }
        c.lineWidth = 1.2 + 0.4 * hover;
        c.globalAlpha = alpha;
        c.stroke();
      }
      c.globalAlpha = 1;
    };

    const offscreen = () => {
      const o = document.createElement("canvas");
      o.width = canvas.width;
      o.height = canvas.height;
      const c = o.getContext("2d");
      if (c) toScene(c, dpr);
      return [o, c] as const;
    };

    // The settled scene, rendered once into two depth layers.
    const cache = () => {
      // A canvas laid out at zero size (not yet sized, or display: none)
      // cannot be drawn from: drawImage throws on a 0-wide source. Found on
      // 28 Sep in the reduced-motion path; it was in the ported code too.
      if (!canvas.width || !canvas.height) return;
      const [f, fc] = offscreen();
      const [n, nc] = offscreen();
      if (!fc || !nc) return;
      drawHaze(fc, 1);
      drawLines(fc, SETTLED + 10);
      drawDots(fc, SETTLED + 10, false);
      drawDots(nc, SETTLED + 10, true);
      far = f;
      near = n;
    };

    const engaged = () =>
      pointer.inZone || mag.k > 0 || hover > 0 || dotPull > 0 || dotsAwake;

    // Settled and left alone: the two cached layers.
    const drawSettled = (t: number, dt: number) => {
      if (!far || !near) cache();
      if (!far || !near) return;
      wipe(ctx);
      stamp(ctx, far);
      stamp(ctx, near);
      // The point's light breathes by a few per cent — felt, not seen.
      drawGlow(ctx, 0.96 + 0.04 * Math.sin(t * 0.6));
      drawSignals(ctx, dt, ease((t - SETTLED) / 1.5));
    };

    // Settled, with the pointer in play: the scene drawn live, bent by the
    // magnet, glowing as far as the hover goes.
    const drawLive = (t: number, dt: number) => {
      const done = SETTLED + 10;
      deform();
      stepDots(done, dt);
      wipe(ctx);
      drawHaze(ctx, 1);
      drawLines(ctx, done, true, 1 + 0.4 * hover);
      drawBloom(ctx, done);
      drawDots(ctx, done, false, true);
      drawDots(ctx, done, true, true);
      drawGlow(ctx, 0.96 + 0.04 * Math.sin(t * 0.6), hover);
      drawSignals(ctx, dt, ease((t - SETTLED) / 1.5));
    };

    // During the resolve, the whole scene is drawn live anyway, so the
    // magnet and the points' physics already work on it.
    const drawResolving = (t: number, dt = 0) => {
      const live = mag.k > 0;
      if (live) deform();
      const moving = live || dotPull > 0 || dotsAwake || pointer.inZone;
      if (moving) stepDots(t, dt);
      wipe(ctx);
      drawHaze(ctx, ease((t - 0.2) / 2));
      drawLines(ctx, t, live);
      drawBloom(ctx, t);
      drawDots(ctx, t, false, moving);
      drawDots(ctx, t, true, moving);
      drawGlow(ctx, ease((t - GLOW_AT) / 1), hover);
    };

    // Reduced motion: the resolved composition, drawn once and left.
    if (reduce) {
      const still = () => {
        layout();
        cache();
        wipe(ctx);
        if (far && near) {
          stamp(ctx, far);
          stamp(ctx, near);
        }
        drawGlow(ctx, 1);
      };
      still();
      const ro = new ResizeObserver(still);
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    layout();

    let t = 0;
    let last = 0;
    let raf = 0;
    let frame = 0;
    let visible = false;

    const loop = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      frame++;
      updatePointer(dt);
      if (t < SETTLED) {
        t += dt;
        drawResolving(t, dt);
      } else if (engaged()) {
        t += dt;
        drawLive(t, dt);
      } else if (frame % 2 === 0) {
        // Settled and left alone: every other frame.
        t += dt * 2;
        drawSettled(t, dt * 2);
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(figure);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // A resize rebuilds the scene; once settled it stays settled.
    const ro = new ResizeObserver(() => {
      layout();
      if (t < SETTLED) drawResolving(t);
      else if (engaged()) drawLive(t, 0);
      else drawSettled(t, 0);
    });
    ro.observe(canvas);

    // The magnet reaches beyond the figure's box, so the pointer is followed
    // on the window; where it is, relative to the canvas, is worked out
    // each frame (the page may have scrolled under a still pointer).
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
      pointer.has = true;
    };
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) pointer.has = false;
    };
    const onBlur = () => {
      pointer.has = false;
    };
    if (finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onOut);
      window.addEventListener("blur", onBlur);
    }

    drawResolving(0);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <div className='livingSignal' ref={figureRef} aria-hidden='true'>
      <canvas className='livingSignal__canvas' ref={canvasRef} />
      {labels && (
        <>
          <p className='livingSignal__label livingSignal__label--top'>
            {labels.top.map(word => (
              <span key={word}>{word}</span>
            ))}
          </p>
          <p className='livingSignal__label livingSignal__label--bottom'>
            {labels.bottom.map(word => (
              <span key={word}>{word}</span>
            ))}
          </p>
        </>
      )}
      {annotation && (
        // 28 Sep, locked spec: the handwritten narrative, approved as part
        // of the picture. Placed in the figure's own box, in percentages,
        // so the arrow keeps pointing at FOCUS at every width.
        <div className='livingSignal__note'>
          <p className='livingSignal__noteText'>
            {annotation.map(line => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <svg
            className='livingSignal__arrow'
            viewBox='0 0 60 90'
            focusable='false'
          >
            <path d='M8 4 C 40 12, 52 40, 44 82' />
            <path d='M34 72 L 44 84 L 52 70' />
          </svg>
        </div>
      )}
    </div>
  );
}
