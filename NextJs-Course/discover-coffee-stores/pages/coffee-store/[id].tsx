import cls from "classnames";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { coffeeStoreProps } from "../../types/types";
import fetchCoffeeStores from "../../lib/coffee-store";

import styles from "../../styles/coffee-store.module.css";

export async function getStaticProps({ params }: any) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores: coffeeStores.find((coffeeStore:any) => {
        return coffeeStore.fsq_id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore:any) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export default function CoffeeStore(props:any) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, neighbourhood, imgUrl } = props.coffeeStores;

  const handleUpvoteButtion = () => {
    console.log("handle upvote");
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
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
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" alt={address}></Image>
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" alt={neighbourhood}></Image>
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" alt={"1"}></Image>
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButtion}>Up vote!</button>
        </div>
      </div>
    </div>
  );
}
