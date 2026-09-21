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

**Three times now**, a check "passed" against a **stale server**. An orphaned
`next start` held port 3001, so `curl` was reading an older build while I
believed I was verifying new work. The first two times the giveaway was a
result that was *too* clean.

The third was 21 Sep, on the section realignment. `route:walk` reported 35/35
against a process that had been listening since before the changes existed.
`scripts/route-walk.mjs` **does not start a server** — it walks whatever
answers on 3001 — so a green walk proves nothing at all unless the server was
started after the build. It now reads as the default outcome rather than as a
warning sign, which is worse than the first two times.

**Check the port before the walk, not after it.** If anything is listening,
kill it by PID and start a fresh `next start` from the build under test.

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

## Two figures that passed every gate and failed by eye, 21 Sep

The Growth section's collage was replaced, and it took three attempts. The
first two are the point of this entry: **both passed lint, the token gate,
types, all 36 contact tests, the build and 35/35 on the route walk, and both
were rejected within seconds of being looked at.**

**Attempt one — a stepped chain** with the four outcomes labelled along it.
Four faults, none of them visible to any check in this repo:

1. The four names were on screen twice, three hundred pixels apart — crimson
   headings in the grid, mono caps on the drawing.
2. A diagonal path leaves two empty triangles inside its own box. That is a
   property of the shape, not a spacing bug, and it is what read as
   unfinished.
3. The weights were inverted. The labels were heavier than the connectors they
   belonged to, so the graphic read as an afterthought around the words.
4. The word CONVERSION overlapped the riser to Revenue by about five units —
   a collision in the rendered output that nothing could see.

**Attempt two — an inward coil.** Clean, filled its box evenly, and said too
little. No gate in this repo has an opinion about whether a drawing means
anything.

**Attempt three — four columns, named on hover** — was accepted.

**The method that worked.** Four candidate graphs were built into the real
section at the real column width and compared in place. Two cheaper methods
had already failed:

- **Choosing from a written description.** The coil was picked from a
  description of it and rejected on sight.
- **A scratch comparison page.** Shapes that looked right on their own did not
  all survive the section around them.

Four throwaway variants built into the live component cost about twenty
minutes and settled in one look what two rounds of discussion had not.

## Audit against the brief

On 9 Sep the running site was checked block by block against every section of
the document. It found two genuine gaps, both since fixed: the form's "Start
here" eyebrow, and the closing section's "Talk to Pixelette Marketing" link.

Everything else in the document was present, in the document's order, including
every phrase it says to delete.

## 21 Sep — what the gates proved about the scroll strip, and what they cannot

Green: `tsc --noEmit`, `eslint`, `next build`, `route:walk` 35/35,
`lint:legacy-tokens` 0 findings. The rendered home page was fetched and checked
directly: three groups in the markup, copies 2 and 3 `aria-hidden`, all four
phrases present, and neither the four descriptions nor the closing line
anywhere in the HTML.

**None of that is the feature.** Every gate on this repo reads markup. The
thing that was asked for is motion, and motion has no server-side trace:

- The strip has never moved. `SPEED` at 0.35 and `EASE` at 0.12 are chosen
  numbers, not observed ones, and whether the drift reads as elegant or as a
  conveyor belt is a by-eye call nobody has made.
- **The wrap has never been watched.** The whole no-`gap` argument exists to
  make the seam invisible, and a seam is exactly the kind of fault that is
  obvious in one second of scrolling and invisible to every check above.
- The hydration swap from wrapped row to strip has never been watched either.
  It is reasoned to be below the fold on every viewport; that is a calculation.
- The static fallback has never been rendered. Turning JS off, or setting a
  reduce preference, is a thirty-second check that has not been done.
- `--fs-h2` on four phrases at full page width has never been seen at any
  viewport. The line could be far larger in practice than it reads as a number.

This is the same gap the vault has recorded since 9 Sep: the gates prove the
page is structurally sound and prove nothing about how it looks. The one time
a section was actually opened in a browser it produced a fault no gate had
caught. See [[09 Outstanding]].

Related: [[08 Design system constraints]], [[09 Outstanding]]
