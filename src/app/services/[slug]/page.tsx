import {
  ContactSection,
  ContentDisplaySection,
  Faqs,
  QuestionAndAnswer,
  TeamSection,
  TrustedBrands
} from "@/components/common";

import {
  Importance,
  ResearchSection,
  ServicesHero,
  ServicesSection,
  Status
} from "@/components/ui/services";
import { servicesData } from "@/data/services/servicesData";
import { Metadata } from "next";
import Script from "next/script";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = servicesData.find(item => item.route === slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pixelettemarketing.com';

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
      locale: "en_US",
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pixelettemarketing.com';

  const researchData = pageData?.research;
  const importanceData = pageData?.importance;
  const statusData = pageData?.status;
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
      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      {/* FAQ Schema */}
      {faqSchema && faqSchema.length > 0 && (
        <Script
          id="faq-schema"
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
      <TrustedBrands />

      <ResearchSection
        mainHeading={researchData?.mainHeading}
        subHeading={researchData?.subHeading}
        detail={researchData?.detail}
        data={researchData?.data || []}
      />

      <Importance
        mainheading={importanceData?.mainHeading}
        subHeading={importanceData?.subHeading}
        data={importanceData?.data || []}
      />

      <Status
        heading={statusData?.heading}
        text={statusData?.text}
        data={statusData?.data || []}
      />

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
