import { store } from '../store.js'
import { MENU_TOGGLE } from '../reducers/layout.reducer.js'


export function toggleLibraryAction() {
    return {
        type: MENU_TOGGLE,
        // toggleLibrary
    }
}

// export async function setToggleLibrary(toggleLibrary) {
//     try {
//         store.dispatch(getLibraryToggle(!toggleLibrary))
//         console.log("🚀 ~ setToggleLibrary ~ toggleLibrary:", toggleLibrary)

//         return !toggleLibrary
//     } catch (err) {
//         console.log('cannot toggle library', err)
//         throw err
//     }
// }