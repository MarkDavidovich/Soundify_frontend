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
            {/* <div className="search-container flex"> */}

                <input
                    type="text"
                    name="title"
                    placeholder="Search for songs"
                    onChange={handleChange}
                    value={input}
                />
            {/* </div> */}
            <svg data-encore-id="icon" role="img" aria-hidden="true" class="Svg-sc-ytk21e-0 dYnaPI sgZ_MgcS1NlccH19fYsa" viewBox="0 0 16 16"><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path></svg>

            <button type="submit">Search</button>
        </form>
    </div>
}