import Link from "next/link";

export default function Footer({ categories }: IFooterProps) {

    return (
        <div className='p-14 bg-primal flex'>
            <nav className="basis-1/2">
                <h3 className="text-2xl font-medium uppercase mb-4">Страницы</h3>
                <ul className='flex flex-col items-start h-auto'>
                    <li className='text-xl hover:text-stone-50 uppercase mb-3'><Link href={'/'}>Главная</Link></li>
                    <li className='text-xl hover:text-stone-50 uppercase mb-3'><Link href={'/about'}>О проекте</Link></li>
                    <li className='text-xl hover:text-stone-50 uppercase mb-3'><Link href={'/contacts'}>Контакты</Link></li>
                    <li className='text-xl hover:text-stone-50 uppercase mb-3'><Link href={'/cart'}>Корзина</Link></li>
                </ul>
            </nav>
            <nav className="basis-1/2">
                <h3 className="text-2xl font-medium uppercase mb-4">Категории</h3>
                <ul className='flex flex-col items-start h-auto'>
                    {
                        categories.map((cat, index) => {
                            if (index > 4) {
                                return null
                            } else {
                                return <li key={cat.id} className="text-xl uppercase hover:text-stone-50 mb-3"><Link href={`/category/${cat.id}/1`}>{cat.name}</Link></li>
                            }

                        })
                    }
                </ul>
            </nav>
        </div>
    )
}
