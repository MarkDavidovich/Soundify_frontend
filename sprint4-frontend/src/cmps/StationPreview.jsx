
import { useDispatch } from 'react-redux'
import { getActionCurrStation } from '../../src/store/actions/player.actions'

export function StationPreview({ station }) {

    const dispatch = useDispatch()

    function handleStationClick(station) {
        dispatch(getActionCurrStation(station))
    }

    return (

        <article className="station-preview" onClick={handleStationClick(station)}>
            <div className="img-container">
                <img className="station-img" src={station.imgUrl} alt={`${station.name}`} />
            </div>
            <div className="station-content">
                <h3 className="toy-name">{station.name}</h3>
                <h5 className="toy-desc">{station.desc}</h5>
            </div>
        </article>
    )
}
