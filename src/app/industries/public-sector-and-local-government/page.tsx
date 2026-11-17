import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Public sector and local government",
  description:
    "Communications bought under procurement rules, judged on public outcomes and accountable for public money.",
  path: "/industries/public-sector-and-local-government"
});

export default function Page() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Public sector and local government
            </Heading>
            <Text className='lead'>
              Councils, NHS bodies, government agencies and public services
            </Text>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-labelledby='market-title'>
          <Heading className='h2' level={2} id='market-title'>
            The market
          </Heading>
          <Text className='body'>
            Communications bought under procurement rules, judged on public
            outcomes and accountable for public money. Buying decisions involve
            more people, take longer and are documented.
          </Text>
        </section>
        <section className='sec' aria-labelledby='challenge-title'>
          <Heading className='h2' level={2} id='challenge-title'>
            The challenge
          </Heading>
          <Text className='body'>
            The objective is rarely a sale. It is uptake of a service,
            attendance at an appointment, response to a consultation,
            understanding of a change, or confidence that public money achieved
            something. Activity is easy to report. Outcome is the part that is
            hard, and the part that is asked about.
          </Text>
        </section>
        <section className='sec' aria-labelledby='approach-title'>
          <Heading className='h2' level={2} id='approach-title'>
            Our approach
          </Heading>
          <Text className='body'>
            Define the outcome first and the measurement with it, using the
            frameworks the sector already works to. Plan evaluation at the
            start rather than at the end. Report what the evidence supports and
            say clearly what it does not.
          </Text>
        </section>
      </Container>
    </>
  );
}
