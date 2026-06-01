import type { Metadata } from "next";
import "../scss/main.scss";
import { AnimationsLayout, Footer, Navbar } from "@/components/common";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pixelettemarketing.com"),
  title: "Pixelette Marketing",
  description: "Pixelette Marketing Website"
};

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import Script from "next/script";

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
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-1HGJEBFGRW'
          strategy='afterInteractive'
        />
        <Script id='ga4' strategy='afterInteractive'>
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1HGJEBFGRW');`}
        </Script>
        <AnimationsLayout>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </AnimationsLayout>
      </body>
    </html>
  );
}
