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

## Colour is contextual, never a prop

The cautionary tale is `ArrowCard`'s `theme` boolean: switching colour from a
call site produced four live contrast failures at once. The fix was to read
ground from the band in SCSS. New components follow that.

## One `<h1>` per route

Asserted by `route:walk`.

Related: [[05 Components]], [[10 Verification]]
