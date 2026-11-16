import { Container } from "@/components/common";
import { Heading } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "How to buy from us",
  description: "How to buy from us.",
  path: "/public-sector/how-to-buy"
});

export default function HowToBuyPage() {
  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='hubHero'>
          <Heading className='h1p' level={1}>
            How to buy from us
          </Heading>
        </section>
      </Container>
    </div>
  );
}
