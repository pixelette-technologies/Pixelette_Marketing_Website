import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ServicesHeroProps {
  mainHeading?: string;
  subHeading?: string;
  text?: string;
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
        <section data-aos='fade-up'>
          <Image
            src={image}
            alt='hero image for services'
            height={288}
            width={626}
            priority
          />
        </section>
        <div>
          <Heading
            className='tertiary color_primary uppercase font_family_glory'
            animation='fade-up'
            duration='1000'
          >
            {mainHeading} <span> {subHeading}</span>
          </Heading>

          <Text className='secondry' animation='fade-up' duration='1400'>
            {text}
          </Text>
          <div>
            <Link href='/contactus'>
              <Button
                className='primary-full'
                animation='fade-up'
                duration='1600'
              >
                Book a call
              </Button>
            </Link>
            <Link href='/contactus'>
              <Button
                className='secondry-full'
                animation='fade-up'
                duration='1800'
              >
                Get a proposal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ServicesHero;
