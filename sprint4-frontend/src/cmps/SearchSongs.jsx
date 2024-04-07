import { useState } from "react"


export function SearchSongs({ searchSongs }) {

    const [input, setInput] = useState('')

    function handleChange({ target }) {
        const value = target.value
        setInput(value)
    }

    function onSearch(ev) {
        ev.preventDefault()
        searchSongs(input)
        setInput('')
    }

    return <div className="search-song">

        <form onSubmit={onSearch}>
            <input
                type="text"
                name="title"
                placeholder="Search for songs"
                onChange={handleChange}
                value={input}
            />

            <button type="submit">Search</button>
        </form>
    </div>
}