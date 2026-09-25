import type { Metadata } from "next";
import { Container, TrustedBrands } from "@/components/common";
import Link from "next/link";
import { Heading, Text } from "@/components/feature";
import { servicesData } from "@/data/services/servicesData";
import { capabilityGroups } from "@/data/services/capabilityGroups";
import { tools, toolsBandCopy } from "@/data/services/toolsWeWorkIn";

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

      <div className='hubList sec'>
        <Container className='main'>
          <div className='capabilityList' data-reveal='stagger'>
            {capabilityGroups.map(group => (
              <section className='capabilityList__group' key={group.index}>
                <Text className='capabilityList__index'>{group.index}</Text>
                <div className='capabilityList__main'>
                  <Heading className='h3 capabilityList__title' level={2}>
                    {group.title}
                  </Heading>
                  <Text className='body'>{group.body}</Text>

                  {/* 22 Sep 2026. Strategy & Positioning is the one capability
                      with no service pages under it, and until now it was also
                      the one with no way out — five blocks, four of them
                      ending in links and the first ending in nothing. It ends
                      on the diagnostic now.

                      IT IS NOT IN THE LINK ROW BENEATH. That row is a list of
                      peer service pages set at link weight, and this is the
                      capability itself rather than a service filed under it.
                      Giving it its own line keeps both claims honest and keeps
                      capability 01 from looking like it finally acquired a
                      product. */}
                  {group.featured && (
                    <Link
                      href={group.featured.route}
                      className='capabilityList__featured'
                    >
                      {group.featured.label}
                    </Link>
                  )}

                  {/* Absent, not empty, when a capability has no service page
                      beneath it — see capabilityGroups.ts. */}
                  {group.services.length > 0 && (
                    <ul className='capabilityList__services'>
                      {group.services.map(service => (
                        <li key={service.route}>
                          <Link href={`/services/${service.route}`}>
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </section>
            ))}
          </div>
        </Container>
      </div>

      {/* 25 Sep 2026. The old site's tool band, back on the client-logo
          device so the two read as one recurring thing — asked for in exactly
          those terms. It sits AFTER the five capabilities, because the tools
          are how the work gets done, not what is being sold, and BEFORE the
          call to action so the page still ends on the way out rather than on
          a dark band running into the footer. The list is unconfirmed; see
          toolsWeWorkIn.ts. */}
      <TrustedBrands
        layout='stacked'
        className='trustedBrands--tools'
        eyebrow={toolsBandCopy.eyebrow}
        heading={toolsBandCopy.heading}
        standfirst={toolsBandCopy.standfirst}
        items={tools.map(({ name, Mark }) => ({
          name,
          mark: Mark ? (
            <Mark />
          ) : (
            <span className='trustedBrands__wordmark'>{name}</span>
          )
        }))}
      />

      <div className='sec-sm'>
        <Container className='main'>
          {/* ONE way out, where there used to be eight competing "View More"
              links and no way to start a conversation. The service pages are
              still reachable from every capability above, so nothing is
              orphaned — they simply stop being the only exit. */}
          <Link href='/contactus' className='btn'>
            Talk to us about your growth plan
          </Link>
        </Container>
      </div>
    </>
  );
}
