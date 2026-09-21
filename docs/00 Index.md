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

## Status as of 11 Sep 2026

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

Two things are still true and worth repeating anywhere this is read:

1. **Almost nothing has been viewed in a browser.** The Growth System band on
   the home page has now been seen, and looking at it immediately produced a
   fault no gate had caught. Every other page and breakpoint is still
   structural-only, and the dropdown menus have never been rendered. See
   [[10 Verification]].
2. **The form's privacy-notice link is broken in production**, and the 11 Sep
   reply did not supply the URL that fixes it. See [[09 Outstanding]].
