import Link from "next/link";
import { useRouter } from "next/router";

export default function CoffeeStore() {
  const router = useRouter();

  return (
    <div>
      Coffee Store
      <Link href="/">Back to home</Link>
    </div>
  );
}
