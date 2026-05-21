import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },
  devIndicators: false,
};

export default nextConfig;
