import React from 'react'
import { Link } from 'react-router-dom'

const navList = [
    {
        title: 'Home', path: '/'
    },
    {
        title: 'About', path: '/about'
    }
]

function Header() {
    return (
        <nav className="header-nav">
            <ul>
                {navList.map((nav, index) => (
                    <li key={index}>
                        <Link to={nav.path} replace>{nav.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Header
