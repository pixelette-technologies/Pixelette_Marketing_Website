"use client";

const btnStyle: React.CSSProperties = {
  padding: "10px 22px",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: "0.5625rem",
  fontWeight: 600,
  background: "var(--color-brand)",
  border: "1px solid var(--color-brand)",
  color: "var(--color-page)"
};

interface ManageCookiesProps {
  label?: string;
  /** When given, the caller styles the control and the inline button style is
   *  dropped. The footer renders this as one of its links; /cookie-policy keeps
   *  the filled button it has always had. */
  className?: string;
}

// One reopen behaviour, two presentations. The footer's "Privacy choices" is
// the same action as the cookie page's button — clear the stored choice, deny
// analytics, reload so CookieConsent asks again — and a second copy of this
// logic is how the two would start disagreeing about what "reset" means.
const ManageCookies = ({
  label = "Change your cookie preferences",
  className
}: ManageCookiesProps) => {
  const reopen = () => {
    try {
      localStorage.removeItem("pmw-consent");
    } catch {}
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
    };
    w.gtag?.("consent", "update", { analytics_storage: "denied" });
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={reopen}
      className={className}
      style={className ? undefined : btnStyle}
    >
      {label}
    </button>
  );
};

export default ManageCookies;
