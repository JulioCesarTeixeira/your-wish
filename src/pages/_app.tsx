import { SessionProvider } from "next-auth/react";
import "../styles/global.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@src/contexts/AuthContext";
import Layout from "../components/common/Layout";
import { Session } from "next-auth";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../server/routers/_app";
import { trpc } from "../utils/trpc";

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);

// import type { ReactElement, ReactNode } from 'react'
// import type { NextPage } from 'next'
// import type { AppProps } from 'next/app'

// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout?: (page: ReactElement) => ReactNode
// }

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout
// }

// export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
//   // Use the layout defined at the page level, if available
//   const getLayout = Component.getLayout ?? ((page) => page)

//   return getLayout(<AuthContextProvider><Component {...pageProps} /></AuthContextProvider>)
// }
