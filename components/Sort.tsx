import { useRouter } from 'next/router'
import React, { ChangeEvent } from 'react'

export default function Sort({ route }: ISort) {
    const router = useRouter()

    function sortByPrice(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value

        if (value === 'lowtohigh' || value === 'hightolow' || value === 'default') {
            e.preventDefault()

            if (route.includes('/search')) {
                router.push({
                    pathname: `/search`,
                    query: { byTitle: router.query.byTitle, page: router.query.page, sortBy: value }
                })
            }

            if (route.includes('/category')) {
                router.push({
                    pathname: `/category/${router.query.categoryId}/${router.query.page}`,
                    query: { sortBy: value }
                })
            }
        }
    }

    function clearSort(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        if (route.includes('/search')) {
            router.push({
                pathname: `/search`,
                query: { byTitle: router.query.byTitle, page: router.query.page, sortBy: 'default' }
            })
        }

        if (route.includes('/category')) {
            router.push({
                pathname: `/category/${router.query.categoryId}/${router.query.page}`,
                query: { sortBy: 'default' }
            })
        }

    }
    return (
        <div className='my-6'>
            <span className='text-sm sm:text-lg'>Сортировать (по цене):&nbsp;</span>
            <select onChange={(e) => sortByPrice(e)} value={router.query.sortBy} className='bg-primal p-3 font-semibold text-sm sm:text-lg border-none text-white rounded-2xl'>
                <option value="default">Без сортировки</option>
                <option value="lowtohigh">По возрастанию</option>
                <option value="hightolow">По убыванию</option>
            </select>
            {/* <button onClick={(e) => clearSort(e)}>Сбросить фильтры</button> */}
        </div>
    )
}
