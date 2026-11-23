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
import { EmailMarketingPage } from "@/components/ui/emailMarketing";
import { InfluencerPartnershipsPage } from "@/components/ui/influencer";
import { PrEarnedMediaPage } from "@/components/ui/prEarnedMedia";
import { PaidMediaPage } from "@/components/ui/paidMedia";
import { SeoVisibilityPage } from "@/components/ui/seoVisibility";
import { SocialCommunityPage } from "@/components/ui/socialCommunity";
import { SpecialistServicePage } from "@/components/ui/specialist";
import { emailMarketingMeta } from "@/data/services/emailMarketing";
import { influencerPartnershipsMeta } from "@/data/services/influencerPartnerships";
import { prEarnedMediaMeta } from "@/data/services/prEarnedMedia";
import { paidMediaMeta } from "@/data/services/paidMedia";
import { seoVisibilityMeta } from "@/data/services/seoVisibility";
import { socialCommunityMeta } from "@/data/services/socialCommunity";
import { servicesData } from "@/data/services/servicesData";
import { specialistPages } from "@/data/services/specialist";
import { proofCopy } from "@/data/home";
import { pageMetadata, SITE_URL } from "@/data/site";
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
  const path = `/services/${slug}`;

  // 20 Nov 2026: Influencer & Partnerships uses the approved design page and
  // its own meta. Other specialist pages keep their config metadata.
  if (slug === "influencer_marketing") {
    return await pageMetadata({
      title: influencerPartnershipsMeta.title,
      description: influencerPartnershipsMeta.description,
      path
    });
  }

  // 20 Nov 2026: Social & Community locked design — preserve existing SEO meta.
  if (slug === "social_media_marketing") {
    return await pageMetadata({
      title: socialCommunityMeta.title,
      description: socialCommunityMeta.description,
      path
    });
  }

  // 23 Nov 2026: locked Email Marketing design — keep the existing route meta.
  if (slug === "email_marketing") {
    return await pageMetadata({
      title: emailMarketingMeta.title,
      description: emailMarketingMeta.description,
      path,
      keywords: emailMarketingMeta.keywords
    });
  }

  // 23 Nov 2026: locked SEO, Content & AI Visibility — keep specialist meta.
  if (slug === "seo_and_content_marketing") {
    return await pageMetadata({
      title: seoVisibilityMeta.title,
      description: seoVisibilityMeta.description,
      path
    });
  }

  // 23 Nov 2026: locked Paid Media & PPC — keep specialist meta.
  if (slug === "ads_ppc") {
    return await pageMetadata({
      title: paidMediaMeta.title,
      description: paidMediaMeta.description,
      path
    });
  }

  // 23 Nov 2026: locked PR & Earned Media design — keep the specialist meta.
  if (slug === "pr") {
    return await pageMetadata({
      title: prEarnedMediaMeta.title,
      description: prEarnedMediaMeta.description,
      path
    });
  }

  // 30 Sep 2026: a specialist page takes its title and description from its
  // own config. Share image defaults to `/opengraph-image` via pageMetadata;
  // pass ogImage when a page-specific asset is cleared for public use.
  const specialist = specialistPages[slug];
  if (specialist) {
    const { title, description } = specialist.meta;
    return await pageMetadata({ title, description, path });
  }

  return await pageMetadata({
    title: pageData?.metaTitle || "Services",
    description:
      pageData?.metaDescription || "Explore our professional services",
    path,
    keywords: pageData?.metaKeywords || "digital marketing services"
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // 20 Nov 2026: approved Influencer & Partnerships design replaces the
  // shared specialist template on this route only.
  if (slug === "influencer_marketing") {
    return <InfluencerPartnershipsPage />;
  }

  // 20 Nov 2026: locked Social & Community design replaces the shared
  // specialist template on this route only.
  if (slug === "social_media_marketing") {
    return <SocialCommunityPage />;
  }

  // 23 Nov 2026: locked SEO, Content & AI Visibility replaces the shared
  // specialist template on this route only.
  if (slug === "seo_and_content_marketing") {
    return <SeoVisibilityPage />;
  }

  // 23 Nov 2026: locked Paid Media & PPC replaces the shared specialist
  // template on this route only.
  if (slug === "ads_ppc") {
    return <PaidMediaPage />;
  }

  // 23 Nov 2026: locked PR & Earned Media design replaces the shared
  // specialist template on this route only.
  if (slug === "pr") {
    return <PrEarnedMediaPage />;
  }

  // 23 Nov 2026: locked Email Marketing design replaces the legacy template
  // on this route only. The hyphen alias still redirects here.
  if (slug === "email_marketing") {
    return <EmailMarketingPage />;
  }

  // 30 Sep 2026: the specialist service pages (the four Demand & Performance
  // routes, and Search & Authority's) render one shared structure from their
  // configs. The URL is unchanged; only the template beneath it is. The
  // legacy template below still serves the routes not yet migrated.
  const specialist = specialistPages[slug];
  if (specialist) return <SpecialistServicePage page={specialist} />;

  const pageData = servicesData.find(item => item.route === slug);
  const baseUrl = SITE_URL;

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
