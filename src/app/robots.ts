import type { MetadataRoute } from "next";

// Generates /robots.txt at build time (Next.js App Router metadata route).
// The live site currently returns 404 for /robots.txt; this fixes that.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://pixelettemarketing.com/sitemap.xml",
    host: "https://pixelettemarketing.com"
  };
}
