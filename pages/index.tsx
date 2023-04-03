import ErrorFetch from "@/components/ErrorFetch"
import Layout from "@/components/Layout"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { SyntheticEvent } from "react"



export default function Home({ categories, error }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  function hanlerOnErrorImage(e: SyntheticEvent<HTMLImageElement>) {
    const catName = e.currentTarget.alt.toLocaleLowerCase()

    e.currentTarget.src = '/stubimg/notfound.png'
    e.currentTarget.alt = 'not found'

    switch (catName) {
      case 'clothes':
        e.currentTarget.src = '/stubimg/clothes.jpg'
        break
      case 'electronics':
        e.currentTarget.src = '/stubimg/electronics.jpg'
        break
      case 'furniture':
        e.currentTarget.src = '/stubimg/furniture.jpg'
        break
      case 'shoes':
        e.currentTarget.src = '/stubimg/shoes.jpg'
        break
      case 'others':
        e.currentTarget.src = '/stubimg/others.jpg'
        break
      default:
        e.currentTarget.src = '/stubimg/notfound.png'
        e.currentTarget.alt = 'not found'
        break
    }
  }

  return (
    <Layout>
      <Head>
        <title>Главная | Store</title>
      </Head>
      <div>
        {error ? '' : <h1 className="text-xl extra-sm:text-3xl font-medium uppercase">Выберите категорию</h1>}
        <div className="flex flex-wrap mt-0 sm:mt-4">
          {
            error ? <ErrorFetch error={error} />
              :
              categories.map((cat: ICategory, index) => {
                const loader = () => {
                  return `${cat.image}`
                }
                if (index > 4) {
                  return null
                } else {
                  return <div key={cat.id} className="basis-full sm:basis-full md:basis-1/2 p-1 mt-8 sm:mt-5">
                    <Link aria-label={cat.name} href={`/category/${cat.id}/0?sortBy=default`} className="uppercase text-sm extra-sm:text-lg">{cat.name}</Link>
                    <div className="w-full flex overflow-hidden">
                      <Link aria-label={cat.name} className="hover:scale-[1.1] w-full transition-all" href={`/category/${cat.id}/0?sortBy=default`}><Image loader={loader} unoptimized={true} priority={true} width={300} height={300} className="w-full h-64 object-cover" src={cat.image ? cat.image : '/stubimg/notfound.png'} onError={(e) => hanlerOnErrorImage(e)} alt={cat.name} /></Link>
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


export const getStaticProps: GetStaticProps<{ categories: ICategory[], error: string }> = async () => {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories`)

  let error = ''

  if (!res.ok) {  // Если возникла ошибка
    
    error = `Возникла ошибка: ${res.status}`

    return {
      props: { categories: [], error }
    }
  } else if (res.status === 404) { // Если 404 ошибка

    return {
      notFound: true
    }

  } else { // Если ошибок нет
    
    const categories = await res.json()

    return {
      props: { categories, error }
    }
  }
}
