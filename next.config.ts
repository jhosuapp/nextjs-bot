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
};

export default nextConfig;
