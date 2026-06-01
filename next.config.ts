import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" }
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
      }
    ];
  }
};

export default nextConfig;
