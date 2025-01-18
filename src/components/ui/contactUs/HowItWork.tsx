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
            <Text>Here’s how it works</Text>
            <section>
              <div>
                <MailIcon />
                <Text>sales@pixelettemarketing.com</Text>
              </div>
              <div>
                <PhoneIcon />
                <Text>+44 2045188226</Text>
              </div>
              <div>
                <PhoneIcon />
                <Text>+1 7732709034</Text>
              </div>
            </section>
          </header>
          <section>
            {howItWorkData.map((el, index) => (
              <blockquote key={index}>
                <el.icon />
                <div>
                  <Heading>{el.heading}</Heading>
                  <Text>{el.text}</Text>
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
