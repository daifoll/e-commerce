import Layout from '@/components/Layout'
import { clearCart } from '@/store/slices/cartSlice'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function Succes() {
  const router = useRouter()
  const dispatch = useDispatch()
  
  console.log(router.query)
  
  router.query.success ? dispatch(clearCart()) : null
  
  return (
    <Layout>
      {
        router.query.success ?
          <div className='text-2xl font-medium'>Спасибо за покупку!</div>
          :
          <div className='text-2xl font-medium'>Оплата отменена</div>

      }
    </Layout>
  )
}
