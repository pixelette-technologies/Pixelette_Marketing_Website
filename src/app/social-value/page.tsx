import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Social value",
  description:
    "Our social value position, written once so it is the same answer every time you ask for it.",
  path: "/social-value"
});

export default function SocialValuePage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Social value
            </Heading>
            <Text className='lead'>
              Most public bodies apply a social value weighting. Here is our
              position, written once so it is the same answer every time you ask
              for it.
            </Text>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-labelledby='honest-title'>
          <Heading className='h2' level={2} id='honest-title'>
            What we will not claim
          </Heading>
          <Text className='body'>
            We are a small company and we are not going to claim a social value
            programme we do not have. What follows is what we actually do, and
            what we will commit to on an engagement.
          </Text>
          <Text className='body'>
            We do not have ISO certification, a carbon reduction plan audited by
            a third party, or a B Corp certification. Several agencies we
            compete with do. If your evaluation weights those, we will score
            below them, and we would rather you knew that now than discovered it
            at award.
          </Text>
          <Text className='body'>
            Specific commitments on local employment, supplier practice,
            learning activity and pro bono or discounted civic work will be
            published here once they are written as specifics rather than
            aspirations, with a measure, a frequency and who reports them.
          </Text>
        </section>
        <Text className='small'>
          Last updated 17 November 2026 · Version 1.0
        </Text>
      </Container>
    </>
  );
}
