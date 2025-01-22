import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { engagementData } from "@/data";

const EngagementStalls = () => {
  const firstFiveItems = engagementData.slice(0, 5);
  const remainingItems = engagementData.slice(5);

  return (
    <div className='bg_tertiary--dark'>
      <Container className='main '>
        <section className='engagementStalls'>
          <div>
            <Heading className='primary color_primary uppercase font_family_glory'>
              Engagement stalls without strategy
            </Heading>
            <Heading className='primary color_secondry uppercase font_family_glory'>
              We drive it forward
            </Heading>
            <Text className='secondry'>
              Simplify your marketing efforts with our end-to-end digital
              solutions. We create strategies that attract, engage and convert
              your audience at every step.
            </Text>
          </div>
          <section className='bg_secondry'>
            <div>
              {firstFiveItems.map((el, index) => (
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
            <blockquote>
              {remainingItems.map((el, index) => (
                <ArrowCard
                  key={index + 5}
                  mainHeading={el.mainHeading}
                  subHeading={el.subHeading}
                  summary={el.text}
                  theme={true}
                  textfloat={true}
                />
              ))}
            </blockquote>
            <section>
              {remainingItems.map((el, index) => (
                <ArrowCard
                  key={index + 5}
                  mainHeading={el.mainHeading}
                  subHeading={el.subHeading}
                  summary={el.text}
                  theme={true}
                  textfloat={false}
                />
              ))}
            </section>
          </section>
        </section>
      </Container>
    </div>
  );
};

export default EngagementStalls;
