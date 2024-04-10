export const MENU_TOGGLE = 'MENU_TOGGLE'

const initialState = {
    toggleLibrary: false
};

export function layoutReducer(state = initialState, action = {}) {
    switch (action.type) {
        case MENU_TOGGLE:
            return {
                ...state,
                toggleLibrary: !state.toggleLibrary
            }


        default:
            return state
    }
}