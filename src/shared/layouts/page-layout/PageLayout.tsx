import type { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/src/config/site";

const OG_LOCALE_MAP: Record<string, string> = {
  es: "es_ES",
  en: "en_US",
  pt: "pt_PT",
  fr: "fr_FR",
  de: "de_DE",
};

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  image?: string;
  hasNoIndex?: boolean;
};

const PageLayout = ({
  children,
  title,
  description,
  image = SITE_OG_IMAGE,
  hasNoIndex = false,
}: Props) => {
  const router = useRouter();
  const locale = router.locale ?? "es";
  const localePath = locale !== "es" ? `/${locale}` : "";
  const canonicalPath = router.asPath.split("?")[0];
  const canonicalUrl = `${SITE_URL}${localePath}${canonicalPath === "/" ? "" : canonicalPath}`;
  const ogLocale = OG_LOCALE_MAP[locale] ?? "es_ES";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <meta
          name="robots"
          content={hasNoIndex ? "noindex, follow" : "index, follow"}
        />
        <meta name="theme-color" content="#ffffff" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
            }),
          }}
        />
      </Head>
      {children}
    </>
  );
};

export { PageLayout };
