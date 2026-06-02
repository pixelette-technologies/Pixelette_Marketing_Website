import { WhiteBackground } from "@/assets/common";
import { Container } from "@/components/common";
import { ArrowCard, Heading, Text } from "@/components/feature";
import { dynamicMarketData } from "@/data";

const DynamicMarket = () => {
  return (
    <>
      <div className='dynamicMarket'>
        <div>
          <Container className='main'>
            <header>
              <div>
                <Heading
                  className='primary color_secondry uppercase font_family_glory'
                  animation='fade-right'
                  duration='1200'
                  level={2}
                >
                  growing in dynamic <br /> markets is tough
                </Heading>
                <Heading
                  className='primary color_primary uppercase font_family_glory'
                  animation='fade-right'
                  duration='1400'
                  level={3}
                >
                  we make it achievable
                </Heading>
              </div>
              <Text className='primary' animation='fade-left' duration='1600'>
                The right strategy makes all the difference. Our
                industry-focused approach simplifies the journey, offering
                customised solutions that drive real, measurable success
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
                  className='hover_white_arrowCard'
                  animation='fade-up'
                  duration={`${1000 + index * 200}`}
                  to={`industries/${el.route}`}
                />
              ))}
            </section>
          </Container>
        </div>
        <section data-aos='fade-up' data-aos-duration='1200'>
          <WhiteBackground />
        </section>
      </div>
    </>
  );
};

export default DynamicMarket;
