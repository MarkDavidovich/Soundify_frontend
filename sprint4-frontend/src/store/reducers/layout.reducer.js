export const MENU_TOGGLE = 'MENU_TOGGLE'
export const MOBILE_TOGGLE = 'MOBILE_TOGGLE'

const initialState = {
    toggleLibrary: false,
    isMobile: false
}

export function layoutReducer(state = initialState, action = {}) {
    switch (action.type) {
        case MENU_TOGGLE:
            return {
                ...state,
                toggleLibrary: !state.toggleLibrary
            }
        case MOBILE_TOGGLE:
            return {
                ...state,
                isMobile: !state.isMobile
            }

        default:
            return state
    }
}