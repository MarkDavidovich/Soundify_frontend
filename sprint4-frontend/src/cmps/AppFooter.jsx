import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { UserMsg } from './UserMsg.jsx'
import { SongPreview } from './SongPreview.jsx'
import ReactPlayer from 'react-player'
import { togglePlaying, setCurrSong } from '../store/actions/player.actions.js'

export function AppFooter() {

    // const stations = useSelector(storeState => storeState.stationModule.stations)

    const currSong = useSelector(storeState => storeState.playerModule.currSong)
    const currStation = useSelector(storeState => storeState.playerModule.currStation)
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

    // Volume states
    const [volume, setVolume] = useState(0.5)
    const [volumeSnapshot, setVolumeSnapshot] = useState(0.5)
    //! need to make it so the volume goes back to where it was after mute sets it to 0
    const [isMuted, setIsMuted] = useState(false)

    const [loop, setLoop] = useState(false)
    const [shuffle, setShuffle] = useState(false)

    // Time states
    const [progress, setProgress] = useState(0)
    const [currSongTime, setCurrSongTime] = useState(0)
    const [totalSongTime, setTotalSongTime] = useState(0)
    const [currSongRemainder, setCurrSongRemainder] = useState(0)
    const [showRemainder, setShowRemainder] = useState(false)

    const [isLiked, setIsLiked] = useState()

    const playerRef = useRef(null) //ref for the reactplayer cmp


    function play() {
        console.log(currSong)
        if (!currSong) return
        togglePlaying(isPlaying)

    }

    function handleProgress(state) {
        if (!state.loaded) return
        setProgress(state.playedSeconds)

        const totalDuration = playerRef.current ? playerRef.current.getDuration() : 0
        setCurrSongTime(state.playedSeconds)
        setTotalSongTime(totalDuration)
    }

    function handleSeek(ev) {
        const seekProgress = ev.target.value
        setProgress(seekProgress)
        playerRef.current.seekTo(seekProgress)
    }

    function handleVolumeChange(ev) {
        const newVolume = parseFloat(ev.target.value)
        setVolume(newVolume)
    }

    function handleEnd() {
        if (loop) {
            setProgress(0)
            playerRef.current.SeekTo(0)
            if (isPlaying) {
                playerRef.current.play()
            }
        } //else change song to the next one
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        const roundedSeconds = Math.round(remainingSeconds * 100) / 100
        const formattedSeconds = roundedSeconds === 0 ? '00' : roundedSeconds.toFixed(2).padStart(5, '0')

        return `${minutes}:${formattedSeconds.split('.')[0]}`
    }

    function handleMute() {
        console.log('mute clicked!')
        if (isMuted) {
            setIsMuted(!isMuted)
            setVolumeSnapshot(volume)
            setVolume(0)
            console.log('MUTED')
        } else {
            setIsMuted(!isMuted)
            setVolume(volumeSnapshot)
            console.log('UNMUTED')
        }
    }

    useEffect(() => {
        setCurrSongRemainder(totalSongTime - currSongTime) // updates the remaining time whenever the progress or total time changes
    }, [currSongTime, totalSongTime])

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

                    <button className="play-btn" onClick={() => {
                        play()
                    }}>play</button>

                    <div className="player-controls-right">

                        <button className="next-song-btn">{">"}</button>
                        <button className="loop-btn" onClick={() => {
                            setLoop(!loop)
                            console.log("loop:", loop)
                        }}>loop
                        </button>
                    </div>
                </div>
                <div className='progress-bar-container'>
                    {/* <div className="following-bar" style={{ width: `${ progress * 100 / 2 }% ` }}></div> */}
                    <span className='song-duration'>{formatTime(currSongTime)}</span>
                    <input
                        className='input-bar'
                        type='range'
                        id='progressRange'
                        name='progressRange'
                        min={0}
                        max={playerRef.current ? playerRef.current.getDuration() : 0}
                        step={0.1}
                        value={progress}
                        onChange={handleSeek}
                    />
                    <span className='song-remainder' onClick={() => {
                        setShowRemainder(!showRemainder)
                        setCurrSongRemainder(totalSongTime - currSongTime)
                    }}>
                        {showRemainder ? '-' + formatTime(currSongRemainder) : formatTime(totalSongTime)}
                    </span>
                </div>
            </div>
            <div className="player-extra-controls">
                <button className="playing-view-btn">▶️</button>
                <button className="lyrics-btn">🎤</button>
                <button className="queue-btn">📃</button>
                <button className="connect-device-btn">🖥️</button>
                {/* Check if muted to show icon (isMuted)*/}
                <div className='volume-controls'>
                    <button className="mute-btn" onClick={() => handleMute()}>🔇
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
                {/* <button className="mini-player-btn">mini player</button> */}
                {/* <button className="full-screen-btn">full screen</button> */}
            </div>
            <ReactPlayer
                className="react-player"
                ref={playerRef}
                url={currSong.url}
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
                onProgress={handleProgress}
                onEnded={handleEnd}
            />
        </footer>
    )
}