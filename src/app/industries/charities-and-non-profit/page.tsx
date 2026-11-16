import { Container } from "@/components/common";
import { Heading } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Charities and non-profit",
  description: "Charities and non-profit.",
  path: "/industries/charities-and-non-profit"
});

export default function Page() {
  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='hubHero'>
          <Heading className='h1p' level={1}>
            Charities and non-profit
          </Heading>
        </section>
      </Container>
    </div>
  );
}
