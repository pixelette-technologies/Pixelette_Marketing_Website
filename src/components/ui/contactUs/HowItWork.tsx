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
              className='secondry--light'
            >
              Here’s how it works
            </Heading>
            <section>
              <div>
                <MailIcon />
                <Text className='primary'>
                  sales@pixelettemarketing.com
                </Text>
              </div>
              <div>
                <PhoneIcon />
                <Text className='primary'>+44 2045188226</Text>
              </div>
              <div>
                <PhoneIcon />
                <Text className='primary'>+1 7732709034</Text>
              </div>
            </section>
          </header>
          <section>
            {howItWorkData.map((el, index) => (
              <blockquote
                key={index}
              >
                <section>
                  <el.icon />
                </section>
                <div>
                  <Heading className='secondry--boldLight'>
                    {el.heading}
                  </Heading>
                  <Text className='tertiary--light'>{el.text}</Text>
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
