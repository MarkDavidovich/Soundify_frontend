

export function SideSort({ sortBy, onSetSort }) {

    function handleSort(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    return <div className="side-sort-container flex">
        <button onClick={() => handleSort('station')}>Playlist</button>
        <button onClick={() => handleSort('artist')}>Artists</button>
    </div>
}