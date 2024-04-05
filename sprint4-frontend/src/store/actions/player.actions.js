import { store } from '../store.js'
import { SET_CURR_SONG, IS_PLAYING, SET_CURR_STATION } from "../reducers/player.reducer.js"

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
