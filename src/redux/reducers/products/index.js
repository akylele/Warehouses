export const initialState = [
    {
        name: 'Утюг',
        id: 1,
        warehouses: [
            {
                name: 'Склад 1',
                address: 'город Магадан',
                id: 1,
                quantity: 5
            }, {
                name: 'Склад 2',
                address: 'город Таганрог',
                id: 2,
                quantity: 10
            }, {
                name: 'Общий склад',
                address: 'город Ростов',
                id: 3,
                quantity: 30
            },
        ]
    }, {
        name: 'Iphone SE',
        id: 2,
        warehouses: [
            {
                name: 'Склад 1',
                address: 'город Магадан',
                id: 1,
                quantity: 10
            }, {
                name: 'Склад 2',
                address: 'город Таганрог',
                id: 2,
                quantity: 20
            },
        ]
    }, {
        name: 'Iphone 10',
        id: 3,
        warehouses: [
            {
                name: 'Склад 2',
                address: 'город Таганрог',
                id: 2,
                quantity: 6
            }, {
                name: 'Общий склад',
                address: 'город Ростов',
                id: 3,
                quantity: 3
            },
        ]
    }, {
        name: 'Двери',
        id: 4,
        warehouses: [
            {
                name: 'Общий склад',
                address: 'город Ростов',
                id: 3,
                quantity: 14
            },
        ]
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
            return state.filter(product => product.id !== action.value.id)
        default:
            return state
    }
}