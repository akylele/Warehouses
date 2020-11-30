export const initialState = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []

export default function Products(state = initialState, action) {
    switch (action.type) {
        case 'SET_STATE_PRODUCTS':
            return action.value
        case 'CHANGE_PRODUCT':
            return state.map(product => {
                if (product.id === action.value.id) {
                    product = action.value
                }

                return product
            })
        case 'ADD_PRODUCT':
            return state.concat(action.value)
        case 'REMOVE_PRODUCT':
            return state.filter(product => product.id !== action.value)
        default:
            return state
    }
}