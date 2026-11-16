import { Container } from "@/components/common";
import { Heading } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Policies",
  description: "Policies.",
  path: "/policies"
});

export default function PoliciesPage() {
  return (
    <div className='wash-left'>
      <Container className='main'>
        <section className='hubHero'>
          <Heading className='h1p' level={1}>
            Policies
          </Heading>
        </section>
      </Container>
    </div>
  );
}
