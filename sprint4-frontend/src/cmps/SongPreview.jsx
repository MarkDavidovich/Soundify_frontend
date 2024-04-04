import React from 'react'

export function SongPreview(song, isPlaying, currSong) {
  return (
    <div className='song-details'>
      <img className='song-img' src='https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213231/Station%20images/awayFromTheSun_diug2z.jpg' />
      <div className='title-artist-container'>
        <div className='song-title'>
          song title
        </div>
        <div className='artist-name'>
          artist
        </div>

      </div>
      <button className='song-like'>
        (✔)
      </button>
    </div>
  )
}
