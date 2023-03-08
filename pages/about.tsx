import Layout from "@/components/Layout"

export default function About() {
    return (
        <Layout>
            <p>
                Проект представляет собой интернет-магазин (e-commerce) с возможностью выбора категории/продукта,
                поиска товара, добавления товара в корзину, а также тестовой оплаты с помощью сервиса <a href="https://stripe.com" target="_blank">Stripe.</a>
            </p>
            <p>
                <h1>Стек технологий:</h1>
                <ul>
                    <li>Next.js</li>
                    <li>Typescript</li>
                    <li>TailwindCSS</li>
                    <li><a href="https://stripe.com" target="_blank">Stripe API</a></li>
                </ul>
            </p>
            <p>
                <h2>Описание работы</h2>
            </p>
        </Layout>
    )
}
