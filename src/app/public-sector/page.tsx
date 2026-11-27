import Link from "next/link";
import { Container } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
    title: "Public and civic communications",
    description:
      "Integrated marketing, campaigns and communications for public-sector organisations, education providers, charities and community organisations.",
    path: "/public-sector",
    index: false
  });
}

const deliverLines = [
  {
    href: "/public-sector/campaigns-and-public-awareness",
    label: "Campaigns and public awareness",
    blurb: "behaviour change, service uptake, public information"
  },
  {
    href: "/public-sector/digital-communications",
    label: "Digital communications",
    blurb: "websites, content and channels people can use"
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
  },
  {
    href: "/public-sector/campaign-evaluation",
    label: "Campaign evaluation",
    blurb: "whether a campaign achieved the outcome it was meant to"
  }
] as const;

export default function PublicSectorPage() {
  return (
    <>
      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              Marketing and communications for public and{" "}
              <em>civic organisations</em>
            </Heading>
            <Text className='lead'>
              We offer integrated marketing, campaigns and communications for
              public-sector organisations, education providers, charities and
              community organisations.
            </Text>
            <Text className='body'>
              From public awareness and stakeholder engagement to digital
              communications and campaign evaluation, our approach is designed
              around your objectives, audiences and intended outcomes.
            </Text>
          </section>
        </Container>
      </div>

      <Container className='main'>
        <section className='sec' aria-labelledby='deliver-title'>
          <Heading className='h2' level={2} id='deliver-title'>
            What this covers
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
      </Container>
    </>
  );
}
