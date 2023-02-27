import Layout from "@/components/Layout"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"


export default function Home({ categories }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <Layout>
      <h1>Выберите категорию</h1>
      <div className="flex flex-wrap">
        {
          categories.map((cat: ICategory) =>
            <div key={cat.id} className="basis-full">
              <Link href={`/category/${cat.id}/1`}><strong className="uppercase">{cat.name}</strong></Link>
              <div className="w-full">
                <img className="w-full h-64 object-cover" src={cat.image} alt={cat.name} />
              </div>
            </div>
          )
        }
      </div>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps<{ categories: ICategory[] }> = async () => {
  const catRes = await fetch(`https://api.escuelajs.co/api/v1/categories`)
  const categories = await catRes.json()

  return {
    props: { categories }
  }
}
