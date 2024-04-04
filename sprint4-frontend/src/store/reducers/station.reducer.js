import { stationService } from "../../services/station.service.local"

export const SET_STATIONS = 'SET_STATIONS'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const UNDO_REMOVE_STATION = 'UNDO_REMOVE_STATION'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
    stations: [],
    lastRemovedStation: null,
    filterBy: stationService.getEmptyFilterBy(),
}

export function stationReducer(state = initialState, action) {
    var newState = state
    var stations

    switch (action.type) {
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break

        case REMOVE_STATION:
            const lastRemovedStation = state.stations.find(station => station._id === action.stationId)
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations, lastRemovedStation }
            break

        case ADD_STATION:
            newState = { ...state, stations: [...state.stations, action.station] }
            break

        case UPDATE_STATION:
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            newState = { ...state, stations }
            break

        case UNDO_REMOVE_STATION:
            if (state.lastRemovedStation) {
                newState = { ...state, stations: [...state.stations, state.lastRemovedStation], lastRemovedStation: null }
            }
            break

        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        default:
    }
    return newState
}
