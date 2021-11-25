import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import HomePage from '../pages/Home.page'
import AboutPage from '../pages/About.page'
import Header from '../components/Header'

function AppRouter() {
    return (
        <div className="flex-col">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default AppRouter
