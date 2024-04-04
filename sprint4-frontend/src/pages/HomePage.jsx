import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStations } from '../store/actions/station.actions'
import { showErrorMsg } from '../services/event-bus.service'

import { StationList } from '../cmps/StationList'



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

            <StationList
                stations={stations} />


        </section >
    )
}