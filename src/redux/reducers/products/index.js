export const initialState = [
    {
        name: 'Утюг',
        id: 1
    }, {
        name: 'Iphone SE',
        id: 2
    }, {
        name: 'Iphone 10',
        id: 3
    }, {
        name: 'Двери',
        id: 4
    },
]

export default function Products(state = initialState, action) {
    switch (action.type) {
        case 'SET_STATE':
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