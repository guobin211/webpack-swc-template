import React, { useEffect } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import AppRouter from './router'
import store from './redux/store'
import { defineGlobalProperty } from './common/defineGlobalProperty'

export interface AppProps {
    version: string;
}

function App(props: AppProps) {
    useEffect(() => {
        defineGlobalProperty('AppProps', props)
    }, [])
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}

export default App
