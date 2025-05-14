import { IndustriesHero, Web3Questions } from "@/components/ui/industries";
import {
  ContactSection,
  ContentDisplaySection,
  Faqs,
  QuestionAndAnswer
} from "@/components/common";
import { industriesData } from "@/data/industries/industriesData";
import { Metadata } from "next";
import Script from "next/script";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = industriesData.find(item => item.route === slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pixelettemarketing.com';

  return {
    title: pageData?.metaTitle || "Services",
    description: pageData?.metaDescription || "Explore our professional services",
    keywords: pageData?.metaKeywords || "digital marketing services",
    alternates: {
      canonical: `${baseUrl}/industries/${slug}`,
    },
    openGraph: {
      title: pageData?.metaTitle || "Industries",
      description: pageData?.metaDescription || "Explore our professional industries",
      url: `${baseUrl}/industries/${slug}`,
      siteName: "Pixelette Marketing",
      images: [
        {
          url: pageData?.image || "/industries/heroImageIndustries.webp",
          width: 1200,
          height: 630,
          alt: pageData?.metaTitle || "Industries",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData?.metaTitle || "Industries",
      description: pageData?.metaDescription || "Explore our professional industries",
      images: [pageData?.image || "/industries/heroImageIndustries.webp"],
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
    }
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pageData = industriesData.find(item => item.route === slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pixelettemarketing.com';

  const ourSolutionData = pageData?.ourSolutions;
  const contactData = pageData?.howWeWork;
  const questionAndAnswer = pageData?.questionAndAnswer;
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
        "name": "Industries",
        "item": `${baseUrl}/industries`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pageData?.metaTitle || "Industry",
        "item": `${baseUrl}/industries/${slug}`
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

      <IndustriesHero
        mainHeading={pageData?.mainHeading}
        subHeading={pageData?.subHeading}
        text={pageData?.summary}
        image={pageData?.image || "/industries/industriesHero.webp"}
      />
      <Web3Questions
        heading={ourSolutionData?.heading}
        text={ourSolutionData?.text}
        data={ourSolutionData?.data || []}
      />
      <ContentDisplaySection
        title={marketingServicesData?.title}
        heading={marketingServicesData?.heading}
        detail={marketingServicesData?.detail}
        data={marketingServicesData?.data || []}
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
