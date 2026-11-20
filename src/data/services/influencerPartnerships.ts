// Approved Influencer & Partnerships design (20 Nov 2026).
// Source of truth: final approved mock attached to the implementation brief.
// Imagery recovered from that mock into /public/services/influencer-partnerships/.

export const influencerPartnershipsMeta = {
  title: "Influencer & Partnerships | Influencer Marketing | Pixelette Marketing",
  description:
    "Connect with the right creators and partners to build awareness, credibility and measurable growth."
};

export const influencerPartnershipsContent = {
  hero: {
    eyebrow: "Influencer & Partnerships",
    headingLead: "Real voices.",
    headingAccent: "Stronger brands.",
    lead: "Connect with the right creators and partners to build awareness, credibility and measurable growth.",
    cta: { label: "Discuss Your Campaign", href: "/contactus" },
    annotation: ["Creators", "Content", "Community"],
    image: {
      src: "/services/influencer-partnerships/hero.jpg",
      alt: "Creators filming and reviewing content in an urban setting"
    }
  },
  deliver: {
    heading: "What we deliver",
    intro:
      "End-to-end influencer and partnership support, from strategy and creator sourcing to campaign delivery and performance insight.",
    items: [
      {
        title: "Creator & partner sourcing",
        body: "Identify and engage the right creators and partners who align with your brand and values.",
        image: {
          src: "/services/influencer-partnerships/deliver-sourcing.jpg",
          alt: "Creator filming a partner on a camera set"
        },
        icon: "people" as const
      },
      {
        title: "Campaign strategy & management",
        body: "Plan, coordinate and deliver campaigns end to end, from briefing to content deployment.",
        image: {
          src: "/services/influencer-partnerships/deliver-strategy.jpg",
          alt: "Smartphone showing a creator speaking to camera"
        },
        icon: "megaphone" as const
      },
      {
        title: "Content collaboration",
        body: "Work with creators to produce authentic, high-quality content that captures attention and builds trust.",
        image: {
          src: "/services/influencer-partnerships/deliver-content.jpg",
          alt: "Creator reviewing content on a phone under studio lights"
        },
        icon: "clapper" as const
      },
      {
        title: "Performance & insight",
        body: "Track results and turn engagement into meaningful insights and business growth.",
        image: {
          src: "/services/influencer-partnerships/deliver-performance.jpg",
          alt: "Laptop showing campaign analytics dashboards"
        },
        icon: "chart" as const
      },
      {
        title: "Brand amplification",
        body: "Extend your reach through multi-channel distribution and strategic partnerships.",
        image: {
          src: "/services/influencer-partnerships/deliver-amplification.jpg",
          alt: "Collage of creator content across devices"
        },
        icon: "star" as const
      }
    ]
  },
  close: {
    headingLead: "Let's build your",
    headingAccent: "next campaign.",
    cta: { label: "Discuss Your Project", href: "/contactus" },
    image: {
      src: "/services/influencer-partnerships/close.jpg",
      alt: "Camera on a content set lit with magenta studio light"
    }
  }
};
