import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { BsCart4 } from 'react-icons/bs'
import SearchForm from './SearchForm'

export default function Header() {
  const cartProducts: ICartState = useSelector((state) => state) as ICartState
  const dispatch = useDispatch()

  return (
    <div className='p-7 px-20 bg-primal drop-shadow-lg fixed w-full z-50'>
      <nav>
        <ul className='flex w-full justify-between items-center'>
          <li className='text-3xl text-stone-50 hover:text-black uppercase font-anton font-bold'><Link href={'/'}>Store</Link></li>
          <li className='relative flex items-center'>
            <div className='mr-5'>
              <SearchForm />
            </div>
            <Link className='text-stone-50 hover:text-black text-3xl flex items-center' href={'/cart'}>
              <BsCart4 />
            </Link>
            <span className='text-lg font-medium text-white absolute top-[-30%] right-[-3%]'>{cartProducts.cartReducer.totalCount}</span>
          </li>
        </ul>
      </nav>
    </div>
  )
}
