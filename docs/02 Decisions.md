# 02 Decisions

Every judgement call from 8–9 Sep 2026, with the reasoning. Anything here can
be reversed; the point is that the next person knows what was weighed.

## Settled by the user

| Decision | Chosen | Why |
|---|---|---|
| The five capabilities | Grouping labels in the nav dropdown only | The eight service pages keep their URLs and their SEO. Building five new landing pages was a content project the brief supplies no copy for. |
| Results page | New `/results` | `/success_stories` serves legacy Pixelette Technologies content. |
| Delivery | Two phases | Homepage first and independently reviewable, then nav/footer. |
| Growth-route CTA | `/industries` | The section is about sector and stage; that is the existing listing page. |
| Landing the work | Merge to `main` and push | Asked for directly on 9 Sep, with the privacy-link and browser-walk caveats stated first. |

## Taken by me, and why

**URLs do not move.** The brief renames labels — Services becomes What We Do —
but specifies labels, never paths. Renaming would mean redirects, canonicals,
sitemap and breadcrumb changes across thirteen indexed pages to buy nothing a
visitor can see.

**Two nav groups are not rendered.** "Strategy & Positioning" has no service
page; Launch / Scale / Established have no stage pages. Four empty dropdown
headings would have been worse than four absences. Both capabilities are still
sold on the homepage.

**The dark band went to the process section, not the AI section.** Removing the
tool-logo wall freed one of the three allowed dark bands. The AI section
inherits the wall's position, but sits immediately after the Growth System, so
two dark bands would have abutted into one slab. See
[[08 Design system constraints]].

**The engagement CTAs do not preselect the form dropdown.** Mapping "Growth
Diagnostic" onto Demand or Pipeline is a guess dressed as data. `?enquiry=`
seeds the message box instead — visible, editable, and carried in a field the
notification email already renders. See [[06 The enquiry form]].

**The process steps are numbered, not icon-marked.** The brief numbers them
01–04 and they are a sequence; a mark would drop what the ordering carries.

**Facebook stays linked.** The brief says "other active channels only". Whether
that page is maintained is a fact the repo does not hold, and removing a working
channel is the more destructive guess.

**Footer "Privacy" is omitted.** No policy page exists and no verified URL.
Linking to a 404 or writing legal text are both worse.

## Taken on 11 Sep, after management answered

**The quotations moved into their own case studies, and `TeamSection` came off
`/results`.** It was only ever on that page to carry the two testimonials while
there was nothing else to show. With the case studies built, a quotation sits
beside the engagement it is actually about — which is where a testimonial is
worth most — and rendering both blocks would have put each quote on the page
twice. The home page's `TeamSection` is untouched.

**The two quotations now have one definition.** `teamData.ts` exports them
individually as well as in its array, and the case studies import them. Two
call sites reading one definition, rather than the same approved sentence typed
out twice and free to drift.

**The BlockGuard figures publish in the case study but not on the home page.**
They carry no measurement period. The brief's gate wants measure, period,
client and permission; we hold three. A before-and-after inside a case study
describes its own scope, a bare number in a proof band does not. Recorded in
the data file so the next person does not lift them innocently.

**WebBookingPro's impact is a bulleted list, not a row of tiles.** Management
supplied four sentences, not four numbers. An outcome tile with no figure in it
reads as a statistic that failed to load.

**`/aboutus` takes the home page's client section.** It was
`topHeading heading='Our clients'` — the inline layout with its eyebrow
suppressed — which made it the third different claim about the same six logos.
It reads `proofCopy` now rather than restating it, so there is one definition
of what that row is claimed to be. "Our clients" was also the strongest of the
three claims and the least accurate: the set includes portfolio ventures, which
is what "brands and ventures" exists to say.

It takes **no CTA**, and that is deliberate. `_aboutClose.scss` lifts the close
between the team and the strip with `order`, and its own comment records that
this is only safe because `OurTeam` and `TrustedBrands` contain no focusable
elements — "it would NOT be safe if the logo strip ever became links". The
strip renders visually after the close but sits before it in the DOM, so a CTA
there would be reached by keyboard before a link already visible above it. The
home page has no such shuffle and keeps its CTA.

## Taken on 18 Sep

**The footer follows the Pixelette Technologies structure**, so the sister
sites share one footer shape: brand-led grid, a "Part of Pixelette Group" band
with this company marked "You are here", and a legal line. Where it differs,
each on purpose:

- **Brand + three columns, not brand + two.** What We Do and Who We Help are
  both crawl paths to indexed pages, so neither is folded into the other.
- **Only pages that exist are linked.** Their Company column links Privacy
  Statement, Terms, Modern slavery and Accessibility. None exist here, and a
  footer link to a 404 is worse than its absence.
- **Social icons stay**, in the slot where they show ISO certificates — this
  company holds none, and management said on 11 Sep that Facebook stays.
- **The legal line is the copyright.** Theirs states entity, registration,
  company number, registered office and VAT. None of those are known for
  Pixelette Marketing and none are guessed.
- **Group descriptions are the group's own**, verbatim from their footer.
- **"Privacy choices" reuses ManageCookies**, which reopens the existing consent
  banner, rather than adding a second consent UI like their dialog.

**The cookie policy page moved onto the design system**, wording untouched. It
had an inline style object and unclassed headings, so it rendered in browser
defaults: blue links, stock heading sizes, a 9px button. It takes the interior
hero and the `.prose` primitive, which existed for article bodies and had no
call site. Styles live in `_legalPage.scss` so the missing legal pages can
reuse them.

**The form's privacy-notice link opts into `.link`.** Inline links opt in to
the brand tone by design; this one never had, so it was browser blue.

**Smooth scrolling is on the root only, and `<html>` carries
`data-scroll-behavior="smooth"`.** See [[10 Verification]] for the fault.

**"Privacy choices" opens a panel, like Technologies'.** It used to clear the
stored choice and reload the page so the banner would ask again. Same structure
as theirs — title, Website analytics, explanation, current state, On/Off, link
to the cookie policy — but **not their wording**: theirs says "No analytics are
currently running", which is false here. Every sentence was checked against the
code; the facts are recorded in `src/lib/consent.ts`. Unlike theirs, our switch
works. The first-visit banner stays, because this site does run analytics.

**Consent has one definition**, `src/lib/consent.ts`, used by both the banner and
the panel. A choice made in the panel closes the banner.

**Switching analytics off now deletes the `_ga` cookies.** Before, it only
stopped new ones; existing cookies stayed for up to two years, which made "not
set" untrue for anyone who had once accepted.

## Reversals of earlier recorded decisions

The brief overruled three Phase A–F decisions. Each is recorded in the
component comment rather than quietly overwritten:

1. **The hero has an eyebrow.** Phase E left it out because writing one was
   "Trap 01" — inventing copy to complete a pattern — reverted twice on an
   earlier conversion. The brief supplies the words, so it is transcription,
   not invention. It is a `<p>`, not a heading: a heading above the `<h1>`
   inverts the outline.
2. **The hero has two CTAs.** Phase E shipped one because a second was new
   content. The brief specifies the pair.
3. **The footer has a brand column.** Phase C shipped four columns instead of
   the guide's five and recorded why: no description copy existed. The brief
   supplies it, so the deviation closes.

## A mistake I made and corrected

I wrote "Client proof" / "In their words" onto `/results` to fill a heading
pattern. Those words are in neither the brief nor the repo — it is exactly the
trap described above, committed while I was citing it in commit messages. The
hero already carries the frame, so the headings were removed and
`TeamSection`'s header is now guarded against rendering empty.

### A fourth, on 11 Sep

4. **The proof band says "Trusted by".** The eyebrow was the brief's own "Proof
   early". The brief gates the stronger phrase on every displayed logo being a
   genuine client relationship, which could not be established on 9 Sep, so the
   section took the weaker label and the heading below it was written to stay
   literally true of a mixed set. Management confirmed permissions on 11 Sep.

   The heading and standfirst are **unchanged**: "Selected brands and ventures
   we have supported" is still the accurate description, and it is the brief's
   sentence. The stronger label sits above a description that stays honest
   about what is in the row. "Trusted by" is also not new copy — it is
   `TrustedBrands`' own default and had been live on all eight service pages
   throughout, so this aligns the home page with them rather than inventing a
   third claim.

Related: [[01 The brief]], [[09 Outstanding]]
