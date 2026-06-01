import { BlogDataDisplay, BlogHeroSection } from "@/components/ui/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Pixelette Marketing",
  description:
    "Marketing insights, guides and trends for Fintech, SaaS, Web3 and technology brands from the Pixelette Marketing team.",
  alternates: { canonical: "https://www.pixelettemarketing.com/blog-list" }
};

export default function Page() {
  return (
    <>
      <BlogHeroSection />
      <BlogDataDisplay />
    </>
  );
}
