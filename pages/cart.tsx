import Layout from "@/components/Layout";
import { decrementQuantityCount, deleteProduct, incrementQuantityCount } from "@/store/slices/cartSlice";
import { useSelector, useDispatch } from 'react-redux'
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { loadStripe } from '@stripe/stripe-js';
import Link from "next/link";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);


export default function Cart() {
    const cartProducts: ICartState = useSelector((state) => state) as ICartState
    const dispatch = useDispatch()

    const cartProductsStripe = cartProducts.products.map((product) => (
        {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.title,
                    images: [product.image]

                },
                unit_amount: product.price
            },
            quantity: product.quantity
        }
    ))

    console.log(cartProductsStripe)

    function handleClickIncrementQuantity(product: IProductActionCount) {
        dispatch(incrementQuantityCount({ id: product.id }))
    }
    function handleClickDecrementQuantity(product: IProductActionCount) {
        dispatch(decrementQuantityCount({ id: product.id }))
    }
    function handleClickDeleteProduct(product: IProductActionDelete) {
        dispatch(deleteProduct({ id: product.id}))
    }
    function getTotalPrice(id: number) {
        const index = cartProducts.products.findIndex((product) => product.id === id)

        return cartProducts.products[index].totalPrice
    }

    return (
        <Layout>
            <h1 className="text-3xl font-medium uppercase">Корзина</h1>
            {
                cartProducts.products.length ?
                    <div className="flex items-start mt-4">
                        <div className="basis-4/6">
                            <ul>
                                {
                                    cartProducts.products.map((product) => (
                                        <li key={product.id + new Date().getDate()}>
                                            <div className="flex bg-green-200 p-5 mb-3 rounded-2xl">
                                                <div className="w-40">
                                                    <img className="w-full h-full object-cover" src={product.image} alt={product.title} />
                                                </div>
                                                <div className="ml-6">
                                                    <p className="text-2xl"><Link href={`/product/${product.id}`}>{product.title}</Link></p>
                                                    <p className="text-xl mt-5"> Кол-во:</p>
                                                    <div className="flex items-center mt-1">
                                                        <button onClick={() => handleClickDecrementQuantity(product)} className="text-3xl mr-2">
                                                            <AiFillMinusCircle />
                                                        </button>
                                                        <span className="text-3xl">{product.quantity}</span>
                                                        <button onClick={() => handleClickIncrementQuantity(product)} className="text-3xl ml-2">
                                                            <AiFillPlusCircle />
                                                        </button>
                                                    </div>
                                                    <div className="mt-5"><strong className="text-3xl">{getTotalPrice(product.id)}$</strong></div>
                                                    <button className="text-base mt-4 p-2 font-semibold uppercase bg-red-400 hover:bg-red-300 text-white rounded-full" onClick={() => handleClickDeleteProduct(product)}>Удалить из корзины</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="sticky top-[110px] basis-2/6 ml-4 mb-3  bg-green-200 rounded-2xl p-5 focus:outline-none">
                            <p className="font-semibold text-2xl">Итого: {cartProducts.total}$</p>
                            <form action="/api/checkout_sessions" method="POST">
                                <input className="text-xl font-medium rounded-2xl p-2 focus:outline-none mt-4" name='email' placeholder="Введите e-mail" />
                                <input name='products' type='hidden' value={JSON.stringify(cartProductsStripe)} />
                                <div className="mt-8">
                                    <button type="submit" role="link" className="uppercase font-bold text-base mt-4 p-2 px-4 bg-white hover:bg-gray-100 text-black rounded-full">Перейти к оплате</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <span>Корзина пуста</span>
            }
        </Layout >
    )
}
