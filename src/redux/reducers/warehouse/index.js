export const initialState = [
    {
        name: 'Склад 1',
        address: 'город Магадан',
        id: 1,
        products: [
            {
                id: 1,
                name: 'Утюг',
                quantity: 5
            }, {
                id: 2,
                name: 'Iphone SE',
                quantity: 10
            }
        ]
    }, {
        name: 'Склад 2',
        address: 'город Таганрог',
        id: 2,
        products: [
            {
                id: 1,
                name: 'Утюг',
                quantity: 10
            }, {
                id: 2,
                name: 'Iphone SE',
                quantity: 20
            }, {
                id: 3,
                name: 'Iphone 10',
                quantity: 6
            },
        ]
    }, {
        name: 'Нераспределенный склад 1',
        address: 'город Ростов',
        id: 3,
        products: [
            {
                id: 4,
                name: 'Двери',
                quantity: 14
            }, {
                id: 3,
                name: 'Iphone 10',
                quantity: 3
            },{
                id: 1,
                name: 'Утюг',
                quantity: 30
            },
        ]
    },
]

export default function Warehouses(state = initialState, action) {
    switch (action.type) {
        case 'SET_STATE':
            return { initialState: action.value }
        case 'CHANGE_WAREHOUSE':
            return initialState.map(warehouse => {
                    if (warehouse.id === action.value.id) {
                        warehouse = action.value
                    }

                    return warehouse
                })
        case 'ADD_WAREHOUSE':
            return {
                initialState: initialState.push(action.value)
            }
        case 'REMOVE_WAREHOUSE':
            return {
                initialState: initialState.filter(warehouse => warehouse.id !== action.value.id)
            }
        default:
            return state
    }
}