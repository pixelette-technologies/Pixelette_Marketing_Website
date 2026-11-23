import Link from "next/link";
import { Container } from "@/components/common";
import { Text } from "@/components/feature";

// One approach for every kind of organisation. Sits below capabilities.
// Index and title use the same device as sections 02, 03 and 05: number,
// hairline, eyebrow, then an ink headline with the last line in the brand tone.

export default function SecondMarketBand() {
  return (
    <section
      className='sec homeOneApproach'
      aria-labelledby='one-approach-title'
    >
      <Container className='main'>
        <p className='editorialCopy__mark'>
          <span className='editorialCopy__number'>04</span>
          <span className='editorialCopy__rule' aria-hidden='true' />
          <span className='editorialCopy__eyebrow'>One approach</span>
        </p>
        <h2 className='editorialCopy__title' id='one-approach-title'>
          <span className='editorialCopy__line'>
            Different organisations. Different objectives.
          </span>
          <span className='editorialCopy__line editorialCopy__line--accent'>
            {" "}
            One integrated approach
          </span>
        </h2>
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
