import Router from "next/router"
import { FormEvent, useState } from "react"
import { AiOutlineSearch } from 'react-icons/ai'

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
        <div className="max-w-full flex">
            <form onSubmit={handleSubmitSearch} className="w-full flex relative" >
                <input
                    value={byTitle}
                    onChange={(e) => setByTitle(e.target.value)}
                    placeholder="Найти товар..."
                    className="
                        basis-11/12
                        border-primal
                        text-md
                        border-2
                        pl-2
                        py-2
                        pr-10
                        rounded-2xl
                        bg-gray-100
                        focus:outline-none
                    "
                />
                <button type="submit" className="absolute right-[7%] top-[22%] text-2xl"><AiOutlineSearch/></button>
            </form>
        </div>
    )
}
