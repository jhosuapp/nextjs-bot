import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticPropsContext } from "next";

import { BlogView } from "@/src/features/blog/views/Blog.view";
import { getArticleSlugs } from "@/src/features/article/data/articles.registry";
import { PageLayout } from "@/src/shared/layouts/page-layout/PageLayout";
import { PageTransition } from "@/src/shared/layouts/pageTransition/PageTransition";

export default function BlogPage() {
  // `blog` is the listing's own namespace; each article namespace is also loaded
  // (see getStaticProps) so the cards can read each article's hero copy.
  const { t } = useTranslation("blog");

  return (
    <PageLayout
      title={t("seo.title") as string}
      description={t("seo.description") as string}
    >
      <PageTransition>
        <BlogView t={t} />
      </PageTransition>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", [
        "common",
        "blog",
        ...getArticleSlugs(),
      ])),
    },
  };
}
