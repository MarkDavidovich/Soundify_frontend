
import { httpService } from "./http.service"

export const categoryService = {
    queryCategory,
    getById,
    getIdxById
}
window.cs = categoryService

async function queryCategory() {
    console.log('~~~~ queryCategory ~~~~')

    return httpService.get('category', { params: {} })

}

async function getById(categoryId) {
    return httpService.get(`category/${categoryId}`)
}

async function getIdxById(id) {

    try {
        const categories = await queryCategory()

        const idx = categories.findIndex(category => category._id === id)

        if (idx === -1) return new Error('could not find index in categories')
        return idx
    }
    catch (err) {
        console.log('could not get station idx', err)
    }
}