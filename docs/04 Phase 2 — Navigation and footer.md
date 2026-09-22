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
