import { ContactUsHero, HowItWork, Located } from "@/components/ui/contactUs";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Start the Conversation | Pixelette Marketing',
  description: 'Got a project in mind? Get in touch and let’s plan a digital marketing strategy that fits your goals. Pixelette Marketing is ready when you are.',
  keywords: ['digital marketing strategy', 'digital marketing agency'],
  alternates: {
    canonical: 'https://pixelettemarketing.com/contactus',
  },
  openGraph: {
    title: 'Start the Conversation | Pixelette Marketing',
    description: 'Got a project in mind? Get in touch and let’s plan a digital marketing strategy that fits your goals. Pixelette Marketing is ready when you are.',
  },
}
export default function ContactUs() {
  return (
    <>
      <ContactUsHero />
      <HowItWork />
      <Located />
    </>
  );
}
