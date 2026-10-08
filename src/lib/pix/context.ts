/**
 * What the site assistant is allowed to know, and nothing else.
 *
 * Built on the website server from that site's company record and claims
 * register, then passed into the browser. The package never imports those
 * registers.
 */
export type PixContext = {
  /** The enquiries address the assistant hands out. */
  contactEmail: string;
  /** Identity facts for "what is this company" — the same ones the site footer prints. */
  company: {
    name: string;
    /** Null until the site has a verified legal name (Marketing today). */
    legalName: string | null;
    /** Null until the site has a verified incorporation year. */
    incorporated: number | null;
    registeredIn: string;
    /** Null until the site has a verified company number. */
    crn: string | null;
  };
  /** The Clutch aggregate, present only while the company record publishes it. */
  clutch: { ratingValue: number; reviewCount: number } | null;
  /**
   * The register ids the assistant consults that are currently VERIFIED.
   * An id missing from it is withheld.
   */
  publishable: readonly string[];
};
