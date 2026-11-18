import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { company } from "@/data/company";
import { CONTACT_EMAIL } from "@/data/contactUs";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
  title: "How to buy from us",
  description:
    "Routes open to a small new supplier: below-threshold work, three-quote routes, and associate or subcontract delivery. RM6124 status stated as it is.",
  path: "/public-sector/how-to-buy",
  index: false
});
}

export default function HowToBuyPage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              How to buy from us
            </Heading>
            <Text className='lead'>
              We are a small, new supplier. That shapes which routes are open to
              us, and we would rather set it out than have you work it out.
            </Text>
          </section>
        </Container>
      </div>

      <Container className='main'>
        <section className='sec' aria-labelledby='who-title'>
          <Heading className='h2' level={2} id='who-title'>
            Who we are, for your records
          </Heading>
          <Text className='body'>
            {company.legalName} · Company number {company.companyNumber} ·
            Incorporated {company.incorporatedDate} · Registered office{" "}
            {company.registeredOffice} · Part of Pixelette Group
          </Text>
          <Text className='body'>
            There is a dissolved company with a similar name — 14925088,
            incorporated 2023 and struck off 24 February 2026. It is not us and
            never was. It tends to surface first in search, so we name it here
            to save you the check.
          </Text>
        </section>

        <section className='sec' aria-labelledby='open-title'>
          <Heading className='h2' level={2} id='open-title'>
            Routes that are open to us today
          </Heading>
          <Heading className='h3' level={3}>
            Below-threshold and quoted work
          </Heading>
          <Text className='body'>
            The simplest route. Under the Procurement Act 2023, contracts are
            published at £12,000 including VAT for central government
            authorities and £30,000 for sub-central authorities. Worth noting
            which side NHS bodies fall: NHS trusts and foundation trusts are
            central government authorities under the Act, so they sit at the
            £12,000 threshold. Plenty of pre-Act material still groups them
            with sub-central bodies.
          </Text>
          <Heading className='h3' level={3}>
            Where you need three quotes
          </Heading>
          <Text className='body'>
            Education guidance describes obtaining at least three quotes where
            a framework is not suitable. We are happy to be one of them. Your
            own procurement and financial rules still apply and we will not
            suggest otherwise.
          </Text>
          <Heading className='h3' level={3}>
            As an associate or subcontractor
          </Heading>
          <Text className='body'>
            If you are an agency already holding a public-sector contract and
            you need defined delivery — digital content, social, campaign
            delivery, community engagement, design and production, analysis and
            reporting — this is the route we are actively pursuing, and the one
            where a new supplier is assessed on capability rather than on thin
            trading history.
          </Text>
        </section>

        <section className='sec' aria-labelledby='closed-title'>
          <Heading className='h2' level={2} id='closed-title'>
            Routes that are not open to us today
          </Heading>
          <Text className='body'>
            <strong>RM6364 Media and Creative Services</strong> is a closed
            framework, awarded 18 December 2025 and running to 14 June 2030,
            with 22 appointed suppliers. New suppliers cannot join. If your
            route is RM6364, we cannot be awarded directly — but we can work as
            an associate to a supplier who holds a place, and we are talking to
            several.
          </Text>
          <Text className='body'>
            <strong>RM6124 Communications Marketplace</strong> is a dynamic
            purchasing system running to 23 February 2029, open to new agencies
            at any time. We have not yet been appointed. Joining is free and
            uncapped, but it is not automatic: there is a selection-criteria
            assessment. We will say here when we are appointed, and not before.
          </Text>
        </section>

        <section className='sec' aria-labelledby='questionnaire-title'>
          <Heading className='h2' level={2} id='questionnaire-title'>
            What you will get if you send us a questionnaire
          </Heading>
          <Text className='body'>
            A completed response, with evidence where we have it and a plain
            statement where we do not. We will not pad a pre-qualification
            document with work we did not do. What is published today is at{" "}
            <Link href='/accessibility' className='textLink'>
              /accessibility
            </Link>
            ,{" "}
            <Link href='/social-value' className='textLink'>
              /social-value
            </Link>{" "}
            and{" "}
            <Link href='/policies' className='textLink'>
              /policies
            </Link>
            — including an honest list of policies not yet published. We will
            not imply a check is answered until the underlying evidence is.
          </Text>
          <Text className='body'>
            <a className='textLink' href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            — same working day response, with a named owner.
          </Text>
        </section>
      </Container>
    </>
  );
}
