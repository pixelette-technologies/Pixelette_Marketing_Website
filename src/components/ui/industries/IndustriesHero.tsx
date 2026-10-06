import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { FC } from "react";

interface IndustriesHeroProps {
  eyebrow: string;
  mainHeading: string;
  subHeading: string;
  text: string;
  image: string;
  cta: { label: string; to: string };
}

// The deeper-experience hero. 25 Sep 2026: taken off the legacy type
// (heading_tertiary font_family_glory, twice, with the positioning line set as
// a second h2-sized heading) and onto the roles every current interior hero
// uses: eyebrow, h1p, a standfirst-sized line and .lead.
//
// THE BUTTON NO LONGER SAYS "Book a consultation". It points at the enquiry
// form at the foot of the same page, which is where the site's primary CTA
// already lives, so the hero and the close are one action rather than two.
//
// The image is stock photography and says nothing a reader needs, so its alt
// is empty. It was "Hero Section", which a screen reader announced as content.
const IndustriesHero: FC<IndustriesHeroProps> = ({
  eyebrow,
  mainHeading,
  subHeading,
  image,
  text,
  cta
}) => {
  return (
    // .wash-left, the guide's interior hero ground, full-bleed behind the
    // container rather than clipped to it.
    <div className='wash-left'>
      <Container className='main'>
        <section className='industriesHero'>
          <Image src={image} alt='' priority width={500} height={280} />
          <div>
            <Text className='eyebrow'>{eyebrow}</Text>
            <Heading className='h1p' level={1}>
              {mainHeading}
            </Heading>
            <Text className='industriesHero__sub'>{subHeading}</Text>
            <Text className='lead'>{text}</Text>
            <Link href={cta.to} className='btn'>
              {cta.label}
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default IndustriesHero;
