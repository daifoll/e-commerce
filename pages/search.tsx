import ErrorFetch from "@/components/ErrorFetch"
import Layout from "@/components/Layout"
import ProductsMarkup from "@/components/ProductsMarkup"
import SearchMarkup from "@/components/ProductsMarkup"
import Sort from "@/components/Sort"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


export default function Search({ searchedProducts, allProductsBySearch, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()

    // Ключ:значение query параметра byTitle
    const byTitle = Object.entries(router.query)[0]

    // Ключ:значение query параметра page
    const pageArr = Object.entries(router.query)[1]

    // Ключ:значение query параметра sortBy
    const sortBy = Object.entries(router.query)[2]


    // Массив кол-ва страниц
    const [pageCount, setPageCount] = useState<number[]>([])

    // Стейт для сортировки по цене
    const [sortedByPriceProducts, setSortedByPriceProducts] = useState(searchedProducts)

    // Название-query параметра sortBy
    const [sortTitle, setSortTitle] = useState(router.query.sortBy)


    // Генерируем кнопки страниц при загрузке страниц
    useEffect(() => {

        const pagesCountNum = Math.round(allProductsBySearch.length / 10)

        const pagesCountArr = []

        for (let i = 0; i < pagesCountNum; i++) {
            pagesCountArr.push(i)
        }
        setPageCount([...pagesCountArr])

    }, [allProductsBySearch.length])

    return (
        error ?

            <Layout>
                <Head>
                    <title>Поиск: {router.query.byTitle} | Store</title>
                    <link rel='preconnect'/>
                </Head>
                <ErrorFetch error={error} />
            </Layout>
            :
            <Layout>
                <Head>
                    <title>{router.query.byTitme} | Store</title>
                    <link rel='preconnect'/>
                </Head>
                {
                    searchedProducts.length ?
                        <h1 className="text-2xl">Найденные товары по запросу: &quot;{router.query.byTitle}&quot;</h1>
                        :
                        <h1 className="text-2xl">По запросу: &quot;{router.query.byTitle}&quot; ничего не найдено.</h1>
                }

                {
                    // Сортировка товаров
                    <Sort route={router.route} />
                }


                <div className="flex flex-wrap mt-5">
                    {
                        // Сортировка цены по возрастанию
                        sortTitle === 'lowtohigh' ?
                            sortedByPriceProducts.sort((productA, productB) => { return productA.price - productB.price }).map((product: IProduct) =>

                                // Разметка найденных товаров
                                <ProductsMarkup product={product} key={product.id} />
                            )
                            :

                            // Сортировка цены по убыванию
                            sortTitle === 'hightolow' ?
                                sortedByPriceProducts.sort((productB, productA) => { return productA.price - productB.price }).map((product: IProduct) =>

                                    // Разметка найденных товаров
                                    <ProductsMarkup product={product} key={product.id} />
                                )
                                :

                                // Без сортировки (default)
                                sortedByPriceProducts.map((product: IProduct) =>

                                    // Разметка найденных товаров
                                    <ProductsMarkup product={product} key={product.id} />
                                )
                    }
                </div>
                <div className="pt-4 flex flex-wrap">
                    {
                        pageCount.map(page => {
                            return <Link key={page} className="px-3 mt-5 bg-primal text-white text-xl py-2 mr-1 leading-tight border border-primal rounded-l-lg hover:bg-white hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href={`/search/?${byTitle[0]}=${byTitle[1]}&${pageArr[0]}=${page}&${sortBy[0]}=${sortBy[1]}`}>{page + 1}</Link>
                        })

                    }

                    {
                        pageCount.length > 0 ?
                            <Link className="px-3 mt-5 bg-primal text-white text-xl py-2 mr-1 leading-tight border border-primal rounded-l-lg hover:bg-white hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href={`/search/?${byTitle[0]}=${byTitle[1]}&${pageArr[0]}=${Number(router.query.page) + 1 > pageCount.length - 1 ? pageCount.length - 1 : Number(router.query.page) + 1}&${sortBy[0]}=${sortBy[1]}`}>{Number(router.query.page) + 1 > pageCount.length - 1 ? 'Вернуться в начало' : 'Следующая страница'}</Link>
                            :
                            null
                    }

                </div>
            </Layout >
    )
}

export const getServerSideProps: GetServerSideProps<{ searchedProducts: IProduct[], allProductsBySearch: IProduct[], error: string }> = async (context) => {
    const allProductsBySearchRes = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${context.query.byTitle}`)
    const allProductsBySearch: IProduct[] = await allProductsBySearchRes.json()

    const searchProdByTitleRes = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${context.query.byTitle}&offset=${context.query.page}0&limit=10`)
    const searchedProducts: IProduct[] = await searchProdByTitleRes.json()

    let error = ''

    if (!allProductsBySearchRes.ok) {

        error = `${allProductsBySearchRes.status} | ${allProductsBySearchRes.statusText}`

        return {
            props: {
                searchedProducts: [],
                allProductsBySearch: [],
                error
            }
        }

    } else if (allProductsBySearchRes.status === 404) {

        return {
            notFound: true
        }

    } else {
        return {
            props: { searchedProducts, allProductsBySearch, error }
        }
    }
}
