//SHOWS THE STATIONS, ARTISTS IN A LIST

export function SidePreview({ station, onRemoveStation, onUpdateStation }) {

    //! Switch to Right Click
    function handleRemoveClick(ev) {
        ev.preventDefault()
        onRemoveStation(station._id)
    }

    //! Switch to Right Click
    function handleUpdateClick(ev) {
        ev.preventDefault()

        onUpdateStation(station)
    }

    return (
        <div className="side-preview flex">
            <img className="side-preview-img" src={station.imgUrl} alt={station.name} />
            <span>{station.name}</span>
            <button className="btn" onClick={handleRemoveClick}>X</button>
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