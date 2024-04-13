import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'


import { loadStations } from '../store/actions/station.actions'
import { showErrorMsg } from '../services/event-bus.service'

import { AppHeader } from '../cmps/AppHeader'
import { StationList } from '../cmps/StationList'
import { StationDetails } from '../cmps/StationDetails'
import { MiniHomeStationList } from '../cmps/MiniHomeStationList'
import useMediaQuery from '@mui/material/useMediaQuery'
import { utilService } from '../services/util.service'


export function HomePage() {
    const width6 = useMediaQuery('(min-width: 1650px)')
    const width5 = useMediaQuery('(min-width: 1480px')
    const width4 = useMediaQuery('(min-width: 1300px)')
    const width3 = useMediaQuery('(min-width: 1100px)')
    const width2 = useMediaQuery('(min-width: 960px)')
    const width1 = useMediaQuery('(min-width: 850px)')

    const stations = useSelector(storeState => storeState.stationModule.stations)
    const homeMainViewRef = useRef(null)

    const amount = getAmount(width6, width5, width4, width3, width2, width1)

    function getAmount(width6, width5, width4, width3, width2, width1) {
        if (width6) return 8
        else if (width5) return 7
        else if (width4) return 6
        else if (width3) return 5
        else if (width2) return 4
        else if (width1) return 3
        else return 2
    }

    useEffect(() => {

        const handleScroll = () => {
        }

        const homeMainViewElement = homeMainViewRef.current;
        if (homeMainViewElement) {
            homeMainViewElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (homeMainViewElement) {
                homeMainViewElement.removeEventListener('scroll', handleScroll);
            }
        }
    }, [])

    const stations1 = stations.slice(0, 8)
    const stations2 = stations.slice(9, 17)
    const stations3 = stations.slice(18)

    return (
        <>
            <section ref={homeMainViewRef} className="home-main-view">

                <MiniHomeStationList
                    stations={stations3}
                />

                <StationList
                    stations={stations1}
                    amount={amount}
                    listName={'User favorites'}
                />

                <StationList
                    stations={stations3}
                    amount={amount}
                    listName={'Best of all time'}
                />

            </section >
        </>
    )
}
