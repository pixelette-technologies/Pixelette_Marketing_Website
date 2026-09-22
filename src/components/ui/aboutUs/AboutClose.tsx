import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutClose } from "@/data/aboutus";
import Link from "next/link";

// The close. It replaces the shared QuestionAndAnswer, which this page called
// with a "Become a partner" eyebrow and a book-a-consultant button, and which
// still serves the services, industries and story templates unchanged.
//
// A DEDICATED COMPONENT RATHER THAN A PROP ON THE SHARED ONE. The close needs
// a second, quieter block beside the call to action, and adding that to
// QuestionAndAnswer would put it on four templates that have not asked for it
// and have never been looked at in a browser.
//
// THE NETWORK LINE IS THE POINT OF THE ASYMMETRY. It is .small, it sits in the
// narrow column on its own hairline, and it is the last thing on the page —
// selective, not a recruitment drive. Giving it equal width to the call to
// action is what would make it read as one.
//
// Both actions land on the enquiry form. There is no separate route for the
// network and inventing one would be inventing a page.

const AboutClose = () => {
  const { eyebrow, heading, lead, cta, network } = aboutClose;

  return (
    <div className='band-closing'>
      <Container className='main'>
        <section className='aboutClose'>
          <div className='aboutClose__primary'>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {heading}
            </Heading>
            <Text className='lead'>{lead}</Text>
            <Link href={cta.to} className='btn'>
              {cta.label}
            </Link>
          </div>

          <div className='aboutClose__network'>
            <Text className='small'>{network.body}</Text>
            <Link href={network.link.to} className='link aboutClose__link'>
              {network.link.label}
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutClose;
