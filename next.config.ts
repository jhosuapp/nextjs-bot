import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },
  devIndicators: false,
  outputFileTracingIncludes: {
    "/*": ["./next-i18next.config.js", "./public/locales/**/*.json"],
  },
  async redirects() {
    // Articles moved from the site root to /blog/<slug>. Keep the old URLs
    // permanently redirecting so existing links and search rankings survive.
    return [
      {
        source: "/crear-confianza",
        destination: "/blog/crear-confianza",
        permanent: true,
      },
      {
        source: "/fuerza-laboral-hibrida",
        destination: "/blog/fuerza-laboral-hibrida",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
