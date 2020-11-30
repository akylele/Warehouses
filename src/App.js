import {useEffect} from 'react'
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './components/basic/header'

import useRoutes from '../src/routes'

import './style/App.scss';
import SetLocalStorage from "./helpers/localStorage";
import {connect} from "react-redux";

function App(props) {
    const routes = useRoutes()

    useEffect(() => {
        const initialStateWarehouses = [{
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
            name: 'Общий склад',
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
                }, {
                    id: 1,
                    name: 'Утюг',
                    quantity: 30
                },
            ]
        }]

        const initialStateProducts = [{
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
        }]
        localStorage.setItem('warehouses', JSON.stringify(initialStateWarehouses))
        localStorage.setItem('products', JSON.stringify(initialStateProducts))
        props.setStateWarehouses(initialStateWarehouses)
        props.setStateProducts(initialStateProducts)
    }, [])

    return (
        <Router>
            <div className="App">
                <Header/>
                <SetLocalStorage/>
                {routes}
            </div>
        </Router>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        setStateWarehouses: (value) => {
            dispatch({type: 'SET_STATE_WAREHOUSES', value})
        },
        setStateProducts: (value) => {
            dispatch({type: 'SET_STATE_PRODUCTS', value})
        }
    }
}

export default connect(null, mapDispatchToProps)(App);
