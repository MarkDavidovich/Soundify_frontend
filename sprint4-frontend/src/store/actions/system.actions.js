import { store } from '../store.js'
import { CLEAR_SEARCH_TERM, SET_SEARCH_TERM } from '../reducers/system.reducer.js'

export function setSearchTerm(term) {
    return (
        { type: SET_SEARCH_TERM, term }
    )
}
export function clearSearchTerm() {
    return (
        { type: CLEAR_SEARCH_TERM }
    )
}