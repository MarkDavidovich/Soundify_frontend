import { utilService } from "../services/util.service"
import { StationList } from "./StationList"

export function CategoryPreview({ category, idx }) {

    const bgColor = utilService.generateBgColor(idx)

    return (
        <div className="category-preview-container"
            style={{ background: bgColor }}>
            <div className='category-preview-name'>
                <span className="category-name">{category.name}</span>
            </div>
            <img className='category-preview-img' src={category.imgUrl} alt={category.name} />


        </div>
    )
}