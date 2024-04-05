import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { stationService } from "../services/station.service.local"


export function StationDetails() {

    const params = useParams()
    const navigate = useNavigate()
    const [currStation, setCurrStation] = useState(null)

    useEffect(() => {
        const { id } = params
        stationService.getById(id)
            .then(station => {
                if (!station) return navigate('/')
                setCurrStation(station)
            })
            .catch(() => {
                showErrorMsg('Had issues loading station')
            })
    }, [])

    console.log("🚀 ~ file: StationDetails.jsx:45 ~ StationDetails ~ currStation:", currStation)



    if (!currStation) return <h4>loading...</h4>
    // const { _id, name, songs, imgUrl } = currStation
    return (
        <div className="station-details flex">
            <div className="station-data-container">
                <span className="playlist">Playlist</span>
                <h1>{currStation.name}</h1>
                <div className="created-by">{currStation.createdBy.fullname}</div>
                <img className="station-img" src={currStation.createdBy.imgUrl} alt="" />
                <img className="station-img" src={currStation.imgUrl} alt="" />
                <ul>
                    {currStation.songs.map((song, idx) => (
                        <li className="clean-list" key={song.id}>
                            <img className="station-img" src={song.imgUrl} alt="" />
                            <div>Title: {song.title}</div>
                            <div>Artist: {song.artist}</div>
                            <div>Album: {song.album}</div>
                            {/* Render other song details as needed */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
