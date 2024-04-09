//OPENS WHEN YOU CLICK ON SEARCH

import React, { useState } from 'react'
import { SearchSongs } from '../cmps/SearchSongs'
import { getSongs } from '../services/youtube.api.service'
import { useDispatch } from 'react-redux'
import { updateStation } from '../store/actions/station.actions'

export function ThemesPage({ onSongSelect, currStation }) {

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

  const handleFindMore = () => {
    setShowFindMore(true)
  }

  async function handleAddSongFromSearch(selectedSong) {
    const updatedStation = {
        ...currStation,
        songs: [...currStation.songs, selectedSong]
    };
    try {
        await dispatch(updateStation(updatedStation))
        showSuccessMsg('Song added successfully')
    } catch (err) {
        console.error('Failed to add song:', err)
    }
}


  return (
    <section className="main-view">
      <button onClick={handleFindMore}>Find more</button>
      {showFindMore && (
        <section>
          <button onClick={() => setShowFindMore(false)}>X</button>
          <h1>Let's find something for your playlist</h1>
          <SearchSongs searchSongs={searchSongs} />
          <div className="song-list">
            {songs?.map(song => (
              <div className="song-preview" key={song.id}>
                <h4>Title: {song.title}</h4>
                <h4>Artist: {song.artist}</h4>
                <h4>URL: {song.url}</h4>
                <img src={song.imgUrl} alt="Song artwork" />
                <h4>Duration: {song.duration}</h4>
                <button onClick={() => handleAddSongFromSearch(song)}>Select Song</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
