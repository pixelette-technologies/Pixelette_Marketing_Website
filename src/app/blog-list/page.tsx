import { BlogDataDisplay, BlogHeroSection } from "@/components/ui/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Pixelette Marketing",
  description:
    "Marketing insights, guides and trends from the Pixelette Marketing team, with a focus on technology-led markets.",
  alternates: { canonical: "https://www.pixelettemarketing.com/blog-list" },
  openGraph: {
    title: "Blog | Pixelette Marketing",
    description:
      "Marketing insights, guides and trends from the Pixelette Marketing team, with a focus on technology-led markets.",
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
