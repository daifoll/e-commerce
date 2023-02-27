import Layout from "@/components/Layout"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { SyntheticEvent, useEffect, useState } from "react"

export default function Category({ categoryProducts, catId }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()

    function hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>) {
        e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
    }

    const [pageCount, setPageCount] = useState<number[]>([])

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
        <Layout>
            <div>
                {
                    categoryProducts.map((product: IProduct) =>
                        <div key={product.id}>
                            <div className="flex basis-1/3" key={product.id}>
                                <div className="w-80">
                                    <img className="w-full h-64 object-cover" src={product.images[0]} onError={(e) => hanlerOnErrorImage(e)}/>
                                </div>
                                <div>
                                    <div><span>{product.category.name}</span></div>
                                    <div><Link href={`/product/${product.id}`}><strong>{product.title}</strong></Link></div>
                                    <p>{product.description}</p>
                                    <button>BUY</button>
                                    <button>ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    pageCount.map(page => {
                        return <Link key={page} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href={`/category/${catId}/${page === 0 ? 1 : page}`}>{page + 1}</Link>
                    })
                }
            </div>
        </Layout>
    )
}


export async function getStaticPaths() {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const categories = await res.json()

    const paths = categories.flatMap((category: ICategory) => {
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