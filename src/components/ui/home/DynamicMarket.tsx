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

const DynamicMarket = () => {
  return (
    <div className='dynamicMarket sec'>
      <Container className='main'>
        <header>
          <div>
            <Heading
              className='primary color_secondry uppercase font_family_glory'
              level={2}
            >
              growing in dynamic <br /> markets is tough
            </Heading>
            <Heading
              className='primary color_primary uppercase font_family_glory'
              level={3}
            >
              we make it achievable
            </Heading>
          </div>
          <Text className='primary'>
            The right strategy makes all the difference. Our industry-focused
            approach simplifies the journey, offering customised solutions that
            drive real, measurable success
          </Text>
        </header>
        <section>
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
