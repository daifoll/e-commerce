import Link from "next/link";

export default function Footer({ categories }: IFooterProps) {

    return (
        <div className='p-14 bg-primal flex drop-shadow-lg'>
            <nav className="basis-1/2">
                <h3 className="text-2xl font-medium uppercase mb-4">Категории</h3>
                <ul className='flex flex-col items-start h-auto'>
                    {
                        categories.map((cat, index) => {
                            if (index > 4) {
                                return null
                            } else {
                                return <li key={cat.id} className="uppercase hover:text-stone-50 text-lg mb-3"><Link href={`/category/${cat.id}/1`}>{cat.name}</Link></li>
                            }

                        })
                    }
                </ul>
            </nav>
            <nav className="basis-1/2">
                <h3 className="text-2xl font-medium uppercase mb-4">Контакты</h3>
                <ul className='flex flex-col items-start h-auto'>
                    <li className='hover:text-stone-50 text-lg mb-3'><a href="mailto:kobykhnov.bl@gmail.com">kobykhnov.bl@gmail.com</a></li>
                    <li className='hover:text-stone-50 text-lg mb-3'><a href="https://t.me/+79965003886" target="_blank">Telegram</a></li>
                    {/* <li className='hover:text-stone-50 uppercase text-lg mb-3'><Link href={'/about'}>О проекте</Link></li>
                    <li className='hover:text-stone-50 uppercase text-lg mb-3'><Link href={'/contacts'}>Контакты</Link></li>
                    <li className='hover:text-stone-50 uppercase text-lg mb-3'><Link href={'/cart'}>Корзина</Link></li> */}
                </ul>
            </nav>
        </div>
    )
}
