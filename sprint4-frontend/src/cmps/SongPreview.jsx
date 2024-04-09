
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateStation } from '../store/actions/station.actions'

export function SongPreview({ currSong, handleSongLike }) {
  const [isLiked, setIsLiked] = useState()

  const currStation = useSelector(storeState => storeState.stationModule.stations[storeState.playerModule.currStationIdx])
  const currSongIdx = useSelector(storeState => storeState.playerModule.currSongIdx)

  const stations = useSelector(storeState => storeState.stationModule.stations)

  const likedStation = stations.find(station => station._id === 'liked-songs')

  async function toggleIsLiked() {
    const updatedIsLiked = !isLiked
    setIsLiked(updatedIsLiked)
    currSong.isLiked = updatedIsLiked

    const updatedStation = { ...currStation, [currStation.songs]: currSong }

    try {

      // updating the liked song in the current station
      const savedUpdatedStation = await updateStation(updatedStation)

      if (currSong.isLiked) {

        likedStation.songs.push(currSong)
        console.log('added liked song')

      } else {
        likedStation.songs.splice(currSongIdx, 1)
        console.log('removed liked song')
      }
      await updateStation(likedStation)

      // showSuccessMsg(`Station updated, new name: ${savedUpdatedStation.name}`)

    } catch (err) {
      console.log('Cannot update like song in store', err)
    }
  }





  function updateStationAfterLikeSong(updatedStation) {

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
    </div>)
}