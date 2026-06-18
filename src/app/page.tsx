import type { Metadata } from "next";
import {
  EdHero,
  EdThesis,
  EdCapabilities,
  EdApproach,
  EdWhy,
  EdProof,
  EdContact
} from "@/components/ui/editorial";

export const metadata: Metadata = {
  title: "Pixelette Marketing | Premium Retained Growth Partner",
  description:
    "A retained growth partner for ambitious technology, commerce and Web3 brands. One senior team running strategy, demand and proof as a single compounding system.",
  keywords: [
    "retained marketing agency",
    "growth marketing partner",
    "B2B marketing agency",
    "Web3 marketing agency"
  ],
  alternates: {
    canonical: "https://www.pixelettemarketing.com"
  },
  openGraph: {
    title: "Pixelette Marketing | Premium Retained Growth Partner",
    description:
      "A retained growth partner for ambitious technology, commerce and Web3 brands. Strategy, demand and proof, run as one compounding system."
  }
};

export default function Home() {
  return (
    <main className="edMain">
      <EdHero />
      <EdThesis />
      <EdCapabilities />
      <EdApproach />
      <EdWhy />
      <EdProof />
      <EdContact />
    </main>
  );
}
