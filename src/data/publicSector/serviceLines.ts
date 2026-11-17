/** Plan §10.3 — five Market B service lines, same five-part structure. */

export interface MarketBServiceLine {
  path: string;
  title: string;
  h1: string;
  objective: string;
  whatWeDo: string;
  howMeasured: string;
  conditions: string;
  notYetDone: string;
  /** Extra paragraph after conditions, when the plan supplies one. */
  extra?: string;
}

export const marketBServiceLines: MarketBServiceLine[] = [
  {
    path: "/public-sector/campaigns-and-public-awareness",
    title: "Campaigns and public awareness",
    h1: "Campaigns for uptake, understanding and behaviour change",
    objective:
      "The objective is rarely a purchase. It is a booking, an application, a registration, a response, or a change in what people do.",
    whatWeDo:
      "Objective and audience definition; message development and testing; channel planning across earned, owned and paid; creative and production; delivery and optimisation; evaluation through the six stages.",
    howMeasured:
      "Reach within the specific population that matters rather than reach in general; comprehension and recall; stated intention; the behaviour itself, against a recorded baseline; cost per person reached and per person who acted.",
    conditions:
      "Accessible creative and content as standard. Where a campaign involves children or young people, our safeguarding position applies.",
    notYetDone:
      "We have delivered integrated campaigns commercially, published with sources at /results. We have not yet delivered a public awareness campaign under this company name."
  },
  {
    path: "/public-sector/digital-communications",
    title: "Digital communications",
    h1: "Digital communications that meet the standard you are held to",
    objective:
      "Content and channels people can actually use — including the people most likely to be excluded by the version you have now.",
    whatWeDo:
      "Content strategy and information architecture; writing for public audiences in plain English; accessible content production; search and findability; channel management; measurement.",
    howMeasured:
      "Task completion, findability, accessibility conformance, and whether people reach the information they came for.",
    conditions:
      "We work to WCAG 2.2 AA, which is the standard GOV.UK guidance names for compliance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018. Our own position is published at /accessibility.",
    notYetDone:
      "No public-sector digital engagement under this name yet. Our own site's conformance position is published rather than asserted, which is the most direct evidence available.",
    extra:
      "HTML is our default output. PDFs are produced accessibly when a PDF is genuinely needed — GOV.UK guidance tells public bodies that new PDFs and documents must be made accessible, and names inaccessible PDF forms that cannot be read out on screen readers among common problems."
  },
  {
    path: "/public-sector/community-engagement",
    title: "Community engagement",
    h1: "Reaching the people a consultation needs to hear from",
    objective:
      "A consultation or engagement exercise whose response base actually reflects the population affected — not just the people who always reply.",
    whatWeDo:
      "Engagement strategy; audience and barrier analysis; accessible materials in appropriate formats and languages; promotion through trusted local channels; response monitoring and gap-filling during the window; analysis and reporting.",
    howMeasured:
      "Response volume against target, and more importantly response representativeness against the population profile; which groups are under-represented and what was done about it.",
    conditions:
      "Data protection — lawful basis, processing terms, and a DPIA where personal or special-category data is involved. Accessibility of every material.",
    notYetDone:
      "No consultation support delivered under this name. The method is set out above and we will walk through it before you commission anything."
  },
  {
    path: "/public-sector/internal-and-change-communications",
    title: "Internal and change communications",
    h1: "Staff communications when something is actually changing",
    objective:
      "Staff who understand a change, know what it means for them, and are not finding out from somewhere else first.",
    whatWeDo:
      "Change communications planning; message development and manager cascade materials; channel assessment; listening and feedback loops; measurement of understanding rather than of distribution.",
    howMeasured:
      "Reach across the whole workforce including people without a desk or an email address; understanding, tested rather than assumed; feedback volume and theme; where messages stalled.",
    conditions:
      "Confidentiality, and care with personal data in staff listening exercises.",
    notYetDone:
      "No public-sector internal communications engagement under this name."
  },
  {
    path: "/public-sector/education-marketing",
    title: "Education marketing",
    h1: "Admissions, engagement and participation for schools, trusts and colleges",
    objective:
      "Applications and admissions, parent and community engagement, participation, and staff recruitment in a tight market.",
    whatWeDo:
      "Admissions and open-event campaigns; parent and carer engagement, including the parents who do not read the newsletter; prospectus and website content; local search and findability; staff recruitment campaigns; sixth-form, college and course recruitment; evaluation.",
    howMeasured:
      "Enquiries, open-event attendance and conversion to application, by catchment and by feeder school; engagement reach across the parent body rather than among the already-engaged; applications per pound spent.",
    conditions:
      "Safeguarding is a condition of entry, not an afterthought — our position is established before any work involving children or young people, including the DBS position for anyone with access, whether employed or engaged as a specialist. Data protection applies to pupil and parent data. On accessibility, a school's own website is partially exempt from the 2018 regulations except for content people need in order to use its services, and we will tell you which of your content that covers.",
    notYetDone:
      "No school, trust or college engagement delivered under this name. Education and training is one of the eight markets we work in commercially; the public education reading is new."
  }
];
