import {
  BriefingCta,
  FeaturedThinking,
  InsightsHero,
  LatestThinking,
  TryTheThinking
} from "@/components/ui/blog";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
  title: "Insights",
  description:
    "Points of view, practical playbooks and tools for making better marketing decisions, from the Pixelette Marketing team.",
  path: "/blog-list"
});
}

export default function BlogListPage() {
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
