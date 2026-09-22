import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { diagnosticClose } from "@/data/strategy";
import Link from "next/link";

// The close. Same anatomy as AboutClose — a wide primary column and a narrow,
// quieter note on its own hairline — because that is the converted close on
// this site and copying it keeps one shape rather than inventing a third.
//
// NOT QuestionAndAnswer. The shared close is still un-converted: it renders
// heading_secondry--light and text_secondry and hard-codes "Book a consultant -
// it's on us!". Four templates still use it and the divergence is already
// recorded in the vault as a decision to take when those templates are next
// looked at; putting legacy classes on a new page to avoid a third close file
// would be the wrong way to resolve it.
//
// THE CTA LABEL IS THE BRIEF'S PRIMARY, the same one the navigation button and
// the home hero carry. The brief is explicit that mixing CTA labels between
// positions is worse than either label alone.
//
// The aside is the link back to the hub. This capability is one of five and a
// page that ends without saying so is a cul-de-sac — the same reason
// /industries was stopped from reading as a boundary on 22 Sep.

const DiagnosticClose = () => {
  const { eyebrow, heading, lead, cta, aside } = diagnosticClose;

  return (
    <div className='band-closing'>
      <Container className='main'>
        <section className='diagnosticClose'>
          <div className='diagnosticClose__primary'>
            <Heading className='eyebrow' level={2}>
              {eyebrow}
            </Heading>
            <Heading className='h2' level={3}>
              {heading}
            </Heading>
            <Text className='lead'>{lead}</Text>
            <Link href={cta.to} className='btn'>
              {cta.label}
            </Link>
          </div>

          <div className='diagnosticClose__aside'>
            <Text className='small'>{aside.body}</Text>
            <Link href={aside.link.to} className='link diagnosticClose__link'>
              {aside.link.label}
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default DiagnosticClose;
