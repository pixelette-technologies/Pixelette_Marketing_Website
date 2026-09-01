import { MailIcon, PhoneIcon } from "@/assets/contactUs";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { howItWorkData } from "@/data/contactUs";

const HowItWork = () => {
  return (
    <div
      className='howItworksBand'
    >
      <Container className='main'>
        <div className='howItworks'>
          <header>
            <Heading
              className='heading_secondry--light'
            >
              Here’s how it works
            </Heading>
            <section>
              <div>
                <MailIcon />
                <Text className='text_primary'>
                  sales@pixelettemarketing.com
                </Text>
              </div>
              <div>
                <PhoneIcon />
                <Text className='text_primary'>+44 2045188226</Text>
              </div>
              <div>
                <PhoneIcon />
                <Text className='text_primary'>+1 7732709034</Text>
              </div>
            </section>
          </header>
          <section data-reveal='stagger'>
            {howItWorkData.map((el, index) => (
              <blockquote
                key={index}
              >
                <section>
                  <el.icon />
                </section>
                <div>
                  <Heading className='heading_secondry--boldLight'>
                    {el.heading}
                  </Heading>
                  <Text className='text_tertiary--light'>{el.text}</Text>
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
