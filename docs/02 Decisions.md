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
- **The legal line carries the company identity**, as theirs does: registration,
  company number, registered office and VAT, supplied by management on 22 Sep
  2026. The copyright keeps its own line beside them. The registered ENTITY
  name was not supplied, so the line names the company as the rest of the site
  does rather than inventing a suffix.
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

> **Superseded on 22 Sep.** The four columns were replaced by a ring. The
> reasoning below still stands as the record of how the columns were arrived
> at and what they were allowed to claim — and the thing that eventually
> removed them is the quantitative claim this entry flags twice. See
> **[[#The chart comes off — 22 Sep]]** at the end of this note.

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

## The hub pages and the sector pages, 22 Sep

### A grid of equal boxes is itself a claim

Three sections were taken off a grid on the same day — eight services, five
sectors, three market constraints — and the reason was the same each time.
**A grid of equal boxes asserts that its contents are parallel,
interchangeable and complete.** Five capabilities are ordered, not parallel.
Five sectors are examples, not a boundary. Three constraints are an argument,
not a menu. In all three cases the layout was making a claim the copy did not.

Recorded as a rule in [[08 Design system constraints]]: reach for the grid
when the items really are peers and the set really is complete.

### "Digital" comes off the page, not out of the title

"Digital marketing" differentiated when non-digital was the default. It now
reads as either assumed or dated, and it narrows the offer at the moment the
rest of the site widened it — but it is still what people type into search.
So the h1 speaks to the reader and the title tag speaks to the crawler. The
same split was applied on `/industries`.

### Fifteen unsourced figures, against our own standard

The sector pages published fifteen performance claims with no client, baseline
or measurement period — 250% sign-ups, 3x organic search, "doubling conversion
rates". Meanwhile BlockGuard's five figures, supplied by management **in
writing**, are barred from the home page because nobody has stated the window
they cover.

**The site was applying a stricter standard to its true numbers than to its
unverified ones.** That comparison, rather than the wording, is what settled
it. Each figure sat under a genuine reader-problem question, so the questions
were kept and only the fabricated result was replaced — with a description of
approach, which claims no outcome and so needs no substantiation.

### Competitor pages were read before the copy was written

Click Consult's Sector Specialisms pages, The Marketing Practice, and Bray
Leino's healthcare page. Three findings changed what was written:

1. **The h1 is the sector name.** Literally `B2B`. Literally `Healthcare`.
   Not one said "We are a [sector] marketing agency", which is exactly how all
   five of ours opened.
2. **The first paragraphs belong to the reader's problem.** Click's healthcare
   page spends two paragraphs on regulation, YMYL and data-protection limits
   before it says "we" once. **Knowing the constraint is the credential** — it
   never has to be asserted.
3. **Proof is checkable or absent.** Click gave a section to a ranking and
   published the unflattering number: *54th of over 100 agencies*. Bray Leino
   ships a credible sector page in about **120 words** with no adjectives at
   all — a date, a membership, five logos, two case studies.

Ours were **~4,300 words each**. The length was padding, not depth, and the
padding is where the fifteen figures and the recycled testimonials lived.

One deviation, deliberate: they use the bare noun as h1 and have the domain
authority to rank on it. Ours keep the discipline — "Web3 marketing" — because
it is the only h1 on the page.

### What we could not write, and did not

Five differentiated sector summaries were planned and abandoned. Looking for
material to write from turned up **Tech and SaaS carrying a byte-identical
service sentence**, and only Web3 with genuinely sector-specific substance. So
writing five distinct summaries would have meant inventing sector claims for
four sectors the pages beneath do not support — Trap 01, arrived at from a new
direction. The templated filler was removed instead of being replaced with
better-sounding filler.

The same logic decided the testimonials: assigning them honestly leaves three
pages with no proof, and **that hole is the finding**. It is recorded in
[[09 Outstanding]] rather than papered over.

### A section that described the website

The first attempt at the sector list on `/industries` read: *"These five have
their own page. They are where we have written the most, not the limits of
where we work."* It was rejected on sight — **no agency writes about its own
page structure**, and it read as an apology for a short list rather than as a
statement about the work. Worth keeping as a failure mode: when a section is
hard to justify, the temptation is to explain the site instead of the offer.

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

## 21 Sep — the About page rebuilt

A separate instruction, not the 8 Sep brief: make About premium, concise and
defensible, and stop it presenting a team. Six sections now — hero, who we are
/ how we work, the capability model, the principles, selected experience,
close — against the nine it had. Visible copy falls from roughly 550 words to
230.

### What came off, and why it was the claims rather than the length

- **`OurTeam`.** Five portraits with names and job titles. Nothing in this
  repository substantiates them, and the instruction bars any headcount, staff
  or office claim that the existing material does not already establish. It is
  replaced by the capability model, which says how work is assembled without
  saying who is employed.
- **`WhoWeAre`.** A founding story, five paragraphs and a three-point list,
  saying what six sentences now say.
- **`OurValues`.** Collaboration, integrity, forward thinking, excellence —
  the generic set, and two of its four cards were the same colour as the band
  behind them.
- **`OurServices`.** The six industry cards. They are the whole of
  `/industries` and its eight children; carrying them here made the page
  longer and told a visitor nothing the navigation does not.

The logo strip stays, in `TrustedBrands`' stacked layout, under a weaker claim
than the home page's: *Experience across the Pixelette ecosystem*, with
*brands and ventures connected with work across our wider group and network*.
The set includes portfolio ventures. Nothing on the page says Pixelette
Marketing delivered to every mark shown.

### The hero image, which was a judgement call

`heroImageAbout.webp` is gone from this page — a bought retro collage of a
typewriter and handwritten letters, under a headline about measurable growth.
The instruction bars stock marketing graphics and asks for a headline that
dominates, and both could not be honoured with it in place. The asset is
untouched and still serves `BlogHeroSection`, so restoring it is one import.
What replaces it is the asymmetry: the headline is capped at the house 34rem
measure and the right half of the hero is deliberately air.

### Three faults found by looking, after every gate was green

This is the fourth time on this project that a rendered page has produced a
fault no gate could see, and all three below were fixed before the work was
handed over.

1. **The signature cap was an orphan.** `.rule-cap` sat on a full-width rule
   at the top of the identity section, with the two statement rules 90px
   beneath it: three hairlines within a hundred pixels, the marking segment on
   the faintest of them. The section rule went and the cap moved onto the
   first statement's own hairline.
2. **A 16ch cap on the capability names** forced a wrap into tracks wide
   enough to hold them, so two of four broke at 1440px where only one had to.
   `.h3` already carries `text-wrap: balance`; the cap was removed.
3. **`.band-alt` on the principles section was a no-op.** `_base.scss` gives
   the body `--color-band` already, so the wrapper declared a ground change
   that does not happen. It was removed rather than left to be read as one.

A fourth, deliberately not fixed: the principles name column went from 14rem
to 18rem because *Commercially focused* was the only one of four that wrapped,
which made its row half again as tall as its neighbours.

### What was verified

Both `.band-dark` (capability model, logo strip) and the single `.rule-cap`
are within the caps; `route:walk` passes 35/35 against a dev server. The token
gate passes and `src/data/aboutus/ourTeamData.ts` left the exemption list with
the file. The page was rendered and read at 1440px and at 390px, which is more
than most of this site can still say — see [[10 Verification]].

## Who we help stops being a sector list, 21 Sep

**The four sector cards are gone, and the reason is positioning rather than
design.** AI & Software, FinTech, Web3 & Digital Assets and Technology &
Platforms, each with a summary and a View More into a near-identical industry
page. Four technology sectors, boxed and equal and presented as a set, read as
a client boundary — this is what Pixelette does and nothing else — while the
standfirst beneath them spent its words saying the offer was not limited to
those categories. A sentence arguing against the layout above it loses.

**A longer list would have made the same claim.** Twelve cards say what four
say, only at greater length. What replaces them is a typographic field rather
than a bigger grid: eleven markets set at three scales on one baseline, no
box, no summary, no link, so the group reads as range rather than as a menu.

**Nothing in the field links anywhere, and `to` is gone from the data shape.**
The industry pages still exist and are still reachable from the nav and from
`/industries`; they are simply not what this section is for. Removing the
field rather than leaving it empty is the point — a field left sitting there
is one a future edit fills without deciding to.

**"And beyond" is inside the list, not after it.** It is the sentence the list
would otherwise fail to say, so it is the last thing read rather than a
footnote to the eleven marks it qualifies.

**The composition is not positioned by hand.** It is a wrapping flex row, so
the marks break wherever the width runs out and the asymmetry comes from the
reflow. Add a market, rename one, and it reflows instead of breaking, which is
the only version of this that survives a copy edit. Every size is a clamp, so
the field needs no breakpoint of its own; the stylesheet's single 767px turns
it into a column where every third mark pulls right.

**Hover has no focus pair, because there is nothing to focus.** The marks are
list items, not links. Putting `tabindex` on eleven inert words to make a
colour change reachable would add eleven stops to the keyboard path and return
nothing for them. Hover lifts a mark 2px into the brand tone and does nothing
else: these are not controls and must not start looking like them.

**The stages lose their doubled gap**, on the user's instruction from a
rendered page. It was `calc(--sec-y-sm * 2)`, preserving the distance a
hairline used to occupy between the sector cards and the stages. With the
hairline gone and now the cards gone too, that was inherited machinery rather
than a judgement, so the section has one interval between its groups instead
of two.

**Eleven named markets is itself a claim, and nobody has signed it off.** See
[[09 Outstanding]].

## One control on Ways to work with us, 21 Sep

The three engagement cards each carried their own CTA into a seeded form —
`?enquiry=diagnostic`, `=managed`, `=embedded` — and they are replaced by a
single section CTA beneath the closing line.

**What it costs is not recoverable, which is why it is written down.**
`ENQUIRY_SEEDS` seeded the message box with "I would like to request a Growth
Diagnostic" and its two siblings — visible, editable, and travelling in a
field the notification email already renders — so sales could see which
engagement a visitor came in on. The three keys and their URLs still work if
one is bookmarked, but nothing on the site links them any more. A single
control cannot keep the signal: picking one of the three answers a question on
the visitor's behalf, which is the decision [[06 The enquiry form]] records,
and a fourth seed would describe none of them.

**The label is mine** and is the only copy in that section management has not
supplied. See [[09 Outstanding]].

Related: [[08 Design system constraints]], [[09 Outstanding]], [[10 Verification]]

## The Strategy & Positioning Diagnostic, 22 Sep 2026

`/strategy-positioning`. A new page, asked for in its own instruction, and the
first thing on this site built with a browser in the loop from the start
rather than at the end.

**It reverses a recorded withdrawal, and that is the user's call rather than
mine.** On 11 Sep it was settled that Strategy & Positioning gets no detail
page and no nav entry, and that it becomes a UI question on the existing page
instead. `navigation.ts` and `capabilityGroups.ts` both carry that judgement in
their own words, and both end the same way: it joins when there is somewhere
for it to point. There is now. **The navigation is still untouched** — the page
is reachable from `/services` and from nowhere else — because the page was
asked for and the nav entry was not.

### The objective shaped the whole page

The instruction was explicit that the page must not merely say Pixelette does
marketing strategy; it has to PROVE there is a structured way of diagnosing
market, customer, competition, positioning, messaging and growth priorities.
Two consequences:

- **The six lenses are management's own capability list.** `growthSystemData`'s
  capability 01 names exactly six — ICP and buyer insight, market and competitor
  intelligence, proposition, messaging, go-to-market, campaign strategy — and
  the six lenses are those six put in dependency order. Every "what we would
  look at first" line in the reading names the one it belongs to. Nothing on
  the page invents a service.
- **The order IS the argument.** A grid of six equal boxes would say the lenses
  are parallel and interchangeable; the claim is that each waits on the one
  above it. Rows on a hairline, the third sanctioned idiom, for the third time
  and the same reason as `/services` and `/industries`.

### The diagnostic benchmarks the visitor against nobody

The instruction bars invented client logos, testimonials, customer numbers,
results statistics, awards, fake AI and fake research data. That is not a
constraint the instrument works around — it is what the instrument is.

Six answers in React state, drawn as six four-step measures, and the reading is
the **minimum**, ties going to the earliest lens because the lenses are a
dependency chain. That is the entire algorithm. The one number rendered
anywhere on the page is the visitor's own click read back to them, and the
caption under the readout says so in words: *a reading of your own answers, not
a benchmark*.

**Nothing is described as AI.** There is no model, no request and no inference
here, and the copy never implies one.

### Three decisions inside the instrument

**The light ground, not the dark band.** The obvious move is to give a page's
dark band to its centrepiece. `_pointItem.scss` records what that costs: the
Growth System's cards were transparent on a panel-border hairline, every glyph
inside passed its contrast floor, and the review feedback was that they "are
not visible properly" — a contrast gate measures text against background and
cannot see that the container has gone missing. A panel of form controls has a
dozen such containers. The band went to the method section, which is prose and
numerals, and the instrument stayed on the ground the primitives are tuned for.

**Real radios, restyled with `appearance: none`.** Not a div with an onClick.
The focus ring lands on the element the browser already focuses, the arrow keys
already work inside the group, and the checked state is already exposed —
none of which is true of the alternative, and all of which `Accordion.tsx` had
to be rewritten once to recover. The selected row is marked by a class React
writes rather than by `:has(:checked)`: React already knows, and a state class
cannot be defeated by a browser that has not shipped `:has`.

**No persistence.** `localStorage` would survive a refresh, and it would also
mean this page stores something about a visitor — a sentence the cookie policy
would then have to carry. A diagnostic that takes ninety seconds is not worth
that. It is also what lets the hero say, truthfully, that nothing is submitted
and nothing is stored. **If an analytics event or a save is ever added, that
hero sentence changes in the same commit.**

Related: [[05 Components]], [[08 Design system constraints]],
[[09 Outstanding]], [[10 Verification]]

## The Strategy & Positioning page rebuilt to its full specification, 22 Sep 2026

A second, definitive brief superseded the one that produced the first version.
The route, the design system work and the `/services` link survived; the
content model, the instrument and four of the five sections did not.

**WHAT WAS KEPT, because the instruction was explicit not to throw work away:**

- The route, its metadata, the breadcrumb schema and the `/services` link with
  its exact label.
- The option-row vocabulary — a real `<input type="radio">` restyled with
  `appearance: none`, the brand edge and tint on the selected row, the local
  readable disabled treatment for the primary control.
- The panel: card tokens at a clamped padding, carrying `.card-feature` as the
  page's one signature mark.
- The rule that the instrument sits on the LIGHT ground and the dark bands go
  to prose sections.
- **A figure built by a parallel session and then withdrawn with it.** See
  below.

**WHAT CHANGED:** six lenses became the brief's six dimensions; six questions
became twelve, two per dimension, scored 0–4 on five options; the reading
became a 0–100 score, four bands, six percentage scales, a strongest and a
priority area and three recommendations; and four new sections arrived — the
engagement's outputs, an illustrative framework, a closing call to action and
a four-question FAQ.

### The wave came from the other session, and keeping it was the right call

A parallel session had rebuilt the six lenses as a sine wave with six nodes,
horizontal on a desktop and vertical below 768px, then withdrew it when its
content was superseded. The brief asks for exactly that: a connected visual
introduction to the six, explicitly not six rounded cards.

So the drawing survived and the data did not. Three things changed with it —
the dimensions replaced the lenses, the colours moved from the dark family to
the light hero ground it now sits on, and **a latent bug came out**: the points
carried `data-reveal='stagger'`, and every point is centred with
`transform: translate(-50%, -50%)` while the reveal sets `transform` at equal
specificity. It was inert only because of partial load order. The day the
figure moved below the fold, every circle would have jumped half its own width
off its point. The attribute is gone and both files say why.

### The scoring is in `src/lib`, not in the component and not in the copy

Three files, three readings: `diagnosticContent.ts` is the copy a reviewer
checks, `strategyDiagnostic.ts` is the arithmetic, and the components render.
The score is `actual / possible x 100`, rounded; ties resolve to the earliest
dimension in the canonical order, never to whatever way `sort` fell. **41
assertions cover it**, including every band boundary the brief names — see
[[10 Verification]].

### Storage: the earlier decision reversed, on instruction

The first version stored nothing, and said so in the hero. The brief asks for
localStorage so a refresh does not destroy twelve answers, so it stores them —
and the hero sentence changed in the same commit, which is what that note said
would have to happen. It is still true that nothing is sent anywhere.

**The load is NOT an effect.** Reading storage in an effect and calling
setState is the obvious shape, and it is both what React's own lint rules now
flag and a hydration mismatch waiting to happen, because the server cannot
read localStorage. `useSyncExternalStore` is the API built for a value the two
environments legitimately disagree about. The closing section reads the same
store, which is also how it offers "Review my results" without a provider.

Related: [[05 Components]], [[08 Design system constraints]],
[[09 Outstanding]], [[10 Verification]]

## The process section becomes the figure, 22 Sep 2026

On instruction: the methodology's six stages — numeral, name, imperative and
description on a vertical spine — came off the dark band, and the wave that had
been in the hero took their place.

**IT MOVED RATHER THAN BEING COPIED.** The figure names all six dimensions and
the section it now sits in used to list all six by name, so leaving it in the
hero as well would have put the same six words on the page twice, 800px apart,
with the second instance adding nothing. The hero keeps the composition it
already had — headline at the 34rem measure, the right half of the band
deliberately empty — which is what AboutUsHero settled on after its own collage
came off, and it needed nothing to replace the figure.

**What is off the page:** the twelve sentences of imperative and description.
They stay in `dimensions` in the copy file, marked as unrendered, because they
are the brief's own words and the stages may come back. If they do not, they
should be deleted — unread copy in a copy document is how the file stops being
trustworthy. The spine geometry was deleted outright and is recoverable from
`8a92fc2`; rebuilding it from scratch would be the waste.

### The figure recolours itself, and that is not decoration

It carries no ground prop and `Methodology.tsx` passes it nothing. Its
light-ground values are still the base in `_dimensionWave.scss` and the dark
ones are restated under `.band-dark`, so putting it back in the hero — or in
any light section — needs no change and nobody has to remember anything. That
is the rule `_pointItem.scss` exists to demonstrate: `ArrowCard`'s `theme`
boolean produced four live contrast failures at once, and the fix was to make
colour contextual.

The dark values are not the light ones darkened. The brand anchor measures 2.77
on the panel ground and is barred, so the numerals take the marking tone;
the line and the circle edges take `--color-panel-muted`, which is a LIGHT tone
here at 5.53 — the instruction was to make the diagram light so it reads on the
dark ground, and that is the token that does it.

### A geometry bug the move exposed

The vertical wave placed its six circles at `50 + amplitude·sin θ` while the
vertical path was sampled at `mid − amplitude·sin θ`. **The points were the
path's mirror image**, so on every screen under 768px the circles sat on the
opposite side of the centre line from the wave and crossed it twice.

It shipped in `8a92fc2`, in the hero, and it survived a mobile screenshot
review — because a wave with six circles near it still looks like a wave with
six circles. **It was caught by comparing the two formulae, not by looking**,
and then confirmed by measuring every circle's centre against the rendered path
in the browser: 0.0–0.8px on both axes after the fix, against roughly 150px
before it on the vertical.

That is the counterpart to every other note in [[10 Verification]]: looking
catches what the gates cannot, and arithmetic catches what looking cannot.

Related: [[05 Components]], [[08 Design system constraints]], [[10 Verification]]


## 22 Sep — the What We Do dropdown, derived rather than restated

### Deriving the menu from the hub, over editing the list in place

The menu was four capability labels and eight routes typed out in
`navigation.ts`, beside the five the hub renders from `capabilityGroups`. The
smaller change was to add the missing fifth group there and move on. It was
not taken, because **the fault was not the missing group, it was the second
copy** — the copy is what let the two drift silently when the diagnostic
shipped, and editing it in place leaves the mechanism that produced the drift
fully intact and ready to produce it again.

This is the same judgement `capabilityGroups.ts` already records for the hub
and the home page: capability copy is imported from `growthSystemData`, never
restated, because restating it is how those two drifted apart the first time.
The dropdown was simply the one place the rule had not reached.

### A build guard replaced, not removed

`pick()` threw on an unknown route, and the note beside it is right that a link
silently absent from the navigation is a fault traffic finds before anyone
else does. Deriving the menu would have quietly retired that guard, so it is
restated in the terms deriving makes available: **every page in `servicesData`
must be reachable from the dropdown, or the build fails.** That is a stronger
claim than the typo check — it also catches a new service page that is never
filed under a capability, which the old list could not see at all.

The empty-group filter is kept even though none of the five is empty today. It
is the house rule about shipping the pattern without the missing element, and
it is what keeps the menu honest if a sixth capability is approved before it
has anywhere to point.

### An instruction superseded, and recorded as one

The 11 Sep instruction was that Strategy & Positioning takes **no** nav entry.
[[09 Outstanding]] recorded the correct move once the diagnostic shipped: the
premise behind that instruction — nowhere for it to point — had ended, and the
changed premise should go back to management as a question rather than be
acted on unilaterally. That was right, and it is not what happened here.

**The change was asked for directly**, on 22 Sep, by name, with `/services`
open and its five labels given as the thing the navigation should represent.
A current instruction settles this; it does not need the old one reinterpreted.
Written down as a supersession rather than a correction so that the 11 Sep
line is found *answered* rather than found contradicted.

### "The Diagnostic" rather than the hub's own link label

The hub's link is a sentence — "Explore our Strategy & Positioning Diagnostic
→" — because it ends a block of prose. In the dropdown its siblings are page
titles, and a sentence among them reads as a promotion rather than a
destination. The full page title would have repeated the group heading
immediately above it. Both wordings stay as they are in their own place;
this is the same reasoning the brief already applies to CTA labels, which is
that a label belongs to its position.


## Two blog posts, and what decided the topics, 22 Sep

The blog had three posts, covering Fintech, Web3 and SaaS. Tech and AI had
sector pages and no insight content, and the AI page is one of the three left
with no proof at all after the testimonial audit. The gap picked the topics
rather than the other way round.

**Post 4 is about AI search** — being quotable rather than merely rankable.
**Post 5 is five checks before increasing spend**, ordered as the five
capabilities `/services` was restructured into, one common mistake each. The
second was chosen over two earlier proposals on the user's instruction that
the topic sit on the services and the sectors rather than on method: a post
about measurement under refused consent, and a post about writing for
technical buyers, were both proposed and dropped.

**Neither post contains a Pixelette performance figure**, deliberately. Every
number in them is third-party and attributed in the sentence that uses it,
which is the standard the sector pages were cleaned to on the same day. It
also means neither post waits on the BlockGuard measurement window.

**Length was measured rather than guessed.** The existing three run 354, 360
and 381 words across six sections; the new two were measured to 365 and 378
before being written into the data, with the same six-section shape and the
same closing "Work with Pixelette Marketing" section. The house punctuation
from the 22 Sep pass is followed — no dashes anywhere, commas and colons
instead — because that pass is what the rest of the site now reads like.

## The banners were drawn, then thrown away, 22 Sep

Both posts first took drawn SVG figures, on the reasoning `GrowthDiagram`
set: flat geometry, the diagram tint as fill, one crimson accent, no axes and
no values, so neither figure states a quantity. The five-check figure was
deliberately level rather than ascending and used nodes rather than columns,
specifically so it would not read as the home page's growth figure.

**The user rejected them for the right reason: they were patterns, and a
pattern says nothing about the article.** That is the objection the About
hero collage failed on, arrived at from the opposite direction. There the
image was bought and off-brief; here it was ours and on-brief and still
decoration.

**What replaced them is subject matter** — an AI search assistant on a laptop
screen, and two people going through printed charts. Worth recording how the
abstract route was closed: eight candidate red abstracts were downloaded and
their saturated pixels measured against the brand token. Every one came back
at hue 351 to 11 against the brand's 341, which is scarlet or orange rather
than raspberry. The measurement settled it, not taste.

**The drawn pair are not kept.** The usual treatment here is to leave an
unreferenced asset alone until someone is sure, which `growthBanner.webp` and
the five team portraits got. Those were assets whose section might return.
These were replaced on instruction by files already in the tree, so they went.

## The footer loses a column, 22 Sep

Who We Help comes out, What We Do becomes Services, and Strategy &
Positioning joins the remaining column, leading it because it is 01 of the
five capabilities and the eight service pages beneath it all assume it. The
grid returns to brand + two, which is the shape the Pixelette Technologies
footer this was rebuilt from has always had.

**The cost is real, and it is not a rendering one.** That column was the only
site-wide link to the five sector pages. They stay in the sitemap, stay
indexed, and are still reachable from the nav and from `/industries`, but
they have lost their internal links from every page on the site. It is
recorded in the component comment as well as here, because it is exactly the
kind of change that looks like nothing in a browser and surfaces in a crawl
three months later.

Related: [[04 Phase 2 — Navigation and footer]], [[09 Outstanding]],
[[10 Verification]]

## Four sections off, a ripple on, and the full stops taken back off — 22 Sep

Three instructions in one.

**Four sections removed:** what a full engagement produces, the illustrative
sample framework, the closing call to action and the four-question FAQ. The
page is three sections now — hero, methodology, diagnostic — down from seven.
Their components, stylesheets and copy were deleted rather than left
unreferenced; all of it is in `291592f`.

**What that costs, and it is not cosmetic.** The closing section held the
page's only call to action for a visitor who does NOT take the diagnostic, and
its only link back to `/services`. The diagnostic's own "Talk through my
results" survives but appears only after twelve answers. A visitor who reads
the page and does not start the instrument now reaches the end of it with
nowhere to go. Raised in [[09 Outstanding]], not fixed — it is a content
decision.

The dark budget falls to one band of three, and the page loses its
`band-closing`, so it now ends on the diagnostic's own light ground.

**The trailing full stops came off every heading.** The brief this page was
built to wrote several with one and they were kept verbatim as the client's
words. That was the wrong call: the 21 Sep punctuation pass took trailing full
stops off every heading on the site, so this page was the only thing
reintroducing them. Removing them restores the site's rule rather than
breaking one. The hero lost BOTH of its stops rather than just the trailing
one — the pair renders as two lines, so the break already does the work, and
one in, one out would have read as a typo.

### The ripple is a stated exception, not an oversight

Hovering a circle on the wave now sends a ring out of it on a loop.
`_surfaces.scss` says in terms: "NONE OF THIS LICENSES MOTION ON HOVER. Hover
still changes border colour only — no lift, no shadow, no scale." This is a
scale on hover. It was asked for directly, so it is registered at the top of
`_surfaces.scss` as the fifth motion surface, with its reasoning, rather than
left to look like a rule somebody forgot.

What keeps it defensible: it carries no information. All six names are already
set in text beside their circles, so touch — which gets no hover at all — and
keyboard lose nothing. It stops under a reduce preference. And it gets **no
cursor change**, deliberately: the circles are not links and a pointer would
promise an action that does not exist.

Related: [[05 Components]], [[08 Design system constraints]], [[10 Verification]]

## The chart comes off — 22 Sep

**The four columns are gone, replaced by a ring.** The user's word for the
chart was "boring", and it was — but not for a reason a redraw would have
fixed.

**Four named columns at four heights is a quantitative shape.** The 21 Sep
entry above says so, twice, and defends it by stripping the figure of anything
a reader could quote: no axis, no tick, no gridline, no value, and a hover that
gives a name and never a number. All of that was correct. None of it helped.
What was left was a chart that reads as a measurement, carries no measurement,
and can never be allowed to carry one, because the standing bar on unqualified
proof figures applies to this page. It was not boring by accident. **It was
boring because it had been hollowed out to stay honest**, and the hollowing was
the only thing keeping it defensible.

That is the general form worth keeping: **when the only way to make a figure
defensible is to remove what makes it a figure, the instrument is wrong, not
the execution.**

### The shape was already in the copy

Every one of the four outcomes names an input and an output. The right market
becomes qualified interest. Demand becomes sales-ready conversations. First
touch becomes a decision. Performance becomes commercial return — "and optimise
accordingly", which is a return path into the first.

So the shape the section's own words describe is a **closed loop**, and the
section is called the Growth System. Four columns could only say "these are
four things". The arcs say "this one produces what the next one runs on", which
is the claim the section is actually making and the one it can defend.

**A loop claims relation, not magnitude.** That is the whole reason this works
where the chart did not: there is nothing on it a reader could quote as a
figure, and nothing on it that needs one. The proof-figure bar does not apply,
rather than being narrowly cleared.

### Why a ring and not a chain down the page

Attempt one on 21 Sep failed by restating the four names in a second vertical
stack beside the first. The outcomes are a numbered list now, so **a vertical
figure on the right would repeat that failure exactly**. The ring is the one
arrangement that cannot be mistaken for the column it sits beside.

The return arc is dashed and labelled `optimise`, so the forward reading stays
a progression that feeds back rather than a wheel spinning in place. That
distinction is carried by the stroke, not by a caption.

### It is a tabpanel, and that is not decoration

The 21 Sep hover was CSS alone and legitimate **only because its label was
redundant** — every name already set in text beside it. The panel in the middle
of the ring is not redundant: what a stage takes in and hands on appears
nowhere else on the page. So it cannot be `aria-hidden` and it cannot be
hover-only.

Four controls selecting one of four panels is the tab pattern, so it is built
as tabs — `role="tablist"`, roving tabindex, arrow keys, Home and End,
automatic activation. **That also settles touch**, where the old figure's
hover-only label was simply unreachable and [[09 Outstanding]] had it listed as
deliberate.

Pointer hover on either side selects too, and selection is sticky: leaving does
not reset it. A figure that snaps back to Demand each time a pointer crosses it
flickers, and there is no state here worth protecting.

### The 2×2 grid becomes a numbered list

That grid read **down** its columns — Demand and Conversion in the first,
Pipeline and Revenue in the second — so the framework's order survived only in
a source comment and in a sentence underneath restating it. **A chain that has
to explain its own sequence in prose underneath is not drawn correctly.**

The closing line loses its first half. "Demand. Pipeline. Conversion. Revenue."
was answering a question nothing asks once the items are numbered. "Every
channel should have a reason to exist" is the argument and it stays.

This makes the hairline-rows idiom's fourth call site. It qualifies on the same
test [[08 Design system constraints]] states: these four are **ordered, not
parallel**, and a grid of equal boxes claims the opposite — loudly enough here
that the section needed a sentence to contradict it.

### One line of new copy, and it is flagged

"Revenue does not end the system. It optimises what feeds it." The ring can
draw the return path and label it, but it cannot say why the system does not
end at revenue, and that is the argument the loop exists to make. It is the
only prose on this section that is not the brief's. Raised in
[[09 Outstanding]] for a wording check, not for approval.

### What the browser found, and the gates could not

Three faults, all after six green gates. They are in [[10 Verification]] in
full. The one with a rule in it: **everything drawn in the svg is in viewBox
units and scales with the figure; everything drawn in HTML over it was in `rem`
and did not.** At the 1160 wrap the two happened to agree. At 768px they did
not, and the figure read "optimise TAKES IN interest" across one line. The fix
is the first container query in the stylesheet — see
[[08 Design system constraints]].

**`public/home/growthBanner.webp` is still referenced by nothing**, three
figures later. Unchanged by this.

Related: [[03 Phase 1 — Homepage]], [[05 Components]],
[[08 Design system constraints]], [[09 Outstanding]], [[10 Verification]]


## 23 Sep — the mobile navigation

### Native `<details>` over a state-driven drawer

The reference is built this way and matching it was the instruction, but it
would have been the right choice regardless. The drawer it replaces was a
`<figure>` with an `onClick`: not focusable, and not openable from a keyboard
at all. `<summary>` is focusable and activates on Space with nothing written,
and the exclusive accordion is an HTML attribute rather than a reducer. Less
code is the smaller half of the argument.

What HTML does not do is close on client-side navigation, because the reference
is served per page and a click there reloads the document. That is the only
JavaScript left in the component: a ref, an `onClick` on each link, and an
effect on the pathname for the cases `onClick` cannot see — the back button, a
redirect, and a link to the route already open.

### 960px, which is MEASURED AND NOT COPIED

This is the decision most likely to be undone by someone tidying up, so the
reasoning belongs here and not only in the stylesheet.

The reference switches to its drawer at 860px, and the obvious move was to take
that number. **It would have moved the fault rather than fixed it.** This bar
has an intrinsic minimum of 898px — a 129px wordmark, 838px of links, and a CTA
that is `white-space: nowrap` and so cannot shrink — and at 861px it overflowed
the viewport by 37px. Theirs fits at 860 because their bar is 677px wide.

Walked at 870, 880, 890, 897, 905 and 961: the last width that overflows is
897, the first clean one is 898. **960** takes that with about 60px of headroom
rather than the 2px that 900 would have left.

The general rule is the part worth keeping: *a breakpoint is a fact about your
own layout.* A number lifted from a site whose furniture is a different size is
a guess wearing a measurement's clothes.

### The CTA keeps the solid button

Theirs is outlined. Ours is the crimson `.btn.primary`, which is what the
desktop bar carries, and splitting the treatment would have made one action
look like two different weights of thing depending on window width. The
mismatch with the reference is deliberate and is the smaller of the two costs.
Raised for management rather than decided for them — see [[09 Outstanding]].

Related: [[04 Phase 2 — Navigation and footer]], [[09 Outstanding]],
[[10 Verification]]

## 23 Sep — the growth figure rebuilt to a supplied reference, fifth attempt

A design was supplied as an image and the instruction was that the home page's
"Everything we do has to move a number that matters" widget should be like it.
It is the fifth figure in that slot. The four before it — a stepped chain, an
inward coil, four ascending columns, and the ring of bare pills those columns
became — are recorded above.

**What the reference is.** The same four stations on the same ring, but each
one is now a white card carrying an icon badge, its name, and a one-line
summary; each card has a bordered note tethered to it holding **the question
that stage answers**; the middle is a fixed medallion reading *Commercial
impact / Measure → Learn → Optimise*; and the dashed return path carries a
written annotation, *Learn. Optimise. Repeat. — insights from performance feed
the next cycle.*

### The fork that had to go back to the requester

The reference is drawn on roughly a **1760px canvas** — a 1070px figure beside
a 690px text column. `--container-wrap` is **1160px** site-wide. There is no
arrangement in which both survive, so three options were put up:

1. Keep the composition, shrink the figure to the ~690px it can have, and
   accept that everything inside lands at 62% of the reference.
2. Give the figure the full 1120px by moving the heading and the numbered list
   above it — every element at its designed size, different composition.
3. Keep the composition and drop the tethered notes, folding each question into
   its own card — legible type, but the tethered note is a distinct part of the
   reference's look.

**The instruction was 1.** So the composition is the reference's and the size
is not. The practical floor that came out of it is **11px**, which is
`.eyebrow`'s size and therefore a size this site already sets. One line is
below it — the medallion's *Measure → Learn → Optimise*, at about 9px, because
26 tracked characters have to cross a disc that cannot grow without touching
the cards north and south of it. That one is in [[09 Outstanding]].

### The tablist is gone, and with it the client boundary

Attempt 4 put its real content — what each stage takes in and hands on —
**behind an interaction**, so a reader saw one quarter of it at a time and a
printed page saw none. The reference puts everything on screen at once. That is
a better trade twice over: a question is what a reader actually arrives with,
and four of them visible together are an argument where four handoff nouns
revealed one at a time were a mechanism.

So there is no state left. `GrowthSystem` was `"use client"` for the tablist
alone, and **the pairing that made the list and the figure one component — hover
an outcome, light its station — now costs nothing at all**: `:has()` reads the
hover across the two columns in the stylesheet. Verified in a browser in both
directions, four rows and four stations, eight for eight. That also retires the
contrivance where `GrowthSection` passed the heading block down as children to
keep it off the client bundle; there is no client bundle.

### Three places the reference was not followed

- **Conversion's summary loses its trailing full stop.** The reference sets
  that one with a stop and the other three without. Four fragments in identical
  boxes take identical punctuation, and the 21 Sep rule already took trailing
  stops off everything here that is not a sentence.
- **Revenue's summary was rewritten.** The reference sets it at 55 characters
  against the other three's 24, 31 and 33 — and on a card sized for those three
  it ran to six lines, making the Revenue card half again as tall as the others
  and throwing the ring off its own symmetry. It also restated, almost word for
  word, the question tethered six pixels to its left. It reads *Connect
  performance to commercial return* now, condensed off the same approved line
  in the list. **This is a judgement made here and nobody has signed it off.**
- **The cards are all one height.** Measured, the four came out at 106, 124,
  124 and 141px, because the summaries wrap to two, two, two and three lines.
  Four cards of four heights centred on a circle do not read as a ring. The
  floor is the tallest of them.

### Icons

Five, from Lucide via `react-icons`, which was already a dependency but had
only ever been used for chevrons and a search glyph. This is **the first time
an icon carries meaning in page content on this site**. They render with
`currentColor`, so the token gate is untroubled and colour stays contextual.

Related: [[03 Phase 1 — Homepage]], [[05 Components]],
[[08 Design system constraints]], [[09 Outstanding]], [[10 Verification]]

## 23 Sep, same day — the tethered questions come back off

The four bordered notes above were built, looked at, and then **removed on
instruction**. What is left is the ring, the four cards, the medallion and the
feedback annotation.

**It reversed the fork settled earlier the same day.** The reason that fork was
hard — 1160px of container against a reference drawn on 1760 — was almost
entirely the notes. The east and west ones had to fit between their card and
the edge of the box, so the plot's inset was `half a station (8.5) + a tether
(2.5) + a note (15) = 26cqi`, which held the ring to 48cqi and dragged
everything else down with it. Removing them makes the inset `half a station
plus a pixel of air`, and the ring goes to 76cqi.

Measured at 1440, before and after:

| | with notes | without |
|---|---|---|
| ring | 343px | 537px |
| card | 121px | 155px |
| medallion | 186px | 254px |
| card name | 10.7px | 13.4px |
| card summary | 11.7px | 14.5px |
| medallion flow line | **9.0px** | 12.0px |

**So the item this rebuild put at the top of [[09 Outstanding]] is closed by
the same instruction that closed the notes**: nothing in the figure is below
11px any more, and the 9px exception is gone.

**What it costs, and it should not be written down quietly.** The questions
were the one thing in the figure that was not a restatement of the numbered
list beside it. The cards now carry condensed versions of copy set out in full
three hundred pixels to their left, which is the exact failure that sank
attempt 1 — *"it put the four names on screen a second time, three hundred
pixels from the grid that already carried them."* What keeps this version
honest is that the ring makes a claim the list cannot: **the order closes, and
revenue feeds demand.** The figure is earning its space on its shape rather
than on its words, which is a thinner argument than it had an hour ago and is
worth revisiting if the section is ever reworked again.

It also removes four pieces of unapproved copy from the page, which cuts the
other way and is recorded in [[09 Outstanding]].

**One fault came out of the change and it is a good one.** Enlarging the ring
made the arrowheads disappear. They were being drawn at 80 of the 90 degrees,
which had cleared the small cards — but a card is centred on its ring point and
now reaches 70px either side along the tangent, about 15 degrees, with the
badge taking it to roughly 21. Every arrowhead was being drawn underneath a
badge, and the arcs looked like they simply stopped at the cards. Moved to 66
degrees, which is also where the reference puts them. See [[10 Verification]].

## 23 Sep — Who we help becomes nine sector cards, from a supplied design

The third shape this section has taken. Four linked technology cards until
21 Sep, a typographic field of eleven markets until now, and a 3×3 grid of nine
cards from a design supplied as an image.

**It reverses the 21 Sep decision recorded above, and the reversal is narrower
than it looks.** That entry argues that boxed, equal, linked sectors read as a
client boundary, and that a longer list makes the same claim as a short one —
*"twelve cards say what four say, only at greater length."* The first half
still holds and the second does not survive contact with what the nine
actually are. Four cards all naming technology assert a boundary because they
agree with each other. Nine spanning technology, money, health, retail,
property, services, education and industry agree about nothing except that
Pixelette does not need them to agree, and the ninth says so outright. The
layout and the standfirst finally make the same claim instead of arguing.

**Nothing links, and `to` is still absent from the data shape.** That part of
21 Sep is kept deliberately. The industry pages are reachable from the nav and
from `/industries`; a card here is a statement of range, not a door, and an
empty `to` sitting in the type is an invitation to quietly reintroduce the menu.

**"And beyond" is a card rather than a line, and it is marked as a different
kind of thing.** It takes the brand tone where the other eight take a hue, and
its title is the only one set in brand colour. It is still the sentence the
eight would otherwise fail to say; it is no longer a footnote in a smaller
size.

**The eight chip hues were going to be scoped to the component, and the token
gate was right to refuse them.** The intention was `--sector-*` custom
properties in `_dynamicMarket.scss`, following the precedent `_reveal.scss`
sets for its timing tokens and `_marquee.scss` for its gap — deleting the
section would take the palette with it and leave nothing on `:root` for the
next component to help itself to. `lint:legacy-tokens` fails the build on a hex
literal anywhere under `src/`, and its docblock states the reason: one file
answers *what colours does this site use*. **A scoped palette the gate cannot
see is exactly what the gate exists to prevent.** So sixteen tokens went to
`:root` and the rule that stops them spreading is written beside them rather
than enforced by scope. That is weaker, and it is recorded as weaker in
[[08 Design system constraints]].

**The photography does not exist, and the fallback is a decision rather than a
placeholder.** The design shows a photograph bleeding into each card from the
right and fading out under the copy. No such photography is in this repository.
`SectorCard.image` is optional; the art layer declares the image and a tone
gradient as two background layers in one rule, so an unset `--sector-art`
resolves to `none`, draws nothing, and the gradient is what shows — in the same
geometry, behind the same mask. **The empty state has no branch and no grey
box**, and the only change when the assets arrive is filling in one field.

**`/industries` was left alone on instruction**, which is why `markets`,
`beyond` and `positioning` are still in `whoWeHelpData` and `.marketField` is
still in a home-page stylesheet. Three fields and a block of CSS that the home
page no longer touches now exist solely for the hub, and every one of them is
labelled at its declaration so a later reader does not delete them as dead. The
cost of the instruction is one source of truth describing the same sectors
twice, in two shapes, free to drift.

**The copy is the design's verbatim, and one line of it reaches further than
the section.** The standfirst moved from third person to second — *"the
audience, proposition … of each business"* became *"your audience,
proposition"* — and `/industries` reads the same `lead`, so the hub's
standfirst changed without the hub being touched.

**The call to action's label is the design's; its destination is not, because
the design does not specify one.** "Let's explore your opportunity" reads
conversational enough to point at `/contactus`, and it was left on
`/industries`. This control has been the only route from the home page into the
sector hub since 21 Sep. Pointing it at the form would orphan the hub behind
the nav, which is a navigation decision the image cannot be read as making.

**The three growth stages gained a head of their own.** They were a bare row
under a prose close; the design gives them an eyebrow, a two-line heading and a
standfirst. That puts **two eyebrows inside one section**, which nothing else
on this site does. The heading outline is what keeps it legal: the section
eyebrow stays the `h2`, both display headings are `h3`s, and the second
eyebrow is a `<p>` — promoting it to a heading would either outrank the cards
above it or open a sibling section that does not exist.

**The stages are not `PointItem`.** That component stacks an optional icon
above its title; the design sets the mark beside the text, and `PointItem`
carries no `className` escape hatch by deliberate design — *"an unused hatch is
how a shared card acquires six bespoke per-section overrides and stops being
shared."* Writing bespoke stage markup respects that rule; adding a variant to
`PointItem` for one call site would break it. `stages` is typed `GrowthStage[]`
now rather than `PointItemContent[]`, so the two are not confused later.

Related: [[03 Phase 1 — Homepage]], [[05 Components]],
[[08 Design system constraints]], [[09 Outstanding]], [[10 Verification]]

## 24 Sep — the old site audited against the new

**The new site was compared page by page with the live one it replaces**:
`www.pixelettemarketing.com` against `pixelette-marketing-website.vercel.app`.
Every URL in both sitemaps (23 old, 28 new) was fetched from both hosts, along
with every internal link found on those pages. Headings and text were then
compared line by line. Both home pages were also rendered in headless Chrome at
1440 and 390, because the old site builds its menus, logo marquees and cookie
banner in the browser. The result is a 50-finding ledger, each finding quoting
both sites and linking both URLs, published as a private artifact:
https://claude.ai/artifact/HxohvkJhWpmHmnrS7yRiXa.

**The finding that frames the rest: the pitch changed more than the pages.**
Every old URL still resolves. What moved is the claim — from a full-service
agency for Fintech, SaaS, Web3 and tech to a cross-sector growth partner — and
the proof standard: more than forty unattributed percentages, the "300
influencers" claim, the team and one testimonial came off, and `/results` with
sourced figures went on.

**The old site is carrying live faults the rebuild fixes**, which matters when
anyone argues for keeping it:

- an internal design note published as body text on `/contactus`: *"Show
  locations in a different way, not really happy with how it's currently done
  here…"*
- a Startup card linking to `/industries/undefined`
- a form citing a "Cookie & Privacy Policy" that returns 404
- "pick a time from our calendar", with no calendar
- service and sector menus that exist only after hover, so the home page's
  server HTML links five internal pages against the new site's 23

**The verdicts, all given by the user on 25 Sep:**

- **C-06, the consent sentence — fixed on Vercel.** The env value was the old
  site's half-sentence ending "in line with the", which ran into the form's own
  link and printed "…in line with the Read the privacy notice". It is now a
  complete sentence. The code needed no change: `ContactUsForm` appends the
  link itself, so the value must never name the notice. See
  [[06 The enquiry form]].
- **R-02, `/success_stories` and `/story/[id]` — deleted.** They were not
  redirected to `/results`: the user's instruction was "we don't need it".
- **H-15, the home page at twice the old length — approved as is.** Roughly
  9,700px against 5,000 at 1440, and 14,300 against 6,900 at 390. The content
  is signed off. **Do not treat the length as an open item.**
- **H-07, community management — named again** (below).
- **H-09, the tool band — restored** (below).

**What was recommended for return and is still open** is in
[[09 Outstanding]]: the Positive Prime testimonial, the free-first-call and
priced-plan promise, a named team, the founding year and a contact-page office
card. Each carries a condition. The rule the audit applied throughout: most of
what the rebuild removed came off for lack of substantiation, and nothing comes
back without it.

## 24 Sep — the tool list comes back, as "Tools we work in", on /services

The old home page ended on a crimson marquee headed *"Our range of marketing
tech and platforms"*: fifteen vendor logos, Jira twice, scrolling in two rows.
It came off on 8 Sep (`595bb24`) because the brief says software logos must not
become the proposition, and that freed a dark band. An audit against the old
live site then found the cost: **the new site names no tools anywhere.** Growth
Intelligence promises analytics, attribution, dashboards and workflow
automation in the abstract, and a buyer checking whether we would work in
their stack has nothing to check against.

**It is back on `/services`, not on the home page.** The home page was flagged
as already twice the old one's length. On `/services` it sits inside capability
05, Growth Intelligence, beneath its service link, because joining those tools
up into a commercial decision is that capability's job. It is five short rows
grouped by job — analytics and insight, search, email and outreach, social and
content, workflow — so the list reads against the capabilities rather than as a
wall.

**The heading is "Tools we work in" and it claims nothing more.** No
"partners", "trusted by", "certified" or "official": a subscription is not a
partnership, and every one of those words asserts a relationship with the
vendor that nobody has evidence for. The one line under it says only that
these are the tools the team works in, grouped by use.

**Two came off the old fifteen and one went on.** PyTorch is a
machine-learning framework, not marketing tooling, and on a services page it
reads as a claim about ML work the site makes nowhere else. Jira is project
management. **Both are excluded pending confirmation**, not ruled out. Google
Analytics 4 is added because it is the one tool we can prove is in use — this
site loads its own GA4 property. Fourteen in all.

**Names, not logos.** The fifteen marks are still in `src/assets/common`, and
every one is knockout white with its fill hard-coded — invisible on `/services`'
light ground without retinting third-party brand marks, which is a brand-usage
question rather than a CSS one. There is no GA4 mark at all. So all fourteen
are set in the page's own type: one consistent treatment, coloured by tokens,
and no vendor branding standing in for the offer. No band, no motion — the
marquee was a motion surface and this adds none.

**The list is unconfirmed**, and says so at its definition in
`src/data/services/toolsWeWorkIn.ts`. See [[09 Outstanding]].

**Looked at in headless Chrome at 1440, 900 and 390, and looking removed a
hairline.** The block first sat on a rule the width of the capability's
column, on the theory that starting right of the numeral marked it as part of
05. At 390 the numeral stacks, the column starts at the gutter, and the rule
was identical to the separators between capabilities — it read as a sixth row.
It separates on space and its eyebrow now. No horizontal overflow at any of
the three widths.

Related: [[07 Results and hub pages]], [[08 Design system constraints]],
[[09 Outstanding]]

## 25 Sep — superseded a day later: the tools become a logo band

**On instruction, with the client-logo band as the reference**: the same dark
section, the same white marks, the same marquee. The 24 Sep text list is gone,
and so are its `tools` field on `capabilityGroups` and its `.capabilityTools`
styles.

**It is the client band, not a copy of it.** `TrustedBrands` took an `items`
prop — marks with a name each — and a `className` modifier, so both bands are
one component and cannot drift. The client strip renders exactly what it did;
checked on `/`, `/aboutus` and a service page.

**Where it sits:** its own full-bleed band after the five capabilities and
before "Talk to us about your growth plan", which moved into its own `.sec-sm`
section below it. After, because the tools are how the work is done rather
than what is sold. Before the button, so the page ends on the way out rather
than on a dark band running into the dark footer. It is `/services`' first and
only dark band, well inside the three-per-page cap.

**The motion needed no new exception.** `_marquee.scss` already sanctions the
marquee for "the client-logo strip and the platform strip", which was this
band. 90s instead of 40s, so fourteen marks move about as slowly as six.

**The marks are the old band's own** — thirteen of the fifteen white svg
components in `src/assets/common`, which is also why it has to be dark. Each
wrapper carries `role="img"` and the vendor's name, because the svgs are
aria-hidden. GA4 has no mark, so it is a white wordmark in body type.

**Looked at in headless Chrome at 1440, 900 and 390; one fault.** Every svg was
set to one height, and Semrush — seven times wider than tall — came out at
185px and read as the headline vendor. Capped at 8rem wide, it letterboxes
without distorting. No horizontal overflow at any width.

**What the 24 Sep reasoning said against this still stands**, and is recorded
rather than argued away: the 8 Sep brief says software logos must not become
the proposition. Putting it on `/services`, after the capabilities, is the
mitigation. See [[09 Outstanding]].

## 25 Sep — community management is named again

The old home page sold Community Management as one of nine services. The
five-capability rewrite dropped it without a decision: it survived only as
"Crypto Community Management" on the Web3 page. The audit found the cost —
**BlockGuard, the lead case on `/results`, is mostly a community result** (975
Telegram and Discord members, 29,974 engagements), so the site's best proof
pointed at a service the offer no longer named.

It is back as one phrase in Demand & Performance's sub-list, after "social
media", in `homeContent.ts` — agreed with the user. **No page and no menu
entry**: the menu lists pages, and there is no content for a page. The old
card copy was not revived; the sub-list is short phrases.

Looked at on the home page at 1440, 900 and 390: card 02 still wraps to three
lines like its neighbours, so the row stays level. No overflow.

## 25 Sep — the final correction pass

Built to a management brief, "Final website correction pass". A consistency
pass, not a redesign: no new components beyond small props, no home page
change, no URL change.

**The five deeper-experience pages** (`/industries/ai`, `fintech`, `saas`,
`tech`, `web_3`) share one architecture now, in `industriesData.ts` and
`industries/[slug]/page.tsx`: hero → what marketing has to solve → where
Pixelette can help → the five capabilities (the home page's `ItemsSection`,
dark, titles imported from `growthSystemData`) → the four process stages →
evidence → FAQ → "Tell us what needs to grow." (`#enquiry`). Off every page:
the nine "Crypto SEO Services"-style cards, the Book/Audit/Plan/Execute block
promising a free consultation and transparent pricing, the "X is moving fast.
Are you?" band, and FAQs that restated the service list.

Calls worth knowing:

- **Fintech says outright that Pixelette is not a law firm or regulatory
  adviser**, in the brief's own sentence about working alongside legal and
  compliance. Its first FAQ declines to promise FCA compliance.
- **Web3 promises no token performance, returns or market outcomes**, and its
  evidence is the BlockGuard case study rendered from the `/results` object
  itself, so the figures cannot diverge between pages.
- **WebBookingPro is the Technology page's evidence**, because management's
  own copy calls it "an accommodation technology solution". Qualitative, as
  supplied. A judgement call; see [[09 Outstanding]].
- AI, SaaS and Fintech show no evidence section: there is none to show.
- The URLs stay `web_3` and `tech`. `/industries/web3` and
  `/industries/technology` redirect (307) to them.

**Contact.** "Stop watching others win…" and "Book an intro call with us, free
of charge" are gone; the h1 is "Tell us what needs to grow." with the brief's
standfirst, and the form's own intro is switched off there (new `formIntro`
prop on `ContactSection`) so the line is not printed twice. The process is
Understand / Diagnose / Recommend / Start, verbatim. The NDA sentence is gone
and not replaced. Blog posts, which borrowed the contact opening as their
close, take the `/results` close instead.

**Tools band: removed.** Nothing in the project verifies the list, and
management never confirmed it; only GA4 is evidenced. The brief's rule
decided it. `toolsWeWorkIn.ts` stays, marked unrendered.

**Insights.** Eyebrow "Insights", h1 "Practical thinking on growth, marketing
and the markets changing both." Posts carry a `category` from a fixed list of
seven; only categories with a post render, so no empty filters.

**Claims.** Service pages stopped rendering `ResearchSection`: 24 percentages
attributed to a publisher and year only, three of the publishers apparently
non-existent, two citations truncated to "202". Unimported
`singleIndustriesData.ts` (60%, 80%, "$20,000", about another company),
`web3Services.ts` and `talkBusinessData.ts` deleted. Every "free
consultation" and calendar promise on the service pages became "Send us an
enquiry". "Book a consultation – it's on us!" (QuestionAndAnswer),
"Book a call" / "Get a proposal" (ServicesHero) and the eight closing
answers were brought onto "Tell us what needs to grow". Legitimate figures
kept: BlockGuard's (management-supplied) and the blog posts' third-party
statistics, which cite their sources in the text.

Related: [[09 Outstanding]], [[10 Verification]]

### 25 Sep, review of the correction pass against its brief

A second read of the brief, section by section, found the first pass short in
five places. All fixed:

- **§8 said remove, and the pass had only hidden.** The service pages'
  `research`, `status` and `importance` data (24 blocks, every unverifiable
  percentage and "leaders of billion dollar brands") is now deleted, with
  `ResearchSection`, `Status` and `Importance` and their stylesheets. Nothing
  is parked for later: a figure comes back written fresh, with a linked
  source.
- **§13/§14 on the service pages**: five meta descriptions still said "Let's
  talk", "1st consultation is on us! 🤙🏼" and similar; body copy still said
  "unlock", "industry leader", "coolest" and "Supercharge". Rewritten. The
  unused `btnText` fields holding the old CTA are gone.
- **§11**: related-article cards showed hand-typed labels ("Fintech") that no
  longer matched the new categories. They are derived from the linked post's
  category now.
- **§16**: the consent checkbox had no error message, so an unticked box
  blocked the submit silently. Found only by exercising the form.
- **§17 metadata**: `<html lang>` is `en-GB`, service pages' `og:locale` is
  `en_GB`, `/privacy` and `/cookie-policy` gained Open Graph tags, and three
  descriptions this pass had written or lengthened were brought under 165
  characters.

## 28 Sep 2026 — the Creative Transformation: built, stopped, rolled back

**What was asked.** A management brief, "Phase 1 — Creative transformation,
homepage + industries + evidence architecture", superseding the earlier rule
not to redesign the home page. It asked for a more dynamic, less card-heavy
experience: an animated hero, proof moved early (BlockGuard), the five
capabilities as an interactive system, Demand → Pipeline → Conversion →
Revenue as a scroll journey, a dark AI section, "Who We Help" renamed
"Industries" and Results taken out of the primary nav.

**What was built** (`abc9477`, 64 files; notes `b487cf3`): all of the above,
audited twice against the brief and pushed live. The full record — every
chapter, every fault found by looking — is in `02 Decisions.md` and
`10 Verification.md` on `backup/main-before-restore-2026-09-28`.

**Why it was stopped.** Management judged it the wrong creative direction:
"dynamic" had been read as animated diagrams, growth-system graphics,
dashboard-style visuals and process visualisations, and BlockGuard had
become the site's opening identity. The instruction:

- preserve the work separately, do not delete it;
- restore the clean pre-redesign home page as the baseline;
- no Growth Engine, no animated Demand → Revenue feature, no more animated
  diagrams, BlockGuard not near the top, no fake work, no generic stock;
- keep the approved positioning and copy for reuse;
- **from now on, section by section, and wait between sections.**

**How it was rolled back.** `main` was restored to the tree of `ee628e2` as a
new commit, `06bb8fe`, rather than by resetting: history is intact and the
push needed no force. The previous `main` is on
`backup/main-before-restore-2026-09-28`, pushed to GitHub; a local
`archive/creative-redesign-2026-09-28` branch and tag hold the same work. The
restore also dropped `8d1a11f`, a vault-only note, which has been re-applied.

**Reusable from the archive, only if asked:** the one-sentence hero lead, the
three editorial statements, the brief's Industries headline and lead
("Different markets. Different challenges."), the qualitative WebBookingPro
treatment, and the evidence architecture (studies carrying their own figures,
anchors on `/results`).

## 28 Sep 2026 — "Intelligent Editorial", locked; Phase 1A, the hero

**The direction.** Commercial intelligence, made visually compelling. Three
ingredients: *commercial editorial* (type, restraint, whitespace), *a living
signal* (an abstract language of signal emerging from noise) and *a commercial
canvas* (interactive typography, later, for What We Do and Industries). No
other direction is to be combined with it.

**Phase 1A — the hero only.** Built on the restored baseline on the local
branch `feat/hero-intelligent-editorial` (`28785d3`), in the worktree
`D:/Projects/Pixelette_Marketing_Website-hero`.

- Content left, visual right, about 55/45. One `<h1>` on two lines, verbatim
  ("Marketing that matters / to your bottom line."), sized from its own
  column (`10.4cqi`) so it holds two lines from 1440 down to about 900px. No
  moving or rotating words.
- The brief's supporting line; "Build my growth plan" as the button;
  "Explore what we do" as a text link; "Strategy · Demand · Search ·
  Pipeline · Intelligence" as a quiet line of type, not pills or links.
- **The Living Signal** replaces the collage: one canvas of fine hairlines
  that starts as noise and, once per view, lets five unlabelled flows find
  direction and resolve into a single line. Crimson only on the flows.
  Ambient drift afterwards at half rate; a small local re-orientation near a
  fine pointer; nothing on touch; one resolved still frame under reduced
  motion; paused off screen. No dependency added.
- The 8 Sep eyebrow, lead, reach and closing line stay in `homeContent.ts`,
  unrendered, for reuse. Nothing below the hero was changed.

**Status: awaiting visual approval. Not merged, not live.**


## 28 Sep 2026, later — the Living Signal: redrawn, then rebuilt to a supplied image

All on the local branch `feat/hero-intelligent-editorial`, in the worktree
`D:/Projects/Pixelette_Marketing_Website-hero`. Nothing merged or pushed.

**First redraw (`0ad8f31`) — threads, not lines.** The hero brief ends with
seven questions and says to refine until every answer is yes. Three were no.
Five single hairlines meeting at a point is a *diagram* of convergence — it
read as a starburst — and as a still frame (the brief's question 7) it could
not hold half the screen. Each flow became a bundle of fine threads, frayed at
its source and gathered at the point, all five arriving from the left so they
braid in rather than radiate. Crimson kept to each bundle's core; one thread
per bundle on a phone, where two made the drawing read as five red lines.

**The concept image supersedes the brief's description of the figure.** The
user supplied the image they had in mind and ruled it the absolute truth for
form. Where it and the brief disagreed, the user settled each point:

- **Colour: the brand's, not the image's.** The image is blue, violet and
  orange. Translated, token by token, read at runtime so the token gate stays
  green: blues → `--color-footer-bg` (deep wine), `--color-body` and
  `--color-panel-muted` (plum-greys, dusty rose); violet → `--color-brand-hover`;
  the orange band and lit point → `--color-brand-signal`; the haze →
  `--color-brand-tint` and `--color-brand-wash`; the point's core →
  `--color-page`.
- **Labels: added, against the brief.** The brief says *do not label the
  visual*; the image carries two groups — *Insight / Strategy / Action /
  Growth* and *People / Ideas / Technology / Real results* — and the user
  asked for them, on the understanding they may be dropped after review. Set
  as HTML type (small tracked capitals, right-aligned, a vertical hairline
  above and a short rule below), inside the aria-hidden figure because they
  are part of the picture, and faded in once the drawing has resolved. The
  words live in `heroCopy.signalLabels`.
- **Alignment: as the image.** Everything converges on a point at the right
  edge. The recommendation was to pull it inside the frame or mirror it
  towards the headline, because an edge point leads the eye off the screen;
  the user chose the image.

**The form, as built (`3906c3a`).** One sideways teardrop: two wings of
hairlines above and below a warmer central band, a crown of warm lines from
the upper right, three long framing arcs, about 5,000 points of varied size
placed along the lines and in a teardrop envelope — never on a grid — a haze
behind the wings, and a lit point. The CSS mask came off, because the point
sits at the right edge where a mask would dim it. Proportions: about
1 : 1.07 side by side (the image's), 1.35 : 1 when stacked at tablet width —
1.7 : 1 flattened the teardrop into a streak — and square on a phone.

**Then, on instruction — larger, smoother, a richer pointer (uncommitted):**

- **Larger by taking the gap, not the copy's share.** Side by side, the figure
  reaches back across the column gap to within 1rem of the copy (the gap's own
  clamp less 1rem, so it tracks the gap). 480×514 became 536×584 at 1440px and
  the headline stayed at 63.2px to the pixel. The figure's left edge is its
  faintest part, so nothing crowds the text.
- **Smoother.** Easing changed from ease-out to smootherstep — ease-out moved
  every point fastest in its first frame, which read as a jolt. The resolve is
  a little longer (about 4.2s). Lines grow to an interpolated tip rather than
  a sample at a time; signals glide along the line rather than stepping; the
  settled state runs at full frame rate, because at half rate the travelling
  signals visibly stepped.
- **Pointer.** Three cached depth layers (lines and haze, fine points, large
  points) shift by 3, 8 and 16px against the pointer, and a soft crimson light
  about a quarter of the figure wide follows it, lighting the threads beneath.
  Both eased. This goes further than the brief's "felt rather than noticed",
  on instruction.

**Where the build still differs from the image, knowingly:** a one-hue brand
palette cannot reproduce the image's blue-to-orange contrast, so the wings and
band separate more quietly; the figure is a column, not a poster; and on a
phone the labels are about 9px and cross some lines.

**Status: awaiting visual approval. Not merged, not live.**

## 28–29 Sep 2026 — home sections 01–04, built to the locked specification

On the local branch `feat/home-sections-01-04`, cut from `main` (`5ce2322`),
in this repo only — the `-hero` worktree was not used. Not pushed, not live.

The brief is a locked management specification, "Sections 01–04", with an
approved reference image: **the image is the visual truth, the spec the
behavioural one**. 01 the hero (the Living Signal), 02 "More activity isn't
the answer / Better decisions are" (falling Post-its), 03 "Five capabilities /
One commercial objective" (toy bricks and builders), 04 "Attention is easy to
buy / Relevance isn't" (yellow ducks, one pink). The pasted spec **stops mid
sentence at §34** ("Do not decide … Do"); nothing past it was assumed.

**Asked and answered before a line was written:**

- **Placement.** 02–04 sit directly under the hero; everything from the logo
  strip down is untouched, in its old order.
- **A fourth type role: handwriting.** Caveat, self-hosted through next/font
  like the other three, as `--font-hand`. For illustration lettering only —
  the Post-its, the two annotations, the brick labels, "Real growth builds
  here" — never a heading, body copy or UI.
- **The rail labels are in.** The small stacked capitals on each section's
  right edge are in the image and not in the spec's copy; included verbatim
  from the image as approved copy.
- **"Our approach →" goes to `/strategy-positioning`.** There is no approach
  page; the diagnostic is the nearest thing. "Explore all services →" goes to
  `/services`.
- **Imagery: vector, on instruction, so it can be judged against real
  assets.** No photographs existed. Stock was looked at — pngimg's cut-out
  ducks are CC BY-NC and unusable on a commercial site, and no stock photo is
  close to the composed brick scene — and the user chose SVG drawn as close to
  the references as SVG allows. Every illustrated object is its own component,
  so swapping in a real asset is a file change, not a rebuild. The user
  supplied cleaner reference photographs for the bricks and ducks on 29 Sep
  and both were redrawn to them, in the photographs' own pixel coordinates.

**Decided in the build, by the spec over habit:**

- **The site is not two-tone in these sections, by instruction.** The spec
  pairs Pixelette UI colour with multicoloured visual metaphors. A new token
  block, "Illustration palettes", holds the signal, Post-it, room, brick,
  figure, duck, sky and water colours — for illustrations only, never text, a
  control or a band — in `_tokens.scss`, where the token gate can see them.
- **The Living Signal's colour reverses 28 Sep.** It was translated into the
  brand's wine; the spec says the broader treatment was the approved one and
  not to recolour it pink. Blue upper wing, violet into magenta below, an
  orange band, a warm lit point, as the `--signal-*` tokens. Ported from
  commit `3906c3a` through git; the worktree's uncommitted "larger, smoother,
  pointer light" round is not part of this. Its labels are now the final
  reference's: *Ideas / Intelligence / Action / Growth* and *A more
  commercial tomorrow*, and it carries the approved "From insight to impact"
  with an arrow to the point.
- **The five-word capability line under the hero CTAs is gone**, by the spec:
  Section 03 says it. The 8 Sep hero lines are kept unrendered under
  `heroCopy.retired`.
- **The hero headline is ink throughout and breaks on three lines**, as the
  image draws it, where the spec writes it on two.
- **Pill CTAs in these four sections only** (`.btn.btn--pill`). The group
  control radius stays 4px everywhere else, including the nav button.
- **Every moving picture has a stage that starts where the copy ends**
  (`--scene-stage-left`: the container edge plus 31rem, which clears the
  widest one-line headline). Notes and ducks are placed in percentages of it,
  so neither can reach the words at any width — the spec's "never obscure
  essential copy" by construction, not tuning.
- **The motion rhythm is the spec's: controlled, energetic, calm, playful.**
  02's notes fall once when the section is properly in view (not merely
  near it), sway by a degree, a few background notes keep drifting, and a
  fine pointer nudges a note a few pixels. 03 is still but for a 3px lift on
  hover. 04's ducks bob on their own periods. All of it transform and
  opacity, paused off screen, still under reduced motion; registered as
  surfaces 6–8 in `_surfaces.scss`, as spec-mandated exceptions to "hover
  changes border colour only".

**Then, on instruction, 29 Sep:**

- The leafy plants were removed from the 02 and 03 backdrops, and the rule
  between the home sections with them.
- **Each band fills the screen below the sticky header**:
  `height: calc(100dvh - var(--header-h) - 1px)` (the bar and its 1px rule),
  as `--home-band-h`, with `min-height: fit-content` so a band never gets
  shorter than it was. On a phone the picture row takes the spare height.
- **The ducks drop in.** Once, when 04 arrives: the water comes up, the ducks
  fall onto it one by one, furthest first and the pink duck last, then the
  note fades in. One gravity for all, so a duck released higher falls longer;
  on impact a damped buoyant bob and a rock out of the tilt it fell with,
  sampled from the physics into keyframes; a splash of two rings from each
  landing, flatter on far water and rounder near, as perspective would show.

**One call left open:** the pink duck follows the reference's magenta, which
is not a brand token, where the spec also asks for "the actual Pixelette
pink family". See [[09 Outstanding]].

## 29 Sep 2026 — the Living Signal answers the pointer (an enhancement)

On instruction, and explicitly **not a redesign**: the figure's form, colour,
labels and note are unchanged. Only its response to a fine pointer is new,
and it replaces the old few-pixel depth shift of the two layers.

- **The magnet.** Anywhere near the figure (its box, plus half its height
  above and below), the lines and points lean towards the pointer: below the
  figure the wings are drawn down, above it they are drawn up. The pull fades
  to nothing at the point, so every line still arrives there.
- **On the figure** (inside the teardrop), the lines glow — a quarter-size
  redraw of them, softly blurred — and the orange signals change: a pool of
  about 140 more fades in, all of them run up to ~19× faster, starting from
  the very beginning of the lines, with long tails fading to a white-hot
  head. The lit point grows and brightens. It reads as light at speed.
- Everything eases in and out. While the pointer is engaged the scene is
  drawn live at full frame rate; left alone it goes back to the cached
  layers at half rate. Reduced motion and touch are unchanged.

Tunables are the constants at the top of `LivingSignal.tsx` (`MAGNET`,
`REACH_X`, `REACH_Y`, `PULL_CAP`, `WARP`).

**Then, the same day: the points answer the pointer too.** Each point is a
small mass on a spring to its place, pulled by a softened inverse-square
force (Plummer softening, so they gather *round* the pointer, never onto
it). Moved fast, they lag and swing; left, they spring home with one
overshoot (30% of critical damping) and come to rest exactly where they
were. Mass goes with area, so the few large points are slower and travel
less. Points within ~110px glow: a soft bloom in their own colour, through
a quarter-size blurred layer, and a white-hot centre on the nearest. Tunables
are the `DOT_*` constants.

**Then: the bent lines were being cut.** Two clips, both at the figure's
box. The canvas *was* the box, and `container_main`'s global
`overflow: hidden` clipped anything past it. Now the canvas bleeds a fifth of
the figure's height above and below (6% left, 3% right) with
`pointer-events: none`, the scene is still laid out in the box (so at rest
nothing moved), and `.homeHero > .container_main` is `overflow: clip visible`
— the header's precedent: the clip is lifted for this section only, and only
vertically, so nothing can widen the page. Checked at 1440 and 390: no
horizontal overflow, the primary CTA still takes the click.

**29 Sep, on instruction: the rail labels on 02–04 are removed.** "Less
noise / Better decisions / Real impact", "People / Ideas / Capabilities /
Stronger outcomes" and "Relevance creates opportunity" — the small stacked
capitals hung on each band's right edge, which came from the reference image,
not the spec. The markup, the `rail` copy fields, the `.railLabel` and
`.homeScene__rail` styles and `RailLabel.tsx` are all gone; they were
absolutely positioned, so no layout moved. The hero's own two label groups
("Ideas / Intelligence / Action / Growth", "A more commercial tomorrow") are
a different element and stay.

## 29 Sep 2026 — the Post-its fall in a loop; A clearer path is lit

On instruction, in three rounds the same day, all in section 02
(`PostitField.tsx`, `_activitySection.scss`). The resting arrangement is
unchanged and is still what the server renders and what a reduced-motion
visitor sees; everything below applies only once motion is switched on.

**The fall is a loop now, not an entrance.** The instruction was notes
"dropping from upwards to lower in a loop, in a speed that text is readable".
The one-off Web Animations entry fall is gone, and with it the `.postit__fall`
layer and the arrival gate (`data-postits="armed"/"on"`). Each word note is a
CSS animation on `.postit` itself, from wholly above the band to wholly below
it, **16s a pass** (`FALL_SECONDS`, about 65px a second on a 900px screen).
Negative delays put the notes mid-flight from the first frame, so the band is
never empty and nothing waits for the visitor to scroll. The stage's top and
bottom 3.5rem are masked so notes fade in and out instead of being sliced —
on a phone the slice sat directly under "Our approach". The pointer nudge now
re-measures on every frame, because its targets are moving.

**Spacing took three attempts, and the first two passed a measurement.**
Per-note durations (14–18s) let notes catch each other up; one shared pace
with each note's phase taken from its resting height then collided at the
wrap, the lowest note in a column followed straight in by the highest. Both
passed an overlap check of the papers' boxes (worst 4%). **The user still
found words covered**, and asked for enough space that every note stays
readable. The answer was structural rather than tuned: **lanes.** A note is
13.5% of the stage wide and ~17.5% at its widest turn, so three lanes at 9,
31 and 53% leave a gap at every angle, and the right-hand lane ends short of
A clearer path (its left edge at ~63%). `schedule()` fills the lanes by
resting x, spaces each lane's notes evenly through one pass in order of
resting height, and offsets neighbouring lanes by a third of a slot. A narrow
stage (≤30rem, six notes) has two lanes at 16 and 44%; under 20rem — a
portrait tablet, where the stage is 237px and A clearer path fills its right
half — the six share one lane at 24%, which the band's height there affords.
Sideways drift is ±10px and the turn ±7°, so no note leaves its lane.

**A clearer path stays put; only its words change colour.** They cycle
through the hero figure's five colours, the `--signal-*` tokens, in 15s —
about 2s held on each, eased between. The first version deepened each colour
with the marker ink just far enough to clear 3:1, because straight on
`--note-pink` orange is 1.2:1 and magenta 1.8:1. **The user rejected it as
dull and asked for "illuminative" colours**, so the tokens are used at full
strength and lit: a 1px edge of the same hue deepened with ink, a pale halo of
the figure's lit point (`--signal-spark`) that lifts the letters off the
paper — the only thing separating magenta from pink — and a glow in the
letter's own colour. Every shadow is built from `currentColor`, so the light
follows the cycle. The contrast bar is traded for the look on instruction;
the field is `aria-hidden` and the edge carries the read, which was judged
by eye at 2× in all five colours. The hand-drawn underline stays in ink: it
was not asked for.

The rail label the background notes used to drift across ("Less noise /
Better decisions / Real impact") was removed the same day, separately, by
the session working on the hero; that change is its own entry.

## 29 Sep 2026 — section 03: the builders climb and jump, in the hero's palette

On instruction, in section 03 only (`a872913`).

- **One palette with the hero.** The five capability bricks, every shirt and
  the loose floor bricks now use the Living Signal's colours, left to right
  in the signal's own order: deep blue, blue, violet, magenta, orange. Each
  brick's face *is* the `--signal-*` token (`--brick-deep: var(--signal-deep)`
  and so on); only the lit top and shaded side are new values. Green and
  yellow are gone from the scene. A shirt is always a different signal colour
  from the brick its builder holds, so the two never merge.
- **The labels change colour on the two dark bricks.** Handwritten ink on the
  deep-blue face measured about 2:1, so the labels on deep blue and violet
  are white (`BRICKS[].ink`) and the other three keep the ink.
- **Two builders are women of colour.** The far right is a Black woman with
  an afro (a new hair piece, with its volume drawn behind the head and behind
  the brick she lifts); second from right is an Asian woman with brown skin
  and long black hair. Both have lashes and coloured lips. New tokens:
  `--figure-skin-brown`, `--figure-skin-deep`, `--figure-lips`. Both skin tones
  are light enough that the ink features still read.
- **The second-from-right builder's shirt is violet, not green.** The
  instruction was both "the colour of the shirt will remain the same" and
  "the same colours as the hero"; the hero has no green, so the palette won.
  A one-line change back if wanted — see [[09 Outstanding]].
- **Motion, and it reverses "nothing moves on its own" for 03.** Once, when
  the section is properly in view (the duck drop's trigger), the two ladder
  builders climb in from their ladders' feet, rung by rung with a small lift
  on each, and stop where the reference stands them. Under a fine pointer a
  ladder builder climbs one rung and **climbs back down when the pointer
  leaves** (so the composition always returns to the reference), and a
  builder standing on the bricks jumps once per hover. Hover waits for the
  climb to finish. Nothing moves under reduced motion or on touch.
  `BrickSceneMotion.tsx` is the only client code, a wrapper round
  server-rendered children; `_surfaces.scss` entry 7 is rewritten to match.
- **Each builder has a still hit area**, so one moving under the pointer
  cannot un-hover itself and flicker. The label list covering the frame
  stopped taking the pointer (only the labels themselves do) so the builders
  above the bricks could be hovered at all.
- **"One commercial objective" is the headline's accent line**, in
  `--color-brand`, the way 02 and 04 carry theirs.

## 29 Sep 2026 — section 04: the duck pond becomes a looping video

**On instruction, the drawn pond is replaced by footage.** Drawn to the
reference photograph, the SVG pond still read as clip art: flat shading,
cartoon eyes, a gradient sky, small ducks spread thin. The user judged the
method, not the tuning, to be the limit and asked for a smooth, realistic loop
instead. That settles the vector-or-real call **for 04** (the bricks in 03 are
still drawn) and with it the pink duck's colour: it is the footage's magenta,
and the `--duck-pink*` tokens no longer paint anything.

- **Made with Higgsfield**, connected to Claude Code as an MCP server the same
  day (`https://mcp.higgsfield.ai/mcp`, user scope). A still first: four
  candidates from the reference, two each from GPT Image 2.5 (high, 2K, 21:9)
  and Nano Banana 2; the user chose GPT's second (job `bf2513e9`). Kling 3.0
  only renders 16:9, and cropping the 21:9 still would have eaten the calm
  left side the copy sits on, so it was outpainted top and bottom with
  FLUX.2 Pro Outpaint (job `9222f0ea`, 2048×1232). Then animated with Kling
  3.0 Pro, 5s, **sound off**, that still as both first and last frame, camera
  locked, the ducks told to bob in place (job `a12df063`). About 20 credits
  in all. The earlier FLUX clip that cost 108 had audio on: preflight
  `get_cost` before any generation.
- **Not a GIF.** 256 colours would band the sky and water, and a GIF this size
  runs to megabytes. A muted looping `<video>`: WebM (VP9) with an MP4 (H.264)
  fallback, 650 KB on desktop at 1856×1116 and 290 KB on a phone at 960 wide,
  chosen by `<source media>`; a 66 KB WebP poster that is the loop's first
  frame. In `public/home/relevance/`.
- **The seam.** The last half-second is crossfaded into the first (ffmpeg
  `xfade`), so the loop is 4.6s and its hand-over differs about as much as any
  two neighbouring frames do (SSIM 0.955 against 0.975).
- **Every word is HTML over the video, the handwritten note included.**
  Burning the note in was allowed and not taken: a cover crop moves anything
  burned in differently at every width. Instead the video sits in a frame
  that crops like `object-fit: cover` but is a real box
  (`max(100cqw, 100cqh * ratio)` against a size container), so the note is
  placed in the video's own percentages and stays by the pink duck at every
  width. `--focus-x` aims the crop: 0.68 on portrait tablets, 0.72 on phones.
- **The note's words, on instruction:** "Quacking good / at standing out", in
  the same place, and **the arrow removed**.
- **The motion rules are unchanged.** `preload="none"`; it plays only on
  screen with the tab visible; under reduced motion, as on the server and
  without JavaScript, it is the poster and nothing is fetched. The one-off
  duck drop, the splash rings and the hover responses went with the drawing;
  the note still fades in once on arrival. See [[09 Outstanding]] and
  [[10 Verification]].

All of the above is commit `9148b86` on `feat/home-sections-01-04`. Not pushed, not live.

## 29 Sep 2026, later — the hero's lines become strings

The user's verdict on the magnet: it "feels like an image stretching". It
was — one smooth displacement field applied to every point, so the whole
figure warped as a sheet. **Replaced with physics per string.** Each line is
now 16 masses in a chain, pinned at the lit point, each tied to its resting
place by a spring that stiffens as it stretches and to its neighbours by the
string's tension, so a pull travels along it as a wave. Every string has its
own mass (the framing arcs heavy, the hairlines light), its own ring (3.2–6
rad/s) and light damping, from a separate seed so the drawing at rest is
unchanged to the pixel. The pointer pulls each node by that node's own
distance (softened inverse square), so the nearest strings swing and the far
ones barely move; a quick pass plucks the strings it crosses (a drag towards
the pointer's velocity within a finger's width). The points on a string ride
it, plus their own spring and pull; the loose field has only its own. When
everything is still, the scene drops back to the cached layers exactly.
Tunables: the `STRING_*` constants. Commit `e5d7b93` on the branch; not
pushed, not live.

## 29 Sep 2026 — the information architecture locked

Built to management's "Master structure correction" (`4a6534f`). The structure is now locked; any later brief that touches navigation or page scope works from this.

- **Navigation: What we do / Industries / About / Insights / Contact**, plus "Build my growth plan". Home, Who We Help and Results came out; the footer's Results link became Industries. Industries is a plain link: its menu held only "Deeper experience", which is barred.
- **Who we help is retired as terminology.** The taxonomy is `src/data/industries/industries.ts`: the eight broad industries, locked, never narrowed to SaaS, Fintech or Web3.
- **Home stops early.** After the approved 01–04: Industries teaser (no cards), compact Proof before promises, AI-accelerated (kept: said nowhere else), Part of Pixelette (kept: the only description of the group), final CTA. Removed as duplication: the logo strip, the growth figure, the five capabilities a second time, the eight-card section, the full Results section, the engagement grid and the process. The approved copy stays in `homeContent.ts`.
- **BlockGuard on Home: the two before → after figures only.** The measurement period is still unknown and the standing rule bars standalone proof numbers there; a before → after pair states its own baseline. All five figures appear on `/industries` and `/results`, read from `caseStudies.ts`, never retyped.
- **`/industries` has four chapters and no others**: hero; eight names with one changing stage (a tablist — hover with a mouse, tap, keyboard; all eight panels are in the HTML); Work in practice, asymmetric by instruction (BlockGuard ~62%, WebBookingPro ~38%, qualitative); close. Deeper experience, "Don't see your sector?" and the stages are gone. The visuals are structural until the final art direction arrives.
- **"See the work" goes to the story**: `/results#blockguard` and `#webbookingpro`, from anchors derived from the client name. Evidence now runs home teaser → Work in practice → case study, with `/results` out of the nav but live.
- **What we do owns the service detail.** `/services` now renders each capability's services (they only ever rendered on the home page). The lists were revised to the instruction's families, with overlaps kept in one place only, and **community management and growth** is restored under Demand & Performance, with a line saying it is more than posting.
- **Capability names stay title case**, against the instruction's sentence case, because the change would reach into home 03's approved art, About and the sector pages. One call for management.
- **Not added:** "Talk to our team" on the Industries close would go to the same `/contactus` as the primary.

Open items are in [[09 Outstanding]].

## 29 Sep 2026 — What we do: the five capabilities as one explorer

Built to management's "What We Do" implementation instruction, on the branch
`feat/what-we-do-capability-explorer` (cut from `main` at `557604d`).
Uncommitted, not pushed. An implementation, not a redesign: the taxonomy, the
copy and the links are unchanged, and the site's type, palette, nav and footer
are untouched.

- **One explorer replaces the stacked list of five** on `/services`, straight
  after the intro. Left, ~38%: the five names as an accordion, 01 open on
  load, the open one showing its lead statement, the existing body, its
  services and its links. Right, ~62%: ONE stage, bleeding to the viewport's
  right edge, whose artwork changes with the selection. Not five cards, no
  frame, no panel behind the art. `CapabilityExplorer.tsx`,
  `_capabilityExplorer.scss`; the statements, art, alt text and focal points
  in `capabilityStage.ts`. The copy still comes from `capabilityGroups`.
- **The interaction.** Click, tap, Enter or Space opens a capability, and it
  stays open. A mouse resting on another row for 160ms previews its art on the
  stage, and the stage returns when the pointer leaves the list, so sweeping
  the names never strobes. Arrow keys, Home and End move focus. There is always
  exactly one open. Each name is an `<h2>` with a button (`aria-expanded`,
  `aria-controls`), and each panel is a region; closed panels are `inert`, so
  Tab skips them. State is carried by a leading rule and a plus/minus mark as
  well as colour.
- **On a phone the stage sits under the open capability's copy.** It is the
  same element placed by grid row, not a second copy, so there is still one
  set of media.
- **The art is the approved set** from the 29 Sep Higgsfield history: the
  mirrored cylinder (`91ea1332`), the paper-fin field (`ec3e35fa`), the column
  field with the lighthouse inside it (`13e004a4`), the desk track (`87fb06c8`)
  and the flip-tile wall (`5f06e700`). **One deliberate change:** the approved
  Search image had plaster wall round its column field, and the instruction
  requires it full-bleed, with the column field as the environment. It was
  re-rendered once from itself with the columns carried to every edge
  (`b33ab097`, GPT Image 2.5, 0.25 credits). The lighthouse, palette and light
  are unchanged. The second candidate (`295226ca`) was stronger pink and less
  like the approved image, so it was not taken.
- **Every capability has a loop**, each its still animated with Kling 3.0 Pro,
  6s, sound off, 9 credits each. 01–03 and 05 use the still as both first and
  last frame, so they loop by construction. 04 has no end frame; its last
  half-second is crossfaded into its first, as the duck pond was. **One clip
  was rejected** (`1187f0f6`, Growth): by its end the pink row past the wall
  had gone and the ordered middle had smeared, which changes the approved
  design. It was re-rendered with a fixed end frame and the ordered area held
  (`57b133d5`), and that clip keeps the design. The others: `3b8f9965`,
  `7ec3544b`, `f79a5581`, `5d6e5aaa`. About 55 credits in all.
- **Files use the instruction's names** in `public/services/capabilities/`:
  `NN-slug.webp` (the still, 1344 wide, the loop's first frame),
  `-800.webp` for phones, `.webm`/`.mp4` at 1600 wide, and `-960` versions for
  phones chosen by `<source media>`. The desktop loops are 0.28–0.84 MB.
- **Only the shown capability moves.** Its loop plays from its start when it
  arrives and the previous one pauses. `preload="none"`, so a loop is fetched
  only when its capability is shown. The first still is fetched at high
  priority; the other four are light and load as the stage nears. Nothing
  plays off screen, in a hidden tab or under reduced motion, where the stage
  is the still (as on the server and without JavaScript). The loop fades in
  over its own still only once it is actually playing.
- **Page-level motion is small:** a 450ms crossfade with a 2.5% settle, a
  slow pointer parallax (fine pointers only), and on Search a soft-light wash
  from the lamp that leans a few degrees with the pointer. It is light, not an
  object; the lighthouse and columns are the footage's own. A still-only drift
  exists for any capability whose loop is later withdrawn (`video: false`).
- **The crop protects each subject.** The stage is 3:2, capped at the viewport
  height, and each piece has its own focal point in the duck pond's real-box
  frame, so the cylinder, the lifted cluster, the lighthouse, the whole track
  and the pink row all survive.
- **Kept from the list it replaced:** the diagnostic is still set apart from
  the service links as the one link with an arrow, and service links still
  carry no arrow. The retired `.capabilityList` rules are gone from
  `_hubPage.scss`, with a note of where their reasoning went.
- **Copy.** Only the five lead statements are new, verbatim from the
  instruction, with the house's typographic apostrophe ("what’s"). Nothing
  else was written.

Open items are in [[09 Outstanding]]; checks in [[10 Verification]].

## 30 Sep 2026 — What we do: the final media, integrated as supplied

"Final media integration instructions". The user supplied five posters and
loops in `public/services/new-capabilities/`. They are used exactly as
delivered: not regenerated, not recompressed, not substituted. The 29 Sep set
in `public/services/capabilities/` is no longer referenced and **stays on disk
until the user says it can go**. Same branch, still uncommitted.

- **The files:** `NN-slug.png` posters (1344×752) and `.webm` (VP9) plus
  `.mp4` (H.264) loops at 1280×720, 6s. **Demand is now the magnetic
  selection field** (a brass magnet lifting a selected stream from a scattered
  field of discs), and it replaces the paper fins completely.
- **Three of the posters are the 29 Sep approved stills byte for byte** (03,
  04, 05). 03 is therefore the Search image *with* plaster wall round the
  column field, not the full-bleed re-render made on 29 Sep. The loop matches
  it. It was used as supplied; the crop keeps the columns and the lighthouse.
- **Playback, per the instruction:** on a change, the previous video is paused
  and reset to 0, the stage crossfades (450ms), and the next video is set to 0
  and played. Each `<video>` is muted, looped and `playsInline`, with the PNG
  as its `poster` and WebM before MP4. The PNG also sits under each video as
  an `<img>`, which is what shows before the video is ready.
- **Loading:** all five posters are fetched up front, Strategy's at high
  priority. The shown loop is `preload="auto"`. The others are `none` until the
  visitor comes near them (mouse entering the row, keyboard focus, touch
  start), then `metadata`. Under reduced motion every video is `none`.
- **Plain `<img>`, not `next/image`**, because `next/image` would re-encode
  the supplied PNGs.
- **The phone variants went**, because none were supplied: no `-800`/`-960`
  sources. The frame ratio is now the loops' 16:9.
- **Focal points** (the instruction's object-position per capability): the
  Strategy cylinder at 0.49, the Demand magnet and stream at 0.70/0.30, the
  Search lighthouse and columns at 0.46/0.35, the whole Pipeline route at
  0.52, and the resolving Growth field at 0.55.
- **The Search beam wash is removed.** The supplied loop sweeps its own beam
  both ways, so a fixed page-level wash would contradict the footage. The
  pointer parallax stays.

**Later on 30 Sep — one folder.** On the user's instruction, the 29 Sep
media (30 files: the generated stills and loops) was deleted, and
`public/services/new-capabilities/` was renamed to
`public/services/capabilities/`, the folder name the first instruction set.
`CAPABILITY_MEDIA` follows. The 15 supplied files are byte-identical after the
move (sha256 checked) and all serve 200 from the new path; the old path now
404s. The folder holds the supplied final set and nothing else.


## 30 Sep 2026 — Strategy & Positioning: the final diagnostic brief

Built on `feat/strategy-diagnostic-final` (cut from `main` at `5a8de6f`).
Uncommitted, not pushed. Supersedes every earlier redesign of the page. The
twelve questions, their wording, the six dimensions and `scoreDiagnostic` are
unchanged; the only lib changes are `BAND_FLOORS` exported and a new
`TIER_FLOORS`/`tierFor` that picks words, not numbers.

- **One experience.** `StrategyExperience.tsx` renders the hero, the bridge,
  the stage and the close, because "Start the diagnostic" transforms the page
  in place: the hero compacts (52px to ~30px, **opacity never touched**), the
  bridge folds, Question 1 takes the primary position, focus goes to it, no
  reload. It still server-renders.
- **Hero:** two lines of equal size and weight, `#24181F` then `#4B1635`; the
  facts line "12 questions · 6 dimensions · Around 3–5 minutes · Instant
  result"; "See what we assess" replaced "See how the process works". No art.
- **Removed:** the dark methodology band, the six-dimension wave and its hover
  ripple (`DimensionWave`, `Methodology`, their SCSS), `DiagnosticSection`
  and `StrategyDiagnostic`. The route now spends no `.band-dark`.
- **Clarity before activity** is a ~285px bridge on the warm ground: the phrase,
  the brief's line, the six names.
- **The Clarity Rail:** five real radios, "Less clear" to "More clear", the
  live option wording under each point. A click or tap locks (320ms), the
  question leaves up 20px (180ms), the next enters (220ms). **Arrow keys only
  select; Enter or Next advances** — native radios check on arrow, so
  auto-advancing would skip a question per keypress. Below 768px the same
  inputs stack as five rows. The stage sits on a full-bleed page-colour ground
  so it does not run into the bridge.
- **Halfway** after question six, ~1.3s, no button.
- **Result reveal:** count-up (800ms), band, headline, six spectra whose
  markers travel from "Unclear", then the reading. Only for a result just
  reached; not for one restored from storage; none under reduced motion.
- **Dynamic copy:** band headline and narrative verbatim from the brief (floors
  0/40/60/80, unchanged). Per-dimension readings in three tiers (low <45,
  medium 45–74, high 75+); Competition is the brief's, **the other fifteen
  readings were written here** to its pattern and need management's eye. The
  three lowest (`score.focus`, unchanged) drive both "What this could mean
  commercially" and "Your three highest-leverage moves"; the moves keep the
  existing `recommendations` copy.
- **Close:** full-bleed burgundy, the brief's copy, "Talk through my results"
  to `/contactus`, "Retake diagnostic" (straight to Q1, no confirm step — the
  old inline confirm is gone).
- **Colour:** four tokens, for this route only: `--color-plum-ink`,
  `--color-burgundy`, `--color-pink` (#D63D7C, 4.36 on white: large text,
  markers, selected) and `--color-pink-text` (#C8306E, 5.12) for small pink
  labels, **a deviation from the brief's single pink** for contrast.
- Registered in `_surfaces.scss` as motion surface 9 (the rail's scale on
  hover is an exception to the hover rule, by instruction).

## 30 Sep 2026 — Demand & Performance: the four specialist pages

Built to the "Demand & Performance specialist pages" final implementation
brief, on `main`. It supersedes the legacy eight-section template for
`/services/social_media_marketing`, `/services/ads_ppc`,
`/services/influencer_marketing` and `/services/pr`. **The URLs did not
move.**

- **Labels:** Social & Community, Paid Media & PPC, Influencer &
  Partnerships, PR & Earned Media.
  - They are changed in `servicesData[].title`, which is the one field the nav
    dropdown, the `/services` explorer and the footer all read.
  - **The footer therefore changed too**, although the brief says "do not
    change footer". `Footer.tsx` itself is untouched; the alternative was two
    names for one page.
  - `data/services/specialist/index.ts` stops the build if a page's label
    ever differs from that title.
- **One component, not four pages.** `SpecialistServicePage` renders every
  route registered in `data/services/specialist/`, and `[slug]/page.tsx`
  branches to it before the legacy template.
  - The section order is the brief's and is not a prop: hero, when this earns
    its place, what we actually do, what we measure, how this connects, how we
    work, what good looks like, close, useful questions.
  - The brief's counts are tuples in `types.ts`: 3 situations, 4 service
    groups, 3 connections, 4 stages.
  - The same system now also carries the Search & Authority and Growth
    Intelligence pages, built alongside by other sessions. The optional
    `market`, `note` and `aside` hooks are theirs.
- **Copy:** every visible word is the brief's, verbatim. Only the meta titles
  and descriptions were written here.
- **No imagery:**
  - no hero art, no photograph, no What-we-do visual;
  - the share image stays each route's existing one, because it is a
    link-preview card and the site has no default.
- **Removed** from all four: the ecosystem logo strip, the 15–25-card service
  catalogues and the content sections under them, the testimonial block, the
  "we manage, you grow" contact band and the generic FAQ set. The legacy
  fields are still in `servicesData.ts`, unused and marked.
- **Market context is one line:** "Different markets behave differently. See
  how we approach your industry →", linking to `/industries`.
- **What we measure** is a full-bleed burgundy band under its own class,
  **not `.band-dark`**, so route-walk's cap is untouched. It shows metric
  labels only: no figures, no charts.
- **How this connects:**
  - the centre is this page, with three adjacent capabilities around it as
    native buttons carrying `aria-pressed`;
  - selection follows click, tap and focus, and the explanation is a polite
    live region;
  - the selected node is FILLED and its spoke solid, so the state is not
    colour alone;
  - below 768px it becomes a stacked list;
  - the selected fill is `--color-pink-text`, because white on `--color-pink`
    is 4.36.
- **What good looks like** stands in for proof. The page carries no Results,
  Case studies or Proof label. A `practice` slot (Work in practice) renders
  between measure and connections **only when a config carries verified
  evidence**. None does.
- **Colour:** the diagnostic's four tokens are widened, by instruction, to the
  specialist pages (see the note in `_tokens.scss`).
- **Motion:** registered as surface 10 in `_surfaces.scss`. The 2px lift on a
  situation column is an exception to the hover rule, by instruction.


## 30 Sep 2026 — Search & Authority: SEO, Content & AI Visibility

Built on `main` to a final brief for the Search & Authority specialist page and
the What we do menu, alongside the session building the Demand & Performance
specialist pages. It renders through that session's shared specialist system
(`SpecialistServicePage` and its sections); this page adds a config and no
components.

- **Same URL, new name.** `/services/seo_and_content_marketing` is unchanged;
  the display name went from "SEO & Content Marketing" to **SEO, Content & AI
  Visibility**, under Search & Authority. No separate SEO, Content, AI
  Visibility, Digital PR or Technical SEO pages or menu items: one connected
  system, one link. That asymmetry against Demand's four is intended.
- **The copy is the brief's, verbatim**, in
  `src/data/services/specialist/searchAuthority.ts`: hero ("Build visibility
  that" near-black / "becomes authority" burgundy), three situations, four
  closed rows, six metric labels, three connections (Strategy & Positioning
  selected on load, then Pipeline & Conversion, Growth Intelligence), Diagnose
  → Prioritise → Activate → Improve with Search-specific bodies, five
  what-good-looks-like statements, the close ("Have a visibility problem worth
  solving?") and four FAQs.
- **The FAQ config has no `heading`.** The shared default eyebrow "Useful
  questions" is set as the h2 when there is no heading; giving both printed it
  twice.
- **Removed, not hidden:** the "upticks in traffic / dominating search
  rankings / SEO agency for GROWTH" hero, the ecosystem logo strip, "We manage.
  You grow.", the SEO service-card catalogue and tool lists, the
  technology-led markets section and its SaaS / AI / Fintech / Web3
  mini-sections, the testimonial, the embedded form and the generic FAQ set.
  Nothing from the old page was kept. The legacy fields still sit in the
  route's `servicesData` entry, unrendered.
- **Metadata:** "SEO, Content & AI Visibility | Pixelette Marketing" and the
  brief's description; keywords trimmed to four.
- **The menu follows `servicesData[].title`**, so renaming the entry renamed
  the dropdown, the drawer, the `/services` explorer and the footer at once;
  `navigation.ts` was not touched. `specialist/index.ts` fails the build if a
  config's `label` and the title disagree.
- **The PR boundary:** search-led digital PR sits here (organic authority);
  coverage, reputation and launches stay with PR & Earned Media.
- **No "Work in practice".** There is not enough service-specific search
  evidence. The config's optional `practice` slot renders between measure and
  connections once there is, and renders nothing until then.
