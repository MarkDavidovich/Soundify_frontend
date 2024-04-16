import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router'
import useMediaQuery from '@mui/material/useMediaQuery'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { Player } from './cmps/Player'
import { UserDetails } from './pages/UserDetails'
import { SideBar } from './cmps/sideMenu/SideBar'
import { useSelector } from 'react-redux'

export function RootCmp() {
    const matchesNarrow = useMediaQuery('(min-width: 720px)')
    const toggleLibrary = useSelector(stateStore => stateStore.layoutModule.toggleLibrary)
    const dynamicClass = toggleLibrary || !matchesNarrow ? '-collapsed' : ''
    const mainRef = useRef(null)
    const [scrollTop, setScrollTop] = useState(0)
    const [scrollBottom, setScrollBottom] = useState(0)

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollTop = mainRef.current.scrollTop
    //         const mainElement = mainRef.current
    //         const scrollBottom = mainElement.scrollHeight - mainElement.scrollTop - mainElement.clientHeight
    //         const currentScrollTop = scrollTop
    //         const currentScrollBottom = scrollBottom
    //         setScrollTop(currentScrollTop)
    //         setScrollBottom(currentScrollBottom)

    //         // console.log("🚀 ~ handleScroll ~ setScrollTop:", currentScrollTop)
    //         // console.log("🚀 ~ handleScroll ~ setScrollBottom:", currentScrollBottom)
    //     }

    //     const mainElement = mainRef.current;
    //     if (mainElement) {
    //         mainElement.addEventListener('scroll', handleScroll)
    //     }

    //     return () => {
    //         if (mainElement) {
    //             mainElement.removeEventListener('scroll', handleScroll)
    //         }
    //     }
    // }, [])

    return (
        <div className={'main-layout' + dynamicClass}>
            <SideBar />
            <main
                style={{ position: 'relative' }} className="main-view"
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

                    {/* <Route path="user/:id" element={<UserDetails />} /> */}
                </Routes>
            </main>
            <Player />
        </div>
    )
}


