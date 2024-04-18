import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import useMediaQuery from '@mui/material/useMediaQuery'
import { stationService } from "../../services/station.service"
import { setCurrViewedStationIdx } from "../../store/actions/station.actions"
import { useState } from 'react'


export function SidePreview({ station, idx, onRemoveStation, onTriggerUpdate, isContextMenuOpen, onContextMenuOpen, contextMenuPosition }) {
    const dispatch = useDispatch()
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const currStationIdx = useSelector(storeState => storeState.playerModule.currStationIdx)
    const currStation = useSelector(storeState => storeState.stationModule.stations[storeState.playerModule.currStationIdx])

    const toggleLibrary = useSelector(stateStore => stateStore.layoutModule.toggleLibrary)

    const [contextMenu, setContextMenu] = useState(null)

    const location = useLocation()
    const isActive = location.pathname.includes(`/station/${station._id}`)
    const likedStationIdx = '661bb9089f9e9468991f1be7'
    const matchesNarrow = useMediaQuery('(max-width: 720px)')
    const matchesMobile = useMediaQuery('(max-width: 480px)')


    function handleContextMenu(ev) {
        ev.preventDefault()
        onContextMenuOpen(station._id, ev.clientX - 2, ev.clientY - 4)
    }

    function handleClose() {
        setContextMenu(null)
    }

    function handleRemoveClick(ev) {
        ev.preventDefault()
        onRemoveStation(station._id)
        handleClose()
    }

    function handleStationClick(station) {
        const stationIdx = stationService.getIdxById(station._id)
        setCurrViewedStationIdx(stationIdx)
        // dispatch(getActionCurrStationIdx(station))
    }

    function setSidePreviewLineClass() {
        return isActive ? 'side-preview-line clicked' : 'side-preview-line'

        // if (currStation !== station) return 'side-preview-line'
        // else return 'side-preview-line clicked'
    }

    const dynamicClass = matchesMobile ? ' mobile' : toggleLibrary || matchesNarrow ? '-collapsed' : ''
    const isCurrPlayingStation = idx === currStationIdx

    return (
        // <div className="side-preview-line"
        <div className={setSidePreviewLineClass() + dynamicClass}
            onContextMenu={handleContextMenu}
            onClick={() => { handleStationClick(station) }}>

            <img className='side-preview-img' src={station.imgUrl} alt={station.name} />
            <div className={'station-preview-details' + dynamicClass}>
                <span className={`station-name ${isCurrPlayingStation && 'active-station'}`}>{station.name}</span>

                {station._id !== likedStationIdx &&
                    <span className='station-created'>{station.createdBy.fullname || 'Guest'}</span>
                }
                {station._id === likedStationIdx && (
                    <>
                        <span className='station-created'>Playlist
                            <span className='station-created'>
                                <span> • </span>
                                {station.songs.length} songs</span>
                        </span>


                    </>
                )}

            </div>
            {isPlaying && isCurrPlayingStation && <div className='playing-icon'> <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M10.016 1.125A.75.75 0 0 0 8.99.85l-6.925 4a3.639 3.639 0 0 0 0 6.299l6.925 4a.75.75 0 0 0 1.125-.65v-13a.75.75 0 0 0-.1-.375zM11.5 5.56a2.75 2.75 0 0 1 0 4.88V5.56z"
                    fill='#1ed760'
                >

                </path>
                <path d="M16 8a5.752 5.752 0 0 1-4.5 5.614v-1.55a4.252 4.252 0 0 0 0-8.127v-1.55A5.752 5.752 0 0 1 16 8z"
                    fill='#1ed760'
                >
                </path>
            </svg>
            </div>}

            {
                isContextMenuOpen && (
                    <div
                        className="context-menu"
                        style={{
                            position: "absolute",
                            top: `${contextMenuPosition.mouseY}px`,
                            left: `${contextMenuPosition.mouseX}px`,
                        }}
                    >
                        <div className="menu-list">
                            <button className="edit-btn flex" onClick={() => { onTriggerUpdate() }}>
                                <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 ewCuAY">
                                    <path d="M11.838.714a2.438 2.438 0 0 1 3.448 3.448l-9.841 9.841c-.358.358-.79.633-1.267.806l-3.173 1.146a.75.75 0 0 1-.96-.96l1.146-3.173c.173-.476.448-.909.806-1.267l9.84-9.84zm2.387 1.06a.938.938 0 0 0-1.327 0l-9.84 9.842a1.953 1.953 0 0 0-.456.716L2 14.002l1.669-.604a1.95 1.95 0 0 0 .716-.455l9.841-9.841a.938.938 0 0 0 0-1.327z"></path>
                                </svg>
                                Edit details
                            </button>

                            <div className="horizontal-line"></div>

                            <button className="delete-btn flex" onClick={(ev) => { handleRemoveClick(ev) }}>
                                <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 ewCuAY">
                                    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" className=""></path>
                                    <path d="M12 8.75H4v-1.5h8v1.5z"></path>
                                </svg>
                                Delete
                            </button>

                        </div>
                    </div>
                )
            }
        </div >
    )
}
