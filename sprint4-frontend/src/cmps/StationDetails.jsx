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
    }, [currStation])

    function calcStationDuration(songs) {
        let totalDurationInSeconds = 0
    
        songs.forEach(song => {
            const [minutes, seconds] = song.duration.split(':')
    
            totalDurationInSeconds += parseInt(minutes, 10) * 60 + parseInt(seconds, 10)
        });
    
        const totalMinutes = Math.floor(totalDurationInSeconds / 60)
        const totalSeconds = totalDurationInSeconds % 60
    
        return `${totalMinutes} min ${totalSeconds.toString().padStart(2, '0')} sec`
    }
    
    console.log("🚀 ~ file: StationDetails.jsx:43 ~ StationDetails ~ currStation:", currStation)

    // let StationDuration = calcStationDuration(currStation.songs)
    



    if (!currStation) return <h4>loading...</h4>
    // const { _id, name, songs, imgUrl } = currStation
    return (
        <div className="station-details flex">
            <div className="station-data-container">
                <div className="info-station">
                    <img className="station-img" src={currStation.imgUrl} alt="" />
                    <span className="playlist">Playlist</span>
                    <h1>{currStation.name}</h1>
                    <div className="user-info">
                    <div className="created-by">{currStation.createdBy.fullname}</div>
                    <img className="user-img" src={currStation.createdBy.imgUrl} alt="" />
                    </div>
                    <div className="info-songs">
                        <span>{currStation.songs.length} Songs, </span>
                    </div>
                </div>
                <div className="menu-station">
                        <button className="play-btn btn"><span>⏯</span></button>
                        <button className="opt-btn btn"><span>...</span></button>
                        <button className="display-station-btn btn"><span>List</span>🍔</button>
                    </div>
                    <div className="heading-station">
                        <div className="hash">#</div>
                        <span className="title">Title</span>
                        <span className="album">Album</span>
                    </div>
                <ul>
                    {currStation.songs.map((song, idx) => (
                        <li className="clean-list" key={song.id}>
                            <img className="song-img" src={song.imgUrl} alt="" />
                            <div>Title: {song.title}</div>
                            <div>Artist: {song.artist}</div>
                            <div>Album: {song.album}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
