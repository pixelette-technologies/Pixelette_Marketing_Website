# Mock-up hand-back — 12 November 2026 developer brief

Local only. No production branch push. No live deploy.

Updated **13 November 2026** after the independent review (INCOMPLETE) and the must-fix pass.

## 1. Answers to §2

Updated **18 November 2026** to match the tree on `bilal/revamp`.

1. **Framework and hosting.** Next.js 16 (package `^16.3.0`), React 19, App Router under `src/app`. Hosted on Vercel; preview hosts are `*.vercel.app`. No `vercel.json` in the repo.
2. **Where content lives.** In the repository: TypeScript under `src/data` (home, services, public sector, strategy, company, contact), blogs under `src/data/blogs`, assistant KB at `src/content/pix-kb.json`. No CMS.
3. **How navigation is defined.** Top bar: `src/components/common/Navbar.tsx`. What we do / Public sector menus: `src/data/navigation.ts`. Capability regrouping: `src/data/services/capabilityGroups.ts` with titles from `src/data/home/homeContent.ts` (`growthSystemData`). Footer: `src/components/common/Footer.tsx` using `footerCapabilityGroups` from `navigation.ts`.
4. **How the sitemap is generated.** `src/app/sitemap.ts` at build time. Emits the **23 production baseline URLs** only (mock-up routes omitted). One `lastModified: new Date()` for every URL. Canonicals use `SITE_URL` (`https://www.pixelettemarketing.com`).
5. **Whether `/industries` can take child routes.** Yes. Legacy `src/app/industries/[slug]/page.tsx` still builds five specialist pages (live, unlinked, out of sitemap). Three brief routes sit as their own static pages beside that dynamic segment.
6. **What “Ask Pix M” is.** Site assistant in `src/agent/`, answers from in-repo KB (`src/content/pix-kb.json`), writes identify/lead to Supabase. Unmounted for this mock-up in `src/app/layout.tsx`. Code left in the repo.
7. **Capability grid fixed at five?** Homepage has no five-column grid. Section 03 shows a heading, illustration, and the five names from `capabilitiesCopy`. `/services` `CapabilityExplorer` maps whatever `capabilityGroups` supplies; count is data-driven and currently five. Stage media in `capabilityStage.ts` is still the five current assets.

## 2. Instructions that did not fit the codebase

- No rotating-words hero exists; `LivingSignal` was left untouched as required.
- Homepage has no capability grid to swap; names were listed under the existing section instead of inventing a grid.
- Incorporation date is not on file (`src/data/company.ts` has `incorporated: null`). Company number `17508478` was added on `/contactus`. No date was invented.
- Draft body copy named but not written in the PDF was left empty: second-market band, procurement replacement block, FAQ answer under the supplier-questionnaire question, indicative-budget options, About block bodies, results sourcing statement, public-sector page bodies, industry market blurbs, policies children.
- **Plan document.** The PDF names a plan document for body copy. That file is **not in this repository**, so named empty slots stay empty by rule — not a build failure.
- Footer Services column is the five group names with no invented group URLs (plain text).
- Brand logo strip still uses `Brand Logo 0`–`5` in `TrustedBrands.tsx`; the brief names the fault and does not supply the six names, so names were not invented.

## 3. Fix pass (13 Nov) — review must-fixes

| Item | Action |
|---|---|
| Contact `indicativeBudget` | Kept labelled empty select; omitted from `POST /api/contact` payload. Contract unchanged. Documented in `tests/contact-contract.test.ts`. |
| SecondMarketBand | `<Container className='main'>{null}</Container>` so `tsc` passes. |
| `/services` framing | Cleared `growthSystemData` bodies and scope lists under the new five titles (no invented overview). Later also cleared `capabilityStage` lead statements. |
| About duplicate Group | Removed empty “Part of Pixelette Group” from `AboutBriefBlocks`; kept “How the work is delivered” + People link. Existing `AboutGroup` covers the Group ask. |
| Public sector drawer | Omits separate hub row when the first menu item is already `/public-sector`. Desktop mega-menu stays the flat PDF list. |
| Escape mega-menu | Escape closes and ignores the next focus on the trigger so the panel does not reopen. |
| Demonstrations copy | Removed developer note from visitor-facing page; route, title, gated banner remain. |
| Screenshot pack | Recaptured full-page 1440 / 390 under `mockup-screenshots/` (later pack quality deferred — capture script needs scroll before full-page). |

## 3b. Fix pass (16 Nov) — remaining PDF incompletes

| Item | Action |
|---|---|
| What we do mega-menu columns | Desktop panel uses five columns (`dropdown-content--columns`); phone stays stacked. Public sector stays a flat list. |
| `IMPROVE_OPTIONS` | Synced to PDF §4.1 five group names; contact tests updated. `indicativeBudget` still omitted from POST. |
| Analytics framing | Demo heading → “The Measurement and Insight view”. |
| Contact incorporation date | Labelled slot shown; year left blank while `company.incorporated` is null. |
| Contact procurement | Visible empty slot (`ContactProcurementSlot`); no invented replacement copy. FAQ answer still empty. |

## 3c. Fix pass (16 Nov) — mega-menu overflow + flagged items

| Item | Action |
|---|---|
| Mega-menu overflow | Five-column panel clamped into the viewport on open (margin shift); verified no overflow at 1280 and 1440. |
| Connection parents | PR + analytics tags corrected; connection items that match the page’s own capability are filtered out. |
| Industries journey | Keys by index; empty journeys not rendered. |
| FAQ JSON-LD | Empty answers omitted from FAQPage schema; UI question kept. |
| Home document title | Uses the brief’s approved umbrella proposition. |

## 4. Inherited / deferred (flag only)

- Home hero support line and footer brand blurb still use pre-brief vocabulary — PDF supplies new H1 only; no replacement strings where the plan did not.
- Screenshot pack and menu responsiveness — deferred 18 Nov; reviewer will assess by eye.
- Review §7’s other five lower-priority items — still need `Pixelette_Marketing_Mockup_Review_v1.0_17Nov2026.pdf` (not in repo).

## 4b. Closed 18 Nov (lower-priority + crawlers)

- **Brand Logo alts** — names read from the wordmarks: BlockGuard, Fusio, Digital Asset Vault, Big Innovation Centre, Fantasy Fusio, WebBooking Pro.
- **Homepage section numbers** — visible order 02, 03, 04, 05 (second market was 05 ahead of relevance 04).
- **“Strategy & Positioning” on `/services`** — Brand and Strategy featured link is now “The Diagnostic →”.
- **“Quacking good at standing out”** — kept by decision.
- **Non-official hosts** — middleware + host-aware metadata noindex/Disallow every host except `www.pixelettemarketing.com` and `pixelettemarketing.com` (covers `*.vercel.app` and other subdomains). Deployment Protection turned off so management can open the preview without a Vercel login.

## 5. Inherited accessibility problems found (§7)

- `FormInput` labels use `htmlFor={field.name}` without a matching `id` on the input (pre-existing; noted in `FormSelect` comments).
- Mega-menus support Escape and focus open; other inherited keyboard/contrast issues in the library were not silently redesigned.
- `/accessibility` conformance claim is still that conformance is not established (wording kept).

## 6. Rough estimate split (later work)

Qualitative only — no hours were agreed in the brief.

| Work | Rough scale |
|---|---|
| This mock-up (local structure, nav, seventeen routes, gates, empty slots, Ask Pix M off, screenshot pack + 13 Nov fixes) | Done under this brief |
| URL migration (`/aboutus` → `/about`, underscore service paths, `/blog-list` → `/insights`, descriptive article slugs) + redirects, canonicals, sitemap, analytics plan | Medium–large (cross-cutting; analytics/SEO coordination) |
| `/results` restructure into an index | Small–medium (IA + templates; copy dependency) |
| Article slug work as part of URL migration | Medium (content inventory + redirects) |
| Filling empty PDF slots once plan / draft copy lands | Small–medium per surface; blocked on copy |

## Screenshot pack

Folders under `mockup-screenshots/`, one per route, files `desktop-1440.png` and `phone-390.png`. Full-page captures from the local dev server. Capture helper: `scripts/capture-mockup-screenshots.mjs` (single maintained script).

Dev-only note: Next.js reports CSP `eval()` warnings in development because `next.config.ts` CSP omits `unsafe-eval`. Production builds do not need that for React. Not a mock-up content fault.
