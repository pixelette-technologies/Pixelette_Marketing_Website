import { Container } from "@/components/common";
import MockupBanner from "@/components/common/MockupBanner";
import { Heading } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
  title: "Demonstration work",
  description: "Demonstration work.",
  path: "/public-sector/demonstrations",
  index: false
});
}

export default function DemonstrationsPage() {
  return (
    <>
      <MockupBanner />
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Demonstration <em>work</em>
            </Heading>
          </section>
        </Container>
      </div>
    </>
  );
}
