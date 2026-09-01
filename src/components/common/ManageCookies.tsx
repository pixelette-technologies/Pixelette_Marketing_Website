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

const ManageCookies = () => {
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
    <button type="button" onClick={reopen} style={btnStyle}>
      Change your cookie preferences
    </button>
  );
};

export default ManageCookies;
