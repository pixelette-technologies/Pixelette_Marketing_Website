import { Container } from "@/components/common";
import { Text, Heading, Button } from "@/components/feature";
import Image from "next/image";

const AboutUsHero = () => {
  return (
    <Container className='main'>
      <section className='heroSectionAbout'>
        <Image
          src='/aboutUs/heroImageAbout.webp'
          alt='Hero About Us Page'
          width={626}
          height={288}
        />
        <div>
          <Heading>
            Redefining growth <span> with purpose</span>
          </Heading>
          <Text>
            At Pixelette Marketing, we bring a thoughtful, collaborative
            approach to help brands achieve their goals. Our marketing services
            are built on trust, creativity and delivering results that matter.
          </Text>
          <Button className='primary'>Get in touch</Button>
        </div>
      </section>
    </Container>
  );
};

export default AboutUsHero;
