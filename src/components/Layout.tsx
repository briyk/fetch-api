import React, { ReactNode } from "react";
import Head from "next/head"


type LayoutProps = {
     children: ReactNode;
   };

const Layout = ({children}:LayoutProps) => {
  return (
    <>
          <Head>
               <title>NextJS App with TypeScript</title>
               <meta name="viewport" content="width=device-width, initial-scale=1" />
               <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
               {children}
          </main>
    </>
  )
}

export default Layout