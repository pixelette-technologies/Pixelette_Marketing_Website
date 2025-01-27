import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import Image from "next/image";

export default function HomeHero() {
  return (
    <Container className='main'>
      <div className='heroHome'>
        <Image
          src='/home/heroImageHome.webp'
          alt='Hero Section Banner'
          width={662}
          priority
          height={601}
          data-aos='fade-up'
        />
        <section className='bg_tertiary'>
          <div>
            <Heading
              className='hero color_primary font_family_glory uppercase'
              animation='fade-up'
              duration='1200'
            >
              Marketing That Matters
            </Heading>
            <Heading
              className='hero color_secondry font_family_glory uppercase'
              animation='fade-up'
              duration='1400'
            >
              to Your Bottom Line
            </Heading>
            <Text className='primary' animation='fade-up' duration='1600'>
              Pixelette Marketing delivers precision driven marketing for
              Fintech, SaaS, Web3, tech products and platforms, and more. We
              believe your industry deserves strategies as innovative as your
              solutions. Take the guesswork out of growth by requesting your a
              strategy proposal today and
              <span className=' text_primary--bold color_primary'>
                start achieving ROI you can see!
              </span>
            </Text>
            <Button className='primary' animation='fade-up' duration='1800'>
              Book A Call
            </Button>
          </div>
        </section>
      </div>
    </Container>
  );
}
