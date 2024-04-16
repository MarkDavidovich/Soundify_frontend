import { useParams } from "react-router"
// import { categoryService } from "../services/category.service.local"
import { categoryService } from "../services/category.service"
import { useEffect, useState } from "react"
import { StationList } from "../cmps/StationList"
import { MainStationList } from "../cmps/MainStationList"

export function CategoryStations() {
    const { id } = useParams()
    const [category, setCategory] = useState(null)


    useEffect(() => {

        async function getCategoryById() {
            try {
                const fetchedCategory = await categoryService.getById(id)
                setCategory(fetchedCategory)
            } catch (err) {
                console.log('Cannot get category by Id')
            }
        }

        if (id) {
            getCategoryById()
        }

    }, [id])

    if (!category) return <div>Loading...</div>
    return <div>

        <MainStationList
            stations={category.stations}
            listName={category.name}
            type={'big'}
        />
    </div>

}