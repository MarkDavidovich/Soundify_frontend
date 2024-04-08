import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SongPreview } from './SongPreview.jsx'
import ReactPlayer from 'react-player'
import { togglePlaying, getActionCurrSongIdx } from '../store/actions/player.actions.js'
import { useDispatch } from 'react-redux'
import { utilService } from '../services/util.service.js'

export function AppFooter() {

    // global states
    const stations = useSelector(storeState => storeState.stationModule.stations)
    const currSongIdx = useSelector(storeState => storeState.playerModule.currSongIdx)
    const currStationIdx = useSelector(storeState => storeState.playerModule.currStationIdx)
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

    // Volume states
    const [volume, setVolume] = useState(0.5)
    const [volumeSnapshot, setVolumeSnapshot] = useState(0.5)
    const [isMuted, setIsMuted] = useState(false)

    // Playback states
    const [loop, setLoop] = useState(false)
    const [shuffle, setShuffle] = useState(false)

    // Time states
    const [progress, setProgress] = useState(0)
    const [currSongTime, setCurrSongTime] = useState(0)
    const [totalSongTime, setTotalSongTime] = useState(0)
    const [currSongRemainder, setCurrSongRemainder] = useState(0)
    const [showRemainder, setShowRemainder] = useState(false)
    const [prevSongIdx, setPrevSongIdx] = useState(null)

    // const [isLiked, setIsLiked] = useState()

    const dispatch = useDispatch()
    const currStation = stations[currStationIdx]
    const currSong = currStation?.songs[currSongIdx]
    let shuffledSongIndices = []
    const likedSongsStation = stations.find(station => station._id === 'liked-songs')

    const playerRef = useRef(null) //ref for the reactplayer cmp

    function play() {
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
        if (isMuted) setIsMuted(!isMuted)
        const newVolume = parseFloat(ev.target.value)
        setVolume(newVolume)
        setVolumeSnapshot(volume)
    }

    function handleEnd() {
        if (loop) {
            setProgress(0)
            playerRef.current.SeekTo(0)
            if (isPlaying) {
                playerRef.current.play()
            }
        } else {
            goToNextSong()
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        const roundedSeconds = Math.round(remainingSeconds * 100) / 100
        const formattedSeconds = roundedSeconds === 0 ? '00' : roundedSeconds.toFixed(2).padStart(5, '0')

        return `${minutes}:${formattedSeconds.split('.')[0]}`
    }

    function handleMute() {
        if (isMuted || volume === 0) {
            setVolume(volumeSnapshot)
        } else {
            setVolumeSnapshot(volume)
            setVolume(0)
        }
        setIsMuted(!isMuted)
    }

    function goToPrevSong() {

        if (!currSong.title || !currStation._id) return

        if (shuffle) {
            if (prevSongIdx !== null) {
                if (currSongIdx === prevSongIdx) {
                    playerRef.current.seekTo(0)
                } else {
                    dispatch(getActionCurrSongIdx(prevSongIdx))
                }
            }
        } else {
            if (currSongIdx > 0) {
                dispatch(getActionCurrSongIdx(currSongIdx - 1))
            } else {
                setProgress(0)
                playerRef.current.seekTo(0)
            }
        }
    }

    function goToNextSong() {

        if (!currStation || !currStation.songs || currStation.songs.length === 0) return
        if (!isPlaying) togglePlaying(isPlaying)
        const currStationLen = currStation.songs.length

        let nextSongIdx
        if (shuffle) {
            if (shuffledSongIndices.length !== currStationLen) {
                shuffledSongIndices = utilService.shuffleArray(utilService.createIndexArray(currStationLen))
            }
            nextSongIdx = shuffledSongIndices[(currSongIdx + 1) % currStationLen]
        } else {
            nextSongIdx = (currSongIdx + 1) % currStationLen
        }
        dispatch(getActionCurrSongIdx(nextSongIdx))
    }

    function handleSongLike(song) {
        dispatch(AddToLikedSongs(song))
    }

    useEffect(() => {
        setCurrSongRemainder(totalSongTime - currSongTime) // updates the remaining time whenever the progress or total time changes
    }, [currSongTime, totalSongTime])

    // if (!currSong) return <div className=' flex justify-center'>Nothing to display yet!</div>

    return (
        <footer className="app-footer">
            {currSong && <div className="song-details-container">
                <SongPreview
                    currSong={currSong}
                    handleSongLike={handleSongLike} />
            </div>}
            <div className='controls-main-container'>
                <div className='player-controls-main'>
                    <div className="player-controls-left">
                        <button className={'shuffle-btn' + (shuffle ? ' active' : '')} onClick={() => {
                            setShuffle(!shuffle)
                            if (!shuffle) setPrevSongIdx(currSongIdx)
                        }}>
                            <svg width="16" height="16" viewBox="0 0 59 50" xmlns="http://www.w3.org/2000/svg">
                                <path d="M47.2475 42.0835C47.3524 42.0835 47.4479 42.138 47.486 42.2378C47.5338 42.3286 47.5057 42.4375 47.4294 42.51C46.6373 43.2632 45.0527 44.7695 45.0527 44.7695C43.9648 45.8039 43.9648 47.4825 45.0527 48.517C46.1405 49.5514 47.8967 49.5514 48.9845 48.517C48.9845 48.517 56.208 41.6571 58.1261 39.8242C58.2501 39.7062 58.3169 39.5429 58.3169 39.3795C58.3169 39.2162 58.2501 39.0528 58.1261 38.9349C56.208 37.1019 48.9845 30.2419 48.9845 30.2419C47.8967 29.2075 46.1405 29.2075 45.0527 30.2419C43.9648 31.2763 43.9648 32.9551 45.0527 33.9895C45.0527 33.9895 46.7228 35.5774 47.5434 36.3578C47.6198 36.4304 47.6486 36.5393 47.6008 36.63C47.5627 36.7298 47.4673 36.7844 47.3623 36.7844C45.9118 36.7844 42.5149 36.7752 42.5149 36.7752C41.2362 36.7752 39.9569 36.1854 38.6114 35.3233C36.9032 34.2163 35.1762 32.6557 33.4203 30.8409C33.4203 30.8409 32.3899 29.7792 31.8555 29.2257C31.7696 29.1349 31.6551 29.0805 31.5215 29.0805C31.3974 29.0715 31.2734 29.1167 31.1875 29.1984C30.4145 29.8789 28.5631 31.4942 27.7902 32.1747C27.6947 32.2564 27.6373 32.3653 27.6373 32.4833C27.6278 32.6012 27.6759 32.7192 27.7618 32.8099C28.2962 33.3634 29.3267 34.4252 29.3267 34.4252C33.8022 39.0438 38.3637 42.0654 42.5052 42.0654C42.5052 42.0654 45.8256 42.0744 47.2475 42.0835ZM47.4294 7.57519C47.5057 7.64778 47.5338 7.74759 47.486 7.8474C47.4479 7.93814 47.3524 8.00159 47.2475 8.00159C45.8256 8.00159 42.5052 8.01063 42.5052 8.01063C39.5947 8.01063 36.4935 9.4172 33.4017 11.8853C29.5178 14.9886 25.4902 19.8251 21.4823 24.6797C17.7225 29.2167 13.9919 33.7808 10.3562 36.6844C8.43811 38.2179 6.63396 39.3251 4.83039 39.3251C4.83039 39.3251 1.85309 39.3251 0.679342 39.3251C0.412148 39.3251 0.202209 39.5246 0.202209 39.7696C0.202209 40.7768 0.202209 43.1633 0.202209 44.1614C0.202209 44.2885 0.250519 44.3973 0.336403 44.4881C0.431829 44.5697 0.545745 44.6151 0.679342 44.6151C1.47138 44.6151 2.98896 44.6151 2.98896 44.6151H4.83039C7.75045 44.6151 10.8429 43.2178 13.9347 40.7406C17.8185 37.6373 21.8455 32.8009 25.863 27.9463C29.6133 23.4093 33.3534 18.845 36.9891 15.9413C38.9072 14.4078 40.7017 13.3008 42.5052 13.3008H42.5149C42.5149 13.3008 45.9118 13.2918 47.3623 13.2918C47.4673 13.2918 47.5627 13.3552 47.6008 13.446C47.6486 13.5367 47.6198 13.6456 47.5434 13.7182C46.7228 14.5076 45.0527 16.0957 45.0527 16.0957C43.9648 17.1301 43.9648 18.7997 45.0527 19.8341C46.1405 20.8685 47.8967 20.8685 48.9845 19.8341C48.9845 19.8341 56.208 12.9741 58.1261 11.1412C58.2501 11.0232 58.3169 10.8691 58.3169 10.6967C58.3169 10.5333 58.2501 10.37 58.1261 10.252C56.208 8.42814 48.9845 1.55906 48.9845 1.55906C47.8967 0.533699 46.1405 0.533699 45.0527 1.55906C43.9648 2.59349 43.9648 4.27225 45.0527 5.30669C45.0527 5.30669 46.6373 6.81297 47.4294 7.57519ZM2.98896 10.7601H4.83039C6.43356 10.7601 8.03717 11.6493 9.72622 12.9106C11.8638 14.4985 14.0301 16.7127 16.2249 19.1809C16.2249 19.1809 17.1977 20.2788 17.713 20.8595C17.7893 20.9503 17.914 21.0047 18.038 21.0137C18.1621 21.0319 18.2855 20.9865 18.381 20.9139C19.1825 20.2697 21.1006 18.727 21.9117 18.0828C22.0072 18.0011 22.0647 17.8923 22.0743 17.7744C22.0838 17.6564 22.0455 17.5383 21.9691 17.4476C21.4538 16.8668 20.4714 15.7689 20.4714 15.7689C17.4845 12.4024 14.5069 9.48973 11.6251 7.684C9.32528 6.24124 7.03475 5.46088 4.83039 5.46088H0.202209V10.7601H2.98896Z"
                                    fill="#b3b3b3"
                                    stroke='#b3b3b3'
                                />
                            </svg>
                        </button>
                        <button className="prev-song-btn" onClick={goToPrevSong}>
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"
                                    fill="#b3b3b3"
                                    stroke='#b3b3b3'>
                                </path>
                            </svg>
                        </button>
                    </div>

                    <button className="play-btn" onClick={play}>
                        {isPlaying ? (<svg width="17" height="17" viewBox="0 0 16 16">
                            <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
                            >
                            </path>
                        </svg>) : (<svg width="17" height="17" viewBox="0 0 16 16" >
                            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                            >
                            </path>
                        </svg>)
                        }

                    </button>

                    <div className="player-controls-right">

                        <button className="next-song-btn" onClick={goToNextSong}>
                            <svg width="16" height="16" viewBox="0 0 16 16" >
                                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"
                                    fill="#b3b3b3"
                                    stroke='#b3b3b3'>
                                </path>
                            </svg>
                        </button>
                        <button className={'loop-btn' + (loop ? ' active' : '')} onClick={() => {
                            setLoop(!loop)
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"
                                    fill="#b3b3b3"
                                    stroke="#b3b3b3"
                                >
                                </path>
                            </svg>
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
                {/* <button className="playing-view-btn">▶️</button>
                <button className="lyrics-btn">🎤</button>
                <button className="queue-btn">📃</button>
                <button className="connect-device-btn">🖥️</button> */}

                <div className='volume-controls'>
                    <button className="mute-btn" onClick={handleMute}>
                        {isMuted || volume === 0 ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" >
                                <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"
                                    fill="black"
                                    stroke="black"
                                >
                                </path>
                                <svg width="16" height="16" viewBox="0 0 16 16" >
                                    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"
                                        fill="#b3b3b3"
                                        stroke="#b3b3b3"
                                    >
                                    </path>
                                    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"
                                        fill="#b3b3b3"
                                        stroke="#b3b3b3"
                                    >
                                    </path>
                                </svg>
                            </svg>
                        ) : volume < 0.33 ? (
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"
                                    fill="#b3b3b3"
                                    stroke="#b3b3b3"
                                >
                                </path>
                            </svg>
                        ) : volume < 0.65 ? (
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"
                                    fill="#b3b3b3"
                                    stroke="#b3b3b3"
                                >
                                </path>
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"
                                    fill="#b3b3b3"
                                    stroke="#b3b3b3"
                                >
                                </path>
                                <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"
                                    fill="#b3b3b3"
                                    stroke="#b3b3b3"
                                >
                                </path>
                            </svg>
                        )}

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
                            step='0.01'
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
                url={currSong?.url}
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