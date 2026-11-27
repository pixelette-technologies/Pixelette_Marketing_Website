import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";

// Plan §9.5 — How the work is delivered. Group relationship lives in AboutGroup.

export default function AboutBriefBlocks() {
  return (
    <Container className='main'>
      <section className='sec' aria-labelledby='how-delivered-title'>
        <Heading className='h2' level={2} id='how-delivered-title'>
          How the work is delivered
        </Heading>
        <Text className='body'>
          Pixelette Marketing brings together company leadership and specialist
          practitioners around the needs of each engagement. We agree scope and
          responsibilities before work starts, appoint appropriately qualified
          specialists, and remain accountable for the client relationship, the
          contract and delivery standards.
        </Text>
      </section>
    </Container>
  );
}
