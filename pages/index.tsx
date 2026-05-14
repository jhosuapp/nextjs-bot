import Head from "next/head";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticPropsContext } from "next";

import { HomeView } from "@/src/features/home/views/Home.view";
import { PageTransition } from "@/src/shared/layouts/pageTransition/PageTransition";

export default function Home() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{tc("seo.homeTitle")}</title>
        <meta name="description" content={tc("seo.homeDescription")} />
      </Head>
      <PageTransition>
        <HomeView t={t} />
      </PageTransition>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", ["common", "home"])),
    },
  };
}
