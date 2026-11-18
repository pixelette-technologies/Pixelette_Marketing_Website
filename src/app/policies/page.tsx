import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
  title: "Policies and governance",
  description:
    "Everything a supplier check usually asks for, in one place. Only documents that exist are linked.",
  path: "/policies",
  index: false
});
}

/** Plan §10.8 — link only real documents. Empty policy pages are worse than
 *  missing ones. */
const published = [
  {
    name: "Privacy / data protection",
    href: "/privacy",
    covers:
      "How we handle personal data on this site and in enquiries. Further engagement-specific DPIA and sub-processor detail is supplied on request."
  },
  {
    name: "Accessibility",
    href: "/accessibility",
    covers: "Our voluntary statement and how we work to WCAG 2.2 AA on client work."
  },
  {
    name: "Social value",
    href: "/social-value",
    covers: "Our position, including what we will not claim."
  }
] as const;

const pending = [
  "Safeguarding",
  "Equality, diversity and inclusion",
  "Environmental",
  "Modern slavery"
] as const;

export default function PoliciesPage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Policies and governance
            </Heading>
            <Text className='lead'>
              Everything a supplier check usually asks for, in one place.
            </Text>
          </section>
        </Container>
      </div>
      <Container className='main'>
        <section className='sec' aria-labelledby='published-title'>
          <Heading className='h2' level={2} id='published-title'>
            Published
          </Heading>
          <ul className='body'>
            {published.map(item => (
              <li key={item.href}>
                <Link href={item.href} className='textLink'>
                  {item.name}
                </Link>
                {" — "}
                {item.covers}
              </li>
            ))}
          </ul>
        </section>
        <section className='sec' aria-labelledby='pending-title'>
          <Heading className='h2' level={2} id='pending-title'>
            Not yet published
          </Heading>
          <Text className='body'>
            An empty policy is worse than a missing one. The following will be
            linked here only when they are real, dated and version-numbered HTML
            pages:
          </Text>
          <ul className='body'>
            {pending.map(name => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
