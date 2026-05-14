import type { Metadata } from "next";

import { HomeView } from "../src/features/home/views/Home.view";
import { PageTransition } from "../src/shared/layouts/pageTransition/PageTransition";

export const metadata: Metadata = {
  title: "Home | IA",
  description:
    "AI avatars and interactive agents for humanlike communication, built for teams that need to scale messaging without losing the personal touch.",
};

export default function Home() {
  return (
    <PageTransition>
      <HomeView />
    </PageTransition>
  );
}
