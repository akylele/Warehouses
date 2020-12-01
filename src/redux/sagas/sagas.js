import { all } from 'redux-saga/effects'
import productsWatcher from './products/productsSaga'
import warehousesWatcher from './warehouses/warehousesSaga'


export default function* rootSaga() {
    console.log('root')
    yield all([
        productsWatcher(),
        warehousesWatcher()
    ])
}