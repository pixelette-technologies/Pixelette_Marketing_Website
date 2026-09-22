import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { METHODOLOGY_ANCHOR, dimensions, methodology } from "@/data/strategy";

// The six stages, on the page's first dark band.
//
// ONE CONNECTED JOURNEY, NOT SIX CARDS — the brief's requirement and the
// section's whole argument. It is drawn as a SPINE: a single hairline running
// down the band with a node per stage, and the stages hanging off it. A
// vertical spine is a connected sequence at 1440px and an elegant vertical
// journey at 390px WITHOUT BEING TWO LAYOUTS, which is the only version of
// this that can be built inside the site's zero-breakpoint rule and the only
// version where the mobile reading is the real one rather than a fallback.
//
// Each stage's own content does fold: the name and its imperative take a 16rem
// basis and the description a 26rem one, so at full width they sit side by
// side across the spine and stack beneath each other on a phone. Flex bases,
// no media query.
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
// and numerals, so it takes the band and the instrument keeps the tested
// light ground.
//
// The node and the numerals take --color-footer-eyebrow, the marking tone that
// .band-dark gives its eyebrows and that CapabilityModel uses for the same job.
// The brand anchor measures 2.77 here and is barred, as everywhere on dark.

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

          <ol className='methodology__stages'>
            {dimensions.map(({ id, index, name, imperative, description }) => (
              <li key={id} className='methodology__stage'>
                {/* The numeral takes a row of its own rather than sitting
                    inside the head column. Inside it, the description beside
                    it started level with the NUMERAL and the stage name sat
                    below — so every description floated a line above the
                    heading it belonged to. Found by eye at 1440px. Giving the
                    numeral the full basis pushes both columns below it, which
                    fixes the alignment without a padding value tuned to the
                    numeral's own line box. */}
                <p className='methodology__index'>{index}</p>

                <div className='methodology__head'>
                  {/* The .h3 SCALE on an h4 ELEMENT: the eyebrow is the
                      section's h2 and the visual .h2 is the h3, so the stages
                      sit one level below. The same visual-level /
                      semantic-level split the rest of the site uses. */}
                  <Heading className='h3 methodology__name' level={4}>
                    {name}
                  </Heading>
                  <Text className='methodology__imperative'>{imperative}</Text>
                </div>

                <Text className='body methodology__body'>{description}</Text>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </div>
  );
};

export default Methodology;
