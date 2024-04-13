
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { stationService } from './station.service.local.js'

import categoriesData from '../data/categories.json'

const CATEGORY_KEY = 'categoryDB'

export const categoryService = {
    queryCategory,

}
window.cs = categoryService

async function queryCategory() {
    var categories = await storageService.query(CATEGORY_KEY)

    return categories
}


function createRandomSong() {
    const songs = [
        { title: 'In The End', artist: 'Linkin Park', album: 'Hybrid Theory', imgUrl: 'linkToImg', duration: '3:36' },
        // Add more song templates
    ];
    const song = songs[Math.floor(Math.random() * songs.length)];
    return {
        ...song,
        id: utilService.makeId(),
        url: `https://www.youtube.com/watch?v=${utilService.makeId()}`,
        addedBy: 'Random User',
        addedAt: utilService.randomAddedTime(),
        isLiked: Math.random() > 0.5
    };
}




//DEMODATA





function _createCategories(numStationsPerCategory = 5) {

    let categories = utilService.loadFromStorage(CATEGORY_KEY)

    if (!categories || !categories.length) {
        console.log('No categories found in storage, creating new ones.')

        categories = categoriesData

        categories = categories.map(category => ({
            ...category,
            stations: category.stations.length ? category.stations : Array.from({ length: numStationsPerCategory }, stationService._createStations)
        }))

        utilService.saveToStorage(CATEGORY_KEY, categories)
        console.log('New categories saved:', categories)

    } else {
        console.log('Categories loaded from storage:', categories)
    }
    return categories
}


_createCategories()



const categoryStations = stationService._createStations


