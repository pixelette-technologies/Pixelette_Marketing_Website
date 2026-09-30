import {
  BriefingCta,
  FeaturedThinking,
  InsightsHero,
  LatestThinking,
  TryTheThinking
} from "@/components/ui/blog";
import type { Metadata } from "next";

// 30 Sep 2026, THE FINAL INSIGHTS BRIEF. The route stays /blog-list. The page
// is a shop window for the thinking rather than an archive, in this order and
// nothing else:
//
//   01 Hero               Thinking you can use
//   02 Featured thinking  Your buyers are asking an AI, not a search engine
//   03 On our radar       three short signals, beside Featured on desktop
//   04 Try the thinking   the live diagnostic, the spend check coming next
//   05 Latest thinking    capability filters over a curated grid
//   06 The briefing       a weekly cadence, and a placeholder CTA
//   07 Footer
//
// Built for a weekly cadence and five pieces: nothing here gets thinner when
// the article count is small, and nothing promises daily publishing.

const description =
  "Points of view, practical playbooks and tools for making better marketing decisions, from the Pixelette Marketing team.";

export const metadata: Metadata = {
  title: "Insights | Pixelette Marketing",
  description,
  alternates: { canonical: "https://www.pixelettemarketing.com/blog-list" },
  openGraph: {
    title: "Insights | Pixelette Marketing",
    description,
    url: "https://www.pixelettemarketing.com/blog-list",
    type: "website"
  }
};

export default function Page() {
  return (
    <>
      <InsightsHero />
      <FeaturedThinking />
      <TryTheThinking />
      <LatestThinking />
      <BriefingCta />
    </>
  );
}
