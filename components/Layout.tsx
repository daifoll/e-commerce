import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'

export default function Layout({ children }: ILayout) {
    return (
        <div className='h-screen flex flex-col justify-between px-20'>
            <header>
                HEADER

                <Link href="/">На главную</Link>
            </header>
            <main>{children}</main>
            <footer>FOOTER</footer>
        </div>
    )
}

