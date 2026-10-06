import { growthIntelligenceDemo } from "./growthIntelligenceDemo";
import type { SpecialistPageConfig } from "./types";

// THE GROWTH INTELLIGENCE SPECIALIST PAGE (30 Sep 2026, the Marketing
// Analytics & Measurement final implementation brief).
//
// ONE PAGE, NOT EIGHT. GA4, dashboards, attribution, marketing mix modelling,
// incrementality, reporting and data visualisation are one connected system
// under Growth Intelligence, so they share this page and there is
// deliberately no separate route or menu item for any of them. The route
// keeps its old slug; only the name changed, from "Marketing Analytics &
// Reporting".
//
// DECISION SUPPORT, NOT REPORTING. Reporting is an output; measurement,
// interpretation and decision support are the capability. AI may assist the
// analysis but is not the proposition, so nothing here is named for it.
//
// Every visible word below is the brief's, verbatim. The meta title and
// description follow its stated direction.
//
// THE ONE DELIBERATE EXCEPTION to the specialist family's no-visual rule is
// `demo`: a large interactive view (after 02) and its compact preview in the
// hero, both reading growthIntelligenceDemo.ts. EVERY FIGURE IN IT IS
// ILLUSTRATIVE and labelled so on the page. It is not a case study.
//
// WHAT CAME OFF, and why none of it was carried over: the "metrics to
// momentum" hero, the analytics-agency-for-growth wording, the ecosystem logo
// strip, "We manage. You grow.", three grids of analytics micro-services, the
// duplicated reporting cards, the technology-led-markets section with its
// Crypto / Fintech / SaaS / AI / Tech mini-sections, the testimonial, the
// embedded consultation form and a generic FAQ set. The brief retires every
// one of those patterns; Industries owns market context.

export const marketingAnalyticsAndMeasurement: SpecialistPageConfig = {
  route: "marketing_analytics_and_reporting",
  capability: "Growth Intelligence",
  label: "Marketing Analytics & Measurement",
  meta: {
    title: "Marketing Analytics & Measurement | Pixelette Marketing",
    description:
      "Marketing analytics and measurement designed to connect performance, customer and pipeline data and turn evidence into clearer commercial decisions."
  },
  hero: {
    eyebrow: "Growth Intelligence / Marketing Analytics & Measurement",
    heading: {
      lead: "Know what’s working.",
      accent: "Know what to do next"
    },
    lead: "Connect marketing, customer and pipeline data to understand performance, identify what is changing and make better-informed decisions about what to do next."
  },
  earnsItsPlace: {
    eyebrow: "When this earns its place",
    heading: "Data is only useful when it changes a decision",
    market: "Different markets require different measurement questions.",
    items: [
      {
        title: "You have reports, but not answers",
        body: "Plenty of metrics exist, but teams still struggle to explain what is driving performance or what action should follow."
      },
      {
        title: "Different platforms tell different stories",
        body: "Advertising, analytics, CRM and sales systems produce conflicting views of performance."
      },
      {
        title: "Investment decisions rely too heavily on instinct",
        body: "The organisation needs stronger evidence about what to scale, reduce, test or investigate."
      }
    ]
  },
  demo: growthIntelligenceDemo,
  services: {
    eyebrow: "What we actually do",
    heading: "Turn data into decisions, not just reports",
    items: [
      {
        title: "Measurement strategy & foundations",
        body: "Define the business questions, KPIs, data requirements and measurement framework required to support useful decisions."
      },
      {
        title: "Analytics, tracking & data quality",
        body: "Audit and improve the data being collected so decisions are not built on missing, duplicated or misleading signals."
      },
      {
        title: "Dashboards, reporting & decision views",
        body: "Bring relevant information together in clear views designed around the decisions different stakeholders actually need to make."
      },
      {
        title: "Attribution, analysis & growth insight",
        body: "Analyse performance across channels and customer journeys to understand contribution, identify change and inform what to test or invest in next."
      }
    ]
  },
  measure: {
    eyebrow: "What we measure",
    heading: "Measure what matters to the decision",
    body: "The right metric depends on the question being asked. Growth Intelligence starts with the decision — then works backwards to the evidence needed to support it.",
    // Examples, not a universal KPI set — which the note says on the page.
    metrics: [
      "Qualified demand",
      "Conversion efficiency",
      "Customer acquisition cost",
      "Pipeline contribution",
      "Revenue contribution where attributable",
      "Retention / repeat behaviour where relevant",
      "Channel efficiency",
      "Incremental effect where measurable"
    ],
    note: "The right metric depends on the decision being made."
  },
  // No `practice`: there is no verified, service-specific Growth Intelligence
  // evidence yet, and the illustrative view above is not evidence. "Work in
  // practice" renders between measure and connections once there is.
  connections: {
    eyebrow: "How this connects",
    heading: "Growth Intelligence is the learning layer across the system",
    centre: "Marketing Analytics & Measurement",
    defaultIndex: 0,
    items: [
      {
        capability: "Strategy & Positioning",
        title: "The numbers are moving, but the strategic question is unclear",
        body: "Data does not replace deciding where the business should compete, who matters or what proposition it should own."
      },
      {
        capability: "Demand & Performance",
        title: "Performance needs optimisation",
        body: "Demand specialists use the evidence to decide what should be tested, scaled, reduced or stopped."
      },
      {
        capability: "Pipeline & Conversion",
        title: "Activity looks healthy, but opportunity isn’t progressing",
        body: "Connect marketing activity with lead quality, conversion and pipeline behaviour to identify where progress is being lost."
      }
    ]
  },
  // Growth Intelligence's own sequence, approved as a deliberate variation on
  // the family's Diagnose → Prioritise → Activate → Improve.
  process: {
    eyebrow: "How we work",
    heading: "From data to action",
    steps: [
      {
        title: "Diagnose",
        body: "Understand the business questions, current data, platforms and measurement gaps."
      },
      {
        title: "Connect",
        body: "Bring the relevant signals together and improve data quality where necessary."
      },
      {
        title: "Interpret",
        body: "Identify changes, patterns and commercially meaningful relationships."
      },
      {
        title: "Improve",
        body: "Turn insight into specific decisions, tests and measurement priorities."
      }
    ]
  },
  goodLooksLike: {
    eyebrow: "What good looks like",
    heading: "What good Growth Intelligence should achieve",
    points: [
      "Teams agree what success means before looking at dashboards.",
      "Important decisions rely on consistent, sufficiently reliable data.",
      "Reports explain change instead of merely displaying metrics.",
      "Marketing activity can increasingly be connected to downstream commercial outcomes where the data permits.",
      "Insights result in clear actions, tests or investment decisions.",
      "Stakeholders see the level of detail appropriate to the decisions they are responsible for."
    ]
  },
  cta: {
    heading: "Have plenty of data but not enough clarity?",
    body: "Start with the decisions you are trying to make — then work backwards to the evidence required.",
    label: "Build my growth plan"
  },
  faqs: {
    items: [
      {
        question: "Can you work with our existing analytics stack?",
        answer:
          "Yes. The appropriate approach should begin with the data and systems already available rather than replacing tools unnecessarily."
      },
      {
        question: "Do you build dashboards?",
        answer:
          "Yes where appropriate, but dashboarding should follow a measurement plan and a clear set of decisions rather than simply reproducing every available metric."
      },
      {
        question: "Can you help with attribution?",
        answer:
          "Yes, with the important caveat that attribution methods have limitations. The appropriate method depends on data quality, business model and the decision being made."
      },
      {
        question: "Can you work with analytics and CRM data together?",
        answer:
          "Where systems, permissions and data quality allow it, marketing and downstream customer or pipeline signals can be connected to provide a more useful view of performance."
      },
      {
        question: "Can you prove exactly which channel caused a sale?",
        answer:
          "Not always. Different measurement methods provide different types of evidence, and attribution should not be presented as perfect certainty. The objective is to build enough reliable evidence to support better decisions."
      }
    ]
  }
};

export const growthIntelligencePages: SpecialistPageConfig[] = [
  marketingAnalyticsAndMeasurement
];
