import { useState } from "react"
import { useSelector } from "react-redux"
import useMediaQuery from '@mui/material/useMediaQuery'


export function SideSort({ sortBy, onSetSort }) {

    const [selectedSort, setSelectedSort] = useState(sortBy.by)
    const toggleLibrary = useSelector(storeState => storeState.layoutModule.toggleLibrary)

    const matchesNarrow = useMediaQuery('(max-width: 720px)')
    function handleSort(by) {
        setSelectedSort(by)

        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function getBtnClass(by) {
        return selectedSort === by ? 'btn-clicked' : 'btn'
    }

    const dynamicClass = toggleLibrary || matchesNarrow ? '-collapsed' : ''

    return <div className={'side-sort-container' + dynamicClass}>
        <button className={getBtnClass('station')} onClick={() => handleSort('station')}>Playlists</button>

        <button className={getBtnClass('artist')} onClick={() => handleSort('artist')}>Artists</button>
    </div >
}