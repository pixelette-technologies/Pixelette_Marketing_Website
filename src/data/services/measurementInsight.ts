// Measurement & Insight — approved design (22 Nov 2026 handoff).
// Rendered only on /services/marketing_analytics_and_reporting.
// Chart figures are a local demonstration. They are not client results.
// "Paid Media +33% vs previous period" is the chart annotation (A8 corrected
// from the handoff's +28%, which did not match the demonstration series)
// in the performance view. It is not calculated from the bars.

export const measurementInsightMeta = {
  title: "Marketing Analytics & Measurement | Pixelette Marketing",
  description:
    "Marketing analytics and measurement designed to connect performance, customer and pipeline data and turn evidence into clearer commercial decisions.",
  keywords:
    "marketing analytics, marketing measurement, attribution, marketing reporting"
} as const;

export type MeasurementStageId = "performance" | "opportunities" | "decisions";
export type MeasurementRangeId = "30" | "90" | "365";

export type MeasurementChannel = {
  name: string;
  color: string;
};

export const measurementChannels: MeasurementChannel[] = [
  { name: "Paid media", color: "#b3063c" },
  { name: "Organic", color: "#8c0430" },
  { name: "Social", color: "#4b1635" },
  { name: "Email", color: "#c43a5c" },
  { name: "Web", color: "#6e0a2e" }
];

export const measurementRanges: {
  id: MeasurementRangeId;
  label: string;
  multiplier: number;
}[] = [
  { id: "30", label: "30 days", multiplier: 1 },
  { id: "90", label: "90 days", multiplier: 1.08 },
  { id: "365", label: "12 months", multiplier: 0.95 }
];

export type MeasurementStage = {
  id: MeasurementStageId;
  number: string;
  label: string;
  title: string;
  subtitle: string;
  conclusion: string;
  description: string;
  /** Previous period, then current period, in channel order. */
  values: [number, number][];
};

export const measurementStages: MeasurementStage[] = [
  {
    id: "performance",
    number: "01",
    label: "Understand performance",
    title: "A clearer view of performance",
    subtitle: "Compare signals across your marketing channels",
    conclusion: "Understand what’s working",
    description:
      "Bring performance information together in one place so the important patterns are easier to recognise",
    values: [
      [39, 52],
      [51, 66],
      [46, 61],
      [33, 42],
      [55, 69]
    ]
  },
  {
    id: "opportunities",
    number: "02",
    label: "Spot opportunities",
    title: "Find the opportunities worth exploring",
    subtitle:
      "Compare how engagement and qualified response vary across channels",
    conclusion: "Spot opportunities",
    description:
      "Identify the signals that deserve attention before deciding where to invest further",
    values: [
      [41, 53],
      [35, 59],
      [61, 65],
      [44, 55],
      [47, 69]
    ]
  },
  {
    id: "decisions",
    number: "03",
    label: "Make smarter decisions",
    title: "Turn findings into a clearer direction",
    subtitle:
      "See which channels merit closer investigation and next-step action",
    conclusion: "Make smarter decisions",
    description:
      "Use the evidence to prioritise activity and focus on meaningful commercial outcomes",
    values: [
      [38, 53],
      [42, 60],
      [45, 58],
      [31, 47],
      [50, 67]
    ]
  }
];

export const measurementInsightContent = {
  hero: {
    eyebrow: "Measurement & Insight",
    lineOne: "Know what’s working",
    lineTwo: "Know what to do next",
    lead: "Bring together the right data from multiple sources to see a clearer picture of your marketing performance",
    cta: { label: "Discuss your project", href: "/contactus" },
    artAlt:
      "A diverse audience, social, content and search images flowing into a circular multicoloured graphic that reads A clearer picture"
  },
  explore: {
    eyebrow: "Explore the insight",
    heading: "See what the data is telling you",
    lead: "Explore performance across your marketing channels, identify opportunities and make more informed decisions",
    example: "Paid Media +33%",
    exampleNote: "vs previous period",
    illustrativeCaption: "Illustrative example"
  },
  capabilities: {
    eyebrow: "What we bring together",
    heading: "Measurement that helps you see the whole picture",
    items: [
      {
        title: "Measurement strategy",
        body: "Define the right goals, indicators and measurement approach"
      },
      {
        title: "Tracking & data quality",
        body: "Establish reliable data across platforms and channels"
      },
      {
        title: "Reporting & dashboards",
        body: "Make performance information easier to understand and use"
      },
      {
        title: "Attribution & insight",
        body: "Explore what is driving results and where to focus next"
      }
    ]
  },
  close: {
    eyebrow: "From information to action",
    heading: "Turn insight into commercial impact",
    lead: "Bring clarity to your marketing performance and confidence to your next decision",
    cta: { label: "Discuss your project", href: "/contactus" }
  },
  // Answers reuse the existing Measurement page. Questions are the approved set.
  faqs: {
    eyebrow: "Useful questions",
    heading: "What you might want to know",
    items: [
      {
        question: "Can you work with our existing marketing platforms?",
        answer:
          "Yes. The appropriate approach should begin with the data and systems already available rather than replacing tools unnecessarily."
      },
      {
        question: "How do you make sure our data is reliable?",
        answer:
          "We audit and improve the data being collected so decisions are not built on missing, duplicated or misleading signals."
      },
      {
        question: "Can you combine information from different channels?",
        answer:
          "Where systems, permissions and data quality allow it, marketing and downstream customer or pipeline signals can be connected to provide a more useful view of performance."
      },
      {
        question: "Will you explain what the findings mean?",
        answer:
          "We identify changes, patterns and commercially meaningful relationships, then turn insight into specific decisions, tests and measurement priorities."
      }
    ]
  }
} as const;
