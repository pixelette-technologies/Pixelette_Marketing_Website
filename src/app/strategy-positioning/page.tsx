import {
  DiagnosticClose,
  DiagnosticHero,
  DiagnosticMethod,
  StrategyDiagnostic
} from "@/components/ui/strategy";
import type { Metadata } from "next";

// /strategy-positioning — the Strategy & Positioning Diagnostic, 22 Sep 2026.
//
// WHY THIS ROUTE EXISTS. Strategy & Positioning is the first of the five
// approved capabilities and the only one with nowhere to send anyone.
// navigation.ts and capabilityGroups.ts both carry the same note: a dropdown
// group or a link row with no destination is a dead label, so the pattern
// shipped without it, and it joins "when there is somewhere for it to point".
// This is that destination. /services now links to it; the NAVIGATION IS NOT
// TOUCHED, because the 11 Sep instruction that Strategy & Positioning takes no
// nav entry was management's and is not mine to reverse. Worth putting back to
// them now that the premise has changed.
//
// FOUR SECTIONS, AND THE LIST IS CLOSED: hero, the six lenses, the diagnostic,
// the close. The page is meant to be visually led and short; a fifth section
// restating the lenses as "what happens next" was drafted and cut, because the
// reading inside the instrument already says what each lens turns into, in
// management's own capability words.
//
// THE DARK BUDGET. _surfaces.scss allows three .band-dark per route and
// route-walk fails the build on a fourth. This page spends ONE, on the method
// band, and the reasoning for not spending it on the centrepiece is in
// DiagnosticMethod.tsx — it is the same reasoning that had to be applied in
// reverse to the Growth System's cards on 11 Sep.
//
// THE ONE .rule-cap is on the diagnostic section's opening hairline.
//
// NOTHING ON THIS PAGE CLAIMS A RESULT. No logos, no testimonials, no customer
// counts, no percentages, no awards, and nothing described as AI. The one
// number rendered anywhere is the visitor's own answer read back to them. See
// the header of diagnosticContent.ts.

const baseUrl = "https://www.pixelettemarketing.com";

export const metadata: Metadata = {
  title: "Strategy & Positioning Diagnostic | Pixelette Marketing",
  description:
    "A structured way to diagnose market, customer, competition, positioning, messaging and growth priorities — and find which layer is holding growth back. Six questions, no sign-up.",
  keywords: [
    "marketing strategy",
    "brand positioning",
    "go to market strategy",
    "competitor analysis",
    "messaging strategy"
  ],
  alternates: { canonical: `${baseUrl}/strategy-positioning` },
  openGraph: {
    title: "Strategy & Positioning Diagnostic | Pixelette Marketing",
    description:
      "Six lenses — market, customer, competition, positioning, messaging and growth priorities. Work through them and see which layer is least resolved.",
    url: `${baseUrl}/strategy-positioning`,
    siteName: "Pixelette Marketing",
    type: "website"
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

      <DiagnosticHero />
      <DiagnosticMethod />
      <StrategyDiagnostic />
      <DiagnosticClose />
    </>
  );
}
