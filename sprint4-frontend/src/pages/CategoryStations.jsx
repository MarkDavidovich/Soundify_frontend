import { useParams } from "react-router"
// import { categoryService } from "../services/category.service.local"
import { categoryService } from "../services/category.service"
import { useEffect, useState } from "react"
import { StationList } from "../cmps/StationList"
import { MainStationList } from "../cmps/MainStationList"
import { utilService } from "../services/util.service"

export function CategoryStations() {
    const { id } = useParams()
    const [category, setCategory] = useState(null)
    const [categoryIdx, setCategoryIdx] = useState(null)
    const [bgColor, setBgColor] = useState('')


    useEffect(() => {

        async function fetchCategoryData() {
            try {
                const fetchedCategory = await categoryService.getById(id)
                setCategory(fetchedCategory)

                const categoryIndex = await categoryService.getIdxById(id)
                console.log("🚀 ~ fetchCategoryData ~ categoryIndex:", categoryIndex)

                setCategoryIdx(categoryIndex)

                const bgColor = utilService.generateBgColor(categoryIndex)
                setBgColor(bgColor)

            } catch (err) {
                console.log('Error fetching category data: ', err)
            }
        }

        if (id) {
            fetchCategoryData()
        }

    }, [categoryIdx, id])


    if (!category) return <div></div>

    return <section className="category">
        {/* <div className="info-category flex"> */}

        <div className="category-info-container flex" style={{ backgroundColor: bgColor }}>
            <div className="category-img-container">
                <img className="category-img" src={category.imgUrl} alt="" />
            </div>
            <div className="category-name">{category.name}</div>
        </div>
        {/* </div> */}

        <MainStationList
            stations={category.stations}
            // listName={category.name}
            type={'big'}
        />
    </section>

}
