import { Link, NavLink, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'

import { LoginSignup } from './LoginSignup.jsx'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchTerm } from '../store/actions/system.actions.js'

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

    // else {
    //     headerRef.current.classList.remove('bgBlack')
    // }
    // ------------------------------------------------------------ //

    useEffect(() => {
        // const isSearchPageBg = location.pathname === '/search'
        // const isCategory = location.pathname.includes('/category')

        // if (isSearchPageBg) headerRef.current.classList.add('bgBlack')
        // if (!isSearchPageBg) headerRef.current.classList.remove('bgBlack')

        // if (isCategory) headerRef.current.classList.add('bgBlack')
        // if (!isCategory) headerRef.current.classList.remove('bgBlack')


        // const isStationDetails = location.pathname.includes('/station')

        // console.log(dummyRef.current)
        // const options = {
        //     threshold: 0.1,
        // }
        // let isFirstIntersectionDone = false
        // const dummyObserver = new IntersectionObserver(
        //     () => {
        //         if (!isFirstIntersectionDone) {
        //             isFirstIntersectionDone = true
        //             return
        //         }
        //         console.log('threshold 0 reached')
        //         // headerRef.current.classList.toggle('intersected')

        //         const isHomePage = location.pathname === '/'
        //         if (isHomePage) {
        //             headerRef.current.classList.toggle('intersected')
        //         }
        //         // const isSearchPage = location.pathname === '/search'
        //         // if (isSearchPage) {
        //         //     headerRef.current.classList.toggle('search')
        //         // } else {
        //         //     headerRef.current.classList.toggle('intersected')
        //         // }
        //     },
        //     options
        // )

        // dummyObserver.observe(dummyRef.current)

    }, [location.pathname])


    // ------------------------------------------------------------ //


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
                height: '65px',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
            }}></div>
            <header className={`main-view-header ${headerClass}`}>            {/* <header ref={headerRef} className={`main-view-header`}> */}
                <section className="prev-next-container">
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

                </section>
                <button className='login-btn'>
                    <Link to="/login">
                        Login
                    </Link>
                </button>
            </header>
        </>
    )
}

// export function AppHeader() {
//     const location = useLocation()
//     const user = useSelector(storeState => storeState.userModule.user)
//     const toggleLibrary = useSelector(stateStore => stateStore.layoutModule.toggleLibrary)

//     const handleScroll = () => {
//         console.log("Scroll event triggered in station-details")
//         const header = document.querySelector('.main-view-header')
//         const container = document.querySelector('.station-details')


//         if (header && container) {

//             const scrolledAmount = container.scrollTop

//             if (scrolledAmount >= 270) {
//                 console.log("Adding class", scrolledAmount)
//                 header.classList.add('header-scrolled')
//             } else {
//                 console.log("Removing class", scrolledAmount)
//                 header.classList.remove('header-scrolled')
//             }
//         }
//     }

//     useEffect(() => {
//         const container = document.querySelector('.station-details')
//         if (container) {
//             console.log("Event listener added to station-details")
//             container.addEventListener('scroll', handleScroll)

//             return () => {
//                 console.log("Event listener removed from station-details")
//                 container.removeEventListener('scroll', handleScroll)
//             }
//         }
//     }, [])


//     // ------------------------------------------------------ // 

//     // ------------------------------------------------------ // 

//     async function onLogin(credentials) {
//         try {
//             const user = await login(credentials)
//             showSuccessMsg(`Welcome: ${user.fullname}`)
//         } catch (err) {
//             showErrorMsg('Cannot login')
//         }
//     }
//     async function onSignup(credentials) {
//         try {
//             const user = await signup(credentials)
//             showSuccessMsg(`Welcome new user: ${user.fullname}`)
//         } catch (err) {
//             showErrorMsg('Cannot signup')
//         }
//     }
//     async function onLogout() {
//         try {
//             await logout()
//             showSuccessMsg('Bye now')
//         } catch (err) {
//             showErrorMsg('Cannot logout')
//         }
//     }
//     console.log("Script loaded")

//     return (
//         <header className={`main-view-header ${toggleLibrary ? 'collapsed' : ''}`}>
//             <section className="prev-next-container">
//                 <button className="prev-btn">
//                     <svg
//                         data-encore-id="icon" role="img" aria-hidden="true" className="Svg-sc-ytk21e-0 cAMMLk IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16">
//                         <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z">
//                         </path>
//                     </svg>
//                 </button>
//                 <button className="next-btn">
//                     <svg
//                         data-encore-id="icon" role="img" aria-hidden="true" className="Svg-sc-ytk21e-0 cAMMLk IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16">
//                         <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z">
//                         </path>
//                     </svg>
//                 </button>
//                 <div className='searchbar-container'>
//                     {location.pathname === '/search' && <input type='input' className='search-page-searchbar' placeholder='What do you want to play?'></input>}
//                 </div>
//             </section>
//             <button className='login-btn'>
//                 <Link to="/login">
//                     Login
//                 </Link>
//             </button>
//         </header>
//     )
// }

/* <header>
<nav>
    {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

    {user &&
        <span className="user-info">
            <Link to={user/${user._id}}>
                {user.imgUrl && <img src={user.imgUrl} />}
                {user.fullname}
            </Link>
            <span className="score">{user.score?.toLocaleString()}</span>
            <button onClick={onLogout}>Logout</button>
        </span>
    }
    {!user &&
        <section className="user-info">
            <LoginSignup onLogin={onLogin} onSignup={onSignup} />
        </section>
    }
</nav>
<h1>Soundify</h1>
</header> */

