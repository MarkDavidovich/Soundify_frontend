//OPENS WHEN YOU CLICK ON SEARCH

import React, { useState } from 'react'
import { SearchSongs } from '../cmps/SearchSongs'
import { getSongs } from '../services/youtube.api.service'

export function ThemesPage() {

  const [songs, setSongs] = useState(null)



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


  return (
    <section className="main-view">
      <div>ThemesPage</div>

      <SearchSongs searchSongs={searchSongs} />

      <div className="song-list">
        {songs?.map(song =>
          <div className="song-preview" key={song.id}>
            <h4>Title: {song.title}</h4>
            <h4>artist: {song.artist}</h4>
            <h4>url: {song.url}</h4>
            <img src={song.imgUrl}></img>
            <h4>duration: {song.duration}</h4>


          </div>)
        }
      </div>

    </section>

  )
}
