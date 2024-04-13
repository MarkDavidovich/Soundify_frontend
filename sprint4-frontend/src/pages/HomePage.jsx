import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import  { useRef } from 'react'


import { loadStations } from '../store/actions/station.actions'
import { showErrorMsg } from '../services/event-bus.service'

import { AppHeader } from '../cmps/AppHeader'
import { StationList } from '../cmps/StationList'
import { StationDetails } from '../cmps/StationDetails'
import { MiniHomeStationList } from '../cmps/MiniHomeStationList'




export function HomePage() {
    const stations = useSelector(storeState => storeState.stationModule.stations)


    useEffect(() => {
        loadStations()
            .catch(err => {
                showErrorMsg('cannot load stations', err)
            })
    }, [])

  

    return (
        <>
            <AppHeader />

            <section className="main-view">
                {/* <AppHeader /> */}

                <MiniHomeStationList
                    stations={stations} />

                <StationList
                    stations={stations} />

                <StationList
                    stations={stations} />

            </section >
        </>
    )
}