import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_COUNT } from '../store/reducers/user.reducer'


export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff)
        dispatch({ type: CHANGE_COUNT, diff })
    }

    return (
        <section className="main-view">
          
        </section >
    )
}