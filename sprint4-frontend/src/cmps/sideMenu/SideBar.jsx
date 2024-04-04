//MAIN SIDEBAR CMP, WILL CONTAIN THE OTHER CMPS

//! Link to HomePage
//! Link to ThemesPage
//! Render the  StationIndex ---> StationList

import React from 'react'
import { StationIndex } from './StationIndex'

export function SideBar() {
  return (
    <>
      <div className="side-bar">SideBar</div>
      <StationIndex />
    </>
  )
}
