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

## A pattern is not evidence — 22 Sep 2026

The sector pages carried **fifteen unsourced performance claims**. Finding all
fifteen took three passes, and the first two failed in ways worth keeping.

**Pass one said thirteen.** The regex bounded the text after the number at 110
characters, and one card's sentence ran longer, so it never matched. The count
was reported as complete. **The user found the missing one by eye**, in a
screenshot, after being told there were none left.

**Pass two missed a fifteenth.** Re-run unbounded, it found the one that had
been missed — and still could not see `"doubling conversion rates"`, because
that claim contains no digits at all and every pattern so far had looked for
digits.

**Pass three read all fifteen card texts in full** and found it in seconds.

The lesson is not "write a better regex". It is that **a grep proves presence,
never absence**: a pattern that finds nothing has told you about the pattern,
not about the file. Where the set is small enough to read — fifteen sentences —
read it. Where a count is going to be reported as complete, the method has to
be one that could have failed loudly, and a grep returning zero fails silently
every time.

This sits alongside the stale-server note above as the second way a check on
this site has produced a confident wrong answer.

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

## 22 Sep — the About page, and the first page read end to end at two widths

The rebuild is recorded in [[02 Decisions]]. What matters here is the method,
because this is the **first page on the site to be looked at whole**, at
desktop and at a phone width, rather than checked as markup.

**Green before the commit:** `eslint`, `tsc --noEmit`, `lint:legacy-tokens`
(0 findings), `test:contact` 36/36, `route:walk` 35/35, and the caps on the
page itself — one `<h1>`, two `.band-dark`, one `.rule-cap`.

**`next build` was NOT run, and that is a real gap.** Three other work streams
have uncommitted files in this tree — the home page, the contact page and a
scroll marquee — and a build compiles their in-flight state as well as this
page's. It would also fight the running dev server over `.next`, which this
note already warns about. So the route walk above ran against a **dev server**,
not a production one. Per the stale-server rule it was confirmed live rather
than assumed: the page was re-fetched after each edit and each time carried the
change that had just been made.

### What looking at it found — three faults, all invisible to every gate

1. **The signature cap was an orphan.** `.rule-cap` sat on a full-width rule at
   the top of the identity section with the two statement rules 90px below it.
   Three hairlines inside a hundred pixels, and the marking segment landed on
   the faintest of the three, reading as a red dash floating above the content.
   The section rule went; the cap moved onto the first statement's own rule.
2. **A `max-width: 16ch` on the capability names** forced a wrap into tracks
   wide enough to hold them — two of four broke at 1440px where only one had
   to, and every name broke on a phone. `.h3` already carries
   `text-wrap: balance`, so the cap was simply wrong.
3. **`.band-alt` was a no-op.** `_base.scss` gives the body `--color-band`
   already, so the wrapper on the principles section declared a ground change
   that does not happen. **This is not local to About** — see
   [[08 Design system constraints]].

A fourth was a spacing call rather than a fault: the principles name column
went 14rem to 18rem because *Commercially focused* was the only one of four
that wrapped, which made its row half again as tall as its neighbours.

### The method, since it is cheaper than it sounds

Chrome is already on this machine. `--headless=new --screenshot` renders a page
without installing anything, and a fifty-line script driving the same binary
over the DevTools protocol sets an exact viewport and captures beyond the fold.
Both are throwaway; neither is in the repo.

**Two things to know before trusting a screenshot of this site:**

- **`--window-size` alone does not set the layout viewport.** The first mobile
  capture was a 390px-wide crop of a page laid out far wider, which looks
  exactly like horizontal overflow and is not. Use
  `Emulation.setDeviceMetricsOverride` and read `Page.getLayoutMetrics` back —
  content width 390 against a 390 viewport is the actual proof that nothing
  overflows.
- **ScrollReveal hides everything below the fold**, so a full-page capture of a
  short viewport shows blank bands where the unrevealed sections are. It reads
  as missing content. Set the emulated viewport to the whole page height and
  the observer fires for every block.

### What is still unverified on this page

Hover and focus states, the dropdown menus (as everywhere), the reveal in
motion, real devices as opposed to an emulated viewport, and the page under a
production build.


## 21 Sep — verifying a commit that is only part of the tree

Two sessions were working in this repo at once, and `homeContent.ts` ended up
holding three authors' work: the Who we help rebuild, a punctuation pass, and
the other session's move of the AI section out of `ItemsSection`, which
retyped `aiTechnologyData` in the same file. Committing Who we help alone
would have left the committed `page.tsx` passing that data to `ItemsSection`,
so the commit had to carry work nobody had asked for a review of.

**The gates could not see the problem, because the gates run on the working
tree.** Everything passed — types, lint, the token gate, the build, 35/35
routes — while the thing actually being committed was a subset that had never
been compiled by anything.

**What settled it was checking the subset out as its own tree.** A worktree at
HEAD, the candidate file set copied in, and tsc, the token gate and sass run
there. Two notes for the next person who does this:

- `next build` will NOT run in a worktree whose `node_modules` is a junction.
  Turbopack rejects a symlink pointing outside the project root and panics.
  Sass was run directly against `main.scss` instead, which is the part of the
  build a missing partial would break.
- Remove the junction with `cmd //c rmdir`, never `rm -rf`, which follows it
  and would take the real `node_modules` with it.

**It caught one.** The first attempt omitted
`src/scss/component/ui/home/_index.scss`, so the new AI section's stylesheet
was never forwarded and not one of its rules reached the output. **Sass did
not error.** A partial nobody forwards is not a failure, it is simply absent,
so this would have shipped as a section with no styles and nothing in any log
to say so. The check that found it is grepping the compiled CSS for one class
from each new partial.

**The rule worth keeping:** when a commit is a subset of a dirty tree, the
working tree passing its gates proves nothing about the commit. Check the
subset out and run the gates against that.

Related: [[08 Design system constraints]], [[09 Outstanding]]

## 22 Sep — the first page built with a browser in the loop

`/strategy-positioning` was looked at while it was being built rather than
after, at 1440px, 768px and 390px, and the instrument was DRIVEN — Chrome over
the DevTools protocol, clicking through all six questions to the reading, and
again picking the top statement six times to reach the other branch.

**All six gates were green before the first screenshot.** tsc, eslint, the
token gate, sass, the build and 36/36 on the route walk. Looking at it then
produced **six faults**, none of which any gate could see:

| Fault | What it looked like |
|---|---|
| `.rule-cap` floating on nothing | The section opened directly under the dark band, so the 40px marking segment had no light hairline to cap and rendered as a loose crimson dash under a black band. Same fault the About page's cap was moved for. |
| "YOUR READING" printed twice | The result panel's eyebrow and the readout's label sat on the same baseline, 700px apart, saying the same three words. |
| The disabled "Next" unreadable | `.btn:disabled` is `--color-page` text on `--color-line-strong`, roughly 1.5:1. Fine for a submit button greying out for a second; this is the first control on the page and it is in that state before anybody touches it. |
| "Growth priorities" broke in two | The fixed 10rem name column wrapped lens 06 and left its row taller than the five above it. |
| The method rows did not line up on a phone | The summary wrapped to the gutter while the name above it stayed indented by the numeral column — two halves of one row starting at different x. |
| "01 / 06" alone in the gap | The counter is pushed to the end of its row, so it sat 115px right of the options it labels, in the space between the two columns. |

A seventh was found at 768px after the first five were fixed: the readout sat
320px wide under 690px of options and left the right half of the panel empty.

**Every one of these is a layout or a colour or a duplicate word.** That is the
category the gates are blind to, stated three times in this file already and
now demonstrated on a page where the looking was not optional.

### What the fixes cost, and what they are worth reading for

- The signal cap moved to `.card-feature` on the panel — the device's second
  and last sanctioned form, already in use on the services template. The page
  now carries **zero** `.rule-cap` and one card cap, which is within the rule:
  one mannerism, and the cap is three per route rather than one required.
- The disabled button takes a **local** treatment — transparent, line-strong
  edge, muted text — scoped to `.diagnostic__actions`. The shared
  `.btn:disabled` the enquiry form depends on is untouched. That shared rule is
  still 1.5:1 everywhere else it is used and is worth raising as a group-layer
  question rather than forking further.
- The two-column fold is one rule for both layouts, on a **100-to-1 grow
  ratio**: flex-grow is shared within a line, so side by side the question
  column takes 100/101 of the spare width and the readout keeps its 20rem,
  while stacked the readout is alone on its line and takes all of it. Zero
  breakpoints, which is the constraint it had to be solved inside.

### What is still unseen on this page

- **Keyboard focus was never observed.** The radios are real inputs and pick up
  the global `:focus-visible` ring, and the ring was not driven and photographed
  — programmatic `.focus()` does not match `:focus-visible`, so the screenshots
  could not show it.
- **Hover was never observed** on the option rows, the readout jump buttons or
  the featured link on `/services`.
- **The readout's revisit buttons were never clicked.** They appear only once
  all six lenses are answered; the state was reached and photographed, the
  buttons were not pressed.
- **No real browser, no real device.** Everything above is headless Chrome at
  three widths. No Safari, no iOS, no touch.

### A site-wide fault this found, and did not fix

**The navigation breaks at 768px on every page.** "What We Do" and "Who We
Help" wrap to three lines and the "Build my growth plan" button runs off the
right edge. Checked on `/aboutus` to confirm it predates this work. It is the
navbar, so it is on all 36 routes, and nobody has seen it before because
nobody had looked at this site at tablet width.

Related: [[02 Decisions]], [[08 Design system constraints]], [[09 Outstanding]]


## 22 Sep — a subset commit when the shared index is not yours

The 21 Sep entry above says that when a commit is a subset of a dirty tree,
the working tree passing its gates proves nothing about the commit. This adds
the failure mode one step earlier, in the index rather than the gates.

**Three sessions were in this repo at once.** Preparing the company-identity
commit, `git status` was read twice a few minutes apart. The second read
showed the strategy page's entire change — 25 files, about 2035 lines —
**staged in the shared index**, with `HEAD` unmoved. `git commit` at that
moment would have committed all of it under this commit's message. The index
is one file shared by every session in the working copy; it is not private to
whoever staged last.

Two things follow, and the second is the less obvious one:

- **`git add` then `git commit` is a race.** Anything another session stages
  between the two lands in the commit. `git commit --only -- <paths>` closes
  it: it commits those paths from the working tree and ignores the index
  entirely, so it cannot matter what else is staged or when.
- **Do NOT route around it with a private index.** `GIT_INDEX_FILE` plus
  `commit-tree` and `update-ref` looks like the careful answer and is the
  dangerous one. It moves the branch while the other session's index still
  holds a snapshot taken against the OLD `HEAD`; their next `git commit` then
  writes that stale tree on top and **silently reverts** the files you just
  committed, because for those paths their index still holds the pre-commit
  content. Keeping the shared index in step with `HEAD`, which ordinary
  `commit`/`commit --only` does, is what makes coexistence safe.

The same reasoning rules out `git reset`, `git stash` and `git checkout --`
while another session is working: each of them edits state that is not yours.

**What to do instead is wait.** A staged index means somebody is mid-commit.
Theirs landed as `6ec1eeb` while the subset worktree was being set up, the
index cleared itself, and the commit went in afterwards against a tree whose
only other dirty files belonged to a third session and were left alone.

**The subset check itself found nothing this time**, which is worth recording
as much as the time it did. HEAD plus five files as a detached worktree; tsc,
eslint, the token gate and sass all green, and `.legal--identity` present in
the compiled CSS. The change added no new partial, which is the one thing that
check exists to catch, so a clean result was the expected result. The junction
came off with `cmd //c rmdir` before `git worktree remove` ran, since that
command removes the tree with the recursive delete the 21 Sep entry warns
about.

Related: [[02 Decisions]], [[09 Outstanding]]
