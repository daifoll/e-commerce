import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import React from 'react'

export default function Succes() {
  const router = useRouter()

  console.log(router.query)

  return (
    <Layout>
      {
        router.query.success ?
          <div>Спасибо за покупку!</div>
          :
          <div>Оплата отменена</div>

      }
    </Layout>
  )
}
