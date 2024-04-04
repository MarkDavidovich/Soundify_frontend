//RENDERS SIDE PREVIEWS

import { Link } from 'react-router-dom'
import { SidePreview } from './SidePreview.jsx'


export function SideList({ stations, onRemoveStation, onUpdateStation }) {


    return <div className="side-list">

        {stations.map(station => (
            <article className="side-preview" key={station._id}>
                <Link className="link" to={`/station/${station._id}`}>

                    <SidePreview station={station} onRemoveStation={onRemoveStation}
                        onUpdateStation={onUpdateStation} />
                </Link>
            </article>
        ))




            //  {shouldShowActionBtns(station) && <div>
            //             <button onClick={() => { onRemoveStation(station._id) }}>x</button>
            //             <button onClick={() => { onUpdateStation(station) }}>Edit</button>
            //         </div>} */}

            // <button onClick={() => { onAddStationMsg(station) }}>Add station msg</button>
            //         <button className="buy" onClick={() => { onAddToStationt(station) }}>Add to stationt</button>
        }

    </div>


}