import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import WarehousePage from './pages/warehouseListPage'
import ProductsPage from './pages/productsListPage'
import CreateProductPage from './pages/createProductPage'
import CreateWarehousePage from './pages/createWarehousePage'

function useRoutes() {
    return (
        <Switch>
            <Route path="/warehouses">
                <WarehousePage/>
            </Route>
            <Route path="/products">
                <ProductsPage/>
            </Route>
            <Route path="/create_product">
                <CreateProductPage/>
            </Route>
            <Route path="/create_warehouse">
                <CreateWarehousePage/>
            </Route>
            <Redirect to="/warehouses"/>
        </Switch>
    )
}

export default useRoutes