import { useEffect, useRef, useState } from "react"
import { utilService } from "../../services/util.service"


export function SideFilter({ filterBy, onSetFilter, toggleFilter,
    setToggleFilter, onFilterBlur }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    // onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    const filterRef = useRef()

    // function handleOutsideClick(ev) {
    //     if (toggleFilter && filterRef.current && !filterRef.current.contains(ev.target)) {
    //         setToggleFilter(false)
    //         // onFilterBlur()
    //     }
    // }

    useEffect(() => {

        function handleOutsideClick(ev) {
            if (filterRef.current && !filterRef.current.contains(ev.target)) {
                setToggleFilter(false)
                // close the filter when clicking outside
            }
        }

        if (toggleFilter) {
            document.addEventListener('mousedown', handleOutsideClick)
        }
        // onSetFilter.current(filterByToEdit)

        console.log("toggleFilter changed to:", toggleFilter);


        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }

    }, [toggleFilter])


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit, onSetFilter])


    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // function handleBlur() {
    //     console.log('Input field lost focus')
    //     onFilterBlur()
    // }

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
                // onBlur={handleBlur}
                />
            </form>
        </div>
    )
}