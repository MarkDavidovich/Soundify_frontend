import { HomePage } from './pages/HomePage.jsx'
import { ThemesPage } from './pages/ThemesPage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminApp } from './pages/AdminIndex.jsx'
import { StationDetails } from './cmps/StationDetails.jsx'
import { SidePreview } from './cmps/sideMenu/SidePreview.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: '/search',
        component: <ThemesPage />,
        label: 'Search'
    },
    {
        path: '/station/:id',
        component: <StationDetails />,
        label: 'Details'
    },

    // {
    //     path: 'stations',
    //     component: <StationsPage />,
    //     label: 'Stations'
    // },

    // {
    //     path: 'review',
    //     component: <ReviewIndex />,
    //     label: 'Reviews'
    // },
    // {
    //     path: 'chat',
    //     component: <ChatApp />,
    //     label: 'Chat'
    // },
    // {
    //     path: 'about',
    //     component: <AboutUs />,
    //     label: 'About us'
    // },
    // {
    //     path: 'admin',
    //     component: <AdminApp />,
    //     label: 'Admin Only'
    // }
]

export default routes