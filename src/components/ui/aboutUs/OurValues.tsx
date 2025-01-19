import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";

const OurValues = () => {
  return (
    <Container className='main'>
      <section className='ourValues'>
        <Text className='primary color_primary'>Our values</Text>
        <header>
          <Heading className='secondry--light color_secondry'>
            What defines us
          </Heading>
          <Text className='secondry color_secondry'>
            Our values are the cornerstone of everything we do. They shape our
            approach, guide our decisions, drive our commitment to helping you
            succeed and create a lasting impact for your brand.
          </Text>
        </header>

        <section>
          <div>
            <Text className='primary--bold'>Thrive on collaboration</Text>
            <Text className='tertiary'>
              True partnership means working side by side, where your success is
              our shared purpose.
            </Text>
          </div>
          <div>
            <Text className='primary--bold'>Act with integrity</Text>
            <Text className='tertiary'>
              Honesty and transparency form the foundation of every action we
              take.
            </Text>
          </div>
          <div>
            <Text className='primary--bold'>Embrace forward thinking</Text>
            <Text className='tertiary'>
              Staying ahead of trends gives us the power to push boundaries and
              keep you ahead of the curve.
            </Text>
          </div>
          <div>
            <Text className='primary--bold'>Aim for excellence</Text>
            <Text className='tertiary'>
              Delivering results is just the beginning; surpassing expectations
              is our standard.
            </Text>
          </div>
        </section>
      </section>
    </Container>
  );
};

export default OurValues;
