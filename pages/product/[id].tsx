import Layout from '@/components/Layout'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import React, { SyntheticEvent } from 'react'
import { addToCart, deleteProduct, selectCartProducts } from '@/store/slices/cartSlice'

export default function Product({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
    const cartProducts = useSelector(state => state) as ICartState
    const dispatch = useDispatch()
    console.log(cartProducts)

    function handleClickAddToCart({ id, title, price, totalPrice, image, quantity = 1 }: IProductAction) {
        dispatch(addToCart({ id: id, title: title, price: price, totalPrice: totalPrice, image: image, quantity: quantity, inCart: true }))

    }

    function handleClickDeleteProduct(product: IProductActionDelete) {
        dispatch(deleteProduct({ id: product.id}))
    }

    function hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>) {
        e.currentTarget.src = '/stubimg/imageNotFound.png'
        e.currentTarget.alt = 'Category image not found'
    }

    return (
        <Layout>
            <div>
                <div className="flex basis-1/2" key={product.id}>
                    <div className="w-[65%] flex flex-wrap justify-center">
                        <img className="basis-full h-64 object-cover" src={product.images[0]} alt={product.title} onError={(e) => hanlerOnErrorImage(e)} />
                        <img className="basis-1/2 w-20 h-40 object-cover" src={product.images[1]} alt={product.title} onError={(e) => hanlerOnErrorImage(e)} />
                        <img className="basis-1/2 w-20 h-40 object-cover" src={product.images[2]} alt={product.title} onError={(e) => hanlerOnErrorImage(e)} />
                    </div>
                    <div className='ml-6'>
                        <div className="text-lg mt-4"><Link href={`/category/${product.category.id}/1`}><span>{product.category.name}</span></Link></div>
                        <div className="text-xl"><strong>{product.title}</strong></div>
                        <p className="text-lg mt-4 min-h-[80px]">{product.description}</p>
                        <div className="mt-1"><span className="text-2xl font-semibold">{product.price}$</span></div>
                        {
                            cartProducts.products.filter((cartProduct: IProductAction) => cartProduct.id === product.id)[0] ?
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
        </Layout>
    )
}



export async function getStaticPaths() {
    const res = await fetch('https://api.escuelajs.co/api/v1/products')
    const products = await res.json()


    const paths = products.map((product: IProduct) => ({
        params: { id: product.id.toString() },
    }))

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
