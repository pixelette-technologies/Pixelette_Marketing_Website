import type { Metadata } from "next";
import { headers } from "next/headers";
import { Caveat, IBM_Plex_Mono, Newsreader, Outfit } from "next/font/google";
import "../scss/main.scss";
import {
  CookieConsent,
  Footer,
  Navbar,
  ScrollReveal
} from "@/components/common";
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from "@/data/site";
import { isOfficialMarketingHost } from "@/lib/officialHost";

// The three type roles, self-hosted. This replaces two render-blocking
// @import url(...) lines in _base.scss that pulled four overlapping and
// partly duplicated families (Glory, Poppins, Open Sans, Tangerine).
// Self-hosting also lets the CSP drop fonts.googleapis.com and
// fonts.gstatic.com once nothing else reaches for them.
//
// Newsreader and Outfit are variable fonts, so no weight is declared — the
// full range ships and the display role is set to 400 in the stylesheet.
// IBM Plex Mono has static cuts only and must name its weights.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap"
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap"
});

// 28 Sep 2026: a fourth role, handwriting. The approved home page reference
// writes its Post-its, its two annotations and "Real growth builds here" by
// hand, and none of the three roles above can. Added on instruction as ONE
// face for all of it, and for those illustrative moments only: never a
// heading, body copy or UI. Variable, so no weight is declared.
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") ?? "";
  const allowIndex = isOfficialMarketingHost(host);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: "%s"
    },
    description:
      "Marketing and communications that deliver measurable impact for businesses, public-sector organisations and community organisations.",
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE_NAME,
      url: SITE_URL
    },
    twitter: {
      card: "summary_large_image",
      creator: TWITTER_HANDLE
    },
    robots: {
      index: allowIndex,
      follow: allowIndex
    }
  };
}

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      description:
        "Pixelette Marketing is one integrated marketing and communications agency. The same five capabilities serve businesses, public-sector organisations and community organisations.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@pixelettemarketing.com"
      },
      // Supplied by management, 22 Sep 2026. The registered office is the
      // address the footer states; before this the graph carried a different
      // one (71-75 Shelton Street) that agreed with nothing else in the repo.
      address: {
        "@type": "PostalAddress",
        streetAddress: "77 Fulham Palace Road",
        addressLocality: "London",
        postalCode: "W6 8JA",
        addressCountry: "GB"
      },
      // VAT omitted until management confirms Marketing Ltd holds GB 432 2377 17
      // (same number publishes on Pixelette Technologies' site — see privacy comments).
      identifier: {
        "@type": "PropertyValue",
        name: "Companies House company number",
        value: "17508478"
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` }
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/favicon.png`,
      telephone: "+44 2045188226",
      email: "sales@pixelettemarketing.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "77 Fulham Palace Road",
        addressLocality: "London",
        postalCode: "W6 8JA",
        addressCountry: "GB"
      },
      areaServed: "GB",
      priceRange: "£££",
      parentOrganization: { "@id": `${SITE_URL}/#organization` }
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior: Next 16 no longer switches smooth scrolling off
    // while it resets the scroll on a page change unless this attribute is
    // present. Without it every link click became an animated scroll from the
    // previous page's position, measured by Next before it had moved.
    <html
      lang='en-GB'
      data-scroll-behavior='smooth'
      className={`${newsreader.variable} ${outfit.variable} ${plexMono.variable} ${caveat.variable}`}
    >
      <head>
        <link rel='icon' href='/favicon.png' />
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
        <Navbar />
        {/* .page-flow is the scroll reveal's only structural dependency: a
            page is a list of blocks and these are them. See ScrollReveal and
            _reveal.scss. The class carries no styling of its own. */}
        <div className='page-flow'>{children}</div>
        <Footer />
        <ScrollReveal />
        <CookieConsent />
        {/* Ask Pix M unmounted for the 12 Nov 2026 mock-up. Code remains in
            src/agent/. */}
      </body>
    </html>
  );
}
