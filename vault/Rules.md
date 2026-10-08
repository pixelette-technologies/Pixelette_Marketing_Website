# Rules

Standing constraints, settled decisions, and every trap that actually bit. Written at the moment it bit.

## The hard constraint

**Content does not change.** Every heading, paragraph, list item, testimonial, FAQ, statistic, label and call-to-action stays byte-identical. No section is added, removed or reordered. This is a UI conversion only, and it stays in force for every follow-up commit on the branch, not just the first.

Two corollaries that catch people out:

1. **Layout and alignment may change freely; DOM order of content may not.** Moving an element to match the guide's ordering is a content change. Use ordering utilities to match the guide visually while keeping source order.
2. **A bug fix that requires new visible text is out of scope.** Log it, raise it, do not ship it.

**If the copy is not already in the file, it does not go on the page.** Where the guide demands a label you cannot supply, ship the pattern without it.

The single approved exception is the footer columns — see [[Known bugs and deviations]], "Deviations from the playbook".

## No regression in SEO or structured data

Every metadata export and every JSON-LD block must keep emitting exactly what it emits today. Verify by diffing the emitting code, not rendered output. Command in [[Build and verification]].

## Also forbidden without explicit instruction

Pushing the branch. Opening a pull request. Deploying. Committing in logical chunks on `revamp/ui` is expected and encouraged.

## What is fixed, free and forbidden

**Fixed** — the family resemblance. Container, fluid type scale, type roles, geometry, section anatomy, the flat and static register, accessibility floors. Group property, taken verbatim from Appendix E. Do not vary them, and do not vary them "slightly". See [[Design system]].

**Free** — five levers, in descending order of leverage: value structure, neutral rotation, dark family temperature, one signature device, hero ground and widget. See [[Brand layer]].

**Forbidden** — see above.

## Settled decisions — do not relitigate

| Decision | Choice | When |
|---|---|---|
| ~~Hero mouse-parallax~~ | ~~Remove as decoration; the five images stay as the widget~~ — **REVERSED in Phase F at the user's request.** The hero is theirs to call by eye. Rebuilt with real per-layer depth in `HeroCollage` + `_heroHome.scss`; the version D2 removed had none. | Phase A, reversed 1 Sep 2026 |
| Saturated `bg_primary` bands | Become the dark panel family, not flat crimson | Phase A |
| Value structure | Two-tone: `#B3063C` anchor, `#FF2F5B` signal | Phase A |
| Accordion a11y defects | Fix inside the conversion | Phase A |
| Signature device | Signal-capped section rules | Phase C |
| `ContentDisplaySection` marquee | Stop the motion, render the cards once, lay out on the guide's card grid | Phase C |
| ~~Navbar~~ | ~~Not sticky — remove the inert wrapper~~ — **REVERSED in Phase F at the user's request.** Note the original wrapper was `position: sticky` with no `top`, so it did nothing; the site had never actually had a sticky header and this is new behaviour, not restored behaviour. `sticky`, not `fixed`, so no spacer is needed. | Phase C, reversed 1 Sep 2026 |
| Footer | Dark ground with columns built from existing nav links | Phase C |
| Dark bands retained | Marketing keeps the dark family as a deliberate device, NOT reduced to Certified's light-throughout rhythm. Three per page maximum, each on the panel token family, never as the separator between two ordinary sections. | Phase F, 1 Sep 2026 |
| The tools/platforms band | Stays dark (Option A). Restyled to read as a sibling of the Leading Brands band rather than a second unrelated black rectangle. No brand-mark retinting. | Phase F, 1 Sep 2026 |
| Home hero | Stays split — left collage, right copy. Not centred like Certified. Type calmed to sentence case; the collage gets a real box. | Phase F, 1 Sep 2026 |
| **The logo marquee — sanctioned motion exception 1 of 2** | The two logo strips move: the client logos in `TrustedBrands`, and the two platform rows in `RangeOfMarket`, running against each other. Asked for by the user after D2 had removed it. See `_marquee.scss`, and the note on the flat-and-static paragraph in `_surfaces.scss`. | Phase F, 1 Sep 2026 |
| **The hero parallax — sanctioned motion exception 2 of 2** | The five collage images track the pointer at five different depths. Rebuilt rather than restored: the version D2 removed gave every image the same offset, so it never parallaxed. `HeroCollage` writes two custom properties; the depths live in `_heroHome.scss` beside the percentages that place each image. | Phase F, 1 Sep 2026 |
| **The scroll reveal — NOT an exception; it retires the rule** | Every block on every page fades and rises as it is scrolled to; card grids cascade. Asked for by the user on 1 September 2026. The other two exceptions were one widget each and left "flat and static" true elsewhere. This is site-wide, so the register is simply no longer static. Group-level, so it is an OPEN QUESTION below rather than a settled decision — recorded here because the code is on the branch either way. `_reveal.scss` + `ScrollReveal.tsx`, revertable in one commit. | Phase F, 1 Sep 2026 |

**~~There are exactly TWO motion exceptions and the register is otherwise still flat and static.~~ THAT SENTENCE IS NO LONGER TRUE, and it said itself how it would stop being true: "if a third is ever proposed, that is the point at which flat and static has stopped being true and the group should be asked, not assumed."** The third arrived on 1 September 2026 and it is the scroll reveal. It is not a third widget — it is site-wide, so there is no longer a static register with exceptions carved out of it. **The group has NOT been asked yet.** See the open questions below.

**Accessibility floors are not part of any of this** — they are fixed group property in their own right, and all three surfaces are opt-in behind `prefers-reduced-motion: no-preference` (the parallax additionally requires `pointer: fine`). **Hover is still untouched: border colour only, no lift, no shadow change, no scale.** The reveal does not license motion on hover, and it is the reflex most likely to follow it.

**A correction to the record, found on 1 September 2026 while adding the reveal.** Both this note and `_surfaces.scss` claimed "nothing else on the site moves". That was already false when written: `framer-motion` animates the navbar dropdown, the mobile drawer, the blog category dropdown and the article table of contents, and has throughout. They are UI-state transitions on controls rather than decorative motion, which is arguably a different category — but the flat claim was wrong, and the count of "exactly two" was never accurate. **Grep `framer-motion` before making any further claim about what moves on this site.**

## Decision rights

| Decision | Who |
|---|---|
| Mapping a section to a guide pattern | You. Record it; do not ask. |
| Resolving a gap the content rule creates | You, then record. Default is always to ship without the missing element. |
| The palette | The user, by eye, on the comparison page. You propose with arithmetic. **The arithmetic vetoes; it does not choose.** |
| Type weight and the hero | The user, by eye. Expect iteration. |
| New copy of any kind | The user, signed off before building the thing that needs it. |
| Push, PR, deploy | The user. Never assume. |
| Anything in the shared layer | The guide's author. Report, do not fix. |

## Open group-level questions with Mr Rana

1. **THE LIVE ONE. Is "flat and static" still a group property at all?** Marketing now runs a site-wide scroll reveal, at the user's request, on `revamp/ui`. It is not an exception to the register; it replaces it. Certified was judged "much more clean and elegant" partly BECAUSE it is quiet, so this cuts directly against the thing the Phase F brief was chasing — worth putting to Mr Rana with both sites open side by side. If the answer is no, `_reveal.scss`, `ScrollReveal.tsx` and four call-site attributes revert together in one commit and nothing else changes.
2. Whether a motion hero ground is available to every site or remains a single Certified exception. If every site gets one, flat and static is no longer a group rule. **Largely subsumed by 1.**
3. The inherited `.btn2` contrast failure — `#C3D1DE` border at **1.56:1 on white**, below the 3:1 non-text threshold. Needs a dedicated border token in the shared layer.

## Traps that actually bit — this conversion

**Count from the routes, not from the data file.** The audit recorded 27 blog posts and 50 dynamic pages by counting `id:` occurrences in `blogsData.ts`. Most of those were nested `dataContent` SECTION ids inside each post. There are three posts; `/blog/4` is a 404; the real inventory is 34 routes, not 58. The route walk found it because it discovers routes from `/sitemap.xml` instead of trusting a hand count — which is the whole argument for discovering them.

**The shell-quoting hazard is real, and it bites more than once.** An apostrophe inside a `node -e` script wrapped in a single-quoted shell invocation terminates the quoting. It happened again in the D-phase work: a `node -e` carrying backticks and `${...}` was expanded by the shell before node ever saw it, and silently corrupted two component files — recovered with `git checkout`, but only because the tree was clean.

**The rule, stated once: any script whose content contains prose, apostrophes, backticks or `${`, goes in a FILE. Write the file, run the file.** Never `-e`, never an unquoted heredoc. Committing before each mechanical pass is what made the recovery free.

Also: **Python is not on the PATH** here — use node for text surgery.

**Mixed line endings will defeat a literal match.** This repo has both: `_heading.scss` is CRLF, `_button.scss` and `_typography.scss` are LF. Three separate scripted edits failed on an exact-string match that assumed one or the other. Match on `\r?\n` and write back using whatever the file already uses — and put the guard BEFORE the write, not after, or you get a half-applied migration like the rem rebase did.

**Hue rotation degrades contrast on dark grounds.** Holding HSL lightness while rotating hue does not hold *relative luminance*. Rotating a cool guide palette to a warm brand improves every light-ground ratio and **degrades every dark-ground one**. `--color-panel-muted` landed at 3.84:1 and had to be lightened. Full explanation in [[Brand layer]].

**The comparison page earns its keep immediately.** It caught that failure on its first run, before any code was written. Build it before the palette, not after.

**A decision instrument that renders nothing still exits 0.** The comparison generator defined `componentCss()` and never called it, so for three weeks both specimen columns were unstyled markup — no serif headings, no filled button, no card, no dark footer or panel — while the arithmetic underneath ran correctly and the gate passed. Sign-off stalled and the reason was invisible, because the page *looked* like a working page. The gate proved the numbers and proved nothing about the thing being judged. **When a script exists to be looked at, check the output contains what it is supposed to render, not merely that the script exited 0.** Same family as the dead lint gate, and the same silence.

**Check the rendered tag before you agonise over a rule.** This conversion paused on a by-eye call about `GrowthSection`'s "distinctive" 145px backdrop word — keep it and you have a second mannerism, remove it and you are building the gutted version. It selected `header > h1` and the markup renders an `<h3>`. **It had never applied on any build.** There was nothing to decide and nothing to preserve. `Heading` defaults to level 2 and takes a `level` prop, so structural selectors written against `h1` are dead all over this codebase. One curl and one grep would have answered it before the deliberation started.

**Deleting a shared keyframe stops the motion and leaves the duplication behind.** `_animation.scss` held `scrollX`, and three separate marquees rendered their content **four times over** so the loop had something to scroll into. Deleting the partial stopped all three at once — and left `TrustedBrands` showing 6 logos as 24, and `RangeOfMarket` showing 8 platforms as 32 and 7 as 28. The gates were all green and the pages looked broken. **When you delete an animation, grep for every element that consumed it and count its render passes**; a marquee is duplicated markup plus motion, and removing only the motion leaves the worse half.

**The legacy utility layer has to outrank the new primitives, not the other way round.** Both are single-class selectors, so source order alone decides. `ServicesCards` carries `className='small color_primary'` — a legacy colour utility paired with a name that is also in Appendix E's inventory — and with the obvious ordering the primitive silently took that heading's colour. The compiled order is now reset → primitives → legacy utilities → components, and it stays that way until D8 deletes the legacy layer. **Before adding a class inventory to an existing codebase, grep the markup for every name in it.** Three of ours were already in use.

**Render the open question, do not describe it.** The dark-family call sat in prose in this vault as "decide by eye on the page, not in the abstract" while the page rendered only one of the two options. A decision the instrument cannot show is not a decision anybody can make.

**A gate that cannot run is worse than no gate.** `npm run lint` runs `eslint --fix`, so it mutates the tree and cannot be a gate. And the config it loads had been failing since 11 August without anyone noticing — which is exactly the silence a working payload would have depended on. See [[Security incident 2026-08-11]].

**Read the whole file before trusting a `--stat`.** `git show --stat` rendered a 29,980-character malicious payload as `eslint.config.mjs | 23 +-`.

**A structural selector written against `h1` is probably dead.** `Heading` defaults to `level={2}`. The vault already recorded this once, against `GrowthSection`'s backdrop word, as a single curiosity. It is systemic: 35 such selectors, dead heading rules in **24 partials**. Most were harmless spacing; several were not. One left a 64px heading the same colour as its own ground on eight routes, one left every related-article title rendering at h3 size inside a 300px slide, and one left the brand-coloured half of a section heading uncoloured. **Write `:is(h1, h2)`, never a bare tag**, and when a section looks unstyled, check whether its rules ever applied before redesigning anything.

**Two legacy aliases can resolve to the same token, and then text disappears.** The three invisible-text bugs were all this shape: a `color_*` utility and a `bg_*` utility that pointed at different values before the token swap and at the SAME value afterwards. `color_tertiary` on `bg_gray--lighter` both became `--color-band`. `color_primary` on `bg_primary` both became `--color-brand`. Nothing in the palette gate catches this, because both tokens are correct in isolation — it is the PAIRING that fails. **When retiring an alias layer, diff the alias map for collisions and grep the markup for every ground/foreground pair that lands on one token.**

**On a dark ground the brand anchor is unusable; the marking tone is the one that works.** `#B3063C` is 2.84:1 on `--color-ink` and fails even the 3:1 large-text threshold. This was discovered EIGHT separate times in one run — in ArrowCard, ContentDisplaySection, QuestionAndAnswer, OurTeam, HowItWork and three eyebrows — because each was treated as a local fix. The brand layer already said "free on dark". **Read the palette's own role notes before deciding a colour, and when the same fix appears twice, write the rule down instead of the fix.**

**Deleting motion leaves the space it moved through.** D2 removed a scroll-driven reveal and left `padding-bottom: 46.875rem` — 750px of empty panel — on the home page, plus a second section pulled 481px up on a negative margin to fill the hole and a decorative SVG over the seam. The gates were green and the page had three quarters of a screen of blank ground in the middle of it. Same family as the marquees that kept their four render passes. **When you delete an animation, grep for the geometry that was cut to fit it: fixed heights, large paddings, negative margins, absolutely positioned covers.** Three separate arrangements in this codebase were built this way.

**A decorative overlap is a clipping bug waiting for a container change.** Every one of them here — the hero collage, DynamicMarket, the industry hero, FinalResult — depended on a parent that had `overflow: hidden`, and D0 narrowed that container by 206px. Composition that bleeds outside its own box survives only until someone changes the box. **Give a composition a box equal to its real extent and position inside it in percentages.**

**A named colour in an SVG attribute is not in CSS value position.** The token gate matched a colour after a colon or after `solid`, so `fill='white'` and `stroke='white'` walked past it for the whole conversion — eleven of them across eight files, all missed by D1's pass over the icon set. **A matcher written for CSS will not see JSX attributes.** Extended and mutation-tested.

**`node -e` and heredocs eat backslashes.** Recorded before, bit again immediately: a `node -e` script's `/\/g` arrived as `//g` and every ``, `s` and `d` in the same script silently lost its escape. **Write the file with a file-writing tool, then run the file.** And the CRLF rule bit again too — a multi-line replacement built with `
` matched nothing in a CRLF file and reported success. **Normalise to the file's own line ending before matching, and verify the replacement landed rather than trusting the exit code.**

**A class that does nothing is invisible in review but not on the page.** `.btn_secondry-full` had a size and no background and no border, so it fell through to the `.btn` primitive every button also carries and rendered identically to the filled button beside it. The "action pair" on eight service heroes was two identical filled buttons. **Grep a class's definition for whether it actually distinguishes anything, not just whether it exists.**

**When a decision is reversed, grep the vault and the stylesheets for what was justified by it.** Making the header sticky invalidated two written statements — one in [[Design system]] and one in `_navbar.scss` — that both said `scroll-padding-top` was unnecessary *because* the header did not stick. Neither was revisited, so anchor targets landed underneath the bar on every blog route. **A reversed decision has dependents, and they are usually documented as settled facts rather than as consequences.** Found by re-reading the notes while updating them, which is an argument for the update pass being real work rather than bookkeeping.

**`position: relative` with `z-index: auto` does NOT open a stacking context, so "local" z-indexes are not local.** The hero collage box held three images at `z-index` 2, 80 and 80, and because neither it nor any ancestor opened a context, all three were competing in the ROOT stacking context against every positioned element on the page. It looked correct for months purely because nothing above them was positioned. The instant the header became `position: sticky` at `z-index: 60`, two of the five images would have scrolled straight over it.

**Before adding any positioned element, grep the codebase for `z-index` and check which of those values are actually contained.** A z-index inside a box that opens no context is a global claim wearing local clothes. `isolation: isolate` on the box is the fix and costs nothing. Same family as the dead selectors: a rule that appears scoped and is not.

**A wrapper component that renames its own className makes the design system unreachable.** `Heading` emitted ``heading_${className}`` and `Text` emitted ``text_${className}``. The Appendix E primitives are `.h1`, `.h2`, `.h3`, `.h4`, `.eyebrow`, `.lead`, `.body`, `.small` — so `className='h2'` arrived in the DOM as `heading_h2`, which is defined nowhere. **Between them those two components render almost every heading and paragraph on the site, so the entire type layer built across D0–D9 could never apply through them.** It compiled, it linted, every gate was green, and it did nothing.

It also prefixed only the FIRST token, because the value is interpolated as one string: `className='primary uppercase'` became `heading_primary uppercase`. The legacy vocabulary was built around that quirk, which is exactly why the old classes kept working and the new ones silently could not — the failure was invisible from either end.

This is the same family as the dead `h1` selectors and the comparison page that rendered no component CSS, and it is the largest instance yet: **a whole design system, present, correct, and unreachable.** Fixed in `237b2fb`; the 111 legacy call sites carry their own prefix now.

**The rule: `curl` the page and read the rendered `class` attribute before believing a stylesheet applies.** Grepping the JSX proves what was *passed*, not what was *emitted*. Every trap in this conversion that cost real time — the dead `h1` rules, the unrendered specimen columns, the undefined `.btn_secondry-full`, this — would have been caught in one request by looking at the output instead of the input.

## Traps carried forward from the Certified conversion

| | |
|---|---|
| **01 Inventing guide-shaped labels** | The pull to write a mono eyebrow where the guide has one is strong, and it is a content change. It happened twice on Certified; both were reverted. |
| **02 Reordering to match the guide** | Moving hero pills below buttons, a star row below a quote. Content change. Will be reverted. |
| **03 Fixing a bug by adding copy** | Log it, raise it separately. |
| **04 Building the gutted version of an idea** | When the constraint removes the element that justified a design, the remainder gets rejected by eye without a clear reason. **Say so before building it.** |
| **05 The naive palette swap** | Does not bite here — `#B3063C` clears 4.5:1 on white. Do not assume that for the next site. |
| **06 Hard-coded hex inside a component class** | What the token gate is for. Has caught real instances in closing bands, footer pills, email constants, and a brand-new file written after the gate existed. |
| **07 Cascade layer and specificity** | Not applicable — this repo is Sass, not Tailwind. |
| **08 Preflight versus the guide** | Not applicable for the same reason. But **do not copy the guide's global coloured link rule** — it will turn the navigation, breadcrumbs and footer brand-coloured. Inline links opt in through `.link`; article bodies get it through `.prose`. |
| **09 Building primitives nobody imports** | Five wrappers built and deleted unused on Certified. Build one only when a call site demands it. |
| **10 Deleting motion that was requested** | If a sanctioned motion surface is ever added back, document the exception **at the point where the rule is stated**, not somewhere else, or a later pass will read it as leftover decoration. **This trap fired here.** D2 deleted the logo marquee as decoration; the user asked for it back in Phase F. It is reinstated in `_marquee.scss` and the exception is written in three places — the partial, the flat-and-static paragraph in `_surfaces.scss`, and the settled-decisions table above — precisely so the next pass does not delete it a second time. |
| **11 Assuming shell portability** | Gate scripts are Node, not shell. npm runs scripts through the platform shell and a POSIX one-liner fails on Windows. |

## Reporting discipline

**A clean build is not visual sign-off.** Say plainly what has and has not been looked at in a browser, rather than reporting the gates and letting them imply more than they prove.

**Write down rejected work.** A design that was built and rejected is worth more written down than deleted — the reasoning and the contrast figures transfer to the next site. Record what it was, why it was sound, and the most likely reason it failed.
