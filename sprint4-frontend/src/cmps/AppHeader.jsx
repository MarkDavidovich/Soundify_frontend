import { Link, NavLink, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'

import { LoginSignup } from './LoginSignup.jsx'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchTerm } from '../store/actions/system.actions.js'
import { useMediaQuery } from '@mui/material'
import { setCurrSongIdx, setCurrStationIdx, togglePlaying } from '../store/actions/player.actions.js'

export function AppHeader() {
    const dispatch = useDispatch()
    const location = useLocation()

    const user = useSelector(storeState => storeState.userModule.user)
    const toggleLibrary = useSelector(stateStore => stateStore.layoutModule.toggleLibrary)
    const currViewedStationIdx = useSelector(storeState => storeState.stationModule.currViewedStationIdx)
    const currViewedStation = useSelector(storeState => storeState.stationModule.stations[currViewedStationIdx])
    const currPlayerStationIdx = useSelector(storeState => storeState.playerModule.currStationIdx)
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)

    const [input, setInput] = useState('')

    const headerRef = useRef(null)
    const dummyRef = useRef(null)

    function handleSearch(ev) {
        ev.preventDefault()
        dispatch(setSearchTerm(input))
        setInput('')
    }

    const isSearchPage = location.pathname === '/search'
    const isCategoryPage = location.pathname.includes('/category');
    const isHomePage = location.pathname === '/'
    const headerClass = isHomePage ? 'intersected' : isSearchPage || isCategoryPage ? 'bgBlack' : ''
    const matchesMobile = useMediaQuery('(max-width: 480px)')


    //---------------------------------------------------------

    useEffect(() => {
        const isStationDetails = location.pathname.includes('/station')

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (!entry.isIntersecting && isStationDetails) {
                    headerRef.current.classList.add('Details-intersected')
                } else {
                    headerRef.current.classList.remove('Details-intersected')
                }
            },
            {
                root: null,
                threshold: 0.1,
                rootMargin: '0px',
            }
        )

        if (dummyRef.current) {
            observer.observe(dummyRef.current)
        }

        return () => {
            if (dummyRef.current) {
                observer.unobserve(dummyRef.current)
            }
        }
    }, [location.pathname])


    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Bye now')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }
    console.log("Script loaded")


    function handleMainPlayClick() {
        if (currPlayerStationIdx === currViewedStationIdx) {
            togglePlaying(isPlaying)
        } else {
            setCurrStationIdx(currViewedStationIdx)
            setCurrSongIdx(0)
            togglePlaying(false)
        }
    }

    return (
        <>
            <div ref={dummyRef} style={{
                height: '460px',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                pointerEvents: 'none',
            }}></div>
            <header ref={headerRef} className={`main-view-header ${headerClass}`}>            {/* <header ref={headerRef} className={`main-view-header`}> */}
                <section className="prev-next-container">
                    {!matchesMobile && (
                        <><button className="prev-btn">
                            <svg
                                data-encore-id="icon" role="img" aria-hidden="true" className="Svg-sc-ytk21e-0 cAMMLk IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16">
                                <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z">
                                </path>
                            </svg>
                        </button>
                            <button className="next-btn">
                                <svg
                                    data-encore-id="icon" role="img" aria-hidden="true" className="Svg-sc-ytk21e-0 cAMMLk IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16">
                                    <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z">
                                    </path>
                                </svg>
                            </button>
                        </>)
                    }
                    <div className='searchbar-container'>
                        {location.pathname !== '/search' && !matchesMobile && <button className='play-btn' onClick={() => { handleMainPlayClick() }}>
                            {isPlaying && currPlayerStationIdx === currViewedStationIdx ? ( //PAUSE SVG
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"
                                    >
                                    </path>
                                </svg>
                            ) : ( //PLAY SVG
                                <svg width="20" height="20" viewBox="0 0 16 16" >
                                    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"
                                    ></path>
                                </svg>)}
                        </button>}

                        {location.pathname !== '/search' && currViewedStation && (
                            <div>
                                {matchesMobile ? (
                                    <div className="station-name mobile">
                                        {currViewedStation.name} 
                                    </div>
                                ) : (
                                    <div className="station-name">
                                        {currViewedStation.name}
                                    </div>
                                )}
                            </div>
                        )}
                        {location.pathname === '/search' && <form onSubmit={handleSearch}>
                            <input className="search-page-searchbar"
                                type="text"
                                placeholder="What do you want to play?"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                style={matchesMobile ? { width: '92vw' } : {}}
                            />
                        </form>}

                    </div>

                </section>
                {!matchesMobile &&
                    <div className='login-container'>
                        {!user &&
                            <button className='login-btn'>
                                <Link to="/login">
                                    Login
                                </Link>
                            </button>
                        }
                        {user ? (
                            < section className="login-user" style={{ height: '36px' }}>
                                <button className="logout-btn btn" onClick={onLogout}>
                                    <img className="user-img" src={user.imgUrl} alt="" />

                                </button>
                            </ section >
                        ) : (
                            <section className="login-layout">
                            </section>
                        )}
                    </div>
                }
            </header>
        </>
    )
}


