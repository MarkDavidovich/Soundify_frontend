import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FastAverageColor } from 'fast-average-color'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { getActionUpdateStation, updateStation } from "../store/actions/station.actions"
import { getActionCurrSongIdx, setCurrStationIdx, togglePlaying } from "../store/actions/player.actions"
import { SongActionModal } from "./songActionModal"
import { SearchPreview } from "./SearchPreview"
import { MainViewFooter } from "./MainViewFooter"
import { AppHeader } from "./AppHeader"
import { stationService } from "../services/station.service"

export function StationDetails() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const stations = useSelector(storeState => storeState.stationModule.stations)
  const currStation = useSelector(storeState => storeState.stationModule.stations[storeState.playerModule.currStationIdx])

  const [backgroundColor, setBackgroundColor] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(null)
  const [isSelected, setIsSelected] = useState(null)
  const currSongIdx = useSelector(storeState => storeState.playerModule.currSongIdx)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

  async function extractColor(stationImgUrl, setBackgroundColor) {
    if (!stationImgUrl) return
    const fac = new FastAverageColor()
    try {
      const color = await fac.getColorAsync(stationImgUrl)
      // setBackgroundColor(color.hex)
      document.body.style.setProperty('--bg-color', [color.hex])
    } catch (error) {
      console.error('Error extracting color:', error)
    }
  }

  useEffect(() => {
    const { id } = params
    if (!id) return
    extractColor(currStation?.imgUrl, setBackgroundColor)

    setCurrStation(id)

  }, [params, currStation])

  async function setCurrStation(id) {
    console.log("🚀 ~ file: StationDetails.jsx:45 ~ useEffect ~ id:", id)

    try {
      const idx = await stationService.getIdxById(id)
      console.log("🚀 ~ file: StationDetails.jsx:57 ~ setCurrStation ~ idx:", idx)
      setCurrStationIdx(idx)
    }
    catch (err) {
      showErrorMsg('Had issues loading station')
      console.error('Had issues loading station', err)
      return navigate('/')
    }
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

  function handleSongClick(songIdx) {
    if (songIdx === currSongIdx || songIdx === undefined) { // main play button will return undefined 
      togglePlaying(isPlaying)

    } else {
      dispatch(getActionCurrSongIdx(songIdx))
      togglePlaying(false) // toggle will always switch it to true
    }
  }

  async function onDragEnd(result) {
    const { source, destination } = result
    if (!destination) return

    const copiedSongs = [...currStation.songs]
    const [removed] = copiedSongs.splice(source.index, 1)
    copiedSongs.splice(destination.index, 0, removed)
    const updatedStation = { ...currStation, songs: copiedSongs }

    try {
      await dispatch(getActionUpdateStation(updatedStation))

      showSuccessMsg('Station updated successfully')

    } catch (err) {
      console.error('Failed to update station:', err)
    }
  }

  function toggleModal(songId) {
    setIsModalOpen(prevState => ({
      ...prevState,
      [songId]: !prevState[songId]
    }))
  }

  function handleSelected(idx) {
    setIsSelected(idx)
    // console.log('selected index:', idx, 'selected song:', isSelected)
  }

  function checkIfLiked(idx) {
    const hoveredSong = currStation.songs[idx]
    if (hoveredSong && hoveredSong.isLiked) {
      return true
    }
    return false
  }

  async function toggleIsLiked(songIdx) {
    const likedStation = stations.find(station => station._id === 'liked-songs')
    console.log("🚀 ~ file: StationDetails.jsx:128 ~ %%%%toggleIsLiked ~ likedStation:", likedStation)
    const hoveredSong = currStation.songs[songIdx]
    console.log("🚀 ~ toggleIsLiked ~ hoveredSong:", hoveredSong)
    const updatedIsLiked = !hoveredSong.isLiked
    hoveredSong.isLiked = updatedIsLiked

    const updatedStation = { ...currStation }
    updatedStation.songs[songIdx] = { ...hoveredSong, isLiked: updatedIsLiked }
    await updateStation(updatedStation)

    if (updatedIsLiked) {
      if (!likedStation.songs.find(s => s.id === hoveredSong.id)) {
        likedStation.songs.push(hoveredSong)
        await updateStation(likedStation)
      }

    } else {
      const likedSongIdx = likedStation.songs.findIndex(song => song.id === hoveredSong.id)
      if (likedSongIdx !== -1) {
        likedStation.songs.splice(likedSongIdx, 1)
        await updateStation(likedStation)

        const originalStation = stations.find(station => station.songs.some(song => song.id === hoveredSong.id))

        if (originalStation) {
          const originalSongIdx = originalStation.songs.findIndex(song => song.id === hoveredSong.id)
          if (originalSongIdx !== -1) {
            originalStation.songs[originalSongIdx] = { ...hoveredSong, isLiked: false }
            await updateStation(originalStation)
          }
        }
      }
    }
    if (currStation === likedStation && likedStation.songs.length === 0) navigate('/')
  }

  function handleSongClick(songIdx) {
    if (songIdx === currSongIdx || songIdx === undefined) { // main play button will return undefined 
      togglePlaying(isPlaying)

    } else {
      dispatch(getActionCurrSongIdx(songIdx))
      togglePlaying(false) // toggle will always switch it to true
    }
  }

  if (!currStation) return <div></div>
  let stationDuration = stationService.calcStationDuration(currStation.songs)

  return (
    <>
      <AppHeader />
      <div className="station-details flex column">
        <div className="station-data-container">
          <div className="info-station flex">
            <div className="station-img-container">
              <img className="station-img" src={currStation.imgUrl} alt="" />
            </div>
            <div className="text-station">
              <span className="playlist">Playlist</span>
              <h1 className="title-station">{currStation.name}</h1>
              <div className="user-info flex">
                <img className="user-img" src={currStation.createdBy.imgUrl} alt="" />
                <div className="created-by">{currStation.createdBy.fullname} • </div>
                <div className="info-songs">
                  <span>{currStation.songs.length} Songs, {stationDuration}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-station flex">
            <div className="right-menu-btns flex">
              <button className={`play-btn btn ${currStation.songs.length > 0 ? '' : ' inactive'}`} onClick={() => { handleSongClick() }}><span>
                {isPlaying ? (<svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"
                  >
                  </path>
                </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 16 16" >
                    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                    ></path>
                  </svg>)}

              </span></button>
              <button className="opt-btn btn"><span>...</span></button>
            </div>
            <button className="display-station-btn btn flex">
              <span>List</span>
              <svg height='16' width='16' viewBox="0 0 16 16" >
                <path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"
                  fill="#f5f5f5"
                // stroke="white"
                >
                </path>
              </svg>

            </button>
          </div>
          {
            currStation.songs.length > 0 &&
            <div className="songs-details-container">
              <div className="heading-station">
                <span className="hash">#</span>
                <span className="title">Title</span>
                <span className="album">Album</span>
                <span className="date">Date added</span>
                <span className="duration">
                  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z" stroke="#a7a7a7" strokeWidth="0.3" fill="#a7a7a7"></path><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" fill="#a7a7a7" strokeWidth="0.3" stroke="#a7a7a7"></path></svg>
                </span>
              </div>
              <div className="horizontal-line"></div>

              <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="station-droppable">
                  {(provided, snapshot) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {currStation.songs.map((song, idx) => (
                        <Draggable draggableId={song.id} key={song.id} index={idx}>
                          {(providedDraggable) => (
                            <li
                              className={`song-preview clean-list ${snapshot.isDragging ? 'dragging' : ''} ${isSelected === idx ? 'selected' : ''}`}
                              ref={providedDraggable.innerRef}
                              {...providedDraggable.draggableProps}
                              {...providedDraggable.dragHandleProps}
                              onMouseEnter={() => {
                                setIsHovered(idx)
                              }}
                              onMouseLeave={() => {
                                setIsHovered(null)
                              }}
                              onClick={() => handleSelected(idx)}
                              onDoubleClick={() => handleSongClick(idx)}
                            // CLICK OUTSIDE TO unselect
                            >
                              <button className={`song-num ${idx === currSongIdx ? 'active-song' : ''}`} onClick={() => handleSongClick(idx)}>
                                {isPlaying && currSongIdx === idx && (isHovered === idx || isSelected === idx) ? ( //PAUSE SVG
                                  <svg height='16' width='16' viewBox="0 0 24 24">
                                    <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"
                                      fill="white">
                                    </path>
                                  </svg>
                                ) : isPlaying && (isHovered === idx || isSelected == idx) || !isPlaying && (isHovered === idx) ? (//PLAY SVG
                                  <svg height='16' width='16' viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                                    fill="white">
                                  </path>
                                  </svg>
                                ) : isPlaying && currSongIdx === idx && isHovered !== idx ? (
                                  <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194219/svg/download_acsgkq.gif" />
                                ) : (
                                  idx + 1
                                )}

                              </button>
                              <div className="song-info">
                                <img className="song-img" src={song.imgUrl} alt="" />
                                <div className="station-title-artist flex">
                                  <div className={`song-title ${idx === currSongIdx ? 'active-song' : ''}`} title={song.title}>
                                    {song.title}
                                  </div>
                                  <a className="song-artist" href="#" title={song.artist}>
                                    {song.artist}
                                  </a>
                                </div>
                              </div>
                              <div className="song-album-container">
                                <a className="song-album" href="#" title={song.album}>
                                  {song.album}
                                </a>
                              </div>
                              <div className="song-added-time">
                                <span className="song-added-time">{stationService.formatAddedTime(song.addedAt)}</span>
                                <button className="details-song-like" onClick={() => { toggleIsLiked(idx) }}>
                                  {checkIfLiked(idx) ? (<svg width="16" height="16" viewBox="0 0 16 16">
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
                              <div className="song-duration-container">
                                <div>{song.duration}</div>
                                <button className="options" onClick={() => toggleModal(song.id)}>
                                  <svg width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                                      fill="white">
                                    </path>
                                  </svg>
                                  {isModalOpen[song.id] && (
                                    <div className="modal">
                                      <div className="modal-content">
                                        {/* <span className="close" onClick={handleModalClose}>X</span> */}
                                        <SongActionModal
                                          song={song}
                                          currStation={currStation}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </button>
                              </div>

                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          }
          {
            currStation._id !== 'liked-songs' &&
            <SearchPreview handleAddSongFromSearch={handleAddSongFromSearch}
              currStation={currStation}
            />
          }
        </div >
        <MainViewFooter />
      </div >
    </>
  )
}