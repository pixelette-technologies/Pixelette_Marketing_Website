import { MailIcon, PhoneIcon } from "@/assets/contactUs";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { howItWorkData } from "@/data/contactUs";

const HowItWork = () => {
  return (
    <div className='bg_secondry--light'>
      <Container className='main'>
        <div className='howItworks'>
          <header>
            <Heading className='secondry--light color_white'>
              Here’s how it works
            </Heading>
            <section>
              <div>
                <MailIcon />
                <Text className='primary color_white'>
                  sales@pixelettemarketing.com
                </Text>
              </div>
              <div>
                <PhoneIcon />
                <Text className='primary color_white'>+44 2045188226</Text>
              </div>
              <div>
                <PhoneIcon />
                <Text className='primary color_white'>+1 7732709034</Text>
              </div>
            </section>
          </header>
          <section>
            {howItWorkData.map((el, index) => (
              <blockquote key={index}>
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
