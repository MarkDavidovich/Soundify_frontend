import { useEffect, useState } from "react"
import { AppHeader } from "../cmps/AppHeader"
import { CategoryList } from "../cmps/CategoryList"
// import { categoryService } from "../services/category.service.local"
import { categoryService } from "../services/category.service"
import { MainViewFooter } from "../cmps/MainViewFooter"

export function SearchPage() {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    setLoading(true)
    try {
      const loadedCategories = await categoryService.queryCategory()
      setCategories(loadedCategories)
      console.log('Categories from DB:', loadedCategories)
    } catch (err) {
      console.log('Cannot load categories')
    } finally {
      setLoading(false)
    }
  }

  console.log("🚀 ~ loadCategories ~ categories:", categories)


  return (
    <>
      {/* <AppHeader /> */}
      <div className="search-page">


        <div className="search-page">

          <h2>Browse all</h2>

          <div className="grid-container">

            <CategoryList categories={categories} />

          </div>

          <MainViewFooter />
        </div>
      </div>
    </>
  )
}