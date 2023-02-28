import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='p-14 bg-yellow-400'>
        <nav>
            <ul className='flex w-full justify-between'>
                <li className='text-2xl hover:text-stone-50 uppercase'><Link href={'/'}>Главная</Link></li>
                <li className='text-2xl hover:text-stone-50 uppercase'><Link href={'/about'}>О проекте</Link></li>
                <li className='text-2xl hover:text-stone-50 uppercase'><Link href={'/contacts'}>Контакты</Link></li>
                <li className='text-2xl hover:text-stone-50 uppercase'><Link href={'/cart'}>Корзина</Link></li>
            </ul>
        </nav>
    </div>
  )
}
