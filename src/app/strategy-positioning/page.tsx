import {
  DiagnosticSection,
  Methodology,
  StrategyHero
} from "@/components/ui/strategy";
import type { Metadata } from "next";

// /strategy-positioning — the Strategy & Positioning Diagnostic.
//
// WHY THIS ROUTE EXISTS. Strategy & Positioning is the first of the five
// approved capabilities and was the only one with nowhere to send anyone.
// navigation.ts and capabilityGroups.ts both carried the same note: a dropdown
// group or a link row with no destination is a dead label, so the pattern
// shipped without it, and it joins "when there is somewhere for it to point".
// This is that destination. It is linked from /services and from the home
// page's Growth System card; THE NAVIGATION IS STILL NOT TOUCHED, because the
// 11 Sep instruction that Strategy & Positioning takes no nav entry was
// management's and the brief that produced this page did not reverse it.
//
// THREE SECTIONS:
//
//   1. Hero — headline, two controls, no figure
//   2. Methodology — the six dimensions as a wave                  DARK
//   3. The diagnostic — twelve questions, a score and a reading
//
// IT WAS SEVEN. The definitive brief specified four more — what the engagement
// produces, an illustrative sample framework, a closing call to action and a
// four-question FAQ — and all four came off in one instruction on 22 Sep 2026.
// They are recoverable from 291592f.
//
// WHAT THAT LEAVES OPEN, and it is not cosmetic: the closing section was the
// page's only call to action for somebody who does NOT take the diagnostic,
// and its only link back to /services. The diagnostic's own "Talk through my
// results" survives but appears only after twelve answers, so a visitor who
// reads the page without starting the instrument now reaches the end of it
// with nowhere to go. Raised, not fixed — see [[09 Outstanding]].
//
// THE DARK BUDGET. _surfaces.scss allows three .band-dark per route and
// route-walk fails the build on a fourth. This page now spends ONE, on the
// methodology, and THE CENTREPIECE GETS NONE. The reasoning is in
// Methodology.tsx and is the same reasoning that had to be applied in reverse
// to the Growth System's cards on 11 Sep: a dark ground recolours prose and
// nothing else, and the diagnostic is a dozen containers, edges and controls
// that would each need their own answer.
//
// THE ONE SIGNATURE MARK is .card-feature on the diagnostic panel — the
// device's card form. There is no .rule-cap on this route; an earlier version
// put one on a rule that opened directly beneath the dark band, where it
// rendered as a loose crimson dash under black.
//
// WHAT IS CLIENT-SIDE, AND WHAT DELIBERATELY IS NOT. Only the diagnostic panel
// hydrates. The hero, the methodology band, the figure and the diagnostic's own
// heading and standfirst are server-rendered, so a crawler and a reader with
// JavaScript off both get the page's argument rather than an empty box.
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

      <StrategyHero />
      <Methodology />
      <DiagnosticSection />
    </>
  );
}
