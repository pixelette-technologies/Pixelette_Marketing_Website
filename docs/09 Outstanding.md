# 09 Outstanding

As of **22 September 2026**. Management answered the 9 Sep questions on 11 Sep;
what they cleared has been built, and what is left is below. The two blockers
at the top have not moved since 11 Sep — both need management, not code.

## Live in production and needs fixing

- **The privacy-notice link is still broken.** `NEXT_PUBLIC_CONTACT_PRIVACY_NOTICE_URL`
  is the placeholder string `asdas`. Because it is non-empty the governance
  gate **passes**, so the form renders normally and its "read the privacy
  notice" link 404s — on a form collecting names, emails and company details.
  A config value, fixable in minutes without a code change. **Highest priority.**
- **No privacy policy page exists** at all. Only `/cookie-policy`.
- Management's answer was "legal compliance, same as for Pix Tech, task for
  Asif and I". That assigns an owner but supplies no URL, so this is unchanged.
  The question to go back with: point at the Pixelette Technologies policy (if
  so, which address) or write a new one (if so, by when)?

## Still open from the brief

- **The conversion event is not wired.** The brief names the primary conversion
  event as the growth-plan enquiry submission. Google Analytics is installed
  with consent mode, but **nothing fires on successful submit**, so enquiries
  are not being counted.
- **Three quantified metrics under the logo strip** — still gated, but now on
  **timeframe alone**. See below.
- The brief's own **publication-gate checklist** — none of it done, none of it
  code.
- **Handoff item 14** — desktop and mobile QA before release. Untouched.

## Awaiting answers from management

**The only two left on the marketing site:**

1. **The privacy policy URL** (above). Blocks go-live.
2. **What period the BlockGuard figures cover.** Management supplied five
   figures with no measurement window. The brief's gate asks for measure,
   period, client and permission; three of the four are now held. Inside a case
   study the before-and-after is self-describing, so they publish there. They
   must NOT be lifted onto the home page as standalone proof numbers until
   someone states the window. Recorded in `caseStudies.ts` so the next person
   cannot take them innocently.

**Separately: the Pixelette Certified questions are unanswered.** Six were sent
covering the contracting entity and registration number, Muhammad Waleed's
status, written permission for the specialists' credentials, delivery cover per
advertised service, the 90-day support and £4,500–£8,000 audit-fee claims, and
whether a written claims register is wanted — plus the Pass First Guarantee
remediation promise. The 11 Sep reply addressed the **marketing site only**.
The contracting-entity blocker is still outstanding.

## Answered on 11 Sep — and closed

| Question | Answer | What was done |
|---|---|---|
| Can sales fulfil the three engagements as advertised? | Yes, with copy supplied | Built — see [[05 Components]] |
| Case studies | Two supplied in full | Built on `/results` — see [[07 Results and hub pages]] |
| Quote permission, Bevan and Petrovic | Accepted | Already attributed by name and company |
| Are the AI claims operational today? | Reviewed, nothing to change | No change needed |
| Are the three group companies described correctly? | Reviewed, nothing to change | No change needed |
| Is every logo a genuine client? | Permissions accepted | Home page takes "Trusted by" |
| Is Facebook maintained? | "Leave this in, there is a lot of content there" | Confirms the Phase 2 decision |

Two further items are **withdrawn rather than answered**, on the user's
instruction of 11 Sep: the interim Lead Generation summary stands as written,
and Strategy & Positioning will not get detail pages or a nav entry — it
becomes a UI question on the existing page instead.

## The group footer (18 Sep)

Rebuilt to the Pixelette Technologies footer's structure: brand-led grid,
"Part of Pixelette Group" band, legal line. Gaps, all needing management:

- **Company identity for the legal line.** Theirs shows entity name, "Registered
  in England and Wales", company number, registered office and VAT. None of
  these exist anywhere in this repo for Pixelette Marketing. The copyright line
  stands in until they are supplied.
- **Four legal pages do not exist**: Privacy Statement, Terms, Modern slavery,
  Accessibility. Their footer links all four; ours links none rather than 404.
  Privacy is the same blocker as the form's privacy link.
- **The group intro sentence** is theirs with the name swapped — needs sign-off.
- **Two sets of group descriptions now exist.** The footer uses the group's
  wording from the Technologies footer, verbatim; the home page's Wider
  Pixelette section uses the brief's shorter wording. Management approved the
  home page set on 11 Sep. Worth deciding whether they should match.

## Analytics consent — a question for legal (18 Sep)

The Google tag loads on every page before any choice. With consent refused it
sets no cookies but **can still send cookieless visit signals** to Google
(Consent Mode's standard behaviour). So the panel says "no cookies are set",
never "nothing is sent". Options, legal's call: disclose it in the cookie
policy, or load the tag only after Accept (then Off sends nothing, at the cost
of Google's modelled data for visitors who decline).

The first-visit banner still carries its own inline styles and 9px text.

## The Growth section figure (21 Sep)

The home page collage is replaced by four drawn columns, named on hover. Four
things it leaves open:

- **Nobody has signed off the shape.** Four named columns at four heights
  state an order of magnitude between Demand, Pipeline, Conversion and
  Revenue — a claim about Pixelette's own funnel. It carries no axis, tick or
  value and the hover gives a name and never a number, so nothing is
  quotable. **The moment a number is added to it, it crosses the proof-figure
  bar** and needs the same measure, period, client and permission treatment
  the BlockGuard figures are held against. Worth a line to management for
  awareness rather than for approval.
- **`public/home/growthBanner.webp` is now referenced by nothing.** Left in
  place until someone is sure the figure stays.
- **The hover names never appear on touch**, which is deliberate: they are
  redundant with the grid beside the figure, which is also why the svg is
  `aria-hidden`. **If that grid ever moves or changes, the figure loses its
  text alternative** and the decision in [[02 Decisions]] has to be reopened.
- **The hover label scales with the column** — around 20px where it is widest,
  around 11px once it has wrapped to full width on a phone. That is inherent
  to keeping text inside the viewBox. Moving the labels to HTML would pin
  them, at the cost of positioning them over the svg by hand.

## The punctuation pass is committed, and still broken (22 Sep)

**This was recorded on 21 Sep as sitting uncommitted. It is now live.** The
pass took trailing full stops off every heading, which is fine and now
consistent, and removed every hyphen used as a dash, which left six sentences
reading as dropped words. None has been fixed; they went into `main` inside
`041baa9` and `15a0bed`.

| Where | Reads |
|---|---|
| `homeContent.ts:78` | the growth constraint **not** a predetermined channel |
| `homeContent.ts:202` | more measurable **not** become the pitch |
| `homeContent.ts:317` | the outcome **with** client evidence wherever it is available |
| `homeContent.ts:365` | the channels that matter most **connecting** strategy |
| `homeContent.ts:371` | the delivery capacity you need **without** the recruitment overhead |
| `ContactUsForm.tsx:259` | Thanks **your** message has been sent |

Each needs a comma, a colon, or the dash back. The last is the sentence every
visitor who successfully submits the enquiry form is shown.

**Also live from the same pass:** `proofCopy.eyebrow` is a single space, which
renders an empty element rather than no eyebrow, and the proof heading is
"Organisation we have worked with", singular. That heading reverses the 11 Sep
"Trusted by" decision recorded in [[02 Decisions]], which was taken after
management confirmed logo permissions.

## Who we help, after the rebuild (21 Sep)

- **Eleven named markets is a claim, and nobody has signed it off.** The field
  names Technology & Software, Financial Services, Professional Services,
  Consumer & Retail, Property & Real Estate, Healthcare & Wellness, Education,
  AI & Emerging Technology, Startups & Scale-ups, Web3 & Digital Assets and
  B2B Services. "And beyond" keeps the list open, but the eleven still assert
  markets Pixelette will say it works in. Management cleared the three
  engagement descriptions and both case studies; they have not seen this.
- **"Discuss the right engagement" is my copy** — the CTA that replaced the
  three per-engagement links — and is the only line in that section management
  has not supplied.
- **The per-engagement sales signal is gone and cannot be recovered from one
  control.** See [[02 Decisions]]. Sales can no longer tell from the
  notification email which engagement a visitor came in on.
- **The section has never been seen below 767px**, which is exactly where its
  layout changes: the field becomes a column and every third mark pulls right.
  That branch has been reasoned about and not once observed.

## The About page (22 Sep)

Rebuilt to a separate instruction — six sections, no team, no industries grid.
See [[02 Decisions]]. What it leaves open:

- **The hero image was removed on my judgement, not on an instruction.** The
  instruction said keep the editorial imagery *if it still works well* and also
  barred stock marketing graphics; `heroImageAbout.webp` is a bought retro
  collage of a typewriter and handwritten letters sitting under a headline
  about measurable growth, so the two could not both be honoured. **This wants
  a yes or no.** The asset is untouched and still serves `BlogHeroSection`, so
  restoring it is one import and one `<Image>`.
- **"Introduce yourself →" lands on the ordinary enquiry form.** There is no
  network route, and no field on the form that would tell a specialist's
  introduction apart from a client enquiry once it arrives in the inbox. If
  that line is meant to produce a usable stream rather than a signal of intent,
  it needs either an option in the form's "What are you trying to improve?"
  select or a route of its own. **Whoever reads the enquiries should be told
  this is live** before the first one arrives.
- **The four capability areas carry no descriptions.** None were supplied and
  none were invented. If they are wanted, that is content, not design, and the
  section's SCSS needs nothing.
- **`public/aboutUs/at_1.webp` to `at_5.webp` are referenced by nothing** —
  the five team portraits. Left in place, exactly as `growthBanner.webp` was,
  until someone is sure the team section is not coming back.
- **The close no longer shares wording with the rest of the site.** About's is
  bespoke — *Start a conversation*, plus the network line — while the services,
  industries and story templates still close on `QuestionAndAnswer` and "Book a
  consultant - it's on us!". That component is unchanged and four routes still
  use it; the divergence is deliberate for now and worth a decision when those
  templates are next looked at.
- **The page's metadata changed.** Title and description no longer say "more
  than a team"; the canonical URL and keywords are untouched.

## Technical debt still open

- **Card titles lost their heading tags** on both hub pages — 8 and 5. An
  accessibility regression. Fix is a semantic prop on `ArrowCard`, which is
  shared with three routes, so it was raised not taken. See [[05 Components]].
- ~~`/services` and `/industries` intro copy carries pre-brief narrow
  positioning~~ — **closed 22 Sep.** Both pages restructured, not reworded.
  See [[07 Results and hub pages]].
- **`/results` meta description** is my prose and has the machine rhythm the
  Lead Generation copy was rewritten to remove. It now sits above real case
  studies whose words are management's, which makes the contrast sharper.
- **The eight service pages** still render the logo strip inline as
  "Trusted by / Leading Brands". Permissions are cleared so nothing is unsafe,
  and the short inline label suits a slim interior page, but it is a second
  phrasing of one claim. Moving them onto the stacked treatment is a one-line
  change per call site and belongs in the browser walk, not before it.
- **UI treatment for Strategy & Positioning** — still on this list. It came
  close to being answered on 21 Sep: making card 01 a lead card spanning two
  tracks would have removed the Growth System's empty track. Rejected, because
  it asserts a hierarchy the section's own standfirst does not claim. See
  [[02 Decisions]]. Still needs the browser walk first.
- **`_caseStudy.scss` has the trailing-row stretch `ItemsSection` just lost.**
  Its five impact figures use their own copy of the old flex thirds, so on
  `/results` figures 04 and 05 still stretch to half the wrap against 376px for
  the three above them. Same fault, same fix available, deliberately not taken
  in the same change — it is a different page and nobody has seen either yet.
- The **uncommitted `_trustedBrands.scss` spacing tweak** recorded here on
  11 Sep is **gone**: the file is no longer modified in the working tree. It
  was resolved at some point without this note being updated, which is the
  ordinary failure mode of a list like this one.

## The sector pages — what is still open after 22 Sep

- **The two testimonials are recycled across all five sector pages.**
  BlockGuard and WebBookingPro appear **verbatim** on Web3, Fintech, Tech,
  SaaS and AI, so the AI page proves its AI credentials with a DeFi launch
  quote and a hotel-booking quote. Assign them honestly and Web3 keeps
  BlockGuard, SaaS arguably keeps WebBookingPro, and **Fintech, Tech and AI
  are left with no proof at all.** That is a deletion that leaves holes, and
  it needs a real client reference rather than a rewrite. **The most important
  thing on this list.**
- **Fifteen performance figures were deleted, and some may have been real.**
  250% whitelist sign-ups, 3x organic search, "doubling conversion rates" for
  an AI logistics platform, and twelve more. None carried a client, a baseline
  or a period, so none could stay. But some may have come from actual
  campaigns that nobody wrote down — worth asking before the numbers are lost.
  A figure with evidence behind it can go straight back.
- **Several FAQ entries are advertisements wearing a question mark** —
  "What makes Pixelette Marketing different from other crypto marketing
  agencies?" is the clearest. Eight FAQ entries per sector page; not audited.
- **`mq_1-3.webp` are still in `public/`** though nothing references them.
  Left until the pages have been seen without them, the same treatment
  `growthBanner.webp` got.

## The contact page, after 22 Sep

- **The site now has no visible postal address on any page.** The locations
  section was removed on instruction; the phone and email survive in
  `HowItWork` and in the `LocalBusiness` JSON-LD, the address does not.
- **The two addresses on this site do not agree**, and this predates the
  removal: the deleted section showed 77 Fulham Palace Road, London W6 8JA;
  the JSON-LD in `layout.tsx` declares 71-75 Shelton Street, London WC2H 9JQ.
  The visible half has gone and **the schema half is the one left standing** —
  which may be the wrong one.
- **A management note was rendering as body copy** on the live contact page,
  as that section's standfirst: *"Show locations in a different way, not really
  happy with how it's currently done here…"* No gate on this site reads prose,
  so nothing had anything to say about it. Worth assuming there are others.

## The standing risk

**Almost nothing here has been viewed in a browser.** Two exceptions now: the
Growth System band, and — since 22 Sep — **the whole of `/aboutus`, read end to
end at 1440px and at 390px**, which is the first time any page on this site has
been looked at as a page rather than as markup. Both exercises produced faults
no gate had caught: one on the Growth System, three on About. That is the
argument for the browser walk, made twice, and it has still been done on two
sections of a 35-route site.

Every other page and breakpoint is structural-only, and the dropdown
menus have never been rendered at all. The two case studies built on 11 Sep
have been verified structurally — headings, figures, quotations, grounds, all
35 routes — and **not once by eye**. See [[10 Verification]] for exactly what
the automated checks can and cannot see.

**The 21 Sep realignment sharpens this.** It is a change made entirely of
measurements — 376px, 656px, a fold at roughly 936px, two tracks of the auto
grid — and not one of those numbers has been observed. A layout change is
precisely the category the gates are blind to, and it was made on the section
that has already proved the gates blind once. The three viewports that would
settle it are desktop, about 800px, and a phone.

**The Growth section figure is the counter-example, and it is worth the
contrast.** It was looked at three times on 21 Sep and the first two versions
were rejected on sight, both having passed all six gates. Twenty minutes of
looking settled what two rounds of discussion had not. The desktop view of
that one section is now the most-observed thing in the repo; nothing else on
the page has had the same treatment, and the figure itself has still never
been seen at a phone width, where its hover labels do not exist at all.

Related: [[01 The brief]], [[02 Decisions]]

## The Strategy & Positioning Diagnostic (22 Sep)

`/strategy-positioning` is built, gated and looked at. What it leaves open:

- **Nobody has signed off the six lenses or the twenty-four statements.** They
  are the page's substance and they are mine. The lens NAMES and every "what we
  would look at first" line are drawn from `growthSystemData`'s approved
  capability 01, so the claims about what Pixelette does are management's; the
  questions and the four statements under each are not. **This is the thing on
  this page that most wants a reply.**
- **The page is reachable from `/services` and from nowhere else.** The 11 Sep
  instruction that Strategy & Positioning takes no nav entry stands, and the
  premise it rested on — that there is nowhere for it to point — has now
  changed. Worth putting back to management as a question rather than acting
  on. Note that `navigation.ts` and `capabilityGroups.ts` both carry that
  judgement in prose, so both comments are now half true and were updated.
- **It is not linked from the home page.** The Growth System's card 01 is the
  other place "Strategy & Positioning" appears, and it was left alone: the five
  cards carry no per-item links and adding one to the first would make it read
  as the one with a product behind it. One line if it is wanted.
- **`.btn:disabled` is a group-layer contrast fault, raised not taken.** White
  text on `--color-line-strong` is roughly 1.5:1. The diagnostic overrides it
  locally and the enquiry form is untouched, so nothing regressed — but the
  shared rule is wrong wherever it is used and the value is the guide's, like
  `--color-line-strong` itself. Same class of inherited fault, same treatment.
- **The four dead assets keep their company.** Nothing new was added to
  `public/`; this page has no images at all. Worth noting that it is the first
  route on the site with none, and it does not look thin for it.
- **The conversion path is the ordinary enquiry form.** "Talk to us about this"
  lands on `/contactus` with nothing carried across, so whoever reads the
  enquiries cannot tell that a visitor arrived from the diagnostic or what
  their reading said. Same shape as the About page's "Introduce yourself →"
  problem, and the same two fixes are available: an option in the form's "What
  are you trying to improve?" select, or a route of its own. **Neither was
  taken, because the conversion event is not wired at all** — see the top of
  this file.

## Found while looking at the diagnostic, and not this page's fault

- **The navigation breaks at 768px on every route.** "What We Do" and "Who We
  Help" wrap to three lines and the primary button overflows the right edge.
  Confirmed on `/aboutus`, so it predates this work and is on all 36 routes.
  It is the first thing the browser walk should settle at tablet width.
