import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {

  return (
    <Html lang="ru">
      <Head title='Store - Next.js | Stripe | Typescript | Tailwind | Redux Toolkit pet-project'>
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel='preconnect'/>
        <meta charSet="UTF-8"/>
        <meta name="description" content="Free Web tutorials"/>
        <meta name="keywords" content="Next.js, Stripe, Typescript, Tailwind, Redux, HTML, CSS, Javascript"/>
        <meta name="author" content="Kirill Kobykhnov (daifoll) | https://github.com/daifoll"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
