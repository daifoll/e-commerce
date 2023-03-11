import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { cache, useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }: ILayout) {
    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        async function getCat() {
            const res = await fetch('https://api.escuelajs.co/api/v1/categories')
            const data: ICategory[] = await res.json()

            setCategories(data)
        }
        getCat()
    }, [])

    return (
        <div className='h-screen flex flex-col justify-between font-montserrat font-normal'>
            <Header />
            <main className='mb-20 mt-40 px-8'>{children}</main>
            <Footer categories={categories} />
        </div>
    )
}

