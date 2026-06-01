import {
  StoriesDataDisplay,
  StoriesHeroSection
} from "@/components/ui/stories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories | Pixelette Marketing",
  description:
    "Real results and case studies from Pixelette Marketing's work with Fintech, SaaS, Web3 and technology clients.",
  alternates: { canonical: "https://www.pixelettemarketing.com/success_stories" },
  openGraph: {
    title: "Success Stories | Pixelette Marketing",
    description:
      "Real results and case studies from Pixelette Marketing's work with Fintech, SaaS, Web3 and technology clients.",
    url: "https://www.pixelettemarketing.com/success_stories",
    type: "website"
  }
};

export default function SuccessStories() {
  return (
    <div className=''>
      <StoriesHeroSection />
      <StoriesDataDisplay />
    </div>
  );
}
