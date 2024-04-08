import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/actions/user.actions.js'


import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)

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
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="main-view-header">
            <section className="prev-next-container">
                <button className="prev-btn">
                    <svg
                        data-encore-id="icon" role="img" aria-hidden="true" class="Svg-sc-ytk21e-0 cAMMLk IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16">
                        <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z">
                        </path>
                    </svg>
                </button>
                <button className="next-btn">
                    <svg
                        data-encore-id="icon" role="img" aria-hidden="true" class="Svg-sc-ytk21e-0 cAMMLk IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16">
                        <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z">
                        </path>
                    </svg>
                </button>
            </section>


        </header>

    )
}

{/* <header>
<nav>
    {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

    {user &&
        <span className="user-info">
            <Link to={`user/${user._id}`}>
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
</header> */}