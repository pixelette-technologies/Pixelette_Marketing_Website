import { Container } from "@/components/common";
import MockupBanner from "@/components/common/MockupBanner";
import { Heading } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
  title: "Web3 marketing",
  description: "Web3 marketing.",
  path: "/specialisms/web3-marketing",
  index: false
});
}

export default function Web3MarketingStubPage() {
  return (
    <>
      <MockupBanner />
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Web3 marketing
            </Heading>
          </section>
        </Container>
      </div>
    </>
  );
}
