import { MailIcon, PhoneIcon } from "@/assets/contactUs";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { howItWorkData } from "@/data/contactUs";

const HowItWork = () => {
  return (
    <div
      className='bg_secondry--light'
      data-aos='fade-up'
      data-aos-duration='1000'
    >
      <Container className='main'>
        <div className='howItworks'>
          <header>
            <Heading
              className='secondry--light color_white'
              animation='fade-up'
              duration='1200'
            >
              Here’s how it works
            </Heading>
            <section>
              <div data-aos='fade-up' data-aos-duration='1200'>
                <MailIcon />
                <Text className='primary color_white'>
                  sales@pixelettemarketing.com
                </Text>
              </div>
              <div data-aos='fade-up' data-aos-duration='1300'>
                <PhoneIcon />
                <Text className='primary color_white'>+44 2045188226</Text>
              </div>
              <div data-aos='fade-up' data-aos-duration='1400'>
                <PhoneIcon />
                <Text className='primary color_white'>+1 7732709034</Text>
              </div>
            </section>
          </header>
          <section>
            {howItWorkData.map((el, index) => (
              <blockquote
                key={index}
                data-aos='fade-up'
                data-aos-duration={`${1000 + index * 300}`}
              >
                <section>
                  <el.icon />
                </section>
                <div>
                  <Heading className='secondry--boldLight color_white'>
                    {el.heading}
                  </Heading>
                  <Text className='tertiary--light color_white'>{el.text}</Text>
                </div>
              </blockquote>
            ))}
          </section>
        </div>
      </Container>
    </div>
  );
};

export default HowItWork;
