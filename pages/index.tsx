import { GetStaticProps, InferGetStaticPropsType } from "next"

interface ICategory {
  id: number;
  name: string;
  image: string;
}

type IImageProduct = string[]

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: IImageProduct;
}

export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>) {

  console.log(products)

  return (
    <div>
      {/* {
        products.map((product: IProduct) =>
          <div key={product.id}>
            <div>
              <img src={product.images[2]} />
            </div>
            <span>{product.category.name}</span>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <button>BUY</button>
            <button>ADD TO CART</button>
          </div>
        )
      } */}
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
