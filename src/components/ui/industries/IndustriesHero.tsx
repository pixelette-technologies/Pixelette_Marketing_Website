import Image from "next/image";
import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";

const IndustriesHero = () => {
  return (
    <Container className='main'>
      <section className='industriesHero'>
        <Image
          src='/industries/industriesHero.webp'
          alt='Hero Section'
          width={500}
          height={280}
        />
        <div>
          <Heading className='tertiary color_primary font_family_glory uppercase'>
            We’re a web3 marketing agency
          </Heading>
          <Heading className='tertiary color_secondry font_family_glory uppercase'>
            turning blocks into breakthroughs
          </Heading>
          <Text className='secondry color_secondry--light'>
            Partner with Pixelette Marketing to align your goals with meaningful
            marketing efforts to build trust, drive adoption and make a lasting
            impact in the Web3 ecosystem.
          </Text>
          <Button className='primary'>Book a consultation</Button>
        </div>
      </section>
    </Container>
  );
};

export default IndustriesHero;
