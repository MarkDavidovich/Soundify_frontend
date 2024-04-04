import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation } from '../../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { userService } from '../../services/user.service.js'
import { stationService } from '../../services/station.service.js'

import { SideList } from './SideList.jsx'
export function SideIndex() {

    const stations = useSelector(storeState => storeState.stationModule.stations)

    useEffect(() => {
        console.log('hello')
        loadStations()
    }, [])

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
        // switch to form
        station.name = prompt('Station Name?')
        try {
            const savedStation = await addStation(station)
            showSuccessMsg(`Station added (id: ${savedStation._id})`)
        } catch (err) {
            showErrorMsg('Cannot add station')
        }
    }

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

    // function shouldShowActionBtns(station) {
    //     const user = userService.getLoggedinUser()
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return station.owner?._id === user._id
    // }

    return (
        <div className="SideIndex">
            <h3>Your Library</h3>
            <main>
                <button onClick={onAddStation}>+</button>

                <SideList stations={stations} onRemoveStation={onRemoveStation}
                    onUpdateStation={onUpdateStation} />

            </main>
        </div>
    )
}