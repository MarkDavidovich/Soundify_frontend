//RENDERS SIDE PREVIEWS

import { Link } from 'react-router-dom'
import { SidePreview } from './SidePreview.jsx'
import { UpdateStation } from './UpdateStation.jsx'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery'

export function SideList({ stations, onRemoveStation, onUpdateStation }) {

    const [isOnUpdate, setIsOnUpdate] = useState(false)
    const [selectedStation, setSelectedStation] = useState(null)
    const [openContextMenuStationId, setOpenContextMenuStationId] = useState(null)
    const [contextMenuPosition, setContextMenuPosition] = useState({ mouseX: null, mouseY: null })
    const [toggleLink, setToggleLink] = useState(false)

    const toggleLibrary = useSelector(stateStore => stateStore.layoutModule.toggleLibrary)

    const matchesNarrow = useMediaQuery('(max-width: 720px)')
    const matchesMobile = useMediaQuery('(max-width: 480px)')

    useEffect(() => {
        const closeMenu = (event) => {
            handleContextMenuClose()
        }

        document.addEventListener('click', closeMenu)
        return () => {
            document.removeEventListener('click', closeMenu)
        }
    }, [handleContextMenuClose])

    function handleContextMenuOpen(stationId, mouseX, mouseY) {
        setOpenContextMenuStationId(stationId)
        setContextMenuPosition({ mouseX, mouseY })
    }

    function handleContextMenuClose() {
        setOpenContextMenuStationId(null)
        setContextMenuPosition({ mouseX: null, mouseY: null })
    }

    function handleUpdateClick(station) {
        setSelectedStation(station)
        setIsOnUpdate(true)
    }

    function handleStationUpdate(updatedStation) {
        onUpdateStation(updatedStation)
        setIsOnUpdate(false)
    }

    function onSetToggleLink() {
        setToggleLink(!toggleLink)
    }

    function setLinkClass() {
        if (!toggleLink) return 'link'
        else return 'link clicked'
    }

    const likedStationId = '661bb9089f9e9468991f1be7'
    const likedStation = stations.find(station => station._id === likedStationId)
    const filteredStations = stations.filter(station => (station._id !== likedStationId && station.desc !== 'Searched Songs'))


    const dynamicClass = matchesMobile ? ' mobile' : toggleLibrary || matchesNarrow ? '-collapsed' : ''


    return <div className={"side-list" + dynamicClass}>
        {stations.find(station => station._id === likedStationId && likedStation.songs.length > 0) && (
            <article className={'side-preview-container' + dynamicClass} key={likedStationId}>
                <Link
                    className={setLinkClass()}
                    onClick={onSetToggleLink}
                    to={`/station/${likedStationId}`}
                >
                    <SidePreview
                        station={stations.find(station => station._id === likedStationId)}
                        onRemoveStation={onRemoveStation}
                        onContextMenuOpen={handleContextMenuOpen}
                        onContextMenuClose={handleContextMenuClose}
                        isContextMenuOpen={openContextMenuStationId === likedStationId}
                        contextMenuPosition={contextMenuPosition}
                        onTriggerUpdate={() => handleUpdateClick(station)}
                    />
                </Link>
            </article>
        )}

        {filteredStations.map((station, idx) => (
            <div className={'side-preview-container' + dynamicClass} key={station._id}>
                <Link
                    className={setLinkClass()}
                    onClick={onSetToggleLink}
                    to={`/station/${station._id}`}
                >

                    <SidePreview
                        station={station}
                        idx={idx}
                        onRemoveStation={onRemoveStation}
                        onContextMenuOpen={handleContextMenuOpen}
                        onContextMenuClose={handleContextMenuClose}
                        isContextMenuOpen={openContextMenuStationId === station._id}
                        contextMenuPosition={contextMenuPosition}

                        onTriggerUpdate={() => handleUpdateClick(station)}
                    />
                </Link>
            </div>
        ))}



        {isOnUpdate && (
            <UpdateStation
                station={selectedStation}
                handleStationUpdate={handleStationUpdate}
                setIsOnUpdate={setIsOnUpdate}
            />
        )}
    </div>
}
