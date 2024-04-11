import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getActionCurrStationIdx, setCurrSongIdx, setCurrStationIdx, togglePlaying } from '../store/actions/player.actions'
import { StationPreview } from './StationPreview'
import { useNavigate } from "react-router-dom"
import { FastAverageColor } from 'fast-average-color'
import { useState } from 'react'

export function MiniHomeStationList({ stations }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeStation, setActiveStation] = useState(null)
  const currStationIdx = useSelector(storeState => storeState.playerModule.currStationIdx)

  //! THIS WILL SHOW THE 8 LAST STATIONS THE USER LISTENED TO

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

  async function extractColor(stationImgUrl, setBackgroundColor) {
    if (!stationImgUrl) return
    const fac = new FastAverageColor()
    try {
      const color = await fac.getColorAsync(stationImgUrl)
      // setBackgroundColor(color.hex)
      document.body.style.setProperty('--bg-color', [color.hex])
    } catch (error) {
      console.error('Error extracting color:', error)
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
              />
            </div>
          ))
        }
      </div>
    </section>
  )
}