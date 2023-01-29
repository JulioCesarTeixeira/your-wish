/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../components/common/Layout";
import { useSession } from "next-auth/react";
import { Home } from "@src/components/pages/home";
// import { NextPageWithLayout } from "./_app";


const Page = () => {
  return (
    <div>
      <Head>
        <title>Your Wish</title>
        <meta name="description" content="Julio's e-commerce experiment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
