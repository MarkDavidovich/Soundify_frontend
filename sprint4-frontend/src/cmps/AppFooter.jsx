import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { UserMsg } from './UserMsg.jsx'
import { SongPreview } from './SongPreview.jsx'
import ReactPlayer from 'react-player'
import { togglePlaying, setCurrSong } from '../store/actions/player.actions.js'

export function AppFooter() {
    const stations = useSelector(storeState => storeState.stationModule.stations)

    const currSong = useSelector(storeState => storeState.playerModule.currSong)
    const currStation = useSelector(storeState => storeState.playerModule.currStation)
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

    const [volume, setVolume] = useState(0.5)
    const [isMuted, setIsMuted] = useState(false)
    const [loop, setLoop] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [isLiked, setIsLiked] = useState()

    function handleVolumeChange(ev) {
        const newVolume = parseFloat(ev.target.value)
        setVolume(newVolume)
        console.log('curr volume:', volume)
    }

    function play() {
        if (!currSong) return
        togglePlaying(isPlaying)
    }

    return (
        <footer className="app-footer">
            <div className="song-details-container">
                <SongPreview />
            </div>

            <div className='controls-main-container'>
                <div className='player-controls-main'>
                    <div className="player-controls-left">
                        <button className="shuffle-btn" onClick={() => {
                            setShuffle(!shuffle)
                            console.log("shuffle:", shuffle)
                        }}>shuffle
                        </button>
                        <button className="prev-song-btn">{"<"}</button>
                    </div>

                    <button className="play-btn" onClick={() => play()}>play</button>

                    <div className="player-controls-right">

                        <button className="next-song-btn">{">"}</button>
                        <button className="loop-btn" onClick={() => {
                            setLoop(!loop)
                            console.log("loop:", loop)
                        }}>loop
                        </button>
                    </div>
                </div>
                <div className='progress-bar'>
                    ___THIS___IS____THE____PROGRESS___BAR__:D____
                </div>
            </div>
            <div className="player-extra-controls">
                <button className="playing-view-btn">▶️</button>
                <button className="lyrics-btn">🎤</button>
                <button className="queue-btn">📃</button>
                <button className="connect-device-btn">🖥️</button>
                {/* Check if muted to show icon (isMuted)*/}
                <div className='volume-controls'>
                    <button className="mute-btn" onClick={() => {
                        setIsMuted(!isMuted)
                        console.log("mute:", isMuted)
                    }}>🔇
                    </button>
                    <div className="volume-bar">
                        <label htmlFor="volumeRange"></label>
                        <input
                            className='input-bar'
                            type='range'
                            id='volumeRange'
                            name='volumeRange'
                            min='0'
                            max='1'
                            step='0.05'
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </div>
                </div>
                <button className="mini-player-btn">MP</button>
                <button className="full-screen-btn">FS</button>
            </div>
            <ReactPlayer
                className="react-player"
                // ref={playerRef}
                url={currSong}
                config={{
                    youtube: {
                        playerVars: {
                            showinfo: 1,
                        }
                    }
                }}
                width="0%"
                height="0%"
                playing={isPlaying}
                volume={volume}
                muted={isMuted}
                loop={loop}
            />
        </footer>
    )
}