import cls from "classnames";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import fetchCoffeeStores from "../../lib/coffee-store";

import styles from "../../styles/coffee-store.module.css";

export async function getStaticProps({ params }: any) {
  const coffeeStore = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores: coffeeStore.find((coffeeStore: any) => {
        return coffeeStore.id.toString() === params.id;
      }),
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
    fallback: false, // can also be true or 'blocking'
  };
}

export default function CoffeeStore(props: any) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, neighborhood, imgUrl } = props.coffeeStores;

  const handleUpvoteButtion = () => {
    console.log("handle upvote");
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
          <button className={styles.upvoteButton} onClick={handleUpvoteButtion}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}
