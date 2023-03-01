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
        <form onSubmit={handleSubmitSearch} >
            <input value={byTitle} onChange={(e) => setByTitle(e.target.value)} placeholder="Найти товар" />
            <button type="submit" className="uppercase">Найти</button>
        </form>
    )
}
