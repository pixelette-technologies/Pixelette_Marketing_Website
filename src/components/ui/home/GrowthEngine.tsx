"use client";

import { useEffect, useRef } from "react";
import { readToken, useInView, useReducedMotion } from "@/lib/motion";

// THE GROWTH ENGINE — the hero's figure. 28 Sep 2026, the creative
// transformation brief, section 4.
//
// Signals enter at the top as attention, across the full width, and are drawn
// in through five gates — attention, demand, pipeline, conversion, revenue.
// Each gate lets some through; the rest peel away sideways and fade. What
// survives changes colour as it qualifies, and what reaches revenue lands in
// the output register along the foot: a row of bars, one per interval, that
// rises exactly as fast as the system above it produces.
//
// WHY A SIMULATION AND NOT A LOOPING DRAWING. The brief asks for "changing data
// points" and for the visual to "suggest intelligence and measurement". A
// looping path cannot do either honestly: its numbers would be decoration
// pretending to be data. Here the meters beside each gate and the register at
// the foot are the simulation's own throughput, so every moving part is a true
// statement about the drawing itself. There are NO NUMERALS anywhere on the
// figure, on purpose — this page is under a standing bar on unqualified
// figures, and a counter ticking in the hero would read as a claim about
// clients.
//
// WHY CANVAS. A hundred signals with tails is a few hundred draw calls a
// frame; as SVG it is a hundred DOM nodes re-laid every frame. Canvas also
// takes no layout, so it cannot shift anything around it.
//
// COLOURS COME FROM THE STYLESHEET. The token gate bars colour literals in
// src/, so the canvas reads the tokens off its own element at start-up.
//
// Motion policy: it runs only while on screen and while the tab is visible,
// and under a reduce preference it draws ONE settled frame — the same system,
// already populated, standing still. Nothing on the figure is information
// that is not also in the stage list beside it, which is real text.

export const ENGINE_STAGES = [
  "Attention",
  "Demand",
  "Pipeline",
  "Conversion",
  "Revenue"
] as const;

// The gates' vertical positions, as a fraction of the plot height. The HTML
// labels are placed from the same numbers, so text and drawing cannot drift.
const GATE_Y = [0.08, 0.27, 0.46, 0.65, 0.82];
// Half-width of each gate as a fraction of the plot width.
const GATE_HALF = [0.47, 0.35, 0.24, 0.15, 0.08];
// The chance a signal passes the gate BELOW each stage. Revenue has none.
const PASS = [0.6, 0.62, 0.66, 0.76];
// The output register: this many bars, each covering this many seconds.
const BINS = 26;
const BIN_SECONDS = 0.9;
const REGISTER_TOP = 0.9;

interface Particle {
  x0: number; // lane, -1..1 across the aperture
  y: number; // 0..1 down the plot
  speed: number;
  phase: number;
  stage: number; // index of the last gate passed
  dropped: boolean;
  exitX: number; // sideways offset once dropped, in plot widths
  alpha: number;
}

interface Palette {
  line: string;
  lineStrong: string;
  muted: string;
  signal: string;
  brand: string;
  ink: string;
}

export default function GrowthEngine() {
  const figureRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();
  const inView = useInView(figureRef, { margin: "0px" });

  // The simulation lives in a ref so pausing and resuming picks up where it
  // left off rather than restarting from an empty plot.
  const sim = useRef({
    particles: [] as Particle[],
    energy: [0, 0, 0, 0, 0],
    through: [0, 0, 0, 0, 0],
    bins: new Array<number>(BINS).fill(0),
    binClock: 0,
    spawnAcc: 0,
    seed: 7,
    time: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const figure = figureRef.current;
    if (!canvas || !figure) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette: Palette = {
      line: readToken(figure, "--color-line-card"),
      lineStrong: readToken(figure, "--color-line-strong"),
      muted: readToken(figure, "--color-muted"),
      signal: readToken(figure, "--color-brand-signal"),
      brand: readToken(figure, "--color-brand"),
      ink: readToken(figure, "--color-ink")
    };

    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    const state = sim.current;

    // Deterministic noise, so the settled frame under reduce is the same
    // picture every time rather than a different arrangement per visit.
    const rand = () => {
      state.seed = (state.seed * 16807) % 2147483647;
      return (state.seed - 1) / 2147483646;
    };

    const spawn = () => {
      state.particles.push({
        x0: rand() * 2 - 1,
        y: -0.03,
        speed: 0.075 + rand() * 0.05,
        phase: rand() * Math.PI * 2,
        stage: -1,
        dropped: false,
        exitX: 0,
        alpha: 0
      });
    };

    // The aperture's half-width at depth y, eased between gates, so every
    // live signal's path passes inside each gate it crosses.
    const halfAt = (y: number) => {
      if (y <= GATE_Y[0]) return GATE_HALF[0];
      for (let i = 0; i < GATE_Y.length - 1; i++) {
        if (y <= GATE_Y[i + 1]) {
          const t = (y - GATE_Y[i]) / (GATE_Y[i + 1] - GATE_Y[i]);
          const e = t * t * (3 - 2 * t);
          return GATE_HALF[i] + (GATE_HALF[i + 1] - GATE_HALF[i]) * e;
        }
      }
      return GATE_HALF[GATE_HALF.length - 1];
    };

    const step = (dt: number) => {
      state.time += dt;
      state.spawnAcc += dt;
      while (state.spawnAcc > 0.085) {
        state.spawnAcc -= 0.085;
        if (state.particles.length < 150) spawn();
      }

      state.binClock += dt;
      if (state.binClock > BIN_SECONDS) {
        state.binClock -= BIN_SECONDS;
        state.bins.shift();
        state.bins.push(0);
      }

      for (const p of state.particles) {
        if (p.dropped) {
          // Peel away sideways from where the gate turned it back, and fade.
          p.exitX += dt * 0.09 * Math.sign(p.x0 || 1);
          p.y += p.speed * dt * 0.15;
          p.alpha -= dt * 1.6;
          continue;
        }
        p.alpha = Math.min(1, p.alpha + dt * 3);
        p.y += p.speed * dt;
        const next = p.stage + 1;
        if (next < GATE_Y.length && p.y >= GATE_Y[next]) {
          p.stage = next;
          // Small steps, slow decay: the glow settles at a level set by the
          // gate's throughput instead of flashing per signal, which read as
          // the "constant pulsing" the brief (section 23) rules out.
          state.energy[next] = Math.min(1, state.energy[next] + 0.05);
          state.through[next] += 1;
          if (next === GATE_Y.length - 1) {
            state.bins[BINS - 1] += 1;
            p.alpha = 0; // absorbed into the register
          } else if (rand() > PASS[next]) {
            p.dropped = true;
          }
        }
      }
      state.particles = state.particles.filter(p => p.alpha > 0 && p.y < 1);

      for (let i = 0; i < state.energy.length; i++) {
        state.energy[i] = Math.max(0, state.energy[i] - dt * 0.3);
        // Throughput is a decaying count, so the meters settle into the
        // system's real ratios rather than growing without bound.
        state.through[i] *= Math.exp(-dt * 0.15);
      }
    };

    const posOf = (p: Particle, y: number) => {
      const half = halfAt(Math.max(0, y)) * w;
      const sway = Math.sin(state.time * 1.1 + p.phase) * 0.012 * w;
      return {
        x: w / 2 + p.x0 * half * 0.9 + sway * (1 - y) + p.exitX * w,
        y: y * h
      };
    };

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2;

      // The envelope: two faint curves through the gate ends, which is what
      // gives the system its shape without drawing a funnel.
      ctx!.strokeStyle = palette.line;
      ctx!.lineWidth = 1;
      for (const side of [-1, 1]) {
        ctx!.beginPath();
        for (let y = GATE_Y[0]; y <= GATE_Y[GATE_Y.length - 1] + 0.001; y += 0.01) {
          const x = cx + side * halfAt(y) * w;
          if (y === GATE_Y[0]) ctx!.moveTo(x, y * h);
          else ctx!.lineTo(x, y * h);
        }
        ctx!.stroke();
      }

      // Gates: a hairline aperture each, with end ticks and a centre node that
      // brightens as signals cross it.
      GATE_Y.forEach((gy, i) => {
        const y = gy * h;
        const half = GATE_HALF[i] * w;
        ctx!.strokeStyle = palette.lineStrong;
        ctx!.lineWidth = 1;
        ctx!.setLineDash([1, 4]);
        ctx!.beginPath();
        ctx!.moveTo(cx - half, y);
        ctx!.lineTo(cx + half, y);
        ctx!.stroke();
        ctx!.setLineDash([]);
        ctx!.beginPath();
        ctx!.moveTo(cx - half, y - 5);
        ctx!.lineTo(cx - half, y + 5);
        ctx!.moveTo(cx + half, y - 5);
        ctx!.lineTo(cx + half, y + 5);
        ctx!.stroke();

        const e = state.energy[i];
        if (e > 0.02) {
          ctx!.globalAlpha = e * 0.3;
          ctx!.fillStyle = palette.signal;
          ctx!.beginPath();
          ctx!.arc(cx, y, 5 + e * 6, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = 1;
        }
        ctx!.fillStyle = i === GATE_Y.length - 1 ? palette.brand : palette.ink;
        ctx!.beginPath();
        ctx!.arc(cx, y, 2.4, 0, Math.PI * 2);
        ctx!.fill();
      });

      // Signals, each with a short tail along its own path.
      for (const p of state.particles) {
        const head = posOf(p, p.y);
        const tail = posOf(p, Math.max(-0.03, p.y - 0.028));
        const qualified = p.stage >= 1 && !p.dropped;
        const colour = p.dropped
          ? palette.lineStrong
          : p.stage >= 3
            ? palette.brand
            : qualified
              ? palette.signal
              : palette.muted;

        ctx!.globalAlpha = Math.max(0, p.alpha) * (qualified ? 0.95 : 0.5);
        ctx!.strokeStyle = colour;
        ctx!.lineWidth = qualified ? 1.5 : 1;
        ctx!.beginPath();
        ctx!.moveTo(tail.x, tail.y);
        ctx!.lineTo(head.x, head.y);
        ctx!.stroke();
        ctx!.fillStyle = colour;
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, qualified ? 2 : 1.3, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      // The output register along the foot. One bar per interval, oldest on
      // the left, scaled to the busiest interval on screen. The newest bar is
      // still filling, which is why it grows while you watch it.
      const top = REGISTER_TOP * h;
      const base = h - 1;
      const span = w * 0.62;
      const x0 = cx - span / 2;
      const slot = span / BINS;
      const peak = Math.max(1, ...state.bins);
      ctx!.strokeStyle = palette.lineStrong;
      ctx!.beginPath();
      ctx!.moveTo(x0, base + 0.5);
      ctx!.lineTo(x0 + span, base + 0.5);
      ctx!.stroke();
      state.bins.forEach((count, i) => {
        if (!count) return;
        const bh = (count / peak) * (base - top);
        ctx!.globalAlpha = 0.35 + 0.65 * (i / (BINS - 1));
        ctx!.fillStyle = palette.brand;
        ctx!.fillRect(x0 + i * slot + slot * 0.2, base - bh, slot * 0.6, bh);
      });
      ctx!.globalAlpha = 1;

      // The meters are HTML, beside the labels; the drawing only feeds them.
      const max = Math.max(1, ...state.through);
      meterRefs.current.forEach((m, i) => {
        if (m) m.style.setProperty("--meter", String(state.through[i] / max));
      });
    }

    // Settle the system before the first paint, so the hero never opens on an
    // empty plot waiting for signals to arrive — and the still frame under
    // reduce is a working engine rather than an empty one.
    if (state.time === 0) {
      // Long enough to fill the whole register: BINS × BIN_SECONDS, in
      // fifteenth-of-a-second steps. At a sixtieth this was ~1,460 steps on
      // the main thread during hydration, and under a 4× CPU throttle it
      // showed up as the page's longest task. A signal moves under 1% of the
      // plot per coarse step, so no gate can be skipped.
      const WARM_STEP = 1 / 15;
      for (let t = 0; t < (BINS * BIN_SECONDS + 1) / WARM_STEP; t++) step(WARM_STEP);
    }

    if (reduce || !inView) {
      draw();
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      step(dt);
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (!document.hidden) raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
    };
  }, [reduce, inView]);

  return (
    <figure className='growthEngine' ref={figureRef}>
      <canvas className='growthEngine__plot' ref={canvasRef} aria-hidden='true' />
      <ol className='growthEngine__stages'>
        {ENGINE_STAGES.map((stage, i) => (
          <li
            key={stage}
            className='growthEngine__stage'
            style={{ top: `${GATE_Y[i] * 100}%` }}
          >
            <span className='growthEngine__label'>{stage}</span>
            <span
              className='growthEngine__meter'
              aria-hidden='true'
              ref={el => {
                meterRefs.current[i] = el;
              }}
            />
          </li>
        ))}
      </ol>
    </figure>
  );
}
