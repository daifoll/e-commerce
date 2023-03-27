import { addToCart, deleteProduct } from '@/store/slices/cartSlice'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SyntheticEvent } from "react"

export default function SearchMarkup({product}: ISearchMarkUp ) {

    // Продукты добавленные в карзину
    const cartProducts = useSelector(state => state) as ICartState
    const dispatch = useDispatch()
    
    // Установка заглушки при ошибке загрузки страницы
    function hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>) {
        e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
    }


    // Добавление товара в корзину
    function handleClickAddToCart({ id, title, price, totalPrice, image, quantity = 1 }: IProductAction) {
        dispatch(addToCart({ id: id, title: title, price: price, totalPrice: totalPrice, image: image, quantity: quantity, inCart: true }))

    }

    // Удаление товара из корзины
    function handleClickDeleteProduct(product: IProductActionDelete) {
        dispatch(deleteProduct({ id: product.id }))
    }
    
    return (

        // Разметка найденных товаров
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
