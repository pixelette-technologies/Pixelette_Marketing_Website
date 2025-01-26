import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { engagementData } from "@/data";

const EngagementStalls = () => {
  const firstFiveItems = engagementData.slice(0, 5);
  const remainingItems = engagementData.slice(5);

  return (
    <div
      className='bg_tertiary--dark'
      data-aos='fade-up'
      data-aos-duration='1400'
    >
      <Container className='main '>
        <section className='engagementStalls'>
          <div>
            <Heading
              className='primary color_primary uppercase font_family_glory'
              animation='fade-up'
              duration='1200'
            >
              Engagement stalls without strategy
            </Heading>
            <Heading
              className='primary color_secondry uppercase font_family_glory'
              animation='fade-up'
              duration='1400'
            >
              We drive it forward
            </Heading>
            <Text className='secondry' animation='fade-up' duration='1600'>
              Simplify your marketing efforts with our end-to-end digital
              solutions. We create strategies that attract, engage and convert
              your audience at every step.
            </Text>
          </div>
          <section
            className='bg_secondry'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <div>
              {firstFiveItems.map((el, index) => (
                <ArrowCard
                  key={index}
                  mainHeading={el.mainHeading}
                  subHeading={el.subHeading}
                  summary={el.text}
                  theme={true}
                  textfloat={false}
                  className='hover_black_arrowCard'
                  animation='fade-up'
                  duration={`${1000 + index * 200}`}
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
                  className='hover_black_arrowCard'
                  animation='fade-up'
                  duration={`${1000 + index * 200}`}
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
                  className='hover_black_arrowCard'
                  animation='fade-up'
                  duration={`${1000 + index * 200}`}
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
