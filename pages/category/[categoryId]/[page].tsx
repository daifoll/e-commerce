import Layout from "@/components/Layout"
import { addToCart, deleteProduct } from "@/store/slices/cartSlice"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { SyntheticEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Sort from "@/components/Sort"
import SearchMarkup from "@/components/ProductsMarkup"
import ProductsMarkup from "@/components/ProductsMarkup"
import ErrorFetch from "@/components/ErrorFetch"

export default function Category({ categoryProducts, catId, error }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()
    const cartProducts = useSelector(state => state) as ICartState
    const dispatch = useDispatch()

    const [pageCount, setPageCount] = useState<number[]>([])

    const categoryPageNextBtnPath = `/category/${catId}/${Number(router.query.page) + 1 > pageCount.length - 1 ? 1 : Number(router.query.page) + 1}/?sortBy=${router.query.sortBy}`

    // Название query-параметра sortBy
    const [sortTitle, setSortTitle] = useState(router.query.sortBy)

    useEffect(() => {
        const fetchData = async () => {
            const allCatProductsRes = await fetch(`https://api.escuelajs.co/api/v1/categories/${catId}/products`)
            const allCatProducts: IProduct[] = await allCatProductsRes.json()

            const pagesCountNum = Math.round(allCatProducts.length / 10)

            const pagesCountArr = []

            for (let i = 0; i < pagesCountNum; i++) {
                pagesCountArr.push(i)
            }
            setPageCount([...pagesCountArr])
        }

        fetchData()


    }, [])

    return (
        error ?
            <Layout>
                <ErrorFetch error={error} />
            </Layout>

            :

            <Layout>
                <h1 className="text-3xl font-medium uppercase my-4">{categoryProducts[0].category.name}</h1>
                <Sort route={router.route} />
                <div className="flex flex-wrap">
                    {
                        // Сортировка цены по возрастанию
                        sortTitle === 'lowtohigh' ?
                            categoryProducts.sort((productA, productB) => { return productA.price - productB.price }).map((product: IProduct) =>

                                // Разметка найденных товаров
                                <ProductsMarkup product={product} key={product.id} />
                            )
                            :

                            // Сортировка цены по убыванию
                            sortTitle === 'hightolow' ?
                                categoryProducts.sort((productB, productA) => { return productA.price - productB.price }).map((product: IProduct) =>

                                    // Разметка найденных товаров
                                    <ProductsMarkup product={product} key={product.id} />
                                )
                                :

                                // Без сортировки (default)
                                categoryProducts.map((product: IProduct) =>

                                    // Разметка найденных товаров
                                    <ProductsMarkup product={product} key={product.id} />
                                )
                    }

                </div>

                <div className="pt-9">
                    {
                        pageCount.map(page => {
                            return <Link key={page} className="
                            px-3 
                            bg-primal 
                            text-white text-xl 
                            py-2 mr-1 
                            leading-tight 
                            border 
                            border-primal 
                            rounded-l-lg 
                            hover:bg-white
                            hover:text-gray-700 
                            dark:bg-gray-800 
                            dark:border-gray-700
                            dark:text-gray-400 
                            dark:hover:bg-gray-700 
                            dark:hover:text-white" 
                            
                            href={`/category/${catId}/${page}/?sortBy=${router.query.sortBy}`}>{page + 1}</Link>
                        })

                    }

                    {
                        pageCount.length > 0 ?
                            <Link className="
                            px-3 
                            bg-primal 
                            text-white 
                            text-xl 
                            py-2 
                            mr-1 
                            leading-tight
                            border 
                            border-primal 
                            rounded-l-lg 
                            hover:bg-white 
                            hover:text-gray-700 
                            dark:bg-gray-800 
                            dark:border-gray-700 
                            dark:text-gray-400 
                            dark:hover:bg-gray-700 
                            dark:hover:text-white" 
                            
                            href={`/category/${catId}/${Number(router.query.page) + 1 > pageCount.length - 1 ? 0 : Number(router.query.page) + 1}/?sortBy=${router.query.sortBy}`}>{Number(router.query.page) + 1 > pageCount.length - 1 ? 'Вернуться в начало' : 'Следующая страница'}</Link>
                            :
                            null
                    }

                </div>
            </Layout>
    )
}


export async function getStaticPaths() {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')

    if (!res.ok) {
        return { paths: [], fallback: false }

    } else {
        const categories = await res.json()

        const paths = categories.flatMap((category: ICategory, index: number) => {
            const categoryPages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

            return categoryPages.map(page => ({
                params: {
                    categoryId: category.id.toString(),
                    page: page.toString()
                }
            }))
        })


        return { paths, fallback: false }
    }
}

export const getStaticProps: GetStaticProps<{ categoryProducts: IProduct[], catId: string, error: string }> = async ({ params }) => {

    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${params?.categoryId}/products?offset=${params?.page === '0' ? '0' : params?.page + '0'}&limit=10`)


    let error = ''

    if (!res.ok) {  // Если возникла ошибка

        error = `${res.status} (${res.statusText})`

        return {
            props: { categoryProducts: [], catId: params?.categoryId as string, error }
        }
    } else if (res.status === 404) { // Если 404 ошибка

        return {
            notFound: true
        }

    } else { // Если ошибок нет

        const categoryProducts = await res.json()

        return {
            props: { categoryProducts, catId: params?.categoryId as string, error }
        }
    }
}