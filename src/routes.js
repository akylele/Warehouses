import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import WarehousePage from './pages/warehouseListPage'
import ProductsPage from './pages/productsListPage'

function useRoutes() {

    return (
        <Switch>
            <Route path="/warehouses">
                <WarehousePage />
            </Route>
            <Route path="/products">
                <ProductsPage />
            </Route>
            <Redirect to="/warehouses" />
        </Switch>
    )
}
export default useRoutes