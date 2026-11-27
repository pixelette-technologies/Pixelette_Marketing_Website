import { StrategyExperience } from "@/components/ui/strategy";
import { pageMetadata, SITE_URL } from "@/data/site";

// /strategy-positioning — Impact Compass diagnostic (Option 3, 20 Nov 2026).
//
// One seamless experience: intro with coded six-point compass → twelve
// answer-tile questions → results dashboard (radar, scores, roadmap).
// Scoring is unchanged: src/lib/strategyDiagnostic.ts + diagnosticQuestions.
// No registration. Preview-only deploys until production is asked for.
//
// NOTHING ON THIS PAGE CLAIMS A RESULT. The only numbers rendered are
// computed from the visitor's twelve answers.

export async function generateMetadata() {
  return await pageMetadata({
    title: "Impact Compass — Strategy & Positioning Diagnostic",
    description:
      "Find your next move. A short marketing diagnostic across six focus areas — market, audience, competition, positioning, messaging and growth — with an instant clarity compass and actionable roadmap.",
    path: "/strategy-positioning",
    keywords: [
      "marketing strategy",
      "brand positioning",
      "positioning diagnostic",
      "impact compass",
      "go to market strategy",
      "competitor analysis",
      "messaging strategy"
    ]
  });
}

export default function StrategyPositioningPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/services`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Impact Compass Diagnostic",
        item: `${SITE_URL}/strategy-positioning`
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
