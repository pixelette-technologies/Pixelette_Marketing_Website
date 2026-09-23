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
- `.growthSystem__stages` — the four commercial outcomes on the home page
  (**added 22 Sep**, replacing a 2×2 grid; it also carries a mono numeral,
  because this list's order is the framework's and had been surviving only in
  a sentence underneath restating it)

All four replaced a grid of equal boxes, and for the same reason each time:
**a grid of equal boxes makes a claim about its contents** — that they are
parallel, interchangeable, and a complete set. Five capabilities are ordered,
not parallel. Five sectors are examples, not a boundary. Three constraints are
an argument, not a menu. Four commercial outcomes are a **chain**, and the grid
was claiming so loudly otherwise that the section needed a line of prose to
contradict it.

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

`/strategy-positioning` declared two of them: a 21rem track for a six-item
set, which seats exactly three so the six landed 3 + 3 and fell to 2 + 2 + 2
and then one column, and a 24rem track for a four-item set, which seats two so
they landed 2 x 2 with no orphan.

**BOTH SECTIONS WERE DELETED ON 22 SEP 2026**, hours after they were written,
so neither track exists in the codebase any more. The note stays because the
ARITHMETIC is the reusable part and it is the thing nobody wants to re-derive:
against the 1160px wrap, 17rem seats four, 18rem three, 21rem three with room,
24rem two. Recover the partials from `291592f` if either shape is wanted back.

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

## Motion on hover — one exception, and it is written down — 22 Sep 2026

`_surfaces.scss` states it plainly: "NONE OF THIS LICENSES MOTION ON HOVER.
Hover still changes border colour only — no lift, no shadow, no scale."

The six-dimension wave on `/strategy-positioning` now breaks that. Hovering a
circle sends a ring out of it on a loop — a scale on hover, asked for directly.
It is registered at the top of `_surfaces.scss` as the **fifth motion
surface**, beside the logo marquee, the hero parallax, the scroll reveal and
the scroll-driven strip, because Trap 10 says a motion surface documented
anywhere else gets read as leftover decoration and deleted by the next pass.

**What makes an exception here survivable, and the test to apply to the next
one:**

1. **It carries no information.** All six names are already set in text beside
   their circles, so touch — which gets no hover at all — and keyboard lose
   nothing by never seeing it. Nothing appears on hover that is not already on
   the page, which is the rule the home page's growth figure is held to.
2. **It stops under a reduce preference**, and that was verified by emulating
   the preference and reading `getAnimations()`, not by trusting the media
   query.
3. **It changes no cursor.** The circles are not links and there is nowhere for
   them to go; a pointer would promise an action that does not exist. A hover
   effect that implies clickability on something inert is a worse fault than
   the motion rule it breaks.

The rule itself is NOT withdrawn. This is one call site with a stated reason,
not a licence for the next card grid.

## The first container query, and why it is not a second breakpoint — 22 Sep 2026

`.growthSystem__ring` declares `container-type: inline-size`. It is the only
one in the stylesheet, and the rule above — **one media query, `max-width:
767px`, and resist adding a second** — is untouched by it. A container query
asks about an element, not the viewport, so it is not a breakpoint and does not
spend the one this design system allows.

**What forced it.** The home page's growth figure layers HTML over svg in one
box. Everything inside the svg is in viewBox units and therefore scales with
the figure. Everything drawn on top — the four stations, the handoff words, the
panel in the middle — was in `rem` and did not.

At the 1160 wrap the two happened to agree, which is why it shipped. At 768px,
where the row has not yet folded and the figure column is at its narrowest,
they did not: the panel stayed its full size inside a ring that had shrunk
around it, and the labels landed on top of it. The figure rendered `optimise
TAKES IN interest` across one line. A station also ran off the right of the
viewport.

**The rule that follows.** *When a component mixes svg and HTML in one box, the
HTML has to be sized in container units or the two are only aligned at the
widths somebody happened to measure.* `cqi` for type and padding, percentages
for position and box size, and nothing in that figure in `rem` at all. The
existing `clamp()` guidance still applies — the clamps are there to stop the
type going absurd at the extremes, not to do the scaling.

This is worth checking against elsewhere. `DimensionWave` on
`/strategy-positioning` is the other svg figure on this site with HTML near it,
and its circles were already found to be their path's mirror image below 768px.

Related: [[02 Decisions]], [[05 Components]], [[10 Verification]]

## A second container query, and the rule it is the second instance of — 23 Sep

`.growthSystem__figure` declares `container-type: inline-size` and the
stylesheet now carries a container query on it, `max-width: 590px`, which
stands the growth figure up as a column. It is the **second** container query
in the codebase and the rule above is still untouched: the entire stylesheet
has **one media query, `max-width: 767px`**. A container query asks about an
element, not the viewport, so it is not a breakpoint and does not spend the one
this design system allows.

**It had to be a container query rather than a media query**, and this is the
cleanest example yet of why. What decides whether the ring fits is *how wide
the figure is*, and the figure is narrow at 900px of viewport — where the row
has not yet wrapped and it is sharing the container with the text column — as
well as on a phone. A media query gets the phone right and that case wrong.

Measured across the range, the figure bottoms out at 595px just before the row
wraps at about 1000px of viewport, jumps to 921px the moment it does, and falls
back under 590 only at about 620 viewport. So the collapse fires on a genuinely
small screen and **never in the middle of the range**, which is where a figure
like this lands by default. The flex-basis is what buys that, and it is the
number to re-check if either column changes.

## When a component mixes svg and HTML, the HTML is sized in `cqi` — restated with a correction

The 22 Sep rule holds and the growth figure is its fullest application: four
cards, a medallion and an annotation layered over one svg, **with not one
dimension in `rem`**. Positions, box sizes, padding and type are all `cqi` or
percentages of a `cqi` box, so the whole thing is one drawing at 595px and at
921px rather than two things that agree at the width somebody measured.

**It also paid for itself in a single edit.** When the four tethered questions
were removed, the ring, the cards, the badges and the medallion all
re-proportioned off the same unit — four numbers changed and the drawing
rebuilt itself at the new scale. Had any of it been in `rem`, that would have
been a redraw.

**The correction is about what you centre.** A station is a badge stacked on a
card, and the badge stands proud of it — 3.8cqi at the sizes it settled on.
`translate(-50%, -50%)` on the station therefore centres **the badge and the
card together**, which leaves the card itself half the badge's overhang low, so
the ring runs through the card's upper third rather than its middle. Measured,
the north card sat 3.6px *over* the medallion where the arithmetic had promised
7px of clearance. The fix is `translate(-50%, calc(-50% - 1.9cqi))`, and **that
number has to move whenever the badge does** — it did, when the ring grew.

*The rule: when you position an element on a path, name which part of it the
path is supposed to pass through. A box with a hat on it has two centres.*

## A container query adds no specificity, and that is a trap — 23 Sep

The narrow collapse above reset `.growthSystem__note` and it silently did
nothing, because the wide layout sets those offsets on
`.growthSystem__note--0` and its siblings. **A container query wraps rules; it
does not weight them.** (0,1,1) loses to (0,2,1) wherever it is written.

What it looked like was not a note in the wrong place — it was **one stray dot
floating above the centre panel**. A tether is a pseudo-element on the note, so
when the collapse set the note to `position: static`, all four pseudo-elements
fell through to the nearest positioned ancestor, which is the plot, and stacked
at the top of the figure.

*Two rules out of one bug: a container query's overrides have to be written at
the same weight as the layout they replace, and an element with absolutely
positioned pseudo-elements cannot be made `static` without rehoming them.*

**The call site is gone** — the tethered notes were removed hours later and
`.growthSystem__note` with them. This entry stays because the rule is about
container queries and pseudo-elements rather than about that component, and
because the bug presented as *one stray dot* rather than as four missing
connectors, which is the part worth recognising again.

## Icons carry meaning in page content — first time, 23 Sep

`react-icons` was a dependency for chevrons, a search glyph and a filter mark.
The growth figure is the first place on this site where **an icon is part of
what a section says** — five Lucide marks, one per station plus one in the
medallion. They render with `currentColor`, so the token gate is untroubled and
colour is still read from the ground.

They are also decorative in the strict sense and marked `aria-hidden`: every
station's name is set in text beside its icon, so nothing reaches a reader
through the icon alone. **That is the test to apply to the next one.** It is
not a licence for an icon set on the next card grid.
