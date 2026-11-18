/** Descriptive slugs exist for the later Insights rename. Mock-up keeps /blog/[id]. */

export const BLOG_SLUGS: Record<number, string> = {
  1: "marketing-uk-fintech-fca-rules",
  2: "market-web3-product-ad-platforms",
  3: "marketing-metrics-early-stage-saas",
  4: "buyers-asking-ai-not-search-engine",
  5: "five-things-before-increasing-marketing-spend"
};

export function blogHref(id: number): string {
  return `/blog/${id}`;
}

export function blogIdFromSlug(slug: string): number | null {
  const entry = Object.entries(BLOG_SLUGS).find(([, value]) => value === slug);
  return entry ? Number(entry[0]) : null;
}
