import { Container } from "@/components/common";
import { Heading } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Social value",
  description: "Social value.",
  path: "/social-value"
});

export default function SocialValuePage() {
  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='hubHero'>
          <Heading className='h1p' level={1}>
            Social value
          </Heading>
        </section>
      </Container>
    </div>
  );
}
