import { BLOG_SLUGS } from "@/data/blogs/slugs";
import { redirect, notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogIdRedirect({ params }: PageProps) {
  const { id } = await params;
  const numeric = parseInt(id, 10);
  const slug = BLOG_SLUGS[numeric];
  if (!slug) notFound();
  redirect(`/insights/${slug}`);
}
