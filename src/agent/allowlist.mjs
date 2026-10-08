/**
 * Route families the Marketing agent may ground answers in.
 * Marketing paths use /aboutus and /contactus (not /about-us or /contact).
 */

export const ALLOWED_SOURCE_PREFIXES = Object.freeze([
  '/',
  '/aboutus',
  '/services',
  '/contactus',
  '/privacy',
  '/cookie-policy',
  '/results',
  '/industries',
  '/strategy-positioning',
  '/blog-list',
  '/blog',
]);

export const FORBIDDEN_SOURCE_PREFIXES = Object.freeze([
  '/archive',
  '/legacy',
  '/old',
  '/deprecated',
  '/held',
]);

export function isAllowedSource(routePath) {
  const p = (routePath || '').trim();
  if (!p.startsWith('/')) return false;
  if (
    FORBIDDEN_SOURCE_PREFIXES.some(
      f => p === f || p.startsWith(f.endsWith('/') ? f : `${f}/`),
    )
  ) {
    return false;
  }
  if (p === '/') return true;
  return ALLOWED_SOURCE_PREFIXES.some(
    a => a !== '/' && (p === a || p.startsWith(`${a}/`)),
  );
}
