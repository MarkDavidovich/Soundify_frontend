import { useState } from "react"


export function SideSort({ sortBy, onSetSort }) {

    const [selectedSort, setSelectedSort] = useState(sortBy.by)

    function handleSort(by) {
        setSelectedSort(by)

        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    // function onSetToggleClick() {
    //     setToggleClick(!toggleClick)
    // }

    // function setBtnClass() {
    //     if (!toggleClick) return 'btn'
    //     else return 'btn-clicked'
    // }

    function getBtnClass(by) {
        return selectedSort === by ? 'btn-clicked' : 'btn'
    }

    return <div className="side-sort-container flex">
        <button className={getBtnClass('station')} onClick={() => handleSort('station')}>Playlist</button>

        <button className={getBtnClass('artist')} onClick={() => handleSort('artist')}>Artists</button>
    </div >
}