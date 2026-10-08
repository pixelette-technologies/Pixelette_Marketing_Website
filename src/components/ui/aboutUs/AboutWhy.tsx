import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { aboutWhy } from "@/data/aboutus";
import Link from "next/link";

// Why we exist. 30 Sep 2026.
//
// It replaces the who-we-are / how-we-work pair, which said this in two
// columns and then said it again in the capability model below it. Now it is
// said once, and the five capabilities are a link to the page that owns them
// rather than a second rendering of it.
//
// THE PAGE'S ONE .rule-cap is on this section's hairline, the first rule after
// the hero. route-walk fails the build on a second.

const AboutWhy = () => {
  const { eyebrow, heading, body, link } = aboutWhy;

  return (
    <Container className='main'>
      <section className='aboutWhy'>
        <div className='aboutWhy__head rule-cap'>
          <Heading className='eyebrow' level={2}>
            {eyebrow}
          </Heading>
          <Heading className='h2' level={3}>
            {heading}
          </Heading>
        </div>

        <div className='aboutWhy__body'>
          {body.map(paragraph => (
            <Text key={paragraph} className='body'>
              {paragraph}
            </Text>
          ))}
          <Link href={link.to} className='link aboutWhy__link'>
            {link.label}
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default AboutWhy;
