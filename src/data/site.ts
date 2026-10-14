import type { Metadata } from "next";
import { company, companyOgFooter } from "@/data/company";
import { heroCopy } from "@/data/home";

// One origin for canonicals, Open Graph, the sitemap and structured data.
// Pages used to hard-code the host; a typo in one file is how those drift.

export const SITE_URL = "https://www.pixelettemarketing.com";
export const SITE_NAME = company.name;
export const TWITTER_HANDLE = "@pixelettemarketing";

/** Generated default share card — nested routes do not inherit the file. */
export const DEFAULT_OG_IMAGE = "/opengraph-image";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_ALT = `${SITE_NAME} — ${heroCopy.ogHeadline.join(" ")}`;
export const DEFAULT_OG_ALT = OG_IMAGE_ALT;

/** Footer fact line for the default OG card (no invented incorporation year). */
export function companyFactLine(): string {
  return companyOgFooter();
}

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
  /**
   * Share image path. Defaults to the generated `/opengraph-image`.
   * Pass a page-specific path only when that artwork is cleared for public
   * use. Width/height are declared only for the generated default card.
   */
  ogImage?: string;
};

function withBrand(title: string, absoluteTitle?: boolean): string {
  if (absoluteTitle) return title;
  if (/pixelette marketing/i.test(title)) return title;
  return `${title} | ${SITE_NAME}`;
}

/** Open Graph does not inherit the root title template — brand must sit in og:title. */
function ogTitle(title: string, absoluteTitle?: boolean): string {
  if (absoluteTitle) return title;
  if (/pixelette marketing/i.test(title)) return title;
  return `${title} · ${SITE_NAME}`;
}

function ogImages(ogImage: string): NonNullable<Metadata["openGraph"]>["images"] {
  if (ogImage === DEFAULT_OG_IMAGE) {
    return [
      {
        url: ogImage,
        width: OG_IMAGE_SIZE.width,
        height: OG_IMAGE_SIZE.height,
        alt: OG_IMAGE_ALT
      }
    ];
  }
  // Non-default artwork: omit width/height unless those dimensions are verified.
  return [{ url: ogImage }];
}

/**
 * Standard page metadata. Every public page must go through this so nested
 * routes name `/opengraph-image` explicitly (the file convention is not inherited).
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  index = true,
  absoluteTitle,
  ogImage = DEFAULT_OG_IMAGE
}: PageMetaInput): Metadata {
  const fullTitle = withBrand(title, absoluteTitle);
  const shareTitle = ogTitle(title, absoluteTitle);
  const url =
    path === "" || path === "/"
      ? SITE_URL
      : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const images = ogImages(ogImage);

  return {
    title: fullTitle,
    description,
    ...(keywords !== undefined ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
      type,
      images
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      creator: TWITTER_HANDLE,
      images: [ogImage]
    },
    robots: {
      index,
      follow: true
    }
  };
}
