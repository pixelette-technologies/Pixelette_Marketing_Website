import type { ItemsSectionContent } from "@/components/ui/home";
import type { PointItemContent } from "@/components/feature";
import { growthSystemData } from "@/data/home";

// THESE FIVE ARE DEEPER EXPERIENCE, NOT THE SECTOR LIST. Since 23 Sep 2026 the
// site's sectors are the eight in data/industries/whoWeHelp.ts, and these five
// pages sit beneath them as the areas the wider Pixelette group knows best.
// The pages and their URLs are kept for search; only their framing changed.
//
// `label` is the area's short name, used wherever the five are listed together
// (the Who We Help menu and the /industries cards). `title` is the page's own
// name and still feeds the structured data, so it keeps the "Marketing".
//
// --- 25 Sep 2026: rebuilt to the final correction pass ----------------------
// Every page now follows one architecture, in this order:
//
//   hero        the positioning line, kept where it was already strong
//   challenges  what marketing has to solve in THIS market
//   help        where Pixelette fits, and what the work is not
//   capabilities the five, each applied to the market
//   approach    Diagnose, Audit, Growth Plan, Execute & Optimise
//   evidence    only where a real, management-supplied case study applies
//   faqs        questions a buyer in this market would actually ask
//   close       "Tell us what needs to grow."
//
// WHAT WENT, on every page: the nine-card lists of "Crypto SEO Services",
// "Fintech PR Marketing" and the rest, which sold the same eight channels five
// times under five prefixes; the Book / Audit / Plan / Execute process, which
// promised a free consultation and transparent pricing nobody has confirmed;
// the "X is moving fast. Are you?" closing bands and their "Book a
// consultation – it's on us!" button; and FAQs that restated the service list
// as questions. The unused `review` blocks went too — nothing rendered them.
//
// THE CAPABILITY NAMES ARE IMPORTED, NOT RETYPED. Each page supplies what a
// capability means in its market; the title comes from growthSystemData by
// index, so a renamed capability renames itself here as well.
//
// NO FIGURES ON THESE PAGES except BlockGuard's, and those are not in this
// file: the Web3 page renders the /results case study itself, from the same
// object, so the numbers cannot drift between the two pages.

export interface SectorPage {
  id: number;
  title: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  route: string;
  hubLine: string;
  image: string;
  mainHeading: string;
  subHeading: string;
  summary: string;
  challenges: { eyebrow: string; heading: string; lead: string; items: { heading: string; text: string }[] };
  help: { eyebrow: string; heading: string; body: string[] };
  capabilities: ItemsSectionContent;
  approach: ItemsSectionContent;
  /** The /results case study to render, by client name. Absent where there
   *  is no real evidence to show, which is four of the five. */
  evidence?: { client: string; eyebrow: string; heading: string };
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  close: { lead: string };
}

/** One of the five capabilities, titled from the approved list. */
function capability(
  index: string,
  body: string,
  channels: string[]
): PointItemContent {
  const source = growthSystemData.items.find(item => item.index === index);
  if (!source) {
    throw new Error(`Unknown capability index "${index}".`);
  }
  return { index, title: source.title, body, capabilities: channels };
}

/** The home page's four process stages, with a market-specific sentence each. */
function approach(
  heading: string,
  bodies: [string, string, string, string]
): ItemsSectionContent {
  const titles = ["Diagnose", "Audit", "Growth Plan", "Execute & Optimise"];
  return {
    eyebrow: "How we approach the work",
    heading,
    items: titles.map((title, i) => ({
      index: `0${i + 1}`,
      title,
      body: bodies[i]
    }))
  };
}

const CAPABILITIES_EYEBROW = "Relevant capabilities";
const CHALLENGES_EYEBROW = "What marketing has to solve";
const HELP_EYEBROW = "Where Pixelette can help";

export const industriesData: SectorPage[] = [
  {
    id: 1,
    title: "Web3 Marketing",
    label: "Web3 & Digital Assets",
    metaTitle: "Web3 & Digital Asset Marketing | Pixelette Marketing",
    metaDescription:
      "Web3 and digital-asset marketing built on credibility, community and search, within advertising and regulatory limits. No promises about token performance.",
    metaKeywords:
      "web3 marketing, digital asset marketing, crypto marketing, web3 marketing agency",
    route: "web_3",
    hubLine:
      "Community, credibility and discoverability, in a market where trust is the hardest thing to earn and the easiest to lose.",
    image: "/industries/industriesHero.webp",
    mainHeading: "Web3 and digital asset marketing",
    subHeading: "For products where trust is harder to earn than attention",
    summary:
      "Web3 audiences arrive sceptical and leave quickly. Advertising is restricted, markets move fast, and credibility is lost faster than it is earned. Most of the work is reputational before it is promotional: community, credibility and clear explanations of something many people have never used.",
    challenges: {
      eyebrow: CHALLENGES_EYEBROW,
      heading: "What Web3 marketing has to solve",
      lead: "The market has moved on from launch hype. Users, partners and investors now look for evidence that a project is credible, operates within the rules and will still be here next year.",
      items: [
        {
          heading: "Credibility with a cautious audience",
          text: "Scams and failed projects have made every audience wary. Credibility comes from a clear account of what the product does, who is behind it and how it is governed, told the same way everywhere people look."
        },
        {
          heading: "Advertising and regulatory limits",
          text: "The major ad platforms restrict crypto advertising, and in the UK cryptoasset promotions to consumers carry mandatory risk warnings and a ban on incentives to invest. Growth has to come from channels that work within those limits."
        },
        {
          heading: "Growth that does not depend on the market",
          text: "Sentiment can turn in a week. Marketing that relies on a rising market stops working when it falls, so the plan is built around what the product is used for rather than what its token is worth."
        },
        {
          heading: "Community that leads somewhere",
          text: "A large Telegram or Discord group is not the same as an active user base. Community work has to lead to usage, partnerships or a qualified conversation, and be measured on that."
        },
        {
          heading: "Findable between announcements",
          text: "Announcements fade in days. Search and content built on what people ask before they commit keep a project visible between launches."
        }
      ]
    },
    help: {
      eyebrow: HELP_EYEBROW,
      heading: "Growth that lasts beyond a single launch",
      body: [
        "We work with Web3 and digital-asset businesses on the parts of growth that outlast a news cycle: positioning, community, search visibility and the path from interest to active use.",
        "We do not promise token performance, investment returns or market outcomes, and we do not write marketing that implies them. Where a promotion falls under financial-promotion rules, it goes through your compliance adviser before it is published."
      ]
    },
    capabilities: {
      eyebrow: CAPABILITIES_EYEBROW,
      heading: "Five capabilities, applied to Web3",
      lead: "The same five connected capabilities we use in every market, pointed at the problems specific to Web3 and digital assets.",
      items: [
        capability(
          "01",
          "Explain what the product does and who it is for in plain language, and position it on utility and credibility rather than price.",
          ["Audience insight", "competitor positioning", "proposition", "messaging"]
        ),
        capability(
          "02",
          "Build reach through community, PR, partners and creators chosen for their standing rather than follower count, within each platform's crypto advertising policies.",
          ["Community management", "social media", "PR", "influencer and partner activity", "campaigns"]
        ),
        capability(
          "03",
          "Make the project findable and credible in search and AI assistants, with content that answers what people ask before they commit.",
          ["SEO", "content strategy", "thought leadership", "digital PR"]
        ),
        capability(
          "04",
          "Turn community interest into active users, partners or qualified conversations, with clear onboarding and follow-up.",
          ["Landing pages", "onboarding journeys", "email", "community-to-pipeline"]
        ),
        capability(
          "05",
          "Measure what community and campaigns actually produce: active users, partner conversations and search visibility, not only member counts.",
          ["Analytics", "campaign reporting", "attribution"]
        )
      ]
    },
    approach: approach("How a Web3 engagement runs", [
      "We start with the commercial objective, the product's stage and the rules that apply to how it can be promoted.",
      "We review your positioning, community, search visibility and channels against the projects your audience compares you with.",
      "You receive a prioritised plan covering what should change, which channels to use within the relevant restrictions and how progress will be measured.",
      "Our specialists run the agreed programme, report against the agreed KPIs and adjust the work as the evidence comes in."
    ]),
    evidence: {
      client: "BlockGuard",
      eyebrow: "Evidence",
      heading: "Web3 work we can show"
    },
    faqHeading: "Common questions about Web3 marketing",
    faqs: [
      {
        question: "Do you promise token performance or returns?",
        answer:
          "No. No marketing agency can responsibly promise token performance, investment returns or market outcomes, and we do not. We can make a project clearer, more credible and easier to find, and measure the effect of that work."
      },
      {
        question: "How do you market a crypto product when ad platforms restrict it?",
        answer:
          "Through the channels that work within the rules: community, PR, partnerships, search and content, with paid media only where the platform's policy and the relevant regulations allow it. In the UK, cryptoasset promotions to consumers carry their own requirements, which your compliance adviser should review."
      },
      {
        question: "Is Web3 marketing mostly community management?",
        answer:
          "Community matters, but on its own it rarely produces growth. It works when it is connected to clear positioning, search visibility and a path from interest to use."
      },
      {
        question: "Do you only work with Web3 businesses?",
        answer:
          "No. Pixelette Marketing works with businesses across established and emerging sectors. Web3 and digital assets is one of five markets where our wider experience gives us additional depth."
      }
    ],
    close: {
      lead: "Tell us what you are building, who it is for and where growth has stalled. We will review the enquiry and come back with the most relevant next step."
    }
  },
  {
    id: 2,
    title: "Fintech Marketing",
    label: "Fintech",
    metaTitle: "Fintech Digital Marketing Agency | Pixelette Marketing",
    metaDescription:
      "Marketing for regulated financial products: trust, acquisition and differentiation you can substantiate, delivered alongside your legal and compliance teams.",
    metaKeywords:
      "fintech marketing, fintech digital marketing agency, fintech marketing services",
    route: "fintech",
    hubLine:
      "Growth inside a regulated market, where compliance shapes what you are allowed to say and trust decides who listens.",
    image: "/industries/fintech.png",
    mainHeading: "Fintech marketing",
    subHeading: "For regulated products, where what you may say shapes what you can sell",
    summary:
      "In financial services, compliance shapes the message before marketing ever sees it. Claims need substantiating, promotions need sign-off, and trust decides who gets a hearing at all. The work is building demand inside those limits rather than around them.",
    challenges: {
      eyebrow: CHALLENGES_EYEBROW,
      heading: "What fintech marketing has to solve",
      lead: "Most fintechs describe themselves as secure, simple and good value. The ones that grow can show it, within the rules on what they may say.",
      items: [
        {
          heading: "Trust before anything else",
          text: "People are being asked to hand over money or financial data. Before they compare features, they want to know who you are, who regulates you and what happens if something goes wrong."
        },
        {
          heading: "Rules that shape the message",
          text: "In the UK, financial promotions must be fair, clear and not misleading, and some need approval by an authorised firm before they can be published. Campaigns that ignore this stall in approval, or are withdrawn after launch."
        },
        {
          heading: "Acquisition that survives sign-off",
          text: "Acquisition costs are high and approval cycles are slow. Campaigns need to be designed with sign-off in mind from the first draft, so they launch on time instead of being rewritten."
        },
        {
          heading: "Differentiation you can substantiate",
          text: "Standing apart in fintech has to be specific and provable: a fee, a feature, a service standard. Vague claims of superiority are weak marketing and a compliance risk at the same time."
        }
      ]
    },
    help: {
      eyebrow: HELP_EYEBROW,
      heading: "Demand built inside the limits",
      body: [
        "We help fintech companies turn a regulated proposition into demand they can measure: a sharper message, the right channels and a better path from first visit to account opening or sales conversation.",
        "We are not a law firm or a regulatory adviser, and we do not decide whether a promotion complies. We work alongside the client's legal and compliance teams so marketing can move through the appropriate approval process, and we plan the work around that process from the start."
      ]
    },
    capabilities: {
      eyebrow: CAPABILITIES_EYEBROW,
      heading: "Five capabilities, applied to fintech",
      lead: "The same five connected capabilities we use in every market, pointed at the problems specific to regulated financial products.",
      items: [
        capability(
          "01",
          "Find the differentiation you can substantiate and turn it into a proposition that keeps its edge through compliance review.",
          ["ICP and buyer insight", "competitor positioning", "proposition", "messaging"]
        ),
        capability(
          "02",
          "Acquire customers through paid, social, PR and partner channels, planned within each platform's financial-services advertising policies.",
          ["Paid search and social", "LinkedIn", "PR", "partner activity", "community management"]
        ),
        capability(
          "03",
          "Answer the questions people ask about safety, fees, regulation and switching, which is where much of the high-intent search in financial services sits.",
          ["SEO", "content strategy", "educational content", "digital PR"]
        ),
        capability(
          "04",
          "Improve the path from first visit to application, sign-up or sales conversation, including the onboarding steps where trust is most often lost.",
          ["Landing pages", "conversion optimisation", "lifecycle and email", "lead generation"]
        ),
        capability(
          "05",
          "Measure acquisition cost and conversion by channel and segment, so spend moves towards the customers who activate and stay.",
          ["Analytics", "attribution", "reporting", "experimentation"]
        )
      ]
    },
    approach: approach("How a fintech engagement runs", [
      "We start with the commercial objective, the product's regulatory position and how your approval process works today.",
      "We review your positioning, channels, funnel and competitors, and identify the claims doing the most work and the evidence behind each one.",
      "You receive a prioritised plan showing what should change, how each piece of work will move through your approval process and how performance will be measured.",
      "We run the agreed programme with sign-off built into the schedule, report against the agreed KPIs and improve the work as the evidence comes in."
    ]),
    faqHeading: "Common questions about fintech marketing",
    faqs: [
      {
        question: "Will you make sure our marketing complies with FCA rules?",
        answer:
          "No agency should promise that, and we do not. Responsibility for approving financial promotions sits with your firm and, where required, an authorised person. We work alongside your legal and compliance teams, build their review into the schedule and keep the evidence for each claim so that approval is quicker."
      },
      {
        question: "Can you run paid advertising for financial products?",
        answer:
          "Yes, within each platform's rules. The major ad platforms restrict financial-services advertising, and some require advertisers to be verified before campaigns can run. We plan for that from the start rather than discovering it at launch."
      },
      {
        question: "Do you work with cryptoasset firms?",
        answer:
          "Yes. Cryptoasset promotions to UK consumers have their own, stricter rules. Our Web3 and digital asset page covers how we approach that market."
      },
      {
        question: "Do you only work with fintech companies?",
        answer:
          "No. Pixelette Marketing works with businesses across established and emerging sectors. Fintech is one of five markets where our wider experience gives us additional depth."
      }
    ],
    close: {
      lead: "Tell us about the product, the customers you want to reach and how approval works today. We will review the enquiry and come back with the most relevant next step."
    }
  },
  {
    id: 3,
    title: "Tech Marketing",
    label: "Technology",
    metaTitle: "B2B & B2C Tech Marketing Agency | Pixelette Marketing",
    metaDescription:
      "Marketing for technically complex products with long buying journeys: turning technical capability into value a whole buying committee can agree on.",
    metaKeywords: "tech marketing agency, b2b tech marketing agency, tech marketing services",
    route: "tech",
    hubLine:
      "Long buying cycles and technical buyers, where the decision is made by a committee you rarely get in the room.",
    image: "/industries/tech.png",
    mainHeading: "Technology marketing",
    subHeading: "For long sales cycles and buying committees you rarely get in the room",
    summary:
      "Technology purchases are rarely decided by the person you are talking to. The cycle is long, the evaluation is technical, and the decision is made by a committee with competing priorities. Much of the job is equipping your champion for meetings you will never attend.",
    challenges: {
      eyebrow: CHALLENGES_EYEBROW,
      heading: "What technology marketing has to solve",
      lead: "Technical products are often sold by people who understand them to buyers who judge them on something else: cost, risk, effort and whether it will work in their organisation.",
      items: [
        {
          heading: "Capability translated into buyer value",
          text: "Architecture, integrations and performance matter to the evaluator. The budget holder wants to know what changes for the business, what it costs and what it replaces. The message has to work for both."
        },
        {
          heading: "A long journey with many decision-makers",
          text: "Technical, financial, operational and security stakeholders all have a say, often over months. Each needs different material, and most of it will be read when you are not in the room."
        },
        {
          heading: "Evidence that reduces the risk",
          text: "Buying the wrong system is expensive and visible. Buyers look for references, case studies, security and compliance information and clear answers on implementation before they commit."
        },
        {
          heading: "Technical difference made commercial",
          text: "A better product does not win on its own. Its technical advantage has to be expressed as an outcome a buyer can defend to the rest of the business."
        }
      ]
    },
    help: {
      eyebrow: HELP_EYEBROW,
      heading: "Explaining complex products to the people who approve them",
      body: [
        "We help technology companies say what they do in terms a buying committee can agree on, and build the demand, content and conversion path around a long sales cycle. The language stays commercial: we write for the people who approve the budget as well as the people who test the product.",
        "Pixelette Marketing is part of the wider Pixelette Group. Where a message depends on technical accuracy, we can draw on engineers at Pixelette Technologies rather than guess at the detail."
      ]
    },
    capabilities: {
      eyebrow: CAPABILITIES_EYEBROW,
      heading: "Five capabilities, applied to technology",
      lead: "The same five connected capabilities we use in every market, pointed at long cycles, technical evaluation and buying committees.",
      items: [
        capability(
          "01",
          "Translate technical capability into a proposition a budget holder can repeat, and decide which buyers and use cases to lead with.",
          ["ICP and buying-committee mapping", "competitor positioning", "proposition", "messaging"]
        ),
        capability(
          "02",
          "Reach each member of the buying committee in the channels they use, from search and LinkedIn to industry media and partners.",
          ["Paid search and social", "LinkedIn", "account-based campaigns", "PR", "partner activity"]
        ),
        capability(
          "03",
          "Build the content a champion can forward: explanations, comparisons and evidence that answer the committee's questions before they are asked.",
          ["SEO", "content strategy", "thought leadership", "digital PR", "AI-assisted discovery"]
        ),
        capability(
          "04",
          "Keep opportunities moving through a long cycle with nurture, sales material and a clear handoff, so interest does not go cold between meetings.",
          ["Lead generation", "account nurture", "email", "sales enablement content", "sales handoff"]
        ),
        capability(
          "05",
          "Connect marketing activity to pipeline and closed revenue over the length of the cycle, not only the month a campaign ran.",
          ["Analytics", "attribution", "pipeline reporting", "experimentation"]
        )
      ]
    },
    approach: approach("How a technology engagement runs", [
      "We start with the commercial objective, the buying committee and where deals currently slow down or stop.",
      "We review your positioning, content, channels and sales material against the alternatives buyers evaluate you against, including doing nothing.",
      "You receive a prioritised plan covering what should change for each role in the buying committee and how pipeline progress will be measured.",
      "Our specialists run the agreed programme, report against the agreed KPIs and improve the work as the evidence comes in."
    ]),
    evidence: {
      client: "WebBookingPro",
      eyebrow: "Evidence",
      heading: "Technology work we can show"
    },
    faqHeading: "Common questions about technology marketing",
    faqs: [
      {
        question: "Do you write for technical or business audiences?",
        answer:
          "Both, and usually in separate pieces. Evaluators need detail and accuracy; budget holders need outcomes, cost and risk. We plan content for each role in the buying committee rather than one message for everyone."
      },
      {
        question: "How do you measure marketing when the sales cycle is long?",
        answer:
          "We track leading indicators such as engaged accounts, qualified opportunities and movement between pipeline stages alongside closed revenue, and we agree in advance which of them the work will be judged on."
      },
      {
        question: "Do you work with our sales team?",
        answer:
          "Yes. In long buying journeys marketing and sales depend on each other. We agree what counts as a qualified lead, build the material sales needs and set up the handoff between the two."
      },
      {
        question: "Do you only work with technology companies?",
        answer:
          "No. Pixelette Marketing works with businesses across established and emerging sectors. Technology is one of five markets where our wider experience gives us additional depth."
      }
    ],
    close: {
      lead: "Tell us what you sell, who has to agree to buy it and where deals slow down. We will review the enquiry and come back with the most relevant next step."
    }
  },
  {
    id: 4,
    title: "SaaS Marketing",
    label: "SaaS",
    metaTitle: "SaaS Marketing Agency | Pixelette Marketing",
    metaDescription:
      "SaaS marketing connected from positioning to payback: standing out in a crowded category, turning interest into trials and demos, and measuring what drives revenue.",
    metaKeywords:
      "saas marketing agency, saas marketing services, digital marketing for saas companies",
    route: "saas",
    hubLine:
      "Demand that converts to trial, trials that convert to revenue, and retention that makes both worth paying for.",
    image: "/industries/saas.png",
    mainHeading: "SaaS marketing",
    subHeading: "For products where the sale is only the start of the revenue",
    summary:
      "SaaS growth is a chain rather than an event: demand that converts to trial, trials that convert to paid, and retention that makes the acquisition cost worth paying. A break anywhere in that chain shows up as a marketing problem long after it stopped being one.",
    challenges: {
      eyebrow: CHALLENGES_EYEBROW,
      heading: "What SaaS marketing has to solve",
      lead: "Most SaaS categories are crowded, and most SaaS websites describe features in language a buyer could find on ten competitors' sites.",
      items: [
        {
          heading: "Standing out in a crowded category",
          text: "When a buyer's shortlist already holds ten tools, feature lists stop helping. The job is a clear answer to why this product, for this kind of customer, over the obvious alternatives."
        },
        {
          heading: "Acquisition that pays back",
          text: "Paid channels get more expensive as categories fill up. Growth depends on knowing what a customer costs to acquire, how long it takes to earn that back, and which channels bring customers who stay."
        },
        {
          heading: "From interest to trial, demo and use",
          text: "A sign-up is not a customer. Trials and demos have to lead to activation, which means onboarding, nurture and sales follow-up are part of marketing's job rather than someone else's."
        },
        {
          heading: "Pipeline that fits, not pipeline that fills",
          text: "Volume sales cannot close costs more than it looks. Demand aimed at fit means fewer wasted demos and more accounts that renew and expand."
        }
      ]
    },
    help: {
      eyebrow: HELP_EYEBROW,
      heading: "Connecting the chain from demand to revenue",
      body: [
        "We help SaaS companies connect the parts of growth that usually sit in different teams: positioning, acquisition, conversion, activation and the measurement that ties them together.",
        "Where marketing can influence retention and expansion, through onboarding, lifecycle email and customer communication, we include it in the plan. Where the real issue is product, pricing or support, we will say so."
      ]
    },
    capabilities: {
      eyebrow: CAPABILITIES_EYEBROW,
      heading: "Five capabilities, applied to SaaS",
      lead: "The same five connected capabilities we use in every market, in the order a SaaS funnel runs: positioning, demand, search, conversion and measurement.",
      items: [
        capability(
          "01",
          "Define the customer you win best and why, and make that the centre of the website, the sales deck and every campaign.",
          ["ICP and buyer insight", "competitor positioning", "proposition", "messaging"]
        ),
        capability(
          "02",
          "Create and capture demand in the channels your best customers use, with budgets set against payback rather than volume.",
          ["Paid search and social", "LinkedIn", "demand generation", "community", "partner activity"]
        ),
        capability(
          "03",
          "Be found by the problem, not only the category, through search and content built on what buyers ask before they know which tool they need.",
          ["SEO", "content strategy", "comparison pages", "thought leadership", "AI-assisted discovery"]
        ),
        capability(
          "04",
          "Improve the path from visit to trial or demo, and from trial to activation, with landing pages, nurture and a clean handoff to sales.",
          ["Landing pages", "trial and demo conversion", "onboarding and lifecycle email", "nurture", "sales handoff"]
        ),
        capability(
          "05",
          "Track acquisition cost, conversion and payback by channel, so budget follows the customers who activate and stay.",
          ["Analytics", "attribution", "funnel reporting", "experimentation"]
        )
      ]
    },
    approach: approach("How a SaaS engagement runs", [
      "We start with the commercial objective and the numbers behind it: acquisition cost, trial or demo conversion, activation and churn, as far as they are tracked today.",
      "We review positioning, channels, website and funnel against the competitors your buyers compare you with, and find where the chain from demand to revenue breaks.",
      "You receive a prioritised plan covering what should change, what should be tested and how each change will be measured.",
      "Our specialists run the agreed programme, report against the agreed KPIs and improve the work as the evidence comes in."
    ]),
    faqHeading: "Common questions about SaaS marketing",
    faqs: [
      {
        question: "Which metrics should SaaS marketing be judged on?",
        answer:
          "The ones connected to revenue: customer acquisition cost, payback period, trial or demo conversion, activation, and retention by acquisition channel. Traffic and follower counts are useful signals but poor targets."
      },
      {
        question: "Does a product-led or sales-led model change the marketing?",
        answer:
          "Yes. A product-led model puts more weight on sign-up, onboarding and in-product activation; a sales-led model puts more weight on qualified demos, sales material and handoff. Many companies run both, and the plan should reflect which one actually produces revenue."
      },
      {
        question: "Can marketing reduce churn?",
        answer:
          "It can influence it. Clear positioning attracts customers who fit, and onboarding and lifecycle communication help them reach value sooner. Product, pricing and support usually matter more, and we will say so where they are the real issue."
      },
      {
        question: "Do you only work with SaaS companies?",
        answer:
          "No. Pixelette Marketing works with businesses across established and emerging sectors. SaaS is one of five markets where our wider experience gives us additional depth."
      }
    ],
    close: {
      lead: "Tell us where the chain from demand to revenue is breaking, or where you want growth to come from next. We will review the enquiry and come back with the most relevant next step."
    }
  },
  {
    id: 5,
    title: "AI Marketing",
    label: "AI",
    metaTitle: "AI Digital Marketing Agency | Pixelette Marketing",
    metaDescription:
      "Marketing for AI companies in a market where claims move faster than proof: positioning against real problems, one industry at a time, with evidence buyers accept.",
    metaKeywords: "ai digital marketing agency, ai marketing solutions",
    route: "ai",
    hubLine:
      "A market where claims move faster than proof, and buyers want evidence before they want vision.",
    image: "/industries/ai.png",
    mainHeading: "AI marketing",
    subHeading: "For a market where claims move faster than proof",
    summary:
      "AI buyers have heard everything already. The market is loud, the claims outrun the evidence, and scepticism is the default setting. Showing what a product does on a real use case now travels further than describing what the technology could do.",
    challenges: {
      eyebrow: CHALLENGES_EYEBROW,
      heading: "What AI marketing has to solve",
      lead: "Most AI companies do not have a visibility problem. They have a credibility problem, and more reach on its own makes it worse.",
      items: [
        {
          heading: "Positioning against a real problem, not a capability",
          text: "Buyers do not buy a model, an agent or an accuracy score. They buy a problem solved. Leading with the capability puts you in a comparison with every company built on the same foundation models."
        },
        {
          heading: "Speaking to one industry at a time",
          text: "AI for everything persuades no one in particular. A claims handler, a compliance officer and a head of operations need different proof, different language and different reasons to act."
        },
        {
          heading: "Proof a sceptical buyer will actually accept",
          text: "In this market the buyer wants to see it working before they want to hear where it is going. Use cases, pilots, before-and-after comparisons and named customers carry more weight than any statement about the future of the category."
        }
      ]
    },
    help: {
      eyebrow: HELP_EYEBROW,
      heading: "Narrowing the story before widening the reach",
      body: [
        "We work with AI companies that have a product that works and need the market to understand why it matters. That usually means choosing the problem, the buyer and the evidence first, then building demand around them.",
        "Pixelette Marketing is part of the wider Pixelette Group, which includes AI and software engineering at Pixelette Technologies. Where a claim depends on technical detail, we can check it with people who build the technology."
      ]
    },
    capabilities: {
      eyebrow: CAPABILITIES_EYEBROW,
      heading: "Five capabilities, applied to AI",
      lead: "Not nine separate services. The same five connected capabilities we use in every market, with the channels underneath each one, pointed at the problems specific to selling AI.",
      items: [
        capability(
          "01",
          "Choose the problem, the buyer and the industry to lead with, and build a proposition that holds up when a technical evaluator reads it.",
          ["Use-case selection", "ICP and buyer insight", "competitor positioning", "messaging by industry"]
        ),
        capability(
          "02",
          "Put use-case evidence in front of the right buyers through paid, social, PR and partner channels, rather than broadcasting a general AI message.",
          ["Paid search and social", "LinkedIn", "PR", "community", "partner and influencer activity"]
        ),
        capability(
          "03",
          "Become a source that search engines and AI assistants cite when buyers research the problem you solve, not only when they search your category.",
          ["SEO", "content strategy", "thought leadership", "digital PR", "AI-assisted discovery"]
        ),
        capability(
          "04",
          "Turn interest into demos and pilots with landing pages, nurture and sales handoff built around the questions an AI buyer asks before committing.",
          ["Landing pages", "demo and pilot conversion", "email and nurture", "lead generation", "sales handoff"]
        ),
        capability(
          "05",
          "Measure which use cases, industries and channels produce qualified pipeline, so the next round of spend goes where the evidence points.",
          ["Analytics", "attribution", "reporting", "experimentation"]
        )
      ]
    },
    approach: approach("How an AI engagement runs", [
      "We start with the commercial objective and the evidence you already hold: customers, pilots, usage data and the objections that come up in sales conversations.",
      "We review how the product is described across your website, sales material, search results and AI assistants, against the competitors a buyer is likely to compare you with.",
      "You receive a prioritised plan: which problem and industry to lead with, what proof is needed, which channels to use and how performance will be measured.",
      "Our specialists run the agreed programme, report against the agreed KPIs and adjust the work as the evidence comes in."
    ]),
    faqHeading: "Common questions about AI marketing",
    faqs: [
      {
        question: "How do you market an AI product without overstating what it does?",
        answer:
          "We build the claims from what the product demonstrably does on a real use case. Where a claim cannot be supported yet, we recommend the proof that would support it rather than publishing it anyway."
      },
      {
        question: "Can you help us appear in AI assistants such as ChatGPT or Perplexity?",
        answer:
          "We work on what makes a source more likely to be found and cited: clear, specific pages that answer the questions buyers ask, consistent facts about the company across the web, and third-party coverage. No one can guarantee a citation, and we will not promise one."
      },
      {
        question: "Should an AI company target several industries at once?",
        answer:
          "Usually not at first. Proof, language and buying process differ by industry, and a message built for all of them tends to persuade none. Most companies do better leading with one industry and one use case, then extending from the evidence."
      },
      {
        question: "Do you only work with AI companies?",
        answer:
          "No. Pixelette Marketing works with businesses across established and emerging sectors. AI is one of five markets where our wider experience gives us additional depth."
      }
    ],
    close: {
      lead: "Tell us what the product does, who it is for and where adoption is stalling. We will review the enquiry and come back with the most relevant next step."
    }
  }
];
