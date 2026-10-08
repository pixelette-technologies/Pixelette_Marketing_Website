# Known bugs and deviations

Everything the audit turned up, sorted by what happens to it. See [[Rules]] for why the boundary falls where it does.

## Fixed

| | |
|---|---|
| **Obfuscated payload in `eslint.config.mjs`** | Removed in `a9c6379`. Full write-up in [[Security incident 2026-08-11]]. |
| **`_heading.scss` line-height unit bug** | Fixed in `87d123e`, inside the rem rebase as planned. `2.6em` → `2.6rem`, then rebased to `1.625rem` with its three siblings. |
| **Palette comparison rendered no component CSS** | Fixed in `99d046b`. It had been comparing almost nothing since it was written. See [[Rules]]. |
| **`h1 { z-index: -10 }`** | Deleted in `e3ea8ae`. Check every `h1` during the browser walk. |

## To fix inside the conversion — ALL FIVE DONE

| | Fixed in |
|---|---|
| **1. `Accordion.tsx` unmounted answers when collapsed.** FAQ answer text was absent from the DOM until clicked, across all 13 service and industry routes — the same pages that emit `FAQPage` JSON-LD *containing those answers*. The panel is always rendered now and hidden with the `hidden` attribute. | `b32f4c3` |
| **2. The accordion toggle was not a control.** A `div` with `onClick`: no button, no `aria-expanded`, no keyboard path, no focus state. It is a real button with `aria-expanded` and `aria-controls`, and picks up the global focus ring. | `b32f4c3` |
| **3. Duplicate DOM ids on `/services/[slug]`.** `Status` and `ResearchSection` both emitted `id="counter-section-N"`, and `Status`'s `querySelectorAll` was document-wide. Both prefix with `useId` now and `Status` scopes its query to its own subtree through a ref. **The `.counter-section` class is deliberately unchanged** — still the only class-name-to-JS coupling in the codebase. | `b32f4c3` |
| **4. `_heading.scss` line-height unit bug.** `2.6em` → `2.6rem`, then rebased with its three siblings. | `87d123e` |
| **5. `FormInput.tsx` wrote a literal red border.** Now `--color-danger`, along with `FormTextArea`'s. | `b32568f` |

One nuance carried forward rather than fixed: `hidden` keeps the answers in the DOM and in the structured data, but browser find-in-page still will not match inside a collapsed panel. Reaching that needs `hidden="until-found"`, which React's types do not currently accept.

## Found in the D4/D5 run — RAISED, NOT FIXED

These need new copy, a content decision or a by-eye call from the user. All are logged deliberately rather than changed.

**Placeholder copy is live on `/contactus`.**
`Located` renders internal design feedback as body copy: *"Show locations in a different way, not really happy with how it's currently done here. Maybe turn it into a slider or a drop down, collapsible thing so that it doesn't take up too much space. Show the main two countries i.e. UK and US in the first row."* It is content, the content rule forbids changing it, and replacing it needs copy that does not exist. **This is the single most embarrassing thing on the site and should be the first thing the user is asked about.**

**Five off-palette pastels on About.**
`ourTeamData.ts` carries `bgColor` values — pink, grey-green, beige, yellow, mint — as `rgba()` literals. They are an explicit, reasoned exemption in the token gate ("content data, not design tokens"), so this is not a gate failure. But they are a second palette sitting on the About page with no relationship to the brand. A by-eye call for the user.

**`FinalResult`'s tech-stack icon row is `display: none`.**
It has never been visible on any build, yet still renders and downloads its 88×88 images on all five industry routes. Revealing it would put new content on the page, so it stays hidden. Worth deciding: reveal, or delete the render.

**The article table of contents moved below the article on phones.**
`SingleBlogContent` used `flex-direction: column-reverse` below 850px, which put the TOC *above* the article. It now wraps below. That is a real change in usefulness rather than a pure simplification, and it was traded for removing the breakpoint. Reinstating it costs one media query.

**`TeamCard` still renders each name in an `h2`.**
Unchanged, as before: three `h2`s inside a section that already has one. Structural DOM change, still out of scope.

## Fixed in the D4/D5 run

| | |
|---|---|
| **Three invisible headings** | `ServicesSection`'s 64px "We manage You grow" and both of `WhoWeAre`'s eyebrows were the same colour as their own grounds. See [[00 Index]]. |
| **Nine contrast failures on dark grounds** | All the brand anchor used where the marking tone belongs. Table in [[00 Index]]. |
| **Two hover states that erased their own copy** | `ArrowCard` lightened the card and set the text to white in the same rule: 1.06:1 and 1.55:1. |
| **24 partials with dead heading selectors** | Retargeted to `:is(h1, h2)` wherever touched. |
| **Four click-only controls** | `ProcessSection` tabs, the blog dropdown, the article TOC, `ArrowCard`'s hover-only link. |
| **750px of dead panel on the home page** | Scaffolding left behind when D2 removed the scroll reveal, plus the negative-margin section and decorative blob that filled it. |
| **`.btn_secondry-full` had no styling** | It fell through to the filled `.btn` primitive, so the service heroes' action pair was two identical filled buttons. |
| **`color_secondary` misspelling** | All six call sites retired via `aria-pressed`, with no visual change — the buttons take what they were already inheriting. |
| **Eleven named colours in SVG attributes** | Tokenised; the gate now catches them. |
| **`_color.scss` and the 18 legacy utilities** | Deleted. Zero call sites. |

## Fixed in Phase F

| | |
|---|---|
| **`Heading` and `Text` renamed every class** | The whole Appendix E layer was unreachable through them. `237b2fb`. The largest single fault in the conversion — see [[00 Index]]. |
| **The header logo was invisible** | White wordmark on the white header the conversion introduced. Swapped to the `LogoBlack` variant that already existed. |
| **Nav dropdowns clipped on hover** | `container_main`'s `overflow: hidden`, switched off for the header's container only. |
| **"Leading Brands" broke mid-phrase** | A hard `width: 12.4375rem` measured against the old sans heading. |
| **Missing measure caps** | `.lead` and `.body` had no `max-width`; the guide caps them at 62ch and 66ch. |
| **EngagementStalls read as a brick** | A bordered box of bordered cards inside a light section. Now a full-bleed band, cards three across. |
| **ArrowCard title on two lines, squeezed by "View More"** | Both fixed in CSS with no DOM change — row direction for the title pair, `display: contents` plus `order` for the link. |
| **The nav bar had two type sizes** | The plain links took 14px from `.site-nav`; the dropdown labels took 13px from the `text_secondry` legacy variant, because the two kinds of nav item never shared a type rule. Both 16px now. The mobile drawer had the identical 13-against-16 mismatch and it went with it. `ed0ae25`. |
| **The hero collage's z-indexes were never contained** | `position: relative` with `z-index: auto` opens no stacking context, so its 2/80/80 were competing in the ROOT context. Latent for months; the sticky header would have exposed it immediately. `isolation: isolate`. `6dbbac8`. |

## Behaviour added in Phase F, beyond the guide

All three at the user's explicit request, and all three reversing or deviating from a settled decision. Recorded here as well as in [[Rules]] so they are not mistaken for drift.

| | |
|---|---|
| **The logo marquee** | Motion exception 1 of 2. Reverses D2's removal. `b0cecb6`. |
| **The hero parallax** | Motion exception 2 of 2. Reverses the Phase A decision. **Rebuilt, not restored** — the original gave all five images the same offset and never actually parallaxed. `f68f429`. |
| **Sticky header** | Deviates from the guide, whose bar scrolls away. Note the Phase C wrapper was `position: sticky` with no `top`, so it did nothing: this is new behaviour, not restored behaviour. `6dbbac8`. |

**The register is otherwise still flat and static, and there are exactly two motion exceptions.** Both are opt-in behind `prefers-reduced-motion`; the parallax also requires `pointer: fine`. If a third is ever proposed, "flat and static" has stopped being true and the group should be asked rather than assumed.

## Raised in Phase F, still open

**`CONTACT FORM TEMPORARILY UNAVAILABLE` renders on the home page.** `ContactUsForm.tsx:101`. Configuration rather than UI, but it sits on the closing section of the most valuable page on the site and is visible to anyone who opens it. Ask about this early.

**`.small` is 13px where the guide's is 14px.** Appendix E is "fixed, do not vary, and do not vary slightly". Left alone deliberately: it is a site-wide type change and belongs in its own commit with the user warned first.

## Found, logged, deliberately NOT fixed

These need new visible content or structural change, so they are out of scope. Raise separately.

**`TeamSection` ignores per-service testimonials.**
`services/[slug]/page.tsx` passes `mainHeading`, `subHeading` and `details` but drops `reviewsData.data`; `TeamSection` maps over the module-level `teamData` regardless. The same three cards render on every route. `servicesData[].review.data` holds per-service testimonials with `name`, `role`, `detail`, `image` that never appear. Fixing it puts **different testimonials on 8 service pages** — new visible content.

**`TeamCard` renders each name in an `h2`.**
Three `h2`s per section, a heading-hierarchy problem. Changing the level is a structural DOM change.

**Malformed markup in a content string.**
`/story/[id]` passes `` `let's <span> talk business <span/>` `` to `ContactSection` — note `<span/>` where `</span>` was meant. It is content; leave it.

**`Navbar` desktop/mobile link asymmetry.**
The desktop bar has a Blogs link; the mobile drawer does not — it sits inside a commented-out block alongside the hidden Portfolio link. **Preserve this.** It is a content difference, not a styling one.

## Deliberately quarantined — leave alone

**`Importance.tsx` returns `null` on all 8 services.**
`importance.data` is `[]` for every service, under an explicit governance quarantine recorded in the component: the "billion dollar brands" cards used unlicensed public-figure photos and unsourced attributed quotes. It renders nothing today.

Do not convert it, do not delete it. Only detokenise the two raw hexes in `_importance.scss` so the token gate passes.

(It also renders `el.name` twice, in two `Heading` elements — dead code, not worth touching.)

**`/success_stories` and `/story/[id]` are `noindex`.**
Interim, pending real content. Convert the pages; leave the robots blocks exactly as they are.

## Dead code — ALL CLEARED

`UseSlowScroll.tsx` and `FormCheckbox.tsx` were already deleted in earlier phases; this list was stale when the D4/D5 run checked it. `_mainLayout.scss`, `WhiteBackground.tsx` and `WhiteCollan.tsx` went in this run, along with the commented-out `ServicesCards` copy and `EngagementStalls`' 45-line dead block. `bg_gray--light` went with the whole utility layer.

Original list, kept for the record:

## Dead code to delete in D2/D8

| File | Why |
|---|---|
| `src/hooks/UseSlowScroll.tsx` | Imported by nothing. A 9× scroll hijack that calls `preventDefault()` on `wheel` and replaces native scrolling. Would be a serious a11y and perf problem if it were ever wired up. |
| `src/components/feature/FormCheckbox.tsx` | Exported from the barrel, imported nowhere. `ContactUsForm` uses `<Field type='checkbox'>` directly. |
| Commented-out block in `EngagementStalls.tsx` | A large dead implementation above the live one, including commented scroll and wheel listeners. |
| `bg_gray--light` | Defined, zero call sites. |
| `@use ... as color` in `_navbar.scss` | Imported, never used. |

## Referenced but undefined

Classes used in TSX with no SCSS definition: `color_gradient` (`RelatedBlogs.tsx:110`), `main_nav`, `searchBar`, `cardItem`, `icon-wrapper`, `dropdown-content`, `formCheckbox`, `form-error`, `form-input`, `form-label`, `form-text`, `form-consent-text`.

Also **`color_secondary`, with 6 call sites** — a misspelling of the defined `color_secondry`. It has never applied, so those six elements have always taken their inherited colour. Fixing it would change the colour of six elements that nobody has ever seen styled, which is a visual change with no copy behind it; decide it deliberately during the browser walk rather than silently in a conversion commit.

The form and consent components are styled **entirely inline** and have no SCSS at all — a second, parallel styling system. D6 is where they join the design system.

Also dead: Tailwind-shaped classes in `Footer.tsx` (`py-4 flex justify-between items-center gap-4`). There is no Tailwind installed; the footer relies on the `footer {}` element selector.

## Hazards to watch during conversion

**`Button` puts the `.btn` primitive on every button on the site.** It renders `className={`btn btn_${className}`}`, so the bare `.btn` has been live at all 6 call sites since D1 — a 52px min-height, `display: inline-flex` and centred content, on top of the legacy `.btn_primary` rules, which still win where the two collide because components load after primitives. This was missed in the D1 collision scan because that scan only looked at literal `className="..."` strings, not template literals. **Grep template literals too.** Worth a look on the walk.

**`GrowthSection`'s "distinctive" backdrop word was DEAD CSS.** The 145px weight-900 rule selected `header > h1` and the markup renders an `<h3>`, so it has never applied on any build. There was no by-eye call and nothing to preserve — it was deleted with a 45-line commented-out block. **Check the rendered tag before agonising over a rule**; several structural selectors in this codebase target `h1` where `Heading` emits `h2` or `h3`, so more of the legacy stylesheet is inert than it looks.

**What to look at first on the browser walk**, in rough order of how likely it is to be wrong:

1. Every heading on the site changed face, weight and size at once (`d3cfd55`) — Newsreader at 400 on fluid clamps, replacing Poppins/Glory at 800. The `--light`/`--semibold`/`--boldLight` variants now render identically to their base.
2. `text_small` is the one type variant whose size went **up**, 9px to 12px.
3. The header ground flipped dark to light, and the footer became a four-column dark sitemap.
4. `container_main` clips 206px earlier and still carries `overflow: hidden`.
5. The hero: wash ground, no band behind the copy, collage hover gone.
6. Both logo strips render once now instead of four times.

**`_importance.scss` still declares `animation: animate 8s`** against keyframes deleted in `b1a9aa3`. Inert — the component returns `null` on all 8 services — and left alone because the quarantine says convert nothing in it beyond detokenising. Remove the declaration in D8.

**`ServicesCards` renders its heading through `.small` now.** `className='small color_primary'` had no `.small` definition until D1 added Appendix E's inventory, so that heading rendered at the `Heading` default. It now takes 13px. `color_primary` still wins the colour because the legacy utilities load after the primitives. Two call sites carry `small`; the other is in `Importance`, which returns `null` on all 8 services. Look at the service pages during the walk and decide there — the component is converted in D5 regardless.

**`howItWorks` icons are crimson on a dark grey ground.** `#2A2C2E`, and the icons were hard-coded `#B3063C` before D1 put them on `currentColor`. The wrapper now sets `--color-brand`, which reproduces the previous appearance exactly. Whether that is right is a **D5 question that has not been answered** — it was deliberately not decided inside an icon commit.

**Icon box sizes were not retraced.** D1 did colour, `aria-hidden` and stroke weight only. Several of the 42 components are brand marks rather than icons, and sizing interacts with per-section SCSS, so resizing belongs with the section conversions in D4–D5 where the layout is visible.

**`container_main` now clips 206px earlier.** It went from a 1366px max-width to the guide's `min(1160px, 100% - 40px)` in `2798225`, and it still carries `overflow: hidden`, which several sections rely on to clip decorative elements positioned outside their own box. Anything that was bleeding into the old padding is now cut. The `overflow` comes out section by section through D4–D5; until then this is the first thing to look for on a page that suddenly looks cropped.

**`h1 { z-index: -10 }`** — a global unscoped rule in `_heading.scss:3`. `z-index` is inert on a statically positioned `h1`, but pushes any positioned or flex/grid-child `h1` behind its siblings. No legitimate reason for it. Do not port it; check every `h1` during the browser walk.

**`SingleBlogContent`'s table-of-contents card** is `bg_primary` with light text arriving from SCSS descendant rules and **no `color_white` class**. The most likely thing to go unreadable during the token swap.

**`Navbar` sticky is inert** — `position: sticky` with no `top` value, so the bar scrolls away today. Decision: remove the dead wrapper rather than make it genuinely sticky, which matches both the guide and current behaviour. Recorded as a settled decision in [[Rules]].

## Deviations from the playbook, with reasons

**Footer gets columns built from existing nav links.**
The guide's footer is a 5-column dark sitemap. Ours is a single bar: copyright, one Cookie Policy link, three social icons. There is nothing to re-split — the Certified resolution does not apply. The user chose to build the columns from links that already exist in `Navbar.tsx`, `servicesData` and `industriesData`.

**Under the strict content rule this is a content addition.** No copy is newly written, every label and href already exists in the codebase, and it was approved deliberately. Recorded here so it is not mistaken for drift later.

**The responsive surface is not the `respond()` mixin. — RESOLVED**
The playbook assumes a small breakpoint set. This repo had **282 hand-written `@media` blocks across 69 breakpoints**; the mixin had only 3 call sites. Retiring the mixin was trivial and happened in `715c5ec`. Retiring the media queries was the actual work and it is now done: **27 blocks left, 14 of them in the quarantined `Importance`, and exactly ONE breakpoint outside it — 767px.** `clamp()` and `repeat(auto-fit, minmax(min(Xrem, 100%), 1fr))` replaced 223 of them between them.

The last **2 of the 27 are the Phase F motion opt-ins** — `prefers-reduced-motion` in `_marquee.scss` and `_heroHome.scss`. **Neither is a breakpoint**, so the "one breakpoint" claim is unaffected; they are preference queries, not width queries, and they should not be counted against the responsive-surface target.

**Not Tailwind.**
The playbook's cascade-layer contract, preflight warnings and utility-emission trap do not apply. Sass, 82 partials, `@use`/`@forward`. The token gate's glob must be extended to `.scss` — done, and it also needed a pattern for named colours in JSX attribute position, which is not CSS value position and was walking past it.
