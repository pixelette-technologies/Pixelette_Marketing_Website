import { Container } from "@/components/common";
import { Text, Heading, Button } from "@/components/feature";
import Image from "next/image";
import Link from "next/link";

// D5. Takes .wash-left, the guide's interior hero ground. Phase E built both
// washes and only ever applied the centred one to the home page, so the offset
// variant the hero strategy chose for interior pages had no call site at all.
// The wrapper is here so the gradient runs full-bleed behind the container
// rather than being clipped to it, exactly as HomeHero does with .wash.

const AboutUsHero = () => {
  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='heroSectionAbout'>
          <Image
            src='/aboutUs/heroImageAbout.webp'
            alt='Hero About Us Page'
            width={626}
            height={288}
          />
          <div>
            <Heading className='tertiary uppercase font_family_glory' level={1}>
              Redefining growth
              <span> with purpose</span>
            </Heading>
            <Text className='secondry'>
              At Pixelette Marketing, we bring a thoughtful, collaborative
              approach to help brands achieve their goals. Our marketing services
              are built on trust, creativity and delivering results that matter.
            </Text>
            <Link href='contactus'>
              <Button className='primary'>Get in touch</Button>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AboutUsHero;
