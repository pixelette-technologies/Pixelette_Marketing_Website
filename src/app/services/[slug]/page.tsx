import {
  ContactSection,
  ContentDisplaySection,
  Faqs,
  QuestionAndAnswer,
  TeamSection,
  TrustedBrands
} from "@/components/common";

import {
  ServicesHero,
  ServicesSection
} from "@/components/ui/services";
import { servicesData } from "@/data/services/servicesData";
import { proofCopy } from "@/data/home";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// 25 Sep 2026: an unknown slug rendered this template empty with a 200 (a
// soft 404). Only the eight service pages exist; anything else is a 404.
// /services/lead_genration is a redirect in next.config.ts and is unaffected.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicesData.map(service => ({ slug: service.route }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = servicesData.find(item => item.route === slug);
  const baseUrl = "https://www.pixelettemarketing.com";

  return {
    title: pageData?.metaTitle || "Services",
    description: pageData?.metaDescription || "Explore our professional services",
    keywords: pageData?.metaKeywords || "digital marketing services",
    alternates: {
      canonical: `${baseUrl}/services/${slug}`,
    },
    openGraph: {
      title: pageData?.metaTitle || "Services",
      description: pageData?.metaDescription || "Explore our professional services",
      url: `${baseUrl}/services/${slug}`,
      siteName: "Pixelette Marketing",
      images: [
        {
          url: pageData?.image || "/services/heroImageServices.webp",
          width: 1200,
          height: 630,
          alt: pageData?.metaTitle || "Services",
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData?.metaTitle || "Services",
      description: pageData?.metaDescription || "Explore our professional services",
      images: [pageData?.image || "/services/heroImageServices.webp"],
      creator: "@pixelettemarketing",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pageData = servicesData.find(item => item.route === slug);
  const baseUrl = "https://www.pixelettemarketing.com";

  const serviceData = pageData?.services;
  const contactData = pageData?.howWeWork;
  const questionAndAnswer = pageData?.questionAndAnswer;
  const reviewsData = pageData?.review;
  const marketingServicesData = pageData?.marketingServices;
  const faqData = pageData?.faqs;

  // Prepare FAQ schema if FAQs exist
  const faqSchema = pageData?.faqs?.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }));

  // Prepare breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${baseUrl}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pageData?.metaTitle || "Service",
        "item": `${baseUrl}/services/${slug}`
      }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema (server-rendered) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      {/* FAQ Schema (server-rendered) */}
      {faqSchema && faqSchema.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqSchema
            })
          }}
        />
      )}

      <ServicesHero
        mainHeading={pageData?.mainHeading}
        subHeading={pageData?.subHeading}
        text={pageData?.summary}
        image={pageData?.image || "/services/heroImageServices.webp"}
      />
      {/* 23 Sep 2026: "Trusted by / Leading Brands" came off. The row includes
          portfolio ventures and group work, so it takes the one claim the
          home page and /aboutus make about the same six logos. The inline
          layout cannot hold a sentence (its heading is nowrap), hence stacked. */}
      <TrustedBrands
        layout='stacked'
        eyebrow={proofCopy.eyebrow}
        heading={proofCopy.heading}
        standfirst={proofCopy.standfirst}
        cta={proofCopy.cta}
      />

      {/* 25 Sep 2026: THREE BLOCKS AND THEIR DATA ARE GONE, not hidden.
          The final correction pass requires a figure whose source cannot be
          verified in the project to be removed, not parked.
            ResearchSection: three percentages per page credited only to a
              publisher and a year. Three of the publishers do not appear to
              exist, two citations were truncated to "202", one statistic
              appeared twice under two sources, and the email page carried
              the recycled "760%" figure.
            Status: four percentages per page presented as Pixelette results
              ("60% increase in social shares in the first four months"), with
              no client, baseline or period. Unrendered since 23 Sep.
            Importance: always empty, so it never rendered, but its data still
              read "according to leaders of billion dollar brands".
          A figure can come back only with a real, linked source, written
          fresh rather than restored from history. */}

      <ServicesSection
        heading={serviceData?.heading}
        text={serviceData?.text}
        data={serviceData?.data || []}
      />

      <ContentDisplaySection
        title={marketingServicesData?.title}
        heading={marketingServicesData?.heading}
        detail={marketingServicesData?.detail}
        data={marketingServicesData?.data || []}
      />

      <TeamSection
        mainHeading={reviewsData?.mainHeading}
        subHeading={reviewsData?.subHeading}
        details={reviewsData?.details}
      />

      <ContactSection
        heading={contactData?.heading}
        data={contactData?.data || []}
      />

      <QuestionAndAnswer
        heading={questionAndAnswer?.question}
        text={questionAndAnswer?.answer}
      />

      <Faqs data={faqData} />
    </>
  );
}
