// THE GROWTH INTELLIGENCE VIEW — ILLUSTRATIVE DATA ONLY (30 Sep 2026, the
// Marketing Analytics & Measurement brief).
//
// EVERY FIGURE IN THIS FILE IS INVENTED FOR THE DEMONSTRATION. None is a
// Pixelette result, a client result or a benchmark, and the page says so in
// visible text above the view and inside it, never only in a tooltip. Do not
// reuse any of these numbers anywhere else on the site, and do not "update"
// them from a real account: the day real evidence exists it belongs in a
// "Work in practice" section with a named source, not in here.
//
// ONE SOURCE, TWO RENDERINGS. The hero's compact preview and the full view
// below it both read this file (the preview takes the first mode's KPIs and
// main series), so there is one analytics system to maintain, not two.
//
// PLAIN DATA ONLY. It is handed from the server-rendered page to client
// components, so it carries formats as descriptors rather than functions.
//
// The headline KPIs and every word of the insight copy are the brief's. The
// week-by-week series, the source splits and the mixes were written here to be
// consistent with them: the Pipeline mode's weekly leads sum to 312 and its
// weekly opportunities to 96, and each mode's bars and ring tell the same
// story its insight panel tells.

export type GrowthModeKey = "growth" | "efficiency" | "pipeline";

/** How a number is printed: prefix + fixed decimals + suffix. */
export interface NumberFormat {
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface GrowthKpi extends NumberFormat {
  label: string;
  value: number;
  /** Printed as written: "+18% vs prior period", "Illustrative only". */
  delta: string;
  /** Draws the arrow beside the delta. "none" draws nothing. */
  trend: "up" | "down" | "none";
}

export interface GrowthSeries {
  name: string;
  values: number[];
}

export interface GrowthLineChart {
  title: string;
  /** What the y-axis is, in words, shown under the title. */
  unitNote: string;
  format: NumberFormat;
  /** Exactly two: the first is drawn burgundy (primary), the second pink. */
  series: [GrowthSeries, GrowthSeries];
}

export interface GrowthBars {
  title: string;
  unitNote: string;
  format: NumberFormat;
  /** The scale's top. Omit to take the largest value plus headroom. */
  max?: number;
  items: { label: string; value: number }[];
  /** Bars the insight is about: drawn pink AND tagged in text. */
  focus: string[];
}

export interface GrowthMix {
  title: string;
  /** The caveat printed under the ring. */
  note: string;
  /** Percentages, summing to 100, in the fixed source order. */
  items: { label: string; value: number }[];
}

export interface GrowthInsight {
  heading: string;
  body: string;
}

export interface GrowthMode {
  key: GrowthModeKey;
  label: string;
  kpis: [GrowthKpi, GrowthKpi, GrowthKpi];
  line: GrowthLineChart;
  bars: GrowthBars;
  mix: GrowthMix;
  changed: GrowthInsight;
  matters: GrowthInsight;
  next: GrowthInsight;
  decision: string;
}

export interface GrowthDemoConfig {
  eyebrow: string;
  heading: string;
  /** Visible, always. The brief's condition for showing any figure at all. */
  qualification: string;
  /** Twelve x-axis labels, shared by every mode so the lines can morph. */
  periods: string[];
  modes: [GrowthMode, GrowthMode, GrowthMode];
}

const WEEKS = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);

// The same four sources, in the same order, in every mode, so a bar or a ring
// segment keeps its place (and its colour) when the question changes.
const SOURCES = ["Organic", "Paid search", "Email", "Paid social"] as const;
const bySource = (values: [number, number, number, number]) =>
  SOURCES.map((label, i) => ({ label, value: values[i] }));

export const growthIntelligenceDemo: GrowthDemoConfig = {
  eyebrow: "See how we turn data into a decision",
  heading: "The Growth Intelligence view",
  qualification: "Illustrative data — demonstration only",
  periods: WEEKS,
  modes: [
    {
      key: "growth",
      label: "Growth",
      kpis: [
        {
          label: "Qualified demand",
          value: 184,
          delta: "+18% vs prior period",
          trend: "up"
        },
        {
          label: "Pipeline influenced",
          value: 286,
          prefix: "£",
          suffix: "k",
          delta: "+24%",
          trend: "up"
        },
        {
          label: "Conversion rate",
          value: 4.6,
          suffix: "%",
          decimals: 1,
          delta: "+0.8pp",
          trend: "up"
        }
      ],
      // Two measures of different scale, so both are indexed to week 1 rather
      // than drawn against two y-axes.
      line: {
        title: "Qualified demand and pipeline momentum",
        unitNote: "Indexed, week 1 = 100",
        format: {},
        series: [
          {
            name: "Pipeline influenced",
            values: [100, 103, 101, 107, 110, 114, 113, 119, 124, 127, 131, 136]
          },
          {
            name: "Qualified demand",
            values: [100, 102, 101, 104, 106, 108, 107, 111, 113, 114, 116, 118]
          }
        ]
      },
      bars: {
        title: "Qualified opportunity by source",
        unitNote: "Share of qualified opportunity, %",
        format: { suffix: "%" },
        max: 50,
        items: bySource([36, 31, 19, 14]),
        focus: ["Organic", "Paid search"]
      },
      mix: {
        title: "Illustrative contribution mix",
        note: "One modelled view of contribution — an estimate, not proof of cause.",
        items: bySource([34, 30, 20, 16])
      },
      changed: {
        heading: "Qualified pipeline is accelerating",
        body: "Qualified opportunity increased faster than total enquiry volume, suggesting better quality rather than simply more activity."
      },
      matters: {
        heading: "Growth quality is improving",
        body: "Organic search and paid search are producing a larger share of qualified opportunity than lower-intent channels."
      },
      next: {
        heading: "Protect the strongest sources",
        body: "Investigate what changed in Search and Email before increasing spend elsewhere."
      },
      decision: "Protect high-quality growth before chasing more volume"
    },
    {
      key: "efficiency",
      label: "Efficiency",
      kpis: [
        {
          label: "Marketing spend",
          value: 42.6,
          prefix: "£",
          suffix: "k",
          decimals: 1,
          delta: "+6%",
          trend: "up"
        },
        {
          label: "Cost per qualified opportunity",
          value: 231,
          prefix: "£",
          delta: "-12%",
          trend: "down"
        },
        {
          label: "Potential inefficient spend",
          value: 7.4,
          prefix: "£",
          suffix: "k",
          decimals: 1,
          delta: "Illustrative only",
          trend: "none"
        }
      ],
      line: {
        title: "Efficiency by channel over time",
        unitNote: "Cost per qualified opportunity, £ — lower is better",
        format: { prefix: "£" },
        series: [
          {
            name: "Search & Email",
            values: [238, 232, 228, 221, 214, 209, 204, 199, 193, 190, 186, 181]
          },
          {
            name: "Paid Social",
            values: [250, 256, 262, 270, 281, 289, 297, 306, 318, 326, 337, 348]
          }
        ]
      },
      bars: {
        title: "Relative channel efficiency",
        unitNote: "Efficiency index, blended average = 100",
        format: {},
        max: 160,
        items: bySource([131, 112, 138, 61]),
        focus: ["Paid social"]
      },
      mix: {
        title: "Illustrative spend mix",
        note: "Paid Social takes the largest share of spend in this example while showing the weakest efficiency.",
        items: bySource([14, 38, 7, 41])
      },
      changed: {
        heading: "Paid Social efficiency weakened",
        body: "Spend increased while qualified opportunity remained broadly flat."
      },
      matters: {
        heading: "More spend is not producing proportional value",
        body: "Marginal performance appears to be deteriorating faster in Paid Social than in Search or Email."
      },
      next: {
        heading: "Review audience and creative",
        body: "Test whether targeting, creative fatigue or journey performance is contributing before increasing budget."
      },
      decision: "Fix efficiency before scaling spend"
    },
    {
      key: "pipeline",
      label: "Pipeline",
      kpis: [
        { label: "Qualified leads", value: 312, delta: "+9%", trend: "up" },
        { label: "Opportunities", value: 96, delta: "+15%", trend: "up" },
        {
          label: "Median time to opportunity",
          value: 11,
          suffix: " days",
          delta: "-3 days",
          trend: "down"
        }
      ],
      line: {
        title: "Lead progression and opportunity creation",
        unitNote: "Per week, count",
        format: {},
        series: [
          {
            name: "Qualified leads",
            values: [24, 25, 24, 26, 25, 27, 26, 27, 28, 26, 27, 27]
          },
          {
            name: "Opportunities",
            values: [6, 7, 6, 7, 8, 8, 8, 9, 9, 9, 10, 9]
          }
        ]
      },
      bars: {
        title: "Opportunity rate by source",
        unitNote: "Qualified leads reaching opportunity, %",
        format: { suffix: "%" },
        max: 50,
        items: bySource([38, 29, 42, 17]),
        focus: ["Organic", "Email"]
      },
      mix: {
        title: "Illustrative pipeline source mix",
        note: "Share of opportunities by first recorded source — one view, not the whole journey.",
        items: bySource([32, 27, 26, 15])
      },
      changed: {
        heading: "Lead-to-opportunity progression improved",
        body: "A greater share of qualified leads is reaching opportunity stage and doing so more quickly."
      },
      matters: {
        heading: "Not all lead sources are equal",
        body: "Organic and Email may create fewer leads than some channels but a higher proportion progress into pipeline."
      },
      next: {
        heading: "Investigate source quality",
        body: "Direct more attention towards the sources and journeys producing stronger opportunity rates."
      },
      decision: "Optimise for opportunity quality, not lead volume"
    }
  ]
};

export function formatNumber(value: number, format: NumberFormat = {}): string {
  const { prefix = "", suffix = "", decimals = 0 } = format;
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
}
