"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  applyConsent,
  CONSENT_EVENT,
  readConsent,
  type ConsentChoice
} from "@/lib/consent";

const wrap: React.CSSProperties = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  background: "var(--color-panel-a)",
  color: "var(--color-band)",
  padding: "16px 20px",
  boxShadow: "0 -2px 16px rgb(var(--shadow-tint) / 0.25)"
};
const inner: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16
};
const textStyle: React.CSSProperties = {
  margin: 0,
  flex: "1 1 280px",
  fontSize: "0.5625rem",
  lineHeight: 1.5
};
const actions: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexShrink: 0
};
const btnBase: React.CSSProperties = {
  padding: "10px 22px",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: "0.5625rem",
  fontWeight: 600
};
const rejectStyle: React.CSSProperties = {
  ...btnBase,
  background: "transparent",
  border: "1px solid var(--color-band)",
  color: "var(--color-band)"
};
const acceptStyle: React.CSSProperties = {
  ...btnBase,
  background: "var(--color-brand)",
  border: "1px solid var(--color-brand)",
  color: "var(--color-page)"
};
const linkStyle: React.CSSProperties = {
  color: "var(--color-page)",
  textDecoration: "underline"
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (readConsent() === null) setVisible(true);
    }, 0);

    // A choice made in the Privacy choices panel answers this banner's
    // question too. Without this the banner would stay up asking something
    // the visitor has already answered a few centimetres above it.
    const onChange = () => setVisible(false);
    window.addEventListener(CONSENT_EVENT, onChange);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, onChange);
    };
  }, []);

  // src/lib/consent.ts is the one definition of what a choice does. It fires
  // CONSENT_EVENT, which the listener above uses to close the banner.
  const decide = (choice: ConsentChoice) => applyConsent(choice);

  if (!visible) return null;

  return (
    <div style={wrap} role="dialog" aria-label="Cookie consent" aria-live="polite">
      <div style={inner}>
        <p style={textStyle}>
          We use analytics cookies to understand how visitors use our site so we
          can improve it. We only set them with your consent. Read our{" "}
          <Link href="/cookie-policy" style={linkStyle}>
            Cookie Policy
          </Link>
          .
        </p>
        <div style={actions}>
          <button type="button" style={rejectStyle} onClick={() => decide("denied")}>
            Reject
          </button>
          <button type="button" style={acceptStyle} onClick={() => decide("granted")}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
