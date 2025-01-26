import Image from "next/image";
import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import { FC } from "react";

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
    <Container className='main'>
      <section className='industriesHero'>
        <Image
          src={image}
          alt='Hero Section'
          priority
          width={500}
          height={280}
          data-aos='fade-up'
        />
        <div>
          <Heading
            className='tertiary color_primary font_family_glory uppercase'
            animation='fade-up'
            duration='1200'
          >
            {mainHeading}
          </Heading>
          <Heading
            className='tertiary color_secondry font_family_glory uppercase'
            animation='fade-up'
            duration='1400'
          >
            {subHeading}
          </Heading>
          <Text
            className='secondry color_secondry--light'
            animation='fade-up'
            duration='1600'
          >
            {text}
          </Text>
          <Button className='primary' animation='fade-up' duration='1800'>
            Book a consultation
          </Button>
        </div>
      </section>
    </Container>
  );
};

export default IndustriesHero;
