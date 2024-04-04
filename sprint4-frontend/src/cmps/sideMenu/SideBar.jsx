//MAIN SIDEBAR CMP, WILL CONTAIN THE OTHER CMPS

//! Link to HomePage
//! Link to ThemesPage

import React from 'react'
import { SideIndex } from './SideIndex'

export function SideBar() {
    return (
        <>
            <div className="side-bar flex column">SideBar
                <div className="actions-btns">
                    <button className="home-btn btn">
                        <img className="home-btn" src="./public/icons/home-icon.png" title="home page" alt="" />
                    </button>
                </div>
                <SideIndex />
            </div>
        </>
    )
}
