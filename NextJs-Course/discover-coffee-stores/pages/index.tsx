// Libraries //
import Head from "next/head";
import Image from "next/image";

// Components //
import Card from "../components/card";
import Banner from "../components/banner";

// CSS //
import styles from "../styles/Home.module.css";

interface Image {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const IndexProps: Image = {
  src: "/static/hero-image.png",
  width: 700,
  height: 400,
  alt: "hero-image",
};

export default function Home() {
  const handleOnBannerBtnClick = (): void => {
    console.log("click");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={"View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src={IndexProps.src}
            width={IndexProps.width}
            height={IndexProps.height}
            alt={IndexProps.alt}
          />
          <Card/>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
