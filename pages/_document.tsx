import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from "next/document";

const themeBootstrap = `(function(){try{history.scrollRestoration='manual';var k='lumina:theme';var s=localStorage.getItem(k);var t=(s==='light'||s==='dark')?s:'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

interface Props extends DocumentInitialProps {
  locale: string;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale ?? 'es' };
  }

  render() {
    return (
      <Html lang={this.props.locale} className="h-full antialiased" suppressHydrationWarning>
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
}
