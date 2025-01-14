import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { dynamicMarketData } from "@/data";

const DynamicMarket = () => {
  return (
    <div className='dynamicMarket bg_white'>
      <Container className='main'>
        <header>
          <div>
            <Heading className='primary color_secondry uppercase font_family_glory'>
              growing in dynamic <br /> markets is tough
            </Heading>
            <Heading className='primary color_primary uppercase font_family_glory'>
              we make it achievable
            </Heading>
          </div>
          <Text className='primary'>
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
    </div>
  );
};

export default DynamicMarket;
