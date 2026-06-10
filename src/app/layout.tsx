import type { Metadata } from "next";
import "../scss/main.scss";
import { AnimationsLayout, CookieConsent, Footer, Navbar } from "@/components/common";

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
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.pixelettemarketing.com/#localbusiness",
      name: "Pixelette Marketing",
      url: "https://www.pixelettemarketing.com",
      image: "https://www.pixelettemarketing.com/favicon.svg",
      telephone: "+44 2045188226",
      email: "sales@pixelettemarketing.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "71-75 Shelton Street",
        addressLocality: "London",
        postalCode: "WC2H 9JQ",
        addressCountry: "GB"
      },
      areaServed: "GB",
      priceRange: "$$$",
      parentOrganization: { "@id": "https://www.pixelettemarketing.com/#organization" }
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
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try { if (localStorage.getItem('pmw-consent') === 'granted') { gtag('consent', 'update', { analytics_storage: 'granted' }); } } catch (e) {}
gtag('js', new Date());
gtag('config', 'G-1HGJEBFGRW');`}
        </Script>
        <AnimationsLayout>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </AnimationsLayout>
        <CookieConsent />
      </body>
    </html>
  );
}
