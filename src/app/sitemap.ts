import type { MetadataRoute } from "next";
import { servicesData } from "@/data/services/servicesData";
import { industriesData } from "@/data/industries/industriesData";
import blogsData from "@/data/blogs/blogsData";
import { storiesData } from "@/data/storiesData/storiesData";

// Generates /sitemap.xml at build time (Next.js App Router metadata route).
// Lists every public route, including the dynamic service/industry/blog/story pages.
const BASE = "https://www.pixelettemarketing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/aboutus", "/contactus", "/blog-list", "/success_stories"];
  const services = servicesData.map(s => `/services/${s.route}`);
  const industries = industriesData.map(i => `/industries/${i.route}`);
  const blogs = blogsData.flatMap(c => c.data).map(b => `/blog/${b.id}`);
  const stories = storiesData.flatMap(c => c.data).map(s => `/story/${s.id}`);

  const paths = Array.from(
    new Set([...staticRoutes, ...services, ...industries, ...blogs, ...stories])
  );

  return paths.map(path => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7
  }));
}
