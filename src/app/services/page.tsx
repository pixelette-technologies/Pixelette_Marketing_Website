import type { Metadata } from "next";
import { Container } from "@/components/common";
import Link from "next/link";
import { Heading, Text } from "@/components/feature";
import { servicesData } from "@/data/services/servicesData";
import { capabilityGroups } from "@/data/services/capabilityGroups";
import { CapabilityExplorer } from "@/components/ui/services";

const baseUrl = "https://www.pixelettemarketing.com";

export const metadata: Metadata = {
  title: "Digital Marketing Services | Pixelette Marketing",
  description:
    "Five connected capabilities — strategy, demand, search, pipeline and growth intelligence — covering SEO, social media, paid ads, PR, email, influencer and lead generation. For businesses across established and emerging sectors.",
  keywords:
    "digital marketing services, marketing agency services, SEO services, social media marketing, PPC, PR, email marketing, lead generation",
  alternates: { canonical: `${baseUrl}/services` },
  openGraph: {
    title: "Digital Marketing Services | Pixelette Marketing",
    description:
      "Five connected capabilities covering the full marketing offer, for businesses across established and emerging sectors.",
    url: `${baseUrl}/services`,
    siteName: "Pixelette Marketing",
    type: "website",
    images: [
      {
        url: "/services/heroImageServices.webp",
        width: 1200,
        height: 630,
        alt: "Pixelette Marketing Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services | Pixelette Marketing",
    description:
      "Five connected capabilities covering the full marketing offer, for businesses across established and emerging sectors.",
    images: ["/services/heroImageServices.webp"],
    creator: "@pixelettemarketing"
  },
  robots: { index: true, follow: true }
};

// Added 10 Jun 2026 as an SEO hub and never taken through the design
// conversion. It carried twenty-odd inline style objects: the h1 hard-coded at
// 1.5625rem, card titles at 0.78125rem and summaries at 0.59375rem — roughly
// 9.5px — with no primitive classes at all.
//
// NOT A CONTENT CHANGE. Every word on this page is the word that was here
// before: the heading, the standfirst, both JSON-LD blocks and each card's
// title and summary are untouched, and they still come from servicesData. Only
// the markup and the styling change.
//
// The cards are ArrowCard, which is the card this site already uses for a
// titled, summarised link to a detail page — the home page's sector cards are
// the same component pointing at the same kind of destination. Its "View More"
// label is its own and needed no copy written for it.
//
// The hero takes .wash-left, the interior-page ground. There is no eyebrow:
// this page has no such copy, and writing one to complete the pattern is the
// trap the codebase has reverted twice. The pattern ships without it.

export default function ServicesIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Digital Marketing Services",
    itemListElement: servicesData.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${baseUrl}/services/${service.route}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className='wash-left'>
        <Container className='main'>
          <section className='hubHero'>
            <Heading className='h1p' level={1}>
              What we do
            </Heading>
            <Text className='lead'>
              Pixelette Marketing works with businesses across established and
              emerging sectors. The work is organised as five connected
              capabilities rather than a menu of channels — the starting point
              is what is actually limiting growth, not a predetermined service.
            </Text>
          </section>
        </Container>
      </div>

      {/* 29 Sep 2026: THE FIVE CAPABILITIES AS ONE EXPLORER, replacing the
          stacked list of five (22 Sep) on the "What We Do" implementation
          instruction. Same taxonomy, same copy, same links — capabilityGroups
          is passed straight through — plus a lead statement and one stage of
          approved artwork per capability. See CapabilityExplorer.tsx.

          Outside the Container deliberately: the stage bleeds to the right
          edge of the viewport, and the Container clips. The explorer restates
          the wrap as its own grid tracks, so the rail still lines up with the
          hero above it. */}
      <section className='sec' aria-label='Five capabilities'>
        <CapabilityExplorer groups={capabilityGroups} />
      </section>

      {/* 25 Sep 2026, later: THE TOOL BAND IS OFF THIS PAGE. It was "Tools we
          work in / The platforms behind the work", fourteen vendors on the
          client-logo device. Nobody at Pixelette has confirmed the list, and
          the only tool on it with any evidence behind it is GA4, because this
          site loads a GA4 property. The final correction pass set the rule:
          an absent stack is better than an incomplete or misleading one. The
          list and its reasoning stay in toolsWeWorkIn.ts so the band can come
          back, tool by tool, once management confirms what is actually used. */}

      <div className='sec-sm'>
        <Container className='main'>
          {/* ONE way out, where there used to be eight competing "View More"
              links and no way to start a conversation. The service pages are
              still reachable from every capability above, so nothing is
              orphaned — they simply stop being the only exit. */}
          <Link href='/contactus' className='btn'>
            Tell us what needs to grow
          </Link>
        </Container>
      </div>
    </>
  );
}
