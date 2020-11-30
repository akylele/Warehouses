import {useEffect} from 'react'
import {connect} from "react-redux";

const SetLocalStorage = (props) => {

    useEffect(() => {
        localStorage.setItem('warehouses', JSON.stringify(props.warehouses))
    }, [props.warehouses])

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(props.products))
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

