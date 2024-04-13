
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { stationService } from './station.service.local.js'

// import categoriesData from '../data/categories.json'
import categoriesData from '../data/categoriesStationId.json'

const CATEGORY_KEY = 'categoryDB'

export const categoryService = {
    queryCategory,
    getById,
}
window.cs = categoryService

async function queryCategory() {
    var categories = await storageService.query(CATEGORY_KEY)

    return categories
}

function getById(categoryId) {
    console.log("🚀 ~ getById ~ categoryId:", categoryId)
    return storageService.get(CATEGORY_KEY, categoryId)
}








// Demo Data 
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





