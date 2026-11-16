import { Container } from "@/components/common";
import MockupBanner from "@/components/common/MockupBanner";
import { Heading, Text } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Accessibility",
  description: "Accessibility.",
  path: "/accessibility"
});

export default function AccessibilityPage() {
  return (
    <>
      <MockupBanner />
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Accessibility
            </Heading>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-labelledby='conformance-title'>
          <Heading className='h2' level={2} id='conformance-title'>
            Conformance
          </Heading>
          <Text className='body'>[PENDING AUDIT]</Text>
        </section>
      </Container>
    </>
  );
}
