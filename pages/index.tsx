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

  function hanlerSetImage(category: string) {
    let catName = category.toLowerCase()


    switch (catName) {
      case 'clothes':
        return '/stubimg/clothes.jpg'
        
      case 'electronics':
        return '/stubimg/electronics.jpg'
        
      case 'furniture':
        return '/stubimg/furniture.jpg'
       
      case 'shoes':
        return '/stubimg/shoes.jpg'
        
      case 'others':
        return '/stubimg/others.jpg'
        
      default:
        return 'stubimg/clothes.jpg'
        
    }
  }

  return (
    <Layout>
      <Head>
        <title>Главная | Store</title>
        <link rel='preconnect'/>
      </Head>
      <div>
        {error ? '' : <h1 className="text-xl extra-sm:text-3xl font-medium uppercase">Выберите категорию</h1>}
        <div className="flex flex-wrap mt-0 sm:mt-4">
          {
            error ? <ErrorFetch error={error} />
              :
              categories.map((cat: ICategory, index) => {

                if (index > 4) {
                  return null
                } else {
                  return <div key={cat.id} className="basis-full sm:basis-full md:basis-1/2 p-1 mt-8 sm:mt-5">
                    <Link aria-label={cat.name} href={`/category/${cat.id}/0?sortBy=default`} className="uppercase text-sm extra-sm:text-lg">{cat.name}</Link>
                    <div className="w-full flex overflow-hidden h-64">
                      <Link aria-label={cat.name} className="relative hover:scale-[1.1] w-full transition-all" href={`/category/${cat.id}/0?sortBy=default`}><Image unoptimized={true} priority={true} fill={true} className="object-cover" src={`${hanlerSetImage(cat.name)}`} alt={cat.name} /></Link>
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
