import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/services/servicesData";

const baseUrl = "https://www.pixelettemarketing.com";

export const metadata: Metadata = {
  title: "Digital Marketing Services | Pixelette Marketing",
  description:
    "Explore Pixelette Marketing's full-service digital marketing offering — SEO, social media, paid ads, PR, email, influencer and lead generation for Fintech, SaaS, Web3 and technology brands.",
  keywords:
    "digital marketing services, marketing agency services, SEO services, social media marketing, PPC, PR, email marketing, lead generation",
  alternates: { canonical: `${baseUrl}/services` },
  openGraph: {
    title: "Digital Marketing Services | Pixelette Marketing",
    description:
      "Full-service digital marketing for emerging Fintech, SaaS, Web3 and technology brands.",
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
      "Full-service digital marketing for emerging Fintech, SaaS, Web3 and technology brands.",
    images: ["/services/heroImageServices.webp"],
    creator: "@pixelettemarketing"
  },
  robots: { index: true, follow: true }
};

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

      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 20px 80px" }}
      >
        <h1 style={{ fontSize: "2.5rem", lineHeight: 1.15, marginBottom: "1rem" }}>
          Digital Marketing Services
        </h1>
        <p style={{ maxWidth: 760, marginBottom: "3rem", opacity: 0.85 }}>
          Pixelette Marketing is a full-service digital marketing agency for
          emerging Fintech, SaaS, Web3 and technology brands. Explore our
          services below.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {servicesData.map(service => (
            <Link
              key={service.route}
              href={`/services/${service.route}`}
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
                {service.title}
              </h2>
              <p style={{ fontSize: "0.95rem", opacity: 0.8, margin: 0 }}>
                {service.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
