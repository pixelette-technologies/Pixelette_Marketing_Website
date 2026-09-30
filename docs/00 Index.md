# Pixelette Marketing — website vault

Entry point. Read this first.

This vault records the **website replacement work of 8–9 September 2026**: what
was built, what was decided, and what is still open. It replaces the earlier
`vault/` directory, which no longer exists on disk.

## Start here

- [[01 The brief]] — the governing document and its authority
- [[02 Decisions]] — every judgement call, with its reasoning
- [[09 Outstanding]] — what is still open, and who owns it

## The work

- [[03 Phase 1 — Homepage]] — the twelve sections
- [[04 Phase 2 — Navigation and footer]]
- [[05 Components]] — PointItem and ItemsSection
- [[06 The enquiry form]] — the governed contract change
- [[07 Results and hub pages]]

## How it is kept honest

- [[08 Design system constraints]] — the rules the code enforces on itself
- [[10 Verification]] — what the gates prove, and what they cannot

## Status as of 29 Sep 2026

Merged to `main` and pushed on 9 Sep: 19 commits, `e68c016..c583c4e`.

**11 Sep — management answered the 9 Sep questions**, and what they cleared is
built, committed and pushed: `c583c4e..4872c96`, three commits. The three
engagement descriptions in management's own words, the BlockGuard and
WebBookingPro case studies on `/results`, one claim for the client logo strip
across all three call sites, and the first UI fix made from an actual rendered
page. All six gates green. See [[09 Outstanding]].

**18 Sep** — the footer rebuilt to the Pixelette Technologies structure, the
cookie policy page taken onto the design system, the form's privacy link in the
brand tone, and a scroll-on-navigation fault found by eye and fixed. See
[[02 Decisions]] and [[10 Verification]].

**21 Sep** — the Growth section's stock collage replaced by a drawn figure —
three attempts, two of them rejected by eye after passing every gate — and the
two sections beneath it realigned: the Growth System's cards no longer
change width between rows, and "Why Pixelette" now reads as the argument for
the offer rather than as its peer. `ItemsSection` gained a `header` prop and
the thirds grid moved from flex to auto-fit. See [[02 Decisions]],
[[05 Components]], [[08 Design system constraints]] and [[10 Verification]].

**22 Sep** — the About page rebuilt to a separate instruction: nine sections
down to six, the invented team section removed outright, the industries grid
taken off, and the logo strip kept under a weaker claim than the home page's.
It is also **the first page on this site to be looked at whole**, at 1440px
and at 390px, and looking at it produced three faults every gate had passed.
See [[02 Decisions]], [[08 Design system constraints]], [[09 Outstanding]] and
[[10 Verification]].

**22 Sep, same day** — `/services` and `/industries` restructured and the
five sector pages taken off their unsubstantiated claims. Eight service boxes
became five capabilities, "Industries We Serve" became "Who we help", and
**fifteen unsourced performance figures** came off the sector pages — which
the site was publishing while barring BlockGuard's real, management-supplied
numbers from the home page. Competitor sector pages were read in full to
settle how it should be written. See [[02 Decisions]],
[[07 Results and hub pages]], [[08 Design system constraints]],
[[09 Outstanding]] and [[10 Verification]].

**22 Sep, third change of the day** — `/strategy-positioning`, the Strategy &
Positioning Diagnostic, built to its own instruction. A new route, linked from
`/services` and from nowhere else, whose centrepiece is a six-question
instrument that reads back the visitor's own answers and names the earliest
unresolved layer. It reverses the 11 Sep withdrawal that Strategy & Positioning
gets no page; **the nav entry was not added**, because the page was asked for
and the nav entry was not. (Superseded later the same day — see the fourth
change below.) It is **the first page here built with a browser in
the loop from the start**, and looking at it produced seven faults after all
six gates were green. See [[02 Decisions]], [[05 Components]],
[[08 Design system constraints]], [[09 Outstanding]] and [[10 Verification]].

**22 Sep, later the same day — that page was rebuilt to a definitive
specification** that superseded the instruction above. Seven sections now: the
six dimensions introduced as a wave, a six-stage methodology on a spine, a
**twelve-question diagnostic scoring 0–100** across four bands with six
dimension scales and three recommendations drawn from the visitor's own
lowest-scoring areas, what a full engagement produces, an illustrative
framework, a closing call to action and a four-question FAQ.

The scoring lives in `src/lib/strategyDiagnostic.ts` and is covered by **41
assertions including every band boundary**, then checked again through the
browser so the unit numbers and the rendered numbers had to agree. Answers
persist in localStorage — reversing the earlier no-storage decision, on
instruction — and nothing is sent anywhere. Looking at it produced four more
faults, one of which was **the cookie banner printing across the results**.
See the same five notes.

**22 Sep, fourth change of the day** — the What We Do dropdown was made to be
`/services` rather than a second copy of it. The menu held its own mapping,
four capability labels and eight routes typed out beside the five the hub
renders, and the two had drifted: **the hub showed five capabilities and the
menu showed four.** `whatWeDoGroups` is derived from `capabilityGroups` now, so
the menu is that page by construction. This **supersedes the 11 Sep instruction
that Strategy & Positioning takes no nav entry** — asked for directly, against
the hub's own five labels. It is also **the first time the dropdowns have been
rendered at all**, which item 1 below had listed as never done. See
[[04 Phase 2 — Navigation and footer]] and [[09 Outstanding]].

**22 Sep, the blog and the footer** — two posts written and published to
`blogsData.ts`, filling the Tech and AI gap the existing three leave: one on
being quotable to an AI rather than merely rankable, one on five checks before
increasing spend, ordered as the five capabilities. Both carry third-party
evidence only. Their banners were drawn first, rejected as patterns that said
nothing about the article, and replaced with photographs. The footer lost its
Who We Help column, What We Do became Services, and Strategy & Positioning
gained its first footer link — **which leaves the five sector pages with no
site-wide internal links**. See [[02 Decisions]], [[09 Outstanding]] and
[[10 Verification]].

**Two sessions worked in this repo at once on 22 Sep, and it cost three
things**: a page that returned 500 while neither session's change was wrong on
its own, a `git mv` swept into another session's commit so HEAD carried the
wrong image under the right filename for two commits, and a set of vault edits
committed under someone else's message. The rule that came out of it is in
[[10 Verification]]: with a second session in the repo, nothing may sit
staged — and unstaged is no safer, because a commit run with `-a` takes that
too.

**22 Sep, fifth change of the day** — `/strategy-positioning` cut from seven
sections to three, on instruction. The six-dimension wave moved out of the hero
and into the dark band, replacing the six-stage spine that was there; what a
full engagement produces, the illustrative framework, the closing call to
action and the FAQ were all removed. **The page now has no call to action for a
visitor who does not take the diagnostic** — that was the closing section's
job — which is the top item in [[09 Outstanding]].

The move exposed a bug that had shipped and had already survived a screenshot
review: **the wave's circles were its path's mirror image below 768px**, caught
by comparing the two formulae rather than by looking. The figure also gained a
hover ripple, which is the site's **fifth motion surface and its first on
hover**, against a rule `_surfaces.scss` states outright — so it is registered
there as an exception rather than left looking like an oversight. Trailing full
stops came off every heading on the page, restoring the 21 Sep rule this page
had been the only thing breaking. See [[02 Decisions]], [[05 Components]],
[[08 Design system constraints]], [[09 Outstanding]] and [[10 Verification]].

**22 Sep, sixth change of the day — the home page's growth figure, for the
fourth time.** The four ascending columns came off and a ring replaced them:
four stations, each arc carrying what one stage hands the next, a dashed return
arc labelled `optimise`, and a panel in the middle showing what the selected
stage takes in and hands on. The four outcomes beside it are a numbered list
rather than a 2×2 grid, and the two are linked — hovering either side lights
the other.

**Why the columns had to go is the part worth keeping.** Four named columns at
four heights is a quantitative shape, so on a page under a standing bar on
unqualified proof figures it had been stripped of axis, tick, gridline and
value. All of that was correct, and what was left was a chart that reads as a
measurement, carries no measurement and can never be allowed to carry one. **It
was boring because it had been hollowed out to stay honest.** The copy already
contained a better shape: every outcome names an input and an output, and the
last ends "and optimise accordingly", which is a return path into the first.

Looking at it produced **three more faults after all six gates were green**,
one of which made the figure illegible at 768px — HTML sized in `rem` layered
over an svg sized in viewBox units, which agree at the width somebody happened
to measure and nowhere else. The fix is the stylesheet's first container query.
The same commit also **un-broke `main`**: a `git rm` left staged here had been
swept into the other session's commit, leaving HEAD with a stylesheet that
could not compile. See [[02 Decisions]], [[03 Phase 1 — Homepage]],
[[05 Components]], [[08 Design system constraints]], [[09 Outstanding]] and
[[10 Verification]].

**23 Sep — the mobile navigation, rebuilt to the Pixelette Technologies
drawer.** Asked for by name, with their preview as the reference; the reference
was read in a browser first — panel opened, sections expanded, markup and
computed styles taken off the live DOM — before a line was written. It is
`<details>`/`<summary>` with **no JavaScript state**: the groups share a `name`,
which is HTML's own exclusive-disclosure mechanism, so one open section closes
the others with no code, and `<summary>` is keyboard-operable for free where the
old `<figure onClick>` could not be focused at all.

**It also closes the oldest live fault on the list.** The bar was still on at
768px because the drawer only took over at 767. The instruction was to adopt the
reference's 860 — and that would have **moved the break rather than fixed it**:
this bar has an intrinsic minimum of 898px and overflowed by 37px at 861. Theirs
fits at 860 because their bar is 677px where ours is 838. Measured across nine
widths and settled at 960. The lesson is in [[10 Verification]]: *a value taken
from a reference is a claim about the reference, not about us.* See also
[[02 Decisions]], [[04 Phase 2 — Navigation and footer]] and [[09 Outstanding]].

**23 Sep, the home page growth figure for the fifth time — rebuilt to a
supplied design.** The four stations are cards now: an icon badge, the stage
name and a one-line summary apiece, a fixed *Commercial impact* medallion where
the swapping panel was, gradient arcs with arrowheads between them and a dashed
return path carrying its own annotation.

**The tablist went with it, and so did the client boundary.** Attempt 4 kept
its real content — what each stage takes in and hands on — behind a pointer, so
a reader saw a quarter of it at a time. Everything is on screen at once now,
the hover pairing between the numbered list and the ring is `:has()` in the
stylesheet, and **the component ships no JavaScript at all**.

The reference is drawn on a 1760px canvas against our 1160px container, so a
fork went back and the instruction was to keep the composition and give up the
size. That put the figure at 62% of the reference with type at 10px — until
**the four tethered questions were removed, also on instruction**, which turned
out to be the constraint holding everything small. The ring went 343px to
537px and nothing on the figure is below 11px now. What it costs is that the
cards restate the list beside them; the ring survives on what its *shape* says.

**Six gates green before the first screenshot, then six faults from looking**,
two of which only a measurement could find: cards sitting 3.6px over the
medallion because a badge gives a card two centres, and four tethers that had
detached and stacked at the top of the figure, visible as one stray dot. The
arrowheads were invisible twice, for opposite reasons — too small, then drawn
underneath a badge. See [[02 Decisions]], [[03 Phase 1 — Homepage]],
[[05 Components]], [[08 Design system constraints]], [[09 Outstanding]] and
[[10 Verification]].

**It also cost the other session in this repo a working dev server.** An
in-place `perl -0pi` rewrite unlinks and recreates; the watcher caught the
stylesheet in the gap and **Turbopack wrote the resolution failure into its
on-disk cache**, so every restart replayed a 500 about a file that was present
and readable. Clearing `.next/dev/cache` fixed it. Three distinct costs of two
sessions in one repo now. See [[10 Verification]].

**23 Sep, the home page's Who we help section — rebuilt to a supplied design,
and it reverses the 21 Sep rebuild.** The typographic field of eleven markets
is gone from the home page. Nine cards in a 3×3 grid replace it: a tinted icon
chip, a sector name and a one-line scope apiece, with art bleeding in from each
card's right edge. A mono note in the head's rail carries the thesis. Below a
hairline, the three growth stages now open under their own eyebrow with their
own standfirst and a crimson call to action.

**The September argument against cards was narrower than it read.** 21 Sep
retired four *technology* sector cards because four boxed, equal, linked
sectors assert a client boundary while the standfirst underneath argues the
opposite — and that is still true of those four. Nine cards spanning
technology, money, health, retail, property, services, education and industry,
closed by a ninth that says the list is not the limit, make the opposite claim
with the layout instead of against it. Nothing links; a card is a statement of
range, not a door.

**The token gate reversed a design decision, correctly.** The design tints each
chip a different hue, and the intent was to scope those eight pairs to the
component the way `_reveal.scss` scopes its timing. `lint:legacy-tokens` fails
the build on a hex literal anywhere in `src/`, and a scoped palette it cannot
see is the precise thing it exists to prevent — so the site's palette grew by
sixteen tokens on `:root`, with the rule that keeps them from spreading written
beside them instead of enforced by scope. See [[08 Design system constraints]].

**The photography does not exist and the cards do not pretend otherwise.** Each
card takes an optional `image`; with none set, the same masked window renders a
tone gradient rather than a grey box, so the grid is presentable now and gains
its art by filling in one field. All nine are unset today. See
[[09 Outstanding]].

**`/industries` was deliberately left alone**, so `markets`, `beyond` and
`positioning` are still live and `.marketField` still ships — dead on the home
page, load-bearing on the hub. The section's copy is the design's verbatim,
which **also changed the hub's standfirst**, since both read the same `lead`.

Five gates green — `tsc`, `eslint`, the token gate, `sass` and `next build` —
and **the section has not been looked at in a browser**, which on this repo has
never once been a neutral fact. One fault did come out of re-running the gates:
a comment written to explain a token substitution contained the hex literal it
was explaining, and the gate is deliberately blind to comments. See
[[02 Decisions]], [[03 Phase 1 — Homepage]], [[05 Components]],
[[08 Design system constraints]], [[09 Outstanding]] and [[10 Verification]].

**23 Sep, later — the Who We Help section was walked** (1440, 900, 390 and
a numeric sweep at eight widths) and no fault was found, the first section to
manage it. See [[10 Verification]].

**23 Sep, last — one positioning, site-wide.** Built to a consolidated brief
on positioning, Who We Help and consistency. The eight home-page sectors are now
**the site's only sector taxonomy**, in `src/data/industries/whoWeHelp.ts`,
read by the home page, `/industries` and the Who We Help menu. The home section
became a compact preview: eight cards four across, "Explore who we help", no
"And beyond" card. `/industries` was rebuilt in the brief's order: hero, the
eight, "Don't see your sector?", **deeper experience** (the five specialist
pages on a dark band, linked), then business stage. The menu's "Selected
sector experience" became "Deeper experience".

Also in the same pass: the home page lost "More than marketing activity",
which restated sections 03, 05 and 06. The logo strip makes the About page's
**ecosystem claim** everywhere, including the eight service pages, which said
"Trusted by / Leading Brands". About renders the **five capabilities** instead
of a second, four-area model. Service pages stopped rendering their
**unsourced statistics blocks**, dropped "Startup" from their industry cards
and lost their superlatives. Sector pages lost five track-record sentences.
**`/privacy` exists**, adapted on instruction from the Pixelette Technologies
statement, and the form links to it as a route. A copy QA fixed roughly two
hundred defects.

Gates all green, route walk 39/39, and every changed page was looked at in
headless Chrome at 1440, 900 and 390. Looking produced three faults: the
deeper-experience band was first on `.band-alt`, which is the page ground to
the digit, so it separated nothing; the "Don't see your sector?" hairline
stopped at 44rem; and "technology-" broke at its hyphen in eight service
headings. All three fixed. **What needs a human is at the foot of
[[09 Outstanding]].**

**24 Sep — "Tools we work in" on `/services`.** The old home page's tool
marquee returned as fourteen names, grouped by job, inside Growth Intelligence —
not on the home page, not as logos, and worded to claim no partnership. PyTorch
and Jira left out, GA4 added. **The list is unconfirmed by management.** See
[[02 Decisions]] and [[09 Outstanding]].

**24 Sep — the old site audited against the new.** Fifty findings, each
quoting both sites and linking both URLs, in a private artifact linked from
[[02 Decisions]]. The pitch changed more than the pages: every old URL still
resolves. The old site is carrying live faults the rebuild fixes, including an
internal design note published on its contact page.

**25 Sep — the audit's verdicts, built and shipped.** The consent sentence was
fixed on Vercel. `/success_stories` and `/story/[id]` were deleted. The home
page's length was **approved as is**. Community management is named in Demand
& Performance again, and the tool band is back on `/services`. Pushed
`8101ead..41d8a3b`; confirmed live on Vercel. What the audit still recommends —
a testimonial, a pricing promise, a team, a founding year, an office card —
waits on management in [[09 Outstanding]]. Also that day: a dev server
returning 404 on every route, traced to a stale Turbopack cache, not the code.
See [[10 Verification]].

**25 Sep — superseded: the tools are a logo band now.** On instruction, the
list became a dark band on the client-logo device — the old white marks,
scrolling — between the five capabilities and the call to action on
`/services`. Same fourteen, same wording rule, still unconfirmed. See
[[02 Decisions]].

**25 Sep, last — the final correction pass.** Built to a management brief of
the same name. The five deeper-experience pages were rebuilt on one
architecture (hero, what marketing has to solve, where Pixelette can help,
the five capabilities, the four process stages, evidence only where real,
FAQ, "Tell us what needs to grow."), on components the site already had. The
contact page was rewritten (Understand, Diagnose, Recommend, Start; no NDA
claim; no free call). **The tool band came off `/services` again** — no
verified list exists, and the brief's rule is that an absent stack beats an
incomplete one. The blog became Insights with seven categories. The service
pages lost their 24 unverifiable "research" percentages, every "free
consultation" and calendar promise, and "Book a consultation – it's on us!".
Unknown sector and service slugs 404 now. All gates green, route walk 28/28,
every changed page looked at in headless Chrome. See [[02 Decisions]],
[[09 Outstanding]] and [[10 Verification]].

**25 Sep, evening — reviewed against the brief, then shipped.** A second read
of the brief, section by section, found nine things the pass had missed or
only half done, all fixed before anything was committed: the unverifiable
service figures were hidden rather than deleted; service meta descriptions
still said "1st consultation is on us! 🤙🏼"; hype copy ("unlock", "industry
leader", "Supercharge") was still live; related-article labels disagreed with
the new Insights categories; **the consent checkbox blocked a submit without
saying why**; and the form states, the mobile menu, all eight service pages,
768px and the site's metadata had not been tested. A final run of 159 checks
against the rendered HTML of all 28 routes passed. **Committed and pushed on
instruction, `41d8a3b..ee628e2`, and live on Vercel about 30 seconds later**,
confirmed on the deployed URL. See [[10 Verification]].

**28 Sep — a creative redesign built, shipped, stopped and rolled back, all
in one day.** A management brief ("Creative Transformation") asked for the
home page to be redesigned as a more dynamic experience. It was built —
a growth-engine hero, BlockGuard proof directly under it, a capability ring,
a scroll-lit Demand → Revenue journey, a dark AI chapter, Industries renamed
and rebuilt, Results out of the nav — audited twice against the brief, and
pushed live (`abc9477`, notes `b487cf3`).

**The same day management stopped it as the wrong creative direction**: it
had read "dynamic" as animated diagrams, dashboard visuals and excessive
information architecture, and it opened on BlockGuard. On instruction,
**`main` was restored to `ee628e2`'s tree** as a new commit (`06bb8fe`, no
history rewritten), pushed, and confirmed live on Vercel within a minute.
Nothing is lost: the whole redesign is on `backup/main-before-restore-2026-09-28`
(on GitHub) and on the local `archive/creative-redesign-2026-09-28` branch and
tag. This note and the 25 Sep "shipped" note were re-applied on top.

**The direction is now locked as "Intelligent Editorial"** — commercial
intelligence, made visually compelling — and the work goes **section by
section, with approval between each**. Phase 1A, the hero only, is built on
a local branch and **waiting for visual approval; it is not merged and not
live.** See [[02 Decisions]], [[09 Outstanding]] and [[10 Verification]].

**28 Sep, later — the hero's figure, three drawings in an afternoon.** The
Phase 1A brief came back as a full written instruction, and what the branch
already held matched it. Looked at against the brief's own seven tests, the
figure failed three: five single hairlines meeting at a point read as a
starburst, the still frame was too thin to carry half the screen, and the
field was uniform scatter. Redrawn as bundles of threads (`0ad8f31`).

**Then the user supplied the concept image they had meant all along**, and
made it the absolute reference for form, in brand colours rather than its
own. A gap analysis came first — the build was a sparse pen drawing where the
image is a dense, lit, full-frame illustration — and the figure was rebuilt
to it (`3906c3a`): two wings and a warm central band converging on a lit
point at the right edge, about 5,000 points, a haze, framing arcs, and **the
image's two label groups, added on instruction against the brief's "do not
label the visual"**, to be judged on review.

**Last, on instruction: larger, smoother, a richer pointer.** The figure grew
from 480×514 to 536×584 by reaching into the column gap, so the headline did
not shrink; the motion eases in and out now and glides where it stepped; the
pointer moves three depth layers and carries a soft crimson light across the
threads. **This last round is uncommitted in the worktree and was stopped
before its final checks** — see [[09 Outstanding]]. Still awaiting approval;
not merged, not live. See [[02 Decisions]] and [[10 Verification]].

**28–29 Sep — home sections 01–04, built to a locked specification.** A new
local branch, `feat/home-sections-01-04`, cut from `main` and worked in this
repo only. Against an approved reference image, the hero was rebuilt (the
Living Signal in the image's own blue, violet, pink and orange, with "From
insight to impact") and three sections were added beneath it: falling
Post-its (02), a toy-brick scene with builders (03, the calm one) and a duck
pond with one pink duck (04). All the illustration is SVG drawn to supplied
reference photographs, on instruction, so it can be judged against real
assets. Each band fills the screen below the sticky header. On arrival the
notes fall and the ducks drop onto the water one by one, on real gravity and
a damped buoyant bob, with perspective-flattened splash rings. Committed on
the branch; **not pushed, not live.** Later the same day the
ducks became a looping photographic video, which settled the pink duck's
colour and, for 04, the vector-or-real question; the bricks' is still open. See [[02 Decisions]],
[[09 Outstanding]] and [[10 Verification]].

**29 Sep, later — section 02's Post-its fall in a loop, and A clearer path is
lit.** On instruction: every word note now falls from above the band to
below it, 16s a pass, slow enough to read, in fixed lanes so no word is ever
covered — measured across a full pass at seven widths. A clearer path stays
still, and its words cycle through the hero figure's five colours, lit with a
glow rather than inked. The first spacing passed a box-overlap check and was
still unreadable to the user, which is why the check now measures the words.
Committed on the branch; not pushed, not live. See [[02 Decisions]],
[[09 Outstanding]] and [[10 Verification]].

**29 Sep, later — section 03's builders climb and jump, in the hero's
palette.** On instruction: the bricks, the shirts and the floor bricks take
the Living Signal's five colours in the signal's own order, so 01 and 03 read
as one palette. The far-right builder is now a Black woman and the one second
from right an Asian woman with brown skin. When the section arrives the two
ladder builders climb in rung by rung; under the pointer a ladder builder
climbs one rung and a builder on top jumps. "One commercial objective" is in
the brand tone, like 02's and 04's last lines. Committed on the branch
(`a872913`); not pushed, not live. See [[02 Decisions]], [[09 Outstanding]]
and [[10 Verification]].

**29 Sep, later — the hero figure answers the pointer; the rail labels go.**
On instruction, an enhancement and not a redesign: at rest the Living Signal
is unchanged. Near it, a magnet bends the lines and points towards the
pointer (below the figure the wings are drawn down, above it up); on it, the
lines glow and the orange signals multiply and run at ~19× with lit tails,
light at speed into the point; the points near the pointer glow and are
pulled in with real physics (mass, spring, softened inverse-square pull, one
overshoot home). The canvas now bleeds past the figure so bent lines are not
cut. The small stacked rail labels on 02–04 were removed. Committed on the
branch (`9148b86`); not pushed, not live. **Not yet seen on a real GPU.** See
[[02 Decisions]], [[09 Outstanding]] and [[10 Verification]].

**29 Sep, later — the information architecture locked.** Built to a management "Master structure correction": the nav is What we do / Industries / About / Insights / Contact; Who we help became Industries; Results left the nav but `/results` stays live; the home page stops after a compact Industries teaser, a compact Proof before promises, AI-accelerated, Part of Pixelette and the close; `/industries` is four chapters (hero, an eight-industry selector with one stage, Work in practice, close); `/services` owns the service lists, with community management and growth restored. Committed on the branch (`4a6534f`); not pushed, not live. Gated before the commit in a separate worktree; **the committed state was not re-gated**, on instruction — that is for a separate session. See [[02 Decisions]] and [[09 Outstanding]].

**29 Sep, later — the hero's lines become strings.** The pointer effect read
as "an image stretching": one smooth field moved every point together. Now
every line is its own physical string (16 masses pinned at the lit point,
tethered, joined by tension) with its own mass, ring and damping, pulled by
the pointer node by node, so near strings swing and far ones barely move, and
a quick pass plucks them. The points ride their strings. At rest, unchanged
to the pixel. Committed on the branch (`e5d7b93`); not pushed, not live.
**Not yet seen on a real GPU.** See [[02 Decisions]] and [[10 Verification]].

**30 Sep — the four Demand & Performance specialist pages.**
`/services/social_media_marketing`, `ads_ppc`, `influencer_marketing` and
`pr` are rebuilt to their final brief as Social & Community, Paid Media & PPC,
Influencer & Partnerships and PR & Earned Media.
- The URLs are unchanged.
- One shared `SpecialistServicePage` renders them, and the Search & Authority
  and Growth Intelligence pages are built on the same system.
- There is no imagery and no proof section; "What good looks like" stands in
  until real evidence exists.
- The footer labels changed with the nav, which needs sign-off.

See [[02 Decisions]], [[09 Outstanding]] and [[10 Verification]].

**30 Sep, later — Marketing Analytics & Measurement (Growth Intelligence).**
The analytics route keeps its slug (`/services/marketing_analytics_and_reporting`)
and takes the name "Marketing Analytics & Measurement" everywhere it is shown.
It renders through the shared specialist system and carries the family's one
deliberate visual exception: an interactive, **illustrative** Growth
Intelligence view (Growth / Efficiency / Pipeline) plus a compact preview in the
hero, both from one data file. Seen in headless Chrome at 1440 and 390; **not
at 768, not on a real phone**. See [[02 Decisions]] and [[09 Outstanding]].

Two things are still true and worth repeating anywhere this is read:

1. **Almost nothing has been viewed in a browser.** The Growth System band —
   walked again on 23 Sep across nine widths for the rebuilt figure, and it
   produced six more faults after six green gates — the whole of the About page and the
   whole of `/strategy-positioning` have been seen; **each look, every time,
   immediately produced faults no gate had caught.** That band alone has now
   done it four times running. Every other page and breakpoint is still
   structural-only. The What We Do dropdown has been rendered at both widths
   and the whole mobile drawer was walked across nine on 23 Sep, which leaves
   the desktop Who We Help panel as the one menu never opened. The 21 Sep
   realignment is made entirely of computed measurements and adds to this debt
   rather than settling any of it. ~~**And the navigation is broken at 768px on
   all 36 routes.**~~ **That one is closed** — 23 Sep, `45e1ca2`, by the drawer
   rebuild, which had to move the breakpoint anyway. See [[10 Verification]].
   **25 Sep moved this a long way but did not close it.** Every main route —
   21, including all eight service pages — was *measured* in headless Chrome
   at 1440, 768 and 390 (no overflow, one h1, no image without alt), and the
   desktop Who We Help panel was opened for the first time, so no menu is
   unseen now. The five sector pages, `/contactus`, `/services`, Insights and
   one service page were also *looked at*, and looking found one fault the
   measurements had passed. Measured is not seen: the home page, About,
   `/strategy-positioning`, `/results` and seven of the eight service pages
   have not been looked at whole since their last change.
2. ~~**The form's privacy-notice link is broken in production.**~~ Fixed in
   code on 23 Sep: `/privacy` exists and the link is a route, not an env var.
   Its controller line needs legal review. See [[09 Outstanding]].
