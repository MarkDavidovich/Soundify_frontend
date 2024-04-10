import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { SideBar } from './cmps/sideMenu/SideBar'
import { useSelector } from 'react-redux'

export function RootCmp() {

    const toggleLibrary = useSelector(stateStore => stateStore.layoutModule.toggleLibrary)

    const dynamicClass = toggleLibrary ? '-collapsed' : ''


    return (
        <div className={'main-layout' + dynamicClass}>
            {/* <AppHeader /> */}
            <SideBar />
            <main className="main-view">
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}

                    {/* <Route path="user/:id" element={<UserDetails />} /> */}
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


