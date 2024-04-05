import React from 'react'

export function SongPreview(song, isPlaying, currSong) {
  return (
    <div className='song-details'>
      <img className='song-img' src='https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213231/Station%20images/awayFromTheSun_diug2z.jpg' />
      <div className='title-artist-container'>
        <div className='song-title' >
          {/* LINK TO PLAYLIST */}
          song title
        </div>
        <div className='artist-name'>
          {/* LINK TO ARTIST */}
          artist
        </div>

      </div>
      <button className='song-like'>
        {/* ADD TO LIKED SONGS STATION */}
        (✔)
      </button>
    </div>
  )
}
