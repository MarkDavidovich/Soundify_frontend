import { Link, NavLink, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'

import { LoginSignup } from './LoginSignup.jsx'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchTerm } from '../store/actions/system.actions.js'
import { useMediaQuery } from '@mui/material'

export function AppHeader() {
    const dispatch = useDispatch()
    const location = useLocation()

    const user = useSelector(storeState => storeState.userModule.user)
    const toggleLibrary = useSelector(stateStore => stateStore.layoutModule.toggleLibrary)

    const [input, setInput] = useState('')

    const headerRef = useRef(null)
    const dummyRef = useRef(null)

    function handleSearch(ev) {
        ev.preventDefault()
        dispatch(setSearchTerm(input))
        setInput('')
    }

    const isSearchPage = location.pathname === '/search';
    const isCategoryPage = location.pathname.includes('/category');
    const isHomePage = location.pathname === '/';
    const headerClass = isHomePage ? 'intersected' : isSearchPage || isCategoryPage ? 'bgBlack' : '';
    const matchesMobile = useMediaQuery('(max-width: 480px)')


    //---------------------------------------------------------

    useEffect(() => {
        const isStationDetails = location.pathname.includes('/station')

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
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
        );

        if (dummyRef.current) {
            observer.observe(dummyRef.current)
        }

        return () => {
            if (dummyRef.current) {
                observer.unobserve(dummyRef.current)
            }
        };
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

    return (
        <>
            <div ref={dummyRef} style={{
                height: '460px',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
            }}></div>
            <header ref={headerRef} className={`main-view-header ${headerClass}`}>            {/* <header ref={headerRef} className={`main-view-header`}> */}
                {!matchesMobile && <section className="prev-next-container">
                    <button className="prev-btn">
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
                    <div className='searchbar-container'>
                        {location.pathname === '/search' && <form onSubmit={handleSearch}>
                            <input className="search-page-searchbar"
                                type="text"
                                placeholder="What do you want to play?"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </form>}

                    </div>

                </section>}
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
            </header>
        </>
    )
}


