import Layout from "@/components/Layout";
import { decrementQuantityCount, deleteProduct, incrementQuantityCount } from "@/store/slices/cartSlice";
import { useSelector, useDispatch } from 'react-redux'

export default function Cart() {
    const cartProducts: ICartState = useSelector((state) => state) as ICartState
    const dispatch = useDispatch()
    
    console.log(cartProducts)

    function handleClickIncrementQuantity(product: IProductActionCount) {
        dispatch(incrementQuantityCount({id: product.id}))
    }
    function handleClickDecrementQuantity(product: IProductActionCount) {
        dispatch(decrementQuantityCount({id: product.id}))
    }
    function handleClickDeleteProduct(product: IProductActionDelete) {
        dispatch(deleteProduct({id: product.id}))
    }
    function getTotalPrice(id: number) {
        const index = cartProducts.products.findIndex((product) => product.id === id)

        return cartProducts.products[index].totalPrice
    }
    
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
                                    <p> Кол-во:</p>
                                    <button onClick={() => handleClickDecrementQuantity(product)} className="text-xl">-</button>
                                    {product.quantity}
                                    <button onClick={() => handleClickIncrementQuantity(product)} className="text-xl">+</button><br/>
                                    <strong>{getTotalPrice(product.id)}$</strong>
                                    <button onClick={() => handleClickDeleteProduct(product)}>Удалить из корзины</button>
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
