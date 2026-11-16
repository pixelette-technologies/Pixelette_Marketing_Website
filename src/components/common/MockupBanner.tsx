// 12 Nov 2026 developer brief §6 — plain temporary banner on gated pages.

export default function MockupBanner() {
  return (
    <div
      role='note'
      style={{
        background: "#fff3cd",
        color: "#000",
        borderBottom: "3px solid #000",
        padding: "0.75rem 1rem",
        fontFamily: "sans-serif",
        fontSize: "0.875rem",
        fontWeight: 700,
        textAlign: "center"
      }}
    >
      MOCK-UP — NOT APPROVED FOR PUBLICATION. This page is for internal review
      only.
    </div>
  );
}
