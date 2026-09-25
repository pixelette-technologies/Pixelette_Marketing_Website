import type { FC } from "react";
import {
  Ahrefs,
  Apollo,
  Buffer,
  Calendly,
  Canva,
  CoSchedule,
  Grammerly,
  HotJar,
  LinkedIn,
  Loom,
  MailChimp,
  Semrush,
  Sprout
} from "@/assets/common";

// NOT RENDERED ANYWHERE SINCE 25 SEP 2026. The band came off /services under
// the final correction pass: the list is unconfirmed, and an absent stack is
// better than an incomplete or misleading one. Kept so it can return tool by
// tool once management confirms what is actually in use.
//
// "Tools we work in" — the old site's "Our range of marketing tech and
// platforms" band, back on /services rather than on the home page.
//
// NEEDS CONFIRMING BY MANAGEMENT BEFORE LAUNCH. Nobody at Pixelette has signed
// this list off. It is the old band's fifteen, less two, plus one:
//
//  - PyTorch is out. It is a machine-learning framework, not marketing
//    tooling, and on a marketing services page it reads as a claim about ML
//    work that nothing else on the site makes.
//  - Jira is out. It is project management, not a marketing platform, and the
//    old band showed it twice.
//  - Google Analytics 4 is in. It is the one tool here we can prove is in use:
//    this site loads its own GA4 property.
//
// Both exclusions are pending the same confirmation — either can come back if
// management wants it named. Its mark is still in assets/common.
//
// THE WORDING IS "WORK IN" AND NOTHING STRONGER. No "partners", "certified",
// "official" or "trusted by": a subscription is not a partnership, and naming a
// vendor next to one of those words claims a relationship nobody has evidence
// for. Any copy added to this file is held to the same rule.
//
// 24 Sep this was a list of names in text inside Growth Intelligence. 25 Sep it
// became a band on the client-logo device, on instruction — the same dark
// ground, the same white marks, the same marquee. The marks are the old band's
// own knockout-white artwork, which is why it has to be dark. See
// TrustedBrands for the device and _marquee.scss for the motion exception it
// already covered ("the client-logo strip and the platform strip").

export const toolsBandCopy = {
  eyebrow: "Tools we work in",
  heading: "The platforms behind the work",
  standfirst:
    "The software our team works in day to day, across analytics, search, email and outreach, social and content."
};

export interface Tool {
  /** The name as the vendor writes it. Announced to screen readers. */
  name: string;
  /** Null where there is no mark in the repo — rendered as a wordmark. */
  Mark: FC | null;
}

// Ordered by job, so the strip moves from measurement through search and
// outreach to content and workflow rather than landing vendors at random.
export const tools: Tool[] = [
  // There is no GA4 mark in the repo and none has been drawn or downloaded;
  // it renders as a wordmark in the band's own type.
  { name: "Google Analytics 4", Mark: null },
  { name: "Hotjar", Mark: HotJar },
  { name: "Semrush", Mark: Semrush },
  { name: "Ahrefs", Mark: Ahrefs },
  { name: "Mailchimp", Mark: MailChimp },
  { name: "Apollo.io", Mark: Apollo },
  { name: "LinkedIn", Mark: LinkedIn },
  { name: "Sprout Social", Mark: Sprout },
  { name: "Buffer", Mark: Buffer },
  { name: "CoSchedule", Mark: CoSchedule },
  { name: "Canva", Mark: Canva },
  { name: "Grammarly", Mark: Grammerly },
  { name: "Loom", Mark: Loom },
  { name: "Calendly", Mark: Calendly }
];
