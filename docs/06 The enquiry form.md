# 06 The enquiry form

The brief's section 13 adds three fields: Company, Website, and "What are you
trying to improve?" (Demand | Pipeline | Conversion | Revenue | Launch | Other).

## Why it shipped as one commit

`src/lib/contactContract.ts` enforces a **closed allowlist** and returns
`UNSUPPORTED_FIELD` for anything not in it. A client posting the new fields
before the contract accepts them fails **100% of enquiries**. Client, contract,
validation, API and tests had to move together.

## The trap that would have broken everything silently

The spam honeypot is a hidden field named **`_website`** whose visible label
reads "Website". The visitor-facing field is **`companyWebsite`**. A real field
named `_website` would have failed every submission as `SPAM_REJECTED` — form
appears to work, enquiries vanish.

## Empty is not invalid

The form posts every key it holds, so an untouched optional field arrives as
`""`. `boundedString` has no optional mode — it returns `null` for `""` at any
minimum. Treating that as invalid would have failed every enquiry that left
Company blank. Empty is skipped before validating, the same idiom the
attribution loop already used.

## `?enquiry=` does not preselect the dropdown

The three engagement CTAs carry `?enquiry=diagnostic|managed|embedded`. They
seed the **message box** with an editable sentence, not the dropdown. Mapping
an engagement onto a funnel outcome is a guess dressed as data. See
[[02 Decisions]].

Read via `window.location.search` in an effect — **not** `useSearchParams`,
which would opt the statically generated homepage out of static rendering, and
**not** in `initialValues`, which is a lazy `useState` initializer that runs
during the server prerender where `window` does not exist.

## Tests

36 pass, 6 new. Keeping all three fields **optional** is what left the existing
fixture untouched — making `improve` required would have failed the acceptance
test *and* all twelve rejection cases, each of which asserts a specific code.
One new case proves the allowlist is still closed after being widened.

Three tests regex the **source text** of `ContactUsForm.tsx` and `route.ts`, so
some lines must stay textually intact — the `governanceReady` line, the
`eventId ?? crypto.randomUUID()` line, and the consent `Field`. Reformatting
them breaks the suite.

## The governance gate

The form renders "temporarily unavailable" unless three env values are set. One
of them is currently a placeholder — see [[09 Outstanding]].

Related: [[09 Outstanding]], [[10 Verification]]
