import { Heading, Text } from "@/components/feature";
import { dimensions, strategyHero } from "@/data/strategy";

// The six dimensions as a wave. The hero's figure.
//
// PROVENANCE. The geometry, the two-axis trick and the single set of labels
// are kept from a version of this page built alongside the current brief and
// then withdrawn with the content it described. It was the right figure for
// the wrong six names, so the drawing survived the rewrite and the data did
// not. Three things changed with it: the dimensions replaced the lenses, the
// colours moved from the dark family to the light ground it now sits on, and
// the stagger attribute came off — see the note on the list below.
//
// WHY A WAVE AND NOT SIX CARDS. The brief rules out six rounded boxes by name,
// and it is right to: six boxes say the dimensions are six separate things you
// could buy. This is ONE CONTINUOUS LINE with six points on it, so the figure
// makes the section's actual claim — that these are stages of one piece of
// thinking, read in order.
//
// TWO GEOMETRIES, ONE SET OF LABELS. The wave runs horizontally on a desktop
// and vertically below 768px, because six labelled points across a 360px screen
// is four-point text. Only the PATHS are duplicated in the DOM and both are
// aria-hidden; the names and numerals appear once and are moved by CSS custom
// properties, so a screen reader reads the six dimensions one time, in order.
// Duplicating the labels per breakpoint would have read them twice.
//
// preserveAspectRatio="none" plus vector-effect="non-scaling-stroke" is what
// lets the path stretch to the container while the line keeps its weight. The
// circles are HTML rather than SVG for the same reason the home page's growth
// figure has trouble with its hover labels: text inside a stretched viewBox
// scales with it, and that figure's labels end up around 11px on a phone.
// These do not scale.
//
// Geometry only. Every colour resolves from tokens in _dimensionWave.scss.

/** One full sine cycle across the six points: 0, up, down through the middle,
 *  and back. i/(n-1) rather than i/n, so the last point closes the cycle. */
const waveAt = (i: number, n: number) => Math.sin((2 * Math.PI * i) / (n - 1));

/** Horizontal: a 1200x160 box. The six x positions are the centres of six
 *  equal columns, so the circles line up with a 6-track grid at any width. */
const H_BOX = { width: 1200, height: 160, mid: 80, amplitude: 44 };

/** Vertical: a 200x540 box, stretched to the container on x. The amplitude is
 *  28% of the width either side of centre, which keeps the widest label inside
 *  the gutters at 360px.
 *
 *  540 RATHER THAN THE 600 THIS STARTED AT, and the number is not free: the
 *  points sit height/6 apart, and each one is a 52px circle with its label
 *  above it, so anything under about 80px of spacing makes a label collide
 *  with the circle above. 540 gives 90. The track height in the stylesheet
 *  must change with this — see the note there. */
const V_BOX = { width: 200, height: 540, mid: 100, amplitude: 56 };

const sampleWave = (
  from: number,
  to: number,
  mid: number,
  amplitude: number,
  horizontal: boolean
) => {
  const span = to - from;
  const points: string[] = [];
  for (let step = 0; step <= 100; step += 1) {
    const along = from + (span * step) / 100;
    const offset =
      mid - amplitude * Math.sin((2 * Math.PI * (along - from)) / span);
    points.push(horizontal ? `${along},${offset}` : `${offset},${along}`);
  }
  return `M ${points.join(" L ")}`;
};

const count = dimensions.length;

const horizontalPath = sampleWave(
  (0.5 / count) * H_BOX.width,
  ((count - 0.5) / count) * H_BOX.width,
  H_BOX.mid,
  H_BOX.amplitude,
  true
);

const verticalPath = sampleWave(
  (0.5 / count) * V_BOX.height,
  ((count - 0.5) / count) * V_BOX.height,
  V_BOX.mid,
  V_BOX.amplitude,
  false
);

const DimensionWave = () => {
  return (
    <div className='dimensionWave'>
      <p className='label dimensionWave__label'>{strategyHero.pathLabel}</p>

      <div className='dimensionWave__track'>
        <svg
          className='dimensionWave__line dimensionWave__line--h'
          viewBox={`0 0 ${H_BOX.width} ${H_BOX.height}`}
          preserveAspectRatio='none'
          aria-hidden='true'
          focusable='false'
        >
          <path d={horizontalPath} vectorEffect='non-scaling-stroke' />
        </svg>

        <svg
          className='dimensionWave__line dimensionWave__line--v'
          viewBox={`0 0 ${V_BOX.width} ${V_BOX.height}`}
          preserveAspectRatio='none'
          aria-hidden='true'
          focusable='false'
        >
          <path d={verticalPath} vectorEffect='non-scaling-stroke' />
        </svg>

        {/* NO data-reveal='stagger', and the reason is worth keeping. Every
            point is absolutely positioned and centred with
            transform: translate(-50%, -50%); the reveal sets `transform` too,
            on a selector of equal specificity. Today the component rule wins on
            source order and the attribute is simply inert — but the day this
            figure moves below the fold, or the partials reorder, the reveal
            takes the transform and every circle jumps half its own width off
            its point. An attribute that does nothing and breaks the layout if
            it ever starts working does not belong in the markup.

            An ordered list, because the order is the claim. */}
        <ol className='dimensionWave__points'>
          {dimensions.map(({ id, index, name }, i) => {
            const swing = waveAt(i, count);

            return (
              <li
                key={id}
                className='dimensionWave__point'
                style={
                  {
                    // Horizontal: x is the column centre as a percentage, y is
                    // a pixel offset inside the 160px track.
                    "--x-h": `${((i + 0.5) / count) * 100}%`,
                    "--y-h": `${H_BOX.mid - H_BOX.amplitude * swing}px`,
                    // Vertical: x swings either side of the centre line as a
                    // percentage of the track's width.
                    //
                    // MINUS, NOT PLUS, and the sign is the whole point. The
                    // path is sampled as `mid - amplitude * sin(theta)` on
                    // both axes, so a point placed at `+ sin` is the path's
                    // MIRROR IMAGE. The horizontal pair always agreed because
                    // --y-h is also written as a subtraction; this one was a
                    // plus, so on every screen under 768px the six circles sat
                    // on the opposite side of the centre line from the wave
                    // they are supposed to be on, crossing it twice.
                    //
                    // It is invisible at a glance — the figure still looks
                    // like a wave with six circles near it — and it was caught
                    // by comparing the two formulae rather than by looking.
                    "--x-v": `${50 - (V_BOX.amplitude / V_BOX.width) * 100 * swing}%`,
                    "--y-v": `${((i + 0.5) / count) * V_BOX.height}px`
                  } as React.CSSProperties
                }
              >
                {/* .h4 rather than .h3: it is a label on a figure, not a row
                    heading, and six of them at .h3 across a desktop collide. */}
                <Heading className='h4 dimensionWave__name' level={3}>
                  {name}
                </Heading>
                <span className='dimensionWave__circle'>
                  {/* The ripple. An empty span rather than a pseudo-element on
                      the circle, because the circle already needs its own box
                      for the border and the fill, and a ::before would have to
                      fight the grid centring that puts the numeral in the
                      middle. aria-hidden because it is decoration with no
                      information in it — see _dimensionWave.scss. */}
                  <span className='dimensionWave__ripple' aria-hidden='true' />
                  <Text className='dimensionWave__index'>{index}</Text>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default DimensionWave;
