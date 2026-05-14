import { Html, Head, Main, NextScript } from "next/document";

const themeBootstrap = `(function(){try{var k='lumina:theme';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(s==='light'||s==='dark')?s:(m?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function Document() {
  return (
    <Html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </Head>
      <body className="min-h-dvh flex flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
