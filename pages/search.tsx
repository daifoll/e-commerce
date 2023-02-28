import Layout from "@/components/Layout"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { SyntheticEvent, useEffect, useState } from "react"


export default function Search({ searchedProducts, allProductsBySearch }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    const byTitle = Object.entries(router.query)[0]
    const pageArr = Object.entries(router.query)[1]

    function hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>) {
        e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
    }

    // console.log(byTitle, pageArr)
    console.log('Выводится на страницу', searchedProducts, 'Всего найдено:', allProductsBySearch)


    const [pageCount, setPageCount] = useState<number[]>([])


    useEffect(() => {

        const pagesCountNum = Math.round(allProductsBySearch.length / 10)

        const pagesCountArr = []

        for (let i = 0; i < pagesCountNum; i++) {
            pagesCountArr.push(i)
        }
        setPageCount([...pagesCountArr])



    }, [])

    return (
        <Layout>
            <h1>Найденные товары по запросу: {router.query.byTitle}</h1>
            <div className="flex flex-wrap">
                {
                    searchedProducts.map((product: IProduct) =>
                        <div key={product.id} className="basis-1/3">
                            <div className="flex flex-col items-center mb-10" key={product.id}>
                                <div className="w-80">
                                    <img className="w-full h-64 object-cover" src={product.images[0]} onError={(e) => hanlerOnErrorImage(e)} />
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
            </div>

            {
                pageCount.map(page => {
                    return <Link key={page} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href={`/search/?${byTitle[0]}=${byTitle[1]}&${pageArr[0]}=${page}`}>{page + 1}</Link>
                })
            }

            <Link className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href={`/search/?${byTitle[0]}=${byTitle[1]}&${pageArr[0]}=${Number(router.query.page) + 1 > pageCount.length - 1 ? pageCount.length - 1 : Number(router.query.page) + 1}`}>{Number(router.query.page) + 1 > pageCount.length - 1 ? 'Вернуться в начало' : 'Следующая страница'}</Link>
        </Layout>
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
