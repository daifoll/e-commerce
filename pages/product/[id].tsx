import Layout from '@/components/Layout'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

export default function Product({ product }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <Layout>
            <div>
                <div className="flex basis-1/3" key={product.id}>
                    <div className="w-80 flex flex-wrap justify-center">
                        <img className="basis-full h-64 object-cover" src={product.images[0]} />
                        <img className="basis-1/2 w-20 h-40 object-cover" src={product.images[1]} />
                        <img className="basis-1/2 w-20 h-40 object-cover" src={product.images[2]} />
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
        </Layout>
    )
}


// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://api.escuelajs.co/api/v1/products')
    const products = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = products.map((product: IProduct) => ({
        params: { id: product.id.toString() },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{ product: IProduct }> = async ({ params }) => {
    // const id = params?.id!

    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params?.id}`)
    const product = await res.json()

    return {
        props: { product }
    }
}
