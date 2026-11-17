import {
  AboutBuilt,
  AboutClose,
  AboutGroup,
  AboutUsHero,
  AboutWhy,
  Principles
} from "@/components/ui/aboutUs";
import AboutBriefBlocks from "@/components/ui/aboutUs/AboutBriefBlocks";
import { pageMetadata } from "@/data/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Built around the challenge, not the channel. Pixelette Marketing brings strategy, creative thinking, technology and performance together around the commercial problem in front of us.",
  path: "/about",
  keywords: ["about Pixelette Marketing", "growth marketing agency", "commercial marketing"]
});

export default function AboutPage() {
  return (
    <>
      <AboutUsHero />
      <AboutWhy />
      <AboutBuilt />
      <Principles />
      <AboutBriefBlocks />
      <AboutGroup />
      <AboutClose />
    </>
  );
}
