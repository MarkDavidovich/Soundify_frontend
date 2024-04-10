import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

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
        <section className="main-view">
            {/* <AppHeader /> */}

            <MiniHomeStationList
                stations={stations} />

            <div className="list-name">Made for You</div>
            <StationList
                stations={stations} />

            <div className="list-name">Top lists</div>
            <StationList
                stations={stations} />

        </section >
    )
}