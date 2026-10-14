import type { MetadataRoute } from "next";
import { servicesData } from "@/data/services/servicesData";
import blogsData from "@/data/blogs/blogsData";
import { SITE_URL } from "@/data/site";

// Generates /sitemap.xml at build time (Next.js App Router metadata route).
//
// ONLY ROUTES THAT ARE INTERNALLY LINKED. /industries/[slug] specialist pages
// (web_3, fintech, tech, saas, ai) stay live for direct/legacy traffic but are
// not linked from nav, footer or /industries, so they are omitted here.
// /success_stories and /story/[id] were deleted on 25 Sep 2026.
//
// route-walk discovers its list from this file — a new linked page left out
// here is a new page nothing checks.

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Entry[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/services", changeFrequency: "weekly", priority: 0.9 },
    { path: "/strategy-positioning", changeFrequency: "weekly", priority: 0.9 },
    { path: "/industries", changeFrequency: "weekly", priority: 0.8 },
    { path: "/results", changeFrequency: "monthly", priority: 0.8 },
    { path: "/aboutus", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog-list", changeFrequency: "weekly", priority: 0.7 },
    { path: "/contactus", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 }
  ];

  // Every service page is linked from the What we do nav and the footer.
  const services: Entry[] = servicesData.map(s => ({
    path: `/services/${s.route}`,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  // Every article is linked from /blog-list (Insights).
  const blogs: Entry[] = blogsData.flatMap(c => c.data).map(b => ({
    path: `/blog/${b.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const seen = new Set<string>();
  const entries: Entry[] = [];
  for (const entry of [...staticRoutes, ...services, ...blogs]) {
    if (seen.has(entry.path)) continue;
    seen.add(entry.path);
    entries.push(entry);
  }

  return entries.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority
  }));
}
