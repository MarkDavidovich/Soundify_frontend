import { useSelector } from "react-redux"
import { loadStations } from "../store/actions/station.actions";
import { useEffect } from "react"
import { SideList } from "../cmps/sideMenu/SideList"
import { Navigate, useNavigate } from "react-router"
import { useMediaQuery } from "@mui/material"

export function LibraryPage() {

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const navigate = useNavigate()
    const matchesMobile = useMediaQuery('(max-width: 480px)')

    useEffect(() => {
        loadStations()

        if (!matchesMobile) {
            navigate('/')
        }
    }, [navigate, matchesMobile])

    if (!stations) return <div></div>
    return (

        <section className="library-mobile">
            <SideList stations={stations} />

        </section>

    )
}