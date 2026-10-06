import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutClose } from "@/data/aboutus";
import Link from "next/link";

// The close. One heading, one line, one button — the site's primary label,
// "Build my growth plan", onto the enquiry form. No embedded form and no
// second action, by instruction (30 Sep 2026). The network note that sat
// beside it came off with the rest of the old close.

const AboutClose = () => {
  const { heading, lead, cta } = aboutClose;

  return (
    <div className='band-closing'>
      <Container className='main'>
        <section className='aboutClose'>
          <Heading className='h2' level={2}>
            {heading}
          </Heading>
          <div className='aboutClose__action'>
            <Text className='lead'>{lead}</Text>
            <Link href={cta.to} className='btn'>
              {cta.label}
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutClose;
