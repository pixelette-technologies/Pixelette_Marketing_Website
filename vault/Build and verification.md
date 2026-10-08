# Build and verification

Commands, gates, and the environment hazards that will otherwise cost an afternoon.

## Commands

```
npm run dev              next dev
npm run build            next build
npm run lint:check       eslint, read-only        ← added for the conversion
npm run lint             eslint --fix, MUTATES    ← never use as a gate
npm run compare:palette  node scripts/build-palette-compare.mjs
npm run test:contact     node --test tests/*.test.ts
npx tsc --noEmit         type check
```

Node v25.0.0, sass 1.83.4, next 16.3.0, eslint 9.39.5.

## Baselines recorded 1 Sep 2026, before any conversion code

| Gate | State |
|---|---|
| `npx tsc --noEmit` | **Silent** |
| `npm run lint:check` | **Exit 0, zero errors, zero warnings** |
| `npm run test:contact` | **30 pass, 0 fail** |

These are the numbers to hold. Any new warning is one you added.

**Re-run after the rem rebase (`87d123e`) — all four still hold**, plus `npx sass src/scss/main.scss` compiles clean and the compiled root emits `html { font-size: 100% }` with none of the three old overrides surviving. The rebase itself was audited separately: every rem literal in the 68 changed files was compared against its pre-rebase value and all 928 satisfy `new = old × 0.625`, with the single count difference being the `_heading.scss` `em` → `rem` fix. **None of it has been looked at in a browser.**

> The lint baseline could not be taken until `eslint.config.mjs` was cleaned — the config had been failing to load since 11 August. See [[Security incident 2026-08-11]].

## The check that is not a gate, and matters more than the gates

```
curl -s http://localhost:3001/ | grep -o 'class="[^"]*"' | sort | uniq -c | sort -rn
```

**Read the rendered `class` attributes before believing any stylesheet applies.** Every expensive fault in this conversion was invisible to the gate set and would have been caught in one request by this:

| Fault | What the gates said |
|---|---|
| `Heading`/`Text` renaming every class, so the whole Appendix E layer was unreachable | all green |
| 35 structural selectors written against `h1` where `Heading` emits `h2` | all green |
| The palette comparison rendering no component CSS for three weeks | exit 0 |
| `.btn_secondry-full` defined with nothing that distinguishes it | all green |
| `.hero` reaching the DOM as `heading_hero` | all green |

Grepping the JSX proves what was **passed**. Only the response proves what was **emitted**. When counting, use `grep -o … | wc -l` for occurrences — `grep -c` counts matching *lines* and silently undercounts any line carrying two matches.

One caveat: a Next.js App Router response embeds the RSC flight payload alongside the markup, so naive counts come out roughly doubled. Match on rendered markup (`<div class="icon-wrapper">`) rather than the bare class name, or you will chase a duplication bug that is not there.

## Gates and how they differ from the playbook

| Gate | Note |
|---|---|
| Type check | As written. |
| Lint | `npm run lint` runs `eslint --fix` and rewrites the working tree, so it cannot serve as a gate. `lint:check` was added for this. |
| Full build | **Weak signal here.** No route uses `generateStaticParams`, so a production build does not pre-render the 50 dynamic pages and there is nothing to count against the route table. |
| Route walk | **Built: `npm run route:walk`.** Discovers routes from `/sitemap.xml`, adds `/success_stories` and the `/story/[id]` ids scraped from it (both are deliberately absent from the sitemap as noindex content), then asserts 200 and a rendered `<h1>` on each. Takes an optional base URL; defaults to `:3001`. Currently 34/34. |
| Token gate | **Built: `npm run lint:legacy-tokens`.** Appendix B's script with the glob extended to `.scss`, `.ts`, `.tsx` and `.css`. Every exemption carries its reason in the file. Mutation-tested. Currently clean. |
| Palette regression | **Inverted and live.** `npm run compare:palette` reads the tokens back out of `_tokens.scss` and exits non-zero on an introduced contrast failure, on drift from the approved values, or on a gated token the stylesheet no longer defines. Mutation-tested. A token added to the brand layer must be added to `TOKEN_OF` in the script or it goes unwatched. |
| Contract tests | 3 suites covering contact delivery. Keep green; do not touch them. |

### Token gate exemptions, each with a stated reason

- `src/scss/globels/_tokens.scss` — defines the tokens in the first place
- `src/assets/common/Logo.tsx`, `LogoBlack.tsx` — the wordmark is the colour authority
- the email colour constant in `app/api/contact/route.ts` — HTML email cannot read custom properties

**Keep the matcher dumb.** It does not parse comments, so a provenance note that writes a retired value with a hash trips the gate on its own documentation. Convention: write such notes bare — `was B3063C`, no hash. `build-palette-compare.mjs` already follows this.

## Route inventory — CORRECTED

8 static: `/`, `/aboutus`, `/contactus`, `/services`, `/industries`, `/blog-list`, `/success_stories`, `/cookie-policy`.

4 dynamic templates rendering **26** pages: `services/[slug]` (8), `industries/[slug]` (5), **`blog/[id]` (3)**, `story/[id]` (10). **34 routes in total, not 58.**

> **The audit said 27 blogs and 50 dynamic pages. That was wrong.** `blogsData` is one category whose `data` array holds three posts; the 27 came from counting the nested `dataContent` section ids inside each post as if they were post ids. `/blog/4` returns 404. Found by the route walk, which discovers routes from `/sitemap.xml` rather than trusting a hand count — which is exactly why it discovers them.

Plus route handlers: `api/contact`, `robots.ts`, `sitemap.ts`.

## Structured data non-regression

There is **no `src/components/seo/`** — JSON-LD is inline in `layout.tsx` and five page files. Diff the emitting code, not rendered output:

```
git diff -- src/app/layout.tsx src/app/sitemap.ts src/app/robots.ts \
  src/app/services/page.tsx src/app/industries/page.tsx \
  "src/app/services/[slug]/page.tsx" "src/app/industries/[slug]/page.tsx" \
  "src/app/blog/[id]/page.tsx" "src/app/story/[id]/page.tsx"     # expect no output
```

Every `export const metadata` must keep emitting exactly what it emits today, including the `robots: { index: false }` on `/success_stories` and `/story/[id]`.

## The D4/D5 run — 1 September 2026

All gates re-run after every commit and all green at the end. Numbers moved as follows.

| | Before | After |
|---|---|---|
| `@media` blocks | 248 | **25** |
| Distinct media-query breakpoints outside `Importance` | 60 | **1 — 767px** |
| `bg_*` / `color_*` call sites | 150 | **0** |
| `color.$*` references | 36 | **0** |
| Inline `style={{…}}` | 36 | **33** |

`_color.scss` is deleted. Every colour resolves through a custom property.

**The token gate gained a pattern.** Its named-colour rule only matched CSS value position — after a colon, or after `solid` — so `fill='white'` and `stroke='white'` in the hand-written SVG components walked past it for the whole conversion. Eleven instances across eight files, all missed by D1's pass over the icon set. Verified by mutation: a planted `fill='white'` fails the gate and names the file. **A matcher written for CSS will not see JSX attributes.**

**The structured-data check was re-run at the end of the run** with `git diff 636659d..HEAD` over the nine emitting files. No metadata or JSON-LD line changed. The only diff in any of those files is one `className` on `/blog/[id]`.

## Assertions worth grepping

Measured 1 September 2026, after `c9cf171` — the end of the D4/D5 run. Ticked ones are done and should stay done.

| Assertion | Target | Now | |
|---|---|---|---|
| `data-aos` remaining | 0 | **0** | ✅ |
| `respond()` call sites | 0 | **0** | ✅ mixin deleted |
| `aos` in `package.json` | absent | **absent** | ✅ also out of the lockfile |
| `framer-motion` importers | exactly 4 | **4** | ✅ drawer, two dropdowns, article TOC |
| Client components | below 23 | **18** | ✅ |
| `#B3063C` outside the two logos | none | **none** | ✅ |
| Hard-coded colour anywhere | none | **none** | ✅ enforced by `lint:legacy-tokens` |
| `@media` blocks | down from 282 | **25** | ✅ 14 are the quarantined `Importance` |
| Distinct breakpoints outside `Importance` | few | **1 — 767px** | ✅ down from 69 |
| `bg_*` / `color_*` call sites | 0 | **0** | ✅ the utility layer is deleted |
| `color.$*` references | 0 | **0** | ✅ `_color.scss` deleted in `c9cf171` |
| Dead heading selectors | 0 | **0 where touched** | ✅ 24 partials repaired; see [[Rules]] |
| Click-only controls | 0 | **0** | ✅ four rebuilt as buttons |
| Inline `style={{…}}` blocks | 0 | **33** | ◐ mostly page files and the two carousels |
| Tokens in the built CSS chunk | present | **present** | ✅ verified against the served chunk |

The built stylesheet is a hashed chunk in an unexpected directory — find it from the page's HTML rather than assuming a path. The recipe is in "Environment hazards" below.

## The browser walk — not optional, and not doable from a terminal

**A clean build is not visual sign-off.** Every terminal gate can pass on a conversion nobody has looked at. That is the standing failure mode of this programme. Say plainly in status reports what has and has not been seen in a browser.

Walk all 8 static routes plus one instance of each of the 4 dynamic templates, at **1440px and 390px** — the two widths the guide is drawn at, and the endpoints the clamps interpolate between, so both should land exactly on spec.

Check: each page against its guide counterpart at both widths · the signature device at both widths · keyboard only (visible focus on every control, the drawer, dropdowns, the rebuilt accordion, form submission) · reduced motion switched on at OS level and **observed running**, not merely present in code · touch behaviour · error states · one real form submission per form, to see the resulting email rendered.

Fixes arising from the walk go in follow-up commits on top of the conversion commits, which stay legible as the baseline.

**Nothing has been walked yet — including everything the D4/D5 run changed.**

The user DID open the site on 1 September, before that run, and rejected it: *"not at all good"*, specifics to follow. What they saw was carrying three invisible headings, nine contrast failures, 750px of dead panel on the home page and a hero with 220px of empty gutter beside its heading. All of that is fixed, so **the state they rejected is not the state that is there now.** Their specifics are still the priority when they arrive, but it is worth their looking again first.

Add to the walk, because these are what the run changed most:

- Every heading — 24 partials had dead heading rules and now have live ones, so spacing and colour move on nearly every page.
- The four interior heroes, which had no hero ground at all until this run.
- Every dark band: five of them joined the panel family, including three flat crimson ones Phase A had missed.
- The home page top to bottom — hero, EngagementStalls, DynamicMarket all rebuilt.
- Keyboard only through the four rebuilt controls: the process tabs, the blog category dropdown, the article table of contents, and ArrowCard's "View More".
- The service heroes' button pair, which used to be two identical filled buttons.

## Environment hazards

### Never run a production build while the dev server is up

Cost a full debugging session on the Certified conversion. Symptom: a stylesheet edit is correct on disk and correct in the diff, but the browser shows the old value — and restarting the dev server, emptying the cache and hard reloading change nothing, because none of them touch the cause. A concurrent build can pin the dev server to bundler chunks it will not regenerate. That is a frozen module, not a stale browser.

Diagnose in order: confirm the source, then fetch what the server actually serves — request the page, extract the stylesheet chunk URL from the HTML, fetch that chunk directly. If source and served disagree, touch the stylesheet, request again, check whether the chunk's mtime moves. If it does not, the watcher is dead.

Fix: kill every node process belonging to *this* project (identify by command line so you do not kill the user's other projects; there are usually three), delete `.next`, restart. A restart alone is not enough — the cache is on disk.

### Build environment variables

A production build may need env vars not in the working tree, because page-data collection executes API route modules. Compilation and type checking pass without them; the build dies later. `.env.example` lists what is needed: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CONTACT_ALLOWED_ORIGINS`, `CONTACT_PRIVACY_NOTICE_VERSION`, `MARKETING_CONTACT_STORE_DIR`, `MARKETING_CONTACT_RATE_LIMIT_SECRET`, plus the three `NEXT_PUBLIC_CONTACT_*` values. Some clients validate key shape at construction, so dummy values must look plausible. The dev server needs none of this for visual work.

### Shell quoting

**This bit during this session.** An apostrophe inside a heredoc terminated the shell quoting and failed with an unexpected end-of-file error. For any file containing prose, use a dedicated write tool rather than a heredoc. Also: **Python is not on the PATH** on this machine — `python` opens the Microsoft Store shim. Use node for text surgery.

### Gate scripts must be Node, not shell

npm runs scripts through the platform shell, and a POSIX one-liner fails on Windows with an unhelpful error about `!` not being recognised. Both gate scripts are plain `.mjs`. Also note `import.meta.url` yields `/D:/...` on Windows, so strip the leading slash — `build-palette-compare.mjs` already does.
