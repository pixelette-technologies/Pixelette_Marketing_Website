// The About page copy, 21 September 2026.
//
// ONE FILE, for the same reason homeContent.ts is one file: it is one copy
// document, so a reviewer checking the wording opens one file rather than six
// and no TSX stands between them and the words.
//
// Eyebrows are stored in sentence case. .eyebrow carries text-transform:
// uppercase, so they render as specified without this file having to shout at
// whoever is proofreading it. The .h2 headings take their capital from the
// ::first-letter rule in _type.
//
// WHAT THIS PAGE MAY NOT SAY. The instruction that produced it bars any claim
// about headcount, offices, staff or client relationships that the existing
// material does not already establish, and bars the agency clichés with it.
// So there are no people here, no numbers, and the logo strip keeps the
// ecosystem wording rather than claiming delivery. The operating model is
// stated positively — lean, specialist, capability-led — because that is what
// is true, not because the stronger claim was unavailable.
//
// The four capability areas carry NO descriptions. None were supplied, and the
// house content rule is to ship the pattern without the missing element rather
// than invent one — the same call GrowthSection made when it had no eyebrow.

/** Every call to action on this page lands on the enquiry form. One constant,
 *  so they move together if that route ever moves. */
export const CONTACT_HREF = "/contactus";

// --- 01 Hero ----------------------------------------------------------------
// The headline is split so the payoff takes the brand tone, which is the
// guide's own hero device and what HomeHero already does.

export const aboutHero = {
  eyebrow: "About Pixelette Marketing",
  headingLead: "Marketing built around",
  headingAccent: "measurable growth.",
  lead: "Pixelette Marketing brings strategy, creative thinking, technology and performance together to help ambitious businesses turn attention into commercial outcomes.",
  cta: { label: "Start a conversation", to: CONTACT_HREF }
};

// --- 02 Who we are / How we work --------------------------------------------
// Two statements of equal weight, so neither is the section heading and both
// are. The section therefore has no header of its own.

export const aboutIdentity = [
  {
    eyebrow: "Who we are",
    heading: "Built to make marketing work as one.",
    body: "We believe effective marketing should connect strategy, execution and commercial results. Pixelette Marketing was created to remove the fragmentation between different marketing disciplines and give businesses a clearer route from idea to outcome."
  },
  {
    eyebrow: "How we work",
    heading: "The right capabilities around the right challenge.",
    body: "Our model is deliberately lean. We structure each engagement around the capabilities the brief requires, with clear ownership, measurable objectives and one joined-up direction."
  }
];

// --- 03 Capability model ----------------------------------------------------

export const aboutCapabilities = {
  eyebrow: "How we build",
  heading: "Built around the brief, not the org chart.",
  lead: "Different challenges need different expertise. Our delivery model brings the right capabilities around each engagement rather than forcing every client through a fixed agency structure.",
  items: [
    { index: "01", title: "Strategy & positioning" },
    { index: "02", title: "Creative & content" },
    { index: "03", title: "Demand & acquisition" },
    { index: "04", title: "Technology & AI" }
  ]
};

// --- 04 Principles ----------------------------------------------------------

export const aboutPrinciples = {
  eyebrow: "Our principles",
  heading: "What guides the work.",
  items: [
    {
      title: "Commercially focused",
      body: "Marketing should contribute to a business outcome."
    },
    {
      title: "Clear by design",
      body: "Strategy should make decisions simpler, not more complicated."
    },
    {
      title: "Specialist by nature",
      body: "The right expertise matters more than unnecessary headcount."
    },
    {
      title: "Built to evolve",
      body: "We combine established marketing principles with new technology and AI."
    }
  ]
};

// --- 05 Selected experience -------------------------------------------------
// The logo strip's own claim, and it is deliberately weaker than the home
// page's. The set includes portfolio ventures and group work, so the sentence
// says ecosystem rather than client list. Nothing here asserts that Pixelette
// Marketing delivered to every brand shown.

export const aboutExperience = {
  eyebrow: "Selected experience",
  heading: "Experience across the Pixelette ecosystem.",
  standfirst:
    "Selected brands and ventures connected with work across our wider group and network."
};

// --- 06 Close ---------------------------------------------------------------
// The network line is the page's quietest element on purpose. It is .small,
// it sits in the narrow column, and it reads as selective rather than as
// recruitment.

export const aboutClose = {
  eyebrow: "Work with us",
  heading: "Have an ambitious growth challenge?",
  lead: "Tell us where you want to go. We’ll help define the smartest route to get there.",
  cta: { label: "Start a conversation", to: CONTACT_HREF },
  network: {
    body: "Building something exceptional? We are also developing our specialist network across strategy, creative, performance, technology and AI.",
    link: { label: "Introduce yourself →", to: CONTACT_HREF }
  }
};
