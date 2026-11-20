import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";

// One approach for every kind of organisation. Sits below capabilities.

export default function SecondMarketBand() {
  return (
    <section
      className='sec homeOneApproach'
      aria-labelledby='one-approach-title'
    >
      <Container className='main'>
        <Text className='eyebrow'>04 · One approach</Text>
        <Heading className='h2' level={2} id='one-approach-title'>
          Different organisations. Different objectives. One integrated approach
        </Heading>
        <Text className='body'>
          Whether the objective is business growth, brand awareness, customer
          acquisition, public engagement, service uptake or effective
          communications, we tailor our approach to the audience and outcomes
          that matter.
        </Text>
        <p className='sec-sm'>
          <Link href='/industries' className='textLink'>
            Explore our industries
            <span aria-hidden='true'> →</span>
          </Link>
        </p>
      </Container>
    </section>
  );
}
