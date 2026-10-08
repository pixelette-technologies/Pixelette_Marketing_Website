# Hero strategy

The hero is where a visitor decides which company they are looking at, so it gets its own phase. Method: freeze the anatomy across the group, vary exactly one or two cells.

Status: **built, and rejected by eye along with the rest of the site on 1 September 2026.** The user has not yet given specifics.

**The interior heroes had no ground at all until the D4/D5 run.** Phase E built both washes and applied only `.wash` to the home page: `.wash-left`, the variant this note *chose* for interior pages, had **zero call sites**. About, Services and Industries all take it now. Worth remembering as a class of error: a decision recorded in the vault and implemented in the stylesheet is still not a decision that reached the page.

**The home hero was also rebuilt in `5f5a153`**, and what it found is the most likely reason the hero read as broken. When Phase E dropped the `bg_tertiary` band from behind the copy it left all the geometry that band had needed — `padding-left: 13.75rem` stepped through five breakpoints, `margin-left: -15rem` below 1200px, `margin-bottom: -5.4375rem`, and corner radii on a surface with nothing left to round. What rendered was 220px of empty gutter beside the heading and, below 1200px, a column dragged 240px left of its own container.

The collage was scaffolded rather than composed: five images positioned inside a 662×410 box they did not fit in, running from −220px to +408px vertically, held on screen only by a 14.375rem padding on the column — inside a container that carries `overflow: hidden` and that D0 narrowed by 206px. It now has a box equal to its real extent, 649×628, with every offset a percentage inside it.

Nothing has been rejected on its merits yet — the hero the user saw was carrying all of the above.

The homepage hero now takes the guide's centred light wash, wrapped so the gradient runs full-bleed behind the container rather than being clipped to it, with the `bg_tertiary` band behind the copy removed — a second ground fought the gradient. The five-image collage stays and is static. No eyebrow, one button, both headings keeping their own elements, exactly as the content rule leaves it.

One thing D2 missed and this commit caught: the collage carried a **decorative hover** — a 0.3s transition on all five images plus rotate and scale transforms. Same class as the parallax, removed for the same reason.

**Expect this to need iteration.** It has been built and not shown.

## The frozen sequence

```
ground → eyebrow / pills → heading → lead → action pair → widget
```

## What the guide actually draws

Confirmed by reading all 20 pages, not inferred:

| Variant | Ground | Sequence | Widget |
|---|---|---|---|
| Front page (p01) | radial `1200×560 at 50% −20%`, `#C7EBDF → #FFFFFF 65%`, padding `88px 0 56px` | eyebrow → h1 → lead | Pill cloud, 5 across |
| Interior (p04–p14) | radial `900–1100 × 420–520 at 14–18% −10%`, `→ #FFFFFF 60%`, padding `96–120px 0 72–96px` | eyebrow → h1p → lead → `.btn` + `.btn2` | Stat tile strip, 4-up gap 14 |
| Mobile 390 (p03, p20) | radial `600×340 at 50% −10%`, padding `44px 20px 36px` | same, stacked | Pills, 3 across |

## Ground matrix

| Ground | Verdict here |
|---|---|
| Centred light wash | **Chosen for the homepage.** The guide's default front-page treatment. |
| Offset light wash (`wash-left`) | **Chosen for interior pages.** The guide's own interior variant. |
| Dark inverse ground | Available, needs no new tokens (the panel family already is that). Not chosen — the homepage collage is the distinguishing asset and it needs a light ground. |
| Tinted wash | Not chosen. |
| Motion ground | **Ruled out.** Flat and static is a group rule and the parallax is being removed, not replaced. Re-opening this would need an explicit request, and see the warning below. |

## Widget matrix

| Widget | Verdict here |
|---|---|
| **Existing five-image collage** | **Chosen for the homepage.** It already exists, so it costs nothing, and it is the single most distinctive thing on the page. Rendered static once the parallax comes out. |
| Statistic tile strip | The guide's interior default. **Use only on the two pages that already run CountUp figures** — elsewhere the site has no such data and inventing figures is a content change. |
| Pill cloud | Not available. HomeHero has no pill copy. |
| Credential or capability ledger | Ruled out. Needs a second column of status copy, which is new copy. This is Trap 04 and it is what got the Certified hero rejected. |
| Asymmetric data column | Ruled out — that is a layout change, and layout is on the fixed list. |
| Composed seal or badge mark | Ruled out — returns to the decorative register the conversion exists to delete. |

## What the content rule takes away from our hero

| Guide has | We have | Resolution |
|---|---|---|
| Mono eyebrow above the heading | No such copy in `HomeHero` | **Ship without it.** Writing one is Trap 01 — it happened twice on Certified and both were reverted. |
| Action pair (`.btn` + `.btn2`) | One button, "Book A Call" | **One button.** A second CTA is new content. |
| Single `h1` | An `h1` "Marketing That Matters" and an `h2` "to Your Bottom Line" | **Style both to the display role.** Merging them changes the DOM structure of content. |
| Stat tile strip | No figures on most heroes | Ship the hero without the strip except where CountUp data already exists. |

## What is being removed

The mouse-parallax in `src/components/ui/home/HomeHero.tsx`: a `useState` offset, a `handleMouseMove` reading `getBoundingClientRect`, and five inline `transform` / `transition` styles.

Worth recording: **the five images all share the same offset** and differ only in transition duration (0.1s, 0.5s, 0.4s, 0.5s, 0.5s). There is no per-layer depth multiplier — the apparent parallax depth is entirely an artefact of staggered easing. Amplitude is ±10px.

Positioning is entirely SCSS-owned, so removing the motion does not move the images. The file then drops `"use client"` and `useState` and becomes a server component; nothing else in it is interactive.

## If motion is ever requested

Flat and static is a group rule, so any motion is an exception and must be scoped like one: one section, one component, mounted with positioning at the call site so the global stylesheet never learns about it, removable in a single revert. It must render nothing under `prefers-reduced-motion`, pause off-screen, be gated away from touch, and read colours from live tokens with no hard-coded fallbacks. It must also obey the palette rules rather than sidestep them — solid marks may take the bright signal tone, thin connecting strokes may not.

**Leave a note for the group if it happens.** Certified already ships one sanctioned exception (a cursor-reactive particle field). If a second site gets a motion ground, flat and static is no longer a group rule and the pattern guide needs amending with its author rather than being quietly diverged from. That question is currently open with Mr Rana.

## Expect the first attempt to be rejected

The hero is the one element decided purely by eye. Build it, show it, be ready to revert cleanly while keeping any unrelated change that landed in the same file. **Record the reasoning and the measured figures even for a rejected attempt** — they transfer to the next site, and the next agent should not have to rediscover them.

Nothing has been rejected yet. When something is, write it here.
