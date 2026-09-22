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
