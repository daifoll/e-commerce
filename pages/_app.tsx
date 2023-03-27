import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store, persistor } from '../store/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect, useState } from 'react'
import { Router } from 'next/router'
import Layout from '@/components/Layout'
import { saveToLocalStorage } from '@/store/slices/cartSlice'
export default function App({ Component, pageProps }: AppProps) {

  const [loading, setLoading] = useState(false)



  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setLoading(true)
      // console.log(loading)
    });

    Router.events.on("routeChangeComplete", (url) => {
      setLoading(false)
      // console.log(loading)
    });

    Router.events.on("routeChangeError", (url) => {
      setLoading(false)
      // console.log(loading)
    });
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        {
          loading ?
            <Layout>
              <span className='font-rubik text-3xl'>ЗАГРУЗКА...</span>
            </Layout>

            :
            <Component {...pageProps} />

        }
      </PersistGate>
    </Provider>
  )

}
