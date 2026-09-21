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

Props: `content`, `ground`, `grid`, `variant`, `topRule`.

**`grid` is explicit, not derived from `items.length`.** See
[[08 Design system constraints]] for the arithmetic — the wrong choice gives a
full-width orphan card, and it is invisible until it renders.

The anatomy, the 34rem heading measure and the two gap constants are carried
over **verbatim** from `_engagementStalls.scss`, the file it replaced.

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

Five figures use **flex thirds**, the only sanctioned idiom that lands 5 as
3 + 2; auto-fit would seat four and leave a full-width orphan.

## Known cost

`ArrowCard` renders titles through `Text`, so on the hub pages the card titles
are paragraphs where they used to be `<h2>`s — 8 lost on `/services`, 5 on
`/industries`. The ItemList structured data still declares every item and the
anchor text is unchanged, so the crawl signal largely survives. The real cost
is that a screen-reader user can no longer jump between services by heading.

Fixing it means a semantic prop on a component shared with three other routes,
so it was raised rather than taken unilaterally. **Still open** —
see [[09 Outstanding]].

Related: [[03 Phase 1 — Homepage]]
