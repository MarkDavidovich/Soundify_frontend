import React from 'react'
import { useSelector } from 'react-redux'

export function SongPreview() {

  const currSong = useSelector(storeState => storeState.playerModule.currSong)

  return (
    currSong && (
      <div className='song-details'>
        <img className='song-img' src={currSong.imgUrl} />
        <div className='title-artist-container'>
          <div className='song-title' >
            {/* LINK TO PLAYLIST */}
            {currSong.title}
          </div>
          <div className='artist-name'>
            {/* LINK TO ARTIST */}
            {currSong.artist}
          </div>

        </div>
        <button className='song-like'>
          {/* ADD TO LIKED SONGS STATION */}
          (+)
        </button>
      </div>
    ))
}
