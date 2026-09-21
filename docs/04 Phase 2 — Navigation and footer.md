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

Related: [[02 Decisions]], [[09 Outstanding]]
