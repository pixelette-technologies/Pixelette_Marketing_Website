import Image from "next/image";
import { Container } from "@/components/common";
import { Button, Heading, Text } from "@/components/feature";

const IndustriesHero = () => {
  return (
    <Container className='main'>
      <section className='industriesHome'>
        <Image src='/industries/industriesHero.webp' alt='Hero Section' />
        <div>
          <Heading>We’re a web3 marketing agency</Heading>
          <Heading>turning blocks into breakthroughs</Heading>
          <Text>
            Partner with Pixelette Marketing to align your goals with meaningful
            marketing efforts to build trust, drive adoption and make a lasting
            impact in the Web3 ecosystem.
          </Text>
          <Button>Book a consultation</Button>
        </div>
      </section>
    </Container>
  );
};

export default IndustriesHero;
