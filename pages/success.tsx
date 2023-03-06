import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import React from 'react'

export default function Succes() {
    const {
        query: { session_id },
    } = useRouter()
    
  return (
    <Layout>
        <div>СПАСИБО ЗА ПОКУПКУ</div>
    </Layout>
  )
}
