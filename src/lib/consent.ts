// The one place analytics consent is read and written.
//
// Two surfaces ask the same question — the first-visit banner (CookieConsent)
// and the Privacy choices panel (ManageCookies) — and before this file each
// carried its own copy of the storage key and the gtag call. Two copies of
// "what does denied mean" is how the two start disagreeing, and on a consent
// control that disagreement is a legal fault, not a cosmetic one.
//
// WHAT THE SITE ACTUALLY DOES, verified 18 Sep 2026, because the panel's
// wording has to be true of it:
//
// - Google Analytics 4 (G-1HGJEBFGRW) is the only third-party tracker. Every
//   other <script> in the app is JSON-LD structured data.
// - Consent Mode defaults all four signals to denied in layout.tsx. Only
//   analytics_storage is ever granted, and only by a visitor's choice. The
//   three advertising signals are never granted anywhere.
// - Nothing sends a user ID, and the enquiry form never calls gtag, so no name,
//   email or enquiry detail reaches Google Analytics.
// - The app sets no cookies of its own. The choice lives in localStorage.
// - gtag.js loads on every page regardless of consent. With analytics_storage
//   denied it sets no cookies, but Google's tag can still send cookieless
//   pings. So "no analytics cookies" is true when off; "nothing is sent to
//   Google" would NOT be. Do not write the second.

export const CONSENT_KEY = "pmw-consent";
export const CONSENT_EVENT = "pmw-consent-change";

export type ConsentChoice = "granted" | "denied";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function readConsent(): ConsentChoice | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

// Google Analytics names its cookies _ga and _ga_<container>. With the default
// cookie_domain of "auto" it writes them on the widest domain it can — on
// production that is .pixelettemarketing.com, on localhost it is host-only — so
// every candidate domain is expired, not just the current host. A cookie can
// only be removed by matching the domain and path it was set with.
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map(part => part.split("=")[0].trim())
    .filter(name => /^_ga(_|$)/.test(name));
  if (names.length === 0) return;

  const labels = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < labels.length - 1; i++) {
    domains.push(`; domain=.${labels.slice(i).join(".")}`);
  }
  domains.push(`; domain=${window.location.hostname}`);

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

// Records the choice, tells Google's tag, and — on denied — removes any
// analytics cookies an earlier "granted" left behind. Before this, switching
// off only stopped NEW cookies: the existing _ga cookies stayed for up to two
// years, which made "analytics cookies are not set" untrue for anyone who had
// once said yes.
export function applyConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {}
  (window as GtagWindow).gtag?.("consent", "update", {
    analytics_storage: choice
  });
  if (choice === "denied") clearAnalyticsCookies();
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}
