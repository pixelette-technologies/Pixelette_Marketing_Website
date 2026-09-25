import { ContactUsHero, HowItWork } from "@/components/ui/contactUs";
import type { Metadata } from "next";

const description =
  "Tell us what needs to grow. Give us enough context to make the first conversation useful, and we will come back with the most relevant next step.";

export const metadata: Metadata = {
  title: "Start the Conversation | Pixelette Marketing",
  description,
  keywords: ["growth marketing", "digital marketing agency"],
  alternates: {
    canonical: "https://www.pixelettemarketing.com/contactus"
  },
  openGraph: {
    title: "Start the Conversation | Pixelette Marketing",
    description,
    url: "https://www.pixelettemarketing.com/contactus",
    siteName: "Pixelette Marketing",
    type: "website"
  }
};

export default function ContactUs() {
  return (
    <>
      <ContactUsHero />
      <HowItWork />
    </>
  );
}
