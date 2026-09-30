// The five capabilities' visual stage on /services. 29 Sep 2026; final media
// 30 Sep 2026.
//
// WHAT THIS FILE OWNS, AND WHAT IT DOES NOT. The capability names, bodies,
// service lists and links still come from capabilityGroups.ts (and through it
// from growthSystemData), unchanged. This file holds only what the "What We
// Do" implementation instruction adds on top of them:
//
//   - each capability's LEAD STATEMENT, verbatim from the instruction, one
//     entry per written line so the breaks fall where the instruction puts
//     them;
//   - its MEDIA: the supplied poster and loop;
//   - the poster's ALT TEXT and its FOCAL POINT for object-fit: cover.
//
// 30 SEP 2026: THE FINAL MEDIA, SUPPLIED, NOT MADE HERE. "Final media
// integration instructions": five posters and loops delivered as files and
// used exactly as supplied — not regenerated, not recompressed, not
// substituted — in public/services/capabilities/:
//
//   NN-slug.png    the poster and fallback, 1344 x 752
//   NN-slug.webm   the loop, VP9, 1280 x 720, 6s — offered first
//   NN-slug.mp4    the loop, H.264, 1280 x 720, 6s — the fallback
//
// Demand & Performance is the FINAL magnetic-selection field and replaces the
// earlier paper-fin visual completely. The 29 Sep media that this folder used
// to hold was deleted on the user's instruction, and the supplied set was
// moved into its place from new-capabilities/.
//
// A capability without a loop would have `video: false` and show its poster
// with the stage's own restrained drift. All five have loops today.

export interface CapabilityStage {
  /** The capability's index, the key into capabilityGroups. */
  index: string;
  /** File stem in CAPABILITY_MEDIA. */
  slug: string;
  /** The lead statement, one entry per line. */
  statement: readonly string[];
  /** Describes the artwork, for the poster. */
  alt: string;
  /** Which part of the artwork survives the cover crop, 0 to 1 on each axis
   *  (0 keeps the left/top edge, 1 the right/bottom), as the duck pond. Set
   *  per capability to protect the subject the instruction names for it. */
  focus: { x: number; y: number };
  /** True when a loop exists for this capability. */
  video: boolean;
}

export const CAPABILITY_MEDIA = "/services/capabilities";

export const capabilityStages: readonly CapabilityStage[] = [
  {
    index: "01",
    slug: "01-strategy-positioning",
    statement: ["Clarity creates direction."],
    alt: "A mirrored steel cylinder stands in a gallery strung with dense tangles of red, orange, pink and blue thread. In its reflection the chaos resolves into one clean, flowing band of colour.",
    // Protect: the cylinder, just left of centre.
    focus: { x: 0.49, y: 0.45 },
    video: true
  },
  {
    index: "02",
    slug: "02-demand-performance",
    statement: ["Turn attention into demand."],
    alt: "Coloured discs lie scattered across a pale stone surface beneath a brass magnet fixture. A selected stream of discs rises from the field to the magnet while the rest stay where they are.",
    // Protect: the magnet fixture and the rising stream, right of centre.
    focus: { x: 0.7, y: 0.3 },
    video: true
  },
  {
    index: "03",
    slug: "03-search-authority",
    statement: ["Be found.", "Build trust.", "Become easier to choose."],
    alt: "A red and white lighthouse stands within a field of tall translucent pink and cream slats. A warm beam from its lamp crosses the slats and the tower shows through between them.",
    // Protect: the lighthouse and the column field around it.
    focus: { x: 0.46, y: 0.35 },
    video: true
  },
  {
    index: "04",
    slug: "04-pipeline-conversion",
    statement: ["Turn interest into opportunity."],
    alt: "A hand-built desk sculpture of brass tubes, clear acrylic rails and painted wooden posts. Metal spheres wait or rest along the lower routes while a pink sphere travels the upper rail towards a brass bowl.",
    // Protect: the successful route, from the top cup to the brass bowl.
    focus: { x: 0.52, y: 0.5 },
    video: true
  },
  {
    index: "05",
    slug: "05-growth-intelligence",
    statement: ["Know what’s working.", "Know what to do next."],
    alt: "A wall of hinged mechanical flip tiles in a warm loft. On the left the tiles tilt at random angles; towards the right they lie flat in a coherent coloured pattern, and one pink row runs on past the edge of the wall.",
    // Protect: the resolving field — noise on the left, the pattern and the
    // pink row on the right.
    focus: { x: 0.55, y: 0.45 },
    video: true
  }
];
