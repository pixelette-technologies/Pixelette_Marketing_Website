import { StrategyExperience } from "@/components/ui/strategy";
import type { Metadata } from "next";

// /strategy-positioning — the Strategy & Positioning Diagnostic.
//
// WHY THIS ROUTE EXISTS. Strategy & Positioning is the first of the five
// approved capabilities and was the only one with nowhere to send anyone.
// It is linked from /services, the What we do menu and the footer.
//
// BUILT TO THE FINAL DIAGNOSTIC BRIEF, 30 Sep 2026, which supersedes every
// earlier redesign of this page. The diagnostic IS the visual centrepiece:
// no hero art, no Clarity Stack, no signal lines, no generated imagery.
//
//   1. Hero — two lines of equal authority, facts, two controls
//   2. Clarity before activity — a third-of-a-screen bridge, six names
//   3. The diagnostic — one question at a time on the Clarity Rail, a
//      halfway moment, then the result revealed in sequence
//   4. A score is only the starting point — burgundy, after the result only
//
// All four are ONE client component, StrategyExperience, because "Start the
// diagnostic" transforms the page in place: the hero compacts, the bridge
// folds and Question 1 takes the primary position, with no reload. It still
// server-renders; see the header of StrategyExperience.tsx.
//
// The dark methodology band, the six-dimension wave and its hover ripple
// came off on 30 Sep. This route now spends NO .band-dark.
//
// STILL OPEN from 22 Sep: a visitor who never starts the diagnostic has no
// call to action at the foot of the page. See [[09 Outstanding]].
//
// NOTHING ON THIS PAGE CLAIMS A RESULT. No clients, logos, testimonials,
// customer counts, percentages, research or awards, and the diagnostic is
// never described as validated, predictive, proprietary or AI-powered, because
// it is none of those. The only numbers rendered anywhere are computed from
// the visitor's own twelve answers. See diagnosticContent.ts.

const baseUrl = "https://www.pixelettemarketing.com";

const title = "Strategy & Positioning Diagnostic | Pixelette Marketing";
const description =
  "Assess your market, audience, differentiation, positioning, messaging and growth priorities with Pixelette Marketing's interactive Strategy & Positioning Diagnostic.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "marketing strategy",
    "brand positioning",
    "positioning diagnostic",
    "go to market strategy",
    "competitor analysis",
    "messaging strategy"
  ],
  alternates: { canonical: `${baseUrl}/strategy-positioning` },
  openGraph: {
    title,
    description,
    url: `${baseUrl}/strategy-positioning`,
    siteName: "Pixelette Marketing",
    type: "website"
  },
  twitter: {
    card: "summary",
    title,
    description
  },
  robots: { index: true, follow: true }
};

export default function StrategyPositioningPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${baseUrl}/services`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy & Positioning Diagnostic",
        item: `${baseUrl}/strategy-positioning`
      }
    ]
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <StrategyExperience />
    </>
  );
}
