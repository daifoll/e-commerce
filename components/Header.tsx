import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillCartCheckFill } from 'react-icons/bs'

export default function Header() {
  const cartProducts: ICartState = useSelector((state) => state) as ICartState
  const dispatch = useDispatch()

  return (
    <div className='p-14 bg-yellow-400'>
      <nav>
        <ul className='flex w-full justify-between'>
          <li className='text-2xl hover:text-stone-50 uppercase'><Link href={'/'}>Главная</Link></li>
          <li className='text-2xl hover:text-stone-50 uppercase'><Link href={'/about'}>О проекте</Link></li>
          <li className='text-2xl hover:text-stone-50 uppercase'><Link href={'/contacts'}>Контакты</Link></li>
          <li className='text-4xl uppercase relative'>
            <Link className='hover:text-stone-50' href={'/cart'}>
              <BsFillCartCheckFill/>
              </Link>
            <span className='text-xl font-medium text-white absolute top-[-60%] left-[90%]'>{cartProducts.totalCount}</span>
          </li>
        </ul>
      </nav>
    </div>
  )
}
