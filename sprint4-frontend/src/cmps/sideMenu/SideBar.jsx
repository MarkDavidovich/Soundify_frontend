//MAIN SIDEBAR CMP, WILL CONTAIN THE OTHER CMPS

//! Link to HomePage
//! Link to ThemesPage

import React from 'react'
import { SideIndex } from './SideIndex'

export function SideBar() {
    return (
        <>
            <div className="side-bar flex column">SideBar
                <SideIndex />
            </div>
        </>
    )
}
