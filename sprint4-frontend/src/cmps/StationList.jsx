import { StationPreview } from "./StationPreview"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { getActionCurrStationIdx, setCurrStationIdx, setCurrSongIdx, togglePlaying } from "../store/actions/player.actions"
import { useState } from "react"

export function StationList({ stations }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const currStationIdx = useSelector(storeState => storeState.playerModule.currStationIdx)
  const [activeStation, setActiveStation] = useState(null)

  function onPlay(ev, station) {
    ev.stopPropagation()
    setActiveStation(station)
    const clickedStationIdx = stations.findIndex(s => s._id === station._id)
    if (clickedStationIdx === currStationIdx) {
      togglePlaying(isPlaying)
    } else if (clickedStationIdx !== currStationIdx) {
      setCurrStationIdx(clickedStationIdx)
      setCurrSongIdx(0)
      togglePlaying(false)
    } else {
      togglePlaying(true)
    }
  }


  function handleStationClick(station) {
    dispatch(getActionCurrStationIdx(station))
  }

  if (!stations) return <div>LOADING STATIONS...</div>
  return (
    <section>
      <section className="station-list-container">
        {
          stations.map(station => (
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