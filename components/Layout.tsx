import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import Header from './Header'

export default function Layout({ children }: ILayout) {
    return (
        <div className='h-screen flex flex-col justify-between px-20'>
            <Header/>
            <main>{children}</main>
            <footer>FOOTER</footer>
        </div>
    )
}

