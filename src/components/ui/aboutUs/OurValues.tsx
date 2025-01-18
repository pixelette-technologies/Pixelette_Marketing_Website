import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";

const OurValues = () => {
  return (
    <Container className='main'>
      <section className='ourValues'>
        <Text>Our values</Text>

        <header>
          <Heading>What defines us</Heading>
          <Text>
            Our values are the cornerstone of everything we do. They shape our
            approach, guide our decisions, drive our commitment to helping you
            succeed and create a lasting impact for your brand.
          </Text>
        </header>

        <section>
          <div>
            <Text>Thrive on collaboration</Text>
            <Text>
              True partnership means working side by side, where your success is
              our shared purpose.
            </Text>
          </div>
          <div>
            <Text>Act with integrity</Text>
            <Text>
              Honesty and transparency form the foundation of every action we
              take.
            </Text>
          </div>
          <div>
            <Text>Embrace forward thinking</Text>
            <Text>
              Staying ahead of trends gives us the power to push boundaries and
              keep you ahead of the curve.
            </Text>
          </div>
          <div>
            <Text>Aim for excellence</Text>
            <Text>
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
