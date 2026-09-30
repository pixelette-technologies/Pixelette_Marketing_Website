import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { contactHero } from "@/data/contactUs";

// The /contactus opening. 30 Sep 2026: a text hero on the interior wash, as
// the Pixelette Technologies contact page opens, with the form moved down
// into the offices section beside the addresses.
//
// It was ContactSection with headingLevel 1, the h1 and the form side by
// side. The h1 is the one the 25 Sep correction pass signed off, kept; the
// lead takes the group page's register ("tell us what you know… one of us
// replies, not a sequence") in this company's terms.
//
// The eyebrow is a <p>, not a heading: a heading above the h1 would invert
// the outline, the call HomeHero and AboutUsHero already made.
const ContactUsHero = () => {
  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='contactHero'>
          <Text className='eyebrow'>{contactHero.eyebrow}</Text>
          <Heading className='h1' level={1}>
            {contactHero.heading}
          </Heading>
          <Text className='lead'>{contactHero.lead}</Text>
          <Text className='small'>{contactHero.closing}</Text>
        </section>
      </Container>
    </div>
  );
};

export default ContactUsHero;
