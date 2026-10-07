# Marketing site agent

Hand-wired `@pixelette/agent` for Pixelette Marketing.

## Knowledge

`src/content/pix-kb.json` is assembled by hand. The shared `pix-agent build` parser looks for Technologies-shaped `pageMetadata` / `faqs: { q, a }` / `SectionHead` literals; this site uses `export const metadata`, `question`/`answer` FAQ arrays, and copy in `src/data`, so the builder would see almost nothing.

Services FAQs that are **only** about budget or turnaround are omitted from the KB. Price and timeline rules would suppress those sentences if indexed; leaving them out keeps the corpus cleaner.

## Checks

```
npm run pix:check-sources
```

Uses `src/agent/allowlist.mjs` and an empty `src/content/archive/` (`.gitkeep` only). There is no `pix:check` — the KB is not regenerated from `page.tsx`.
