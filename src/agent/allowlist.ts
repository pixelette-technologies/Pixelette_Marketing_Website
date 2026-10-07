/**
 * The explicit allowlist of current sources the agent may be grounded in, for
 * Pixelette Marketing.
 *
 * Same shape and purpose as `@pixelette/agent-kb`'s own
 * `packages/kb/src/allowlist.ts` (the Technologies list): an allowlist, not a
 * denylist, so a new route added next month is excluded from grounding unless
 * someone deliberately adds it here. See that file for the full reasoning;
 * it is not repeated per file.
 *
 * THIS IS A LIST OF FAMILIES, NOT OF PAGES. `/services` covers every
 * `/services/*` detail page without listing each one, and the same for
 * `/industries` and `/blog`.
 *
 * ONLY THE ROUTES THAT EXIST ON THIS SITE TODAY. Pixelette Marketing's
 * information architecture is not the Technologies site's: `/aboutus`, not
 * `/about-us`; `/contactus`, not `/contact`; `/cookie-policy`, not `/cookies`.
 * `/services`, `/results`, `/strategy-positioning`, `/blog-list` and `/blog`
 * have no Technologies equivalent at all. A new top-level section on this
 * site is added here, by Marketing, not by editing the shared package.
 *
 * Pass this file to the kb CLI explicitly:
 *
 *     pix-agent check-sources --file src/content/pix-kb.json \
 *       --archive src/content/archive --allowlist src/agent/allowlist.ts
 *
 * The default allowlist built into `@pixelette/agent-kb` is Technologies'
 * own list (`/about-us`, `/contact`, `/cookies`, ...) and must not be used to
 * check this site's knowledge file: every Marketing route would fail it.
 */

/** Route families the agent may ground answers in, on pixelettemarketing.com. */
export const ALLOWED_SOURCE_PREFIXES: readonly string[] = [
  '/', // the homepage itself, matched exactly below
  '/aboutus',
  '/contactus',
  '/cookie-policy',
  '/privacy',
  '/industries',
  '/services',
  '/results',
  '/strategy-positioning',
  '/blog-list',
  '/blog',
];

/**
 * Families that may never ground an answer, whatever else is true.
 *
 * Pixelette Marketing has no migrated legacy site and no archive directory
 * with content in it today, so none of these prefixes currently exist on
 * disk. The list is kept anyway, matching the Technologies file, so that if
 * an old-site migration is ever attempted here the guard is already in
 * place rather than being written under pressure at that point.
 */
export const FORBIDDEN_SOURCE_PREFIXES: readonly string[] = [
  '/archive',
  '/legacy',
  '/old',
  '/deprecated',
  '/held',
];

export function isAllowedSource(routePath: string): boolean {
  const p = (routePath || '').trim();
  if (!p.startsWith('/')) return false;
  if (FORBIDDEN_SOURCE_PREFIXES.some(f => p === f || p.startsWith(f.endsWith('/') ? f : `${f}/`))) {
    return false;
  }
  if (p === '/') return true;
  return ALLOWED_SOURCE_PREFIXES.some(a => a !== '/' && (p === a || p.startsWith(`${a}/`)));
}
