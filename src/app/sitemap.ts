import type { MetadataRoute } from "next";

// Generates /sitemap.xml at build time (Next.js App Router metadata route).
// The live site currently returns 404 for /sitemap.xml; this fixes that.
const BASE = "https://pixelettemarketing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes that exist in src/app.
  const staticRoutes = ["", "/aboutus", "/contactus", "/blog-list", "/success_stories"];

  // TODO (dynamic routes): append entries by mapping the data sources for
  //   /services/[slug], /industries/[slug], /blog/[id], /story/[id]
  // e.g. ...services.map((s) => ({ url: `${BASE}/services/${s.slug}`, ... }))

  return staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));
}
