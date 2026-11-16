import { Container } from "@/components/common";
import { Heading } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Public sector",
  description: "Public and civic overview.",
  path: "/public-sector"
});

export default function PublicSectorPage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Public sector
            </Heading>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-labelledby='where-we-are-title'>
          <Heading className='h2' level={2} id='where-we-are-title'>
            Where we are, stated plainly
          </Heading>
        </section>
      </Container>
    </>
  );
}
