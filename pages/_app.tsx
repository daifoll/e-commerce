import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react'
import { Router } from 'next/router'
import Layout from '@/components/Layout'
export default function App({ Component, pageProps }: AppProps) {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setLoading(true)
      console.log(loading)
    });

    Router.events.on("routeChangeComplete", (url) => {
      setLoading(false)
      console.log(loading)
    });

    Router.events.on("routeChangeError", (url) => {
      setLoading(false)
      console.log(loading)
    });
  }, [])

  return (
    <Provider store={store}>
    {
      loading ? 
      <Layout>
        <span>ЗАГРУЗКА...</span>
      </Layout>
      :
        <Component {...pageProps} />

    }
    </Provider>
  )

}
