import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import HomePage from '../pages/Home.page'
import PlaygroundPage from '../pages/Playground.page'
import ComponentsPage from '../pages/Components.page'

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PlaygroundPage/>}/>
                <Route path="/playground" element={<PlaygroundPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                {ComponentsPage()}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
