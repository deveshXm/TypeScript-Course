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
import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

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
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();
  // const [coffeeStores, setCoffeeStores] = useState([]);
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);
  const {dispatch, state} = useContext(StoreContext);
  const {coffeeStores, latLong} = state;
  console.log({ latLong, locationErrorMsg });
  
  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
          // setCoffeeStores(fetchedCoffeeStores);

          dispatch({
            type:ACTION_TYPES.SET_COFFEE_STORES,
            payload:{
              coffeeStores: fetchedCoffeeStores,
            },
          })
        } catch (error: any) {
          setCoffeeStoresError(error.message);
        }
      }
    }

    setCoffeeStoresByLocation();
  }, [latLong]);

  const handleOnBannerBtnClick = (): void => {
    console.log("click");
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="allows you to discover coffee stores"
        />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong : {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong : {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src={IndexProps.src}
            width={IndexProps.width}
            height={IndexProps.height}
            alt={IndexProps.alt}
          />
        </div>
        <div className={styles.sectionWrapper} />

        {coffeeStores && coffeeStores.length > 0 ? (
          <>
            <h2 className={styles.heading2}>Stores Near Me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore: any) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore: any) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
