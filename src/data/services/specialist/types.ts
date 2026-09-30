// The shape of a specialist service page (30 Sep 2026, the Demand &
// Performance specialist pages brief; shared with the Search & Authority
// specialist page, built alongside it).
//
// ONE CONFIG PER ROUTE, ONE COMPONENT FOR ALL OF THEM. The Demand &
// Performance pages used to be four copies of the eight-section legacy
// template, each carrying its own catalogue of fifteen to twenty-five service
// cards. They are now one structure, SpecialistServicePage, fed by one of
// these. The ORDER is fixed by the brief and is not a prop:
//
//   01 hero · 02 when this earns its place · 03 what we actually do ·
//   04 what we measure · [work in practice, only when evidence exists] ·
//   05 how this connects · 06 how we work · 07 what good looks like ·
//   08 CTA · 09 FAQ
//
// THE COUNTS THE BRIEF FIXES ARE TUPLES: exactly three situations, exactly
// four service groups, exactly three connections, exactly four stages. A
// fourth situation fails the type check instead of rendering.
//
// EVERY SECTION'S EYEBROW AND FRAMING IS OPTIONAL and defaults to the brief's
// wording (see SPECIALIST_DEFAULTS in SpecialistServicePage). A page overrides
// one only when its own brief says something different.

export interface SpecialistItem {
  title: string;
  body: string;
}

export interface SpecialistConnection {
  /** The adjacent capability, as it is named in the capability model or as a
   *  specialist page's display label: "Growth Intelligence". */
  capability: string;
  /** The constraint, in a few words: "Traffic arrives but does not convert". */
  title: string;
  body: string;
}

export interface SpecialistFaqItem {
  question: string;
  answer: string;
}

/** A section's framing. With no heading, the eyebrow is set as the display
 *  heading itself, so a section never ships a heading written to fill a gap. */
export interface SpecialistSectionHead {
  eyebrow?: string;
  heading?: string;
  intro?: string;
}

export interface SpecialistPageConfig {
  /** The existing URL slug under /services. Never changes. */
  route: string;
  /** The capability this page sits under: "Demand & Performance". */
  capability: string;
  /** The display label. MUST equal the servicesData title for the route,
   *  which the nav, the /services explorer and the footer read; the index
   *  asserts it. */
  label: string;

  meta: { title: string; description: string };

  hero: {
    /** Defaults to "{capability} / {label}". */
    eyebrow?: string;
    /** One line, or two lines of equal size told apart by colour (near-black,
     *  then burgundy), the way /strategy-positioning sets its pair. */
    heading: string | { lead: string; accent: string };
    lead: string;
  };

  earnsItsPlace: SpecialistSectionHead & {
    heading: string;
    items: [SpecialistItem, SpecialistItem, SpecialistItem];
    /** The sentence before the Industries link. Defaults to "Different
     *  markets behave differently." */
    market?: string;
  };


  services: SpecialistSectionHead & {
    items: [SpecialistItem, SpecialistItem, SpecialistItem, SpecialistItem];
  };

  measure: SpecialistSectionHead & {
    heading: string;
    body: string;
    /** Labels only. Never a figure: the brief bars invented numbers here. */
    metrics: string[];
    /** A line set under the metrics, e.g. that they are examples. */
    note?: string;
  };

  /** "Work in practice". Rendered between measure and connections ONLY when
   *  present, and it must only be present with verified, service-specific,
   *  attributable evidence. No page has any today. */
  practice?: SpecialistSectionHead & {
    heading: string;
    items: SpecialistItem[];
  };

  connections: SpecialistSectionHead & {
    /** The label in the centre. Defaults to the page's label. */
    centre?: string;
    items: [SpecialistConnection, SpecialistConnection, SpecialistConnection];
    /** Which node is selected on load. Defaults to 0, the brief's rule. */
    defaultIndex?: 0 | 1 | 2;
  };

  /** Defaults to Diagnose → Prioritise → Activate → Improve. */
  process?: SpecialistSectionHead & {
    steps?: [SpecialistItem, SpecialistItem, SpecialistItem, SpecialistItem];
  };

  goodLooksLike: SpecialistSectionHead & {
    heading: string;
    points: string[];
  };

  /** Defaults to "Have a demand problem worth solving?" → Build my growth plan. */
  cta?: {
    heading: string;
    body: string;
    label?: string;
    href?: string;
  };

  faqs: SpecialistSectionHead & {
    items: SpecialistFaqItem[];
  };
}
