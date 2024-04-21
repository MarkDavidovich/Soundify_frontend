import React, { useRef, useState } from 'react'
import { Routes, Route } from 'react-router'
import useMediaQuery from '@mui/material/useMediaQuery'
import routes from './routes'
import { AppHeader } from './cmps/AppHeader'
import { Player } from './cmps/Player'
import { SideBar } from './cmps/sideMenu/SideBar'
import { useSelector } from 'react-redux'

export function RootCmp() {
    const matchesNarrow = useMediaQuery('(max-width: 720px)')
    const matchesMobile = useMediaQuery('(max-width: 480px)')
    const isMobile = useSelector(stateStore => stateStore.layoutModule.isMobile)
    const toggleLibrary = useSelector(stateStore => stateStore.layoutModule.toggleLibrary)
    const dynamicClass = matchesMobile ? '-mobile' : ((toggleLibrary || matchesNarrow) ? '-collapsed' : '')
    const mainRef = useRef(null)
    const [scrollTop, setScrollTop] = useState(0)
    const [scrollBottom, setScrollBottom] = useState(0)

    return (
        <div className={'main-layout' + dynamicClass}>
            <SideBar />
            <main
                style={{ position: 'relative' }} className={`main-view ${matchesMobile && ' mobile'}`}
                ref={mainRef}
            >
                <AppHeader
                    scrollTop={scrollTop}
                    scrollBottom={scrollBottom}
                />
                <Routes>
                    {routes.map(
                        route => <Route
                            key={route.path}
                            exact={true}
                            element={route.component}
                            path={route.path}
                        />)}
                </Routes>
            </main>
            <Player />
        </div>
    )
}


