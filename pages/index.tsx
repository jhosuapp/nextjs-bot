import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticPropsContext } from "next";

import { HomeView } from "@/src/features/home/views/Home.view";
import { PageLayout } from "@/src/shared/layouts/page-layout/PageLayout";
import { PageTransition } from "@/src/shared/layouts/pageTransition/PageTransition";

export default function Home() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  const { t: tBot } = useTranslation("bot");

  return (
    <PageLayout
      title={tc("seo.homeTitle") as string}
      description={tc("seo.homeDescription") as string}
    >
      <PageTransition>
        <HomeView t={t} tBot={tBot} />
      </PageTransition>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", ["common", "home", "bot"])),
    },
  };
}
