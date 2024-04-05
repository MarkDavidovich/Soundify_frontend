import { useEffect, useRef, useState } from "react"
import { utilService } from "../../services/util.service"
import TextField from '@mui/material/TextField';


export function SideFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="side-filter">

            <form className="side-search-library">

                {/* <TextField
                    // id="filled-search"
                    type="text"
                    // variant="filled"
                    name="txt"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                    placeholder="Search in your library"
                /> */}
                <input
                    type="text"
                    name="txt"
                    id="txt"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                    placeholder="Search in your library"
                />
            </form>
        </div>
    )
}