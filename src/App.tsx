import React, { useEffect } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import AppRouter from './router'
import store from './redux/store'
import GlobalDefinition from './common/GlobalDefinition'

export interface AppProps {
    version: string;
}

function App(props: AppProps) {
    useEffect(() => {
        GlobalDefinition.set('AppProps', props)
        const value = GlobalDefinition.get<AppProps>('AppProps')
        console.assert(value === props, 'AppProps is not equal');
    }, [])
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}

export default App
