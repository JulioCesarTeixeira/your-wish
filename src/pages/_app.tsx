import { SessionProvider } from "next-auth/react"
import "../styles/global.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../contexts/AuthContext";
import Layout from "../components/common/Layout";
import { Session } from "next-auth";

export default function App({ Component,  pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
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