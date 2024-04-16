import { StationPreview } from './StationPreview'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

export function MiniHomeStationList({ activeStation, setActiveStation, onPlay, handleStationClick, stations, extractColor }) {
  const navigate = useNavigate()
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

  //! THIS WILL SHOW THE 8 LAST STATIONS THE USER LISTENED TO


  if (!stations) return <div></div>
  return (
    <section className="mini-stations-container">
      <div className='mini-station-list'>
        {
          stations.slice(0, 8).map(station => (
            <div className='mini-station' key={station._id}
              onMouseEnter={() => extractColor(station.imgUrl)}
              onClick={() => {
                navigate(`/station/${station._id}`)
                handleStationClick(station)
              }}>
              <StationPreview
                station={station}
                onPlay={onPlay}
                isMini={true}
                setActiveStation={setActiveStation}
                activeStation={activeStation}
                isPlaying={isPlaying}
              />
            </div>
          ))
        }
      </div>
    </section>
  )
}