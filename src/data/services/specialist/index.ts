import { servicesData } from "@/data/services/servicesData";
import { demandPerformancePages } from "./demandPerformance";
import type { SpecialistPageConfig } from "./types";

export type {
  SpecialistPageConfig,
  SpecialistItem,
  SpecialistConnection,
  SpecialistFaqItem,
  SpecialistSectionHead
} from "./types";

// Every service route rendered by SpecialistServicePage rather than by the
// legacy template in app/services/[slug]/page.tsx. A route joins by being
// listed here; the page file needs no edit.
const pages: SpecialistPageConfig[] = [...demandPerformancePages];

export const specialistPages: Record<string, SpecialistPageConfig> =
  Object.fromEntries(pages.map(page => [page.route, page]));

// ONE LABEL, READ IN FOUR PLACES. The nav dropdown, the /services explorer and
// the footer all read servicesData[].title; the page itself reads the config.
// If the two ever disagree, a visitor sees one name in the menu and another
// on the page it opens, so the build fails instead.
for (const page of pages) {
  const entry = servicesData.find(service => service.route === page.route);
  if (!entry) {
    throw new Error(`Specialist page "${page.route}" has no servicesData entry.`);
  }
  if (entry.title !== page.label) {
    throw new Error(
      `Specialist page "${page.route}" is labelled "${page.label}" but ` +
        `servicesData calls it "${entry.title}". They must match.`
    );
  }
}
