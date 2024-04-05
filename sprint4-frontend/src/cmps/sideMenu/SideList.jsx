//RENDERS SIDE PREVIEWS

import { Link } from 'react-router-dom'
import { SidePreview } from './SidePreview.jsx'
import { UpdateStation } from './UpdateStation.jsx'
import { useEffect, useState } from 'react';


export function SideList({ stations, onRemoveStation, onUpdateStation }) {

    const [isOnUpdate, setIsOnUpdate] = useState(false)
    const [selectedStation, setSelectedStation] = useState(null)
    const [openContextMenuStationId, setOpenContextMenuStationId] = useState(null)
    const [contextMenuPosition, setContextMenuPosition] = useState({ mouseX: null, mouseY: null })

    useEffect(() => {
        const closeMenu = (event) => {
            handleContextMenuClose()
        }

        document.addEventListener('click', closeMenu);
        return () => {
            document.removeEventListener('click', closeMenu)
        }
    }, [handleContextMenuClose])


    function handleContextMenuOpen(stationId) {
        setOpenContextMenuStationId(stationId)
    }

    function handleContextMenuClose() {
        setOpenContextMenuStationId(null)
    }

    function handleContextMenuOpen(stationId, mouseX, mouseY) {
        setOpenContextMenuStationId(stationId)
        setContextMenuPosition({ mouseX, mouseY })
    }

    function handleContextMenuClose() {
        setOpenContextMenuStationId(null);
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

    return <div className="side-list">

        {stations.map(station => (
            <article className="side-preview" key={station._id}>
                <Link className="link" to={`/station/${station._id}`}>

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

        {isOnUpdate && (
            <UpdateStation
                station={selectedStation}
                handleStationUpdate={handleStationUpdate}
                setIsOnUpdate={setIsOnUpdate}
            />
        )}
    </div>
}


//  {shouldShowActionBtns(station) && <div>
//             <button onClick={() => { onRemoveStation(station._id) }}>x</button>
//             <button onClick={() => { onUpdateStation(station) }}>Edit</button>
//         </div>}

// <button onClick={() => { onAddStationMsg(station) }}>Add station msg</button>
//         <button className="buy" onClick={() => { onAddToStationt(station) }}>Add to stationt</button> 