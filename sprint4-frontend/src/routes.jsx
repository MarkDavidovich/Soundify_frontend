import { HomePage } from './pages/HomePage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { StationDetails } from './cmps/StationDetails.jsx'
import { CategoryStations } from './pages/CategoryStations.jsx'
import { LoginSignup } from './cmps/LoginSignup.jsx'
import { LibraryPage } from './pages/LibraryPage.jsx'

// Routes accesible from the main navigation (in AppHeader)

const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: '/search',
        component: <SearchPage />,
        label: 'Search'
    },
    {
        path: '/station/:id',
        component: <StationDetails />,
        label: 'Details'
    },
    {
        path: '/category/:id',
        component: <CategoryStations />,
        label: 'CategoryStations'
    },
    {
        path: '/login',
        component: <LoginSignup />,
        label: 'Login'
    },

    {
        path: 'stations',
        component: <LibraryPage />,
        label: 'Stations'
    },
]

export default routes