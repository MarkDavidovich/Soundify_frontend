import React from 'react'

export function SongPreview(song, isPlaying, currSong) {
  return (
    <div>
      <img className='song-img' src='https://res.cloudinary.com/dkwwsxprt/image/upload/v1712213231/Station%20images/awayFromTheSun_diug2z.jpg' />
      <div className='song-title'>
        song title
      </div>
      <div className='artist-name'>
        artist
      </div>
    </div>
  )
}
