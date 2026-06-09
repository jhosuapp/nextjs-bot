import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticPropsContext } from "next";

import { ArticleRenderer } from "@/src/features/article/renderer/ArticleRenderer";
import { fuerzaLaboralHibridaContent } from "@/src/features/article/data/fuerza-laboral-hibrida.content";
import { PageLayout } from "@/src/shared/layouts/page-layout/PageLayout";
import { PageTransition } from "@/src/shared/layouts/pageTransition/PageTransition";

export default function FuerzaLaboralHibridaPage() {
  const { t } = useTranslation("fuerza-laboral-hibrida");

  return (
    <PageLayout
      title={t("seo.title") as string}
      description={t("seo.description") as string}
    >
      <PageTransition>
        <ArticleRenderer t={t} content={fuerzaLaboralHibridaContent} />
      </PageTransition>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", [
        "common",
        "fuerza-laboral-hibrida",
      ])),
    },
  };
}
