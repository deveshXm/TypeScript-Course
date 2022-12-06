import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import coffeeStoresData from "../../data/coffee-stores.json";
import { coffeeStoreProps } from "../../types/types";

export function getStaticProps({ params }: any) {
  return {
    props: {
      coffeeStores: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map(coffeeStore => {
    return {
      params:{
        id:coffeeStore.id,
      }
    }
  })
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export default function CoffeeStore(props: coffeeStoreProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, neighbourhood } = props.coffeeStores;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">Back to home</Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
}
