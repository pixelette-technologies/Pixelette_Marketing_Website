// The four commercial outcomes, as four columns.
//
// THIRD ATTEMPT, and the first two are worth knowing about because both failed
// by eye after passing every gate.
//
//   1. A stepped chain with the four outcomes labelled along it. It put the
//      four names on screen a second time, three hundred pixels from the grid
//      that already carried them, and a diagonal path leaves two empty
//      triangles in its own box.
//   2. An inward coil. Clean, filled its box, said too little.
//
// WHAT IS MEASURED HERE — AND WHAT IS NOT. Four named columns at four
// different heights is a quantitative shape, and that is a deliberate choice
// rather than an oversight. It carries NO axis, NO ticks, NO gridlines and NO
// values, and the hover gives a name and never a number, so the figure states
// an order of magnitude between stages and nothing a reader could quote. The
// home page is under a standing bar on unqualified proof figures; this stays
// the right side of it only as long as no number is ever added to it.
//
// The columns ascend, so the shape reads as each stage building toward
// revenue. Descending would have read as a volume funnel — demand being the
// widest count — which is the other honest reading and not the one the section
// argues. Revenue is the tallest and the only crimson one: the section's
// heading promises a number that matters and that is where it lands.
//
// THE ORDER IS THE FRAMEWORK'S, left to right, matching the closing line
// beneath the grid. Note that the grid itself reads DOWN its columns, so the
// two are consistent with each other and not with a naive Z-order read.
//
// HOVER. Each column is a <g> holding its own label, revealed on hover and on
// focus-within by CSS alone — no JavaScript, no state, nothing to hydrate.
// That is only defensible because the label is redundant: all four names are
// already in text beside this, so a touch user, a keyboard user and a screen
// reader lose nothing by never seeing it. The svg stays aria-hidden for the
// same reason.
//
// Geometry and class names only; every fill and stroke resolves from tokens in
// _growthDiagram.scss, so the token gate holds and colour stays contextual.

/** x, height, label. Width 56 on a 36 gap, so the four span 332 of the 420
 *  box and sit on equal 44 margins. Heights accelerate slightly rather than
 *  stepping evenly, which stops the four reading as a mechanical ramp. */
const BARS = [
  { x: 44, height: 110, label: "Demand" },
  { x: 136, height: 165, label: "Pipeline" },
  { x: 228, height: 235, label: "Conversion" },
  { x: 320, height: 300, label: "Revenue" }
];

const BASELINE = 360;
const WIDTH = 56;

export default function GrowthDiagram() {
  return (
    <svg
      className='growthDiagram'
      viewBox='0 0 420 400'
      aria-hidden='true'
      focusable='false'
    >
      {BARS.map(({ x, height, label }, i) => {
        const top = BASELINE - height;
        const isLast = i === BARS.length - 1;

        return (
          <g
            key={label}
            className={
              isLast
                ? "growthDiagram__bar growthDiagram__bar--accent"
                : "growthDiagram__bar"
            }
          >
            <rect
              className='growthDiagram__col'
              x={x}
              y={top}
              width={WIDTH}
              height={height}
              rx='3'
            />
            {/* Centred on the column, 18 above it. Uppercase in the markup
                rather than by text-transform, which is the kind of SVG support
                gap that only shows up in a browser. */}
            <text
              className='growthDiagram__tip'
              x={x + WIDTH / 2}
              y={top - 18}
              textAnchor='middle'
            >
              {label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Somewhere to stand. No axis above it and no tick on it — a baseline
          gives the figure a ground without turning it into a measurement. */}
      <line
        className='growthDiagram__base'
        x1='30'
        y1={BASELINE}
        x2='390'
        y2={BASELINE}
      />
    </svg>
  );
}
