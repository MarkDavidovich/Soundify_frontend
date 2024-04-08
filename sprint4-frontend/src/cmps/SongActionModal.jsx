import { useDispatch } from "react-redux"
import { getActionUpdateStation } from "../store/actions/station.actions"

export function SongActionModal({song, currStation}) {

const dispatch = useDispatch()


    
    function handleClose() {
        // setContextMenu(null)
    }

    async function handleRemoveSong(songId) {
        console.log("🚀 ~ file: songActionModal.jsx:11 ~ handleRemoveSong ~ song:", songId)
        const songIdx = currStation.songs.findIndex(song => song.id === songId);
        if (songIdx !== -1) { 
            currStation.songs.splice(songIdx, 1)
    
            const updatedStation = { ...currStation, songs: [...currStation.songs] }
            console.log("🚀 ~ file: songActionModal.jsx:23 ~ handleRemoveSong ~ updatedStation:", updatedStation)
    
            try {
                await dispatch(getActionUpdateStation(updatedStation))
                showSuccessMsg('Song removed successfully')
            } catch (err) {
                console.error('Failed to remove song:', err)
            }
        }
        handleClose()
    }

    function handleContextMenu(ev) {
        ev.preventDefault()
        onContextMenuOpen(song.id, ev.clientX - 2, ev.clientY - 4)
    }

    return (
        <div
            className="context-menu"
            // style={{
            //     position: "absolute",
            //     top: `${contextMenuPosition.mouseY}px`,
            //     left: `${contextMenuPosition.mouseX}px`,
            // }}
        >
            {/* <div className="menu-list">
                <button className="edit-btn flex" onClick={() => { onTriggerUpdate() }}>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 ewCuAY">
                        <path d="M11.838.714a2.438 2.438 0 0 1 3.448 3.448l-9.841 9.841c-.358.358-.79.633-1.267.806l-3.173 1.146a.75.75 0 0 1-.96-.96l1.146-3.173c.173-.476.448-.909.806-1.267l9.84-9.84zm2.387 1.06a.938.938 0 0 0-1.327 0l-9.84 9.842a1.953 1.953 0 0 0-.456.716L2 14.002l1.669-.604a1.95 1.95 0 0 0 .716-.455l9.841-9.841a.938.938 0 0 0 0-1.327z"></path>
                    </svg>
                    Edit details
                </button> */}
    
                <div className="horizontal-line"></div>
    
                <button className="delete-btn flex" onClick={(ev) => { handleRemoveSong(song.id)}}>
                    <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 ewCuAY">
                        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" className=""></path>
                        <path d="M12 8.75H4v-1.5h8v1.5z"></path>
                    </svg>
                    Delete
                </button>
            {/* </div> */}
        </div>
    )
    
    
}
