# Living Signal 2.5D — 25 Nov 2026

Homepage hero only. Preview deploy; live domain untouched.

## Frames
1. `01-desktop-hero-rest.png` — settled composition after resolve.
2. `02-desktop-cursor-near.png` — pointer near the figure; ribbons lean, balls gather.
3. `03-desktop-cursor-on-figure.png` — pointer on the teardrop; bloom + travelling signals.

## Interaction recording
Pointer sweep on `.livingSignal` via `pointermove` (fine pointer): left wing → mid → focus → lower wing → return. Frames 02–03 are stills from that pass. Full motion is on the preview URL (desktop, fine pointer).

## Gates
- `npx tsc --noEmit` — silent
- `npm run test:contact` — 37 pass
- Reduced motion: still frame (`prefers-reduced-motion: reduce`)
- Touch: ignored (`pointer: fine` only)
- Decorative: `aria-hidden="true"` on the figure
- Off-screen / hidden tab: animation paused
