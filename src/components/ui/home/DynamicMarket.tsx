import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { dynamicMarketData } from "@/data";

// D4. This section used to be pulled 481px up the page with a negative margin
// so it would sit inside the 750px of empty panel EngagementStalls was holding
// open, and a decorative WhiteBackground SVG was absolutely positioned over
// the join to hide the seam — itself nudged with a second negative margin and
// three more breakpoints. With the hole gone there is nothing to climb into
// and nothing to cover, so the overlap, the blob and the fourteen media
// queries that maintained them across widths all go. The section stacks.
//
// The 15rem top corner radii that appeared only below 1366px went with them.
//
// Phase F. Guide anatomy: mainHeading is the eyebrow, subHeading is the h2,
// the standfirst is .lead.
//
// The hard <br /> inside the heading went too. It is not content — no word
// changes — it is a hand-set line break, and it fights both `text-wrap:
// balance` on the display classes and the measure cap on the copy. The heading
// now breaks where the type system decides at every width instead of at the
// one width somebody happened to be looking at.
//
// Both strings are stored lowercase here. The eyebrow uppercases itself and
// the h2 gets its capital from the ::first-letter rule in _type, so neither
// needed a byte changed.

const DynamicMarket = () => {
  return (
    <div className='dynamicMarket sec'>
      <Container className='main'>
        <header>
          <div>
            <Heading className='eyebrow' level={2}>
              growing in dynamic markets is tough
            </Heading>
            <Heading className='h2' level={3}>
              we make it achievable
            </Heading>
          </div>
          <Text className='lead'>
            The right strategy makes all the difference. Our industry-focused
            approach simplifies the journey, offering customised solutions that
            drive real, measurable success
          </Text>
        </header>
        <section data-reveal='stagger'>
          {dynamicMarketData.map((el, index) => (
            <ArrowCard
              key={index}
              mainHeading={el.mainHeading}
              subHeading={el.subHeading}
              summary={el.text}
              theme={false}
              textfloat={false}
              to={`industries/${el.route}`}
            />
          ))}
        </section>
      </Container>
    </div>
  );
};

export default DynamicMarket;
