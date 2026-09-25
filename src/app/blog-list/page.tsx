import { BlogDataDisplay, BlogHeroSection } from "@/components/ui/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | Pixelette Marketing",
  description:
    "Practical thinking on growth, marketing and the markets changing both, from the Pixelette Marketing team.",
  alternates: { canonical: "https://www.pixelettemarketing.com/blog-list" },
  openGraph: {
    title: "Insights | Pixelette Marketing",
    description:
      "Practical thinking on growth, marketing and the markets changing both, from the Pixelette Marketing team.",
    url: "https://www.pixelettemarketing.com/blog-list",
    type: "website"
  }
};

export default function Page() {
  return (
    <>
      <BlogHeroSection />
      <BlogDataDisplay />
    </>
  );
}
