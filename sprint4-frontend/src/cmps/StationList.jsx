import { StationPreview } from "./StationPreview"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export function StationList({ activeStation, setActiveStation, onPlay, handleStationClick, stations, listName, amount }) {
  const navigate = useNavigate()
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

  if (!stations) return <div></div>
  return (
    <section className='main-stations-container'>
      <div className="station-list-name">{listName}</div>
      <section className="station-list-container">
        {
          stations.slice(0, amount).map(station => (
            <div className='station-list-item' key={station._id}
              onClick={() => {
                navigate(`/station/${station._id}`)
                handleStationClick(station)
              }}>
              <StationPreview
                station={station}
                onPlay={onPlay}
                isMini={false}
                isPlaying={isPlaying}
                setActiveStation={setActiveStation}
                activeStation={activeStation}
              />
            </div>
          ))
        }
      </section>
    </section>
  )
}