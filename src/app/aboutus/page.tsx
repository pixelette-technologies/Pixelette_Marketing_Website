import {
  AboutBuilt,
  AboutClose,
  AboutGroup,
  AboutUsHero,
  AboutWhy,
  Principles
} from "@/components/ui/aboutUs";
import type { Metadata } from "next";

// The About page, rebuilt 30 September 2026 to the final About page brief,
// which supersedes every earlier About instruction (including the 21 Sep
// rebuild this replaces).
//
// SIX SECTIONS, LOCKED: hero, why we exist, how we're built, what guides the
// work, part of the wider Pixelette Group, close. Nothing else. The page
// answers three questions — why Pixelette Marketing exists, how it differs
// from a channel-led agency, what working with it is like — and leaves the
// five capabilities to /services, which owns them.
//
// OFF THE PAGE: the who-we-are / how-we-work pair, the five-capability model
// (the page's dark band) and the "Experience across the Pixelette ecosystem"
// logo strip. The strip's copy still lives in aboutContent.ts because the home
// page reads it; nothing here does.
//
// No team, no people, no imagery. The one interaction is the How we're built
// flow, which runs once. The one .rule-cap is on AboutWhy. No .band-dark.

export const metadata: Metadata = {
  title: "About | Pixelette Marketing",
  description:
    "Pixelette Marketing brings strategy, creative thinking, technology and performance together around the commercial problem in front of us.",
  keywords: ["digital marketing solutions", "digital marketing agency"],
  alternates: {
    canonical: "https://www.pixelettemarketing.com/aboutus"
  },
  openGraph: {
    title: "About | Pixelette Marketing",
    description:
      "Pixelette Marketing brings strategy, creative thinking, technology and performance together around the commercial problem in front of us."
  }
};

export default function AboutUs() {
  return (
    <>
      <AboutUsHero />
      <AboutWhy />
      <AboutBuilt />
      <Principles />
      <AboutGroup />
      <AboutClose />
    </>
  );
}
