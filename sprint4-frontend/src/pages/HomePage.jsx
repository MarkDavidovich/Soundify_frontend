import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions'
import { showErrorMsg } from '../services/event-bus.service'

import { AppHeader } from '../cmps/AppHeader'
import { StationList } from '../cmps/StationList'
import { StationDetails } from '../cmps/StationDetails'



export function HomePage() {
    const stations = useSelector(storeState => storeState.stationModule.stations)


    useEffect(() => {
        loadStations()
            .catch(err => {
                showErrorMsg('cannot load stations')
            })
    }, [])

    return (
        <section className="main-view">
            <AppHeader />

            <div>some stations</div>
            <StationList
                stations={stations} />

            <div>some more stations</div>
            <StationList
                stations={stations} />

            <div>even more stations</div>
            <StationList
                stations={stations} />

        </section >
    )
}