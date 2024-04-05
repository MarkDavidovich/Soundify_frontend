import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useDispatch, useSelector } from "react-redux"

import { stationService } from "../services/station.service.local"
import { getActionCurrSong, togglePlaying } from "../store/actions/player.actions"

export function StationDetails() {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currStation, setCurrStation] = useState(null)
    let isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

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
    }, [params])

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

    function handleSongClick(song) {
        dispatch(getActionCurrSong(song))
        togglePlaying(false)
    }

    function formatAddedTime(addedTime) {
        const diff = Date.now() - addedTime;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours === 0) {
                const minutes = Math.floor(diff / (1000 * 60));
                return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
            } else {
                return `${hours} hour${hours === 1 ? '' : 's'} ago`
            }
        } else if (days === 1) {
            return 'Yesterday';
        } else {
            return `${days} day${days === 1 ? '' : 's'} ago`
        }
    }

    if (!currStation) return <h4>loading...</h4>
    let StationDuration = calcStationDuration(currStation.songs)

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
                        <span>{currStation.songs.length} Songs, {StationDuration}</span>
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
                    <span className="date">Date added</span>
                    <span className="album">⏲</span>
                </div>
                <ul>
                    {currStation.songs.map((song, idx) => (
                        <>
                            <div className="song-preview">
                                <div className="song-num" onClick={() => handleSongClick(song)}>{idx + 1}</div>
                                <img className="song-img" src={song.imgUrl} alt="" />
                                <li className="clean-list" key={song.id}>
                                    <div className="song-info">
                                        <div className="song-title" title={song.title}> {song.title}</div>
                                        <a className="song-artist" href="#" title={song.artist}>{song.artist}</a>
                                    </div>
                                    <a className="song-album" href="#" title={song.album}> {song.album}</a>
                                    <span className="song-added-time">{formatAddedTime(song.addedAt)}</span>

                                </li>
                            </div>
                        </>
                    ))}

                </ul>

            </div>
        </div>
    )
}
