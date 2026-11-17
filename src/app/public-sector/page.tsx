import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { company } from "@/data/company";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "Public and civic communications",
  description:
    "Communications measured in public outcomes, not sales. Campaign evaluation, public awareness, digital, community engagement, change communications and education marketing.",
  path: "/public-sector"
});

const deliverLines = [
  {
    href: "/public-sector/campaigns-and-public-awareness",
    label: "Campaigns and public awareness",
    blurb: "behaviour change, service uptake, public information"
  },
  {
    href: "/public-sector/digital-communications",
    label: "Digital communications",
    blurb: "websites, content and channels that meet accessibility requirements"
  },
  {
    href: "/public-sector/community-engagement",
    label: "Community engagement and consultation support",
    blurb: "reaching the people a consultation needs to hear from"
  },
  {
    href: "/public-sector/internal-and-change-communications",
    label: "Internal and change communications",
    blurb: "staff communications through service change"
  },
  {
    href: "/public-sector/education-marketing",
    label: "Education marketing and student recruitment",
    blurb: "admissions, parent engagement, participation"
  }
] as const;

export default function PublicSectorPage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Communications measured in public outcomes, not sales
            </Heading>
            <Text className='lead'>
              Most marketing is built to produce customers. A council, a trust,
              an NHS body or a college usually needs something else: people to
              take up a service, attend an appointment, apply for a place,
              respond to a consultation, or simply understand a change that
              affects them.
            </Text>
            <Text className='body'>
              The craft is the same. What counts as success is not — and that
              difference runs through how we plan, what we measure and what we
              are prepared to claim.
            </Text>
          </section>
        </Container>
      </div>

      <Container className='main'>
        <section className='sec' aria-labelledby='lead-eval-title'>
          <Heading className='h2' level={2} id='lead-eval-title'>
            We lead with campaign evaluation
          </Heading>
          <Text className='body'>
            Because the question a public buyer most needs answered is whether
            a campaign achieved its intended outcome, even when that outcome
            was never a sale. It is the one thing we can show you in full
            before you commission anything, because it is a method rather than
            a portfolio.
          </Text>
          <p className='sec-sm'>
            <Link
              href='/public-sector/campaign-evaluation'
              className='textLink'
            >
              Campaign evaluation
              <span aria-hidden='true'> →</span>
            </Link>
          </p>
        </section>

        <section className='sec' aria-labelledby='deliver-title'>
          <Heading className='h2' level={2} id='deliver-title'>
            And we deliver
          </Heading>
          <ul className='body'>
            {deliverLines.map(line => (
              <li key={line.href}>
                <Link href={line.href} className='textLink'>
                  {line.label}
                </Link>
                {" — "}
                {line.blurb}
              </li>
            ))}
          </ul>
        </section>

        <section className='sec' aria-labelledby='where-we-are-title'>
          <Heading className='h2' level={2} id='where-we-are-title'>
            Where we are, stated plainly
          </Heading>
          <Text className='body'>
            Pixelette Marketing Ltd was incorporated on{" "}
            {company.incorporatedDate}. We are a new company and we have not
            yet delivered a public-sector or education engagement under this
            name. You would find that out, so we would rather tell you.
          </Text>
          <Text className='body'>What we do have:</Text>
          <ul className='body'>
            <li>
              A method you can read in full before commissioning anything —
              set out on the evaluation page, in the frameworks the sector
              already uses
            </li>
            <li>
              Published positions you can check today — Privacy at{" "}
              <Link href='/privacy' className='textLink'>
                /privacy
              </Link>
              , a voluntary Accessibility statement at{" "}
              <Link href='/accessibility' className='textLink'>
                /accessibility
              </Link>{" "}
              (conformance not yet claimed), and Social value honesty at{" "}
              <Link href='/social-value' className='textLink'>
                /social-value
              </Link>
              . Safeguarding, equality and diversity, environmental and modern
              slavery policies are not yet published — see{" "}
              <Link href='/policies' className='textLink'>
                /policies
              </Link>
            </li>
            <li>
              Delivery experience in adjacent commercial work, published with
              sources at{" "}
              <Link href='/results' className='textLink'>
                /results
              </Link>
            </li>
          </ul>
          <Text className='body'>
            Our founder has worked in and around the public sector. That is
            personal professional experience and we present it as nothing more
            — it is not work delivered by this company, and we will not
            describe it as though it were.
          </Text>
          <Text className='body'>
            If you need an agency with ten named council clients, that is not
            us yet. If you are an agency already holding public-sector
            contracts and you need defined delivery on one of them, or a
            school, charity or small provider willing to start with something
            small and measured properly, that is exactly where we are useful.
          </Text>
        </section>

        <section className='sec' aria-labelledby='conditions-band-title'>
          <Heading className='h2' level={2} id='conditions-band-title'>
            Conditions of entry
          </Heading>
          <Text className='body'>
            What is published today:{" "}
            <Link href='/privacy' className='textLink'>
              Privacy
            </Link>
            , a voluntary{" "}
            <Link href='/accessibility' className='textLink'>
              Accessibility
            </Link>{" "}
            statement (WCAG 2.2 AA conformance not yet claimed), and{" "}
            <Link href='/social-value' className='textLink'>
              Social value
            </Link>
            . Safeguarding, equality and diversity, environmental and modern
            slavery policies are listed as not yet published on{" "}
            <Link href='/policies' className='textLink'>
              Policies
            </Link>
            .
          </Text>
          <p className='sec-sm'>
            <Link href='/public-sector/how-to-buy' className='btn'>
              How to buy from us
            </Link>
          </p>
        </section>
      </Container>
    </>
  );
}
