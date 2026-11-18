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
      // Typo that has always pointed at lead generation.
      {
        source: "/services/lead_genration",
        destination: "/services/lead_generation",
        permanent: true
      },
      // Mock-up keeps baseline URLs. Migrated paths redirect back.
      {
        source: "/about",
        destination: "/aboutus",
        permanent: true
      },
      {
        source: "/insights",
        destination: "/blog-list",
        permanent: true
      },
      {
        source: "/insights/marketing-uk-fintech-fca-rules",
        destination: "/blog/1",
        permanent: true
      },
      {
        source: "/insights/market-web3-product-ad-platforms",
        destination: "/blog/2",
        permanent: true
      },
      {
        source: "/insights/marketing-metrics-early-stage-saas",
        destination: "/blog/3",
        permanent: true
      },
      {
        source: "/insights/buyers-asking-ai-not-search-engine",
        destination: "/blog/4",
        permanent: true
      },
      {
        source: "/insights/five-things-before-increasing-marketing-spend",
        destination: "/blog/5",
        permanent: true
      },
      {
        source: "/services/social-media-marketing",
        destination: "/services/social_media_marketing",
        permanent: true
      },
      {
        source: "/services/email-marketing",
        destination: "/services/email_marketing",
        permanent: true
      },
      {
        source: "/services/seo-and-content-marketing",
        destination: "/services/seo_and_content_marketing",
        permanent: true
      },
      {
        source: "/services/influencer-marketing",
        destination: "/services/influencer_marketing",
        permanent: true
      },
      {
        source: "/services/ads-ppc",
        destination: "/services/ads_ppc",
        permanent: true
      },
      {
        source: "/services/lead-generation",
        destination: "/services/lead_generation",
        permanent: true
      },
      {
        source: "/services/marketing-analytics",
        destination: "/services/marketing_analytics_and_reporting",
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
