import Head from "next/head";

import { HomeView } from "@/src/features/home/views/Home.view";
import { PageTransition } from "@/src/shared/layouts/pageTransition/PageTransition";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | IA</title>
        <meta
          name="description"
          content="AI avatars and interactive agents for humanlike communication, built for teams that need to scale messaging without losing the personal touch."
        />
      </Head>
      <PageTransition>
        <HomeView />
      </PageTransition>
    </>
  );
}
