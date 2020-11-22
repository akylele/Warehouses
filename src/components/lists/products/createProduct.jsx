import React, {useState} from 'react'
import {connect} from 'react-redux';

import SwitchPage from "../../SwitchPage";
import Row from "../../basic/row";
import Col from "../../basic/col";
import Button from "../../basic/button";

import '../../../style/createProduct.scss'
import validator from "../../../helpers/validation";
import Toast from "../../../helpers/toast";

const CreateProduct = (props) => {
    const [name, setName] = useState('')
    const [warehouse, setWarehouse] = useState()
    const [quantity, setQuantity] = useState(1)

    const createProduct = () => {
        if (validator(name) && validator(Number(quantity))) {
            if (!props.warehouses.map(elem => elem.products.filter(elem => elem.name === name).length > 0).some(elem => !!elem)) {
                const date = Date.now()
                let findWarehouse

                if (warehouse) {
                    findWarehouse = props.warehouses.filter(elem => elem.id == warehouse).pop()
                } else {
                    findWarehouse = props.warehouses.filter(elem => elem.name === 'Общий склад').pop()
                }

                props.createProduct({
                    name,
                    id: date,
                    warehouses: [{
                        id: findWarehouse.id,
                        name: findWarehouse.name,
                        address: findWarehouse.address,
                        quantity
                    }]
                })

                props.editWarehouse({
                    ...findWarehouse, products: findWarehouse.products.concat({
                        id: date,
                        name,
                        quantity
                    })
                })

                Toast(`Продукт '${name}' добавлен`)
                //redirect to /products
            } else {
                Toast('Такой продукт существует')
            }
        } else {
            Toast('Введите корректные данные')
        }
    }

    return (
        <>
            <SwitchPage/>
            <Row styles="centerRow">
                <Col styles="input-field s3">
                    <input type="text" onChange={(e) => setName(e.target.value)}/>
                    <label>Название</label>
                </Col>
                <Col styles="s3">
                    <select
                        style={{display: 'block'}}
                        onChange={(e) => setWarehouse(e.target.value)}
                    >
                        <option value="" key={0} selected/>
                        {props.warehouses.length > 0 && props.warehouses.map((warehouse, index) => (
                            <option
                                value={warehouse.id}
                                key={index + 1}
                            >
                                {warehouse.name} ( {warehouse.address} )
                            </option>
                        ))}
                    </select>
                </Col>
                <Col styles="input-field s3">
                    <input
                        type="number"
                        onChange={(e) => setQuantity(e.target.value)}
                        defaultValue={1}
                        min={1}
                    />
                    <label>Количество</label>
                </Col>
                <Col styles="s3">
                    <Button onClick={() => createProduct()}>Создать</Button>
                </Col>
            </Row>
        </>
    )
}

function mapStateToProps(state) {
    return {
        warehouses: state.warehousesReducer,
        products: state.productsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createProduct: (value) => {
            dispatch({type: 'ADD_PRODUCT', value})
        },
        editWarehouse: (value) => {
            dispatch({type: 'CHANGE_WAREHOUSE', value})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)
