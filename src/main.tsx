import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import pkg from '../package.json'

const root = document.getElementById('root') as HTMLDivElement

ReactDOM.render(
    <React.Fragment>
        <App version={pkg.version}/>
    </React.Fragment>,
    root
)
