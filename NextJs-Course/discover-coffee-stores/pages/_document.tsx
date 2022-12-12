import Link from "next/link";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Link
          rel="preload"
          href="/fonts/IBMPlexSans-Bold.ttf"
          as="font"
          // crossOrigin="anonymous"
        />
        <Link
          rel="preload"
          href="/fonts/IBMPlexSans-Regular.ttf"
          as="font"
          // crossOrigin="anonymous"
        />
        <Link
          rel="preload"
          href="/fonts/IBMPlexSans-SemiBold.ttf"
          as="font"
          // crossOrigin="anonymous"
        />
        <Head lang="en"></Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
