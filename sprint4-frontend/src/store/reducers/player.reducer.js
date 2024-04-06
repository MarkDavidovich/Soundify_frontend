
export const SET_CURR_SONG = 'SET_CURR_SONG'
export const SET_CURR_STATION = 'SET_CURR_STATION'
export const IS_PLAYING = 'IS_PLAYING'
export const SET_NEXT_SONG = 'SET_NEXT_SONG'
export const SET_PREV_SONG = 'SET_PREV_SONG'

const initialState = {
  currSong: {},
  currStation: {},
  isPlaying: false,
  nextSong: null,
  prevSong: null,
}

export function playerReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {

    case SET_CURR_SONG:
      newState = { ...state, currSong: action.currSong }
      break
    case SET_CURR_STATION:
      newState = { ...state, currStation: action.currStation }
      break
    case IS_PLAYING:
      newState = { ...state, isPlaying: action.isPlaying }
      break
    default:
    case SET_NEXT_SONG:
      newState = { ...state, nextSong: action.nextSong }
      break
    case SET_PREV_SONG:
      newState = { ...state, prevSong: action.prevSong }
      break
  }

  console.log('State:', newState)
  return newState
}