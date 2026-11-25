# Known bugs and deviations

Everything the audit turned up, sorted by what happens to it. See [[Rules]] for why the boundary falls where it does.

## Pending for the next session

Review §7, one-agency, homepage correction, Impact Compass, Influencer & Partnerships, Social & Community (MOSTLY COMPLETE), PR & Earned Media (instruction COMPLETE), Email Marketing (instruction COMPLETE), SEO, Content & AI Visibility (instruction COMPLETE), Paid Media & PPC (instruction COMPLETE), Lead Generation (instruction COMPLETE), Measurement & Insight (instruction COMPLETE), Sectors (instruction COMPLETE), Social value (instruction COMPLETE), Accessibility (instruction COMPLETE), the 25 Nov footer consolidation (COMPLETE), and the 25 Nov Living Signal 2.5D enhancement (MOSTLY COMPLETE) are on the branch. A fresh session takes these:

| Item | Notes |
|---|---|
| **PR & Earned Media — licensed hero photography** | Instruction audit COMPLETE without this. Handoff references are flattened mockups, not production layers. The page uses original drawn editorial panels. Supply rights-cleared photos only if the Founder wants photographic strips: camera/lens, employee silhouettes, architecture, public/community. |
| **Social & Community — Manchester photo rights** | User-supplied St Peter's Square photograph has no photographer / source URL / licence in the handoff. **Publication blocker** until commercial reuse is confirmed or an approved rights-cleared equivalent is supplied. |
| **Social & Community — foreground people production asset** | Three people exist only inside the locked composite reference. Recovered soft-composite used for review; not a clean cutout. Do not present as documentary photography. Obtain approved people asset only with explicit approval (no unapproved generation/purchase). |
| **Social & Community — commenter names** | Locked mock: initials + three sentences. Implementation also shows Alex / Jordan / Sam. Strip to match lock, or keep as documented deviation. |
| **Lead Generation — hero artwork resolution and rights** | Supplied PNG is 585×431 and is used unaltered at `public/services/lead_generation/action-triptych.png`. The full triptych stays visible at 320–1440. It will look soft on a retina desktop. The handoff says an earlier external exclamation image must not be treated as cleared, and the prepared asset still needs the owner's rights check before live. |
| **Sectors — supplied photography is 680×384** | Eight JPEGs extracted from the interactive prototype, used unaltered at `public/sectors/`. They are not high-resolution masters. The panel will look soft on a retina desktop. Confirm rights and supply production masters before live. |
| **Founder sign-off on one-agency wording + homepage presentation + Impact Compass + Influencer + Social page + PR page + Email page + SEO page + PPC page + Lead page + Measurement page + Sectors page + Social value page + Accessibility page** | Approve or amend before any production PR. Mock-up banners stay until pages are approved. |
| **Social value mosaic is 1035×435** | Supplied crop used unaltered at `public/social-value/mosaic-hero.png`. It will soften above that width. |
| **Accessibility mosaic is 675×405** | Supplied crop used at `public/accessibility/mosaic-hero.png`. At 1440 it is shown at 840×504. It will soften on a retina desktop. |
| **`serviceLines.ts` still describes a published accessibility conformance position** | `/policies` and `/public-sector/how-to-buy` return 410. The contact FAQ names Accessibility and Social value only. `src/data/publicSector/serviceLines.ts` was left unchanged. |
| **Broader menu / route by-eye (if still required)** | Homepage correction pack done. Full brief §8 / §9 across routes still deferred if required. Likely breaks: mega-menu, capability grid, evaluation table. |

## Closed 25 Nov — Living Signal 2.5D enhancement (MOSTLY COMPLETE)

Independent audit against the instruction: **MOSTLY COMPLETE**. Homepage hero only (`LivingSignal.tsx`), `cac5869`. Composition, colours, labels and annotation preserved. Threads gain depth/weight/shadow; balls are smaller shaded spheres; cursor pull is depth-scaled with coordinated string-riding; soft key light added. Reduced-motion and touch behaviour unchanged. `tsc` silent; 37 contact tests pass (re-run confirmed). Preview: https://pixelette-marketing-website-cpptr4dg8-pixelette-technologies.vercel.app. Screenshots and interaction recording left as-is — Founder reviews cursor motion on the preview. Live domain untouched.

## Closed 25 Nov — Footer consolidation (COMPLETE)

On `bilal/revamp` as `a6b692d`. `/policies` and `/public-sector/how-to-buy` return 410 Gone. No redirect. Not in the sitemap. Governance footer column removed. Company order: About, Industries (`/industries`), Insights (`/blog-list`), Social Value (`/social-value`), Accessibility (`/accessibility`), Contact (`/contactus`). Header still says Sectors. Privacy, Cookies & analytics, and Privacy choices stay in the legal row. Public-sector hub link and the contact procurement slot are gone. Supplier-questionnaire answer names Accessibility and Social value only. Accessibility and Social Value page content were not edited. `tsc`, 37 contact tests, ESLint on the edited files, and `npm run build` passed. Production check: 410 on both removed routes, 200 on Privacy, Cookies, Accessibility, and Social Value. Live domain untouched; no production PR.

## Closed 24 Nov — Accessibility approved page (COMPLETE)

On `bilal/revamp` as `88cbe32`, pushed with the 25 Nov footer consolidation. No preview deploy. Independent re-audit: **COMPLETE**. No instruction misses. The previous voluntary statement and mock-up banner are off `/accessibility`. Split hero, four cards, help panel, two-column work section, curved close. Both page buttons say Contact Us and go to `/contactus`. The header stays Discuss Your Project. Mosaic is the supplied 675×405 crop, byte-identical, shown at 840×504 on a 1440 desktop. `npx tsc --noEmit` passed. ESLint is clean on this page. `npm run build` succeeded. Live domain untouched; no production PR. Screenshots: `mockup-screenshots/accessibility-2026-11-24/`.

## Closed 24 Nov — Social value approved page (COMPLETE)

Pushed as `75df61c`. Preview: https://pixelette-marketing-website-n9ocunxqv-pixelette-technologies.vercel.app/social-value (READY). Independent re-audit: **COMPLETE**. No instruction misses. The previous honesty statement is off `/social-value`. Split hero, three cards, two columns, concave close. Mosaic is the supplied 1035×435 crop, byte-identical. At 1440 about 13px of page colour remains above and below the mosaic. Around 1024 the two-column hero letterboxes it by about 57px. The wave has two rises. Live domain untouched; no production PR. Screenshots: `mockup-screenshots/social-value-2026-11-24/`.

## Closed 24 Nov — Sectors overview (COMPLETE)

Pushed as `9903bdc`. Independent instruction audit: **COMPLETE** (no gaps). Preview: `https://pixelette-marketing-website-l3s2irmrr-pixelette-technologies.vercel.app/industries`. Live domain untouched; no production PR.

Allowed and recorded: the old explorer, Work in practice and the closing band are off `/industries`. The homepage “See the work” link goes to `/results`. The homepage teaser still says Industries; the Sectors instruction only renamed the nav and footer. The eight photographs stay the supplied 680×384 extracts. Specialist industry routes are unchanged. Nav says Sectors. The 25 Nov footer consolidation sets the Company label back to Industries. Both still link to `/industries`.

| Item | Resolution |
|---|---|
| **Page** | Editorial headline, staggered mosaic, blush connectors, detail panel. Technology and digital products on load, `1 of 8`. |
| **Interaction** | Hover and keyboard focus preview. Click and the arrows commit. Leaving a preview returns to the committed sector. Arrows wrap. Phone tap selects. |
| **Copy** | `sectors-content-v1.json`, verbatim. |
| **SEO** | Title Sectors. Canonical stays `/industries`. |

## Closed 23 Nov — Measurement & Insight approved design (COMPLETE)

Pushed as `510f14e`. Independent instruction audit: **COMPLETE** (no gaps). Preview: `https://pixelette-marketing-website-p914og4ey-pixelette-technologies.vercel.app/services/marketing_analytics_and_reporting`. Live domain untouched; no production PR.

Allowed and recorded: the chart uses the handoff’s local demonstration figures. `Paid Media +28% vs previous period` is the supplied example annotation on Understand performance. It is not calculated from the bars and it is not a client result. It does not appear on the other two views. FAQ questions are the approved set. Answers are existing Measurement sentences. Page buttons use a right arrow and sentence case. The shared header stays “Discuss Your Project”. Fully transparent pixels in the supplied collage held leftover headline colour; that colour was cleared so it does not paint. The visible collage is the supplied artwork.

| Item | Resolution |
|---|---|
| **Page structure** | Hero collage → three chart views → four capabilities → light close → four FAQs. The specialist stack is off this route. |
| **Hero** | Locked headline and supporting copy. Circular “A clearer picture” graphic kept. No dashboard in the hero. |
| **Chart** | Understand performance, Spot opportunities, Make smarter decisions. 30 days, 90 days, 12 months. Keyboard tabs and radios. A text alternative carries the figures. |
| **SEO** | Existing title, description and canonical kept. Route unchanged. |
| **FAQ** | The four approved questions. Native `details` accordion. |
| **CTA** | Page buttons go to `/contactus`. |

## Closed 23 Nov — Lead Generation locked design (COMPLETE)

Pushed as `5c8ce0d`. Independent instruction audit: **COMPLETE** (no gaps). Live domain untouched; no production PR. Screenshots: `mockup-screenshots/lead-generation-2026-11-23/`.

Allowed and recorded: the meta description now names audience acquisition and the four response types. The previous description promised a handoff to sales, which this page does not claim. Title, keywords and canonical stay. The measure line is a paragraph inside the offer, so the page does not gain a second results section. Page buttons use a right arrow, matching the other locked pages. FAQ answers stay inside the homepage's businesses and public-sector scope and the locked outcome types. They do not state a conversion rate, a client, or a guarantee.

| Item | Resolution |
|---|---|
| **Page structure** | Hero with triptych → three outcomes → one offer → measure line → light closing CTA → three FAQs. The old long template is off this route. |
| **Hero** | Locked headline, with `meaningful action` emphasised. Artwork is the supplied file, `object-fit: contain`, no crop. |
| **Outcomes** | Qualified enquiries, Applications, Participation. No numbers, no icons. |
| **Offer** | Four capabilities in rows. No cards, numbers, or icons. |
| **SEO** | Title `Lead Generation \| Pixelette Marketing`. Canonical `/services/lead_generation`. Description widened, as above. |
| **FAQ** | The three locked questions. Native `details` accordion. |
| **CTA** | Page buttons go to `/contactus`. |

## Closed 23 Nov — Paid Media & PPC locked design (COMPLETE)

Pushed as `8057281`. Independent instruction audit: **COMPLETE** (no gaps). Live domain untouched; no production PR. Screenshots: `mockup-screenshots/paid-media-ppc-2026-11-23/`.

Allowed and recorded: the measure notes Efficiency, Response, Spend and Improvement, plus the `01`–`04` and `01 / 02` indices, are on the approved mockup and not in the copy lock. They are labels, not results. The supplied abstract artwork is the Creative A background only. Below 900px the treatments switch instead of overlapping, with a visible Creative A / Creative B control. Page CTAs use locked sentence case while the shared header stays "Discuss Your Project".

| Item | Resolution |
|---|---|
| **Page structure** | Hero with two treatments → What we deliver → What we measure → light closing CTA → three FAQs. The old specialist stack is off this route. |
| **Hero** | Locked headline, with `not clicks` emphasised. Both treatments use `Great teams` / `Greater possibilities`. |
| **Interaction** | Creative A is featured on load. Selecting Creative B brings the coral treatment forward. Keyboard arrows move between them. Reduced motion drops the transition. |
| **Imagery** | Supplied abstract artwork on Creative A. Creative B is CSS. No laptop, phone, chart, or Higgsfield. The campaign is a hypothetical sample, not a client result. |
| **SEO** | Existing title, description and canonical kept. |
| **FAQ** | The three locked questions. Answers are shortened from the previous specialist page and do not promise a result. |
| **CTA** | Page buttons go to `/contactus`. "Explore the possibilities" is sample text and is not a link. |

## Closed 23 Nov — SEO, Content & AI Visibility locked design (COMPLETE)

Pushed as `c190220`. Independent instruction audit: **COMPLETE** (no gaps). Live domain untouched; no production PR. Screenshots: `mockup-screenshots/seo-ai-visibility-2026-11-23/`.

Allowed and recorded: the comparison is a CSS screen rather than the mockup's iMac; measurement hints stack under the labels; "Illustrative architecture" and "Illustrative framework" captions are visible; below 700px the comparison uses tabs and the disclaimer stays visible; the architecture sits beside the capability list only when the card is wide enough; page CTAs use locked sentence case while the shared header stays "Discuss Your Project".

| Item | Resolution |
|---|---|
| **Page structure** | Hero comparison → What we deliver beside What we measure → whole-system sequence → light closing CTA → three FAQs. The old specialist stack is off this route. |
| **Hero** | Locked headline and every word of the comparison, including the disclaimer. Source labels are text, not links. |
| **Interactions** | Desktop shows both panels, with hover and focus emphasis. A capability highlights its architecture connection. A measure row reveals a short definition with no figures. The four short measure lines are visible before a click. |
| **Imagery** | Original CSS and SVG. No handoff PNG, no laptop photograph, no Higgsfield. |
| **SEO** | Existing title, description and canonical kept. |
| **FAQ** | The three locked questions. Answers stay modest: no fixed ranking date and no guaranteed place in AI answers. |
| **CTA** | Page buttons go to `/contactus`. |

## Closed 23 Nov — Email Marketing locked design (COMPLETE)

Pushed as `dbad31d`. Independent instruction audit: **COMPLETE** (no gaps). Live domain untouched; no production PR. Screenshots: `mockup-screenshots/email-marketing-2026-11-23/`.

Allowed and recorded: autoplay omitted; page CTAs use locked sentence case while the shared header stays "Discuss Your Project"; attribution prints `CEO, WebBookingPro` (the stored role string has no space after the comma).

| Item | Resolution |
|---|---|
| **Page structure** | Hero with one upright email → What we deliver (2×2, no icons) → one measure line → WebBookingPro quotation → closing CTA → two FAQs. Legacy catalogue, BlockGuard and the old six FAQs are off this route. |
| **Stages** | Welcome, Nurture, Convert, Re-engage. Click and arrow keys swap sender subject, headline, body and CTA inside the same frame. Convert uses a target icon. Default is Welcome. |
| **Imagery** | Original CSS circles and the repository logo. No handoff PNG, no Higgsfield. |
| **SEO** | Existing title, description, keywords and canonical kept. |
| **CTA** | Page buttons go to `/contactus`. Illustrative email links go to `/blog-list` or `/contactus`. |

## Closed 23 Nov — PR & Earned Media locked design (COMPLETE)

Pushed as `7127aaa`. Independent instruction audit: **COMPLETE** (17 checks, no gaps). Preview: `https://pixelette-marketing-website-bol7fly48-pixelette-technologies.vercel.app/services/pr`. Live domain untouched; no production PR. Photographic strips remain an allowed limitation (see Pending).

| Item | Resolution |
|---|---|
| **Page structure** | Hero → What we deliver → What we measure → closing CTA → two FAQs. Specialist stack removed on this route. |
| **Hero** | Locked eyebrow, headline, lead, CTA; statement `One story. Different audiences. Clear messages.`; four text-only labels in order. |
| **Lower sections** | Four text columns, locked copy, no icons or cards. One measure line, no charts or figures. Plum/crimson close. |
| **FAQs** | Locked questions. Answers keep the existing non-guarantee: earned media is not guaranteed; measure conditions, not a pipeline. |
| **Imagery** | Original SVG/CSS panels. No handoff PNG embedded. No Higgsfield. |
| **SEO** | Specialist meta title and description preserved. |
| **Screenshots** | `mockup-screenshots/pr-earned-media-2026-11-23/` (desktop-1440, phone-390). |
| **Preview** | `https://pixelette-marketing-website-bol7fly48-pixelette-technologies.vercel.app/services/pr` (`7127aaa`). |

## Closed 20–23 Nov — Social & Community locked design (MOSTLY COMPLETE)

Pushed as `9f11958`. Independent instruction audit: **MOSTLY COMPLETE**. Preview: `https://pixelette-marketing-website-lxh1prjyv-pixelette-technologies.vercel.app`. Live domain untouched; no production PR. Rights blockers remain open (see Pending).

| Item | Resolution |
|---|---|
| **Page structure** | Hero → What we deliver → From content to community → What we measure → closing CTA. Specialist template retired on this route. |
| **Hero** | Locked H1/lead/CTA; Manchester campaign artwork; THE CITY WE SHARE + question + location; three responses + illustrative disclaimer as live HTML. |
| **Lower sections** | Four icon capabilities (no photo row); two-image showcase + four lines; six measure labels (no fake stats); plum/crimson close. |
| **Imagery** | User Manchester plate + people recovered from locked composite; showcase crops from approved lower mock. No Higgsfield / unapproved stock. |
| **SEO** | Meta title/description preserved. Removed on-route: earns-its-place, connections, how we work, what good looks like, FAQs — meaning kept in meta + deliver/measure copy. |
| **Screenshots** | `mockup-screenshots/social-community-2026-11-20/` (desktop-1440, tablet-768, phone-390). |
| **Preview** | `https://pixelette-marketing-website-lxh1prjyv-pixelette-technologies.vercel.app` (`9f11958`). |
| **Deviations kept open** | Commenter display names; softer people composite seam vs flattened mock; plum swoop lighter than reference. |

## Closed 20 Nov — Impact Compass visual correction

First Option 3 pass corrected as `4d08c39`, then gap-closed as `720e4d7` (star-rose intro, denser copy, filled selected tiles, pack shows selection). Questions, six dimensions, scoring, and localStorage progress unchanged. Screenshots: `mockup-screenshots/diagnostic-impact-compass-correction-2026-11-20/`. Preview: `https://pixelette-marketing-website-gl1n8iguh-pixelette-technologies.vercel.app`.

| Item | Resolution |
|---|---|
| **Sparse intro** | Min-height cut further; denser copy stack; coral Start CTA; diagonal dark visual field. |
| **Radar-looking intro** | Intro SVG is a dominant star-rose; scored radar polygon only on results. |
| **Weak tiles** | Larger filled answer cards; selected wash + signal border/check; pack includes selected state. |
| **Questionnaire shell** | Question + meta in dark header; connected stepper; wave into tiles; signal Continue. |
| **Results** | Larger radar, swoop ground, stronger cards; Discuss / Retake preserved. |

## Closed 20 Nov — Influencer & Partnerships approved design

Pushed as `8346312` (gap-closure on `edd4c12`). Instruction gaps **COMPLETE** after visual doubles / face blur / over-scrubbed close were closed. Imagery upgraded to the approved **4096×6144** master on `c0243d1` (layout/copy unchanged).

| Item | Resolution |
|---|---|
| **Page structure** | Hero → five What we deliver cards → closing CTA only. Specialist template retired on this route. No Approach / examples / case studies. |
| **Hero** | Dark left copy field + collage; annotation in collage only (not redrawn in HTML); one live CTA. |
| **Close** | Continuous band — camera CSS background + solid left wash; one live CTA; mock CTA excluded from crop. |
| **Imagery** | From the approved **4096×6144** mock (`*-4k.jpg` via `c0243d1`); card photos cropped above mock icon discs. No generated or unrelated stock. |
| **Screenshots** | `mockup-screenshots/influencer-partnerships-2026-11-20/` (desktop-1440, phone-390). |
| **Preview** | `https://pixelette-marketing-website-r47044m0h-pixelette-technologies.vercel.app/services/influencer_marketing` (`c0243d1`). |

## Closed 20 Nov — homepage presentation correction

Supersedes `d4d5815`. Original homepage graphics restored; What We Do stage media removed from the homepage. Instruction audit **COMPLETE** after screenshot pack refresh (`4959ff0`).

| Item | Resolution |
|---|---|
| **What We Do imports on homepage** | Removed five capability-stage bands, `CapabilityBand`, and `capabilityBandCopy`. |
| **Original visuals** | Post-its, maquette + name/cadence list, duck pond restored under the unchanged hero. |
| **Presentation** | Rectangular alternating image/copy panels with fade-and-slide entrance; reduced-motion safe. |
| **Screenshot pack** | `mockup-screenshots/homepage-correction-2026-11-20/` — desktop hero/activity/maquette/relevance + mobile activity/capabilities/relevance. |
| **What We Do page** | Untouched. |
| **Preview** | `https://pixelette-marketing-website-jo84q057u-pixelette-technologies.vercel.app` (`bcec022`). |

## Closed 20 Nov — Impact Compass diagnostic redesign

Pushed as `3ea31db`. Independent audit against the Option 3 instruction: **COMPLETE**.

| Item | Resolution |
|---|---|
| **Old narrative hero / bridge** | “Know where to compete / Know why you win” and Clarity Bridge removed. Intro is Impact Compass split layout. |
| **Questionnaire UX** | Clarity Rail replaced with selectable answer tiles; one question at a time; dimension progress + percent bar. |
| **Results dashboard** | SVG clarity compass from real scores, per-dimension list, three-focus Impact Roadmap, Discuss / Retake; no registration. |
| **Scoring / questions** | `strategyDiagnostic.ts` unchanged; same twelve questions and six dimensions. Preview: `https://pixelette-marketing-website-ijc20en7i-pixelette-technologies.vercel.app/strategy-positioning`. |
| **Homepage / other pages** | Untouched for this pass. |

## Superseded 20 Nov — homepage capability presentation (`d4d5815`)

Pushed as `d4d5815`, then **withdrawn by correction** the same day: imported What We Do stage media and five new service bands, which the Founder instruction did not ask for. See **Closed 20 Nov — homepage presentation correction** above.

## Closed 19 Nov — one-agency content and navigation

Pushed as `af38481`. Independent re-audit against the Founder instruction: **COMPLETE**.

| Item | Resolution |
|---|---|
| **Homepage proposition** | Two-markets line removed. H1 “Marketing and communications that deliver measurable impact”; one-approach band + Industries link; commercial-only rails softened. |
| **Navigation** | Public Sector top-level removed. CTA “Discuss Your Project”. Public-sector content via Industries / `/public-sector`. |
| **Public-sector hub and lines** | Defensive “where we are” / “conditions of entry” / “what we have not yet done” removed. Evaluation not the lead offer. Mock-up banners kept. How-to-buy honesty kept. |
| **CTAs and contact** | Exact replacements applied. Procurement block → “Supplier and procurement information”. `IMPROVE_OPTIONS` includes Public Engagement. Form consent / submit path unchanged. |
| **Leftover sweep** | Education explorer split closed; About “Objective focused”; specialist default CTA retitled; unused `publicSectorGroups` / `notYetDone` removed. |

## Closed 18 Nov — review §7 remainder (from PDF)

Source: `Pixelette_Marketing_Mockup_Review_v1.0_17Nov2026.pdf` §7. Items 7.1, 7.2, 7.4, 7.5 closed earlier the same day. Remainder pushed as `6c0b433`. Independent review 18–19 Nov against the PDF + owner decisions: **COMPLETE** (7.1–7.9 Pass).

| Item | Resolution |
|---|---|
| **7.3 Old capability filenames and anchors** | Stems in `public/services/capabilities/` and `capabilityStage.ts` renamed to current group names: `01-brand-and-strategy`, `02-creative-and-campaigns`, `03-communications-and-engagement`, `04-digital-visibility-and-growth`, `05-measurement-and-insight`. Anchor `#growth-intelligence-view` → `#measurement-and-insight-view`. Artwork unchanged. |
| **7.6 Homepage eyebrow** | **Kept** “Clarity. Momentum. Commercial impact.” (decision 18 Nov). |
| **7.7 CDP placeholder on how-to-buy** | Sentence added under “Who we are, for your records”: identifier will appear here when issued, and not before. Matches contact procurement pointer. |
| **7.8 Two commercial measures on public-sector pages** | **Kept** as written (decision 18 Nov): conversion to application; applications per pound spent; cost per person reached and per person who acted. |
| **7.9 Footer “Privacy choices”** | Already a `ManageCookies` button opening the cookie panel — not a dead label. No change. |

## Closed 18 Nov — lower-priority snags + crawler gate

| Item | Resolution |
|---|---|
| **Brand Logo 0–5 alt text** | Names read from the wordmarks: BlockGuard, Fusio, Digital Asset Vault, Big Innovation Centre, Fantasy Fusio, WebBooking Pro. Duplicate marquee group stays `alt=""`. |
| **“Strategy & Positioning” on `/services`** | Brand and Strategy featured link is now “The Diagnostic →” (same destination as the mega-menu). Diagnostic page wording unchanged. |
| **Homepage section numbers 02, 03, 05, 04** | Second market eyebrow → `04`; relevance → `05`. Visible order 02, 03, 04, 05. Sections not moved. |
| **“Quacking good at standing out”** | **Kept** by decision. |
| **Brief §2 — seven questions** | Answers refreshed in `mockup-screenshots/HANDBACK.md` to match the tree. |
| **Non-official host crawling** | Allowlist `www.pixelettemarketing.com` + `pixelettemarketing.com` only. Middleware: `X-Robots-Tag: noindex, nofollow` + `/robots.txt` `Disallow: /` on every other host (vercel.app, other subdomains, localhost). Host-aware HTML robots via `pageMetadata` / root `generateMetadata`. |
| **Vercel Deployment Protection** | Preview opens without a Vercel login (verified on the `bilal/revamp` deployment). Crawler block is code (`officialHost` allowlist), not the password wall. Project settings were not writable from this session’s Vercel credentials; leave protection off in the dashboard if it is ever re-enabled. |

## Closed 18 Nov — mock-up snag must-fixes + point 6

| Item | Resolution |
|---|---|
| **1. Mock-up banner missing on eight pages** | Banner on five Market B lines (`MarketBServicePage`), campaign evaluation, `/about/people`, `/accessibility`. Demos + Web3 already had it. |
| **2. Preview crawlable** | Middleware: all `*.vercel.app` → `X-Robots-Tag: noindex, nofollow`; preview `/robots.txt` → `Disallow: /`. |
| **3. Sitemap advertises dead production URLs** | `sitemap.ts` = 23 baseline production URLs only. New mock-up routes omitted + `index: false`. |
| **4. URL migration inside the mock-up** | Baseline URLs restored per brief §3; migrated paths redirect back. Single `/results` with hash anchors. |
| **5. Contact form / budget selector** | Form defaults to notice `1.0` + recorded consent sentence when env empty so the selector can be reviewed. |
| **6. Independent evaluation third way** | Heading **Two ways to buy it**; third bullet deleted. No replacement copy — returns when a named methodological specialist is appointed (plan §3 / corrected §10.2). |

Commit for must-fixes 1–5: `e6e6af2`. Point 6 and the named lower-priority pass: `2f648bc`, `7e8b5d8`. Review §7 remainder: `6c0b433`.

## Service Offer plan — status (17–18 Nov 2026)

Independent reviews against `Pixelette_Marketing_Service_Offer_And_Website_Plan_11Nov2026.pdf`: **MOSTLY COMPLETE**, then leadership snag list addressed as above. Live domain untouched.

### Still open — business / later phases (do not invent)

| Item | Notes |
|---|---|
| **VAT number** | `GB 432 2377 17` removed from `/privacy` and Organization schema — same number publishes on Pixelette Technologies’ site; repo comments flag uncertainty. **Needs management confirm** before republishing. |
| **Independent evaluation offer** | **Removed from the page 18 Nov.** Re-add only when a named methodological specialist is appointed. |
| **People bios / founder entry** | `/about/people` shell only (no placeholder names — review preferred that). Waits on wording, photos, consent. Banner on. |
| **Demonstration campaigns** | Shell at `/public-sector/demonstrations`, `noindex`, unlinked, banner on. Due in the plan by 6 February. |
| **Own-results pages** | `/results/our-own-*` not built; wait on SEOMate / MarketNerve baselines. |
| **WCAG audit** | Accessibility page states conformance not established (wording the review asked to keep). Banner on. |
| **Unpublished policies** | Safeguarding, EDI, environmental, modern slavery listed as not yet published on `/policies`. |
| **CDP supplier ID / RM6124 appointment** | How-to-buy now carries the placeholder sentence (identifier when issued, not before). RM6124 still “not yet appointed”. No real CDP ID until issued. |
| **Directory / LinkedIn / Clutch edits** | Out of code (§15). |
| **Mock-up shells return 200** | Demos + Web3 reachable if URL known; `noindex` and unlinked — accepted until real content. |

### Closed 16–17 Nov (was deferred / soft)

| Item | Resolution |
|---|---|
| **Empty plan-copy slots** | Filled from Service Offer PDF (hub, lines, evaluation, how-to-buy, contact, about blocks, industries, results sourcing). |
| **Procurement / FAQ overclaim** | Bullets match published vs not-yet; no held supplier identifier. |
| **Budget bands** | Through form → contract → email → `attribution` JSON. |
| **Results source/period** | Required on figures; BlockGuard uses management case study + “Period not yet recorded”; index statement allows that. |
| **Industries Work in practice** | Same provenance; links to `/results/[slug]`. |
| **Home / meta / schema / footer proposition** | Two-market umbrella; old “strategy, demand, search, pipeline…” trailers removed. |
| **Privacy effective date** | Was 23 Sep (before incorporation); now **Effective 8 October 2026**. |
| **Incorporation / company facts** | `company.ts`: 17508478, 8 Oct 2026, Fulham Palace Road, filed employees 3. |
| **Analytics → evaluation link** | Secondary CTA on marketing-analytics. |
| **Accessibility / social-value versions** | Last updated 17 November 2026 · Version 1.0. |
| **RM6124 English** | “We have not yet been appointed.” |
| **How-to-buy freshness** | “Thin trading history”; “talking to several” kept (confirmed true). |

## 12 Nov 2026 brief mock-up — scaffolding (16 Nov evening)

Independent developer-brief review then: **COMPLETE WITH ACCEPTED GAPS** (empty plan-copy slots). Those gaps were the Service Offer pass above.

### Blocking / flagged — closed 16 Nov evening (verified by independent review)

| Item | Resolution |
|---|---|
| **Homepage capability names layout** | `EditorialCopy` + `ul.capabilitiesNames` wrapped in `homeScene__copyStack` (single child of `__inner`); list width capped to the copy column. |
| **Analytics connection nodes** | “Performance needs optimisation” capability → Creative and Campaigns (brief table for Demand & Performance). |
| **SEO / PPC connection figures** | Full `connections.items` passed for those two routes so the conversion card stays; other specialist pages keep the self-group filter. |
| **`/blog-list` filters** | `INSIGHT_FILTERS`, editorial tags, and radar categories remapped with the brief §4.1 table; Market signals unchanged; empty Digital Visibility and Growth filter retained. |

Hand-back: `mockup-screenshots/HANDBACK.md`.

## Fixed in the 16 Nov evening closure (blocker + flags)

| | |
|---|---|
| **Homepage capability names** | Wrapped copy + list in `homeScene__copyStack`; list width capped to the copy column. |
| **Analytics duplicate node** | Demand card labelled Creative and Campaigns. |
| **SEO / PPC conversion card** | Full connection items on those two routes; other specialist pages keep the self-group filter. |
| **`/blog-list` filters** | Remapped with the brief §4.1 table; Market signals unchanged; empty Digital Visibility and Growth retained. |

## Fixed in the 16 Nov incomplete / blocker passes

| | |
|---|---|
| **What we do five columns** | Desktop mega-menu grid; Public sector stays flat. |
| **Mega-menu overflow** | Panel clamped into viewport on open (margin shift); verified 1280/1440. |
| **`IMPROVE_OPTIONS`** | Synced to PDF §4.1 five group names; tests updated. |
| **Analytics demo heading** | “The Measurement and Insight view”. |
| **Connection parents** | PR/analytics tags fixed; self-parent connection items filtered. |
| **Connection React keys** | `` `${capability}-${title}` `` — no duplicate-key console error on analytics. |
| **Industries journey keys** | Index keys; empty journeys skipped. |
| **FAQ JSON-LD** | Empty answers omitted from schema. |
| **Home document title** | Brief umbrella proposition. |
| **Contact incorporation slot** | Label shown; year blank while `incorporated` is null. |
| **Contact procurement slot** | Visible empty `ContactProcurementSlot`. |
| **`/services` stage leads** | `capabilityStage` statements cleared (earlier in session). |

## Fixed in the 13 Nov brief fix pass

| | |
|---|---|
| **Contact `indicativeBudget`** | UI select kept; omitted from POST. Contract test documents rejection if leaked. |
| **SecondMarketBand `tsc`** | `{null}` children on `Container`. |
| **`/services` stale framing** | `growthSystemData` bodies and scope lists cleared under new titles. |
| **Escape mega-menu reopen** | Ignore-next-focus after Escape; blur then focus trigger. |
| **About duplicate Group** | Empty “Part of Pixelette Group” removed from `AboutBriefBlocks`. |
| **Public sector drawer hub** | Hub row skipped when first item is already `/public-sector`. |
| **Demonstrations developer note** | Removed from visitor copy. |
| **Screenshot pack** | Recaptured full-page 1440/390 (see hand-back). |

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

~~**`CONTACT FORM TEMPORARILY UNAVAILABLE` on the home page.**~~ **Closed 18 Nov (must-fix 5).** Defaults to notice `1.0` + recorded consent when preview env is empty so the form and budget selector can be reviewed; API still refuses mail without server config. Historical line reference was `ContactUsForm.tsx` around the old gate.

**`.small` is 13px where the guide's is 14px.** Appendix E is "fixed, do not vary, and do not vary slightly". Left alone deliberately: it is a site-wide type change and belongs in its own commit with the user warned first.

## Found, logged, deliberately NOT fixed

These need new visible content or structural change, so they are out of scope. Raise separately.

**`TeamSection` ignores per-service testimonials.**
`services/[slug]/page.tsx` passes `mainHeading`, `subHeading` and `details` but drops `reviewsData.data`; `TeamSection` maps over the module-level `teamData` regardless. The same three cards render on every route. `servicesData[].review.data` holds per-service testimonials with `name`, `role`, `detail`, `image` that never appear. Fixing it puts **different testimonials on 8 service pages** — new visible content.

**`TeamCard` renders each name in an `h2`.**
Three `h2`s per section, a heading-hierarchy problem. Changing the level is a structural DOM change.

**Malformed markup in a content string.**
~~`/story/[id]` passes `` `let's <span> talk business <span/>` `` to `ContactSection` — note `<span/>` where `</span>` was meant.~~ **Obsolete:** `/story/[id]` was deleted 25 Sep 2026.

**`Navbar` desktop/mobile link asymmetry.**
The desktop bar has a Blogs link; the mobile drawer does not — it sits inside a commented-out block alongside the hidden Portfolio link. **Preserve this.** It is a content difference, not a styling one.

## Deliberately quarantined — leave alone

**`Importance.tsx` returns `null` on all 8 services.**
`importance.data` is `[]` for every service, under an explicit governance quarantine recorded in the component: the "billion dollar brands" cards used unlicensed public-figure photos and unsourced attributed quotes. It renders nothing today.

Do not convert it, do not delete it. Only detokenise the two raw hexes in `_importance.scss` so the token gate passes.

(It also renders `el.name` twice, in two `Heading` elements — dead code, not worth touching.)

**~~`/success_stories` and `/story/[id]` are `noindex`.~~ DELETED 25 Sep 2026.**
Those routes must 404. The route walk asserts `/success_stories` and `/story/1` return 404. Do not restore them.

**Five industry specialist pages are live but unlinked (14 Oct 2026).**
`/industries/web_3`, `/fintech`, `/tech`, `/saas`, `/ai` stay reachable for direct/legacy traffic and keep their own metadata, but they are not linked from nav, footer or `/industries`, and they are **omitted from the sitemap** until internal linking returns. Do not put them back in the sitemap without links.

**Sitewide Open Graph image is missing (14 Oct 2026).**
Metadata is otherwise standardised via `src/data/site.ts`. One share asset is still owed: `/public/og/default.png` at 1200×630, then wire it in `pageMetadata` and switch Twitter to `summary_large_image`. Social previews only — not an indexing blocker.

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
