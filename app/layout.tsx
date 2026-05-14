import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { SmoothScroll } from "@/src/shared/components/smoth-scroll/SmoothScroll";
import { Footer } from "@/src/shared/layouts/footer/Footer";
import { Header } from "@/src/shared/layouts/header/Header";

import { jakarta } from "../src/config/fonts/fonts";
import "./globals.css";

config.autoAddCss = false;

const themeBootstrap = `(function(){try{var k='lumina:theme';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(s==='light'||s==='dark')?s:(m?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
