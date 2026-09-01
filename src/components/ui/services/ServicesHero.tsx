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
    // .wash-left, the guide's interior hero ground. The wrapper is here so the
    // gradient runs full-bleed behind the container rather than being clipped
    // to it, the same shape HomeHero uses for the centred .wash.
    <div className='wash-left'>
      <Container className='main'>
        <section className='servicesHero'>
          <section>
            <Image
              src={image}
              alt='hero image for services'
              height={288}
              width={626}
              priority
            />
          </section>
          <div>
            <Heading className='tertiary uppercase font_family_glory' level={1}>
              {mainHeading} <span> {subHeading}</span>
            </Heading>

            <Text className='secondry'>{text}</Text>
            <div>
              <Link href='/contactus'>
                <Button className='primary-full'>Book a call</Button>
              </Link>
              <Link href='/contactus'>
                <Button className='secondry-full'>Get a proposal</Button>
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default ServicesHero;
