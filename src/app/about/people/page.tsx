import { Container } from "@/components/common";
import MockupBanner from "@/components/common/MockupBanner";
import { Heading, Text } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "People",
  description: "People.",
  path: "/about/people"
});

export default function PeoplePage() {
  return (
    <>
      <MockupBanner />
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              People
            </Heading>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-label='People placeholders'>
          {[1, 2, 3].map(n => (
            <article key={n} className='sec-sm'>
              <div
                aria-hidden='true'
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: "#d0d0d0",
                  marginBottom: "1rem"
                }}
              />
              <Heading className='h3' level={2}>
                Name to be confirmed
              </Heading>
              <Text className='body'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </Text>
            </article>
          ))}
        </section>
      </Container>
    </>
  );
}
