import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store, persistor } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect, useState } from 'react'
import { Router } from 'next/router'
import Layout from '@/components/Layout'
import LoadingCategory from '@/components/LoadingCategory'
import LoadingIndex from '@/components/LoadingIndex'
import LoadingProduct from '@/components/LoadingProduct'
import LoadingCart from '@/components/LoadingCart'

export default function App({ Component, pageProps }: AppProps) {

  const [loading, setLoading] = useState(false)
  const [loaderComponent, setLoaderComponent] = useState(<></>)


  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setLoading(true)

      if( url.includes('/') ) {
        setLoaderComponent( <LoadingIndex/> )
      }

      if( url.includes('category') ) {
        setLoaderComponent( <LoadingCategory/> )
      }

      if( url.includes('product') ) {
        setLoaderComponent( <LoadingProduct/> )
      }

      if( url.includes('cart') ) {
        setLoaderComponent( <LoadingCart/> )
      }

      if( url.includes('search') ) {
        setLoaderComponent( <LoadingCategory/> )
      }
    });

    Router.events.on("routeChangeComplete", (url) => {
      setLoading(false)
    });

    Router.events.on("routeChangeError", (url) => {
      setLoading(false)
    });
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        {
          loading ?
            <Layout>
              {loaderComponent}
            </Layout>

            :
            <Component {...pageProps} />
        }
      </PersistGate>
    </Provider>
  )

}
