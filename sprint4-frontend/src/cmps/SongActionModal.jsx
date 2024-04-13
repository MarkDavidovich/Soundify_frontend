import { useDispatch } from "react-redux"
import { updateStation } from "../store/actions/station.actions"
import { useState } from "react"

export function SongActionModal({ song, currStation }) {

    const [contextMenu, setContextMenu] = useState(null)

    const dispatch = useDispatch()

    function handleContextMenu(ev) {
        ev.preventDefault()
        onContextMenuOpen(song.id, ev.clientX - 2, ev.clientY - 4)
    }

    function handleClose() {
        setContextMenu(null)
    }

    async function handleRemoveSong(songId) {
        const songIdx = currStation.songs.findIndex(song => song.id === songId)
        if (songIdx !== -1) {
            currStation.songs.splice(songIdx, 1)

            const updatedStation = { ...currStation, songs: [...currStation.songs] }

            try {
                await dispatch(updateStation(updatedStation))
                showSuccessMsg('Song removed successfully')
            } catch (err) {
                console.error('Failed to remove song:', err)
            }
        }
        handleClose()
    }

    async function handleAddSongFromSearch(selectedSong) {
        const updatedStation = {
            ...currStation,
            songs: [...currStation.songs, selectedSong]
        };
        try {
            await dispatch(updateStation(updatedStation))
            showSuccessMsg('Song added successfully')
        } catch (err) {
            console.error('Failed to add song:', err)
        }
    }

    function handleSongClick(song) {
        console.log("🚀 ~ handleSongClick ~ song:", song)

    }


    return (

        <section className="context-menu">

            <button className="delete-btn flex" onClick={(ev) => { handleRemoveSong(song.id) }}>
                <svg
                    data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 ewCuAY">
                    <path d="M5.25 3v-.917C5.25.933 6.183 0 7.333 0h1.334c1.15 0 2.083.933 2.083 2.083V3h4.75v1.5h-.972l-1.257 9.544A2.25 2.25 0 0 1 11.041 16H4.96a2.25 2.25 0 0 1-2.23-1.956L1.472 4.5H.5V3h4.75zm1.5-.917V3h2.5v-.917a.583.583 0 0 0-.583-.583H7.333a.583.583 0 0 0-.583.583zM2.986 4.5l1.23 9.348a.75.75 0 0 0 .744.652h6.08a.75.75 0 0 0 .744-.652L13.015 4.5H2.985z">
                    </path>
                </svg>
                <span>Remove from this playlist</span>
            </button>

            {/* <div className="horizontal-line-modal"></div> */}

            {/* <div className="menu-list"> */}
            {/* <button className="edit-btn flex" onClick={() => { onTriggerUpdate() }}>
                <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 ewCuAY">
                    <path d="M11.838.714a2.438 2.438 0 0 1 3.448 3.448l-9.841 9.841c-.358.358-.79.633-1.267.806l-3.173 1.146a.75.75 0 0 1-.96-.96l1.146-3.173c.173-.476.448-.909.806-1.267l9.84-9.84zm2.387 1.06a.938.938 0 0 0-1.327 0l-9.84 9.842a1.953 1.953 0 0 0-.456.716L2 14.002l1.669-.604a1.95 1.95 0 0 0 .716-.455l9.841-9.841a.938.938 0 0 0 0-1.327z"></path>
                </svg>
                Edit details
            </button> */}
            {/* </div> */}
            {/* <section>
                <ThemesPage onSongSelect={handleAddSongFromSearch} />

            </section> */}


        </section>
    )


}