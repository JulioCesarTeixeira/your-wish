import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Your Wish</title>
        <meta name="description" content="Julio's e-commerce experiment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href={"/login"}>Login</Link>
      </div>
    </div>
  );
}
