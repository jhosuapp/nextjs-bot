import Head from "next/head";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import type { GetStaticPropsContext } from "next";

import { PageTransition } from "@/src/shared/layouts/pageTransition/PageTransition";

export default function Login() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("seo.homeTitle")}</title>
      </Head>
      <PageTransition>
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </div>
      </PageTransition>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", ["common"])),
    },
  };
}
