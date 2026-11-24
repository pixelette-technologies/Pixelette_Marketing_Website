import { AccessibilityPage } from "@/components/ui/accessibility";
import { accessibilityContent } from "@/data/accessibility";
import { pageMetadata } from "@/data/site";

export async function generateMetadata() {
  return await pageMetadata({
    title: "Accessibility",
    description: accessibilityContent.hero.paragraphs[0],
    path: "/accessibility"
  });
}

export default function Page() {
  return <AccessibilityPage />;
}
