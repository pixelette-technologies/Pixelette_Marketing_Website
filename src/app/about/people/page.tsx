import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { company } from "@/data/company";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "People",
  description:
    "Pixelette Marketing Ltd is accountable for every engagement. These are the people who do the work.",
  path: "/about/people"
});

export default function PeoplePage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              The people doing the work
            </Heading>
            <Text className='lead'>
              Pixelette Marketing Ltd is accountable for every engagement. These
              are the people who do the work.
            </Text>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-labelledby='capacity-title'>
          <Heading className='h2' level={2} id='capacity-title'>
            How capacity is described
          </Heading>
          <Text className='body'>
            Our filed employee figure is {company.filedEmployees} including
            directors. That is the number that goes wherever a form asks for
            employees. Delivery capacity is a different thing and is described
            in words rather than as a number: specialists engaged per
            assignment. We never publish a headcount band that counts associates
            as employees.
          </Text>
          <Text className='body'>
            Named people appear here only with documented consent to be named,
            photographed and described. Until those consents and approved
            biographies are in place, this page states the accountability model
            rather than inventing a roster.
          </Text>
        </section>
        <section className='sec' aria-labelledby='leadership-title'>
          <Heading className='h2' level={2} id='leadership-title'>
            Company leadership
          </Heading>
          <Text className='body'>
            Named leadership — with role and background, accountable for the
            client relationship, the contract and delivery standards — will be
            published here once biographies and photographs are approved.
          </Text>
        </section>
        <section className='sec' aria-labelledby='specialists-title'>
          <Heading className='h2' level={2} id='specialists-title'>
            Specialists
          </Heading>
          <Text className='body'>
            Named practitioners who deliver, shown with their actual role on an
            assignment rather than as a department, will be published here with
            consent. Short and named beats long and anonymous.
          </Text>
        </section>
      </Container>
    </>
  );
}
