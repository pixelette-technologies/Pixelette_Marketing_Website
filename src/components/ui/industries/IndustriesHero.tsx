import Image from "next/image";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { HeroEmphasis } from "@/lib/heroEmphasis";
import { FC } from "react";

interface IndustriesHeroProps {
  eyebrow: string;
  mainHeading: string;
  subHeading: string;
  text: string;
  image: string;
}

// The deeper-experience hero. 25 Sep 2026: taken off the legacy type
// (heading_tertiary font_family_glory, twice, with the positioning line set as
// a second h2-sized heading) and onto the roles every current interior hero
// uses: eyebrow, h1p, a standfirst-sized line and .lead.
//
// Hero no longer carries "Discuss Your Project" — that CTA lives in close /
// contact bands only.
//
// The image is stock photography and says nothing a reader needs, so its alt
// is empty. It was "Hero Section", which a screen reader announced as content.
const IndustriesHero: FC<IndustriesHeroProps> = ({
  eyebrow,
  mainHeading,
  subHeading,
  image,
  text
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
              <HeroEmphasis text={mainHeading} lastWordCount={1} />
            </Heading>
            <Text className='industriesHero__sub'>{subHeading}</Text>
            <Text className='lead'>{text}</Text>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default IndustriesHero;
