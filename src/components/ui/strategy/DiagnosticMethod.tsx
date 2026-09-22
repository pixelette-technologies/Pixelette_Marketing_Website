import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { diagnosticLenses, diagnosticMethod } from "@/data/strategy";

// The six lenses. The page's ONE dark band, of the three _surfaces.scss allows
// and route:walk enforces.
//
// WHY THIS SECTION AND NOT THE INSTRUMENT. The instrument is the centrepiece,
// so it looks like the obvious candidate. It is the wrong one: .band-dark
// recolours headings, lead, body, small and eyebrow and NOTHING ELSE, and a
// dark ground is where every contrast fault in this codebase has come from —
// the Growth System's cards had to be reverted to a light surface on review
// feedback for exactly this. Radio controls, hairline-bordered option rows, a
// disabled button and a live readout are the last things that should be the
// first to sit on the panel family. They stay on the tested light ground; this
// section, which is prose and numerals, takes the band.
//
// It also has to earn the band as PUNCTUATION rather than as a separator,
// which is the _surfaces.scss rule. It does: the order is the claim this page
// is making, and this is the section that argues for it. It sits directly
// above the instrument, so the white panel reads as an object against it.
//
// ROWS ON A HAIRLINE, the third sanctioned layout idiom — .capabilityList on
// /services and .sectorList on /industries are the other two. A grid of six
// equal boxes would say the lenses are parallel and interchangeable, and the
// whole argument of the section is that they are ordered and dependent. Same
// reasoning, recorded in [[08 Design system constraints]], that moved both hub
// pages off their grids on 22 Sep.
//
// The numerals take --color-footer-eyebrow, the marking tone, exactly as
// CapabilityModel's do: the brand anchor measures 2.77 on this ground and is
// barred. Colour is contextual here — nothing is switched from a call site.

const DiagnosticMethod = () => {
  const { eyebrow, heading, lead } = diagnosticMethod;

  return (
    <div className='band-dark'>
      <Container className='main'>
        <section className='diagnosticMethod'>
          <header>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {heading}
            </Heading>
            <Text className='lead'>{lead}</Text>
          </header>

          <div className='diagnosticMethod__list' data-reveal='stagger'>
            {diagnosticLenses.map(({ id, index, name, summary }) => (
              <div key={id} className='diagnosticMethod__row'>
                <Text className='diagnosticMethod__index'>{index}</Text>
                {/* The numeral hangs in its own column and everything else
                    sits in one, which is .capabilityList__group's shape on
                    /services exactly.

                    IT WAS THREE COLUMNS — numeral, name, summary — until the
                    page was looked at. That reads well at 1440px and badly on
                    a phone: the summary wraps onto its own line and starts at
                    the gutter while the name above it is still indented by the
                    numeral column, so the two halves of one row do not line up
                    with each other. The fixed name column also wrapped "Growth
                    priorities" onto two lines and left row 06 taller than the
                    five above it. */}
                <div className='diagnosticMethod__main'>
                  {/* The .h3 SCALE on an h4 ELEMENT: the eyebrow is the
                      section's h2 and the visual .h2 is the h3, so the lenses
                      sit one level below. The same visual-level /
                      semantic-level split the rest of the site uses. */}
                  <Heading className='h3 diagnosticMethod__name' level={4}>
                    {name}
                  </Heading>
                  <Text className='body diagnosticMethod__summary'>
                    {summary}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default DiagnosticMethod;
