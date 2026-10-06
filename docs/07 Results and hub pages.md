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

### The pre-brief positioning is gone — 22 Sep

Both opened with the narrow framing the brief exists to replace — *"emerging
Fintech, SaaS, Web3 and technology brands"* and *"the sectors we understand
best"* — while the homepage says the offer is **not limited to those
categories**. Logged here as live from 11 Sep. Closed on 22 Sep, on
instruction, and both pages were restructured rather than reworded.

## `/services` — five capabilities, not eight boxes

The hub sold **eight flat services** in a grid of eight equal cards while the
home page sold **five connected capabilities**. One offer, two shapes, and the
grid was the weaker: eight near-identical cards of near-identical prose, each
ending in its own "View More", read as a menu rather than as a capability.

**The copy is imported, not restated.** `capabilityGroups.ts` takes every
title and description from `growthSystemData` — the objects the home page
already renders. Holding the wording in two files is how the two pages came to
disagree; the new file owns only the mapping of service page to capability.

**Strategy & Positioning renders with no links, deliberately.** There is no
strategy page because strategy is not bought off a menu. The block ships
without the link row rather than inventing a destination.

**Nothing was orphaned**, and that decided the shape. Stripping the per-card
links for a single CTA would have cut roughly **34,000 words** of indexed
content off the internal link graph — measured before deciding: each service
page carries about 4,300 words against the hub's 850. The pages are not thin,
they are **templated**, which is a different fault with a different fix.

The h1 is "What we do". "Digital" comes off the visible page and stays in the
title tag, where the search intent lives.

## `/industries` — who we help, not the industries we serve

Same day, and the contradiction here was sharper. The home page's Who we help
section names **eleven markets**, closes on "And beyond", and **links here**
from "Find your growth route" — landing on "the sectors we understand best"
over five technology cards. The site widened its claim and withdrew it one
click later, on the click it had just invited.

Range first, then depth: the eleven markets, the approved positioning pair,
then the five sectors with a line each about what makes that market hard.

**The five card summaries were one sentence five times with the noun swapped**
— "Partner with Pixelette Marketing to [verb] your [sector] … build trust …
drive growth". That is the thin-content signal itself, and a sentence about
what makes a market difficult cannot be written that way, because markets are
not alike.

**Written against what UK agencies actually do.** Click Consult's Sector
Specialisms pages and The Marketing Practice were read in full. The first
attempt at the section said *"these five have their own page … where we have
written the most"*, which describes the WEBSITE rather than the work — no
agency writes about its own page structure, and it read as an apology for a
short list. Click's pattern replaced it: a heading owning the expertise rather
than claiming a boundary, one sentence per sector about the client's market,
and the breadth hedge given its own heading in plain speech.

**Title tags changed on both**, which is a live SEO change on indexed pages.
URLs are untouched, so nothing 404s and no redirect is needed.

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
