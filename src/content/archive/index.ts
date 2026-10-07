/**
 * Intentionally empty.
 *
 * Pixelette Marketing has no previous-site content to migrate: this is not a
 * rebuild of an older Pixelette Marketing website with articles to carry
 * over, the way some other Pixelette Group sites have an `/archive` corpus.
 *
 * The directory exists only so `pix-agent check-sources --archive
 * src/content/archive` has something to point at. `check.mjs`'s
 * `check-sources` command fails outright if the `--archive` path does not
 * exist, and skips its archive-prose probe (rather than failing vacuously)
 * when the directory exists but holds no `*.ts` article files. This file is
 * named `index.ts` and is excluded from that scan for the same reason
 * `allowlist.mjs`/`allowlist.ts` and `types.ts` are: it is not an article.
 *
 * If Pixelette Marketing content is ever migrated out of an older site into
 * this one, put the migrated `.ts` article files here, in the same shape
 * Technologies' `src/content/archive` uses, so `check-sources` can probe
 * them for leakage into `pix-kb.json`.
 */
export {};
