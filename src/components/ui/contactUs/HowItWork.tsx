import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { howItWorkData } from "@/data/contactUs";

// 25 Sep 2026: four numbered steps (see howItWorkData), and the headings on
// the current type roles rather than heading_secondry--light and
// heading_secondry--boldLight.
//
// 30 Sep 2026: the email and the two phone numbers came out of this header.
// They sit beside the form now, with the office addresses, in
// ContactGetInTouch; printing them twice within a screen of each other said
// nothing new the second time.
const HowItWork = () => {
  return (
    <div className='howItworksBand'>
      <Container className='main'>
        <div className='howItworks'>
          <header>
            <Heading className='h2'>What happens next</Heading>
          </header>
          <ol data-reveal='stagger'>
            {howItWorkData.map(el => (
              <li key={el.index}>
                <span className='howItworks__index' aria-hidden='true'>
                  {el.index}
                </span>
                <div>
                  <Heading className='h4' level={3}>
                    {el.heading}
                  </Heading>
                  <Text className='body'>{el.text}</Text>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </div>
  );
};

export default HowItWork;
