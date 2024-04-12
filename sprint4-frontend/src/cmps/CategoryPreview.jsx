
export function CategoryPreview({ category }) {

    return (
        <div className="category-preview-container">
            <img className='category-preview-img' src={category.imgUrl} alt={category.name} />
            <div className='category-preview-name'>
                <span className="category-name">{category.name}</span>
            </div>
        </div>
    )
}