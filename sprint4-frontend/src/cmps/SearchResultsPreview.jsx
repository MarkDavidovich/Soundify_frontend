export function SearchResultsPreview({ songs }) {



    return (
        <div className="song-list">
            {songs?.map(song => (
                <div className="song-preview " key={song.id}>
                    <div className="song-info">
                        <div className="basic-song-info flex">
                            <img src={song.imgUrl} alt="Song artwork" />
                            <div className="song-desc">
                                <span className='song-title'>
                                    {song.title}
                                </span>
                                <span className='song-artist'>
                                    <h4> {song.artist}</h4>
                                </span>
                            </div>
                        </div>
                        <div className="the">
                            {songs.album}
                        </div>
                        {/* <div className="add-song">
                            <button className="add-song-btn" onClick={() => handleAddSongFromSearch(song)}>
                                Add
                            </button>
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
    )
}