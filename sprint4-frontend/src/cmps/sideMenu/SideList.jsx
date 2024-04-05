//RENDERS SIDE PREVIEWS

import { Link } from 'react-router-dom'
import { SidePreview } from './SidePreview.jsx'
import { UpdateStation } from './UpdateStation.jsx'
import { useState } from 'react';


export function SideList({ stations, onRemoveStation, onUpdateStation }) {

    const [isOnUpdate, setIsOnUpdate] = useState(false)
    const [selectedStation, setSelectedStation] = useState(null);

    function handleUpdateClick(station) {
        setSelectedStation(station)
        setIsOnUpdate(true)
    }

    function handleStationUpdate(updatedStation) {
        console.log("🚀 ~ handleStationUpdate ~ updatedStation:", updatedStation)

        onUpdateStation(updatedStation)
        setIsOnUpdate(false)
    }

    return <div className="side-list">

        {stations.map(station => (
            <article className="side-preview" key={station._id}>
                <Link className="link" to={`/station/${station._id}`}>

                    <SidePreview station={station}
                        onRemoveStation={onRemoveStation}
                        // onUpdateStation={onUpdateStation} 
                        onTriggerUpdate={() => handleUpdateClick(station)} />
                </Link>
            </article>
        ))}

        {isOnUpdate && (
            <UpdateStation
                station={selectedStation}
                // onUpdateStation={handleStationUpdate}
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