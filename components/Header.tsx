import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsCart4 } from 'react-icons/bs'
import SearchForm from './SearchForm'

export default function Header() {
  const cartProducts: ICartState = useSelector((state) => state) as ICartState
  const dispatch = useDispatch()

  return (
    <div className='p-4 px-4 extra-sm:px-10 sm:px-20 bg-primal drop-shadow-lg fixed w-full z-50'>
      <nav>
        <ul className='flex flex-col sm:flex-row w-full justify-between items-start sm:items-center'>
          <li className='text-xl ml-2 extra-sm:text-3xl sm:ml-0 text-black hover:text-stone-50 uppercase font-anton font-bold'><Link aria-label='Go to main page button' href={'/'}><h1>Store</h1></Link></li>
          <li className='relative flex items-center w-full sm:w-auto justify-between sm:justify-start mt-2'>
            <div className='mr-5'>
              <SearchForm />
            </div>
            <Link aria-label='cart button' className='hover:text-stone-50 text-black mr-2 extra-sm:mr-0 text-3xl flex items-center' href={'/cart'}>
              <BsCart4 />
            </Link>
            <span className='text-lg font-medium text-black absolute top-[-50%] extra-sm:top-[-30%] right-[0%] extra-sm:right-[-3%]'>{cartProducts.cartReducer.totalCount}</span>
          </li>
        </ul>
      </nav>
    </div>
  )
}
