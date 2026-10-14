/**
 * Palette for the default Open Graph card (`src/app/opengraph-image.tsx`).
 *
 * `ImageResponse` / Satori cannot resolve CSS custom properties, so these are
 * the one place besides transactional email where brand colours are written as
 * literals. This file is the token gate's exemption; keep values in step with
 * the brand layer in `src/scss/globels/_tokens.scss`.
 */
export const ogPalette = {
  /** Matches --color-page */
  page: "#ffffff",
  /** Matches --color-brand-wash — hero wash inner stop */
  wash: "#ebc7d2",
  /** Matches --color-brand-tint — soft fill between wash and page */
  tint: "#f9ebf0",
  /** Matches --color-ink — display headings */
  ink: "#0a0a0a",
  /** Matches --color-brand — accents and emphatic final headline line */
  brand: "#b3063c",
  /** Matches --color-muted — footer fact line */
  muted: "#7d5d67"
} as const;
