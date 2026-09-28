import type { ReactNode } from "react";
import { Container } from "@/components/common";
import { aiTechnologyData } from "@/data/home";
import InViewMark from "./InViewMark";

// "AI-ACCELERATED. HUMAN-LED." — 28 Sep 2026, the creative transformation
// brief, section 11. The page's one deliberate change of atmosphere, and its
// only dark band: the credibility line above the proof no longer spends one
// (see CredibilityStrip), so this is the first dark ground a reader meets.
//
// THE INSTRUMENT. Four channels, one per approved mark — faster insight,
// smarter prioritisation, scaled execution, clear accountability — each drawn
// as the kind of signal it describes: a noisy trace that resolves into one
// clear peak; a field of options with the few that matter picked out; one
// pattern repeated at scale; a line held against a target. A single vertical
// rule crosses all four and is labelled "Human decision". Everything to its
// right is what the decision produced. That rule is the section's argument —
// the technology accelerates, a person decides — drawn rather than said.
//
// WHAT IT IS NOT. It is not a product screenshot, and it does not depict
// MarketNerve. MarketNerve is in development and the brief bars exposing its
// functionality, architecture or screens, or presenting unreleased capability
// as available. Nothing here names a tool, shows a number, or claims a
// feature. The drawings are generic signal shapes, as abstract as a chart
// axis.
//
// READY FOR THE REAL THING. `visual` replaces the instrument wholesale. When
// approved MarketNerve visuals exist, they go in through that prop and the
// section's copy, ground and layout stay as they are.
//
// Motion: each trace draws in once when the section arrives, and the two
// noise channels drift slowly while — and only while — it is on screen.
// Under a reduce preference everything is simply drawn.

// Deterministic noise, so the server and every visit draw the same picture.
function noise(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const W = 400;
const H = 80;
const DECISION = 0.72; // where the human decision sits, as a fraction of W

function insightPath(): { full: string; peak: string } {
  const r = noise(11);
  const pts: [number, number][] = [];
  // Twice the width, so the drift can loop seamlessly by moving half of it.
  for (let x = 0; x <= W * 2; x += 5) {
    const px = x % W;
    const bump = 30 * Math.exp(-Math.pow((px - W * DECISION) / 14, 2));
    const jitter = (r() - 0.5) * 16 * (px < W * DECISION ? 1 : 0.35);
    pts.push([x, H / 2 + 8 - bump + jitter]);
  }
  const full = pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y.toFixed(1)}`).join("");
  const peak = pts
    .filter(([x]) => Math.abs((x % W) - W * DECISION) < 26 && x < W)
    .map(([x, y], i) => `${i ? "L" : "M"}${x},${y.toFixed(1)}`)
    .join("");
  return { full, peak };
}

function priorityBars() {
  const r = noise(29);
  return Array.from({ length: 28 }, (_, i) => {
    const h = 8 + r() * 44;
    return { x: 6 + i * 14, h, pick: false };
  }).map((b, _, all) => {
    // The three tallest to the right of the decision are the ones chosen.
    const right = all.filter(o => o.x > W * DECISION).sort((a, c) => c.h - a.h);
    return { ...b, pick: right.slice(0, 3).includes(b) };
  });
}

function executionPath(): string {
  // One motif, repeated. Left of the decision it is faint and irregular;
  // right of it the same shape repeats cleanly.
  let d = "";
  for (let x = 0; x < W * 2; x += 40) {
    const y = H / 2;
    d += `M${x},${y} L${x + 10},${y} L${x + 15},${y - 18} L${x + 21},${y + 14} L${x + 26},${y} L${x + 40},${y} `;
  }
  return d;
}

function accountabilityPath(): string {
  const r = noise(53);
  let d = "";
  for (let x = 0; x <= W; x += 8) {
    const trend = H - 16 - (x / W) * 36;
    const settle = x > W * DECISION ? 0.3 : 1;
    const y = trend + (r() - 0.5) * 14 * settle;
    d += `${x ? "L" : "M"}${x},${y.toFixed(1)}`;
  }
  return d;
}

const insight = insightPath();
const bars = priorityBars();
const execution = executionPath();
const accountability = accountabilityPath();

function Channel({ index, children }: { index: number; children: ReactNode }) {
  return (
    <svg
      className={`instrument__plot instrument__plot--${index}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio='none'
      aria-hidden='true'
      focusable='false'
    >
      {children}
    </svg>
  );
}

export default function IntelligenceSection({ visual }: { visual?: ReactNode }) {
  const { eyebrow, heading, lead, marks } = aiTechnologyData;

  return (
    <section className='intelligence band-dark'>
      <Container className='main'>
        <div className='intelligence__grid'>
          {/* The brief (section 11) makes "AI-accelerated. Human-led." the
              section itself, so it is the display line here, split at its
              full stop, with the second half in the signal tone. The approved
              8 Sep heading sits beneath it at subheading size rather than
              being dropped. */}
          <header className='intelligence__head'>
            <h2 className='intelligence__statement'>
              {eyebrow.split(/(?<=\.)\s+/).map((part, i) => (
                <span key={part} className={i ? "intelligence__turn" : undefined}>
                  {part}
                </span>
              ))}
            </h2>
            <h3 className='h3 intelligence__sub'>{heading}</h3>
            <p className='lead'>{lead}</p>
          </header>

          {visual ?? (
            <InViewMark className='instrument'>
              <p className='instrument__decision' aria-hidden='true'>
                <span>Human decision</span>
              </p>
              <ol className='instrument__rows'>
                {marks.map((mark, i) => (
                  <li key={mark} className='instrument__row'>
                    <span className='instrument__label'>
                      <span className='instrument__num' aria-hidden='true'>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {mark}
                    </span>
                    {i === 0 && (
                      <Channel index={0}>
                        <g className='instrument__drift'>
                          <path className='instrument__trace' d={insight.full} />
                        </g>
                        <path className='instrument__hit' d={insight.peak} />
                      </Channel>
                    )}
                    {i === 1 && (
                      <Channel index={1}>
                        {bars.map(b => (
                          <rect
                            key={b.x}
                            className={b.pick ? "instrument__bar is-picked" : "instrument__bar"}
                            x={b.x}
                            y={H - 8 - b.h}
                            width={6}
                            height={b.h}
                          />
                        ))}
                      </Channel>
                    )}
                    {i === 2 && (
                      <Channel index={2}>
                        <g className='instrument__drift instrument__drift--slow'>
                          <path className='instrument__trace' d={execution} />
                        </g>
                        <rect
                          className='instrument__veil'
                          x={0}
                          y={0}
                          width={W * DECISION}
                          height={H}
                        />
                      </Channel>
                    )}
                    {i === 3 && (
                      <Channel index={3}>
                        <rect
                          className='instrument__band'
                          x={0}
                          y={20}
                          width={W}
                          height={16}
                        />
                        <path className='instrument__line' d={accountability} />
                      </Channel>
                    )}
                  </li>
                ))}
              </ol>
            </InViewMark>
          )}
        </div>
      </Container>
    </section>
  );
}
