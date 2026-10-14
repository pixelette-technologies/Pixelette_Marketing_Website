import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

// Generates /robots.txt at build time (Next.js App Router metadata route).
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
