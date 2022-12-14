import cls from "classnames";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { isEmpty } from "../../utils";
import { StoreContext } from "../../store/store-context";
import fetchCoffeeStores from "../../lib/coffee-store";

import styles from "../../styles/coffee-store.module.css";

export async function getStaticProps({ params }: any) {
  const coffeeStore = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStore.find((store: any) => {
    return store.id.toString() === params.id;
  });
  return {
    props: {
      coffeeStores: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStore = await fetchCoffeeStores();
  const paths = coffeeStore.map((coffeeStore: any) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

export default function CoffeeStore(initialProps: any) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore: any) => {
          return coffeeStore.id.toString() === id; //dynamic id
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);
  const { name, address, neighborhood, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    console.log("hello");
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">{"⬅ Back to home"}</Link>
          </div>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          ></Image>
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt={address}
              ></Image>
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt={neighborhood}
              ></Image>
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt={"1"}
            ></Image>
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}
