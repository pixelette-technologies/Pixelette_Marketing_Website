import {
  HomeHero,
  GrowthSection,
  ItemsSection,
  DynamicMarket
} from "@/components/ui/home";
import {
  ContactSection,
  TeamSection,
  TrustedBrands
} from "@/components/common";
import { talkBusinessData } from "@/data";
import {
  aiTechnologyData,
  growthSystemData,
  growthProcessData,
  proofCopy,
  resultsCopy,
  waysToWorkData,
  whyPixeletteData,
  widerAdvantageData
} from "@/data/home";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Pixelette Marketing | Full-Service Digital Marketing Agency',
  description: 'Results you can measure. Growth you can scale. Our expert-led digital marketing services help brands in emerging industries win in competitive markets.',
  keywords: ['digital marketing agency', 'digital marketing services', 'digital marketing solutions'],
  alternates: {
    canonical: 'https://www.pixelettemarketing.com',
  },
  openGraph: {
    title: 'Pixelette Marketing | Full-Service Digital Marketing Agency',
    description: 'Results you can measure. Growth you can scale. Our expert-led digital marketing services help brands in emerging industries win in competitive markets.',
  },
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustedBrands
        layout='stacked'
        eyebrow={proofCopy.eyebrow}
        heading={proofCopy.heading}
        standfirst={proofCopy.standfirst}
        cta={proofCopy.cta}
      />
      <GrowthSection />
      <ItemsSection content={whyPixeletteData} topRule />
      <ItemsSection
        content={growthSystemData}
        ground='dark'
        grid='thirds'
        variant='card'
      />
      <ItemsSection content={aiTechnologyData} />
      <DynamicMarket />
      <TeamSection
        mainHeading={resultsCopy.eyebrow}
        subHeading={resultsCopy.heading}
        lead={resultsCopy.lead}
        cta={resultsCopy.cta}
      />
      <ItemsSection
        content={waysToWorkData}
        grid='thirds'
        variant='card'
      />
      <ItemsSection
        content={growthProcessData}
        ground='dark'
        variant='card'
      />
      <ItemsSection content={widerAdvantageData} topRule />
      <ContactSection
        heading={`let's <span> talk business <span/>`}
        data={talkBusinessData}
      />
    </>
  );
}
