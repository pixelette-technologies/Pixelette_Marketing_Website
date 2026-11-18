import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";

// 12 Nov 2026 Service Offer and Website Plan §9.1 — second-market band.
// Placement: below capabilities, above the closing CTA.

export default function SecondMarketBand() {
  return (
    <section className='sec' aria-labelledby='second-market-title'>
      <Container className='main'>
        <Text className='eyebrow'>04 · A second market</Text>
        <Heading className='h2' level={2} id='second-market-title'>
          Not every objective is a commercial one
        </Heading>
        <Text className='body'>
          Some organisations need customers. Others need people to come to an
          appointment, apply for a place, respond to a consultation or
          understand a change that affects them. The method is the same. What
          counts as success is not.
        </Text>
        <Text className='body'>
          We work with local authorities, NHS bodies, schools and trusts,
          colleges and universities, charities and housing associations — on
          reach, participation, understanding and demonstrable public value,
          rather than on pipeline.
        </Text>
        <Text className='body'>
          We lead with campaign evaluation: answering whether a campaign
          achieved its intended public outcome, even when that outcome was
          never a sale.
        </Text>
        <p className='sec-sm'>
          <Link href='/public-sector' className='textLink'>
            Public and civic communications
            <span aria-hidden='true'> →</span>
          </Link>
        </p>
      </Container>
    </section>
  );
}
