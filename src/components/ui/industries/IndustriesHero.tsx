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
        />
        <div>
          <Heading className='tertiary color_primary font_family_glory uppercase'>
            {mainHeading}
          </Heading>
          <Heading className='tertiary color_secondry font_family_glory uppercase'>
            {subHeading}
          </Heading>
          <Text className='secondry color_secondry--light'>{text}</Text>
          <Button className='primary'>Book a consultation</Button>
        </div>
      </section>
    </Container>
  );
};

export default IndustriesHero;
