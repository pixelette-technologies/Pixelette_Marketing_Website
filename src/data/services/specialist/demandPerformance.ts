import type { SpecialistPageConfig } from "./types";

// THE FOUR DEMAND & PERFORMANCE SPECIALIST PAGES (30 Sep 2026).
//
// Every visible word below is the brief's, verbatim: the hero, the three
// situations, the four service groups, the measures, the three connections,
// what good looks like and the FAQs. Only the meta titles and descriptions
// were written here, because the brief asks for them to be updated without
// supplying them.
//
// WHAT CAME OFF, and why none of it was carried over: the legacy pages held
// fifteen to twenty-five service cards each, a platform list, a "we manage,
// you grow" band, a repeated testimonial, the ecosystem logo strip and a
// second FAQ set of generic questions. The brief retires every one of those
// patterns. The one piece of search intent worth keeping, which platforms paid
// media runs on, is in the Paid Media meta description rather than in a list
// on the page, and the FAQ that answers it is the brief's.

export const socialAndCommunity: SpecialistPageConfig = {
  route: "social-media-marketing",
  capability: "Communications and Engagement",
  label: "Social & Community",
  meta: {
    title: "Social & Community | Social Media Marketing | Pixelette Marketing",
    description:
      "Social media strategy, content and community management designed to turn social attention into meaningful audience growth, learning and demand."
  },
  hero: {
    heading: "Build a social presence people actually want to participate in",
    lead: "Strategy, content and community management designed to turn social attention into meaningful audience growth, learning and demand."
  },
  earnsItsPlace: {
    heading: "Use social when participation matters — not just posting",
    intro:
      "Social earns its place when the audience, conversation and learning are commercially useful.",
    items: [
      {
        title: "You need an audience, not just followers",
        body: "Build a relevant community around the problems and interests that matter to your market."
      },
      {
        title: "Content is active but inconsistent",
        body: "Create a clearer channel role, publishing rhythm and creative direction."
      },
      {
        title: "You are not learning from the community",
        body: "Turn conversation, response and social listening into usable market intelligence."
      }
    ]
  },
  services: {
    items: [
      {
        title: "Strategy & channel planning",
        body: "Define the role of each channel, its audience, its content priorities and what success should mean."
      },
      {
        title: "Content & publishing",
        body: "Create a coherent publishing system rather than a stream of unrelated posts."
      },
      {
        title: "Community management & growth",
        body: "Build participation, respond intelligently and grow an audience that is relevant to the business."
      },
      {
        title: "Listening & optimisation",
        body: "Use response patterns and channel signals to improve content, community and wider marketing decisions."
      }
    ]
  },
  measure: {
    heading: "Measure response quality, not vanity",
    body: "Reach matters only when it helps create the right audience, conversation or downstream demand.",
    metrics: [
      "Qualified reach",
      "Engagement quality",
      "Community growth",
      "Conversation & response",
      "Traffic contribution",
      "Demand signals"
    ]
  },
  connections: {
    items: [
      {
        capability: "Paid Media & PPC",
        title: "Amplify what is working",
        body: "Strong organic content can be selectively amplified when paid distribution improves reach or economics."
      },
      {
        capability: "Measurement and Insight",
        title: "Understand contribution",
        body: "Social data should contribute to a wider view of demand, not sit in an isolated channel report."
      },
      {
        capability: "Brand and Strategy",
        title: "Fix the proposition first",
        body: "If the audience or proposition is unclear, social execution should not be asked to compensate for it."
      }
    ]
  },
  goodLooksLike: {
    heading: "What good social should achieve",
    points: [
      "The audience grows for the right reasons, not just in raw numbers.",
      "Content creates response, participation or useful learning.",
      "Community activity produces signals the wider marketing system can use.",
      "Social supports demand rather than operating as an isolated publishing machine."
    ]
  },
  faqs: {
    items: [
      {
        question: "Do you manage day-to-day channels?",
        answer:
          "Where agreed, yes — but channel management should follow a clear strategic role and measurement plan."
      },
      {
        question: "Do you create content as well?",
        answer:
          "Content planning and delivery can form part of the engagement depending on the channel and production requirements."
      },
      {
        question: "How do you judge whether social is working?",
        answer:
          "We focus on audience quality, meaningful engagement, community growth and contribution to demand where the data allows."
      }
    ]
  }
};

export const paidMediaAndPpc: SpecialistPageConfig = {
  route: "ads-ppc",
  capability: "Digital Visibility and Growth",
  label: "Paid Media & PPC",
  meta: {
    title: "Paid Media & PPC | Pixelette Marketing",
    description:
      "Paid search, paid social and performance campaigns across the platforms your audience uses, built to test what works and put budget behind evidence."
  },
  hero: {
    heading: "Make paid media accountable to commercial outcomes, not clicks",
    lead: "Paid search, paid social and performance campaigns built to find the right audience, test what works and put budget behind evidence."
  },
  earnsItsPlace: {
    heading: "Use paid media when speed, evidence or scale matters",
    intro:
      "Paid media earns its place when there is a clear commercial reason to buy attention.",
    items: [
      {
        title: "You need demand now",
        body: "Organic channels are unlikely to create enough opportunity quickly enough."
      },
      {
        title: "You need evidence",
        body: "Use campaigns to test audiences, offers, messages and commercial response."
      },
      {
        title: "You need to scale what works",
        body: "Increase reach while watching whether the economics remain healthy."
      }
    ]
  },
  services: {
    items: [
      {
        title: "Media strategy & targeting",
        body: "Set priorities, budgets, audiences and hypotheses before spend starts."
      },
      {
        title: "Paid search",
        body: "Capture active intent through focused search campaigns and disciplined keyword strategy."
      },
      {
        title: "Paid social & retargeting",
        body: "Create and recapture demand across relevant paid social environments."
      },
      {
        title: "Testing & optimisation",
        body: "Continuously improve audiences, creative, bids, budgets and campaign structure."
      }
    ]
  },
  measure: {
    heading: "Measure the economics behind the media",
    body: "Performance means understanding what qualified actions cost and what happens as spend increases.",
    metrics: [
      "Cost per qualified action",
      "CPL / CAC where appropriate",
      "Conversion rate",
      "ROAS where measurable",
      "Creative efficiency",
      "Marginal performance"
    ]
  },
  connections: {
    items: [
      {
        capability: "Digital Visibility and Growth",
        title: "Traffic arrives but does not convert",
        body: "The landing page, offer or conversion journey may be the real constraint rather than media buying."
      },
      {
        capability: "Brand and Strategy",
        title: "The proposition is not landing",
        body: "More spend is unlikely to fix a weak reason to choose you."
      },
      {
        capability: "Measurement and Insight",
        title: "Attribution is unclear",
        body: "Cross-channel analysis should determine what paid media is actually contributing."
      }
    ]
  },
  goodLooksLike: {
    heading: "What good paid media should achieve",
    points: [
      "Spend is tied to qualified commercial actions rather than traffic alone.",
      "Audience and creative hypotheses are continuously tested.",
      "Weak landing-page performance is identified rather than hidden by more spend.",
      "Marginal performance is understood as budgets increase."
    ]
  },
  faqs: {
    items: [
      {
        question: "Which platforms do you work across?",
        answer:
          "Platform choice should follow audience and commercial intent rather than a fixed platform list."
      },
      {
        question: "Do you manage creative testing?",
        answer:
          "Yes where included in scope; testing should reveal which messages and formats create meaningful response."
      },
      {
        question: "How quickly can paid media create useful evidence?",
        answer:
          "That depends on spend, audience size and conversion volume, but measurement should be designed before activation so learning starts immediately."
      }
    ]
  }
};

export const influencerAndPartnerships: SpecialistPageConfig = {
  route: "influencer-marketing",
  capability: "Creative and Campaigns",
  label: "Influencer & Partnerships",
  meta: {
    title: "Influencer & Partnerships | Influencer Marketing | Pixelette Marketing",
    description:
      "Find the right creators, build partnerships audiences believe and connect influencer marketing to measurable outcomes."
  },
  hero: {
    heading: "Turn trusted voices into credible demand",
    lead: "Find the right creators, build partnerships audiences believe and connect influence to measurable marketing outcomes."
  },
  earnsItsPlace: {
    heading: "Use influence when trust travels through people",
    intro:
      "Influencer activity earns its place when credibility and audience fit matter more than raw reach.",
    items: [
      {
        title: "Your audience trusts specialist voices",
        body: "Relevant creators can reduce the distance between brand claims and audience belief."
      },
      {
        title: "You need authentic market access",
        body: "Partnerships can reach communities conventional advertising struggles to enter credibly."
      },
      {
        title: "You have something worth amplifying",
        body: "Creators work best when the proposition or experience gives them something genuine to communicate."
      }
    ]
  },
  services: {
    items: [
      {
        title: "Creator strategy & sourcing",
        body: "Define the role of creators and identify audiences worth accessing."
      },
      {
        title: "Vetting & outreach",
        body: "Assess fit, credibility and risk before negotiating activity."
      },
      {
        title: "Campaign & partnership management",
        body: "Brief, coordinate and govern delivery across one-off and longer-term relationships."
      },
      {
        title: "Measurement & amplification",
        body: "Measure response and selectively amplify creator content when evidence supports it."
      }
    ]
  },
  measure: {
    heading: "Measure influence by audience fit and action",
    body: "Large follower counts are not the objective. Relevant reach, response and downstream action matter more.",
    metrics: [
      "Qualified reach",
      "Engagement quality",
      "Audience fit",
      "Traffic & actions",
      "Attributed conversion where available",
      "Creator efficiency"
    ]
  },
  connections: {
    items: [
      {
        capability: "Social & Community",
        title: "Strengthen owned channels",
        body: "Creator content can support sustained participation beyond the original campaign."
      },
      {
        capability: "Paid Media & PPC",
        title: "Amplify strong assets",
        body: "The best creator assets can be selectively amplified when paid distribution improves performance."
      },
      {
        capability: "Measurement and Insight",
        title: "Compare contribution",
        body: "Creator activity should be evaluated alongside other demand channels using consistent measures."
      }
    ]
  },
  goodLooksLike: {
    heading: "What good influencer work should achieve",
    points: [
      "Creator selection is based on audience and credibility, not follower counts alone.",
      "Partnerships feel believable rather than scripted endorsements.",
      "Measurement links influence to meaningful audience action where possible.",
      "Strong relationships can evolve beyond one-off transactions."
    ]
  },
  faqs: {
    items: [
      {
        question: "How do you choose creators?",
        answer:
          "We assess audience fit, credibility, content quality, suitability and the specific role the creator needs to play."
      },
      {
        question: "Do you handle outreach and negotiation?",
        answer:
          "These activities can be included within campaign and partnership management where agreed."
      },
      {
        question: "Can creator content be used in paid campaigns?",
        answer:
          "Where rights and strategy allow, strong creator assets can be selectively amplified through paid media."
      }
    ]
  }
};

export const prAndEarnedMedia: SpecialistPageConfig = {
  route: "pr",
  capability: "Communications and Engagement",
  label: "PR & Earned Media",
  meta: {
    title: "PR, reputation and stakeholder communications | Pixelette Marketing",
    description:
      "When the objective is standing, not pipeline — reputation, stakeholder relationships, change with staff, and credibility with people who will never be customers."
  },
  // Plan §10.10 — widen PR to reputation and stakeholder; no standalone page.
  hero: {
    heading: "When the objective is standing, not pipeline",
    lead: "Not all commercial marketing is built to generate demand. Some of it exists to protect a reputation, hold a stakeholder relationship together, land a difficult change with staff, or make a company credible to people who will never be its customers — investors, regulators, partners, journalists, acquirers. That work is measured differently, and most of it never shows up in a pipeline report."
  },
  earnsItsPlace: {
    heading: "Use this work when credibility and standing matter more than leads",
    intro:
      "Reputation and stakeholder communications earn their place when the objective is trust, continuity or understanding rather than another brand-controlled demand campaign.",
    items: [
      {
        title: "Reputation and issues need handling",
        body: "Independent coverage, issues readiness and message discipline protect standing when scrutiny arrives."
      },
      {
        title: "Stakeholders need a clear account",
        body: "Investors, regulators, partners and journalists need a coherent story that holds under questioning."
      },
      {
        title: "Change has to land with staff first",
        body: "Internal and change communications keep people from finding out somewhere else first."
      }
    ]
  },
  services: {
    items: [
      {
        title: "Brand and narrative",
        body: "Positioning, identity direction and the story the market should be able to retell."
      },
      {
        title: "Reputation and issues",
        body: "Proactive reputation work, issues readiness and earned attention from voices people already trust."
      },
      {
        title: "Stakeholder and investor communications",
        body: "Communications for people who shape the conditions of the business without buying from it."
      },
      {
        title: "Internal and change communications",
        body: "Staff communications through change — understanding tested, not assumed from distribution."
      }
    ]
  },
  measure: {
    heading: "Measure the conditions, not a pipeline that was never the point",
    body: "That work is measured differently, and most of it never shows up in a pipeline report.",
    metrics: [
      "Share and quality of relevant conversation",
      "Message penetration among named stakeholder groups",
      "Sentiment over time against a baseline",
      "Inbound enquiry quality",
      "Recruitment and retention signals where relevant",
      "Absence of avoidable escalation"
    ]
  },
  connections: {
    items: [
      {
        capability: "Brand and Strategy",
        title: "The underlying narrative is weak",
        body: "Reputation work should not be asked to manufacture a proposition that has not been resolved upstream."
      },
      {
        capability: "Digital Visibility and Growth",
        title: "The objective is search authority",
        body: "Digital PR primarily intended to build organic authority belongs within Digital Visibility and Growth."
      },
      {
        capability: "Social & Community",
        title: "Earned attention needs amplification",
        body: "Relevant coverage can be extended through owned social when that helps the wider system."
      }
    ]
  },
  goodLooksLike: {
    heading: "What good reputation and stakeholder work should achieve",
    points: [
      "The story earns attention because it is relevant, not because it was pushed harder.",
      "Coverage and conversation appear where the intended audience already looks.",
      "Named stakeholder groups understand the messages that were meant for them.",
      "Staff hear about change from the organisation first, with understanding tested rather than assumed."
    ]
  },
  faqs: {
    items: [
      {
        question: "Can you prove this generated revenue?",
        answer:
          "Usually not directly, and we will not claim it did. Reputation work changes the conditions in which commercial work happens. We measure the conditions, name what we cannot attribute, and let you judge it against what it cost."
      },
      {
        question: "Do you guarantee coverage?",
        answer:
          "Earned media cannot be credibly guaranteed; the role is to strengthen the story, targeting and outreach."
      },
      {
        question: "How is this different from Digital Visibility and Growth?",
        answer:
          "This page focuses on standing, reputation and stakeholder relationships. Search-led authority building belongs within Digital Visibility and Growth."
      }
    ]
  }
};

export const demandPerformancePages: SpecialistPageConfig[] = [
  socialAndCommunity,
  paidMediaAndPpc,
  influencerAndPartnerships,
  prAndEarnedMedia
];
