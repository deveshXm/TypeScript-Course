import Link from "next/link";
import Image from "next/image";
import cls from 'classnames';

import { image } from "../types/types";
import styles from "./card.module.css";

interface props {
  name: string;
  imgUrl: string;
  href: string;
}

const IndexProps: image = {
  src: "",
  width: 260,
  height: 160,
  alt: "hero-image",
};

export default function Card(props: props) {
  return (
    <Link href={props.href} className={styles.cardLink}>
        <div className={cls("glass",styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imgUrl}
              width={IndexProps.width}
              height={IndexProps.height}
              alt={IndexProps.alt}
            />
          </div>
        </div>
    </Link>
  );
}
