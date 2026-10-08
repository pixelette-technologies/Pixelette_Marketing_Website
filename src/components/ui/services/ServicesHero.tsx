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
            <Heading className='heading_tertiary font_family_glory' level={1}>
              {mainHeading} <span> {subHeading}</span>
            </Heading>

            <Text className='text_secondry'>{text}</Text>
            {/* 25 Sep 2026: were "Book a call" and "Get a proposal", two
                buttons to the same /contactus. The pair is the home hero's
                now: the form, and the evidence. */}
            <div>
              <Link href='/contactus'>
                <Button className='primary-full'>Tell us what needs to grow</Button>
              </Link>
              <Link href='/results'>
                <Button className='secondry-full'>See client results</Button>
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default ServicesHero;
