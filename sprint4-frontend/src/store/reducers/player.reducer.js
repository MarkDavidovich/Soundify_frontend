
export const SET_CURR_SONG = 'SET_CURR_SONG'
export const SET_CURR_STATION = 'SET_CURR_STATION'
export const IS_PLAYING = 'IS_PLAYING'

const initialState = {
  currSong: 'https://www.youtube.com/watch?v=kPBzTxZQG5Q',
  currStation: {},
  isPlaying: false,
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
  }
  console.log('State:', newState)
  return newState
}