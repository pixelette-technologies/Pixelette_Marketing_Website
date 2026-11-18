import { caseStudyAnchor } from "@/components/ui/results";
import { caseStudies } from "@/data/results/caseStudies";
import { pageMetadata } from "@/data/site";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(study => ({
    slug: caseStudyAnchor(study.client)
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return await pageMetadata({
    title: "Client Results",
    description: "Client evidence from Pixelette Marketing.",
    path: `/results/${slug}`,
    index: false
  });
}

// Mock-up keeps a single /results page. Child URLs redirect to in-page anchors.
export default async function ResultStoryRedirect({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find(item => caseStudyAnchor(item.client) === slug);
  if (!study) notFound();
  redirect(`/results#${slug}`);
}
