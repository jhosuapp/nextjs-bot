import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { jakarta } from "@/src/config/fonts/fonts";
import { SmoothScroll } from "@/src/shared/components/smoth-scroll/SmoothScroll";
import { Footer } from "@/src/shared/layouts/footer/Footer";
import { Header } from "@/src/shared/layouts/header/Header";
import { useLoaderStore } from "@/src/shared/stores/loader.store";

import "@/src/styles/globals.css";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const setIsLoading = useLoaderStore((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoading();
  }, [setIsLoading, router.asPath]);

  return (
    <div className={`${jakarta.variable} contents`}>
      <SmoothScroll />
      <Header />
      <AnimatePresence mode="wait">
        <motion.div key={router.asPath}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
