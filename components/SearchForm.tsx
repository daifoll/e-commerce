import Router from "next/router"
import { FormEvent, useState } from "react"

export default function SearchForm() {
    const [byTitle, setByTitle] = useState('')

    function handleSubmitSearch(event: FormEvent) {
        event.preventDefault()

        Router.push({
            pathname: `/search`,
            query: { byTitle, page: '0' }
        })
    }
    return (
        <div className="max-w-full flex mt-2">
            <form onSubmit={handleSubmitSearch} className="w-full flex" >
                <input
                    value={byTitle}
                    onChange={(e) => setByTitle(e.target.value)}
                    placeholder="Найти товар"
                    className="
                        basis-11/12
                        h-16
                        text-2xl
                        border-yellow-300
                        border-2
                    "
                />
                <button
                    type="submit"
                    className="
                        uppercase
                        grow
                        text-xl
                        font-medium
                        bg-amber-300
                        hover:text-stone-50
                    ">
                    Поиск
                </button>
            </form>
        </div>
    )
}
