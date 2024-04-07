import { togglePlaying } from "../store/actions/player.actions"
import { StationPreview } from "./StationPreview"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { getActionCurrStationIdx } from '../../src/store/actions/player.actions'

export function StationList({ stations }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const currStation = useSelector(storeState => storeState.playerModule.currStation)

  function onPlay(station, song, ev) {
    ev.stopPropagation()
    if (isPlaying && currStation._id === station._id) {
      togglePlaying(true)
      return
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
              />
            </div>
          ))
        }
      </section>
    </section>
  )

}
