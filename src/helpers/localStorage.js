import {useEffect} from 'react'
import {connect} from "react-redux";

const SetLocalStorage = (props) => {

    useEffect(() => {
        if(!localStorage.getItem('warehouse')){
            localStorage.setItem('warehouses', JSON.stringify(props.warehouses))
        }
    }, [props.warehouses])

    useEffect(() => {
        if(!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify(props.products))
        }
    }, [props.products])

    return null
}


function mapStateToProps(state) {
    return {
        warehouses: state.warehousesReducer,
        products: state.productsReducer
    }
}

export default connect(mapStateToProps, null)(SetLocalStorage)

