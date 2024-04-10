import { useEffect, useRef, useState } from "react"
import { utilService } from "../../services/util.service"


export function SideFilter({ filterBy, onSetFilter, onFilterBlur }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    const filterRef = useRef()

    function handleOutsideClick(ev) {
        if (filterRef.current && !filterRef.current.contains(ev.target)) {
            onFilterBlur()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)

        onSetFilter.current(filterByToEdit)

        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function handleBlur() {
        console.log('Input field lost focus')
        onFilterBlur()
    }

    return (
        <div ref={filterRef} className="side-filter">

            <form className="side-search-library">

                <input
                    type="text"
                    name="txt"
                    id="txt"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                    placeholder="Search in your library"
                    onBlur={handleBlur}
                />
            </form>
        </div>
    )
}