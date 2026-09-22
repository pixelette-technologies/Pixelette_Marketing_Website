# 03 Phase 1 — Homepage

The twelve sections the brief specifies, in its order. Verified against the
rendered page, not assumed.

| # | Section | Built from | Ground |
|---|---|---|---|
| 01 | Hero | `HomeHero` — headline kept, everything under it replaced | `.wash` |
| 02 | Proof | `TrustedBrands` — new stacked layout | dark 1/3 |
| 03 | Commercial outcomes | `GrowthSection` + `GrowthSystem` — see below | page, `.rule-cap` |
| 04 | Why Pixelette | `ItemsSection` | page |
| 05 | Growth System | `ItemsSection` — cards, thirds | dark 2/3 |
| 06 | AI and technology | `AiTechnologySection` — scroll-driven strip | page |
| 07 | Who we help | `DynamicMarket` — two groups | page |
| 08 | Results | `TeamSection` | `.band-alt` |
| 09 | Ways to work | `ItemsSection` — cards, per-card CTAs | page |
| 10 | How it works | `ItemsSection` — numbered steps | dark 3/3 |
| 11 | Wider Pixelette | `ItemsSection` | page |
| 12 | Final conversion | `ContactSection` | `.band-closing` |

## The structural changes, not just copy

**Nine service cards became five capabilities.** The eight service pages are
not deleted; they keep their URLs and nest under the capabilities in the nav.
Only the homepage stops selling a menu.

**The tool-logo wall is gone.** Fifteen marks, Jira twice, several
strengthening nothing. Replaced by the operating story. This freed a dark band.

**Sector and stage became two groups.** The old six-card taxonomy mixed them —
"Startup" is a stage sitting in a list of industries — and as one flat grid it
read as a client boundary. Four sectors above a hairline, three stages below.

**The process steps left the contact section.** They used to render beside the
form; the brief makes them their own section. `ContactSection` needed no prop
change — `data` was already optional — so this was a call-site deletion.

## A live bug fixed on the way

The old "Startup" card carried no route, so it rendered
`href="industries/undefined"`. Gone with the card.

## Copy

All homepage copy lives in **one file**, `src/data/home/homeContent.ts`, typed
against the component contracts so a shape mismatch fails the build. One file
because it is one management document — a reviewer checking wording opens one
file, not seven.

Everything in it is the brief's own words. The only prose I wrote anywhere is
the Lead Generation summary ([[07 Results and hub pages]]) and the `/results`
meta description.

## Deletions

`EngagementStalls`, `RangeOfMarket`, `engagementData`, `dynamicMarketData`, and
`growthStartsData` — the last already dead, and holding 300%, 2.5x, 40% and
120% with no source behind any of them. Exactly what the brief's metric gate
exists to stop.

Related: [[02 Decisions]], [[05 Components]], [[08 Design system constraints]]

## 21 Sep — section 06 is no longer an ItemsSection

The four descriptions and the closing line were removed on the user's
instruction, which left four bare headings — not the shape the shell exists for.
The names now run the full width of the page as a strip whose offset follows
the scroll. Six homepage sections still share `ItemsSection`; this one is
`AiTechnologySection` with its own `AiTechnologyContent` type. Full reasoning,
including why the static row is what ships in the HTML, in [[02 Decisions]].

## 22 Sep — section 03 is two components, and the figure is no longer a chart

The fourth figure to occupy this section's right-hand column, and the first
that is not a drawing of quantities. `GrowthDiagram` and `_growthDiagram.scss`
are deleted; `GrowthSystem` and `_growthSystem.scss` replace them.

**Why the split.** The four outcomes and the figure share a selection —
hovering an outcome lights its station on the ring, and selecting a station
lights the outcome — so they have to be one component. `GrowthSection` stays a
server component and **passes the eyebrow, heading and standfirst through as
children**: they have no state and no business shipping as client JavaScript.
That is the only reason the outer file still exists.

**The 2×2 grid is a numbered list.** The grid read down its columns, so the
framework's order lived in a comment and in a sentence restating it underneath.
The list states its own order; the sentence loses its first half. Full
reasoning in [[02 Decisions]].

**It is the home page's only stateful surface.** `/strategy-positioning` holds
the site's other one. Four tabs and one panel, no storage, nothing sent
anywhere.

Related: [[02 Decisions]], [[05 Components]], [[08 Design system constraints]],
[[10 Verification]]
