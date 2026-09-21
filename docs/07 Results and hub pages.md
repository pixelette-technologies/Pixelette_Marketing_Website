# 07 Results and hub pages

## `/results` — new

The destination for every "See client results" link the brief puts on the
homepage. Built in Phase 1 rather than Phase 2, because three dead CTAs is not
a shippable homepage.

**It is not `/success_stories`.** That route serves legacy Pixelette
Technologies content, was hidden from the navigation on 2 Jun 2026 and is
deliberately absent from the sitemap. Pointing the brief's CTAs at it would
have put another company's case studies behind a Pixelette Marketing promise.
It stays hidden.

**It was thin, and honestly so.** The brief's gates bar publishing metrics
without a documented baseline and approval, and bar rewriting the testimonials.
So it carried the frame and the two verbatim quotations and nothing invented to
fill it out. No hero artwork, for the same reason.

**11 Sep: the two case studies landed.** Management supplied BlockGuard and
WebBookingPro in full — story, impact and an attributed quote each — so the
gate is now satisfied by evidence rather than by absence. Every word on the
page is theirs; nothing was paraphrased, sharpened, or restated in a rounder
form. `TeamSection` came off the page and each quotation moved inside the case
study it belongs to. See [[02 Decisions]] and [[05 Components]].

The one thing deliberately **not** done: none of the five BlockGuard figures
carry a measurement period, so they stay inside the case study and are barred
from the home page's proof band until someone states the window. The data file
says so at the point of use.

`RESULTS_HREF` is one exported constant behind all the links.

## `/services` and `/industries` — rebuilt

Added 10 Jun 2026 as SEO hubs, never taken through the design conversion. They
carried seven inline style objects each: the `h1` hard-coded at 1.5625rem, card
titles at 0.78125rem and summaries at **0.59375rem — about nine and a half
pixels**.

Nobody had seen them, because until the Phase 2 nav work neither was reachable
from anywhere a visitor could click. Making "What We Do" a link promoted them
to top-level destinations, which is what exposed the problem.

Rebuilt on the design system: `.wash-left` hero, real type scale, `ArrowCard`
grid. Inline styles 7 → 0 on both. **Content untouched** — headings,
standfirsts, both JSON-LD blocks, metadata, and every card title and summary,
all verified present on the rendered pages.

### They still carry pre-brief positioning

Both open with the narrow framing the brief exists to replace — *"emerging
Fintech, SaaS, Web3 and technology brands"* and *"the sectors we understand
best"* — while the homepage now says the offer is **not limited to those
categories**. The brief does not cover these pages, and the instruction was to
restyle without changing content, so the contradiction is live. See
[[09 Outstanding]].

## Lead Generation copy

Lead Generation was the **only** service with `summary: ""`, so its card and
its own hero standfirst rendered blank. Every other has 300–450 characters.

Written as deliberately generic interim copy, marked `INTERIM` in the file. It
names only targeting, landing pages and follow-up — all activities the brief
already lists under Pipeline & Conversion — and carries no numbers, guarantees
or volume promises.

The first draft read like a machine wrote it: a glossary-style opening
definition, a dash-parenthetical holding a capability list, stacked adjectives,
and an "X instead of Y" closer. Rewritten to open on an observation, with
uneven sentence lengths and no dashes. The file comment records the voice
constraints so a replacement does not reintroduce them.

Related: [[05 Components]], [[09 Outstanding]]
