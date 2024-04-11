export function StationPreview({ station, isMini, isPlaying }) {


    function handleClickPlay(ev, station) {
        console.log(station)
        ev.stopPropagation()

        if (!isPlaying) {
            //! PLAY
            setCurrStationIdx(station)
            setCurrSongIdx(0)
        } else {
            //! PAUSE
        }
        console.log('Playing music!')
    }

    function getPlayBtn() {
        return <button onClick={(ev) => { handleClickPlay(ev, station) }} className="preview-play-btn">{<svg width='24' height='24' viewBox="0 0 24 24">
            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
            >
            </path>
        </svg>} </button>
    }
    return (
        <article className="station-preview">
            {isMini && getPlayBtn()}
            <div className="img-container">
                <img className="station-img" src={station.imgUrl} alt={`${station.name}`} />
                {!isMini && getPlayBtn()}
            </div>

            <div className="station-content">
                <h3 className="station-name">{station.name}</h3>
                {!isMini && <h5 className="station-desc">{station.desc}</h5>}
            </div>
        </article>
    )
}
