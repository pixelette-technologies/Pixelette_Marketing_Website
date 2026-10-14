import type { Metadata } from "next";

// One origin for canonicals, Open Graph, the sitemap and structured data.
// Pages used to hard-code the host; a typo in one file is how those drift.

export const SITE_URL = "https://www.pixelettemarketing.com";
export const SITE_NAME = "Pixelette Marketing";
export const TWITTER_HANDLE = "@pixelettemarketing";

type PageMetaInput = {
  /**
   * Page title without the brand suffix, e.g. "About". The helper appends
   * "| Pixelette Marketing" unless `title` already contains it (specialist
   * and article titles sometimes do).
   */
  title: string;
  description: string;
  /** Absolute path, e.g. "/aboutus". Use "" for the home page. */
  path: string;
  keywords?: string | string[];
  type?: "website" | "article";
  /** Default true. Pass false for pages that must stay out of the index. */
  index?: boolean;
  /** When true, use `title` as-is (home page already leads with the brand). */
  absoluteTitle?: boolean;
};

function withBrand(title: string, absoluteTitle?: boolean): string {
  if (absoluteTitle) return title;
  if (/pixelette marketing/i.test(title)) return title;
  return `${title} | ${SITE_NAME}`;
}

/**
 * Standard page metadata. Open Graph / Twitter images are intentionally
 * omitted until share assets exist — add `openGraph.images` and switch
 * `twitter.card` to `summary_large_image` when they do.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  index = true,
  absoluteTitle
}: PageMetaInput): Metadata {
  const fullTitle = withBrand(title, absoluteTitle);
  const url =
    path === "" || path === "/"
      ? SITE_URL
      : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    title: fullTitle,
    description,
    ...(keywords !== undefined ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
      type
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      creator: TWITTER_HANDLE
    },
    robots: {
      index,
      follow: true
    }
  };
}
