import Link from "next/link";

export default function Footer({ categories }: IFooterProps) {

    return (
        <div className='p-5 extra-sm:p-14 bg-primal flex flex-col sm:flex-row drop-shadow-lg'>
            <nav className="basis-1/2">
                <h3 className="text-xl extra-sm:text-2xl font-medium uppercase mb-4">Категории</h3>
                <ul className='flex flex-col items-start h-auto'>
                    {
                        categories.map((cat, index) => {
                            if (index > 4) {
                                return null
                            } else {
                                return <li key={cat.id} className="uppercase hover:text-stone-50 text-sm extra-sm:text-lg mb-3"><Link aria-label={cat.name} href={`/category/${cat.id}/1`}>{cat.name}</Link></li>
                            }

                        })
                    }
                </ul>
            </nav>
            <nav className="basis-1/2 mt-10 sm:mt-0">
                <h3 className="text-xl extra-sm:text-2xl font-medium uppercase mb-4">Контакты</h3>
                <ul className='flex flex-col items-start h-auto'>
                    <li className='hover:text-stone-50 text-sm extra-sm:text-lg mb-3'><a aria-label="kobykhnov.bl@gmail.com" href="mailto:kobykhnov.bl@gmail.com">kobykhnov.bl@gmail.com</a></li>
                    <li className='hover:text-stone-50 text-sm extra-sm:text-lg mb-3'><a aria-label="GitHub" href="https://github.com/daifoll/e-commerce" target="_blank">GitHub</a></li>
                </ul>
            </nav>
        </div>
    )
}
