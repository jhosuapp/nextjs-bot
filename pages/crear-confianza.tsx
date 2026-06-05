import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticPropsContext } from "next";

import { TrustView } from "@/src/features/trust/views/Trust.view";
import { PageLayout } from "@/src/shared/layouts/page-layout/PageLayout";
import { PageTransition } from "@/src/shared/layouts/pageTransition/PageTransition";

export default function CrearConfianzaPage() {
  const { t } = useTranslation("crear-confianza");

  return (
    <PageLayout
      title={t("seo.title") as string}
      description={t("seo.description") as string}
    >
      <PageTransition>
        <TrustView t={t} />
      </PageTransition>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", [
        "common",
        "crear-confianza",
      ])),
    },
  };
}
