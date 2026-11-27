import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
  title: "Education and learning",
  description:
    "Training providers and edtech, and schools, trusts, colleges and universities — admissions, engagement and participation.",
  path: "/industries/education-and-learning",
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
              Education and <em>learning</em>
            </Heading>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-labelledby='commercial-title'>
          <Heading className='h2' level={2} id='commercial-title'>
            Training providers and edtech
          </Heading>
          <Text className='body'>
            Training providers, edtech and learning products, where the
            objective is enrolments, registrations and revenue.
          </Text>
        </section>
        <section className='sec' aria-labelledby='public-title'>
          <Heading className='h2' level={2} id='public-title'>
            Schools, trusts and colleges
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
          <p className='sec-sm'>
            <Link href='/public-sector/education-marketing' className='textLink'>
              Education marketing and student recruitment
              <span aria-hidden='true'> →</span>
            </Link>
          </p>
        </section>
      </Container>
    </>
  );
}
