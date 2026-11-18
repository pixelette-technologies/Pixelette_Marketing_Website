import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Education and learning",
  description:
    "Commercial training and edtech, and public education — schools, trusts, colleges and universities.",
  path: "/industries/education-and-learning",
  index: false
});

export default function Page() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Education and learning
            </Heading>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-labelledby='commercial-title'>
          <Heading className='h2' level={2} id='commercial-title'>
            Commercial
          </Heading>
          <Text className='body'>
            Training providers, edtech and learning products, where the
            objective is enrolments, registrations and revenue.
          </Text>
        </section>
        <section className='sec' aria-labelledby='public-title'>
          <Heading className='h2' level={2} id='public-title'>
            Public and civic
          </Heading>
          <Text className='body'>
            Schools and multi-academy trusts, sixth forms, colleges and
            universities, where the objective is admissions, parent and
            community engagement, participation and staff recruitment — and
            where procurement, safeguarding and accessibility all apply.
          </Text>
        </section>
        <section className='sec' aria-labelledby='note-title'>
          <Heading className='h2' level={2} id='note-title'>
            Accessibility on school sites
          </Heading>
          <Text className='body'>
            One note we would rather state than be asked: a school&apos;s own
            website is partially exempt from the public sector accessibility
            regulations, except for content people need in order to use its
            services. We would tell you which of your content falls inside that
            exception rather than selling you a compliance programme you do not
            need.
          </Text>
        </section>
      </Container>
    </>
  );
}
