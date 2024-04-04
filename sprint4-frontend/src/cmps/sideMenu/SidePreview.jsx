//SHOWS THE STATIONS, ARTISTS IN A LIST
import { useState } from "react"
import { UpdateStation } from "./UpdateStation"

export function SidePreview({ station, onRemoveStation, onUpdateStation }) {

    const [isOnUpdate, setIsOnUpdate] = useState(false)

    //! Switch to Right Click
    function handleRemoveClick(ev) {
        ev.preventDefault()
        onRemoveStation(station._id)
    }

    // //! Switch to Right Click
    function handleUpdateClick(ev) {
        ev.preventDefault()

        // onUpdateStation(station)
        setIsOnUpdate(true)
    }

    return (
        <div className="side-preview flex">
            <img className="side-preview-img" src={station.imgUrl} alt={station.name} />
            <span>{station.name}</span>
            <button className="btn" onClick={handleRemoveClick}>X</button>

            {isOnUpdate && (
                <UpdateStation
                    station={station}
                    onUpdateStation={(updatedStation) => {
                        onUpdateStation(updatedStation)
                        setIsOnUpdate(false)
                    }}
                    setIsOnUpdate={setIsOnUpdate}
                />
            )}
            <button className="btn" onClick={handleUpdateClick}>Update</button>


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