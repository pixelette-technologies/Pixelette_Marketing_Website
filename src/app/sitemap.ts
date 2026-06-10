import type { MetadataRoute } from "next";
import { servicesData } from "@/data/services/servicesData";
import { industriesData } from "@/data/industries/industriesData";
import blogsData from "@/data/blogs/blogsData";

// Generates /sitemap.xml at build time (Next.js App Router metadata route).
// Lists every public, indexable route. /success_stories and /story/[id] are excluded:
// they are noindex legacy content (Portfolio hidden 2 Jun 2026), so they must not be advertised here.
const BASE = "https://www.pixelettemarketing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/aboutus", "/contactus", "/blog-list", "/cookie-policy", "/services", "/industries"];
  const services = servicesData.map(s => `/services/${s.route}`);
  const industries = industriesData.map(i => `/industries/${i.route}`);
  const blogs = blogsData.flatMap(c => c.data).map(b => `/blog/${b.id}`);

  const paths = Array.from(
    new Set([...staticRoutes, ...services, ...industries, ...blogs])
  );

  return paths.map(path => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7
  }));
}
