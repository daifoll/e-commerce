import { useRouter } from 'next/router'
import React, { ChangeEvent } from 'react'

export default function Sort() {
    const router = useRouter()

    function sortByPrice(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value

        if (value === 'lowtohigh' || value === 'hightolow') {
            e.preventDefault()

            router.push({
                pathname: `/search`,
                query: { byTitle: router.query.byTitle, page: router.query.page, sortBy: value }
            })
        }
    }

    function clearSort(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        router.push({
            pathname: `/search`,
            query: { byTitle: router.query.byTitle, page: router.query.page, sortBy: 'default' }
        })
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
