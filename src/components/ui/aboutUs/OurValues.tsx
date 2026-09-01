import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";

const OurValues = () => {
  return (
    <Container className='main'>
      <section className='ourValues'>
        <Text
          className='text_primary'
        >
          Our values
        </Text>
        <header>
          <Heading
            className='heading_secondry--light'
          >
            What defines us
          </Heading>
          <Text
            className='text_secondry'
          >
            Our values are the cornerstone of everything we do. They shape our
            approach, guide our decisions, drive our commitment to helping you
            succeed and create a lasting impact for your brand.
          </Text>
        </header>

        <section data-reveal='stagger'>
          <div>
            <Text className='text_primary--bold'>Thrive on collaboration</Text>
            <Text className='text_tertiary'>
              True partnership means working side by side, where your success is
              our shared purpose.
            </Text>
          </div>
          <div>
            <Text className='text_primary--bold'>Act with integrity</Text>
            <Text className='text_tertiary'>
              Honesty and transparency form the foundation of every action we
              take.
            </Text>
          </div>
          <div>
            <Text className='text_primary--bold'>Embrace forward thinking</Text>
            <Text className='text_tertiary'>
              Staying ahead of trends gives us the power to push boundaries and
              keep you ahead of the curve.
            </Text>
          </div>
          <div>
            <Text className='text_primary--bold'>Aim for excellence</Text>
            <Text className='text_tertiary'>
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
