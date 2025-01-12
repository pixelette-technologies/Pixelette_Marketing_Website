import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";
import Image from "next/image";

export default function HomeHero() {
  return (
    <Container className='main'>
      <div className='heroHome'>
        <Image src='/home/heroImageHome.webp' alt='Example Image' width={662} height={601} />
        <section>
          <div>
            <Heading className='hero color_primary font_family_glory uppercase'>Marketing That Matters</Heading>
            <Heading className='hero color_secondry font_family_glory uppercase'>to Your Bottom Line</Heading>
            <Text className='primary'>
              Pixelette Marketing delivers precision driven marketing for Fintech, SaaS, Web3, tech products and
              platforms, and more. We believe your industry deserves strategies as innovative as your solutions. Take
              the guesswork out of growth by requesting your a strategy proposal today and
              <span className=' text_primary--bold color_primary'> start achieving ROI you can see!</span>
            </Text>
            <Button className='primary'>Book A Call</Button>
          </div>
        </section>
      </div>
    </Container>
  );
}
