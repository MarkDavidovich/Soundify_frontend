import { Link } from "react-router-dom"
import { CategoryPreview } from "./CategoryPreview"


export function CategoryList({ categories }) {

    return (
        <div className="category-list-container">

            {categories.map(category => (
                <div className="category-preview" key={category._id}>

                    <Link className="link" to={`/category/${category._id}`}>
                        <CategoryPreview category={category} />
                    </Link>
                </div>
            ))
            }
        </div >
    )
}

