import { useRouter } from 'next/router'
import React, { ChangeEvent } from 'react'

export default function Sort({ route }: ISort) {
    const router = useRouter()

    function sortByPrice(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value

        if (value === 'lowtohigh' || value === 'hightolow') {
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
        <div>
            <span>Sort By Price</span>
            <select onChange={(e) => sortByPrice(e)} value={router.query.sortBy}>
                <option value="lowtohigh">Low to High</option>
                <option value="hightolow">High to Low</option>
            </select>
            <button onClick={(e) => clearSort(e)}>Сбросить фильтры</button>
        </div>
    )
}
