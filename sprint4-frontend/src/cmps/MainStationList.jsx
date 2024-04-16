import { useSelector } from 'react-redux'
import { setCurrSongIdx, setCurrStationIdx, togglePlaying } from '../store/actions/player.actions'
import { StationPreview } from './StationPreview'
import { useNavigate } from "react-router-dom"
import { FastAverageColor } from 'fast-average-color'
import { useState } from 'react'
import { stationService } from '../services/station.service'
import { setCurrViewedStationIdx } from '../store/actions/station.actions'
import { StationList } from './StationList'
import { MiniHomeStationList } from './MiniHomeStationList'

export function MainStationList({ stations, listName, amount, type }) {
  const [activeStation, setActiveStation] = useState(null)
  const currStationIdx = useSelector(storeState => storeState.playerModule.currStationIdx)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)


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
    const stationIdx = stationService.getIdxById(station._id)
    setCurrViewedStationIdx(stationIdx)
  }

  if (!stations) return <div></div>

  return (
    <>
      {type === 'big' &&
        <StationList
          activeStation={activeStation}
          setActiveStation={setActiveStation}
          onPlay={onPlay}
          handleStationClick={handleStationClick}
          stations={stations}
          listName={listName}
          amount={amount}
        />}
      {type === 'mini' &&
        <MiniHomeStationList
          activeStation={activeStation}
          setActiveStation={setActiveStation}
          onPlay={onPlay}
          handleStationClick={handleStationClick}
          stations={stations}
          extractColor={extractColor}
        />}
    </>
  )
}