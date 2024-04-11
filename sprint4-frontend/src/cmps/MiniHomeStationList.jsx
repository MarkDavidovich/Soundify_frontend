import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getActionCurrStationIdx } from '../store/actions/player.actions'
import { StationPreview } from './StationPreview'
import { useNavigate } from "react-router-dom"
import { FastAverageColor } from 'fast-average-color'
import { useEffect } from 'react'

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

  // useEffect(() => {
  
  //   extractColor(currStation?.imgUrl, setBackgroundColor)


  // }, [])

  function handleStationClick(station) {
    dispatch(getActionCurrStationIdx(station))
  }

  if (!stations) return <div></div>

  // const filteredStations = stations.filter(station => (station._id !== 'liked-songs'))

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
              />
            </div>
          ))
        }
      </div>
    </section>
  )
}