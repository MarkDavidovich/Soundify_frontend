//RENDERS SIDE PREVIEWS

import { Link } from 'react-router-dom'
import { SidePreview } from './SidePreview.jsx'
import { UpdateStation } from './UpdateStation.jsx'
import { useEffect, useState } from 'react'

export function SideList({ stations, onRemoveStation, onUpdateStation }) {

    const [isOnUpdate, setIsOnUpdate] = useState(false)
    const [selectedStation, setSelectedStation] = useState(null)
    const [openContextMenuStationId, setOpenContextMenuStationId] = useState(null)
    const [contextMenuPosition, setContextMenuPosition] = useState({ mouseX: null, mouseY: null })

    const [toggleLink, setToggleLink] = useState(false)

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

    const filteredStations = stations.filter(station => !(station._id === 'liked-songs' && station.songs.length === 0))

    return <div className="side-list">

        {filteredStations.map(station => (
            <article className="side-preview-container" key={station._id}>
                <Link className={setLinkClass()}
                    onClick={onSetToggleLink}
                    to={`/station/${station._id}`}>

                    <SidePreview station={station}
                        onRemoveStation={onRemoveStation}
                        onContextMenuOpen={handleContextMenuOpen}
                        onContextMenuClose={handleContextMenuClose}
                        isContextMenuOpen={openContextMenuStationId === station._id}
                        contextMenuPosition={contextMenuPosition}

                        onTriggerUpdate={() => handleUpdateClick(station)} />
                </Link>
            </article>
        ))}

        {stations.some(station => station._id === 'liked-songs' && station.songs.length > 0) && (
            <article className="side-preview-container" key="liked-songs">
                <Link
                    className={setLinkClass()}
                    onClick={onSetToggleLink}
                    to={`/station/liked-songs`}
                >
                    <SidePreview
                        station={stations.find(station => station._id === 'liked-songs')}
                        onRemoveStation={onRemoveStation}
                        onContextMenuOpen={handleContextMenuOpen}
                        onContextMenuClose={handleContextMenuClose}
                        isContextMenuOpen={openContextMenuStationId === 'liked-songs'}
                        contextMenuPosition={contextMenuPosition}
                        onTriggerUpdate={() => handleUpdateClick(station)}
                    />
                </Link>
            </article>
        )}

        {isOnUpdate && (
            <UpdateStation
                station={selectedStation}
                handleStationUpdate={handleStationUpdate}
                setIsOnUpdate={setIsOnUpdate}
            />
        )}
    </div>
}
