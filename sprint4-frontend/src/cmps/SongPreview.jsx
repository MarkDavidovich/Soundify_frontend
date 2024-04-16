
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateStation } from '../store/actions/station.actions'
import { stationService } from '../services/station.service.local'
import { useDispatch } from 'react-redux'

export function SongPreview({ currStation, currSong, handleSongLike }) {
  const [isLiked, setIsLiked] = useState(null)
  const stations = useSelector(storeState => storeState.stationModule.stations)
  const likedStationIdx = '661bb9089f9e9468991f1be7'
  const likedStation = stations.find(station => station._id === likedStationIdx)

  async function toggleIsLiked() {
    const updatedIsLiked = !isLiked
    setIsLiked(updatedIsLiked)
    currSong.isLiked = updatedIsLiked

    try {
      const updatedStation = { ...currStation }
      const songIdx = updatedStation.songs.findIndex(song => song.id === currSong.id)
      if (songIdx !== -1) {
        updatedStation.songs[songIdx] = { ...currSong, isLiked: updatedIsLiked }
        await updateStation(updatedStation)
      }

      if (updatedIsLiked) {
        likedStation.songs.push(currSong)
        await updateStation(likedStation)

      } else {
        const likedSongIdx = likedStation.songs.findIndex(song => song.id === currSong.id)
        if (likedSongIdx !== -1) {
          likedStation.songs.splice(likedSongIdx, 1)
          await updateStation(likedStation)

          const originalStation = stations.find(station => station.songs.some(song => song.id === currSong.id))
          console.log("🚀 ~ toggleIsLiked ~ originalStation:", originalStation)

          if (originalStation) {
            const originalSongIdx = originalStation.songs.findIndex(song => song.id === currSong.id)
            if (originalSongIdx !== -1) {
              originalStation.songs[originalSongIdx] = { ...currSong, isLiked: false }
              await updateStation(originalStation)
            }
          }
        }
      }
    } catch (err) {
      console.log('Cannot update like song in store', err)
    }
  }


  useEffect(() => {
    setIsLiked(currSong?.isLiked)
  }, [currSong])

  return (

    <div className={currSong ? 'song-details' : 'empty-details'} >
      <img className='song-img' src={currSong?.imgUrl || ''} />
      <div className='title-artist-container' >
        <div className='song-title' >
          {/* LINK TO PLAYLIST */}
          {currSong?.title}
        </div>
        <div className='artist-name' >
          {/* LINK TO ARTIST */}
          {currSong?.artist}
        </div>
      </div>
      <button className='song-like' onClick={toggleIsLiked}>
        {currSong?.isLiked ? (<svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"
            fill='#1ed760'>
          </path>
        </svg>
        ) : (
          <svg width="16" height="16" role="img" viewBox="0 0 16 16">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" fill="white">

            </path>
            <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z" fill="white"></path>
          </svg>
        )}
      </button>
    </div>
  )
}