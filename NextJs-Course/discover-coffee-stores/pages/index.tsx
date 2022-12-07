// Libraries //
import Head from "next/head";
import Image from "next/image";

// Components //
import Card from "../components/card";
import Banner from "../components/banner";

// Extras //
import { image } from "../types/types";
import styles from "../styles/Home.module.css";
import fetchCoffeeStores from "../lib/coffee-store";

const IndexProps: image = {
  src: "/static/hero-image.png",
  width: 700,
  height: 400,
  alt: "hero-image",
};

export async function getStaticProps(context: string) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props: any) {
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
          {props.coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Toronto Store</h2>

              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore: any) => {
                  return (
                    <Card
                      key={coffeeStore.fsq_id}
                      name={coffeeStore.name}
                      imgUrl={coffeeStore.imgUrl}
                      href={`/coffee-store/${coffeeStore.fsq_id}`}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
