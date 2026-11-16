import { Container } from "@/components/common";
import { Heading } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Education and learning",
  description: "Education and learning.",
  path: "/industries/education-and-learning"
});

export default function Page() {
  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='hubHero'>
          <Heading className='h1p' level={1}>
            Education and learning
          </Heading>
        </section>
      </Container>
    </div>
  );
}
