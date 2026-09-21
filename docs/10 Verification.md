# 10 Verification

## The gates

Run before every commit, and all green at the merge:

| Gate | Command | Proves |
|---|---|---|
| Lint | `npm run lint:check` | no eslint errors |
| Colour | `npm run lint:legacy-tokens` | no hard-coded colours in `src/` |
| Types | `npx tsc --noEmit` | contracts hold |
| Tests | `npm run test:contact` | 36 pass — the governed form chain |
| Build | `npm run build` | compiles, pages prerender |
| Routes | `npm run route:walk` | 35/35 return 200, render an `<h1>`, hold the ground caps |

## What they prove — and what they do not

They prove **the right words are in the right structure**. They caught real
faults: a dead `industries/undefined` link, empty headings, a broken selector,
copy that should have been deleted.

They **cannot see**:

- Layout, spacing, rhythm, or whether anything looks right
- The mobile first viewport, which the brief names as a specific gate
- **The dropdown menus at all** — they only exist once JavaScript runs, so no
  automated check has ever rendered them

## A method note worth keeping

Twice, a check "passed" against a **stale server**. An orphaned `next start`
held port 3001, so `curl` was reading an older build while I believed I was
verifying new work. Both times the giveaway was a result that was *too* clean.

Kill by PID before restarting:

```
netstat -ano | grep ":3001" | grep LISTENING
taskkill //PID <pid> //F
```

Also: running `npm run build` while a dev server is up makes both fight over
`.next`, producing type errors in generated files that look like source errors.

## The first thing a browser found, 11 Sep

The Growth System cards on the dark band were `background: transparent` on a
hairline measuring roughly 1.8:1 against the gradient. **Every gate passed.**
The copy inside met its contrast floor, the ground caps held, the route
returned 200 and rendered its `h1`.

The card simply did not read as a card. A contrast gate measures glyph against
background; it cannot see that the container has gone missing.

This is the clearest evidence yet for what the gates are worth and what they
are not. Two further changes came out of the same look — the section CTA was
the quiet secondary control under five bright cards, and a tinted card base
was tried and rejected by eye. **None of the three were findable by any check
in this repo.**

## The scroll-on-navigation fault, 18 Sep

Reported by eye: pages sometimes opened scrolled to the section after the hero.
No gate could see it — it only exists in a browser, over time, between pages.

**Cause.** `_base.scss` set `scroll-behavior: smooth` on `*`. Next.js 16
stopped switching smooth scrolling off during its reset-to-top on a page change
unless `<html>` carries `data-scroll-behavior="smooth"` — its own upgrade
guide says so, and `disable-smooth-scroll.js` confirms it skips the override
without the attribute. So every link click became an animated scroll from the
previous page's position, and Next's reset, written assuming an instant jump,
measured the page before it had moved. Interrupted part-way, it landed below
the hero.

**Fix.** The attribute on `<html>`, smooth scrolling on the root only, and
`body { scroll-behavior: none }` removed — `none` is not a valid value and it
had never done anything. Confirmed fixed by eye.

**Not changed:** refresh and back/forward still restore the previous scroll
position. That is browser behaviour users expect. The dev server's own
auto-reloads during editing do the same, which can look like the fault.

## Audit against the brief

On 9 Sep the running site was checked block by block against every section of
the document. It found two genuine gaps, both since fixed: the form's "Start
here" eyebrow, and the closing section's "Talk to Pixelette Marketing" link.

Everything else in the document was present, in the document's order, including
every phrase it says to delete.

Related: [[08 Design system constraints]], [[09 Outstanding]]
