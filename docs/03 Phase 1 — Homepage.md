# 03 Phase 1 — Homepage

The twelve sections the brief specifies, in its order. Verified against the
rendered page, not assumed.

| # | Section | Built from | Ground |
|---|---|---|---|
| 01 | Hero | `HomeHero` — headline kept, everything under it replaced | `.wash` |
| 02 | Proof | `TrustedBrands` — new stacked layout | dark 1/3 |
| 03 | Commercial outcomes | `GrowthSection` — relabelled | page, `.rule-cap` |
| 04 | Why Pixelette | `ItemsSection` | page |
| 05 | Growth System | `ItemsSection` — cards, thirds | dark 2/3 |
| 06 | AI and technology | `ItemsSection` — replaced the tool wall | page |
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
