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

- **Flex thirds** — `flex: 1 1 calc((100% - 2rem) / 3)`, `min-width: min(15rem, 100%)`
- **Auto-fit** — `repeat(auto-fit, minmax(min(17rem, 100%), 1fr))`

The auto-fit track seats four against the 1160px wrap. Five items on auto-fit
gives four and a full-width orphan; four on thirds gives three and an orphan.
This is why [[05 Components]] takes grid as an explicit prop.

## Colour is contextual, never a prop

The cautionary tale is `ArrowCard`'s `theme` boolean: switching colour from a
call site produced four live contrast failures at once. The fix was to read
ground from the band in SCSS. New components follow that.

## One `<h1>` per route

Asserted by `route:walk`.

Related: [[05 Components]], [[10 Verification]]
