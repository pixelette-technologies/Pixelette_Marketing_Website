# 04 Phase 2 — Navigation and footer

## Navigation

`Home | What We Do | Who We Help | Results | Insights | About | Contact`, plus
the primary button "Build my growth plan" — the same label as the hero, because
the brief is explicit that mixing CTA labels between positions is worse than
either label alone.

**Labels changed; URLs did not.** See [[02 Decisions]].

The eight service pages are grouped under the brief's capabilities in the
dropdown. The capability labels are **not links** — they are parents in the
information architecture, not pages, and a heading that looks clickable but is
not is worse than one that plainly is not.

Since 22 Sep those groups are **not listed here at all** — they are read from
the same source `/services` renders. See the last section of this note.

### Two faults fixed while the component was open

1. **The dropdown was hover-only.** The panel is rendered conditionally in
   JavaScript, so no CSS `:focus-within` could reach it — every link inside was
   unreachable from a keyboard. It opens on focus now, with a blur guard so
   tabbing *into* the panel does not close it.
2. **The triggers were plain text.** `/services` and `/industries` were in the
   sitemap and reachable from nowhere in the navigation. They are links now.

That second fix had a consequence: it promoted two undesigned SEO stubs to
top-level destinations. See [[07 Results and hub pages]].

### A trap avoided

The trigger's type rule selected `& > p`. Making it a link would have silently
killed that rule. Both halves were changed in the same commit — this codebase
has recorded silent-death-by-element-selector in twenty-four partials.

## Footer

The brand column now exists, closing a **recorded deviation**: Phase C shipped
four columns instead of the guide's five and wrote down why — no description
copy existed anywhere in the repo. The brief supplies it.

The wordmark still does not appear. It is crimson, roughly 1.4:1 on the footer
ground, so the name is set as type instead. `.h4` needed an explicit colour:
the footer primitive colours `.eyebrow`, `.rule`, `.pill` and `.legal` but had
no heading rule, because until now the footer had no heading.

**Omitted deliberately:** Privacy (no policy exists). **Kept pending
verification:** Facebook.

## 22 Sep — the dropdown is the hub, not a second copy of it

`navigation.ts` held its own mapping: four capability labels and eight routes,
typed out a second time beside the one `/services` renders from
`capabilityGroups`. Same offer, described twice, in two files that nothing
forced to agree.

**They had already drifted.** The hub gained a fifth block when the diagnostic
shipped and the menu did not, so the site showed **five capabilities on the
page and four in the navigation**. Neither was wrong when it was written —
`navigation.ts` has a comment explaining, correctly for its date, that a group
with no destinations is a dead label and that Strategy & Positioning had
nowhere to point. Nobody came back to it when that stopped being true. This is
the second time the same shape of fault has been recorded here: capability
copy restated rather than imported is exactly what `capabilityGroups.ts` was
built to stop between the hub and the home page.

`whatWeDoGroups` is derived from `capabilityGroups` now. Five labels, their
order, their links — **the menu is that page by construction**, and a
capability cannot appear in one and not the other again.

### Items carry their own href

`NavbarDropDown` built every link as `` `/${mainRoute}/${item.route}` ``, which
assumed every destination in a panel sat under the trigger's route. Strategy &
Positioning breaks that assumption and is the first group ever to: it is a What
We Do group whose destination is `/strategy-positioning`, a **top-level page**.
`NavItem` carries `href` instead of `route`. `mainRoute` still addresses the
trigger, which genuinely is the panel's parent page.

### The build guard was not dropped, it was widened

The old `pick()` threw the build on a typo'd route, because a link silently
missing from the navigation is the kind of fault nobody notices until traffic
does. Deriving the menu would have lost that. It is restated as a count —
**every page in `servicesData` must be reachable from the dropdown** — which
catches strictly more: a service page added and never filed under a capability
now fails the build too, rather than shipping unreachable. `pick()` survives
for Who We Help, which is still an explicit list.

### The label under Strategy & Positioning

On `/services` the link reads "Explore our Strategy & Positioning Diagnostic →"
— a sentence sitting in a block of prose. Its siblings in the dropdown are page
titles in a list of page titles, so it takes **"The Diagnostic"** there; the
hub's own wording is unchanged. The page's full title, "Strategy & Positioning
Diagnostic", would have repeated the group heading directly above it.

### This supersedes an instruction, and that should be read

The 11 Sep instruction was that Strategy & Positioning gets **no** nav entry,
and [[09 Outstanding]] recorded the right move as putting the changed premise
back to management rather than acting on it — the premise being that there was
nowhere for it to point, which the diagnostic ended. **It was asked for
directly on 22 Sep**, by name, against the hub's own five labels, which is a
current instruction rather than an inference from the old one. Recorded as a
supersession so the 11 Sep line is not simply found contradicted later.

### Still not done here

The **footer** lists all eight service pages flat and ungrouped and does not
carry the diagnostic at all, so the offer is now described in two shapes in
one page's chrome. That is a footer sitemap rather than a navigation and was
left alone; it is on [[09 Outstanding]].

Related: [[02 Decisions]], [[07 Results and hub pages]], [[09 Outstanding]],
[[10 Verification]]


## 23 Sep — the mobile drawer, rebuilt to the Technologies drawer

Asked for by name, with the Pixelette Technologies preview as the reference.
It was read in a browser before anything was written: at 390px, 768px and
900px, with the panel opened and each section expanded, and the markup and
computed styles read out of the live DOM rather than guessed from a screenshot.

**It is `<details>`/`<summary>` and carries no JavaScript state.** That is what
the reference does, and it is the better mechanism rather than merely the
matching one:

- `<summary>` is focusable and activates on Space with no handler, so the
  drawer is keyboard-operable by construction. The drawer it replaces was a
  `<figure>` with an `onClick` — not focusable, and not reachable from a
  keyboard at all. That is the same fault the desktop dropdown had in
  September and had already fixed.
- The groups share a `name` attribute, which is the HTML spec's own exclusive
  -disclosure mechanism, so **one open section closes the others with no code**.
  Confirmed in the browser rather than assumed.
- It works before hydration.

`useState` and `framer-motion` are both gone from this component, along with
the hamburger icons.

### The shape, and the one place it does not copy the reference

Six top-level rows and a full-width CTA, matching theirs. What We Do and Who We
Help are the two disclosure rows; Results, Insights, About and Contact are
plain rows at the same level, as Work and About are on theirs. Each group opens
with its hub link first — "What we do overview" to `/services`, "Who we help
overview" to `/industries` — which is their "overview" device, and which earns
its place here for the same reason the desktop trigger became a link: without
it both hubs are in the sitemap and reachable from nowhere in the navigation.

**The five capabilities stay labels inside the panel rather than becoming rows.**
Their top level is three pillars that each own a page. Ours would have been five
capabilities over eight service pages, and three of the five hold a single link,
so promoting them would have produced three rows that open to reveal one link
each. Settled on instruction, against the row-for-row alternative.

**There is no Home row.** The wordmark links home on every page, as it does on
the reference. It was the one duplicate the old drawer carried and the desktop
bar never did.

### Two faults found by looking, after the structure was already right

1. **The drawer was not full width.** `left: 0; right: 0` resolved against
   `.main_nav`, which carries `position: relative` and sits inside the page
   gutter, so "full width" meant the width of the content box. The fix was not
   `100vw` and not a negative margin. That `position: relative` existed only
   for the drawer that had just been deleted, so removing it makes the nearest
   positioned ancestor `.site-header` — `position: sticky`, therefore a
   containing block, and spanning the viewport.

   What else depended on that anchor was checked BEFORE it was removed: the
   desktop dropdown panels position against `.navdropDown`, which carries its
   own `position: relative`. Checked again after, by measuring: the panel's
   left edge and the "What We Do" label's left edge are both 521px at 1440.

2. The panel then re-applies the page gutter as its own `padding-inline`, using
   the same `clamp()` `container_main` uses, so the ground and the row rules
   reach the screen edges while the text stays in line with page content.

Related: [[02 Decisions]], [[09 Outstanding]], [[10 Verification]]
