import { BLOG_SLUGS } from "@/data/blogs/slugs";
import { redirect, notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Mock-up keeps numeric /blog/[id]. Descriptive slugs redirect back.
export default async function InsightSlugRedirect({ params }: PageProps) {
  const { slug } = await params;
  const entry = Object.entries(BLOG_SLUGS).find(([, value]) => value === slug);
  if (!entry) notFound();
  redirect(`/blog/${entry[0]}`);
}
