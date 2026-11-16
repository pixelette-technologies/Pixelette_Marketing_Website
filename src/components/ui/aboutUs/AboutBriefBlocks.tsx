import Link from "next/link";
import { Container } from "@/components/common";
import { Heading } from "@/components/feature";

// 12 Nov brief empty slots on About. "Part of Pixelette Group" is already
// covered by AboutGroup — do not duplicate that heading here.
export default function AboutBriefBlocks() {
  return (
    <Container className='main'>
      <section className='sec' aria-labelledby='how-delivered-title'>
        <Heading className='h2' level={2} id='how-delivered-title'>
          How the work is delivered
        </Heading>
      </section>
      <p className='sec-sm'>
        <Link href='/about/people' className='textLink'>
          People
          <span aria-hidden='true'>→</span>
        </Link>
      </p>
    </Container>
  );
}
