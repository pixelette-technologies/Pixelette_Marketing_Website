import { TrustedBrands } from "@/components/common";
import {
  AboutClose,
  AboutIdentity,
  AboutUsHero,
  CapabilityModel,
  Principles
} from "@/components/ui/aboutUs";
import { aboutExperience } from "@/data/aboutus";
import type { Metadata } from "next";

// The About page, rebuilt 21 September 2026.
//
// SIX SECTIONS, AND THE LIST IS CLOSED: hero, who we are / how we work, the
// capability model, the principles, selected experience, close. Four sections
// came off it — the founding story, the values cards, the industries grid and
// the team — and three of those four were removed for what they claimed
// rather than for their length. The team section in particular presented five
// people with names and job titles who cannot be substantiated.
//
// The industries grid is not replaced. Those six cards are the whole of
// /industries and its eight children, and carrying them here made this page
// longer without telling a visitor anything the navigation does not.
//
// THE DARK BUDGET. _surfaces.scss allows three .band-dark per route and
// route-walk fails the build on a fourth. This page spends two: the capability
// model, which is the section a buyer is here to understand, and the logo
// strip, which has no choice — every logo in it is knockout white. The close
// is light, so the page ends on the page's own ground rather than on a third
// slab.
//
// THE ONE .rule-cap is on AboutIdentity, the first section after the hero.

export const metadata: Metadata = {
  title: "About | Pixelette Marketing",
  description:
    "Pixelette Marketing brings strategy, creative thinking, technology and performance together to help ambitious businesses turn attention into commercial outcomes.",
  keywords: ["digital marketing solutions", "digital marketing agency"],
  alternates: {
    canonical: "https://www.pixelettemarketing.com/aboutus"
  },
  openGraph: {
    title: "About | Pixelette Marketing",
    description:
      "Pixelette Marketing brings strategy, creative thinking, technology and performance together to help ambitious businesses turn attention into commercial outcomes."
  }
};

export default function AboutUs() {
  return (
    <>
      <AboutUsHero />
      <AboutIdentity />
      <CapabilityModel />
      <Principles />
      {/* The shared strip, in its stacked layout — the one that can hold a
          sentence above the logos. The claim is this page's own and is
          deliberately weaker than the home page's "Trusted by": the set
          includes portfolio ventures and group work, so the wording says
          ecosystem and stops short of saying Pixelette Marketing delivered to
          every brand shown.

          NO `cta`. The close is directly beneath it and a second call to
          action 200px above the first is two asks, not one. */}
      <TrustedBrands
        layout='stacked'
        eyebrow={aboutExperience.eyebrow}
        heading={aboutExperience.heading}
        standfirst={aboutExperience.standfirst}
      />
      <AboutClose />
    </>
  );
}
