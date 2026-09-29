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
//   - Fine pointer only: the two layers shift by a few pixels at different
//     depths. No repulsion, no trail.

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

interface Line {
  fam: Family;
  pts: Float32Array; // px, x/y interleaved
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
}

// --- Timing -----------------------------------------------------------------

const SETTLED = 3.5;
const GLOW_AT = 2.2;

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
    let grads: Record<Family, CanvasGradient> | null = null;
    // The settled scene, cached: lines, haze and far points; near points.
    let far: HTMLCanvasElement | null = null;
    let near: HTMLCanvasElement | null = null;

    // --- The scene ---------------------------------------------------------

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const narrow = w < 520;
      dpr = Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      far = null;
      near = null;

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

      // --- Signals: a few small travellers, for the settled state ----------
      signals = [];
      const travellers = Math.round(26 * k);
      const wings: number[] = [];
      lines.forEach((l, i) => {
        if (l.fam !== "frame" && l.fam !== "crown") wings.push(i);
      });
      for (let n = 0; n < travellers; n++) {
        signals.push({
          line: wings[Math.floor(rand() * wings.length)],
          s: 0.25 + rand() * 0.75,
          speed: 0.045 + rand() * 0.04
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

    const drawLines = (c: CanvasRenderingContext2D, t: number) => {
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
          p.moveTo(l.pts[0], l.pts[1]);
          for (let i = 1; i <= upto; i++)
            p.lineTo(l.pts[i * 2], l.pts[i * 2 + 1]);
        }
        c.strokeStyle = grads[fam];
        c.lineWidth = fam === "frame" ? 0.7 : 0.65;
        c.globalAlpha = 1;
        c.stroke(strong);
        c.lineWidth = 0.45;
        c.globalAlpha = 0.55;
        c.stroke(faint);
      }
      c.globalAlpha = 1;
    };

    const drawDots = (
      c: CanvasRenderingContext2D,
      t: number,
      which: boolean
    ) => {
      const paths = pal.map(() => ALPHAS.map(() => new Path2D()));
      for (const d of dots) {
        if (d.near !== which) continue;
        const e = ease((t - d.delay) / 1.7);
        const x = d.x + d.dx * (1 - e);
        const y = d.y + d.dy * (1 - e);
        const p = paths[d.c][d.a];
        p.moveTo(x + d.r, y);
        p.arc(x, y, d.r, 0, Math.PI * 2);
      }
      paths.forEach((row, ci) =>
        row.forEach((p, ai) => {
          c.fillStyle = rgba(pal[ci], ALPHAS[ai]);
          c.fill(p);
        })
      );
    };

    const drawGlow = (c: CanvasRenderingContext2D, k: number) => {
      if (k <= 0) return;
      const x = FOCUS[0] * w;
      const y = FOCUS[1] * h;
      const r = 0.15 * Math.min(w, h * 1.1);
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(page, 0.95 * k));
      g.addColorStop(0.05, rgba(page, 0.7 * k));
      g.addColorStop(0.12, rgba(pal[SIGNAL], 0.42 * k));
      g.addColorStop(0.4, rgba(pal[SIGNAL], 0.1 * k));
      g.addColorStop(1, rgba(pal[SIGNAL], 0));
      c.fillStyle = g;
      c.fillRect(x - r, y - r, r * 2, r * 2);
    };

    const drawSignals = (
      c: CanvasRenderingContext2D,
      dt: number,
      k: number
    ) => {
      c.strokeStyle = rgba(pal[SIGNAL], 1);
      c.lineWidth = 1.2;
      c.lineCap = "round";
      for (const sg of signals) {
        sg.s += sg.speed * dt;
        if (sg.s > 1) sg.s = 0.25;
        const pts = lines[sg.line].pts;
        const i = Math.floor(sg.s * (N - 1));
        const j = Math.max(0, i - 2);
        const fade = Math.min(1, (sg.s - 0.25) / 0.15, (1 - sg.s) / 0.1);
        c.globalAlpha = 0.75 * k * Math.max(0, fade);
        c.beginPath();
        c.moveTo(pts[j * 2], pts[j * 2 + 1]);
        c.lineTo(pts[i * 2], pts[i * 2 + 1]);
        c.stroke();
      }
      c.globalAlpha = 1;
    };

    const offscreen = () => {
      const o = document.createElement("canvas");
      o.width = canvas.width;
      o.height = canvas.height;
      const c = o.getContext("2d");
      if (c) c.setTransform(dpr, 0, 0, dpr, 0, 0);
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

    // Pointer depth: eased towards the pointer's position in the figure.
    const pointer = { x: 0, y: 0, active: false };
    const shift = { x: 0, y: 0 };

    const drawSettled = (t: number, dt: number) => {
      if (!far || !near) cache();
      if (!far || !near) return;
      const tx = pointer.active ? (pointer.x / w - 0.5) * 2 : 0;
      const ty = pointer.active ? (pointer.y / h - 0.5) * 2 : 0;
      const k = Math.min(1, dt * 1.6);
      shift.x += (tx - shift.x) * k;
      shift.y += (ty - shift.y) * k;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(far, -shift.x * 2, -shift.y * 2, w, h);
      ctx.drawImage(near, -shift.x * 6, -shift.y * 6, w, h);
      // The point's light breathes by a few per cent — felt, not seen.
      drawGlow(ctx, 0.96 + 0.04 * Math.sin(t * 0.6));
      drawSignals(ctx, dt, ease((t - SETTLED) / 1.5));
    };

    // During the resolve, the whole scene is drawn live.
    const drawResolving = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      drawHaze(ctx, ease((t - 0.2) / 2));
      drawLines(ctx, t);
      drawDots(ctx, t, false);
      drawDots(ctx, t, true);
      drawGlow(ctx, ease((t - GLOW_AT) / 1));
    };

    // Reduced motion: the resolved composition, drawn once and left.
    if (reduce) {
      const still = () => {
        layout();
        cache();
        ctx.clearRect(0, 0, w, h);
        if (far && near) {
          ctx.drawImage(far, 0, 0, w, h);
          ctx.drawImage(near, 0, 0, w, h);
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
      if (t < SETTLED) {
        t += dt;
        drawResolving(t);
      } else if (pointer.active || frame % 2 === 0) {
        // Settled: every other frame unless the pointer is in play.
        const step = pointer.active ? dt : dt * 2;
        t += step;
        drawSettled(t, step);
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
      if (t >= SETTLED) drawSettled(t, 0);
      else drawResolving(t);
    });
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    if (finePointer) {
      figure.addEventListener("pointermove", onMove);
      figure.addEventListener("pointerleave", onLeave);
    }

    drawResolving(0);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      figure.removeEventListener("pointermove", onMove);
      figure.removeEventListener("pointerleave", onLeave);
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
