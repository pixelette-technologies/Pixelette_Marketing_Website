import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

// Generates /robots.txt at build time for the official domain.
// Non-official hosts (vercel.app, other subdomains, localhost) never see this
// file: middleware returns Disallow: / and X-Robots-Tag: noindex, nofollow.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
