import type { Metadata } from "next";
import Link from "next/link";
import { industriesData } from "@/data/industries/industriesData";

const baseUrl = "https://www.pixelettemarketing.com";

export const metadata: Metadata = {
  title: "Industries We Serve | Pixelette Marketing",
  description:
    "Specialist digital marketing for the industries we know best — Web3, Fintech, SaaS, AI and technology. See how Pixelette Marketing drives growth in your sector.",
  keywords:
    "web3 marketing, fintech marketing, saas marketing, ai marketing, technology marketing agency",
  alternates: { canonical: `${baseUrl}/industries` },
  openGraph: {
    title: "Industries We Serve | Pixelette Marketing",
    description:
      "Specialist digital marketing for Web3, Fintech, SaaS, AI and technology brands.",
    url: `${baseUrl}/industries`,
    siteName: "Pixelette Marketing",
    type: "website",
    images: [
      {
        url: "/industries/industriesHero.webp",
        width: 1200,
        height: 630,
        alt: "Industries Pixelette Marketing serves"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Pixelette Marketing",
    description:
      "Specialist digital marketing for Web3, Fintech, SaaS, AI and technology brands.",
    images: ["/industries/industriesHero.webp"],
    creator: "@pixelettemarketing"
  },
  robots: { index: true, follow: true }
};

export default function IndustriesIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${baseUrl}/industries` }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Industries We Serve",
    itemListElement: industriesData.map((industry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: industry.title,
      url: `${baseUrl}/industries/${industry.route}`
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

      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 20px 80px" }}
      >
        <h1 style={{ fontSize: "2.5rem", lineHeight: 1.15, marginBottom: "1rem" }}>
          Industries We Serve
        </h1>
        <p style={{ maxWidth: 760, marginBottom: "3rem", opacity: 0.85 }}>
          We partner with brands across the sectors we understand best. Explore
          how Pixelette Marketing delivers sector-specific growth below.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {industriesData.map(industry => (
            <Link
              key={industry.route}
              href={`/industries/${industry.route}`}
              style={{
                display: "block",
                padding: "1.5rem",
                border: "1px solid rgba(128,128,128,0.3)",
                borderRadius: 12,
                textDecoration: "none",
                color: "inherit"
              }}
            >
              <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                {industry.title}
              </h2>
              <p style={{ fontSize: "0.95rem", opacity: 0.8, margin: 0 }}>
                {industry.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
