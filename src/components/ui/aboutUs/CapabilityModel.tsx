import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutCapabilities } from "@/data/aboutus";

// The capability model. It replaces OurTeam — five invented portraits with
// names and job titles, under a heading claiming a team that cannot be
// substantiated — and it is the page's strongest visual moment.
//
// WHY THIS IS NOT FOUR CARDS. Four white boxes in a row is the shape the
// instruction rules out by name, and it would also be the third card grid on a
// page that is meant to get materially shorter. What is here instead is a
// SPINE: four tall cells sharing one segmented hairline across the band, each
// opening on a mono numeral and landing its name on a common baseline at the
// bottom of the cell. The numerals are the site's own device — PointItem sets
// the Growth System's 01–04 the same way — so this reads as house vocabulary
// rather than a new mannerism.
//
// NO DESCRIPTIONS, DELIBERATELY. None were supplied for the four areas and the
// content rule is to ship the pattern without the missing element rather than
// invent one. Four names set at .h3 on a dark band, with air above them, say
// more than four sentences of filler would.
//
// THE DARK GROUND IS ONE OF TWO ON THIS PAGE. The cap is three; the logo strip
// takes the other, and it has no choice — every logo in it is knockout white.
// So there is one dark band left in the budget and this section spends it,
// because the model is the thing a buyer is here to understand.
//
// Colour is contextual: .band-dark sets the heading, lead and eyebrow tones,
// and nothing on this component switches colour from a call site.

const CapabilityModel = () => {
  const { eyebrow, heading, lead, items } = aboutCapabilities;

  return (
    <div className='band-dark'>
      <Container className='main'>
        <section className='capabilityModel'>
          <header>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {heading}
            </Heading>
            <Text className='lead'>{lead}</Text>
          </header>

          <div className='capabilityModel__grid' data-reveal='stagger'>
            {items.map(({ index, title }) => (
              <div key={index} className='capabilityModel__item'>
                <Text className='capabilityModel__index'>{index}</Text>
                <Heading className='h3 capabilityModel__title' level={4}>
                  {title}
                </Heading>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default CapabilityModel;
