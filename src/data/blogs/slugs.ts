/** Plan §8 — descriptive slugs for the five Insights articles. */

export const BLOG_SLUGS: Record<number, string> = {
  1: "marketing-uk-fintech-fca-rules",
  2: "market-web3-product-ad-platforms",
  3: "marketing-metrics-early-stage-saas",
  4: "buyers-asking-ai-not-search-engine",
  5: "five-things-before-increasing-marketing-spend"
};

export function blogHref(id: number): string {
  const slug = BLOG_SLUGS[id];
  if (!slug) throw new Error(`No slug for blog id ${id}`);
  return `/insights/${slug}`;
}

export function blogIdFromSlug(slug: string): number | null {
  const entry = Object.entries(BLOG_SLUGS).find(([, value]) => value === slug);
  return entry ? Number(entry[0]) : null;
}
