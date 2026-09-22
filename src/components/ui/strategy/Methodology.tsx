import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { METHODOLOGY_ANCHOR, methodology } from "@/data/strategy";
import DimensionWave from "./DimensionWave";

// The process, on the page's first dark band.
//
// ONE CONNECTED JOURNEY, NOT SIX CARDS — the brief's requirement and the
// section's whole argument. It was a SPINE: a hairline down the band with a
// node and a stage hanging off it. On 22 Sep 2026 the stages came off on
// instruction and the wave took their place, which makes the same argument
// with less of it: one continuous line, six points, read in order.
//
// THE FIGURE IS CONTEXTUAL, NOT CONFIGURED. It carries no ground prop and this
// component passes it nothing. Its light-ground values are its base and
// _dimensionWave.scss restates them under .band-dark, which is the rule
// _pointItem.scss exists to demonstrate: switching colour from a call site is
// what produced four live contrast failures at once, so ground is read from
// the band instead. Put the wave back in the hero and it recolours itself.
//
// WHY THE DARK BAND GOES HERE AND NOT TO THE DIAGNOSTIC. _surfaces.scss allows
// three per route; this page spends two, and the centrepiece gets neither.
// .band-dark recolours headings, lead, body, small and eyebrow and NOTHING
// else, and every dark-ground contrast fault in this codebase has come from
// moving something interactive onto the panel family — the Growth System's
// cards had to be reverted to a light surface on review feedback that they
// "are not visible properly", after every glyph inside had passed its contrast
// floor. A diagnostic is a dozen such containers: option edges, a radio dot, a
// disabled button, a progress track, six score scales. This section is prose
// and a figure, so it takes the band and the instrument keeps the tested
// light ground.

const Methodology = () => {
  const { eyebrow, heading, lead } = methodology;

  return (
    <div className='band-dark'>
      <Container className='main'>
        <section className='methodology' id={METHODOLOGY_ANCHOR}>
          <header>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {heading}
            </Heading>
            <Text className='lead'>{lead}</Text>
          </header>

          {/* THE SIX STAGES WERE A LIST HERE, ON A SPINE: a numeral, a name,
              an imperative and a description each. They came off on
              instruction on 22 Sep 2026 and the figure took their place.

              The names survive, because the figure carries all six in order —
              which was always the section's actual claim. What is off the page
              is the imperative and the description per stage. Both are still
              in `dimensions` in the copy file, unrendered and labelled as
              such, so restoring the list is re-adding this block rather than
              retyping the brief.

              The figure MOVED rather than being copied: it was in the hero,
              and rendering the same six names twice on one page would have
              been the page repeating itself rather than building. */}
          <DimensionWave />
        </section>
      </Container>
    </div>
  );
};

export default Methodology;
