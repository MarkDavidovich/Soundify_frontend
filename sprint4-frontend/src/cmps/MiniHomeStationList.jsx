import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getActionCurrStationIdx } from '../store/actions/player.actions'
import { StationPreview } from './StationPreview'
import { useNavigate } from "react-router-dom"

export function MiniHomeStationList({ stations }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //! THIS WILL SHOW THE 8 LAST STATIONS THE USER LISTENED TO

  function onPlay(station, ev) {
    ev.stopPropagation()
    if (isPlaying && currStation._id === station._id) {
      togglePlaying(true)
      return
    }
  }

  function handleStationClick(station) {
    dispatch(getActionCurrStationIdx(station))
  }

  if (!stations) return <div></div>

  return (
    <section className="mini-stations-container">
      <div className='mini-station-list'>
        {
          stations.slice(0, 8).map(station => (
            <div className='mini-station' key={station._id}
              onClick={() => {
                navigate(`/station/${station._id}`)
                handleStationClick(station)
              }}>
              <StationPreview
                station={station}
                onPlay={onPlay}
                isMini={true}
              />
            </div>
          ))
        }
      </div>
    </section>
  )
}