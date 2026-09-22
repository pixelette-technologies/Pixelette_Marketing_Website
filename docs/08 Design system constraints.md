# 08 Design system constraints

The rules the codebase enforces on itself. Breaking one is usually invisible
until it renders, which is why several are now checked automatically.

## Three dark bands per page — maximum

Stated in `_surfaces.scss`. Two of the homepage's three are **forced by their
own content**: every client logo and every platform mark in the repo is
knockout white, so those rows cannot sit on a light ground without new assets.

Homepage allocation after the rewrite:

1. Proof / client logos — forced
2. The Growth System — the signature dark moment
3. How it works — the slot freed by removing the tool wall

Other rules from the same file: always a full-bleed band, never a rounded box
inside a light section; never the separator between two ordinary sections —
ordinary sections separate on a hairline. Dark is punctuation.

## One `.rule-cap` per page

The signature mark. GrowthSection holds it. `_layout.scss` says: exactly one
mannerism, do not add a second.

## Both are now enforced

`scripts/route-walk.mjs` counts them from **class attributes** (not raw body
text, so the stylesheet's own rule text is never mistaken for a call site) and
fails the run above the cap. Added before any section work began, so it proved
the caps held rather than being trusted.

## No hard-coded colours

`scripts/lint-legacy-tokens.mjs` fails on any hex, `rgb()`, or named colour in
`src/`. Everything is `var(--token)`. Retired values are written **bare in
comments without a `#`** — `was B3063C` — which is the house convention.

## Section anatomy

Eyebrow (the real `<h2>`) → `.h2` heading (an `<h3>`) → `.lead` standfirst.
Gaps are constants: `1.25rem` eyebrow to heading, `1.5rem` heading to
standfirst, heading block capped at `34rem`.

## One media query

The entire stylesheet has one: `max-width: 767px`. The file says resist adding
a second; use `clamp()`.

## Two grid idioms only

Both are auto-fit. They differ **only in track minimum**:

- **Thirds** — `repeat(auto-fit, minmax(min(18rem, 100%), 1fr))`, gap `1rem`
- **Auto** — `repeat(auto-fit, minmax(min(17rem, 100%), 1fr))`, gap `1.25rem`

Against the 1160px wrap the auto track seats four and the thirds track caps at
three: 4 × 288 + 3 × 16 is 1200, which does not fit. Five items on auto gives
four and an orphan; four on thirds gives three and an orphan. This is why
[[05 Components]] takes grid as an explicit prop.

### Thirds was flex until 21 Sep 2026

It was `flex: 1 1 calc((100% - 2rem) / 3)` with `min-width: min(15rem, 100%)`.
That basis sets the width of a **full** row correctly and says nothing about a
short one, so `flex-grow` let the Growth System's trailing pair stretch to half
the wrap each — 572px against 376px for the three cards above them, a 52%
difference inside one section, with no card edge landing on a third.

`flex-grow: 0` fixes the desktop row and breaks the middle: between roughly 500
and 750px of container the items floor on their min-width and two of them leave
a 200px hole at the end of the row. Deriving the column count from the width
instead of from the basis fixes both, because auto-fit never stretches a short
row and its track count still falls to two and then one on its own.

**`_caseStudy.scss` still uses the old flex thirds** for its five impact
figures, under its own class, and still has the trailing-row stretch. Same
shape, same fault, not yet taken — see [[09 Outstanding]].

## Rows on a hairline — the third layout idiom, 22 Sep 2026

Three call sites now share one shape: a list of short titled statements,
separated by hairlines, each a flex row with a basis that folds on its own.

- `.capabilityList` — the five capabilities on `/services`
- `.sectorList` — the five sectors on `/industries`
- `.constraintList` — the three market constraints on each sector page

All three replaced a grid of equal boxes, and for the same reason each time:
**a grid of equal boxes makes a claim about its contents** — that they are
parallel, interchangeable, and a complete set. Five capabilities are ordered,
not parallel. Five sectors are examples, not a boundary. Three constraints are
an argument, not a menu.

The rule that follows: reach for the grid when the items really are peers and
the set really is complete. Otherwise use rows.

**This is the third idiom and it should be the last.** If a fourth wants to
exist, that is the point to ask whether one of the three already says it.

## Colour is contextual, never a prop

The cautionary tale is `ArrowCard`'s `theme` boolean: switching colour from a
call site produced four live contrast failures at once. The fix was to read
ground from the band in SCSS. New components follow that.

## One `<h1>` per route

Asserted by `route:walk`.

## About page allocation (22 Sep 2026)

Two of the three, deliberately leaving one unspent:

1. The capability model — the section a buyer is on this page to understand
2. Selected experience / client logos — forced, as everywhere

The close is light, so the page ends on the site's own ground rather than on a
third slab. Its one `.rule-cap` sits on the first identity statement's
hairline; the reasoning, which was settled by looking at it, is in
[[10 Verification]].

## `.band-alt` currently paints nothing (found 22 Sep 2026)

`_base.scss` sets `body { background-color: var(--color-band) }`, and
`.band-alt` sets the same token. **Every `.band-alt` on the site is therefore a
no-op**, including `ItemsSection`'s `ground="alt"` on the home page — the
"page" and "alt" grounds render identically and only `dark` is a real change.

This is not a bug and nothing should be repainted on the strength of it: the
site's light rhythm is one warm cream punctuated by the dark family, and that
is what it looks like. It is recorded because the class **reads** as a ground
change at every call site, so anyone reasoning about the rhythm from the markup
is reasoning from something that is not happening. The About page's principles
section carries no wrapper at all for that reason.

If a second light ground is ever wanted, `--color-page` white against the body
cream is the one the tokens already support, and it would want deciding once
for the whole site rather than per section.


Related: [[05 Components]], [[10 Verification]]

## The 100-to-1 grow ratio — 22 Sep 2026

The diagnostic panel is two columns that must fold with **zero breakpoints**,
and its two columns want different behaviour on either side of the fold: the
readout should stay at 20rem beside the questions and should take the full
width once it is beneath them.

`flex-grow` is distributed **within a line**, which resolves it in one rule.
The question column is `flex: 100 1 30rem` and the readout `flex: 1 1 20rem`:

- side by side, the question takes 100/101 of the spare width and the readout
  keeps its basis. Equal grow gave the readout about 430px, which is a six-row
  instrument with 150px of gap down the middle of it.
- stacked, the readout is the only item on its line, so it has the only share
  and takes all of it.

Worth knowing because the same shape recurs: any pair where one side is a fixed
instrument and the other is the content. It is not a new idiom, it is the flex
spec used properly, and it is written down because the ratio reads as a magic
number to anyone who has not been told what it buys.

## `.card-feature` is where a signal cap goes on a page that opens dark

`_tokens.scss` describes the mannerism in two sanctioned forms: the segment on
a section's top hairline (`.rule-cap`) and the same segment on the leading edge
of a feature card (`.card-feature`). The diagnostic page needed the second, and
the reason is general.

`.rule-cap` caps a hairline drawn in `--color-line`, a light tone. A section
that opens **directly beneath a dark band** has no such hairline — and should
not be given one, because the band edge is already the separation. Drawn
anyway, the 40px segment renders as a loose crimson dash under a black band.
That is what it did, it was seen, and the mark moved to the panel.

So: if the section that deserves the mark sits under a dark band, put the mark
on the object inside it, not on the section's own rule.

## A shared control can be overridden contextually — sparingly

`.btn:disabled` fills with `--color-line-strong` under `--color-page` text,
about 1.5:1. That is defensible for a submit button greying out for a second
while a form posts and indefensible for the first control on a page, which is
what the diagnostic's "Next" is before anybody touches it.

The fix is four lines scoped to `.diagnostic__actions`, leaving the shared rule
and the enquiry form alone. This is the same category as `.band-dark .btn2` —
a control restyled by the context it is in, in the context's own stylesheet —
and NOT a `className` escape hatch. The test is the one `PointItem` states:
the call site cannot get it wrong, because the call site is not involved.

The shared rule is still wrong everywhere else. See [[09 Outstanding]].

## A third auto-fit track, and why it is not a fourth idiom — 22 Sep 2026

The two sanctioned track minimums are 17rem, which seats four against the
1160px wrap, and 18rem, which caps at three. A SIX-item set fits neither: on
17rem it gives four and an orphaned pair.

`/strategy-positioning`'s outputs section declares a 21rem track in its own
partial, which seats exactly three, so six land as 3 + 3 and fall to 2 + 2 + 2
and then one column. The sample framework's four blocks declare 24rem, which
seats two, so they land 2 x 2 with no orphan.

**Neither is a new idiom.** They are the same auto-fit mechanism with the one
number their item count needs, and they live with their sections rather than
in `_surfaces.scss` because they are one section's arithmetic. The rule stated
above still holds: if a fourth SHAPE wants to exist, ask first.

The sample's blocks were `flex: 1 1 18rem` before they were a grid, and
produced the trailing-row stretch this file already documents — three across
and the fourth grown to full width. Third time that fault has appeared, second
time it has been fixed the same way. **Reach for auto-fit, not a flex basis,
whenever a short final row is possible.**

## The signature mark on a page that opens dark — restated

`/strategy-positioning` carries no `.rule-cap` at all. Its one mark is
`.card-feature` on the diagnostic panel, for the reason recorded above: the
section beneath a dark band has no light hairline to cap, and drawing one
anyway renders the segment as a loose crimson dash under black.

## One page may declare a print stylesheet

`/strategy-positioning` is the first route with `@media print`, because its
results are worth keeping and the brief asked for the browser's own dialogue
rather than a PDF service. It hides the page's own sections and keeps the
score, the six scales and the recommendations, and it sets
`print-color-adjust: exact` on the score bars — without which browsers drop
background fills and six scales print as empty outlines.

It also hides `.cookie-banner`, which is NOT scoped to this page. A fixed
overlay printing across the content is wrong everywhere, and this is the only
print stylesheet the site has. See [[09 Outstanding]].
