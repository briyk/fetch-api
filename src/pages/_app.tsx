import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import Navbar from '@/components/Navbar/Navbar'
import { CartProvider } from '@/context/CartContext'


export default function App({ Component, pageProps }: AppProps) {
  return <>

  <CartProvider>
        <Navbar/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
  </CartProvider>


  </>
}

