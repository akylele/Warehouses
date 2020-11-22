import { combineReducers } from 'redux'

import productsReducer from './products/index';
import warehousesReducer from './warehouse/index';

export default combineReducers({
    warehousesReducer,
    productsReducer
})