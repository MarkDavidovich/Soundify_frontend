//OPENS WHEN YOU CLICK ON SEARCH

import React, { useState } from 'react'
import { SearchSongs } from '../cmps/SearchSongs'
import { getSongs } from '../services/youtube.api.service'
import { useDispatch } from 'react-redux'
import { updateStation } from '../store/actions/station.actions'

export function SearchPreview({ onSongSelect, currStation }) {

  const [songs, setSongs] = useState(null)
  const [showFindMore, setShowFindMore] = useState(false)
  const dispatch = useDispatch()


  async function searchSongs(searchInput) {
    // setFilterBy(searchKey)

    try {
      const searchSongs = await getSongs(searchInput)
      setSongs(searchSongs.slice(0, 5))
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  function handleSongSelect(song) {
    onSongSelect(song)
  }

  function handleFindMore() {
    setShowFindMore(true)
  }

  async function handleAddSongFromSearch(selectedSong) {
    const updatedStation = {
      ...currStation,
      songs: [...currStation.songs, selectedSong]
    }
    try {
      await dispatch(updateStation(updatedStation))
      showSuccessMsg('Song added successfully')
    } catch (err) {
      console.error('Failed to add song:', err)
    }
  }

  return (
    <section className="main-container flex">
      {currStation.songs.length > 0 && (
        <button className={`find-more-btn ${showFindMore ? 'expanded' : ''}`} onClick={() => setShowFindMore(!showFindMore)}>
          {showFindMore ? null : <div className="find-more-text">Find more</div>}
        </button>
      )}


      {(showFindMore || currStation?.songs.length === 0) && (
        <section className='add-song-container'>
          <div className="search-song-container">
            <div className="title-container">
              <h1 className='find-song'>Let's find something for your playlist</h1>
              <SearchSongs searchSongs={searchSongs} />
            </div>
            <button className='close-search-btn' onClick={() => setShowFindMore(false)}>
              <svg data-encore-id="icon" role="img" aria-label="Close" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-ytk21e-0 eJsVCw">
                <path d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414z"></path>
              </svg>
            </button>
          </div>

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
                    Album random function
                  </div>
                  <div className="add-song">
                    <button className="add-song-btn" onClick={() => handleAddSongFromSearch(song)}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>

        </section>
      )}
    </section>
  )

}
