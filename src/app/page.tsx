import { HomeHeroGOS } from "@/components/ui/home";
import {
  OperatingSystem,
  Capabilities,
  Sectors,
  Approach,
  CtaBand,
  MarqueeBand,
  Faqs,
  ContactClose
} from "@/components/ui/redesign";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pixelette Marketing | Premium Retained Growth Partner',
  description: 'A premium retained growth partner for ambitious technology, commerce and Web3 brands. Strategy, demand and proof run as one operating system.',
  keywords: ['retained marketing agency', 'growth marketing partner', 'b2b technology marketing'],
  alternates: {
    canonical: 'https://pixelettemarketing.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.pixelettemarketing.com',
    siteName: 'Pixelette Marketing',
    title: 'Pixelette Marketing | Premium Retained Growth Partner',
    description: 'A premium retained growth partner for ambitious technology, commerce and Web3 brands. Strategy, demand and proof run as one operating system.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pixelette Marketing, premium retained growth partner'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixelette Marketing | Premium Retained Growth Partner',
    description: 'A premium retained growth partner for ambitious technology, commerce and Web3 brands.',
    images: ['/og-image.png'],
  },
}

export default function Home() {
  return (
    <>
      <HomeHeroGOS />
      <OperatingSystem />
      <Capabilities />
      <MarqueeBand />
      <Sectors />
      <Approach />
      <Faqs />
      <CtaBand />
      <ContactClose />
    </>
  );
}
