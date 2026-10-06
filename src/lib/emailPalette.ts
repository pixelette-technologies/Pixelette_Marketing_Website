/**
 * The transactional email palette.
 *
 * HTML email cannot read CSS custom properties — most clients strip <style>
 * blocks and none of them resolve var() — so these are the one place in the
 * codebase where brand colours are legitimately written as literals. This file
 * is the token gate's exemption, and the reason is here rather than in the
 * gate's config so it travels with the values.
 *
 * Before the conversion the template carried ten inline hexes forming a
 * completely independent dark palette that shared not one value with the site:
 * a near-black #0b0b0f ground, a #6d1239 header band, a #f06292 link. They are
 * now the site's own dark family, so the email reads as the same company as the
 * page the enquiry came from.
 *
 * KEEP THESE IN STEP with the brand layer in src/scss/globels/_tokens.scss.
 * They cannot be checked automatically the way the stylesheet is, because there
 * is nothing to read them back out of.
 */
export const emailPalette = {
  /** Outer page ground. was 0b0b0f — matches --color-panel-b */
  pageBg: "#0F080A",
  /** Header band behind the wordmark. was 6d1239 — matches --color-footer-bg */
  headerBg: "#2B0612",
  /** Body card ground. was 15151b — matches --color-panel-a */
  cardBg: "#21040D",
  /** Inner detail table ground. was 101015 — matches --color-panel-b */
  panelBg: "#0F080A",
  /** Hairlines. was 25252e — matches --color-panel-border */
  border: "#471C29",
  /** Eyebrow pill ground. was 2a2a33 — matches --color-footer-pill */
  pillBg: "#4A1B2A",
  /** Eyebrow pill text. was f3b6c8 — matches --color-panel-btn-text */
  pillText: "#E9BFCC",
  /** Headings and field labels. */
  heading: "#FFFFFF",
  /** Body copy. was d7d9df — matches --color-footer-body */
  body: "#BC9DA7",
  /** Secondary line under the heading. was 9296a1 — matches --color-footer-muted */
  muted: "#A07C87",
  /** The reply-to link. was f06292 — matches --color-brand-signal, which is
   *  what the marking tone is for on a dark ground. */
  link: "#FF2F5B"
} as const;
