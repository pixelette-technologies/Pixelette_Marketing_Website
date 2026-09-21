# 09 Outstanding

As of **21 September 2026**. Management answered the 9 Sep questions on 11 Sep;
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

## Technical debt still open

- **Card titles lost their heading tags** on both hub pages — 8 and 5. An
  accessibility regression. Fix is a semantic prop on `ArrowCard`, which is
  shared with three routes, so it was raised not taken. See [[05 Components]].
- **`/services` and `/industries` intro copy** still carries pre-brief narrow
  positioning, contradicting the homepage. See [[07 Results and hub pages]].
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

## The standing risk

**Almost nothing here has been viewed in a browser.** The Growth System band is
the one exception, and looking at it immediately produced a fault no gate had
caught. Every other page and breakpoint is structural-only, and the dropdown
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

Related: [[01 The brief]], [[02 Decisions]]
