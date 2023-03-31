import Layout from '@/components/Layout'
import React from 'react'

export default function Error404() {
    return (
        <Layout>
            <div>
                <span className='text-4xl'>404</span>
                <span className='text-5xl'>&nbsp;|&nbsp;</span>
                <span className='text-3xl'>Страница не найдена</span></div>
        </Layout>
    )
}
