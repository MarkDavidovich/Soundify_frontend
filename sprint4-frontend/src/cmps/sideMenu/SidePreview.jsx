import { useState } from "react"
import { UpdateStation } from "./UpdateStation"

export function SidePreview({ station, onRemoveStation, onTriggerUpdate, isContextMenuOpen, onContextMenuOpen, onContextMenuClose, contextMenuPosition }) {

    const [contextMenu, setContextMenu] = useState(null)

    function handleContextMenu(ev) {
        ev.preventDefault()
        onContextMenuOpen(station._id, ev.clientX - 2, ev.clientY - 4)
    }

    function handleClose() {
        setContextMenu(null);
    }

    function handleRemoveClick(ev) {
        ev.preventDefault()
        onRemoveStation(station._id)
        handleClose();
    }

    return (
        <div className="side-preview flex" onContextMenu={handleContextMenu}>
            <img className="side-preview-img" src={station.imgUrl} alt={station.name} />
            <span>{station.name}</span>

            {isContextMenuOpen && (
                <div
                    className="context-menu"
                    style={{
                        position: "absolute",
                        top: `${contextMenuPosition.mouseY}px`,
                        left: `${contextMenuPosition.mouseX}px`,
                    }}
                >
                    <ul className="menu-list clean-list">
                        <li onClick={() => { onTriggerUpdate() }}>Edit</li>
                        <li onClick={(ev) => { handleRemoveClick(ev) }}>Delete</li>
                    </ul>
                </div>
            )}
        </div>
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