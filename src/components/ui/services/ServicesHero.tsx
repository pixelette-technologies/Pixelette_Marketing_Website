import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import Image from "next/image";
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
            <Heading className='heading_tertiary font_family_glory' level={1}>
              {mainHeading} <span> {subHeading}</span>
            </Heading>

            <Text className='text_secondry'>{text}</Text>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default ServicesHero;
