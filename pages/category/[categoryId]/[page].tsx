import Layout from "@/components/Layout"
import { addToCart, deleteProduct } from "@/store/slices/cartSlice"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { SyntheticEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IoIosAdd } from "react-icons/io"

export default function Category({ categoryProducts, catId }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()

    const cartProducts = useSelector(state => state) as ICartState
    const dispatch = useDispatch()

    function hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>) {
        e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
    }

    const [pageCount, setPageCount] = useState<number[]>([])

    const categoryPageCountPath = `/category/${catId}/${Number(router.query.page) + 1 > pageCount.length - 1 ? 1 : Number(router.query.page) + 1}`
    const categoryPageNextBtnPath = `/category/${catId}/${Number(router.query.page) + 1 > pageCount.length - 1 ? 1 : Number(router.query.page) + 1}`


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


    function handleClickAddToCart({ id, title, price, totalPrice, image, quantity = 1}: IProductAction) {
        dispatch(addToCart({ id: id, title: title, price: price, totalPrice: totalPrice, image: image, quantity: quantity, inCart: true}))

    }

    function handleClickDeleteProduct(product: IProductActionDelete) {
        dispatch(deleteProduct({ id: product.id}))
    }

    return (
        <Layout>
            <h1 className="text-3xl font-medium uppercase my-4">{categoryProducts[0].category.name}</h1>
            <div className="flex flex-wrap">
                {
                    categoryProducts.map((product: IProduct) =>
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
                        return <Link key={page} className="px-3 bg-primal text-white text-xl py-2 mr-1 leading-tight border border-primal rounded-l-lg hover:bg-white hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href={categoryPageCountPath}>{page + 1}</Link>
                    })

                }

                {
                    pageCount.length > 0 ?
                        <Link className="px-3 bg-primal text-white text-xl py-2 mr-1 leading-tight border border-primal rounded-l-lg hover:bg-white hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href={categoryPageNextBtnPath}>{Number(router.query.page) + 1 > pageCount.length - 1 ? 'Вернуться в начало' : 'Следующая страница'}</Link>
                        :
                        null
                }

            </div>
        </Layout>
    )
}


export async function getStaticPaths() {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const categories = await res.json()

    const paths = categories.flatMap((category: ICategory, index: number) => {
        const categoryPages = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        return categoryPages.map(page => ({
            params: {
                categoryId: category.id.toString(),
                page: page.toString()
            }
        }))
    })


    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{ categoryProducts: IProduct[], catId: string }> = async ({ params }) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${params?.categoryId}/products?offset=${params?.page}0&limit=10`)
    const categoryProducts = await res.json()


    return {
        props: { categoryProducts, catId: params?.categoryId as string }
    }
}