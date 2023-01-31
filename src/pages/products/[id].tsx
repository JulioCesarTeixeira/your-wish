/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { ReactElement } from "react";
import Layout from "@src/components/common/Layout";
import { useRouter } from "next/router";
import { trpc } from "@src/utils/trpc";
import Image from 'next/image';
import emptyProductImage from "public/empty-product-image.png";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { createContext, createContextInner } from '@src/server/context';
import { productRouter } from "@src/server/routers/product.routes";
import superjson from 'superjson';
import ProductPage from "@src/components/pages/product";
// import { NextPageWithLayout } from "./_app";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const ssg = createProxySSGHelpers({
      router: productRouter,
      // @ts-expect-error
    ctx: createContextInner(),
    transformer: superjson,
});
  const id = context.params?.id as string;

  await ssg.getProductById.prefetch({id});

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};



const Page = () => {
  
  // access query params id
  const { id } = useRouter().query;

  const {data, isFetching, isError, error} = trpc.products.getProductById.useQuery({id: id as string}, {cacheTime: 1000 * 60 * 60 * 24, refetchOnWindowFocus: false});
  const product = data?.product;
  
  
  if (error) return <div>Product not found: {error.message}</div>
  
  if (isFetching) return <div>Loading...</div>
  
  if (!product) return <div>Product not found</div>
  

  return (
    <div>
      <Head>
        <title>Your Wish</title>
        <meta name="description" content="Julio's e-commerce experiment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductPage product={product} />
      {/* <div>Product {product.name}</div>
      <Image alt={product.description} src={product.image ?? emptyProductImage} height={200} width={200} className=' object-cover object-center group-hover:opacity-75' /> */}
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
