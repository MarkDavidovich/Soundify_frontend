import React from 'react'
import ReactDOM from 'react-dom/client'
// import { HashRouter as Router } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { store } from './store/store'
import { RootCmp } from './RootCmp'
import './assets/styles/main.scss'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <Router>
        <RootCmp />
      </Router>
    </Provider>
  </DndProvider>

)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
