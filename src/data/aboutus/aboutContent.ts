// The About page copy. Rewritten 30 September 2026 to the final About page
// brief, which supersedes every earlier About instruction.
//
// ONE FILE, for the same reason homeContent.ts is one file: it is one copy
// document, so a reviewer checking the wording opens one file rather than six
// and no TSX stands between them and the words.
//
// THE PAGE ANSWERS THREE QUESTIONS AND NO MORE: why Pixelette Marketing
// exists, how it differs from a channel-led agency, and what working with it
// feels like. Six sections, locked: hero, why we exist, how we're built, what
// guides the work, part of the wider group, close. The capability model, the
// who-we-are / how-we-work pair and the ecosystem logo strip came off.
//
// Every string below is the brief's verbatim, except the one line marked
// under "How we're built".
//
// Eyebrows are stored in sentence case. .eyebrow carries text-transform:
// uppercase, so they render as specified without this file having to shout at
// whoever is proofreading it.
//
// WHAT THIS PAGE MAY NOT SAY: no headcount, no team, no offices, no client
// claims, no agency clichés. The operating model is the story.

/** Every call to action on this page lands on the enquiry form. One constant,
 *  so they move together if that route ever moves. */
export const CONTACT_HREF = "/contactus";

// --- 01 Hero ----------------------------------------------------------------
// Two lines: the statement in near-black, the turn in burgundy.

export const aboutHero = {
  eyebrow: "About Pixelette Marketing",
  headingLead: "Built around the challenge,",
  headingAccent: "not the channel",
  lead: "Pixelette Marketing brings strategy, creative thinking, technology and performance together around the commercial problem in front of us. We shape the team and the approach around what the work actually needs.",
  cta: { label: "Start a conversation", to: CONTACT_HREF }
};

// --- 02 Why we exist --------------------------------------------------------
// The five capabilities are NOT listed here. /services owns them; this
// section points at it.

export const aboutWhy = {
  eyebrow: "Why we exist",
  heading: "Marketing works better when the pieces work together",
  body: [
    "Channels rarely fail in isolation. A demand problem may begin with positioning. A traffic problem may actually be conversion. Reporting may reveal that the real constraint sits somewhere else entirely.",
    "Pixelette Marketing is organised around connected capabilities so we can start with the problem rather than force every brief through a predefined service."
  ],
  link: { label: "See how our capabilities connect →", to: "/services" }
};

// --- 03 How we're built -----------------------------------------------------
// The page's one interaction: four stages on a line, with a signal that runs
// through once. See BuiltFlow.tsx.

export const aboutBuilt = {
  eyebrow: "How we’re built",
  heading: "Built around the brief",
  // WRITTEN HERE, not supplied. The brief gives this section a heading and four
  // stage names, and says the section must communicate that the team is
  // assembled around the brief rather than a fixed org chart. This is that
  // sentence, in the brief's own words as far as they go. Delete it and the
  // section still stands.
  lead: "We assemble the team around the brief, not around a fixed org chart.",
  stages: [
    "Understand the challenge",
    "Bring in the right specialists",
    "Work as one team",
    "Measure and improve"
  ]
};

// --- 04 What guides the work ------------------------------------------------

export const aboutPrinciples = {
  eyebrow: "Our principles",
  heading: "What guides the work",
  items: [
    {
      title: "Commercially focused",
      body: "Marketing should connect to a business objective."
    },
    {
      title: "Clear by design",
      body: "Good strategy should make decisions easier."
    },
    {
      title: "Specialist by nature",
      body: "Each brief gets the expertise it actually needs."
    },
    {
      title: "Built to evolve",
      body: "We combine established marketing principles with new technology and AI where they improve the work."
    }
  ]
};

// --- 05 Part of the wider Pixelette Group ------------------------------------
// Text only. No logos: group companies are not client proof.
//
// NO "Explore the wider Pixelette Group →" LINK. The brief makes it
// conditional on a valid destination, and there is none: there is no group
// site, only the three sister companies' own, and the footer's group band that
// would have been the on-site answer is hidden (22 Sep 2026).

export const aboutGroup = {
  eyebrow: "Part of the wider Pixelette Group",
  heading: "Marketing that can connect with more than marketing",
  body: "Pixelette Marketing sits within the wider Pixelette Group. Where the brief genuinely requires it, marketing work can connect with broader product, software, AI and automation or assurance capability across the group."
};

// --- 06 Close ---------------------------------------------------------------
// One call to action, and the site's primary label for it.

export const aboutClose = {
  heading: "Have a challenge worth working through?",
  lead: "Start with the problem. We’ll help work out what needs to move.",
  cta: { label: "Build my growth plan", to: CONTACT_HREF }
};

// --- Not rendered on /aboutus -------------------------------------------------
// The ecosystem logo strip's claim. It came off this page on 30 Sep 2026, but
// homeContent.ts (and through it the service pages' strip) still reads it, so
// it stays here until those call sites are moved. Nothing on /aboutus uses it.

export const aboutExperience = {
  eyebrow: "Selected experience",
  heading: "Experience across the Pixelette ecosystem.",
  standfirst:
    "Selected brands and ventures connected with work across our wider group and network."
};
