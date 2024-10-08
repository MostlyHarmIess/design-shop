// import {useContext} from 'react'
import Head from "next/head";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api-functions/server/products/queries";
import { STORAGE_KEY } from "@/lib/tq/products/settings";

import Layout from "@/components/Layout";
import Heading from "@/components/Heading";
import QueryBoundaries from "@/components/QueryBoundaries";
import ProductList from "@/components/ProductList";
// import { Button } from "@/components/mui";
// import { UIContext } from '@/components/contexts/UI.context';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading component="h2">Products</Heading>
        <QueryBoundaries>
          <ProductList />
        </QueryBoundaries>
      </Layout>
    </>
  );
}



export async function getStaticProps(context) {
  // console.log("LLLL", context);
  const products = await fetchProducts().catch((err) => console.log(err));
  const queryClient = new QueryClient();


  // If this was remote we'd use 'prefetchQuery' but as we know it we use 'setQueryData'
  await queryClient.setQueryData(
    [STORAGE_KEY],
    JSON.parse(JSON.stringify(products))
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
