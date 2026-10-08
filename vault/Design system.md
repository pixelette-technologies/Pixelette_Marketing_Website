# Design system

The common layer. Group property, taken verbatim from the playbook's Appendix E. **Do not re-derive these from the guide** — two independent derivations will not agree, and the divergence only becomes visible when two sibling sites are open side by side, long after both have shipped.

See [[Brand layer]] for the part that differs per company.

## Container

```
--container-wrap: 1160px;
.wrap { width: min(1160px, 100% - 40px); margin-inline: auto }
```

1160px maximum, 20px gutters. Nothing on the site is wider. Note the existing `container_main` hard-codes `max-width: 1366px` with six px breakpoints of padding — one class, 38 call sites, one edit.

## Fluid type scale

Interpolated between 390px and 1440px, the two widths the guide is drawn at.

```
--fs-h1:    clamp(2.25rem,   1.6rem    + 2.6667vw, 4rem);      /* 36 → 64 */
--fs-h1p:   clamp(1.9375rem, 1.45rem   + 2vw,      3.25rem);   /* 31 → 52 */
--fs-h2:    clamp(1.75rem,   1.425rem  + 1.3333vw, 2.625rem);  /* 28 → 42 */
--fs-h3:    clamp(1.375rem,  1.3054rem + 0.2857vw, 1.5625rem); /* 22 → 25 */
--fs-h4:    1.125rem;                                          /* 18, flat  */
--fs-lead:  clamp(1.0625rem, 0.9929rem + 0.2857vw, 1.25rem);   /* 17 → 20 */
--fs-body:  1rem;                                              /* 16, flat  */
--sec-y:    clamp(3.5rem, 2.5714rem + 3.8095vw, 6rem);         /* 56 → 96 */
--sec-y-sm: clamp(2.5rem, 2.0357rem + 1.9048vw, 4rem);         /* 40 → 64 */
--header-h: clamp(4rem,  3.6288rem + 1.5238vw, 5rem);          /* 64 → 80 */
```

`--fs-h1p` is the interior-page hero variant and drives every service, category and article route, so it has more call sites than anything else.

**Body text is flat at 16px deliberately.** Below 16px, iOS zooms the viewport on input focus. Do not make it fluid.

## Geometry

```
--radius-btn: 4px;  --radius-tile: 4px;  --radius-card: 12px;
```

Cards are noticeably rounder than controls; that contrast is part of the look. Three shadows only, used sparingly — the register is flat, so a shadow is an exception. **Hover changes border colour only**: no lift, no shadow change, no scale. This is the rule most often broken by reflex.

## Type roles

| Role | Face | Usage |
|---|---|---|
| Display | Newsreader | h1, h2, h3, h1p. **Weight 400 at every width.** |
| Body | Outfit | Everything read at length. Also h4, the one sans heading, at 18px/600. |
| Mono | IBM Plex Mono | Eyebrows, statistics, figures, source lines, small labels. |

Eyebrow, exactly: mono, 11px, `0.18em` letter-spacing, uppercase, brand colour.

The faces are fixed. **Weight 400, not the guide's drawn 300** — the light cut read as too fragile at desktop sizes, and that by-eye call was made and signed off during the Certified conversion. If weight ever changes again, change it everywhere at once.

### How the type roles actually reach the page — read this before converting a section

> **RESOLVED in `237b2fb`, and the delay is the lesson.** Everything in the paragraph below was recorded here correctly and then treated as a fact to work around rather than a fault to fix. The workaround — redefining the legacy variants in terms of the type scale — converted the *type* but left the *anatomy* unreachable, so `.eyebrow`, `.lead`, `.tile` and the card and layout primitives could never be used at a call site. Phases D4 through D9 were then built on top of a design system that could not be applied, and the user rejected the result.
>
> **A trap that is written down but not fixed still costs the full price.** When a note says a primitive "is nothing", that is a bug report, not a description.

**The primitives are not what is styling the headings.** `Heading` emits `heading_${className}` and `Text` emits `text_${className}`, both prefixing only the FIRST class token. Passing `.h2` through them produces `heading_h2`, which is nothing. And because component partials load after the primitives, a legacy `heading_primary` rule beats `.h2` on source order anyway.

**Both components now emit the class verbatim** (`237b2fb`), and the 111 legacy call sites across 37 files carry their own `heading_` / `text_` prefix. Passing `.h2` produces `.h2`. The source-order point still stands: a legacy `heading_primary` rule still beats `.h2`, so a call site must be moved fully onto the primitive rather than given both.

Before that, `d3cfd55` redefined the twelve legacy heading variants and eleven text variants **in terms of the type scale**, in `_heading.scss` and `_text.scss`. That converted the type on every page at once without touching 73 call sites, and it remains what styles every section Phase F has not reached yet. The mapping:

| Legacy variant | Now |
|---|---|
| `hero`, `large` | `--fs-h1`, display, 400 |
| `primary`, `primary--light`, `tertiary`, `tertiary--medium`, `tertiary--light`, `ImportanceCardheading` | `--fs-h2`, display, 400 |
| `secondry`, `secondry--boldLight`, `secondry--semibold`, `secondry--light` | `--fs-h3`, display, 400 |
| `small` | `--fs-h4`, body face, 600 |
| `text_primary*` | `--fs-body`, weights 400/500/600 kept |
| `text_secondry*`, `text_tertiary*` | 13px |
| `text_small` | 12px — **the one variant whose size went up**, from 9px |

**Neither partial declares a colour, and neither may.** Both load after the legacy `color_*` utilities, so a single colour declaration would silently beat every `color_primary` and `color_white` on the site. Colour stays with those utilities until D8 removes them.

A section is "converted" when its markup uses `.h2`/`.lead`/`.card` directly and its legacy variant classes are gone. Until then it is inheriting the right type through the old names, which is why the site already looks converted while D4/D5 is only partly done.

## Exactly one media query

```
@media (max-width: 767px) { /* ... */ }
```

Everything else interpolates. It exists for the two things that cannot: display heading tracking and leading, and the hero wash geometry. The guide's two mobile pages confirm those are the only two. Resist adding a second breakpoint.

## Component class inventory

```
Layout    .wrap .sec .sec-sm .rule
Type      .h1 .h2 .h3 .h1p .h4 .lead .body .small .eyebrow .src .mono .link
          .list .list-num .prose
Surfaces  .card .card-feature .tile .panel .footer .band-alt .band-closing
          .wash .wash-left
Controls  .btn .btn2 .btn-ghost .pill .pill-brand .flink .label .input
          .textarea .select .field-error .table .skip-to-content
```

`.card` is 12px radius with 28px padding. `.btn` has a 52px minimum height and `.flink` a 44px tap target — that is how the accessibility floor is met without thinking about it at every call site.

**Built in `ecc9836`** as `src/scss/primitives/` — layout, type, surfaces, controls, and the single media query in `_responsive.scss` so "exactly one" stays auditable rather than being a claim in a comment. `.rule-cap` and `.card-feature` carry the signature device and are revertable together.

**Cascade order matters more than it looks.** `main.scss` forwards reset → primitives → legacy utilities → components. The legacy `bg_*` and `color_*` utilities load *after* the primitives on purpose: they are single-class selectors too, so source order decides, and existing markup pairs them with primitive names. See [[Rules]].

**Do not build React wrappers for these.** Five were built during the Certified conversion and deleted unused, because the CSS classes turned out to be the natural way to write the markup. `Container` (38 importers), `Heading` (33), `Text` (40) and `Button` (6) already exist here and the classes go through them.

## What the guide does not define, settled once for the group

The guide is a static mockup: one hover rule, no focus, transition, disabled or keyframe styling at all.

- A global `:focus-visible` ring that recolours over dark contexts (dark panel, footer) so it stays visible on every ground
- An explicit disabled fill on `.btn` — reduced opacity alone is near-invisible on a light button
- `html { scroll-padding-top: calc(var(--header-h) + 1rem) }` — **live since `9a9e688`.** This entry used to read "only needed if the header is sticky, and ours is not". Phase F made the header sticky and this line was not revisited, so anchor targets were landing underneath the bar — the article table of contents links to a generated id for every section of every post, so it hit real routes. **It was found by re-reading this note, not by a gate.** The value tracks `--header-h` so the two cannot drift apart.

## Icons

Thin-stroke set: arrows, check, chevrons, plus, minus, close, menu, quote glyph, star. All `currentColor`, all `aria-hidden`, sized 11–20px at stroke weight 1.5–1.8. Where a third-party library is also in use, pin stroke weight to 1.6 at a 16 or 20px box on every single use — library defaults are far heavier and read as a different design system sitting inside yours.

**Icons take the brand's reading tone, never the bright signal tone.** At these stroke weights the signal tone reads washed out even where the ratio technically passes.

This repo has 42 hand-written SVG components in `src/assets/` carrying **57 hard-coded `#B3063C` fills**. They are invisible to any stylesheet-level colour swap and must become `currentColor`.

## Framework mechanics specific to this repo

Not Tailwind. Sass, now **82 partials, 4,830 lines** (79 and 3,935 before the conversion; the primitives added five files, and D8 deleted `_color.scss`, `_mainLayout.scss` and `_breakPoint.scss`), compiled through `src/scss/main.scss` via `@use`/`@forward`. So the playbook's cascade-layer and preflight warnings do not apply. What does:

- ~~Zero CSS custom properties today.~~ **Done in `2798225`.** `src/scss/globels/_tokens.scss` emits the whole block into `:root`, banner-marked into brand layer (colour + signature device) and common layer (everything else), forwarded first from `_index.scss` so it lands at the top of the compiled sheet. ~~`_color.scss` keeps its 16 Sass names as `var()` aliases.~~ **Deleted in `c9cf171`.** Every colour resolves through a custom property.
- **Safe to alias:** the aliasing worked exactly as predicted — **zero Sass colour functions** anywhere (`darken`, `lighten`, `rgba($var)`, `mix`), so nothing did colour maths a `var()` would break. **`color.$*` references reached ZERO** in the D4/D5 run, down from 40 across 17 partials, and `_color.scss` went with them. The prediction held all the way: no colour maths anywhere, so no alias ever needed anything a `var()` could not give it.
- **Selectors are anchored to DOM structure, not classes** — `& > div > section > ul > li` chains up to 11 levels deep. Still the biggest rewrite hazard for the remaining sections. **And a corollary discovered the hard way: many of those chains are DEAD.** They select `h1` where `Heading` emits `h2` or `h3`, so the rule never applies. Check the rendered tag before converting — or before agonising over — any structural rule. See [[Known bugs and deviations]].
- ~~**Global element selectors** styled unscoped.~~ **Done in `e3ea8ae`.** `nav` and `footer` moved behind `.site-nav` / `.site-footer`; `h1 { z-index: -10 }` deleted; `button` kept only `cursor` and `font-family`. `html`, `body` and `a` stay global on purpose — the reset and the root are what an unscoped element selector is for. The compiled sheet now has exactly four element rules.
- ~~**The real responsive surface: 248 hand-written `@media` blocks across 60 distinct breakpoints.**~~ **Now 27 blocks, and outside the quarantined `Importance` there is exactly ONE breakpoint: 767px.** Fourteen belong to `Importance` and are deliberately untouched, and two are the Phase F motion opt-ins — `prefers-reduced-motion` queries, not width queries, so they do not count against the breakpoint claim. The other eleven are genuine swaps that cannot be interpolated — the navbar drawer and its dropdown, the hero collage giving way to its flat stand-in, the blog sidebar giving way to a dropdown, and display tracking and leading in the type scale. Everything else is `clamp()` and `repeat(auto-fit, minmax(min(Xrem, 100%), 1fr))`. **That pair of idioms replaced 223 media queries; reach for them before a breakpoint.**

## D8 is complete — the legacy layer is gone

`_color.scss` is **deleted**, along with all nine `bg_*` and all nine `color_*` utilities. Call sites reached zero in the D4/D5 run. The section below is kept because the alias map is the useful artefact for the next site, not because any of it still exists.

**The one thing to carry forward:** two aliases resolving to the same token is how text becomes invisible. `color_tertiary` and `bg_gray--lighter` both landed on `--color-band`; `color_primary` and `bg_primary` both landed on `--color-brand`. Three headings on this site were the same colour as their own ground, and the palette gate could not see it because each token was correct in isolation — the PAIRING is what failed. **Diff the alias map for collisions before shipping it, and grep the markup for ground/foreground pairs that land on one token.**

**The cascade-order note below is now historical.** `main.scss` still forwards reset → primitives → legacy utilities → components, but the legacy utility layer is empty. The ordering can be simplified whenever someone wants to.

## The legacy colour aliases — HISTORICAL

`_color.scss` keeps its 16 Sass names so the 40 existing call sites keep compiling. It is deleted in D8. Two aliases are exact and nothing moves; **the rest change the rendered colour**, and these are the ones the browser walk has to look at.

| Sass name | Was | Now | Moves? |
|---|---|---|---|
| `$primary` | B3063C | `--color-brand` | no — identical |
| `$gray--lighter` | F8F5F3 | `--color-band` | no — identical |
| `$primary--light` | CBB3A6 | `--color-soft` | yes |
| `$secondry` | 262626 | `--color-ink` | yes |
| `$secondry--light` | 1F2123 | `--color-ink` | yes — collapses with `$secondry` |
| `$tertiary` | F0E9E4 | `--color-band` | yes |
| `$tertiary--dark` | DFD2C9 | `--color-line` | yes |
| `$brown` | 684744 | `--color-body` | yes |
| `$gray` | 888888 | `--color-muted` | yes |
| `$gray-dark` | 6C6C6C | `--color-body` | yes |
| `$gray--light` | B5B5B5 | `--color-muted` | yes |
| `$gray--lightness` | F3EEEA | `--color-line` | yes |
| `$borderColor` | A5796A | `--color-line-strong` | yes |

Values are written bare, without a hash, so the token gate cannot trip on its own documentation.

**`$gray--light` needed splitting.** It served two incompatible jobs: a border on `FormInput` and `FormTextArea`, and de-emphasised text in the `color_gray--light` utility. Mapping it to a hairline token would have put text at 1.5:1; mapping it to a text token would have put a heavy border on both inputs. The two borders now reference `--color-line-strong` directly and the alias serves only text, so no call site loses contrast. **Watch for this on the next site** — one legacy name doing two jobs is common and the naive alias silently picks the wrong one.

`body` keeps `--color-band`, not `--color-page`, so the page ground is unchanged for now. It moves to `--color-page` as sections gain `.band` through D4–D5.

## The root font-size trap — resolved in `87d123e`, kept for the next site

`src/scss/utils/_base.scss` sets four equal-specificity `html { font-size }` rules. Source order wins:

```
> 1200px  →  62.5%  (1rem = 10px)
≤ 1200px  →  57%    (1rem = 9.12px)   ← the tab-land rule, declared last
the 45% and 52% rules are dead and never apply
```

Every font size in the SCSS is `rem` — 940 literals, **zero px font sizes**. A naive `rem × 10` conversion silently grows every tablet and mobile layout by 9.6%. The rebase multiplies every rem by **0.625**, which makes desktop byte-identical at the moment of the flip.

37 `rem` literals also live in `.tsx` inline styles across 13 files and must be rescaled in the same commit — most visibly the three framer-motion `y: "-6rem"` dropdown entrances in `NavbarDropDown`, `BlogCategoriesDropDown` and `SingleBlogContent`, which would go from ~58px of travel to 96px.
