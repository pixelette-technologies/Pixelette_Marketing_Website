"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "pmw-consent";

const wrap: React.CSSProperties = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  background: "#4d031a",
  color: "#f8f5f3",
  padding: "16px 20px",
  boxShadow: "0 -2px 16px rgba(0,0,0,0.25)"
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
  fontSize: "0.9rem",
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
  fontSize: "0.9rem",
  fontWeight: 600
};
const rejectStyle: React.CSSProperties = {
  ...btnBase,
  background: "transparent",
  border: "1px solid #f8f5f3",
  color: "#f8f5f3"
};
const acceptStyle: React.CSSProperties = {
  ...btnBase,
  background: "#b3063c",
  border: "1px solid #b3063c",
  color: "#ffffff"
};
const linkStyle: React.CSSProperties = {
  color: "#ffffff",
  textDecoration: "underline"
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== "granted" && stored !== "denied") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (choice: "granted" | "denied") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
    };
    w.gtag?.("consent", "update", { analytics_storage: choice });
    setVisible(false);
  };

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
