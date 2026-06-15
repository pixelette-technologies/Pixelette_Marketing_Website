import { ContactClose } from "@/components/ui/redesign";
import Reveal from "@/components/ui/redesign/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start the Conversation | Pixelette Marketing",
  description:
    "Book a focused growth strategy call with Pixelette Marketing. We will pressure-test your growth model and tell you honestly whether we are the right partner.",
  keywords: ["contact pixelette marketing", "growth strategy call", "retained marketing agency"],
  alternates: {
    canonical: "https://www.pixelettemarketing.com/contactus"
  },
  openGraph: {
    type: "website",
    url: "https://www.pixelettemarketing.com/contactus",
    siteName: "Pixelette Marketing",
    title: "Start the Conversation | Pixelette Marketing",
    description:
      "Book a focused growth strategy call. We will pressure-test your growth model and tell you honestly whether we are the right partner.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pixelette Marketing, premium retained growth partner"
      }
    ]
  }
};

export default function ContactUs() {
  return (
    <>
      <section className="pmSection pmSection--dark pmContactHero">
        <Reveal className="pmWrap">
          <p className="pmEyebrow">Contact</p>
          <h1 className="pmH2 pmContactHero__title">
            Start the <em>conversation.</em>
          </h1>
          <p className="pmLead">
            A focused first call to pressure-test your growth model and show you
            where compounding could begin. No pitch theatre, no obligation.
          </p>
        </Reveal>
      </section>

      <ContactClose />
    </>
  );
}
