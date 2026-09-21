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

## Two homepage sections realigned, 21 Sep

**The problem was measured before it was fixed.** Two adjacent sections held
three different column widths: "More than marketing activity" ran four items at
275px, the Growth System's first row three cards at 376px, and its second row
two at 572px. Nothing lined up with anything, and no card edge in the Growth
System landed on a third.

**The trailing pair stretched because a flex basis describes a full row only.**
`flex: 1 1 calc((100% - 2rem) / 3)` sizes three-across correctly and says
nothing about what a row of two should do, so `flex-grow` filled the width.
The column count is now derived from the width instead — see
[[08 Design system constraints]] for why `flex-grow: 0` was the wrong fix.

**"Why Pixelette" now takes an aside header, and the reason is editorial.** It
is the ARGUMENT for the offer; the Growth System is the offer. Both took the
same stacked eyebrow → heading → lead → grid, so it read as a peer — and by
that point in the page it was the fourth appearance of one shape, because six
of the twelve sections share `ItemsSection`. Turning its header ninety degrees
subordinates it.

**Colour could not do that work.** `_surfaces.scss` caps a page at three dark
bands, `route:walk` enforces the cap, and the home page has spent all three.
Dark is punctuation and there was none left to spend, so the weight came from
layout instead. This is the three-band cap deciding a design question rather
than merely forbidding one.

**A fifth option was considered and rejected on content grounds.** Making card
01 a lead card spanning two tracks would remove the empty track entirely and
put every edge on a third. It was not taken because it asserts that Strategy &
Positioning is the way in, while the section's own standfirst says Pixelette
"can deploy the specialist capability the business actually needs" — which
reads the five as peers. Changing what the layout claims is a copy decision,
and the copy is management's.

**None of it has been seen.** Every measurement above is computed. See
[[10 Verification]].

## The Growth section figure, 21 Sep

**The Growth section's collage is gone, replaced by a drawn figure.**
`growthBanner.webp` was an Edwardian figure, falling dollar bills and the
Statue of Liberty. Nothing in it depicted Demand, Pipeline, Conversion or
Revenue. The currency and the skyline were American on a UK agency's page.
Money raining from the sky argued the opposite of the standfirst beside it —
that activity is not the objective. And it was a 538px asset rendered at
663px, so it was soft on every screen. The file is still in `public/` and is
now referenced by nothing; deleting it is a decision nobody has taken yet.

**Three figures were drawn before one was kept**, and the two that failed are
in the history rather than squashed away. Both passed all six gates and both
were rejected on sight. [[10 Verification]] records what looking found, because
it is the clearest evidence in this repo for what the gates are worth.

**The figure carries no words.** The first attempt labelled the four outcomes
along a stepped chain, which put Demand, Pipeline, Conversion and Revenue on
screen a second time, three hundred pixels from the grid that already names
and describes all four. Restating them was the whole fault. Whatever occupies
that column has to do the thing the grid cannot, or say nothing at all.

**Four columns, in the framework's order, ascending, Revenue tallest and the
only crimson one.** Ascending so the shape reads as each stage building toward
revenue. Descending was the other honest option and would have read as a
volume funnel — demand being the widest count — which is not the argument
this section makes. Note that the grid beside it reads DOWN its columns while the
figure reads left to right; the two agree with each other and with the closing
line, and neither agrees with a naive Z-order read of the grid.

**It makes a quantitative claim, deliberately, and nobody has signed it off.**
Four named columns at four different heights state an order of magnitude
between the stages. That is a claim about Pixelette's own funnel. It carries
no axis, no tick, no gridline and no value, and the hover gives a name and
never a number, so there is nothing a reader could quote. It stays the right
side of the standing bar on unqualified proof figures **only as long as no
number is ever added to it**. See [[09 Outstanding]].

**Hover is CSS alone, and is legitimate only because the label is redundant.**
Each column is a `<g>` holding its own label, revealed on `:hover` and
`:focus-within` — no JavaScript, no state, nothing to hydrate. Hover-only text
is normally a trap. It is not one here because all four names are already in
text beside the figure, so touch, keyboard and screen-reader users lose
nothing by never seeing it. That is also why the svg stays `aria-hidden`.
**If the grid beside it ever moves, the figure loses its text alternative and
this decision has to be revisited.**

**Paint stays in the stylesheet.** The component carries geometry and class
names only; every fill, stroke and type decision resolves from tokens in
`_growthDiagram.scss`. It keeps the token gate satisfied without an exemption
and follows the rule in [[08 Design system constraints]] that colour is read
from context rather than set at the call site.

**Candidates were compared inside the real section, not on a swatch page.**
Four graphs were built into the column at the width the column actually gives
them, looked at in place, and three were then deleted. Both cheaper methods
had already mispredicted: a figure chosen from a written description was
rejected on sight, and a scratch comparison page flattered shapes that did not
survive contact with the section around them.

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

## 21 Sep — section 06 becomes a scroll-driven strip

The user's instruction, given with a screenshot of the section as it stood:
**remove the four descriptions and the closing one-liner, then run the four
names as a full-width marquee that moves with the page scroll.**

### What went

- The four `body` sentences under *Faster insight*, *Smarter prioritisation*,
  *Scaled execution* and *Clear accountability*.
- The closing line, "The technology stack changes according to the problem. The
  commercial objective does not."

The eyebrow, the h2 and the standfirst are untouched. The four names are
untouched. Nothing was written to replace what went — the section is shorter,
not rewritten.

### Why it left the ItemsSection shell

Six homepage sections share `ItemsSection` because they are genuinely the same
shape: header, N uniform items, optionally a CTA or a closing line. This one
stopped being that shape when the bodies went. Four bare headings in the
`--auto` grid is not a grid, it is a row of labels with two thirds of every
cell empty, and `PointItem` requires a `body` — satisfying that type with four
empty strings would have been a lie told to the compiler.

So section 06 is `AiTechnologySection` now, and `aiTechnologyData` has its own
`AiTechnologyContent` type carrying `marks: string[]` instead of `items`. The
shell did not grow a fifth layout prop; it already carries four.

Its header is a deliberate copy of the shell's — same 34rem measure, same 20px
and 24px gaps. Nothing about the top half of the section changed, so nothing
about it should look changed. If a third section ever wants that header, that
is when it becomes its own thing.

### The fourth motion surface

This is new motion on a register whose stated property was *flat and static*,
so it is registered at the top of `_surfaces.scss` where the rule lives, beside
the logo marquee, the hero parallax and the scroll reveal. **Trap 10**: a
motion surface documented anywhere other than the point where the rule is
stated gets read as leftover decoration and deleted. `_marquee.scss` lost its
keyframes to exactly that once.

It is the second marquee but **not** the first one's mechanism. `.marquee` is a
CSS `animation` on a timer and runs whether anyone is there or not.
`.scrollMarquee` has no keyframes: JS writes its transform from the page's
scroll offset, eased over a few frames, so the words move only while the reader
moves. That is what was asked for, and it is also the narrower claim on the
register — nothing on the page moves by itself.

### The state that ships in the HTML is the static one

`ScrollMarquee` is built on ScrollReveal's rule, verbatim: nothing is hidden
that is not also, in the same pass, handed to a live driver. The stylesheet on
its own lays the four phrases out as a wrapped, centred, fully legible row —
no clipping, no duplicates, no transform. The moving strip is
`[data-marquee="on"]`, set only by `ScrollMarquee.tsx`, and only after it has
measured that three copies of the group actually cover the viewport.

Get that ordering backwards and the no-JS case ships one group clipped at the
right edge, losing *Scaled execution* and *Clear accountability* outright. This
conversion has already produced four separate invisible-text faults; four
product claims are not worth a fifth.

The cost is a layout change on hydration, wrapped row to strip. Both are
finished states, and the section is below the fold on every viewport, so the
swap happens long before it is scrolled to.

### Two things that had to be got right

1. **The translate folds twice.** JS `%` keeps the sign of its left operand and
   the scroll offset goes negative every time a reader re-enters the section
   from below. A raw modulo translates the track *right* and opens a band of
   empty page at the left edge. `((n % w) + w) % w` keeps it in `[0, w)`.
2. **There is no `gap` on the track.** The spacing lives inside the item as
   `padding-inline-end`, so a group's width is exactly the sum of its items and
   the wrap translate is exactly one group. `.marquee` needs a half-gap
   correction precisely because it does use `gap`, and it visibly jumps once a
   cycle without it.

**It has not been seen.** Every measurement above is computed, the two states
have never been rendered side by side, and the strip has never been scrolled.
See [[10 Verification]].

Related: [[01 The brief]], [[05 Components]], [[08 Design system constraints]], [[09 Outstanding]]
