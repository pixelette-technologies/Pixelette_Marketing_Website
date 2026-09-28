import { IndustriesHero, Web3Questions } from "@/components/ui/industries";
import { ItemsSection } from "@/components/ui/home";
import { CaseStudySection } from "@/components/ui/results";
import { ContactSection, Container, Faqs } from "@/components/common";
import { Heading, Text } from "@/components/feature";
import { industriesData } from "@/data/industries/industriesData";
import { caseStudies } from "@/data/results/caseStudies";
import { finalConversionCopy } from "@/data/home";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const baseUrl = "https://www.pixelettemarketing.com";

// 25 Sep 2026: /industries/undefined returned 200 with an empty template (the
// old site's Startup card linked there). Only the five pages exist; anything
// else is a 404 now, from the router rather than from a check in the page.
export const dynamicParams = false;

export function generateStaticParams() {
  return industriesData.map(page => ({ slug: page.route }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = industriesData.find(item => item.route === slug);
  if (!pageData) return {};

  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: pageData.metaKeywords,
    alternates: {
      canonical: `${baseUrl}/industries/${slug}`
    },
    openGraph: {
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      url: `${baseUrl}/industries/${slug}`,
      siteName: "Pixelette Marketing",
      images: [
        {
          url: pageData.image,
          width: 1200,
          height: 630,
          alt: pageData.metaTitle
        }
      ],
      locale: "en_GB",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.metaTitle,
      description: pageData.metaDescription,
      images: [pageData.image],
      creator: "@pixelettemarketing"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

// The deeper-experience page, rebuilt 25 Sep 2026 on components the site
// already has, in the order the correction pass set out:
//
//   A  IndustriesHero      eyebrow, h1, positioning line, one CTA to the form
//   B  Web3Questions       the market's constraints, as rows (it is the
//                          sector-constraint block; the name is historical)
//   C  .sectorHelp         where Pixelette fits, and what the work is not
//   D  ItemsSection dark   the five capabilities, as the home page sets them
//   E  ItemsSection        the home page's four process stages
//   F  CaseStudySection    only where a real case study applies
//   G  Faqs                with a header now
//   H  ContactSection      "Tell us what needs to grow.", anchored #enquiry
//
// ONE DARK BAND. The capabilities take it, as the Growth System does on the
// home page; the close is .band-closing, which is its own ground.
//
// WHAT CAME OFF: ContentDisplaySection (the nine "Crypto SEO Services"-style
// cards), the Book / Audit / Plan / Execute ContactSection that promised a
// free consultation and transparent pricing, and QuestionAndAnswer ("AI is
// shaping the future. Will your brand lead the way?").
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pageData = industriesData.find(item => item.route === slug);
  if (!pageData) notFound();

  // The evidence is the /results case study itself, looked up by client, so
  // BlockGuard's figures exist in one place and render identically on both
  // pages. A missing match renders nothing rather than an empty section.
  const evidence = pageData.evidence
    ? caseStudies.find(study => study.client === pageData.evidence?.client)
    : undefined;

  const faqSchema = pageData.faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Industries",
        item: `${baseUrl}/industries`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageData.label,
        item: `${baseUrl}/industries/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqSchema
          })
        }}
      />

      <IndustriesHero
        eyebrow='Deeper experience'
        mainHeading={pageData.mainHeading}
        subHeading={pageData.subHeading}
        text={pageData.summary}
        image={pageData.image}
        cta={{ label: "Tell us what needs to grow", to: "#enquiry" }}
      />

      <Web3Questions
        eyebrow={pageData.challenges.eyebrow}
        heading={pageData.challenges.heading}
        text={pageData.challenges.lead}
        data={pageData.challenges.items}
      />

      <Container className='main'>
        <section className='sectorHelp whoBand__head'>
          <Text className='eyebrow'>{pageData.help.eyebrow}</Text>
          <Heading className='h2' level={2}>
            {pageData.help.heading}
          </Heading>
          {pageData.help.body.map((paragraph, index) => (
            <Text className={index === 0 ? "lead" : "body"} key={index}>
              {paragraph}
            </Text>
          ))}
        </section>
      </Container>

      <ItemsSection
        content={pageData.capabilities}
        ground='dark'
        grid='thirds'
        variant='card'
      />

      <ItemsSection content={pageData.approach} />

      {evidence && pageData.evidence && (
        <div className='sectorEvidence'>
          <Container className='main'>
            <header className='whoBand__head sectorEvidence__head'>
              <Text className='eyebrow'>{pageData.evidence.eyebrow}</Text>
              <Heading className='h2' level={2}>
                {pageData.evidence.heading}
              </Heading>
            </header>
          </Container>
          <CaseStudySection content={evidence} />
          <Container className='main'>
            <Link href='/results' className='btn2 sectorEvidence__more'>
              See client results
            </Link>
          </Container>
        </div>
      )}

      <Faqs
        eyebrow='Questions'
        heading={pageData.faqHeading}
        data={pageData.faqs}
      />

      <ContactSection
        id='enquiry'
        eyebrow='Start here'
        heading='Tell us what needs to grow.'
        text={pageData.close.lead}
        closing={finalConversionCopy.closing}
        formIntro={false}
      />
    </>
  );
}
