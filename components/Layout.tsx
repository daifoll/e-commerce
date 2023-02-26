import { GetStaticProps } from 'next'
import React from 'react'

export default function Layout({ children }: ILayout) {
    return (
        <div className='h-screen flex flex-col justify-between'>
            <header>HEADER</header>
            <main>{children}</main>
            <footer>FOOTER</footer>
        </div>
    )
}

