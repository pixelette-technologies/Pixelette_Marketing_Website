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

## Status as of 22 Sep 2026

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
and the nav entry was not. It is **the first page here built with a browser in
the loop from the start**, and looking at it produced seven faults after all
six gates were green. See [[02 Decisions]], [[05 Components]],
[[08 Design system constraints]], [[09 Outstanding]] and [[10 Verification]].

Two things are still true and worth repeating anywhere this is read:

1. **Almost nothing has been viewed in a browser.** The Growth System band, the
   whole of the About page and the whole of `/strategy-positioning` have now
   been seen; each look immediately produced faults no gate had caught. Every
   other page and breakpoint is still structural-only, and the dropdown menus
   have never been rendered. The 21 Sep realignment is made entirely of
   computed measurements and adds to this debt rather than settling any of it.
   **And the navigation is broken at 768px on all 36 routes**, which the
   diagnostic's tablet check found and nobody had seen before.
   See [[10 Verification]].
2. **The form's privacy-notice link is broken in production**, and the 11 Sep
   reply did not supply the URL that fixes it. See [[09 Outstanding]].
