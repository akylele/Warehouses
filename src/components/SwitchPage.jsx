import React from 'react'
import {NavLink} from 'react-router-dom'

import '../style/switchPage.scss'

const SwitchPage = () => {
    if (window.location.href.includes('product')) {
        return (
            <div className="switch">
                <div className={window.location.href.includes('products') ? "left border" : "left"}>
                    <NavLink to="/products">
                        Продукты
                    </NavLink>
                </div>
                <div className={window.location.href.includes('create_product') ? "right border" : "right"}>
                    <NavLink to="/create_product">
                        Добавить
                    </NavLink>
                </div>
            </div>
        )
    } else if (window.location.href.includes('warehouse')) {
        return (
            <div className="switch">
                <div className={!window.location.href.includes('create_warehouse') ? "left border" : "left"}>
                    <NavLink to="/warehouses">
                        Склады
                    </NavLink>
                </div>
                <div className={window.location.href.includes('create_warehouse') ? "right border" : "right"}>
                    <NavLink to="/create_warehouse">
                        Добавить
                    </NavLink>
                </div>
            </div>
        )
    } else return null


}

export default SwitchPage