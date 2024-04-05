import { store } from '../store.js'
import { SET_CURR_SONG, IS_PLAYING, SET_CURR_STATION, SET_NEXT_SONG, SET_PREV_SONG } from "../reducers/player.reducer.js"

// Action Creators:
export function getActionCurrSong(currSong) {
  return {
    type: SET_CURR_SONG,
    currSong
  }
}

export function getActionIsPlaying(isPlaying) {
  return {
    type: IS_PLAYING,
    isPlaying
  }
}

export function getActionCurrStation(currStation) {
  return {
    type: SET_CURR_STATION,
    currStation
  }
}

export function getActionNextSong(nextSong) {
  return {
    type: SET_NEXT_SONG,
    nextSong
  }
}

export function getActionPrevSong(prevSong) {
  return {
    type: SET_PREV_SONG,
    prevSong
  }
}

export async function setNextSong(song, station) {
  try {
    const songIdx = station.songs.findIndex(s => s.id === song.id)
    const nextSong = (songIdx + 1 < station.songs.length) ? station.songs[songIdx + 1] : station.songs[0]
    store.dispatch(getActionNextSong(nextSong))
    return nextSong
  } catch (err) {
    console.log('cannot change song', err)
    throw err
  }
}

export async function setPrevSong(song, station) {
  try {
    const songIdx = station.songs.findIndex(s => s.id === song.id)
    const prevSong = (songIdx - 1 < 0) ? station.songs[station.songs.length - 1] : station.songs[songIdx - 1]
    store.dispatch(getActionPrevSong(prevSong))
    return prevSong
  } catch (err) {
    console.log('cannot change song', err)
    throw err
  }
}

export async function togglePlaying(isPlaying) {
  try {
    store.dispatch(getActionIsPlaying(!isPlaying))
    return !isPlaying
  } catch (err) {
    console.log('cannot play/pause', err)
    throw err
  }
}

export async function setCurrSong(song) {
  try {
    localStorage.setItem("currSong", song.id)
    store.dispatch(getActionCurrSong(song))
    return song
  } catch (err) {
    console.log('cannot play/pause', err)
    throw err
  }
}

export async function setCurrStation(station) {
  try {
    store.dispatch(getActionCurrStation(station))
    return station
  } catch (err) {
    console.log('cannot set station', err)
    throw err
  }
}
