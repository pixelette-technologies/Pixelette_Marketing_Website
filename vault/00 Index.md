# Pixelette Marketing — revamp index

The note a fresh session reads first. Keep it accurate about what has and has not been verified.

Last updated: **20 November 2026** — Influencer & Partnerships approved design **COMPLETE** (gaps closed); homepage correction and Impact Compass remain COMPLETE; Founder sign-off still open. Phase F history still starts from 1 Sep.

## Where things stand

| | |
|---|---|
| Branch | **`bilal/revamp`** (tracking `origin/bilal/revamp`). Tip **`8346312`** (Influencer hero/close gap-closure; vault COMPLETE note follows). |
| Phase | Mock-up under the **12 Nov developer brief**, Service Offer plan copy, **19 Nov one-agency** pass, **20 Nov homepage presentation corrected**, **20 Nov Impact Compass**, **20 Nov Influencer & Partnerships** approved design. |
| Site code written | Service Offer + must-fixes 1–6 + §7 + one-agency proposition + homepage rectangular bands + Impact Compass + `/services/influencer_marketing` approved design (hero / deliver / close). |
| Pushed? | **Yes — `bilal/revamp` only**. No PR to production. Live domain untouched. |
| Preview | Vercel Preview for `8346312` reported **success**. Deployment URL: `https://pixelette-marketing-website-rn1zv63a9-pixelette-technologies.vercel.app`. Non-official hosts noindex. |
| Sign-off | **Not signed off.** Review §7 COMPLETE. One-agency COMPLETE. Homepage correction COMPLETE. Impact Compass COMPLETE. Influencer & Partnerships COMPLETE. Founder still owns wording / production approval. |

## Start here — next session, in order

1. Read [[Rules]] (brief + Service Offer honesty + one-agency framing + Impact Compass + Influencer exceptions; mock-up stays on baseline URLs; crawler allowlist).
2. Read [[Known bugs and deviations]] — **Pending for the next session** first. That is the whole remaining snag list.
3. Do not invent copy. Do not deploy live. Push only if asked.
4. Gates: `npx tsc --noEmit && npm run test:contact` — see [[Build and verification]].

## Pending for the next session (take these)

| # | Item | What to do |
|---|---|---|
| 1 | **Founder sign-off on one-agency wording + homepage presentation + Impact Compass + Influencer page** | Approve or amend before any production PR. Mock-up banners stay on draft public-sector pages until approved. |
| 2 | **Broader menu / route by-eye (if still required)** | Homepage correction pack is done. Full brief §8 / §9 pack across routes still deferred if required. Likely break points: mega-menu, capability grid, evaluation table. Diagnostic pack: `mockup-screenshots/diagnostic-impact-compass-2026-11-20/`. Influencer pack: `mockup-screenshots/influencer-partnerships-2026-11-20/`. |

## 20 November 2026 — Influencer & Partnerships approved design

**Instruction:** implement the final approved Influencer & Partnerships mock on `/services/influencer_marketing` exactly — hero (“Real voices. Stronger brands.”), What we deliver (five illustrated cards), closing (“Let's build your next campaign.”). No Our Approach, campaign examples or case studies. Reuse approved imagery; do not generate replacements. Preview only; do not change other pages.

**Shipped on `bilal/revamp` as `8346312` (gap-closure; implementation `edd4c12`):**
- Dedicated `InfluencerPartnershipsPage` (hero / deliver / close) replacing the shared specialist template on this route only.
- Imagery recovered from the approved mock into `public/services/influencer-partnerships/` (source mock was 682×1024 — cropped assets are resolution-limited).
- Existing site header, navigation and footer retained. SEO metadata preserved/aligned to the new lead.
- Screenshots: `mockup-screenshots/influencer-partnerships-2026-11-20/` (desktop-1440, phone-390).
- Preview: `https://pixelette-marketing-website-rn1zv63a9-pixelette-technologies.vercel.app`.

**Verification:** structure matches the approved mock (hero → five deliver cards → close only; no Approach / examples / case studies). Hero: one HTML CTA; collage annotation in the asset only. Close: continuous band, one HTML CTA, mock CTA excluded from the crop. Visual gap-closure after MOSTLY COMPLETE audits: `8346312`. Instruction gaps **COMPLETE**. Live domain untouched; no production PR.

**Limitation:** photographs recovered from the approved full-page mock (682×1024), not separate high-res masters — fine detail is softer. No unrelated stock; no image generation.

## 20 November 2026 — homepage presentation correction

**Instruction:** the `d4d5815` pass was wrong — it imported What We Do capability-stage media and five new service bands. Correct by restoring original homepage visuals below the hero, then presenting those original sections as Social Change–style rectangular image/copy layouts with alternating sides and scroll entrances. Do not change the hero or What We Do. Preview only.

**Shipped on `bilal/revamp` as `bcec022`:**
- Restored Post-it field, architectural maquette + original capability name list, and duck pond.
- Removed `CapabilityBand`, `_capabilityBands.scss`, and `capabilityBandCopy`.
- Rectangular split panels via `HomeSceneReveal` + rewritten `_homeScene.scss`; capabilities flips (art left); activity and relevance keep copy left.
- Screenshots: `mockup-screenshots/homepage-correction-2026-11-20/` (desktop hero / activity / maquette / relevance; mobile activity / capabilities / relevance) — pack refreshed `4959ff0` after audit found mis-captures.
- Preview: `https://pixelette-marketing-website-jo84q057u-pixelette-technologies.vercel.app`.

**Verification:** hero unchanged vs `af38481`; `src/components/ui/services` and `/services` routes untouched; `tsc` + `test:contact` green. Independent instruction audit: **COMPLETE** after screenshot refresh (code was already PASS).

## 20 November 2026 — Impact Compass diagnostic redesign

**Instruction:** redesign `/strategy-positioning` to approved Higgsfield Option 3 — The Impact Compass; remove old narrative hero sections; one seamless intro → 12-question tiles → results dashboard; preserve questions, dimensions, scoring; Discuss / Retake; no registration; compass in code not an embedded mock-up; preview only; do not change the homepage or other pages.

**Shipped on `bilal/revamp` as `3ea31db`:**
- Intro: “Find your next move.” + coded six-point SVG compass (`ImpactCompass`); Clarity Bridge and “Know where to compete / Know why you win” removed.
- Questionnaire: one question at a time, selectable answer tiles, dimension progress + percent bar.
- Results: clarity compass radar from real scores, per-dimension list, three-focus Impact Roadmap, Discuss your results → / Retake diagnostic; no registration gate.
- `src/lib/strategyDiagnostic.ts` scoring unchanged (byte-identical to parent); same twelve questions and six dimensions. Screenshots: `mockup-screenshots/diagnostic-impact-compass-2026-11-20/`.

**Independent audit against the instruction: COMPLETE.** Live domain untouched; no production PR. Preview: `https://pixelette-marketing-website-ijc20en7i-pixelette-technologies.vercel.app/strategy-positioning`.

## 20 November 2026 — homepage capability presentation

**Instruction:** refine homepage presentation below the hero only — Social Change–style alternating image/copy for the five capabilities, scroll entrances, less text-heavy; do not change hero, nav, footer, or other pages; preview only.

**Shipped on `bilal/revamp` as `d4d5815`:**
- Replaced the maquette + stacked name list with five alternating capability bands using existing `/services/capabilities/` media.
- Descriptions composed from existing cadence + scope + section lead (no new service claims); ~25–27 words each; links to existing service destinations.
- Directional one-shot entrance via `useInView` / CSS; respects `prefers-reduced-motion`; content visible without JS.
- Activity, one-approach, relevance and contact bands unchanged. SEO metadata unchanged.
- Representative screenshots in `mockup-screenshots/homepage-redesign-2026-11-20/`.

**Independent audit against the instruction: COMPLETE.** Live domain untouched; no production PR. Superseded for tip/push state by Impact Compass above.

## 19 November 2026 — one-agency content and navigation pass

**Source:** Founder instruction to present Pixelette Marketing as one integrated marketing and communications agency for private, public and community organisations — content and navigation refinement, not a rebuild.

**Shipped on `bilal/revamp` as `af38481`:**
- Homepage: new H1 and support; second-market band replaced with one-approach copy + “Explore our industries”; commercial-only rails softened.
- Nav: What We Do, Industries, Insights, About, Contact, Discuss Your Project. Public Sector removed as a top-level item; public-sector routes remain reachable via Industries and `/public-sector`.
- Public-sector hub: new intro; “Where we are, stated plainly” and “Conditions of entry” removed; evaluation is one service among others, not the lead offer.
- Specialist Market B pages: “What we have not yet done” removed; mock-up banners kept; how-to-buy honesty kept.
- Exact CTAs: Discuss Your Project, Let's Talk, Let's discuss your objectives, Tell us what you want to achieve, Submit Enquiry, first step “We start by understanding your objectives, audiences and challenges.”
- Contact procurement block reduced to “Supplier and procurement information”; enquiry options include Public Engagement.
- Leftover audit closures in the same commit: education explorer split, About “Objective focused”, specialist default CTA, dead `publicSectorGroups` / `notYetDone`.

**Independent re-audit against the instruction: COMPLETE.** Live domain untouched; no production PR.

## 18 November 2026 — mock-up review snag list

**Sources:** 12 Nov developer brief (mock-up scope); Service Offer plan `Pixelette_Marketing_Service_Offer_And_Website_Plan_11Nov2026` (creation date 11 Nov; §10.2 corrected on disk from 17 Nov, heading fix rebuilt 18 Nov 09:32). Leadership snag note summarised in chat 17–18 Nov.

**Closed on the branch (must-fixes 1–5 + point 6):**
1. Mock-up banner on the eight gated pages that lacked it (five Market B lines via `MarketBServicePage`, campaign evaluation, `/about/people`, `/accessibility`). Demonstrations + Web3 already had it. How-to-buy not in the list.
2. Preview crawling: non-official hosts get `X-Robots-Tag: noindex, nofollow` and `/robots.txt` `Disallow: /` (later widened to every host except apex + www — see lower-priority pass).
3. Sitemap emits the **23 production baseline URLs** only; new mock-up routes omitted and `index: false`.
4. Existing pages back on **6 November baseline URLs** (brief §3): `/aboutus`, `/blog-list`, `/blog/[id]`, underscore service paths, single `/results` with hash anchors. Migrated paths redirect back. New routes keep new URLs.
5. Contact form reviewable: recorded consent sentence + notice version `1.0` when preview env is empty, so the budget selector shows. API still refuses mail without server config.
6. Evaluation page: heading **Two ways to buy it**; third bullet (independent evaluation / campaigns someone else ran) **deleted**. No replacement sentence — option returns only when a methodological specialist is appointed. Demonstrations link unchanged.

**Closed later the same day (lower-priority + crawler gate):** logo alts from wordmarks; `/services` “The Diagnostic →”; homepage numbers 02–05; “Quacking good…” kept; brief §2 answers refreshed; crawler allowlist = official domain only; preview open for management review. Independent completeness review: product items **Pass**; two stale doc lines cleared in `3be2b68`.

**Closed same evening (review §7 remainder from the PDF):** media stems 01–05 renamed to current group names; `#measurement-and-insight-view` anchor; CDP placeholder sentence on how-to-buy; eyebrow kept; public-sector measures kept; Privacy choices confirmed as the cookie-panel button. Pushed as `6c0b433`. Independent review against the PDF + owner decisions: **COMPLETE** (all nine §7 items Pass).

**Still pending after §7** — screenshot pack, then superseded in part by the 19 Nov one-agency pass above. See **Pending for the next session**.

## 16–17 November 2026 — Service Offer and Website Plan

**Sources (authority order for this pass):**
1. `Pixelette_Marketing_Service_Offer_And_Website_Plan_11Nov2026.pdf` (extracted text used for independent review).
2. Earlier scaffolding from `Pixelette_Marketing_Developer_Brief_v1.0_12Nov2026.pdf` (IA, empty shells, nav).

**Honesty rule kept:** no invented periods, bios, policies, demonstration artefacts, WCAG claims, or framework appointments. Where the PDF’s supplied sentence would be false today, omit or narrow until the dependency exists.

**Shipped then (summary; URL state later corrected 18 Nov for the mock-up):**
- Market B hub + six lines + campaign evaluation + how-to-buy; Governance footer; plan copy; Insights / about / results structures (mock-up later restored baseline URLs per brief).
- Contact procurement block, budget bands through email + `attribution` JSON, FAQ honesty.
- Results figures require source + period (BlockGuard: “Client case study supplied by management” / “Period not yet recorded” — not invented).
- Demonstrations and Web3: shells kept, `index: false`, out of nav/sitemap.
- Soft-gap pass: procurement no longer overclaims; industries provenance; thin trading history; meta/schema/footer/hero support aligned to two-market proposition; analytics secondary CTA → evaluation; accessibility/social-value version lines; privacy effective date → 8 Oct 2026; VAT omitted until confirmed.

**Independent reviews (against the PDF source, not Cursor plans):** first **INCOMPLETE** (six real gaps) → closed → **MOSTLY COMPLETE**; then 17 Nov leadership snag list → five must-fixes + evaluation deletion closed 18 Nov.

**Still out of code / accepted (business, not snag):** people bios; real demos; own-results pages; WCAG audit; unpublished policies; CDP supplier ID; RM6124 appointment; directory/profile edits; VAT confirmation.

---

## 12 November 2026 — developer brief mock-up (scaffolding)

**Source:** `Pixelette_Marketing_Developer_Brief_v1.0_12Nov2026.pdf`. User ruled the PDF absolute instruction; empty slots where no words were supplied. Superseded for copy by the Service Offer plan pass above; IA and shells remain the base.

**Built then:** five capability groups; Public sector nav; Governance footer; seventeen new routes; mock-up banners; people placeholders; Ask Pix M off.

**Fix passes (13–16 Nov):** contact/budget wiring scaffolding; SecondMarketBand; mega-menu; `IMPROVE_OPTIONS`; homepage blocker + flags. Independent review that evening: **COMPLETE WITH ACCEPTED GAPS** (empty plan-copy slots). Those slots were filled 16–17 Nov from the Service Offer PDF.

Hand-back note: `mockup-screenshots/HANDBACK.md`.

---

## Read this first — Phase F and what it found

The user's specifics arrived on 1 September 2026, as a side-by-side comparison against **Pixelette Certified**, which was revamped from the same guide and which they judged "much more clean and elegant". The brief: make Marketing feel like Certified *without* making it a replica — keep content, brand colour, logo, images and sections; change UI and arrangement only.

**The diagnosis was one structural fact, not a list of taste differences.** Certified was *built on* the guide's anatomy. Marketing was *repainted underneath its old anatomy*.

And underneath that sat the real fault, found by curling the page and reading the rendered `class` attributes:

> ### `Heading` and `Text` renamed every class on the way out
>
> `Heading` emitted ``heading_${className}`` and `Text` emitted ``text_${className}``. The Appendix E primitives are `.h1`, `.h2`, `.h3`, `.h4`, `.eyebrow`, `.lead`, `.body`, `.small` — so `className='h2'` reached the DOM as `heading_h2`, **defined nowhere**. Those two components render almost every heading and paragraph on the site, so **the entire type layer built across D0–D9 was unreachable through them.** It compiled, it linted, every gate was green, and it did nothing.
>
> It also prefixed only the FIRST token, because the value is interpolated as one string — `className='primary uppercase'` became `heading_primary uppercase`. The legacy vocabulary was built around that quirk, which is exactly why the old classes kept working and the new ones silently could not.

That is the answer to "why does Marketing look nothing like Certified". The design system was not under-adopted. It was **unreachable**. Fixed in `237b2fb`.

**Do not treat the home page as finished design.** It is the only page that has had a Phase F pass. The other twelve sections are still on the legacy vocabulary and still look like the rejected version.

## Start here — next session, in order

1. **Read [[Rules]] first**, especially "Traps that actually bit".
2. **Re-run the gates before touching anything**:
   ```
   npx tsc --noEmit && npm run lint:check && npm run lint:legacy-tokens && npm run compare:palette && npm run test:contact
   npm run dev              # then, in another shell:
   npm run route:walk
   ```
   The user usually already has a dev server on **:3001**. Do not start a second one and do not kill theirs — check first. Confirmed on 1 Sep: `npm run dev` refuses to start a second server and exits, so this is safe to test but pointless to repeat.
3. **`curl` the page and read the rendered `class` attributes before believing any stylesheet applies.** This is the single highest-value habit in this repo. Grepping the JSX proves what was *passed*, not what was *emitted*. Every expensive trap here — the dead `h1` rules, the specimen columns that rendered nothing, the undefined `.btn_secondry-full`, the `heading_` prefix — would have been caught in one request.
4. **Continue Phase F.** The home page is converted; the remaining twelve sections are not. See "Phase F" below.
5. **The user is iterating by eye and editing files at the same time.** Check `git status` before assuming the tree is yours — see "Concurrent editing" below.

## Phase F — the Certified comparison, and what it changed

### The six differences that mattered

Measured against the guide's own source, not against taste:

1. **Section anatomy.** Certified opens every section `eyebrow → serif h2 → standfirst → grid`. That one repeated device is most of why it reads as systematic. **The copy for it already exists in our content** — ten components take a `mainHeading` + `subHeading` pair and several more hard-code one, and the conversion had been rendering both halves as the same uppercase display heading. Re-roling them is a pure class swap: no new copy, no DOM reorder, no heading level changed.
2. **Sentence case.** The whole pattern guide contains **exactly one** all-caps h1 or h2. The display face is drawn for lowercase and carries NEGATIVE tracking, which is the worst possible setting for capitals.
3. **A hairline between sections, not a slab.** The guide separates on `1px` with backgrounds alternating white and a pale tint. Certified has zero dark slabs above the footer.
4. **One card everywhere.** We had four treatments.
5. **Measure caps.** The guide caps `.lead` at 62ch and `.body` at 66ch. **Ours had no `max-width` on either**, so every paragraph ran the full 1160px. Simply missing.
6. **A stat band under the hero.** `.tile` is defined and was used nowhere.

### Sentence case without touching content

Several headings are stored **lowercase** in the source and only ever looked capitalised because the `uppercase` utility shouted them — "growing in dynamic markets is tough". Dropping the utility alone would render them lowercase; editing the strings would change content bytes.

`::first-letter { text-transform: uppercase }` on the display classes resolves it in CSS. Capitalising an already-capital letter is a no-op, so it is safe everywhere and needs no per-call-site knowledge of the copy.

### The dark family — a settled decision, and partly forced

The user rejected reducing Marketing to Certified's light-throughout rhythm: **"I don't want marketing to be a replica of Certified, keep some uniqueness."** Recorded in [[Rules]].

Two of the three dark bands are **not a choice at all**. Every client logo and every platform mark in this repo is knockout white — one carries a white fill attribute, the rest are baked raster patterns — so those rows cannot sit on a light ground without new assets. The user chose Option A: keep the tools band dark rather than retint fifteen third-party brand marks.

`.band-dark` makes it a device instead of an accident. **Three per page maximum, always full-bleed, never the separator between two ordinary sections.** Contrast against the worst case, the gradient start: signal 5.34, white 19.30, panel text 7.36, panel muted 5.39. The brand anchor is 2.77 there and stays barred.

The rhythm this produces — light hero → dark proof band → light → light → dark capability matrix → light → dark close — is Marketing's own. Certified is light throughout with a dark close only. Same bones, different face.

### What the by-eye rounds actually found

None of these were catchable by a gate:

| | |
|---|---|
| **The header logo was invisible** | The wordmark paths are `fill="white"`, drawn for the dark header the site used to have. The ground flipped to white in the conversion and the logo never followed — the brand name was white on white. `LogoBlack` already existed for exactly this. |
| **Nav dropdowns were clipped** | `container_main` carries `overflow: hidden`, kept because four sections position decorative elements outside their own box. Switched off on `.site-header`'s own container only. |
| **"Leading Brands" broke mid-phrase** | A hard `width: 12.4375rem`, measured against the old sans heading. |
| **A long gap in GrowthSection** | Two causes stacking: a full `--sec-y-sm` margin AND `align-items: center` centring a ~300px text column against a ~430px collage. |
| **EngagementStalls read as a brick** | A bordered, rounded box of bordered cards *inside* a light section. **A box inside a box reads as a widget.** Now a full-bleed band with the cards three across. |
| **The card title was two lines** | `mainHeading` and `subHeading` are two separate paragraphs stacked in a flex column. Row direction put them on one line; merging them in markup would be a DOM change. |
| **"View More" squeezed the title** | It sat in a flex row beside the heading. It could not simply be moved — the link and the summary are not siblings, so `order` had nothing to sort them within. `display: contents` on the wrapper promotes both to the same flex column, and `order` sequences them with source order untouched. |

### The two things on the site that move

**1. The logo marquee.** Client logos in `TrustedBrands`, and `RangeOfMarket`'s two platform rows against each other. The user asked for it back after D2 removed it with the decorative layer.

**2. The hero parallax.** The five collage images track the pointer at five different depths — 4px at the backdrop up to 16px on the nearest. This *reverses* the Phase A decision to remove it, at the user's request; the hero is theirs to call by eye.

**It was rebuilt, not restored, and the reason matters.** The version D2 deleted gave all five images the SAME offset and differed only in transition duration, so there was no per-layer depth at all — the sense of depth was an artefact of staggered easing. Restoring it verbatim would have reinstated an effect that never worked. Depth now follows the stacking order, which is what makes it read as depth rather than as a wobble.

`HomeHero` stays a **server component**: the collage owns its own `"use client"` boundary, so the headline and call to action are not shipped as client JS because the picture beside them moves.

**Do not delete either as leftover decoration.** They are explicit exceptions to a fixed group property, documented in `_marquee.scss`, `HeroCollage.tsx`, the flat-and-static paragraph in `_surfaces.scss`, and the settled-decisions table in [[Rules]]. Trap 10 predicted exactly this failure and it has already fired once, on the marquee.

**There are exactly two, and the register is otherwise still flat and static.** Both are opt-in behind `prefers-reduced-motion: no-preference`; the parallax also requires `pointer: fine`, so a touch device neither pays for the listener nor promotes five compositor layers. Neither licenses motion on cards, hovers, reveals or scroll. **If a third is ever proposed, that is the point at which "flat and static" has stopped being true and the group should be asked rather than assumed.**

Two things worth carrying forward:

- **Motion and duplication are one thing.** A marquee needs its content rendered twice so the loop has somewhere to restart. D2 deleted the motion and left the copies, which is how `TrustedBrands` came to render 6 logos as 24. If the animation ever goes again, the second group goes with it.
- **The seam is not `-50%`.** The track is `2 × group + gap` wide, so `-50%` lands half a gap short and the strip jumps once per cycle. Translate `calc(-50% - gap / 2)`.

`prefers-reduced-motion` returns the static wrapping strip and hides the duplicate. **Accessibility floors are not part of the exception** — they are fixed group property in their own right.

### Concurrent editing — new, and it bit

**The user edits files while a session is working.** During Phase F, `_growthSection.scss` changed under the session twice. The first time looked like an editor artifact and was re-applied; that judgement was wrong. It was a deliberate restructure — the heading moved inside the header column, gained a `.sectionTitle` class, and the row went back to `align-items: center`, which suits the taller column that restructure produces.

**That restructure killed a selector.** The accent rule was `.growthSection > h2 > span`, and the heading is no longer a direct child — so the brand-coloured half of the heading silently stopped being brand-coloured, while the heading itself still looked styled because `.h2` carries the ink. Fixed in `10446e5` by hanging the rule off the class rather than the position.

**Check `git status` before assuming the tree is yours, and prefer class-based selectors over positional ones** — this codebase's structure moves.

## The dead-selector sweep — the headline finding of the D4/D5 run

`Heading` defaults to `level={2}`, so it emits `<h2>`. **35 structural selectors across the stylesheet were written against `h1`.** A sweep found dead heading selectors in **24 partials**. The vault already recorded this trap once, against `GrowthSection`; it turned out to be systemic.

Most were harmless spacing. Several were not:

- **`ServicesSection`** — "We manage You grow" is the `large` variant, so up to 64px, and it took `color_tertiary` on a `bg_gray--lighter` band. Both aliases resolved to `--color-band`. The largest type on the eight service routes was **the same colour as its own background**.
- **`WhoWeAre`** — both eyebrows were the same colour as their own ground. `color_primary` on `bg_primary`, and `color_secondry` on `bg_secondry`. 1:1, twice, on the About page. A white-to-transparent gradient plate behind the first few characters is the only reason either was ever partly readable.
- **`RelatedBlogs`** — card titles were styled at 16px by a rule selecting `h1`; the markup renders `<h3>`, so every related-article title rendered at up to 25px inside a 300px slide.
- **`ResearchSection`** — the rule colouring the accent `<span>` in the section heading was dead, so the brand-coloured half of that heading never was.
- **`TrustedBrands`** — both heading rules dead, so the arrow was never aligned to "Trusted by" and "Leading Brands" never got its white on the dark ground.

**Every structural selector in this codebase should be written `:is(h1, h2)`**, and they now are where they were touched.

## Contrast failures found and fixed

All the same mistake: the brand **anchor** used as an accent on a **dark** ground. `#B3063C` measures 2.84:1 on `--color-ink` and fails even the 3:1 large-text threshold.

| Where | Was | Now |
|---|---|---|
| `ArrowCard` dark variant, main heading | anchor, 2.84 | signal, 5.48 |
| `ArrowCard` dark variant, summary | `color_gray`, 3.43 | panel text, 7.55 |
| `ArrowCard` both hover states | white on a lightened ground, **1.06 and 1.55** | hover changes border only |
| `ContentDisplaySection` heading span | anchor, 2.84 | signal, 5.48 |
| `ContentDisplaySection` standfirst | `color_gray`, 3.43 | panel text, 7.55 |
| `QuestionAndAnswer` heading span + eyebrow | anchor, 2.84 | signal |
| `OurTeam` eyebrow + standfirst | 2.84 and 3.43 | signal, panel text |
| `HowItWork` step icons | anchor on panel, ~2.7 | signal, ~5.3 |
| `Accordion` closed index number | 3.4 | `--color-soft`, 5.44 |

**The rule, stated once:** on a dark ground the anchor tone is unusable and the marking tone is the one that works. The brand layer already says so — "free on dark" — and it took eight separate discoveries to apply it. See [[Brand layer]].

## Accessibility defects fixed inside the conversion

Four click-only controls, all the same shape as the accordion fixed earlier in `b32f4c3`: a non-interactive element carrying `onClick`, with no button, no keyboard path, no focus state and no ARIA state.

| Component | Was |
|---|---|
| `ProcessSection` tabs | `<h4 onClick>` — a heading used as a control |
| `BlogCategoriesDropDown` | `<header onClick>` — and it only exists at the widths where it *replaces* the sidebar, so the blog filter was unreachable without a mouse on phones |
| `SingleBlogContent` table of contents | `<header onClick>` |
| `ArrowCard` "View More" | `display: none` until hover — unreachable by keyboard, absent on touch |

Selected state across three filter components moved to `aria-pressed`, which also retired `color_secondary` — the misspelling the vault flagged, resolved with no visual change.

## Commits on this branch

Oldest first. Working tree clean.

| SHA | What |
|---|---|
| `a9c6379` | `fix(security)` — removed the obfuscated payload. See [[Security incident 2026-08-11]]. |
| `c4d42da` … `636659d` | D0–D3, D6–D9 and Phase E's ground. See the git log; unchanged this run. |
| `fa43b32` | `fix(ui)` — four contrast failures in `ArrowCard`, hover retired. |
| `3a6cfa2` | `feat(ui)` — D4: closed the 750px hole the deleted scroll reveal left. |
| `5f5a153` | `feat(ui)` — D4: the hero rebuilt on its own geometry. |
| `e76e3e3` | `feat(ui)` — D5: the shared sections. |
| `4c2f47d` | `feat(ui)` — D5: About. |
| `7615d27` | `feat(ui)` — D5: ContactUs, and the token gate taught about SVG attributes. |
| `40d7788` | `feat(ui)` — D5: Services. |
| `9697d3b` | `feat(ui)` — D5: Industries and the single-industry template. |
| `6020cce` | `feat(ui)` — D5: Blog, the article template and Stories. |
| `c9cf171` | `refactor(scss)` — D8: the legacy colour layer deleted. |
| `3b2ce18` | `feat(scss)` — F1: measure caps restored, sentence case via `::first-letter`, one shared `.band-dark`. |
| `237b2fb` | `fix(ui)` — **F2: `Heading` and `Text` stop renaming every class.** 111 legacy call sites across 37 files carry their own prefix. The commit that made the design system reachable. |
| `b9390e8` | `fix(ui)` — F3: six defects found by eye — the invisible logo, clipped dropdowns, the broken "Leading Brands" label, the Growth gap, EngagementStalls stacked. |
| `5cbbdc2` | `fix(ui)` — F4: ArrowCard's "View More" moved to the foot via `display: contents`. |
| `9324305` | `fix(ui)` — F5: the ArrowCard title on one line. |
| `10446e5` | `fix(scss)` — F6: the Growth accent reattached after the heading moved, plus the user's concurrent restructure. |
| `ed0ae25` | `fix(ui)` — F7: one type size across the nav bar, up 2px. The dropdown labels were 13px against the plain links' 14px, because the two kinds of nav item never shared a type rule. |
| `b0cecb6` | `feat(ui)` — **F8: the logo marquee reinstated as a sanctioned exception to flat-and-static.** See [[Rules]]. |
| `f68f429` | `feat(ui)` — **F9: the hero parallax rebuilt with real per-layer depth.** Motion exception 2 of 2. `HomeHero` stays a server component. |
| `6dbbac8` | `feat(ui)` — F10: the header made sticky, and the hero collage isolated so its `z-index: 80` images stopped competing in the root stacking context. |
| `9a9e688` | `fix(scss)` — F11: `scroll-padding-top` for the sticky header. Anchor targets were landing under the bar on every blog route. **Found by re-reading the vault, not by a gate.** |
| `fe9a4c4` | `fix(scss)` — F12: the user's own by-eye edits to WhoWeAre and Located, committed as their own concern. |
| `8133e51` | `fix(scss)` — F13: two of the four OurValues cards were painted their own ground. **Pairing failure, instance 3.** |
| `127a3b3` | `fix(scss)` — F14: OurTeam portraits bottom-aligned; labels were 1.63–2.31:1 on the dark-ground tone. |
| `ec367d9` | `feat(ui)` — F15: About stopped closing on three dark bands. Reordered by `order`, not DOM. Known consequence: two different darks now touch at the footer seam. |
| `9bf30e6` | `fix(ui)` — F16: the blog Categories label was set at `--fs-h2`, larger than most of the page it filters. |
| `7673ef7` | `feat(ui)` — F17: ContentDisplaySection rebuilt on EngagementStalls' anatomy. **Its card text had never applied on any build.** |
| `ecc3c13` | `feat(ui)` — F18: ServicesSection's panels deleted — the alternation was a token collision. **Pairing failure, instance 4.** Also killed the last stray `position: sticky`. |
| `4fce2e8` | `feat(ui)` — **F19: a scroll reveal on every page.** The third motion surface, site-wide, and the one that retires flat-and-static rather than carving an exception from it. See [[Rules]]. |

### The stacking order, now that something is sticky

Written down because the header is the first positioned element above the page, and that changed what every other `z-index` means.

| | |
|---|---|
| Cookie consent | `fixed`, 9999 — correct for a consent banner |
| `.skip-to-content` | 100, must always win. Not yet in the DOM |
| `.site-header` | **60**, sticky |
| Mobile drawer 50 · dropdown panel 40 | **inside** the header, so they ride in its context rather than competing |
| Hero collage 2 / 80 / 80 | now contained by `isolation: isolate` — see [[Rules]] |

**`position: relative` with `z-index: auto` opens no stacking context**, so the collage's three values had always been global claims. Harmless until something above them was positioned; the sticky header is exactly that. Grep `z-index` before adding any positioned element.

## Gate state, all green

| Gate | Command | State |
|---|---|---|
| Type check | `npx tsc --noEmit` | silent |
| Lint | `npm run lint:check` | 0 errors, 0 warnings |
| Sass | `npx sass src/scss/main.scss` | compiles clean |
| Token gate | `npm run lint:legacy-tokens` | 0 findings; **now also catches named colours in SVG attributes** |
| Palette drift | `npm run compare:palette` | 0 introduced, 1 inherited, no drift, nothing ungated |
| Route walk | `npm run route:walk` | 34/34 |
| Contract tests | `npm run test:contact` | 30 pass, 0 fail |
| Structured data / metadata | see [[Build and verification]] | **Intentionally rewritten 14 Oct 2026** — `src/data/site.ts`, linked-only sitemap. Diff is expected; do not “restore” the old freeze. |

## Assertions

| Assertion | Target | Before this run | Now | |
|---|---|---|---|---|
| `@media` blocks | down from 282 | 248 | **27** | ✅ |
| Distinct breakpoints outside `Importance` | few | 60 | **1 — 767px** | ✅ |
| `bg_*` / `color_*` call sites | 0 | 150 | **0** | ✅ |
| `color.$*` references | 0 | 36 | **0** | ✅ `_color.scss` deleted |
| Hard-coded colour | none | none | **none** | ✅ |
| Inline `style={{…}}` | 0 | 36 | **33** | ◐ |
| Appendix E primitives **reaching the rendered DOM** | every section | **0 — impossible via `Heading`/`Text`** | **27 on `/`** | ◐ home page only |
| `uppercase` / `font_family_glory` in TSX | 0 | 84 | **42** | ◐ the other twelve sections |

**Measure the primitive row by curling the page and counting rendered `class` attributes**, never by grepping the JSX. Before `237b2fb` the grep would have reported healthy adoption while the true figure was zero.

Both counts above are **occurrences**, `grep -ro … | wc -l`, not matching lines. An earlier revision of this table recorded 29 for the legacy row because it summed `grep -rc`, which counts lines containing a match and undercounts any line carrying both classes. Use the same command each time or the trend is meaningless.

The 27 remaining media queries: **14 belong to the quarantined `Importance`** and are deliberately untouched; **11 are all at 767px** and are genuine swaps that cannot be interpolated — the navbar drawer and its dropdown, the hero collage giving way to its flat stand-in, the blog sidebar giving way to a dropdown, and display tracking and leading in the type scale. The final **2 are the motion opt-ins** added in Phase F: `prefers-reduced-motion: reduce` in `_marquee.scss`, and `(prefers-reduced-motion: no-preference) and (pointer: fine)` in `_heroHome.scss`. Neither is a breakpoint and neither counts against the responsive-surface target.

## What is left

### SEO / indexing (14 Oct 2026)

**In code: done.** Shared `pageMetadata`, robots, linked-only sitemap (~23 URLs), titles/descriptions aligned with current voice. See [[Build and verification]].

**Still open:**
1. Drop **one** sitewide share image at `/public/og/default.png` (1200×630) and wire it in `src/data/site.ts`.
2. After deploy: confirm live `/robots.txt` + `/sitemap.xml`, then submit the sitemap in Google Search Console.

The five `/industries/[slug]` specialist pages stay live but unlinked and out of the sitemap — see [[Known bugs and deviations]].

### From the Phase F note (may be partly stale)

1. **Phase F on the other twelve sections.** The home page is done; everything else is still on the legacy vocabulary and still looks like the version the user rejected. The pass is mechanical now that F2 has made the primitives reachable: re-role `mainHeading` → `.eyebrow`, `subHeading` → `.h2`, standfirst → `.lead`; retire `uppercase` and `font_family_glory` from headings; delete the D8 colour blocks that restate what the primitives already carry. **Do the sections the user can see soonest first, and show one page before repeating it twelve times.**
2. **The browser walk on everything except the home page.** All static routes plus one of each dynamic template, at 1440px and 390px. The home page has been looked at repeatedly; nothing else has been looked at at all.
3. ~~**`CONTACT FORM TEMPORARILY UNAVAILABLE` on the home page**~~ — **Closed 18 Nov (must-fix 5).** Form defaults to notice `1.0` + recorded consent when preview env is empty so the budget selector can be reviewed; API still refuses mail without server config.
4. **33 inline `style={{…}}` blocks** remain, mostly in page-level files and the two carousels.
5. **`.small` is 13px; the guide's is 14px.** Appendix E is "fixed, do not vary". Noticed during Phase F, not changed, because it is a site-wide type change and belongs in its own commit with the user warned.
6. **Raised, not fixed** — see [[Known bugs and deviations]]: the placeholder copy on `/contactus`, the five off-palette pastels on About, `FinalResult`'s permanently hidden icon row, the article table of contents moving below the article on phones.
7. **NONE of the three motion surfaces has been seen moving.** The marquee, the hero parallax and now the F19 scroll reveal were all verified in the rendered DOM and the compiled CSS, not by eye. There is no headless browser in this project and one was not added. Specifically unverified: whether the marquee seam is invisible at the loop point; whether the parallax amplitudes read as depth or as drift; and for the reveal — whether 640ms at a 12px rise reads as elegant or as sluggish, whether the 70ms grid cascade reads as a cascade or as a wave, and whether a fade on EVERY block turns out to be too much on the long templates (`/services/*` has 15 staggered grids). All by-eye calls only the user can make. **Expect the reveal timing to need one iteration.**
8. The security follow-ups in [[Security incident 2026-08-11]] remain the more urgent item. **Remote `main` still carries the payload.**

## The one-sentence version

Take the look and feel from the pattern guide; keep the substance — content, colour, imagery, widgets, data — from this codebase. Same bones as the sibling sites, a different face.

## Standing instructions from the user

- Current mock-up work is on **`bilal/revamp`**. Older Phase F history also lived on `revamp/ui`.
- Commit in logical chunks, one concern per commit.
- **Do not touch `main`. Do not invent a new branch** unless asked.
- **Do not push, do not open a PR, do not deploy** without being asked.
- Decisions already taken are in [[Rules]] under "Settled decisions". Do not relitigate them.

## Notes

- [[Design system]] — token values, class inventory, framework mechanics
- [[Brand layer]] — why the palette is what it is
- [[Hero strategy]] — the matrix and what has been decided
- [[Build and verification]] — commands, gates, environment hazards, **route inventory + SEO/metadata (14 Oct 2026)**
- [[Known bugs and deviations]]
- [[Rules]] — standing constraints, traps, and the updated SEO non-regression rule after the metadata rewrite
- [[Security incident 2026-08-11]]
