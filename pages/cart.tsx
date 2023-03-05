import Layout from "@/components/Layout";
import { useSelector, useDispatch } from 'react-redux'

export default function Cart() {
    const cartProducts: ICartState = useSelector((state) => state) as ICartState
    console.log(cartProducts)

    return (
        <Layout>
            <ul>
                {
                    cartProducts.products.map((product) => (
                        <li key={product.id + new Date().getDate()} className="mt-8">
                            <div className="flex border-2 border-black">
                                <div className="w-16">
                                    <img className="w-full h-28 object-cover" src={product.image} alt={product.title} />
                                </div>
                                <div>
                                    <p>{product.title}</p>
                                    <p>Кол-во: {product.quantity}</p>
                                    <strong>{product.price}$</strong>
                                </div>
                            </div>
                        </li>
                    ))
                }

                <p className="font-medium">Общая  сумма: {cartProducts.total}$</p>
                <button className="uppercase text-xl font-bold">Перейти к оплате</button>
            </ul>
        </Layout>
    )
}
