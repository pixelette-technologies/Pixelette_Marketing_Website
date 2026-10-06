// The two client quotations. They stay VERBATIM — the brief bars rewriting a
// testimonial for sales effect, and management re-sent both unchanged on
// 11 Sep 2026 alongside the case studies they came from.
//
// They are exported individually as well as in the array because they now have
// two call sites that must never drift: TeamSection, which renders the pair as
// the home page's results section, and the /results case studies, where each
// quote sits with the engagement it is actually about. One definition, two
// readers — not two copies of the same sentence.

export interface ClientQuote {
  name: string;
  role: string;
  detail: string;
  image: string;
}

export const blockGuardQuote: ClientQuote = {
  name: "Anthony Bevan",
  role: "CEO, BlockGuard",
  detail:
    "BlockGuard's launch was a success thanks to their expertise in branding and driving DeFi community engagement.",
  image: "/common/t_1.webp"
};

export const webBookingProQuote: ClientQuote = {
  name: "Ivan Petrovic",
  role: "CEO, WebBookingPro",
  detail:
    "The team's expertise positioned WebBookingPro as a trusted solution for accommodation providers worldwide.",
  image: "/common/t_3.webp"
};

const teamData: ClientQuote[] = [blockGuardQuote, webBookingProQuote];

export default teamData;
