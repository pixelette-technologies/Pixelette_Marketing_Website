// The four commercial outcomes, drawn as one chain.
//
// It replaces `/home/growthBanner.webp` — a collage of an Edwardian figure,
// falling dollar bills and the Statue of Liberty. Nothing in it depicted
// Demand, Pipeline, Conversion or Revenue, the currency and the skyline were
// American on a UK agency's page, and money raining from the sky argued the
// opposite of the standfirst beside it: that activity is not the objective.
// It was also a 538px asset rendered at 663px, so it was soft.
//
// WHY A DIAGRAM AND NOT ANOTHER PHOTOGRAPH. The 2x2 beside this already names
// all four outcomes and describes each one, so a picture that labels the same
// four adds nothing. What the grid cannot say is that they are SERIAL — a
// grid reads as four parallel options. The chain says nothing reaches Revenue
// without passing through the three before it, which is the claim the closing
// line rests on: every channel should have a reason to exist.
//
// NO PROPORTIONS ANYWHERE. The moment a segment's length or a node's size
// stands for a quantity, this publishes a conversion rate — and the home page
// is under a standing bar on unqualified proof figures (the BlockGuard
// numbers are held off it for exactly this reason). So: even spacing, even
// steps, no axis, no ticks, no percentages. The one thing that varies is
// stroke weight, which reads as accumulation, not as a measurement.
//
// IT IS ROUTED ORTHOGONALLY, NOT AS A RISING LINE. A diagonal through four
// points is a chart, and a chart implies data. Right-angle turns with rounded
// corners read as a schematic instead — a route, not a plot.
//
// PAINT LIVES IN THE STYLESHEET. Every fill and stroke is a class, resolved in
// _growthDiagram.scss from the tokens. Nothing here carries a colour, which
// keeps the token gate satisfied and follows the house rule that colour is
// contextual rather than set at the call site.
//
// LABELS ARE LITERAL UPPERCASE, not `text-transform`. They render inside the
// SVG, so they scale with the viewBox: roughly 20px where the column is at
// its widest and around 10px on a phone, where this has wrapped to full width.
// That range is the one real cost of keeping the labels in the drawing.
//
// aria-hidden. The four outcomes are already in text beside it, so the drawing
// is decorative in the accessibility sense. Announcing it would read the
// framework out twice, and the alt text it replaces — "Growth Banner" —
// described the file rather than the content.

export default function GrowthDiagram() {
  return (
    <svg
      className='growthDiagram'
      viewBox='0 0 520 500'
      aria-hidden='true'
      focusable='false'
    >
      {/* Demand -> Pipeline. Right, then up, on an 18-unit corner. */}
      <path
        className='growthDiagram__link growthDiagram__link--1'
        d='M40 430 H142 a18 18 0 0 0 18 -18 V330'
      />
      {/* Pipeline -> Conversion. */}
      <path
        className='growthDiagram__link growthDiagram__link--2'
        d='M160 330 H262 a18 18 0 0 0 18 -18 V230'
      />
      {/* Conversion -> Revenue. */}
      <path
        className='growthDiagram__link growthDiagram__link--3'
        d='M280 230 H382 a18 18 0 0 0 18 -18 V130'
      />

      <circle className='growthDiagram__node' cx='40' cy='430' r='9' />
      <text className='growthDiagram__label' x='40' y='404'>
        DEMAND
      </text>

      <circle className='growthDiagram__node' cx='160' cy='330' r='9' />
      <text className='growthDiagram__label' x='160' y='304'>
        PIPELINE
      </text>

      <circle className='growthDiagram__node' cx='280' cy='230' r='9' />
      <text className='growthDiagram__label' x='280' y='204'>
        CONVERSION
      </text>

      {/* The one filled node and the one crimson label. The section's heading
          promises a number that matters; this is where it lands. */}
      <circle className='growthDiagram__halo' cx='400' cy='130' r='27' />
      <circle
        className='growthDiagram__node growthDiagram__node--end'
        cx='400'
        cy='130'
        r='13'
      />
      <text
        className='growthDiagram__label growthDiagram__label--end'
        x='400'
        y='88'
      >
        REVENUE
      </text>
    </svg>
  );
}
