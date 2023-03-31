import Layout from "@/components/Layout"
import SearchForm from "@/components/SearchForm"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { SyntheticEvent } from "react"


export default function Home({ categories }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  function hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>) {
    const catName = e.currentTarget.alt.toLocaleLowerCase()
    
    e.currentTarget.src = './stubimg/notfound.png'
    e.currentTarget.alt = 'not found'
    
    switch (catName) {
      case 'clothes':
        e.currentTarget.src = './stubimg/clothes.jpg'
        break
      case 'electronics':
        e.currentTarget.src = './stubimg/electronics.jpg'
        break
      case 'furniture':
        e.currentTarget.src = './stubimg/furniture.jpg'
        break
      case 'shoes':
        e.currentTarget.src = './stubimg/shoes.jpg'
        break
      case 'others':
        e.currentTarget.src = './stubimg/others.jpg'
        break
      default:
        e.currentTarget.src = './stubimg/notfound.png'
        e.currentTarget.alt = 'not found'
        break
    }
  }

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-medium uppercase">Выберите категорию</h1>
        <div className="flex flex-wrap mt-4">
          {
            categories.map((cat: ICategory, index) => {
              if (index > 4) {
                return null
              } else {
                return <div key={cat.id} className="basis-1/2 p-1 mt-5">
                  <Link href={`/category/${cat.id}/1?sortBy=default`} className="uppercase text-lg">{cat.name}</Link>
                  <div className="w-full flex overflow-hidden">
                    <Link className="hover:scale-[1.1] w-full transition-all" href={`/category/${cat.id}/1?sortBy=default`}><img className="w-full h-64 object-cover" src = {cat.image} onError={(e) => hanlerOnErrorImage(e)} alt={cat.name} /></Link>
                  </div>
                </div>
              }
            }
            )
          }
        </div>
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
