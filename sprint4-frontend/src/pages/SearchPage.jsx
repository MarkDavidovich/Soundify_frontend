import { useEffect, useState } from "react"
import { AppHeader } from "../cmps/AppHeader"
import { CategoryList } from "../cmps/CategoryList"
// import { categoryService } from "../services/category.service.local"
import { categoryService } from "../services/category.service"
import { MainViewFooter } from "../cmps/MainViewFooter"
import { SearchPreview } from "../cmps/SearchPreview"
import { useSelector } from "react-redux"
import { getSongs } from "../services/youtube.api.service"

export function SearchPage() {

  const searchTerm = useSelector(stateStore => stateStore.systemModule.searchTerm)
  const [songs, setSongs] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCategories()
    fetchSongs()

  }, [searchTerm])

  async function fetchSongs() {
    if (searchTerm) {
      try {
        const loadedSongs = await getSongs(searchTerm)
        console.log("🚀 ~ fetchSongs ~ loadedSongs:", loadedSongs)

        setSongs(loadedSongs)
      } catch (err) {
        console.log('Failed to fetch songs', err)
      }
    }
  }
  async function loadCategories() {
    setLoading(true)
    try {
      const loadedCategories = await categoryService.queryCategory()
      setCategories(loadedCategories)
      console.log('Categories from DB:', loadedCategories)
    } catch (err) {
      console.log('Cannot load categories')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* <AppHeader /> */}
      <div className="search-page">

        <div className="search-songs-results">
          <h1>Search Results</h1>
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
        </div>

        {/* <SearchPreview /> */}

        <h2>Browse all</h2>

        <div className="grid-container">

          <CategoryList categories={categories} />

        </div>

        <MainViewFooter />
      </div>
    </>
  )
}