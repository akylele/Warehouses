import React from 'react'
import {NavLink} from 'react-router-dom'

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper blue">
                <ul>
                    <li><NavLink to="warehouses">Склады</NavLink></li>
                    <li><NavLink to="products">Продукты</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header