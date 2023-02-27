import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const categoryPages = [1, 2, 3, 4]

export default function Category({ categoryProducts }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()

    console.log(router.query)

    return (
        <div>
            {
                categoryProducts.map((product: IProduct) =>
                    <div key={product.id}>
                        <div className="flex basis-1/3" key={product.id}>
                            <div className="w-80">
                                <img className="w-full h-64 object-cover" src={product.images[0]} />
                            </div>
                            <div>
                                <div><span>{product.category.name}</span></div>
                                <div><strong>{product.title}</strong></div>
                                <p>{product.description}</p>
                                <button>BUY</button>
                                <button>ADD TO CART</button>
                            </div>
                        </div>
                    </div>
                )
            }

            <button>Следующая страница</button>
        </div>
    )
}


export async function getStaticPaths() {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const categories = await res.json()

    const paths = categories.flatMap((category: ICategory) => {
        
        return categoryPages.map(page => ({
            params: {
                categoryId: category.id.toString(),
                page: page.toString()
            }
        }))
    })
    
    // const numberOfPages = 10

    // const paths = categories.map((category: ICategory) => ({
    //     params: { categoryId: category.id.toString(), page: (numberOfPages - 1).toString() },
    // }))
    
    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{ categoryProducts: IProduct[] }> = async ({ params }) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${params?.categoryId}/products?offset=${params?.page}0&limit=10`)
    const categoryProducts = await res.json()


    return {
        props: { categoryProducts }
    }
}