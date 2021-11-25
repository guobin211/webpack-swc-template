import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import pkg from '../package.json'

const root = document.getElementById('root') as HTMLDivElement

ReactDOM.render(
    <React.StrictMode>
        <App version={pkg.version}/>
    </React.StrictMode>,
    root
)
