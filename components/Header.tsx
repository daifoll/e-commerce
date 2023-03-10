import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillCartCheckFill } from 'react-icons/bs'
import SearchForm from './SearchForm'

export default function Header() {
  const cartProducts: ICartState = useSelector((state) => state) as ICartState
  const dispatch = useDispatch()

  return (
    <div className='p-7 px-20 bg-primal drop-shadow-lg'>
      <nav>
        <ul className='flex w-full justify-between items-center'>
          <li className='text-2xl hover:text-stone-50 uppercase transition duration-75'><Link href={'/'}>Главная</Link></li>
          <li className='relative flex items-center'>
            <div className='mr-5'>
              <SearchForm />
            </div>
            <Link className='hover:text-stone-50 text-3xl transition duration-75 flex items-center' href={'/cart'}>
              <BsFillCartCheckFill />
            </Link>
            <span className='text-lg font-medium text-white absolute top-[-30%] right-[-3%]'>{cartProducts.totalCount}</span>
          </li>
        </ul>
      </nav>
    </div>
  )
}
