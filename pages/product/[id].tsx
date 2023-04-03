import Layout from '@/components/Layout'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import React, { SyntheticEvent } from 'react'
import { addToCart, deleteProduct, selectCartProducts } from '@/store/slices/cartSlice'
import ErrorFetch from '@/components/ErrorFetch'
import Image from 'next/image'

export default function Product({ product, error }: InferGetStaticPropsType<typeof getStaticProps>) {
    const cartProducts = useSelector(state => state) as ICartState
    const dispatch = useDispatch()

    function handleClickAddToCart({ id, title, price, totalPrice, image, quantity = 1 }: IProductAction) {
        dispatch(addToCart({ id: id, title: title, price: price, totalPrice: totalPrice, image: image, quantity: quantity, inCart: true }))

    }

    function handleClickDeleteProduct(product: IProductActionDelete) {
        dispatch(deleteProduct({ id: product.id }))
    }

    function hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>) {
        const catName = e.currentTarget.alt.toLocaleLowerCase()

        e.currentTarget.src = '/stubimg/notfound.png'
        e.currentTarget.alt = 'not found'

        switch (catName) {
            case 'clothes':
                e.currentTarget.src = '/stubimg/clothes.jpg'
                break
            case 'electronics':
                e.currentTarget.src = '/stubimg/electronics.jpg'
                break
            case 'furniture':
                e.currentTarget.src = '/stubimg/furniture.jpg'
                break
            case 'shoes':
                e.currentTarget.src = '/stubimg/shoes.jpg'
                break
            case 'others':
                e.currentTarget.src = '/stubimg/others.jpg'
                break
            default:
                e.currentTarget.src = '/stubimg/notfound.png'
                e.currentTarget.alt = 'not found'
                break
        }
    }

    return (
        error ?
            <Layout>
                <ErrorFetch error={error} />
            </Layout>
            :
            <Layout>
                <div>
                    <div className="flex flex-col items-center md:flex-row basis-1/2" key={product.id}>
                        <div className="w-full md:w-[65%] flex flex-wrap justify-center basis-2/5">
                            <Image width={300} height={300} priority={true} loader={({width}) => `${product.images[0]}?w=${width}`} className="basis-full h-72 object-cover object-center" src={product.images[0]} alt={product.category.name} onError={(e) => hanlerOnErrorImage(e)} />
                            <Image width={300} height={300} priority={true} loader={({width}) => `${product.images[1]}?w=${width}`} className="basis-1/2 mt-5 md:mt-0 w-20 h-44 md:h-56 object-cover" src={product.images[1] ? product.images[1] : '/stubimg/notfound.png'} alt={product.category.name} onError={(e) => hanlerOnErrorImage(e)} />
                            <Image width={300} height={300} priority={true} loader={({width}) => `${product.images[2]}?w=${width}`} className="basis-1/2 mt-5 md:mt-0 w-20 h-44 md:h-56 object-cover" src={product.images[2] ? product.images[1] : '/stubimg/notfound.png'} alt={product.category.name} onError={(e) => hanlerOnErrorImage(e)} />
                        </div>
                        <div className='ml-0 md:ml-6'>
                            <div className="text-lg mt-10 md:mt-4"><Link href={`/category/${product.category.id}/1`}><span>{product.category.name}</span></Link></div>
                            <div className="text-xl"><strong>{product.title}</strong></div>
                            <p className="text-lg mt-4 min-h-[80px]">{product.description}</p>
                            <div className="mt-10 md:mt-1"><span className="text-2xl font-semibold">{product.price}$</span></div>
                            {
                                cartProducts.cartReducer.products.filter((cartProduct: IProductAction) => cartProduct.id === product.id)[0] ?
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

    if (!res.ok) {
        return { paths: [], fallback: false }
    } else {
        const products = await res.json()

        const paths = products.map((product: IProduct) => ({
            params: { id: product.id.toString() },
        }))

        return { paths, fallback: false }
    }
}

export const getStaticProps: GetStaticProps<{ product: IProduct, error: string }> = async ({ params }) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params?.id}`)

    let error = ''

    if (!res.ok) { // Если возникла ошибка

        error = `${res.status} | ${res.statusText}`

        return {
            props: {
                product: {},
                error
            }
        }
    }else if (res.status === 404) { // Если 404 ошибка

        return {
            notFound: true
        }

    }else { // Если ошибок нет
        
        const product = await res.json()

        return {
            props: { product, error }
        }
    }

}
