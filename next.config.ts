import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
  "upgrade-insecure-requests"
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        // Fix the historical slug typo while preserving the indexed URL.
        source: "/services/lead_genration",
        destination: "/services/lead_generation",
        permanent: true
      },
      // 25 Sep 2026. The indexed deeper-experience URLs are /industries/web_3
      // and /industries/tech and they stay. These are the names people (and
      // the 25 Sep correction brief) reach for, so they resolve rather than
      // 404. Temporary, so no search engine is told the real URL moved.
      {
        source: "/industries/web3",
        destination: "/industries/web_3",
        permanent: false
      },
      {
        source: "/industries/technology",
        destination: "/industries/tech",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
