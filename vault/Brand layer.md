# Brand layer

Why this site's palette is what it is, the levers used, and what must never move. This is the note the next site's agent actually needs. See [[Design system]] for the fixed common layer.

Status: **signed off by eye, 1 September 2026 — the faithful rotation.** Live in `src/scss/globels/_tokens.scss` and gated against drift by `npm run compare:palette`. The values have not moved since; the D4/D5 run changed only WHICH token each element reaches for.

## The audit finding that set the direction

Unlike the Certified conversion, **there was no colour drift to fix**. All three authorities already agree on `#B3063C`:

| Source | Value |
|---|---|
| `src/assets/common/Logo.tsx` | `#B3063C` × 20 fills |
| `src/assets/common/LogoBlack.tsx` | `#B3063C` × 20 fills, plus `#1F2123` |
| `public/favicon.png` | `#B3063C` × 20 fills |
| `_color.scss` `$primary` | `rgba(179, 6, 60, 1)` — the same value |

No tiebreaker to apply, and **no favicon to re-cut**. The drift is elsewhere: the transactional email template in `app/api/contact/route.ts` carries ten inline hexes forming a completely independent dark palette that shares not one value with the site.

## Trap 05 does not bite here

The playbook's central warning is that a company's bright brand colour is usually below the text threshold on white, so it cannot substitute directly for the guide's brand colour.

**That is not true here.** `#B3063C` measures **6.98:1 on white** and actually beats the guide's own green (`#056F62`, 6.08:1). It substitutes directly at every call site the guide uses green for: eyebrows, inline links, tick glyphs, icon strokes, tile figures and filled buttons. White on it is 6.98:1, so the filled button works unchanged. No darker reading tone had to be invented.

This is a materially easier starting position than Certified had. Do not assume the next site is the same.

## Value structure: two-tone

Both tones already existed in the repository rather than needing to be chosen.

| Token | Value | Role | Measured |
|---|---|---|---|
| `--color-brand` | `#B3063C` | Everything read: text, links, eyebrows, icon strokes, tile figures, filled buttons | 6.98 white · 6.43 band |
| `--color-brand-hover` | `#8C0430` | Interaction state | 9.65 white |
| `--color-brand-signal` | `#FF2F5B` | **Marking tone. Solid non-text marks only on light grounds.** Free on dark. | 3.61 white · 5.11 footer |
| `--color-brand-wash` | `#EBC7D2` | Hero wash inner stop | brand text on it 4.53 |
| `--color-brand-tint` | to derive | Diagram and highlight fill | — |

`#FF2F5B` clears the 3:1 non-text threshold **and nothing else** on light grounds. Never text there, never a thin stroke. On the dark footer it measures 5.11 and gets a voice — exactly as the guide's `#6FE3CB` does on its own dark ground.

### The rule the conversion kept rediscovering — read this before choosing any colour

**On a dark ground the anchor is unusable and the marking tone is the one that works.** `#B3063C` measures **2.84:1 on `--color-ink`** and **~2.7:1 on `--color-panel-b`**. That fails the 4.5:1 floor for copy and fails even the 3:1 large-text and non-text thresholds. `#FF2F5B` measures **5.48:1 on ink** and **~5.3:1 on the panel**.

This is stated above as "free on dark", and the D4/D5 run still had to discover it **eight separate times** — in `ArrowCard`'s dark variant, `ContentDisplaySection`, `QuestionAndAnswer`, `OurTeam`, `HowItWork`'s step icons, and three eyebrows — because each one was treated as a local fix instead of an instance of a rule. Every single dark surface built before the conversion reached for the anchor.

The same applies to the neutrals. `color_gray` and `color_gray--light` both resolve to `--color-muted`, which is **3.43:1 on ink** and fails. `--color-panel-text` is **7.55:1** and is the token named for that job.

| Ground | Reading text | Accent / eyebrow / figure | Quiet text |
|---|---|---|---|
| Light (`--color-page`, `--color-band`) | `--color-ink` / `--color-body` | `--color-brand` | `--color-muted` |
| Dark (`--color-ink`, panel, footer) | `--color-page` | **`--color-brand-signal`** | **`--color-panel-text`** |

**One caveat on the icon rule.** The Design system note says icons take the reading tone and never the marking tone. That is written about LIGHT grounds, where the signal reads washed out at 3.61:1. On dark it is the only one of the two that passes, and `HowItWork`'s step icons take it. Solid marks and figures may take it on dark; that has not changed for light.

## The levers used, in order of leverage

**1. Value structure.** Two-tone against the guide's one-tone. A dark anchor carries everything read; a bright signal marks and never speaks on light.

**2. Neutral rotation.** The guide's neutrals are distinctly blue-biased. Rotated to the brand hue (**341.3°**) holding HSL lightness exactly:

| Token | Ours | Guide | On white |
|---|---|---|---|
| `--color-ink` | `#0A0A0A` | `#0A0A0A` (achromatic, unchanged) | 20.0 |
| `--color-body` | `#5C4149` | `#414D5C` | 9.10 (guide 8.60) |
| `--color-muted` | `#7D5D67` | `#5D6B7D` | 5.78 (guide 5.43) |
| `--color-soft` | `#7F626B` | `#62707F` | 5.44 (guide 5.07) |
| `--color-line` | `#EFE2E6` | `#E2E8EF` | rule |
| `--color-line-card` | `#EEDFE4` | `#DFE6EE` | card border |
| `--color-line-pill` | `#ECDDE2` | `#DDE4EC` | pill border |
| `--color-line-strong` | `#DEC3CB` | `#C3D1DE` | strong border |

Every text ratio improves by +0.32 to +0.50. Costs nothing measurable, changes the feel of every page.

**3. Dark family temperature.** Footer and panel shift together — see below.

**4. One signature device.** Signal-capped section rules: a 40px segment of `#FF2F5B` on each section's top hairline, and the same segment on the leading edge of feature cards. Two CSS rules, revertable alone. It marks a section *opening*, not every band. **Exactly one. Do not add a second.**

**5. Hero ground and widget.** See [[Hero strategy]].

## Grounds

| Token | Ours | Guide | Note |
|---|---|---|---|
| `--color-page` | `#FFFFFF` | `#FFFFFF` | |
| `--color-band` | `#F8F5F3` | `#F4F7FA` | **The site's own warm ground, kept deliberately.** A real differentiator against the guide's cool near-white, and it costs nothing. |

## Dark families

Footer: `--color-footer-bg #2B0612`, `-line #401220`, `-body #BC9DA7` (7.49), `-muted #A07C87` (5.04), `-pill #4A1B2A`, eyebrow `#FF2F5B` (5.11).

Panel: `#21040D → #0F080A` gradient, `-border #471C29`, `-text #AE9BA1` (7.55), `-muted #A87B89` (5.53), `-btn-text #E9BFCC` (12.07), `-btn-border #642A3C`.

Semantic, both already in the repo: `--color-ok #1E7E34`, `--color-danger #C0392B`.

## The flaw in the rotation method — worth carrying to the next site

**Hue rotation holds HSL lightness, not relative luminance.** Green carries 0.7152 of the WCAG luminance formula against 0.2126 for red. So a teal rotated to crimson at held lightness gets *darker* in luminance terms: contrast **improves on light grounds and degrades on dark ones**.

Every light-ground check improved. On the dark panel, `--color-panel-muted` landed at **3.84:1** — a fail, against the guide's 5.44 for its `#5F918B`. Lightened from L47 to L57, giving `#A87B89` at 5.53.

The comparison generator caught this before it shipped. **Any site rotating a cool guide palette to a warm brand should expect the same class of failure on its dark family, and only there.**

## What the palette gate cannot see — carry this to the next site

`compare:palette` checks every token against its approved value and every stated pair against its ratio. It passed throughout the conversion while **three headings on this site were rendering the same colour as their own background**.

It could not catch them because **both tokens were correct in isolation and the PAIRING was what failed**. Two legacy aliases that pointed at different values before the token swap landed on one token after it:

| Element | Foreground alias | Ground alias | Both became |
|---|---|---|---|
| `ServicesSection`'s 64px "We manage You grow" | `color_tertiary` | `bg_gray--lighter` | `--color-band` |
| `WhoWeAre` eyebrow, left half | `color_primary` | `bg_primary` | `--color-brand` |
| `WhoWeAre` eyebrow, right half | `color_secondry` | `bg_secondry` | `--color-ink` |

**Before shipping an alias map, diff it for collisions** — any two aliases resolving to one token — **and grep the markup for every ground/foreground pair that lands on one of them.** It is a five-minute check and it would have caught all three.

The second half of the same lesson: a white-to-transparent gradient plate sat behind the first few characters of both `WhoWeAre` eyebrows, which is why nobody noticed. **A workaround that makes a bug survivable is evidence of the bug**, not a fix; when you find one, ask what it is compensating for.

## Inherited fault — report, do not fix

The guide identifies its outline button `.btn2` purely by a `#C3D1DE` border, which measures **1.56:1 on white** — far below the 3:1 non-text threshold in WCAG 1.4.11. This is identical across every group site.

Handling: fix nothing, badge it on the comparison page as *inherited* rather than *introduced* so it is visible without being misattributed, and raise it with Mr Rana as a change to the shared layer. It needs a dedicated border token. **Fixing it on one site forks the group design system.**

The card and pill borders (1.26 and 1.28) are container edges rather than control identifiers, so they are defensible as drawn.

## The dark-family call — settled, with the rejected option recorded

**Chosen: the faithful rotation.** The high dark-family saturation stays, and the footer and panel read as a distinctly crimson black.

**Rejected: a softened, near-neutral warm black.** Derived by holding hue and HSL lightness and multiplying the saturation of the twelve dark-family tokens by 0.35, leaving `footer-eyebrow` alone because the signal tone is the one voice on that ground and softening it would have removed the thing being judged. It moved `#2B0612` to `#1F1216` and the panel to `#180D11 → #0D0A0B`.

Worth carrying to the next site: **it cleared every threshold**, so the choice was purely by eye with nothing to veto it. That is not obvious in advance. Desaturating a red-family token adds green and blue, which carry 0.7152 and 0.0722 of the luminance formula against red's 0.2126, so every softened token gets *lighter* in luminance terms — the grounds rise toward their text and the text rises away from its ground at the same time, and the two effects largely cancel. Expect the same shape of result rather than assuming softening costs contrast.

Both options were rendered side by side as real footer and panel surfaces before the call was made. **Do not make this one from swatches or from arithmetic** — neither distinguishes them.

## Naming rule

Name every brand token by the **job it does**, not by how light it is. `brand-signal` that is barred from text survives a redesign; `brand-light` gets misused within a week.

## The generator

`scripts/build-palette-compare.mjs` → `vault/palette-compare.html`. Renders the guide's frozen values beside ours through the guide's own component CSS, with real site copy, every ratio printed, failures badged by provenance. Exits non-zero on any introduced failure.

**Inverted on 1 September 2026**, the moment the palette was signed off. `APPROVED` is frozen at the signed-off values; the live column is read back out of `_tokens.scss` on every run. It exits non-zero on an introduced contrast failure, on any token drifting from what was approved, and on a token named in `TOKEN_OF` that the stylesheet no longer defines — which would otherwise go ungated in silence. Drift is gated separately from the arithmetic because a token can move without shifting a single ratio.

Verified by mutation, not by assumption: changing `--color-band` by one digit fails with exit 1 and names the token. **A token added to the brand layer must be added to `TOKEN_OF` too, or it drifts unwatched.**
