import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { dynamicMarketData } from "@/data";

const DynamicMarket = () => {
  return (
    <Container className='main'>
      <header>
        <div>
          <Heading className='primary color_secondry'>
            We drive it forward
          </Heading>
          <Heading className='primary color_primary'>
            Engagement stalls without strategy
          </Heading>
        </div>
        <Text className='secondry'>
          The right strategy makes all the difference. Our industry-focused
          approach simplifies the journey, offering customized solutions that
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
          />
        ))}
      </section>
    </Container>
  );
};

export default DynamicMarket;
