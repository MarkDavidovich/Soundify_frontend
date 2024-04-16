import { useEffect, useState } from "react"
import { CategoryList } from "../cmps/CategoryList"
import { categoryService } from "../services/category.service"
import { MainViewFooter } from "../cmps/MainViewFooter"
import { useSelector } from "react-redux"
import { getSongs } from "../services/youtube.api.service"
import { setCurrSongIdx, setCurrStationIdx, togglePlaying } from "../store/actions/player.actions"
import { addStation, removeStation } from "../store/actions/station.actions"
import { stationService } from "../services/station.service"
import { SearchResultsPreview } from "../cmps/SearchResultsPreview"

export function SearchPage() {

  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const stations = useSelector(storeState => storeState.stationModule.stations)
  const searchTerm = useSelector(stateStore => stateStore.systemModule.searchTerm)
  const currSongIdx = useSelector(storeState => storeState.playerModule.currSongIdx)
  const currStationIdx = useSelector(storeState => storeState.playerModule.currStationIdx)

  const [songs, setSongs] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchedStationId, setSearchedStationId] = useState(null)
  const [isHovered, setIsHovered] = useState(null)

  useEffect(() => {

    if (searchedStationId) {
      // removeSearchedStation(searchedStationId);
    }
    loadCategories()
    fetchSongs()
  }, [searchTerm])

  useEffect(() => {
    if (songs.length > 0 && searchedStationId === null && searchTerm) {
      const existingStation = stations.find(station => station.name === 'Searched Station')
      // if (existingStation) {
      //   removeSearchedStation(existingStation._id)
      // } else {
      onAddSearchStation()
      // }
    }
  }, [songs])


  async function fetchSongs() {
    if (searchTerm) {
      try {
        const loadedSongs = await getSongs(searchTerm)
        await setSongs(loadedSongs)
      } catch (err) {
        console.log('could not fetch songs...', err)
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

  async function onAddSearchStation() {
    const newStation = {
      name: `${searchTerm}`,
      tags: [],
      desc: 'Searched Songs',
      songs: songs,
      likedByUsers: [],
      imgUrl: '',
      createdBy: {
        _id: '',
        fullname: 'none',
        imgUrl: '',
      },
      createdAt: ''
    }

    try {
      const savedStation = await addStation(newStation)
      console.log("added station", savedStation)
      setSearchedStationId(savedStation._id)
    }
    catch (err) {
      console.log('failed to make a search station', err)
    }
  }

  async function removeSearchedStation(stationId) {
    try {
      await removeStation(stationId)
      console.log('Searched Station removed')
    } catch (err) {
      console.log('Cannot remove station')
    }
  }

  function handleClick(idx) {
    const stationIdx = stations.findIndex(station => station.name === `${searchTerm}`)
    if (stationIdx === -1) {
      return
    }

    setCurrStationIdx(stationIdx)
    setCurrSongIdx(idx)
    togglePlaying(isPlaying)
  }

  return (
    <>
      {/* <AppHeader /> */}
      <div className="search-page">


        <div className="search-songs-results">
          {songs.length > 0 && <h2>Search Results</h2>}
          <div className="song-list">
            {songs.map((song, idx) => (
              <div className="song-preview " key={song.id}
                onMouseEnter={() => {
                  setIsHovered(idx)
                }}
                onMouseLeave={() => {
                  setIsHovered(null)
                }}>
                <div className="song-info">
                  <div className="basic-song-info flex">
                    <div className="song-img-container">
                      <button className="play-song-btn" onClick={() => handleClick(idx)}>
                        {isPlaying && currSongIdx === idx ? (
                          <svg height='16' width='16' viewBox="0 0 24 24">
                            <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"
                              fill="white">
                            </path>
                          </svg>
                        ) : (<svg height='16' width='16' viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                          fill="white">
                        </path>
                        </svg>)
                        }
                      </button>
                      <img className="song-img" src={song.imgUrl} alt="Song artwork" />
                    </div>
                    <div className="song-desc">
                      <span className='song-title'>
                        {song.title}
                      </span>
                      <span className='song-artist'>
                        <span> {song.artist}</span>
                      </span>
                    </div>
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