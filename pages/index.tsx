import Layout from "@/components/Layout"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react"


export default function Home({ categories }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  
  function hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
  }

  const [byTitle, setByTitle] = useState('')

  function handleSubmitSearch(event: FormEvent) {
    event.preventDefault()

    Router.push({
      pathname: `/search`,
      query: { byTitle, page: '0' }
    })

    // router.push(`search/${searchQuery}`)
  }
  return (
    <Layout>
      <form onSubmit={handleSubmitSearch} >
        <input value={byTitle} onChange={(e) => setByTitle(e.target.value)} placeholder="Найти товар" />
        <button type="submit">НАЙТИ</button>
        <input type='submit' value='send' />
      </form>

      <h1>Выберите категорию</h1>
      <div className="flex flex-wrap">
        {
          categories.map((cat: ICategory) =>
            <div key={cat.id} className="basis-full">
              <Link href={`/category/${cat.id}/1`}><strong className="uppercase">{cat.name}</strong></Link>
              <div className="w-full">
                <img className="w-full h-64 object-cover" src={cat.image} onError={(e) => hanlerOnErrorImage(e)} alt={cat.name} />
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
