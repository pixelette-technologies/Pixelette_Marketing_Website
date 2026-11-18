import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
  title: "Charities and non-profit",
  description:
    "Tight budgets, close scrutiny of spend, and audiences who are often beneficiaries rather than customers.",
  path: "/industries/charities-and-non-profit",
  index: false
});
}

export default function Page() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Charities and non-profit
            </Heading>
            <Text className='lead'>
              Charities, housing associations and community organisations
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
            Tight budgets, close scrutiny of spend, and audiences who are often
            beneficiaries rather than customers.
          </Text>
        </section>
        <section className='sec' aria-labelledby='challenge-title'>
          <Heading className='h2' level={2} id='challenge-title'>
            The challenge
          </Heading>
          <Text className='body'>
            Reaching people who are not looking for you, with limited money and
            a duty to spend it defensibly. Reputation carries more weight than
            reach.
          </Text>
        </section>
        <section className='sec' aria-labelledby='approach-title'>
          <Heading className='h2' level={2} id='approach-title'>
            Our approach
          </Heading>
          <Text className='body'>
            Proportionate to the budget — the Magenta Book&apos;s own principle
            is that evaluation should be &quot;proportionate in scale&quot;.
            Earned and organic before paid. Measurement that a trustee board
            can read.
          </Text>
        </section>
      </Container>
    </>
  );
}
