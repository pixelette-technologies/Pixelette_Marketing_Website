import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import Image from "next/image";
import { FC } from "react";

interface ServicesHeroProps {
  mainHeading: string;
  subHeading: string;
  text: string;
  image: string;
}

const ServicesHero: FC<ServicesHeroProps> = ({
  mainHeading,
  subHeading,
  image,
  text
}) => {
  return (
    <Container className='main'>
      <section className='servicesHero'>
        <Image
          src={image}
          alt='hero image for services'
          height={288}
          width={626}
        />
        <div>
          <Heading className='tertiary color_primary uppercase font_family_glory'>
            {mainHeading}
          </Heading>
          <Heading className='tertiary color_secondry uppercase font_family_glory'>
            {subHeading}
          </Heading>
          <Text className='secondry'>{text}</Text>
          <div>
            <Button className='primary-full'>Book a call</Button>
            <Button className='secondry-full'>Get a proposal</Button>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ServicesHero;
