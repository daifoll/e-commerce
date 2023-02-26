import React from 'react'

export default function Layout({ children }: ILayout ){
  return (
    <>  
        <header>HEADER</header>
        <main>{children}</main>
        <footer>FOOTER</footer>
    </>
  )
}
