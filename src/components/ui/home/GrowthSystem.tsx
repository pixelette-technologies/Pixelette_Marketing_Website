"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

// FOURTH ATTEMPT at the figure beside the four commercial outcomes, and the
// first one that is not a chart. The three before it:
//
//   1. A stepped chain with the four outcomes labelled along it. It put the
//      four names on screen a second time, three hundred pixels from the grid
//      that already carried them, and a diagonal path leaves two empty
//      triangles in its own box.
//   2. An inward coil. Clean, filled its box, said too little.
//   3. Four ascending columns — the bar chart this replaces. It failed for a
//      reason worth writing down, because it passed every gate and shipped.
//
// WHY THE BAR CHART HAD TO GO. Four named columns at four different heights is
// a quantitative shape. The page is under a standing bar on unqualified proof
// figures, so it carried no axis, no ticks, no gridlines and no values, and the
// hover gave a name and never a number. All of that was correct and none of it
// helped: what was left was a chart that reads as a measurement, carries no
// measurement, and can never be allowed to carry one. It was not boring by
// accident. It was boring because it had been hollowed out to stay honest.
//
// WHAT THE COPY ALREADY SAID. Every one of the four descriptions in the grid
// beside this names an input and an output — the right market becomes qualified
// interest, demand becomes sales-ready conversations, first touch becomes a
// decision, performance becomes commercial return. And the fourth ends "and
// optimise accordingly", which is a return path into the first. So the shape
// the section's own words describe is a closed loop, not a ramp, and the
// section is called the Growth System. A loop claims RELATION, not magnitude,
// which is exactly the claim this page is allowed to make: there is nothing
// here a reader could quote as a figure, and nothing here that needs one.
//
// THE RING IS NOT A LIST. Attempt 1 failed by restating the four names in a
// second vertical stack beside the first. The outcomes on the left are now an
// ordered list, so a vertical figure on the right would repeat that failure
// exactly. The ring is the one arrangement that cannot be mistaken for the
// column it sits next to.
//
// THE HANDOFFS ARE THE POINT. Each arc carries the thing one stage gives the
// next. That is the content the bar chart threw away — four columns can only
// say "these are four things", and the arcs say "this one produces what that
// one runs on". The return arc is dashed and labelled `optimise`, so the
// forward reading stays a progression that feeds back rather than a wheel
// spinning in place.
//
// TABS, BECAUSE IT REALLY IS TABS. The core panel shows what the selected
// stage takes in and hands on, and that pair is NOT duplicated in the text
// beside it — so unlike the bar chart's hover label, this cannot be decoration
// and cannot be aria-hidden. Four controls selecting one of four panels is the
// tab pattern, so it is built as tabs: roving tabindex, arrow keys, Home and
// End, automatic activation. That also settles touch, where the old figure's
// hover-only label was simply unreachable.
//
// Pointer hover on either side selects too, and selection is STICKY — leaving
// does not reset it. A figure that snaps back to Demand every time the pointer
// crosses it flickers, and there is no state here worth protecting.
//
// Geometry and class names only. Every fill, stroke and type decision resolves
// from tokens in _growthSystem.scss, so the token gate holds and colour stays
// contextual.

interface Stage {
  name: string;
  /** The outcome copy from the brief. Rendered in the list on the left. */
  detail: string;
  /** What the stage runs on, and what it produces. Both are readings of the
   *  `detail` above, never new claims — the chain is already in the copy. */
  takesIn: string;
  handsOn: string;
  /** The word on the arc LEAVING this stage. Short form of `handsOn`, because
   *  an arc has a quarter of a circle to say it in. */
  handoff: string;
}

const STAGES: Stage[] = [
  {
    name: "Demand",
    detail:
      "Reach the right market with a proposition that earns attention and creates qualified interest.",
    takesIn: "the right market",
    handsOn: "qualified interest",
    // Short form. "qualified interest" set on the arc runs wide of the ring it
    // is meant to sit inside — the panel in the middle carries it in full.
    handoff: "interest"
  },
  {
    name: "Pipeline",
    detail:
      "Turn demand into sales-ready conversations and commercial opportunities.",
    takesIn: "qualified interest",
    handsOn: "sales-ready conversations",
    handoff: "conversations"
  },
  {
    name: "Conversion",
    detail:
      "Improve the journey from first touch to enquiry, opportunity and decision.",
    takesIn: "conversations",
    handsOn: "enquiry, then decision",
    handoff: "decisions"
  },
  {
    name: "Revenue",
    detail:
      "Connect marketing performance to commercial return and optimise accordingly.",
    takesIn: "decisions",
    handsOn: "commercial return",
    // The return path. Dashed, and the only handoff that is a verb rather than
    // a thing, because what travels back is a correction and not an output.
    handoff: "optimise"
  }
];

// The ring, in viewBox units that happen to equal design pixels at the figure's
// capped width. Nothing here is responsive; the whole svg scales as one.
const CENTRE = 130;
const RADIUS = 128;

/** Screen coordinates at `deg` around the ring. 0deg is due right and the
 *  angle increases CLOCKWISE, which is the direction the system runs. */
const at = (deg: number, r: number = RADIUS): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [CENTRE + r * Math.cos(rad), CENTRE + r * Math.sin(rad)];
};

/** Demand at the top, then clockwise. The stage index and the angle are locked
 *  together here so the pills, the arcs and the arrowheads cannot drift apart
 *  — every one of them derives its position from this. */
const angleOf = (i: number) => -90 + i * 90;

const fmt = ([x, y]: [number, number]) => `${x.toFixed(2)},${y.toFixed(2)}`;

interface GrowthSystemProps {
  /** The eyebrow, heading and standfirst, rendered on the server and passed
   *  through. They have no state and no reason to ship as client JavaScript;
   *  only the list and the ring below them do. */
  children: ReactNode;
}

export default function GrowthSystem({ children }: GrowthSystemProps) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (i: number) => `${uid}-stage-${i}`;
  const panelId = `${uid}-panel`;

  /** Arrow keys walk the ring and wrap, which is the one keyboard behaviour a
   *  circular tablist owes its own shape. Both axes are live: on a ring there
   *  is no honest answer to "is this horizontal or vertical", so
   *  aria-orientation is left unset and all four keys move by one. */
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const { key } = event;
    let next: number | null = null;

    if (key === "ArrowRight" || key === "ArrowDown") {
      next = (active + 1) % STAGES.length;
    } else if (key === "ArrowLeft" || key === "ArrowUp") {
      next = (active - 1 + STAGES.length) % STAGES.length;
    } else if (key === "Home") {
      next = 0;
    } else if (key === "End") {
      next = STAGES.length - 1;
    }

    if (next === null) return;

    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const current = STAGES[active];

  return (
    <div className='growthSystem'>
      <header>
        {children}

        {/* An ordered list, not the 2x2 grid this replaces. That grid read DOWN
            its columns — Demand and Conversion in the first, Pipeline and
            Revenue in the second — so the framework's order survived only in
            a comment and in the prose line beneath it. A chain that has to
            explain its own sequence in a sentence underneath is not drawn
            correctly, and once the four are numbered the sentence has nothing
            left to do. */}
        <ol className='growthSystem__stages'>
          {STAGES.map((stage, i) => (
            <li
              key={stage.name}
              className={
                i === active
                  ? "growthSystem__stage growthSystem__stage--active"
                  : "growthSystem__stage"
              }
              // Pointer-only, and deliberately so. This list is not a second
              // set of controls — the ring's tabs are the controls, and they
              // are reachable by keyboard and by touch. Every word here is
              // visible at all times regardless of what is selected, so a
              // reader who never triggers this loses nothing but the highlight.
              onMouseEnter={() => setActive(i)}
            >
              <span className='growthSystem__stageIndex' aria-hidden='true'>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className='h4'>{stage.name}</h4>
                <p className='small'>{stage.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className='small growthSystem__closing'>
          Every channel should have a reason to exist.
        </p>
      </header>

      <div className='growthSystem__figure'>
        <div className='growthSystem__ring'>
          {/* Arcs, arrowheads and handoff words. aria-hidden because every one
              of these words reaches a reader through the panel in the middle,
              which is real text in the document. */}
          <svg
            className='growthSystem__circuit'
            viewBox='0 0 260 260'
            aria-hidden='true'
            focusable='false'
          >
            {STAGES.map((stage, i) => {
              const from = angleOf(i);
              const isReturn = i === STAGES.length - 1;

              // The arrowhead sits at 72 of the 90 degrees rather than at the
              // end, because the end is under the pill that caps the arc. Its
              // rotation is the tangent at that point: a quarter turn on from
              // the radius, which is what running clockwise means.
              const head = at(from + 72);

              return (
                <g
                  key={stage.name}
                  className={
                    i === active
                      ? "growthSystem__arc growthSystem__arc--active"
                      : "growthSystem__arc"
                  }
                >
                  <path
                    className={
                      isReturn
                        ? "growthSystem__path growthSystem__path--return"
                        : "growthSystem__path"
                    }
                    d={`M${fmt(at(from))} A${RADIUS},${RADIUS} 0 0 1 ${fmt(
                      at(from + 90)
                    )}`}
                  />

                  <path
                    className='growthSystem__head'
                    d='M0,-4.5 L8,0 L0,4.5 Z'
                    transform={`translate(${fmt(head)}) rotate(${from + 162})`}
                  />
                </g>
              );
            })}
          </svg>

          {/* The words the arcs carry, riding the ring at each arc's midpoint.
              These were <text> inside the circle, at a radius chosen to keep
              them clear of it, and that was wrong twice over: a horizontal
              word centred on a 45-degree point extends TANGENTIALLY, so the
              long ones crossed the ring anyway, and pulling them further in
              put them on top of the panel in the middle — at 768px the figure
              read "optimise TAKES IN interest" across one line.

              On the ring they cannot do either. They cut their own arc exactly
              as the stations cut theirs, which is also the truer picture: the
              handoff is something the link carries, not something floating
              near it. */}
          <div className='growthSystem__handoffs' aria-hidden='true'>
            {STAGES.map((stage, i) => (
              <span
                key={stage.name}
                className={
                  i === active
                    ? `growthSystem__handoff growthSystem__handoff--${i} growthSystem__handoff--active`
                    : `growthSystem__handoff growthSystem__handoff--${i}`
                }
              >
                {stage.handoff}
              </span>
            ))}
          </div>

          {/* The stations. HTML rather than <text> in the svg: these are the
              controls, and a real <button> is the only thing that gets focus,
              touch and assistive technology right without being talked into
              it. They sit ON the ring and take the page's own ground, so each
              one cuts the arc beneath it. */}
          <div className='growthSystem__tabs' role='tablist'>
            {STAGES.map((stage, i) => (
              <button
                key={stage.name}
                type='button'
                role='tab'
                id={tabId(i)}
                aria-selected={i === active}
                aria-controls={panelId}
                tabIndex={i === active ? 0 : -1}
                ref={node => {
                  tabs.current[i] = node;
                }}
                className={`growthSystem__node growthSystem__node--${i}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={onKeyDown}
              >
                {stage.name}
              </button>
            ))}
          </div>

          {/* What the selected stage runs on and what it produces. This pair is
              the one thing on the figure that is NOT written out beside it,
              which is the whole reason the ring is interactive rather than a
              picture — and the reason it is a tabpanel rather than a tooltip.
              tabIndex 0 because it holds no focusable content of its own. */}
          <div
            className='growthSystem__core'
            role='tabpanel'
            id={panelId}
            aria-labelledby={tabId(active)}
            tabIndex={0}
          >
            <p className='growthSystem__coreLabel'>Takes in</p>
            <p className='growthSystem__coreValue'>{current.takesIn}</p>
            <span className='growthSystem__coreRule' aria-hidden='true' />
            <p className='growthSystem__coreLabel'>Hands on</p>
            <p className='growthSystem__coreValue'>{current.handsOn}</p>
          </div>
        </div>

        {/* The one line of new copy the figure needed. The ring can draw the
            return path and label it `optimise`, but it cannot say why the
            system does not simply end at revenue, and that is the argument the
            loop exists to make. */}
        <p className='small growthSystem__caption'>
          Revenue does not end the system. It optimises what feeds it.
        </p>
      </div>
    </div>
  );
}
