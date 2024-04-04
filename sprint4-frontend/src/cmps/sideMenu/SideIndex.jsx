import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PortalWithState } from 'react-portal'


import { loadStations, addStation, updateStation, removeStation, setStationFilter } from '../../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { stationService } from '../../services/station.service.js'

import { SideFilter } from './SideFilter.jsx'
import { SideList } from './SideList.jsx'

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

        //! Switch to Modal + Form
        station.name = prompt('Station Name?')
        try {
            const savedStation = await addStation(station)
            showSuccessMsg(`Station added (id: ${savedStation._id})`)
        } catch (err) {
            showErrorMsg('Cannot add station')
        }
    }

    //! EDIT = Update --> with Modal
    async function onUpdateStation(station) {
        console.log("🚀 ~ onUpdateStation ~ station:", station)

        const name = prompt('New name?')
        const stationToSave = { ...station, name }
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
            <div className="side-index-top-bar flex">
                <h3>Your Library</h3>
                <button onClick={onAddStation}>+</button>
            </div>

            <PortalWithState closeOnOutsideClick closeOnEsc>
                {({ openPortal, closePortal, isOpen, portal }) => (
                    <>
                        <button onClick={openPortal}>
                            Open Portal
                        </button>
                        {portal(
                            <p>
                                This is more advanced Portal. It handles its own state.{' '}
                                <button onClick={closePortal}>Close me!</button>, hit ESC or
                                click outside of me.
                            </p>
                        )}
                    </>
                )}
            </PortalWithState>

            <SideFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <main>

                <SideList stations={stations} onRemoveStation={onRemoveStation}
                    onUpdateStation={onUpdateStation} />

            </main>
        </div>
    )
}



