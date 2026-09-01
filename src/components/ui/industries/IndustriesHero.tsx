import Image from "next/image";
import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import { FC } from "react";
import Link from "next/link";

interface IndustriesHeroProps {
  mainHeading?: string;
  subHeading?: string;
  text?: string;
  image: string;
}

const IndustriesHero: FC<IndustriesHeroProps> = ({
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
          <Image
            src={image}
            alt='Hero Section'
            priority
            width={500}
            height={280}
          />
          <div>
            <Heading className='heading_tertiary font_family_glory' level={1}>
              {mainHeading}
            </Heading>
            <Heading className='heading_tertiary font_family_glory'>
              {subHeading}
            </Heading>
            <Text className='text_secondry'>{text}</Text>
            <Link href='/contactus'>
              <Button className='primary'>Book a consultation</Button>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default IndustriesHero;
