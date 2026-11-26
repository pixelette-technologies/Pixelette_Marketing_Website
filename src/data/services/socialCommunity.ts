// Social & Community — locked design (20 Nov 2026).
// Source: PIXELETTE_SOCIAL_COMMUNITY_LOCKED_HANDOFF_20NOV2026.
// Imagery recovered from the locked hero composite + approved lower mock;
// Manchester plate is the user-supplied St Peter's Square photograph.
// Rights for that photograph are unverified — review-only until cleared.

export const socialCommunityMeta = {
  title: "Social & Community | Social Media Marketing | Pixelette Marketing",
  description:
    "Social media strategy, content and community management designed to turn social attention into meaningful audience growth, learning and demand."
};

export const socialCommunityContent = {
  hero: {
    breadcrumb: "Communications & Engagement / Social & Community",
    headingLead: "Build a social presence people actually want to",
    headingEmphasis: "participate in.",
    lead: "Strategy, content and community management designed to turn social attention into meaningful audience growth, learning and demand.",
    cta: { label: "Discuss Your Project", href: "/contactus" },
    campaign: {
      eyebrow: "THE CITY WE SHARE",
      question: "What's one thing that would make your city feel more connected?",
      location: "MANCHESTER / CAMPAIGN CONCEPT",
      disclaimer: "Illustrative conversation — not real comments",
      responses: [
        { initial: "A", name: "Alex", text: "More welcoming places to meet." },
        {
          initial: "J",
          name: "Jordan",
          text: "Neighbourhood events that bring us together."
        },
        {
          initial: "S",
          name: "Sam",
          text: "Safer spaces where everyone belongs."
        }
      ]
    },
    image: {
      src: "/services/social-community/hero-campaign.jpg",
      alt: "Illustrative campaign concept set in Manchester St Peter's Square — composite artwork, not a documentary photograph of the people shown"
    }
  },
  deliver: {
    heading: "What we deliver",
    items: [
      {
        title: "Social strategy & planning",
        body: "Clear channel strategy, audience focus and content that aligns with your objectives.",
        icon: "target" as const
      },
      {
        title: "Content & publishing",
        body: "High-quality, multi-format content — from short videos to carousels and thought leadership.",
        icon: "play" as const
      },
      {
        title: "Community management",
        body: "Active engagement, moderation and authentic conversations that build loyal communities.",
        icon: "people" as const
      },
      {
        title: "Social listening & optimisation",
        body: "Track conversations, spot opportunities and continually improve performance.",
        icon: "chart" as const
      }
    ]
  },
  community: {
    heading: "From content to community",
    lead: "A practical view of how we create, publish and build engagement across social channels.",
    points: [
      "Short-form video & reels",
      "Campaign content & series",
      "Community engagement",
      "Always-on optimisation"
    ],
    showcase: {
      captionLead: "Audience-led",
      captionRest: " content that builds communities",
      primary: {
        src: "/services/social-community/showcase-audience.jpg",
        alt: "Illustrative portrait of a creator speaking into a microphone"
      },
      reels: {
        src: "/services/social-community/showcase-reels.jpg",
        alt: "Illustrative short-form video still of green urban architecture"
      }
    }
  },
  measure: {
    heading: "What we measure",
    lead: "Focus on the metrics that show real audience interest and business impact.",
    items: [
      { label: "Audience growth", icon: "growth" as const },
      { label: "Engagement quality", icon: "heart" as const },
      { label: "Community participation", icon: "chat" as const },
      { label: "Website traffic", icon: "cursor" as const },
      { label: "Content performance", icon: "bars" as const },
      { label: "Demand signals", icon: "target" as const }
    ]
  },
  close: {
    heading: "Let's build an engaged community for your brand",
    lead: "From strategy to daily engagement, we'll help you create a social presence that drives awareness, trust and business growth.",
    cta: { label: "Discuss Your Project", href: "/contactus" }
  }
};
