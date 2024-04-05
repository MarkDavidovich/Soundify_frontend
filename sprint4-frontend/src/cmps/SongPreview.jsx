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
          <svg data-encore-id="icon" width="16" height="16" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" fill="white"></path>
            <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z" fill="white"></path>
          </svg>
        </button>
      </div>
    ))
}

//! WHY IS THE + STILL RENDERING????????
