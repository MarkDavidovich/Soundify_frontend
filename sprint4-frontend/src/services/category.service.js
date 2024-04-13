
import { httpService } from "./http.service"

export const categoryService = {
    queryCategory,

}
window.cs = categoryService

async function queryCategory() {
    console.log('~~~~ queryCategory ~~~~')

    return httpService.get('category', { params: {} })

}