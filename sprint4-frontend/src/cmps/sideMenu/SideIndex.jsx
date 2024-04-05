import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Dropdown } from '@mui/base/Dropdown'
import { Menu } from '@mui/base/Menu'
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton'
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';

import { loadStations, addStation, updateStation, removeStation, setStationFilter } from '../../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { stationService } from '../../services/station.service.local.js'

import { SideFilter } from './SideFilter.jsx'
import { SideList } from './SideList.jsx'
import { SideAddStationModal } from './SideAddStationModal.jsx'

export function SideIndex() {

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const filterBy = useSelector(storeState => storeState.stationModule.filterBy)

    useEffect(() => {
        loadStations()
    }, [filterBy])

    async function onRemoveStation(stationId) {
        try {
            await removeStation(stationId)
            showSuccessMsg('Station removed')
        } catch (err) {
            showErrorMsg('Cannot remove station')
        }
    }

    async function onAddStation() {
        const station = stationService.getEmptyStation()

        let stationNum
        if (!stations.length) stationNum = 1
        else stationNum = 1 + stations.length++

        const newStationName = `My Playlist #${stationNum}`

        station.name = newStationName
        console.log("🚀 ~ onAddStation ~ station:", station)

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

    // function shouldShowActionBtns(station) {
    //     const user = userService.getLoggedinUser()
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return station.owner?._id === user._id
    // }

    return (
        <div className="side-index">
            <div className="top-bar flex">
                <h3>Your Library</h3>

                {/* Maybe for right click modal */}
                <SideAddStationModal />

                <button onClick={onAddStation}>+</button>
            </div>

            <SideFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <main>

                <SideList stations={stations} onRemoveStation={onRemoveStation}
                    onUpdateStation={onUpdateStation} />

            </main>
        </div>
    )
}



