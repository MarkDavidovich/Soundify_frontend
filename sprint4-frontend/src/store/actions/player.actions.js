import { store } from '../store.js'
import { SET_CURR_SONG_IDX, IS_PLAYING, SET_CURR_STATION_IDX } from "../reducers/player.reducer.js"

// Action Creators:
export function getActionCurrSongIdx(currSongIdx) {
  return {
    type: SET_CURR_SONG_IDX,
    currSongIdx
  }
}

export function getActionIsPlaying(isPlaying) {
  return {
    type: IS_PLAYING,
    isPlaying
  }
}

export function getActionCurrStationIdx(currStationIdx) {
  return {
    type: SET_CURR_STATION_IDX,
    currStationIdx
  }
}

// export function getActionNextSong(nextSong) {
//   return {
//     type: SET_NEXT_SONG,
//     nextSong
//   }
// }

// export function getActionPrevSong(prevSong) {
//   return {
//     type: SET_PREV_SONG,
//     prevSong
//   }
// }

// export async function setNextSong(song, station) {
//   try {
//     const songIdx = station.songs.findIndex(s => s.id === song.id)
//     console.log('setNextSong func, song.id:', song.id)
//     const nextSong = (songIdx + 1 < station.songs.length) ? station.songs[songIdx + 1] : station.songs[0]
//     console.log('setNextSong func, nextSong', nextSong)
//     store.dispatch(getActionNextSong(nextSong))
//     return nextSong
//   } catch (err) {
//     console.log('cannot change song', err)
//     throw err
//   }
// }

// export async function setPrevSong(song, station) {
//   try {
//     const songIdx = station.songs.findIndex(s => s.id === song.id)
//     const prevSong = (songIdx - 1 < 0) ? station.songs[station.songs.length - 1] : station.songs[songIdx - 1]
//     store.dispatch(getActionPrevSong(prevSong))
//     console.log('setPrevSong func, prevSong', prevSong)
//     return prevSong
//   } catch (err) {
//     console.log('cannot change song', err)
//     throw err
//   }
// }

export async function togglePlaying(isPlaying) {
  try {
    store.dispatch(getActionIsPlaying(!isPlaying))
    return !isPlaying
  } catch (err) {
    console.log('cannot play/pause', err)
    throw err
  }
}

export async function setCurrSongIdx(songIdx) {
  console.log("🚀 ~ setCurrSong ~ song:", songIdx)
  try {
    // localStorage.setItem("currSong", song.id)
    store.dispatch(getActionCurrSongIdx(songIdx))
    // return songIdx
    //! CHECK THE RETURN VALUE
  } catch (err) {
    console.log('cannot set current song', err)
    throw err
  }
}

export async function setCurrStationIdx(stationIdx) {
  console.log("🚀 ~ setCurrStation ~ station:", stationIdx)
  try {
    store.dispatch(getActionCurrStationIdx(stationIdx))
    // return stationIdx
    // !CHECK THIS AS WELL
  } catch (err) {
    console.log('cannot set station', err)
    throw err
  }
}
