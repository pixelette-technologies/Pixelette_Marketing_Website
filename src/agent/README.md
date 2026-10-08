# Marketing site agent

The assistant lives in this repo. `src/lib/pix` is the answering machine. `src/components/pix` is the widget. This folder is the Marketing voice: pack, colours, context, and the layout mount.

## Knowledge

`npm run pix:kb` writes `src/content/pix-kb.json` from the data modules and pages this site actually renders. The Technologies page-file builder does not see those files.

## Checks

```
npm run pix:check-sources
```

Uses `src/agent/allowlist.mjs` and an empty `src/content/archive/`. There is no `pix:check`. That check rebuilds from Technologies-shaped `page.tsx` files and would report an empty corpus here.
