
import { httpService } from "./http.service"

export const categoryService = {
    queryCategory,
    getById
}
window.cs = categoryService

async function queryCategory() {
    console.log('~~~~ queryCategory ~~~~')

    return httpService.get('category', { params: {} })

}

async function getById(categoryId) {
    return httpService.get(`category/${categoryId}`)
}