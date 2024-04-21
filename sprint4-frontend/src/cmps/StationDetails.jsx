import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FastAverageColor } from 'fast-average-color'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { useMediaQuery } from "@mui/material"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { getActionUpdateStation, updateStation, setCurrViewedStationIdx } from "../store/actions/station.actions"
import { getActionCurrSongIdx, setCurrSongIdx, setCurrStationIdx, togglePlaying } from "../store/actions/player.actions"
import { SongActionModal } from "./songActionModal"
import { SearchPreview } from "./SearchPreview"
import { MainViewFooter } from "./MainViewFooter"
import { AppHeader } from "./AppHeader"
import { stationService } from "../services/station.service"
import { SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_STATION_UPDATED } from "../services/socket.service"

export function StationDetails() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const stations = useSelector(storeState => storeState.stationModule.stations)

  const currViewedStationIdx = useSelector(storeState => storeState.stationModule.currViewedStationIdx)
  const currStationIdx = useSelector(storeState => storeState.playerModule.currStationIdx)
  const currStation = useSelector(storeState => storeState.stationModule.stations[currViewedStationIdx])
  const currPlayerStationIdx = useSelector(storeState => storeState.playerModule.currStationIdx)

  const [backgroundColor, setBackgroundColor] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(null)
  const [isSelected, setIsSelected] = useState(null)
  const currSongIdx = useSelector(storeState => storeState.playerModule.currSongIdx)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const likedStationIdx = '661bb9089f9e9468991f1be7'
  const { id } = params
  const matchesMobile = useMediaQuery('(max-width: 480px)')

  const dummyRef = useRef()
  const headingStationRef = useRef()

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
    if (!id) return
    extractColor(currStation?.imgUrl, setBackgroundColor)

    setCurrStation(id)

    socketService.on(SOCKET_EVENT_STATION_UPDATED, (updatedStation) => {
      dispatch(getActionUpdateStation(updatedStation))
    })


    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry.isIntersecting) {
          headingStationRef.current.classList.add('intersected')
        } else {
          headingStationRef.current.classList.remove('intersected')
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px',
      }
    )

    if (dummyRef.current) {
      observer.observe(dummyRef.current)

      return () => {
        socketService.off(SOCKET_EVENT_STATION_UPDATED)

        if (dummyRef.current) {
          observer.unobserve(dummyRef.current)
        }
      }

    }

    return () => {

    }


  }, [params, currStation])

  useEffect(() => {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, id)
  }, [id])

  async function setCurrStation(id) {

    try {
      const idx = await stationService.getIdxById(id)
      setCurrViewedStationIdx(idx)
    }
    catch (err) {
      showErrorMsg('Had issues loading station')
      console.error('Had issues loading station', err)
      return navigate('/')
    }
  }

  useEffect(() => {
    setIsSelected(null)
  }, [currViewedStationIdx])

  //   function handleStationUpdate(updatedStation) {
  //   // Update local state to reflect changes
  //   if (updatedStation._id === currStation._id) {
  //     setCurrStation(updatedStation);
  //   }
  // }

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

  async function onDragEnd(result) {
    const { source, destination } = result
    if (!destination) return

    const copiedSongs = [...currStation.songs]
    const [removed] = copiedSongs.splice(source.index, 1)
    copiedSongs.splice(destination.index, 0, removed)
    const updatedStation = { ...currStation, songs: copiedSongs }

    try {
      await dispatch(getActionUpdateStation(updatedStation))
      socketService.emit(SOCKET_EVENT_STATION_UPDATED, updatedStation)


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
    const likedStation = stations.find(station => station._id === likedStationIdx)
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
        // socketService.emit(SOCKET_EVENT_STATION_UPDATED, likedStation)

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
    setCurrStationIdx(currViewedStationIdx)
    if (songIdx === currSongIdx && currViewedStationIdx === currStationIdx) { // this will pause a song that is already playing but play any different song
      togglePlaying(isPlaying)

    } else {
      dispatch(getActionCurrSongIdx(songIdx))
      togglePlaying(false) // toggle will always switch it to true
    }
  }

  function handleMainPlayClick() {
    if (currPlayerStationIdx === currViewedStationIdx) {
      togglePlaying(isPlaying)
    } else {
      setCurrStationIdx(currViewedStationIdx)
      setCurrSongIdx(0)
      togglePlaying(false)
    }
  }

  if (!currStation) return <div></div>
  let stationDuration = stationService.calcStationDuration(currStation.songs)

  return (
    <>
      <div ref={dummyRef} style={{
        height: '501px',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
      }}></div>
      <div className={`station-details${matchesMobile ? ' mobile' : ''} flex column`}>
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
                  {!!currStation.songs.length && <span>{currStation.songs.length} Songs, {stationDuration}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="menu-station flex">
            <div className="right-menu-btns flex">
              <button className={`play-btn btn ${currStation.songs.length > 0 ? '' : ' inactive'}`} onClick={() => { handleMainPlayClick() }}><span>
                {isPlaying && currPlayerStationIdx === currViewedStationIdx ? ( //PAUSE SVG
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"
                    >
                    </path>
                  </svg>
                ) : ( //PLAY SVG
                  <svg width="20" height="20" viewBox="0 0 16 16" >
                    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                    ></path>
                  </svg>)}

              </span></button>
            </div>
            {/* <button className="display-station-btn btn flex">
              <span>List</span>
              <svg height='16' width='16' viewBox="0 0 16 16" >
                <path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"
                  fill="#f5f5f5"
                // stroke="white"
                >
                </path>
              </svg>

            </button> */}
          </div>
          {
            currStation.songs.length > 0 &&
            <div className="songs-details-container">
              <div ref={headingStationRef} className="heading-station">
                <span className="hash">#</span>
                <span className="title">Title</span>
                <span className="album">Album</span>
                <span className="date">Date added</span>
                <span className="duration">
                  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z" stroke="#a7a7a7" strokeWidth="0.3" fill="#a7a7a7"></path><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" fill="#a7a7a7" strokeWidth="0.3" stroke="#a7a7a7"></path></svg>
                </span>
              </div>
              <div className="horizontal-line"></div>
              <div className="songs-details-list">
                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                  <Droppable droppableId="station-droppable">
                    {(provided, snapshot) => (
                      <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {currStation.songs.map((song, idx) => (
                          <Draggable draggableId={song.id} key={song.id} index={idx}>
                            {(providedDraggable) => (
                              <li
                                className={`song-preview clean-list ${snapshot.isDragging ? 'dragging' : ''} ${isSelected === idx && currPlayerStationIdx === currViewedStationIdx ? 'selected' : ''}`}
                                ref={providedDraggable.innerRef}
                                {...providedDraggable.draggableProps}
                                {...providedDraggable.dragHandleProps}
                                onMouseEnter={() => {
                                  setIsHovered(idx)
                                }}
                                onMouseLeave={() => {
                                  setIsHovered(null)
                                }}
                                onClick={matchesMobile ? () => handleSongClick(idx) : () => handleSelected(idx)}

                                onDoubleClick={() => handleSongClick(idx)}
                              // CLICK OUTSIDE TO unselect
                              >
                                <button className={`song-num ${idx === currSongIdx && currPlayerStationIdx === currViewedStationIdx ? 'active-song' : ''}`} onClick={() => handleSongClick(idx)}>
                                  {isPlaying && currSongIdx === idx && (isHovered === idx || isSelected === idx) && currPlayerStationIdx === currViewedStationIdx ? ( //PAUSE SVG
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
                                  ) : isPlaying && currSongIdx === idx && isHovered !== idx && currPlayerStationIdx === currViewedStationIdx ? ( //EQUALIZER GIF
                                    <img src="https://res.cloudinary.com/dollaguij/image/upload/v1699194219/svg/download_acsgkq.gif" />
                                  ) : (
                                    idx + 1
                                  )}

                                </button>
                                <div className="song-info">
                                  <img className="song-img" src={song.imgUrl} alt="" />
                                  <div className="station-title-artist flex">
                                    <div className={`song-title ${idx === currSongIdx && currPlayerStationIdx === currViewedStationIdx ? 'active-song' : ''}`} title={song.title}>
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
                                <div className="song-added-container">
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
                                  <div className="song-duration">{song.duration}</div>
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
            </div>
          }
          {
            currStation._id !== likedStationIdx &&
            <SearchPreview
              handleAddSongFromSearch={handleAddSongFromSearch}
              currStation={currStation}
            />
          }
        </div >
        {!matchesMobile && <MainViewFooter />}
      </div >
    </>
  )
}