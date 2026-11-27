import Link from "next/link";
import { Container } from "@/components/common";

// One approach for every kind of organisation. Sits below capabilities.
// Same left-copy device as sections 02, 03 and 05 (no index / hairline).

export default function SecondMarketBand() {
  return (
    <section
      className='sec homeOneApproach'
      aria-labelledby='one-approach-title'
    >
      <Container className='main'>
        <div className='editorialCopy'>
          <p className='editorialCopy__eyebrow'>One approach</p>
          <h2 className='editorialCopy__title' id='one-approach-title'>
            <span className='editorialCopy__line'>
              Different organisations. Different objectives.
            </span>
            <span className='editorialCopy__line editorialCopy__line--accent'>
              {" "}
              One integrated approach
            </span>
          </h2>
          <p className='editorialCopy__lead'>
            Whether the objective is business growth, brand awareness, customer
            acquisition, public engagement, service uptake or effective
            communications, we tailor our approach to the audience and outcomes
            that matter.
          </p>
          <Link href='/industries' className='textLink'>
            Explore our industries
            <span aria-hidden='true'> →</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
