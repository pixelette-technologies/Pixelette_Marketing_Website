import type { Metadata } from "next";
import "../scss/main.scss";
import { AnimationsLayout, Footer, Navbar } from "@/components/common";

export const metadata: Metadata = {
  title: "Pixelette Marketing",
  description: "Pixelette Marketing Website"
};

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.pixelettemarketing.com/#organization",
      name: "Pixelette Marketing",
      url: "https://www.pixelettemarketing.com",
      logo: "https://www.pixelettemarketing.com/favicon.svg",
      description:
        "Full-service digital marketing agency delivering precision-driven marketing for Fintech, SaaS, Web3 and technology brands.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@pixelettemarketing.com"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.pixelettemarketing.com/#website",
      name: "Pixelette Marketing",
      url: "https://www.pixelettemarketing.com",
      publisher: { "@id": "https://www.pixelettemarketing.com/#organization" }
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.svg' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <AnimationsLayout>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </AnimationsLayout>
      </body>
    </html>
  );
}
