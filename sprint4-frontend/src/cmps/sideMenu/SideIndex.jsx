import 'animate.css';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadStations, addStation, updateStation, removeStation, setStationFilter, setStationSort } from '../../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { stationService } from '../../services/station.service.local.js'

import { SideFilter } from './SideFilter.jsx'
import { SideList } from './SideList.jsx'
import { SideAddStationModal } from './SideAddStationModal.jsx'
import { SideSort } from './SideSort.jsx'
import { Navigate } from 'react-router'

export function SideIndex() {

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const filterBy = useSelector(storeState => storeState.stationModule.filterBy)
    const sortBy = useSelector(storeState => storeState.stationModule.sortBy)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [toggleLibrary, setToggleLibrary] = useState(false)

    useEffect(() => {
        loadStations()
    }, [filterBy, sortBy])

    async function onRemoveStation(stationId) {
        try {
            await removeStation(stationId)
            showSuccessMsg('Station removed')
            Navigate('/')
        } catch (err) {
            showErrorMsg('Cannot remove station')
        }
    }

    async function onAddStation() {
        const station = stationService.getEmptyStation()

        let stationNum = stations.length + 1
        const newStationName = `My Playlist #${stationNum}`
        station.name = newStationName

        try {
            const savedStation = await addStation(station)
            showSuccessMsg(`Station added (id: ${savedStation._id})`)
        } catch (err) {
            showErrorMsg('Cannot add station')
        }
    }

    async function onUpdateStation(station) {

        const stationToSave = { ...station }
        try {
            const savedStation = await updateStation(stationToSave)
            showSuccessMsg(`Station updated, new name: ${savedStation.name}`)
        } catch (err) {
            showErrorMsg('Cannot update station')
        }
    }

    function onAddStationMsg(station) {
        console.log(`TODO Adding msg to station`)
        try {
            showSuccessMsg(`Station msg added, it now has: ${3}`)
        } catch (err) {
            showErrorMsg('Cannot update station')
        }
    }

    function onSetFilter(filterBy) {
        setStationFilter(filterBy)
    }

    function onSetSort(sortBy) {
        setStationSort(sortBy)
    }

    function onToggleLibrary() {
        setToggleLibrary(!toggleLibrary)
    }

    function onToggleFilter() {
        setToggleFilter(!toggleFilter)

    }

    function setSearchClass() {
        if (!toggleFilter) return 'search-btn close'
        else return 'search-btn open'
    }


    // function shouldShowActionBtns(station) {
    //     const user = userService.getLoggedinUser()
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return station.owner?._id === user._id
    // }

    return (
        <div className="side-index">
            <div className="top-bar flex">
                <button className="your-library flex" onClick={onToggleLibrary}>
                    <svg role="img" height="20" width="20" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 haNxPq">

                        <path
                            className="icon" d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" fill="#b3b3af">
                        </path>

                        {toggleLibrary &&
                            <path
                                d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z" fill="#b3b3af">
                            </path>
                        }
                    </svg>
                    <span className="library">Your Library</span>
                </button>

                {/* Maybe for right click modal */}
                {/* <SideAddStationModal /> */}

                <button className="add-btn" onClick={onAddStation}><svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon">
                    <path className="plus-icon" d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" fill="#b3b3af">
                    </path>
                </svg></button>
            </div>

            <SideSort sortBy={sortBy} onSetSort={onSetSort} />

            <div className="search-library flex">
                <button className={setSearchClass()} onClick={onToggleFilter}>
                    <svg role="img" height="16" width="16" aria-hidden="true" className="Svg-sc-ytk21e-0 haNxPq mOLTJ2mxkzHJj6Y9_na_" viewBox="0 0 16 16" data-encore-id="icon"><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0  1 .25 7z" fill="#FFFFFF"></path></svg>
                </button>


                {toggleFilter &&

                    <SideFilter className={"animate__animated animate__fadeInLeft"} filterBy={filterBy} onSetFilter={onSetFilter} />
                }
            </div>

            <SideList stations={stations} onRemoveStation={onRemoveStation}
                onUpdateStation={onUpdateStation} />

        </div>
    )
}



