export const initialState = localStorage.getItem('warehouses') ? JSON.parse(localStorage.getItem('warehouses')) : []

export default function Warehouses(state = initialState, action) {
    switch (action.type) {
        case 'SET_STATE_WAREHOUSES':
            return action.value
        case 'CHANGE_WAREHOUSE':
            const newState = state.map(warehouse => {
                if (warehouse.id === action.value.id) {
                    return action.value
                }
                return warehouse
            })
            return newState.map(warehouse => ({...warehouse, products: warehouse.products.filter(prod => prod.quantity !== 0)}))
        case 'ADD_WAREHOUSE':
            return state.concat(action.value)
        case 'REMOVE_WAREHOUSE':
            return state.filter(warehouse => warehouse.id !== action.value.id)
        default:
            return state
    }
}