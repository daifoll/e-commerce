import Layout from "@/components/Layout"
import { addToCart, deleteProduct } from "@/store/slices/cartSlice"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import { Router, useRouter } from "next/router"
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function Search({ searchedProducts, allProductsBySearch }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    const byTitle = Object.entries(router.query)[0]
    const pageArr = Object.entries(router.query)[1]
    const sortBy = Object.entries(router.query)[2]

    const cartProducts = useSelector(state => state) as ICartState
    const dispatch = useDispatch()


    function hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>) {
        e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
    }

    function handleClickAddToCart({ id, title, price, totalPrice, image, quantity = 1 }: IProductAction) {
        dispatch(addToCart({ id: id, title: title, price: price, totalPrice: totalPrice, image: image, quantity: quantity, inCart: true }))

    }

    function handleClickDeleteProduct(product: IProductActionDelete) {
        dispatch(deleteProduct({ id: product.id }))
    }



    const [pageCount, setPageCount] = useState<number[]>([])
    const [sortedByPriceProducts, setSortedByPriceProducts] = useState(searchedProducts)
    const [sortTitle, setSortTitle] = useState(router.query.sortBy)


    function sortByPrice(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value

        if (value === 'lowtohigh') {
            // setSortedByPriceProducts(searchedProducts.sort((productA, productB) => { return productA.price - productB.price }))
            // setSortChange('Low to High')

            e.preventDefault()

            router.push({
                pathname: `/search`,
                query: { byTitle: router.query.byTitle, page: router.query.page, sortBy: value }
            })
        }

        if (value === 'hightolow') {
            // setSortedByPriceProducts(searchedProducts.sort((productA, productB) => { return productB.price - productA.price }))
            // setSortChange('High to Low')

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


    useEffect(() => {

        const pagesCountNum = Math.round(allProductsBySearch.length / 10)

        const pagesCountArr = []

        for (let i = 0; i < pagesCountNum; i++) {
            pagesCountArr.push(i)
        }
        setPageCount([...pagesCountArr])



    }, [])

    console.log(sortBy)
    return (
        <Layout>
            {
                searchedProducts.length ?
                    <h1 className="text-2xl">Найденные товары по запросу: "{router.query.byTitle}"</h1>
                    :
                    <h1 className="text-2xl">По запросу: "{router.query.byTitle}" ничего не найдено.</h1>
            }

            {
                <div>
                    <span>Sort By Price</span>
                    <select onChange={(e) => sortByPrice(e)} value={router.query.sortBy}>
                        <option value="lowtohigh">Low to High</option>
                        <option value="hightolow">High to Low</option>
                    </select>
                    <button onClick={(e) => clearSort(e)}>Сбросить фильтры</button>
                </div>
            }


            <div className="flex flex-wrap mt-5">
                {
                    sortTitle === 'lowtohigh' ?
                        sortedByPriceProducts.sort((productA, productB) => { return productA.price - productB.price }).map((product: IProduct) =>
                            <div key={product.id} className="basis-1/3 p-2">
                                <div key={product.id} className="flex flex-col items-center mb-10">
                                    <div className="w-full overflow-hidden">
                                        <Link className="" href={`/product/${product.id}`}>
                                            <img className="w-full h-64 object-cover transition-all hover:scale-[1.1]" src={product.images[0]} onError={(e) => hanlerOnErrorImage(e)} />
                                        </Link>
                                    </div>
                                    <div>
                                        <div className="text-lg mt-4"><span>{product.category.name}</span></div>
                                        <div className="text-xl"><Link href={`/product/${product.id}`}><strong>{product.title}</strong></Link></div>
                                        <p className="text-lg mt-4 min-h-[80px]">{product.description}</p>
                                        <div className="mt-4"><span className="text-2xl font-semibold">{product.price}$</span></div>
                                        {
                                            cartProducts.cartReducer?.products.filter((cartProduct: IProductAction) => cartProduct.id === product.id)[0] ?
                                                <button className="text-base mt-4 p-2 font-semibold uppercase bg-red-400 hover:bg-red-300 text-white rounded-full" onClick={() => handleClickDeleteProduct(product)}>
                                                    Удалить из корзины
                                                </button>
                                                :
                                                <button className="text-base mt-4 p-2 font-semibold uppercase bg-primal hover:bg-green-400 text-white rounded-full" onClick={() => handleClickAddToCart({ id: product.id, title: product.title, price: product.price, totalPrice: product.price, image: product.images[0], quantity: 1, inCart: true })}>
                                                    Добавить в корзину
                                                </button>
                                        }

                                    </div>
                                </div>
                            </div>
                        )
                        :
                        sortTitle === 'hightolow' ?
                            sortedByPriceProducts.sort((productB, productA) => { return productA.price - productB.price }).map((product: IProduct) =>
                                <div key={product.id} className="basis-1/3 p-2">
                                    <div key={product.id} className="flex flex-col items-center mb-10">
                                        <div className="w-full overflow-hidden">
                                            <Link className="" href={`/product/${product.id}`}>
                                                <img className="w-full h-64 object-cover transition-all hover:scale-[1.1]" src={product.images[0]} onError={(e) => hanlerOnErrorImage(e)} />
                                            </Link>
                                        </div>
                                        <div>
                                            <div className="text-lg mt-4"><span>{product.category.name}</span></div>
                                            <div className="text-xl"><Link href={`/product/${product.id}`}><strong>{product.title}</strong></Link></div>
                                            <p className="text-lg mt-4 min-h-[80px]">{product.description}</p>
                                            <div className="mt-4"><span className="text-2xl font-semibold">{product.price}$</span></div>
                                            {
                                                cartProducts.cartReducer?.products.filter((cartProduct: IProductAction) => cartProduct.id === product.id)[0] ?
                                                    <button className="text-base mt-4 p-2 font-semibold uppercase bg-red-400 hover:bg-red-300 text-white rounded-full" onClick={() => handleClickDeleteProduct(product)}>
                                                        Удалить из корзины
                                                    </button>
                                                    :
                                                    <button className="text-base mt-4 p-2 font-semibold uppercase bg-primal hover:bg-green-400 text-white rounded-full" onClick={() => handleClickAddToCart({ id: product.id, title: product.title, price: product.price, totalPrice: product.price, image: product.images[0], quantity: 1, inCart: true })}>
                                                        Добавить в корзину
                                                    </button>
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            sortedByPriceProducts.map((product: IProduct) =>
                                <div key={product.id} className="basis-1/3 p-2">
                                    <div key={product.id} className="flex flex-col items-center mb-10">
                                        <div className="w-full overflow-hidden">
                                            <Link className="" href={`/product/${product.id}`}>
                                                <img className="w-full h-64 object-cover transition-all hover:scale-[1.1]" src={product.images[0]} onError={(e) => hanlerOnErrorImage(e)} />
                                            </Link>
                                        </div>
                                        <div>
                                            <div className="text-lg mt-4"><span>{product.category.name}</span></div>
                                            <div className="text-xl"><Link href={`/product/${product.id}`}><strong>{product.title}</strong></Link></div>
                                            <p className="text-lg mt-4 min-h-[80px]">{product.description}</p>
                                            <div className="mt-4"><span className="text-2xl font-semibold">{product.price}$</span></div>
                                            {
                                                cartProducts.cartReducer?.products.filter((cartProduct: IProductAction) => cartProduct.id === product.id)[0] ?
                                                    <button className="text-base mt-4 p-2 font-semibold uppercase bg-red-400 hover:bg-red-300 text-white rounded-full" onClick={() => handleClickDeleteProduct(product)}>
                                                        Удалить из корзины
                                                    </button>
                                                    :
                                                    <button className="text-base mt-4 p-2 font-semibold uppercase bg-primal hover:bg-green-400 text-white rounded-full" onClick={() => handleClickAddToCart({ id: product.id, title: product.title, price: product.price, totalPrice: product.price, image: product.images[0], quantity: 1, inCart: true })}>
                                                        Добавить в корзину
                                                    </button>
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                }
            </div>
            <div className="pt-9">
                {
                    pageCount.map(page => {
                        return <Link key={page} className="px-3 bg-primal text-white text-xl py-2 mr-1 leading-tight border border-primal rounded-l-lg hover:bg-white hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href={`/search/?${byTitle[0]}=${byTitle[1]}&${pageArr[0]}=${page}&${sortBy[0]}=${sortBy[1]}`}>{page + 1}</Link>
                    })

                }

                {
                    pageCount.length > 0 ?
                        <Link className="px-3 bg-primal text-white text-xl py-2 mr-1 leading-tight border border-primal rounded-l-lg hover:bg-white hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href={`/search/?${byTitle[0]}=${byTitle[1]}&${pageArr[0]}=${Number(router.query.page) + 1 > pageCount.length - 1 ? pageCount.length - 1 : Number(router.query.page) + 1}&${sortBy[0]}=${sortBy[1]}`}>{Number(router.query.page) + 1 > pageCount.length - 1 ? 'Вернуться в начало' : 'Следующая страница'}</Link>
                        :
                        null
                }

            </div>
        </Layout >
    )
}

export const getServerSideProps: GetServerSideProps<{ searchedProducts: IProduct[], allProductsBySearch: IProduct[] }> = async (context) => {
    const allProductsBySearchRes = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${context.query.byTitle}`)
    const allProductsBySearch: IProduct[] = await allProductsBySearchRes.json()

    const searchProdByTitleRes = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${context.query.byTitle}&offset=${context.query.page}0&limit=10`)
    const searchedProducts: IProduct[] = await searchProdByTitleRes.json()

    return {
        props: { searchedProducts, allProductsBySearch }
    }
}
