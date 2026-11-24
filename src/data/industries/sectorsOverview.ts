// Sectors overview, 24 Nov 2026. Authoritative copy is sectors-content-v1.json
// from the final Sectors handoff. Wording is verbatim. The italic split is the
// approved emphasis in the interactive reference; joining lead + emphasis
// rebuilds the headline exactly.
//
// Images are the eight JPEGs extracted from that prototype: 680×384, not
// high-resolution masters. Do not upscale them or substitute new artwork.

export interface SectorOverview {
  id: string;
  order: number;
  name: string;
  headlineLead: string;
  headlineEmphasis: string;
  description: string;
  capabilities: readonly [string, string, string];
  image: string;
}

export const sectorsIntro = {
  eyebrow: "Sectors",
  title: ["Different markets,", "different reasons"] as const,
  titleEmphasis: "to act",
  lead: "Every market has its own challenges. We bring the strategy, creativity and digital expertise to help you move forward."
};

export const sectorsOverview: readonly SectorOverview[] = [
  {
    id: "technology-and-digital-products",
    order: 1,
    name: "Technology and digital products",
    headlineLead: "Make complex technology easier",
    headlineEmphasis: "to understand",
    description:
      "We can help businesses communicate product value, explain complex solutions and build confidence with technical and commercial buyers through clear positioning, useful content and targeted campaigns.",
    capabilities: [
      "Brand and product positioning",
      "Content and SEO",
      "Demand generation"
    ],
    image: "/sectors/technology-and-digital-products.jpg"
  },
  {
    id: "financial-services-and-fintech",
    order: 2,
    name: "Financial services and fintech",
    headlineLead: "Trust is part of",
    headlineEmphasis: "every decision",
    description:
      "Financial decisions demand clarity, credibility and confidence. We can help organisations explain complex financial products, strengthen their reputation and engage prospective customers through clear messaging, authoritative content and responsible marketing.",
    capabilities: [
      "Brand positioning",
      "Thought leadership and content",
      "Digital campaigns"
    ],
    image: "/sectors/financial-services-and-fintech.jpg"
  },
  {
    id: "healthcare-and-wellbeing",
    order: 3,
    name: "Healthcare and wellbeing",
    headlineLead: "Make care easier to",
    headlineEmphasis: "find, understand and access",
    description:
      "Choosing a healthcare or wellbeing service often involves uncertainty. We can help organisations explain their services clearly, reach the right audiences and encourage appropriate enquiries and appointments through accessible content and focused communications.",
    capabilities: [
      "Search visibility",
      "Accessible communications",
      "Awareness campaigns"
    ],
    image: "/sectors/healthcare-and-wellbeing.jpg"
  },
  {
    id: "retail-and-consumer-brands",
    order: 4,
    name: "Retail and consumer brands",
    headlineLead: "Being noticed is one thing. Being chosen is",
    headlineEmphasis: "another",
    description:
      "In crowded consumer markets, attention alone isn't enough. We can help brands stand out, connect with customers and turn discovery into purchases through distinctive creative, social engagement and targeted digital campaigns.",
    capabilities: [
      "Brand and creative campaigns",
      "Social and influencer marketing",
      "Performance marketing"
    ],
    image: "/sectors/retail-and-consumer-brands.jpg"
  },
  {
    id: "property-and-development",
    order: 5,
    name: "Property and development",
    headlineLead: "Big decisions need more than",
    headlineEmphasis: "visibility",
    description:
      "Property decisions are shaped by location, lifestyle, value and confidence. We can help developers and property businesses showcase what makes their offering distinctive, attract prospective buyers or tenants and generate relevant enquiries and viewings.",
    capabilities: [
      "Property content and creative",
      "Local search and SEO",
      "Lead generation campaigns"
    ],
    image: "/sectors/property-and-development.jpg"
  },
  {
    id: "education-and-learning",
    order: 6,
    name: "Education and learning",
    headlineLead: "Applications begin with",
    headlineEmphasis: "confidence",
    description:
      "We can help education organisations turn interest into enquiries and applications through clearer messaging, engaging content and targeted campaigns.",
    capabilities: ["Strategy", "Content and SEO", "Campaigns"],
    image: "/sectors/education-and-learning.jpg"
  },
  {
    id: "public-sector",
    order: 7,
    name: "Public sector",
    headlineLead: "Reaching people is",
    headlineEmphasis: "only the beginning",
    description:
      "Public communications need to inform, engage and encourage meaningful action. We can help organisations reach diverse communities, explain services and changes clearly, and support participation through accessible campaigns and proportionate measurement.",
    capabilities: [
      "Public awareness campaigns",
      "Community engagement",
      "Measurement and insight"
    ],
    image: "/sectors/public-sector.jpg"
  },
  {
    id: "charities-and-non-profits",
    order: 8,
    name: "Charities and non-profits",
    headlineLead: "Turn awareness into",
    headlineEmphasis: "meaningful support",
    description:
      "Charities need to connect with people who care and inspire them to act, often with limited resources. We can help strengthen awareness, engage supporters and encourage donations, volunteering and participation through purposeful, cost-conscious communications.",
    capabilities: [
      "Campaign strategy and creative",
      "Social and community engagement",
      "Content and partnerships"
    ],
    image: "/sectors/charities-and-non-profits.jpg"
  }
];
