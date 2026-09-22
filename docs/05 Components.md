# 05 Components

## Why two new components, not six sections

Sections 04, 05, 06, 09, 10 and 11 of the brief are the **same content shape**:
a section header, N uniform items, and optionally a CTA or a closing line. Six
of the twelve. They share one component pair rather than growing six
near-identical bespoke sections.

## `PointItem` — the item block

`src/components/feature/PointItem.tsx`

Optional slots: a mono numeral (`index`), a leading mark (`icon`), a joined
capability line (`capabilities`), a per-item link (`cta`). Two variants:
`plain` and `card`.

**It has no theme or ground prop, deliberately.** Colour is read from the band
in `_pointItem.scss`. This is the lesson written into `_arrowCard.scss`:
switching colour from a call site produced four live contrast failures at once.

**It has no `className` escape hatch.** An unused hatch is how a shared card
acquires six bespoke per-section overrides and stops being shared.

`capabilities` renders as **one** paragraph joined with `" | "`, not a list
with generated separators — it wraps at the spaces like the prose it is, and
`.small` is already coloured for both grounds by the primitives.

## `ItemsSection` — the shell

`src/components/ui/home/ItemsSection.tsx`

Props: `content`, `ground`, `grid`, `variant`, `header`, `topRule`.

**`grid` is explicit, not derived from `items.length`.** See
[[08 Design system constraints]] for the arithmetic — the wrong choice gives a
full-width orphan card, and it is invisible until it renders.

The anatomy, the 34rem heading measure and the two gap constants are carried
over **verbatim** from `_engagementStalls.scss`, the file it replaced.

### `header` — added 21 Sep 2026

`'stacked'` (default) is that shared anatomy. `'aside'` turns the header ninety
degrees and puts the items in the column beside it. **Only "Why Pixelette"
takes it**, and the reason is editorial rather than decorative — see
[[02 Decisions]].

It is an explicit prop with two named values, like `ground`, `grid` and
`variant`, **not** the `className` hatch this component pair refuses. The test
is whether the call site can get it wrong: it can choose between two described
layouts and nothing else.

Zero new breakpoints. The two bases are 22rem and 30rem either side of a 4rem
column gap, so the pair folds to stacked on its own below a viewport of about
936px. Against the full wrap the tracks resolve to roughly 440px and 656px, and
656px seats exactly two of the `--auto` grid's 17rem tracks — which is what
turns four items into 2×2 without the call site asking for it.

## `ArrowCard` was not extended

It stays untouched and stays in use — the sector cards, and both hub pages.
Reasons not to extend it:

- It already carries two boolean *design* switches. Two more makes four axes on
  a component used across three routes.
- Its title is **two paragraphs** joined on one line by flex. Single-string
  titles would ship an empty `<p>` and a stray gap.
- Its DOM order is frozen and only made to work by `display: contents` plus
  `order`. A capability list would be a fourth thing competing for a position.

## `PointItem` gained one slot on 11 Sep

`outcome` — the closing "you get" line on the three engagement cards.

Management supplied the three engagement descriptions in a fixed three-part
shape: a one-line hook, a paragraph saying what the work is, and a sentence
naming what the client walks away with. All three end that way. The third beat
is the commercial payoff, so it takes its own slot rather than running into
`body` as a third sentence, where it would be buried in the one line a buyer
is actually scanning for.

Narrowly scoped, exactly as `index`, `icon` and `capabilities` are — it is not
a general-purpose second paragraph. It renders as `.body` with a hairline above
it and a 500 weight, and states **no colour**: `.body` is already correct on
both grounds, and restating a band colour locally is the fault
`_engagementStalls.scss` had its colour block deleted for. Only the border
colour is respecified on dark, following the card edge.

## `CaseStudySection` — new, 11 Sep

`src/components/ui/results/CaseStudySection.tsx`

One client story: who, what was in the way, what we did, what changed, and the
client saying so. It takes the standard section anatomy rather than a new one —
client name as the real `<h2>` in the eyebrow slot, story headline as the
visual `.h2` on an `<h3>` — which is the same visual-level / semantic-level
split the rest of the site uses.

**`impactStyle` is a prop, not inferred.** It could be derived by checking
whether every item carries a value, and that would be wrong for the reason
`ItemsSection` takes `grid` explicitly: add a fifth qualitative line to four
figures and the block silently changes shape, invisible until it renders.

**No dark ground option.** `/results` spends none of its three bands and the
figures are the obvious candidate, but dark is punctuation and two case studies
back to back would take two of the three. Left on page/alt until someone has
seen the page.

Five figures land 3 + 2. They use `_caseStudy.scss`'s own copy of the **old
flex thirds**, which `ItemsSection` moved off on 21 Sep — so the trailing pair
still stretches to half the wrap, the same fault that was fixed on the Growth
System. Not yet taken; see [[08 Design system constraints]] and
[[09 Outstanding]].

## Known cost

`ArrowCard` renders titles through `Text`, so on the hub pages the card titles
are paragraphs where they used to be `<h2>`s — 8 lost on `/services`, 5 on
`/industries`. The ItemList structured data still declares every item and the
anchor text is unchanged, so the crawl signal largely survives. The real cost
is that a screen-reader user can no longer jump between services by heading.

Fixing it means a semantic prop on a component shared with three other routes,
so it was raised rather than taken unilaterally. **Still open** —
see [[09 Outstanding]].

## ScrollMarquee — 21 Sep

`ScrollMarquee` is the fourth motion surface on the site and the second
marquee, and it is not the first one's mechanism. `.marquee` is a CSS
`animation` on a timer, for logos. `.scrollMarquee` has no keyframes: JS
writes its transform from the page's scroll offset, eased over a few frames,
so the words move only while the reader moves.

It is registered at the top of `_surfaces.scss` beside the other three, which
is where the flat-and-static rule is stated. Trap 10.

**The static row is what ships in the HTML.** The stylesheet on its own lays
the phrases out wrapped, centred and fully legible; the moving strip is
`[data-marquee="on"]`, set only by `ScrollMarquee.tsx` and only after it has
measured that three copies of the group cover the viewport. Same rule
`ScrollReveal` is built on — nothing is hidden that is not also handed to a
live driver — for the same reason: a clipped strip loses the last two phrases
outright, and this conversion has already produced four invisible-text faults.

It takes `items` and an optional `label` and nothing else. **No className
hatch and no ground prop**, exactly as `PointItem` refuses both: the type and
colour are set by the section it sits in, so a call site cannot get it wrong.
One call site today, section 06 of the home page.

**Never seen.** See [[10 Verification]].

Related: [[02 Decisions]], [[03 Phase 1 — Homepage]]

## The diagnostic components — 22 Sep

`src/components/ui/strategy/`. Four, and one of them is the site's only
stateful surface.

`DiagnosticHero`, `DiagnosticMethod` and `DiagnosticClose` are ordinary server
components on the shared anatomy. The close follows `AboutClose` rather than
the shared `QuestionAndAnswer`, which is still un-converted and hard-codes
"Book a consultant - it's on us!" — putting legacy classes on a new page to
avoid a third close file would be the wrong trade. That divergence is still
open and still belongs to whenever the four templates are next looked at.

### `StrategyDiagnostic` — the instrument

`"use client"`. Six answers in state, a step index, and a done flag. It renders
either the current question or the reading, with `DiagnosticReadout` beside it
in both states.

**The primary control follows the state, not the position.** Once all six
lenses are answered it always reads "See the reading", so a visitor who has
come back to change one answer is a single press from the updated result
instead of clicking Next through the rest.

**Focus moves with the step.** Without it, pressing Next leaves focus on the
button and a screen-reader user is never told the question changed. It is
skipped on the first render and passes `preventScroll`, so the page neither
yanks focus on load nor scrolls the panel out from under a sighted reader.

**No `data-reveal` anywhere inside the panel.** `ScrollReveal` hides what it
observes at opacity 0 until it is scrolled to, and interactive controls are the
last thing that should depend on an IntersectionObserver having run. The
section is a block of `.page-flow`, so it fades in as one object.

### `DiagnosticReadout` — six measures

Four segments per lens, filled to the position of the chosen statement, plus
the fraction as **visible text**. The segments carry `aria-hidden`; the
fraction is the accessible value and is rendered rather than hidden, because a
figure whose numbers cannot be read is a figure people assume a score from.
There is no visually-hidden utility in this codebase and this was not the place
to introduce one.

**The rows become buttons only once every lens is answered.** Before that there
is exactly one way forward through the questions, and a second route through
the same six would be a way to get lost rather than a shortcut. The button
inherits the row's layout rather than nesting a second one, so the interactive
and static states are pixel-identical.

**No chart library.** Six rows of four spans.

Related: [[02 Decisions]], [[08 Design system constraints]], [[10 Verification]]

## The strategy components, rebuilt 22 Sep

`src/components/ui/strategy/` — six, of which **one hydrates**.

Server: `StrategyHero`, `Methodology` (with `DimensionWave`),
`DiagnosticSection`.
Client: `StrategyDiagnostic`, with `DiagnosticResults`.

**IT WAS EIGHT, AND TWO HYDRATED.** `StrategyOutputs`, `SampleOutput`,
`StrategyFaq` and `StrategyClose` were deleted on instruction on 22 Sep 2026
along with the four sections they rendered, and `DimensionWave` moved from the
hero into the methodology band. All four are recoverable from `291592f`.

**`DiagnosticSection` exists to keep the copy in the HTML.** It is a server
component that owns the section, its real `<h2>`, the visual heading and the
standfirst, and renders only the panel as a client child. The brief forbids a
page whose content depends on a client-only component; splitting the section
in two is what resolves that, and it also means the section reads correctly
before hydration rather than showing an empty box.

**`StrategyDiagnostic` holds two pieces of state, not five.** `working` is the
whole view — answers, step, phase, resumable — and it is null until the visitor
touches something. That null is what distinguishes "nothing has happened yet"
from "twelve unanswered questions", which are the same answer array and very
different situations. Stored answers arrive through `useSyncExternalStore`
rather than an effect; see [[02 Decisions]].

**`StrategyClose` and `StrategyFaq` are gone**, and the two things they
demonstrated are worth keeping even though the code is not. The close was a
client component **for one boolean** — its label read "Start the diagnostic"
or "Review my results" and it never restarted anything — and it got that
boolean by reading the same external store the diagnostic writes, which is
cheaper than a provider for one value and keeps the page itself a server
component. The FAQ reused the shared `Faqs` and `Accordion` unchanged, which
cost nothing because `Accordion` is already converted.

The pattern to reuse is the first one: **a whole page can stay a server
component while one label reacts to client state**, as long as the state lives
in an external store both can read.

Related: [[02 Decisions]], [[08 Design system constraints]], [[10 Verification]]

## `GrowthSystem` — 22 Sep

The home page's four commercial outcomes and the ring beside them, in one
client component. Replaces `GrowthDiagram`, which was four svg columns and no
state.

**Shape.** `GrowthSection` (server) renders the eyebrow, heading and standfirst
and passes them as `children`. `GrowthSystem` places them, renders the ordered
list of four outcomes beneath, and the figure in the second column. One piece
of state — the selected index, defaulting to 0 — drives both sides.

**Why children rather than props.** The heading block is three static elements.
Passing them through keeps them server-rendered and out of the client bundle,
and keeps the copy in the same file as the rest of the section's prose rather
than in a props object one level up. A `mainHeading` / `subHeading` / `detail`
signature — the shape `ResearchSection` and its neighbours use — would have
moved three strings into the parent to no benefit.

**Data lives in the component.** `STAGES` holds the four names, the outcome
copy, and each stage's `takesIn` / `handsOn` / `handoff`. This section's copy
has never been in `homeContent.ts`; it was inline in `GrowthSection` before
this and it is inline here. The in/out pairs are **readings of the outcome copy
beside them, never new claims** — the chain was already in the brief's words.

**Geometry is derived, not typed out.** `angleOf(i)` puts Demand at the top and
the rest clockwise, and the arcs, the arrowheads and the CSS positions of the
stations all resolve from it. Four hand-placed coordinates would have drifted
the first time the order changed. The four station positions in
`_growthSystem.scss` are the one place that restates it, and they say so.

**Tabs, not tooltips.** `role="tablist"` with roving tabindex, arrow keys in
both axes (a ring has no honest orientation, so `aria-orientation` is unset),
Home and End, automatic activation. It is a genuine tab pattern because the
panel in the middle carries content that appears nowhere else on the page — see
[[02 Decisions]] for why that is the deciding test and not a style preference.

**The list is pointer-only and that is deliberate.** The four `<li>`s set the
selection on `mouseenter` and are not focusable. They are not a second set of
controls; the stations are the controls and they are reachable by keyboard and
by touch. Every word in the list is visible at all times whatever is selected,
so a reader who never triggers the hover loses nothing but a highlight.

**Known cost.** The svg is `aria-hidden` and carries the arcs and arrowheads
only. The handoff words moved out of it into HTML — they had to, for the reason
in [[10 Verification]] — which means the figure is now HTML and svg layered in
one box and the two only agree because the box is a container. Change the ring's
inset without changing the station and handoff percentages and they part
company silently.

Related: [[02 Decisions]], [[03 Phase 1 — Homepage]],
[[08 Design system constraints]], [[10 Verification]]
