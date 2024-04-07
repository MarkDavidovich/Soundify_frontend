import { useState } from "react"
import { UpdateStation } from "./UpdateStation"
import { getActionCurrStationIdx } from "../../store/actions/player.actions"
import { useDispatch } from 'react-redux'

export function SidePreview({ station, onRemoveStation, onTriggerUpdate, isContextMenuOpen, onContextMenuOpen, onContextMenuClose, contextMenuPosition }) {
    const dispatch = useDispatch()

    const [contextMenu, setContextMenu] = useState(null)

    function handleContextMenu(ev) {
        ev.preventDefault()
        onContextMenuOpen(station._id, ev.clientX - 2, ev.clientY - 4)
    }

    function handleClose() {
        setContextMenu(null)
    }

    function handleRemoveClick(ev) {
        ev.preventDefault()
        onRemoveStation(station._id)
        handleClose()
    }

    function handleStationClick(station) {
        dispatch(getActionCurrStationIdx(station))
    }

    return (
        <div className="side-preview-line" onContextMenu={handleContextMenu} onClick={() => { handleStationClick(station) }}>
            <img className="side-preview-img" src={station.imgUrl} alt={station.name} />
            <div className="station-preview-details">
                <span className="station-name">{station.name}</span>
                <span className="station-created">{station.createdBy.fullname}</span>
            </div>

            {isContextMenuOpen && (
                <div
                    className="context-menu"
                    style={{
                        position: "absolute",
                        top: `${contextMenuPosition.mouseY}px`,
                        left: `${contextMenuPosition.mouseX}px`,
                    }}
                >
                    <div className="menu-list">
                        <button className="edit-btn flex" onClick={() => { onTriggerUpdate() }}>
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 ewCuAY">
                                <path d="M11.838.714a2.438 2.438 0 0 1 3.448 3.448l-9.841 9.841c-.358.358-.79.633-1.267.806l-3.173 1.146a.75.75 0 0 1-.96-.96l1.146-3.173c.173-.476.448-.909.806-1.267l9.84-9.84zm2.387 1.06a.938.938 0 0 0-1.327 0l-9.84 9.842a1.953 1.953 0 0 0-.456.716L2 14.002l1.669-.604a1.95 1.95 0 0 0 .716-.455l9.841-9.841a.938.938 0 0 0 0-1.327z"></path>
                            </svg>
                            Edit details
                        </button>

                        <div className="horizontal-line"></div>

                        <button className="delete-btn flex" onClick={(ev) => { handleRemoveClick(ev) }}>
                            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 ewCuAY">
                                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" className=""></path>
                                <path d="M12 8.75H4v-1.5h8v1.5z"></path>
                            </svg>
                            Delete
                        </button>

                    </div>
                </div>
            )
            }
        </div >
    )
}




/*
_id: utilService.makeId(),
name,
tags: [],
desc,
songs,
likedByUsers,
imgUrl,
createdBy: {
    _id: utilService.makeId(),
    fullname: '',
    imgUrl: 'https://robohash.org/userrobohash'
},
createdAt: utilService.randomAddedTime() ! */



// {contextMenu !== null && (
//     <div
//         style={{
//             position: "absolute",
//             top: `${contextMenu.mouseY}px`,
//             left: `${contextMenu.mouseX}px`,
//         }}
//         className="context-menu"
//     >
//         <ul className="menu-list clean-list">
//             <li onClick={() => { onTriggerUpdate(); handleClose() }}>Edit</li>
//             <li onClick={(ev) => { handleRemoveClick(ev); handleClose() }}>Delete</li>
//         </ul>
//     </div>
// )}