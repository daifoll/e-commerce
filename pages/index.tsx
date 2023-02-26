import { GetStaticProps, InferGetStaticPropsType } from "next"


export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>) {

  console.log(products)

  return (
    <div className="flex flex-wrap">
      {
        products.map((product: IProduct) =>
          <div className="flex flex-col items-center basis-1/3" key={product.id}>
            <div className="w-full">
              <img className="w-full h-64 object-cover" src={product.images[2]} />
            </div>
            <span>{product.category.name}</span>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <button>BUY</button>
            <button>ADD TO CART</button>
          </div>
        )
      }
    </div>
  )
}


export const getStaticProps: GetStaticProps<{ products: IProduct[] }> = async () => {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products?offset=0&limit=10`)
  const products = await res.json()

  return {
    props: { products }
  }
}
