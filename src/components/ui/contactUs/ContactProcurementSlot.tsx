import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { company } from "@/data/company";
import { CONTACT_COMPANY_NUMBER, CONTACT_EMAIL } from "@/data/contactUs";

// Plan §9.3 — procurement and supplier checks, published rather than withheld.

export default function ContactProcurementSlot() {
  return (
    <section
      className='contactProcurement'
      aria-labelledby='procurement-title'
    >
      <Container className='main'>
        <Heading className='h3' level={2} id='procurement-title'>
          Procurement and supplier checks
        </Heading>
        <Text className='body'>
          If you need to assess us as a supplier, here is what is published
          today — and what is not:
        </Text>
        <ul className='body'>
          <li>
            <Link href='/public-sector/how-to-buy' className='textLink'>
              How to buy from us
            </Link>{" "}
            — the routes we are available through, and what we can and cannot
            be awarded today. A Central Digital Platform supplier identifier
            will appear there when issued, and not before
          </li>
          <li>
            <Link href='/accessibility' className='textLink'>
              Accessibility
            </Link>{" "}
            — a voluntary statement; WCAG 2.2 AA conformance is not yet claimed
          </li>
          <li>
            <Link href='/social-value' className='textLink'>
              Social value
            </Link>{" "}
            — our honesty position; specific commitments are not yet published
          </li>
          <li>
            <Link href='/policies' className='textLink'>
              Policies
            </Link>{" "}
            — Privacy is published. Safeguarding, equality and diversity,
            environmental and modern slavery are not yet published
          </li>
        </ul>
        <Text className='body'>
          For a supplier questionnaire, pre-qualification document or framework
          response, send it to{" "}
          <a className='textLink' href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          . We complete what we can evidence and say plainly where we cannot
          yet evidence something. We would rather give you a short answer you
          can rely on than a long one you have to check.
        </Text>
        <Text className='body'>
          Company number {CONTACT_COMPANY_NUMBER}. Incorporated{" "}
          {company.incorporatedDate}. Registered office{" "}
          {company.registeredOffice}.
        </Text>
      </Container>
    </section>
  );
}
