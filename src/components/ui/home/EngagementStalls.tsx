import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { engagementData } from "@/data";

// D4. Two things were holding this section open.
//
// The dark inner panel carried padding-bottom: 46.875rem — 750px of empty
// ground below the last card. It was scaffolding for a scroll-driven reveal,
// whose 100vh height and wheel listeners sit in the large commented-out block
// this commit deletes with the rest. D2 removed the motion and left the space
// it used to move through, so the page has been rendering three quarters of a
// screen of blank panel ever since. DynamicMarket then climbed back up into
// that hole with margin-top: -30.0625rem and covered the seam with a
// decorative SVG blob. Both halves of the arrangement go, and the sections
// stack.
//
// The last four cards were rendered TWICE — once in a blockquote, aligned
// right, and once in a section, aligned left — with a display:none swap at
// 600px choosing between them. Alignment was the only difference between the
// two copies, so the duplicate is gone and all nine cards sit on one grid in
// source order. Nothing leaves the page: the hidden copy was never on screen
// beside the one it duplicated. Same fault as the marquees D2 left half
// removed, and the same fix.

const EngagementStalls = () => {
  return (
    <div className='band-alt'>
      <Container className='main'>
        <section className='engagementStalls sec'>
          <div>
            <Heading
              className='primary color_primary uppercase font_family_glory'
              level={2}
            >
              Engagement stalls without strategy
            </Heading>
            <Heading
              className='primary color_secondry uppercase font_family_glory'
              level={3}
            >
              We drive it forward
            </Heading>
            <Text className='secondry'>
              Simplify your marketing efforts with our end-to-end digital
              solutions. We create strategies that attract, engage and convert
              your audience at every step.
            </Text>
          </div>
          <div className='engagementStalls__panel'>
            {engagementData.map((el, index) => (
              <ArrowCard
                key={index}
                mainHeading={el.mainHeading}
                subHeading={el.subHeading}
                summary={el.text}
                theme={true}
                textfloat={false}
              />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default EngagementStalls;
