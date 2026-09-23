import { Heading, Text } from "@/components/feature";
import {
  LuChartColumn,
  LuChartNoAxesCombined,
  LuCoins,
  LuFilter,
  LuUsers
} from "react-icons/lu";
import type { IconType } from "react-icons";

// FIFTH ATTEMPT at the figure beside the four commercial outcomes, and the
// first one drawn to a supplied reference rather than derived here. The four
// before it:
//
//   1. A stepped chain with the four outcomes labelled along it. It put the
//      four names on screen a second time, three hundred pixels from the grid
//      that already carried them, and a diagonal path leaves two empty
//      triangles in its own box.
//   2. An inward coil. Clean, filled its box, said too little.
//   3. Four ascending columns — a bar chart. It failed for a reason worth
//      keeping: four named columns at four heights is a quantitative shape,
//      and this page is under a standing bar on unqualified proof figures, so
//      it carried no axis, no ticks, no gridlines and no values. All of that
//      was correct and none of it helped. It was not boring by accident; it
//      was boring because it had been hollowed out to stay honest.
//   4. The ring this rebuilds. Four bare pills on a circle, each arc carrying
//      one word of handoff, and a panel in the middle that swapped "takes in"
//      and "hands on" as you moved between them.
//
// WHAT THE REFERENCE CHANGES, AND WHY THE FOURTH HAD TO GIVE WAY. Attempt 4
// was right about the shape and wrong about where the content goes. A ring is
// still the only arrangement that cannot be mistaken for the numbered column
// it sits beside, and the loop still claims RELATION rather than magnitude,
// which is the one claim this page is allowed to make. But it put its real
// content — what each stage takes in and hands on — behind an interaction, so
// a reader saw one quarter of it at a time and a printed page saw none.
//
// The reference puts everything on screen at once. Nothing on this figure is
// behind a pointer any more, which is the whole of what attempt 4 got wrong.
//
// --- THE TETHERED QUESTIONS CAME BACK OFF, 23 Sep ---------------------------
// The reference hung a bordered note off each card carrying the question that
// stage answers. They were built, and then removed on instruction.
//
// WHAT THAT BOUGHT. Those four notes were the binding constraint on the whole
// drawing: the east and west ones had to fit between their card and the edge
// of the box, which held the ring to 48cqi and dragged every card, every
// label and the medallion down with it. The figure was rendering at 62% of
// the reference and the type had bottomed out at 10–11px, with the
// medallion's flow line at 9px. With the notes gone the ring is 76cqi, the
// cards are half again as wide, and **nothing in the figure is below 11px any
// more** — which was the top item this rebuild left open.
//
// WHAT IT COSTS, AND IT IS WORTH STATING. The questions were the one thing in
// the figure that was not a restatement of the numbered list beside it. The
// cards now carry condensed versions of copy that is set in full three hundred
// pixels to their left, which is exactly the failure that sank attempt 1. What
// keeps this one honest is that the ring says something the list cannot — the
// order closes, and revenue feeds demand — so the figure is still earning its
// space on its shape rather than on its words.
//
// SO THERE IS NO STATE LEFT, AND NO CLIENT BOUNDARY. This file was "use
// client" for the tablist alone. Every word it renders is now in the document
// at first paint, the highlight that pairs an outcome with its station is done
// in the stylesheet with :has(), and nothing here ships as JavaScript. That
// also retires the contrivance where GrowthSection passed the heading block in
// as children to keep it off the client bundle — there is no client bundle to
// keep it off, so the heading is rendered here with everything else.
//
// WHAT IS NOT DRAWN FROM THE REFERENCE. The reference is a picture and says
// nothing about a narrow viewport. Below a container width of 590px the cards
// on the ring fall under a legible size, so the stylesheet stands the whole
// thing up as a column and drops the circuit. The circuit is aria-hidden
// decoration; the cards and the centre are text, and all of it survives the
// collapse.
//
// Geometry and class names only, as before. Every fill, stroke and type
// decision resolves from tokens in _growthSystem.scss, so the token gate holds
// and colour stays contextual.

interface Stage {
  name: string;
  /** The outcome copy from the brief. Rendered in the numbered list on the
   *  left, and the only text here management has signed off. */
  detail: string;
  /** The reference's one-line reading of `detail`, on the card. A condensation
   *  of approved copy, never a new claim. */
  summary: string;
  icon: IconType;
}

const STAGES: Stage[] = [
  {
    name: "Demand",
    detail:
      "Reach the right market with a proposition that earns attention and creates qualified interest.",
    summary: "Create qualified interest",
    icon: LuUsers
  },
  {
    name: "Pipeline",
    detail:
      "Turn demand into sales-ready conversations and commercial opportunities.",
    summary: "Turn interest into opportunities",
    icon: LuFilter
  },
  {
    name: "Conversion",
    detail:
      "Improve the journey from first touch to enquiry, opportunity and decision.",
    // The reference sets this one with a trailing full stop and the other
    // three without. Four fragments in identical boxes take identical
    // punctuation, and the 21 Sep rule already took trailing stops off
    // everything on this site that is not a sentence.
    summary: "Turn opportunities into decisions",
    icon: LuChartColumn
  },
  {
    name: "Revenue",
    detail:
      "Connect marketing performance to commercial return and optimise accordingly.",
    // The reference sets this one at 55 characters against the other three's
    // 24, 31 and 33, and on a card sized for those three it ran to six lines —
    // which made the Revenue card half again as tall as the others and threw
    // the ring off its own symmetry. It also restated, almost word for word,
    // the question that used to be tethered six pixels to its left. Condensed
    // to the register of its three siblings, off the same approved line in the
    // list. The cards are wider now that the notes are gone, but the shorter
    // line is the better one and it stays.
    summary: "Connect performance to commercial return",
    icon: LuCoins
  }
];

// The ring, in viewBox units that happen to equal design pixels at one width
// and nothing else. Nothing in the svg is responsive; the whole drawing scales
// as one, and the HTML layered over it is sized in `cqi` so it scales on the
// same footing. That rule was learned the hard way here — see the container
// query in _growthSystem.scss.
const CENTRE = 130;
const RADIUS = 128;

/** Screen coordinates at `deg` around the ring. 0deg is due right and the
 *  angle increases CLOCKWISE, which is the direction the system runs. */
const at = (deg: number, r: number = RADIUS): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [CENTRE + r * Math.cos(rad), CENTRE + r * Math.sin(rad)];
};

/** Demand at the top, then clockwise. The stage index and the angle are locked
 *  together here so the cards, the arcs and the arrowheads cannot drift apart
 *  — every one of them derives its position from this. */
const angleOf = (i: number) => -90 + i * 90;

const fmt = ([x, y]: [number, number]) => `${x.toFixed(2)},${y.toFixed(2)}`;

// Static, because this section renders once per page and there is no client
// boundary left to hand out a useId from. If it is ever rendered twice on one
// document, these have to become unique or the second copy's arcs will resolve
// against the first copy's gradients.
const ARC_GRADIENT = (i: number) => `growthSystemArc${i}`;

export default function GrowthSystem() {
  return (
    <div className='growthSystem'>
      <header>
        <Heading className='eyebrow' level={2}>
          Four commercial outcomes
        </Heading>

        <Heading className='h2 sectionTitle' level={3}>
          Everything we do has to move <span>a number that matters</span>
        </Heading>

        <Text className='lead'>
          Marketing activity is not the objective. Commercial progress is. We
          design each programme around the part of the growth system that needs
          to move.
        </Text>

        {/* An ordered list, not a 2x2 grid. That grid read DOWN its columns —
            Demand and Conversion in the first, Pipeline and Revenue in the
            second — so the framework's order survived only in a comment and in
            a prose line beneath it. A chain that has to explain its own
            sequence in a sentence underneath is not drawn correctly, and once
            the four are numbered the sentence has nothing left to do. */}
        <ol className='growthSystem__stages'>
          {STAGES.map((stage, i) => (
            <li
              key={stage.name}
              className={`growthSystem__stage growthSystem__stage--${i}`}
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
        <div className='growthSystem__plot'>
          {/* The argument the ring can draw but cannot state: why the system
              does not simply end at revenue. It sits over the dashed arc it
              describes, which is the only reason it is at the top left. */}
          <p className='growthSystem__feedback'>
            <span className='growthSystem__feedbackLead'>
              Learn. Optimise. Repeat.
            </span>{" "}
            Insights from performance feed the next cycle.
          </p>

          <div className='growthSystem__loop'>
            {/* Arcs and arrowheads. aria-hidden and decorative in the strict
                sense: every relationship it draws is stated in the cards and
                notes that sit on top of it, and the stylesheet drops it
                entirely on a narrow container without losing a word. */}
            <svg
              className='growthSystem__circuit'
              viewBox='0 0 260 260'
              aria-hidden='true'
              focusable='false'
            >
              <defs>
                {STAGES.map((stage, i) => {
                  const [x1, y1] = at(angleOf(i));
                  const [x2, y2] = at(angleOf(i) + 90);

                  return (
                    <linearGradient
                      key={stage.name}
                      id={ARC_GRADIENT(i)}
                      gradientUnits='userSpaceOnUse'
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                    >
                      <stop
                        offset='0'
                        className='growthSystem__stop--from'
                      />
                      <stop offset='1' className='growthSystem__stop--to' />
                    </linearGradient>
                  );
                })}
              </defs>

              {/* The ring itself, under everything. A closed hairline, so the
                  loop reads as continuous even where an arc has been cut by
                  the card sitting on it. */}
              <circle
                className='growthSystem__ringLine'
                cx={CENTRE}
                cy={CENTRE}
                r={RADIUS}
              />

              {STAGES.map((stage, i) => {
                const from = angleOf(i);
                // The return path. Dashed, so the forward reading stays a
                // progression that feeds back rather than a wheel spinning in
                // place — three solid arcs and one that is visibly a
                // correction.
                const isReturn = i === STAGES.length - 1;

                // The arrowhead sits at 66 of the 90 degrees, well back from
                // the end, because a station covers the end of its own arc.
                // MEASURED, not guessed: a card is 141px tall on a ring of
                // radius 268, and it is centred on the ring point, so along
                // the tangent it reaches 70px either side — about 15 degrees.
                // The badge sits a further 27px beyond that, taking the
                // covered span to roughly 21 degrees. At 80 the arrowhead was
                // drawn, correctly, underneath the badge, and the arcs looked
                // like they simply stopped at the cards.
                //
                // Its rotation is the tangent at that point: a quarter turn on
                // from the radius, which is what running clockwise means.
                const head = at(from + 66);

                return (
                  <g key={stage.name} className='growthSystem__arc'>
                    <path
                      className={
                        isReturn
                          ? "growthSystem__path growthSystem__path--return"
                          : "growthSystem__path"
                      }
                      stroke={`url(#${ARC_GRADIENT(i)})`}
                      d={`M${fmt(at(from))} A${RADIUS},${RADIUS} 0 0 1 ${fmt(
                        at(from + 90)
                      )}`}
                    />

                    <path
                      className='growthSystem__head'
                      d='M0,-6.5 L12,0 L0,6.5 Z'
                      transform={`translate(${fmt(head)}) rotate(${from + 156})`}
                    />
                  </g>
                );
              })}
            </svg>

            {/* What the whole loop is for. Fixed copy, not a panel that swaps
                — the thing it names is the same whichever stage you are
                looking at, which is the point the ring exists to make. */}
            <div className='growthSystem__core'>
              <span className='growthSystem__coreIcon' aria-hidden='true'>
                <LuChartNoAxesCombined />
              </span>
              <p className='growthSystem__coreTitle'>Commercial impact</p>
              <p className='growthSystem__coreFlow'>
                Measure <span aria-hidden='true'>&rarr;</span> Learn{" "}
                <span aria-hidden='true'>&rarr;</span> Optimise
              </p>
              <span className='growthSystem__coreRule' aria-hidden='true' />
            </div>
          </div>

          {/* The stations: a badge and a card apiece. */}
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;

            return (
              <div
                key={stage.name}
                className={`growthSystem__station growthSystem__station--${i}`}
              >
                <span className='growthSystem__badge' aria-hidden='true'>
                  <Icon />
                </span>

                <div className='growthSystem__card'>
                  <p className='growthSystem__cardName'>{stage.name}</p>
                  <p className='growthSystem__cardLine'>{stage.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
