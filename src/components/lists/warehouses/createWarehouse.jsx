import React, {useState} from 'react'
import {connect} from "react-redux";

import SwitchPage from "../../SwitchPage";
import Row from "../../basic/row";
import Col from "../../basic/col";
import Button from "../../basic/button";
import List from "./list";

import validator from "../../../helpers/validation";
import Toast from "../../../helpers/toast";

const CreateWarehouse = (props) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [products, setProducts] = useState([])
    const OwnerWarehouse = props.warehouses.length > 0 && props.warehouses.filter(elem => elem.name === 'Общий склад')

    const createWarehouse = () => {
        if (validator(name) && validator(address)) {
            //если сохранился, удалять эти продукты из нераcпределенного склада
            if (!props.warehouses.filter(warehouse => warehouse.name === name).length > 0) {

                if (products) {
                    const generalWarehouse = props.warehouses.filter(elem => elem.name === 'Общий склад').pop()

                    props.editWarehouse({
                        ...generalWarehouse,
                        products: generalWarehouse.products.map(prod => {
                            const findProduct = products.filter(product => product.id === prod.id)
                            if (findProduct.length > 0) {
                                return ({
                                    id: prod.id,
                                    quantity: prod.quantity - findProduct.pop().quantity,
                                    name: prod.name
                                })
                            } else {
                                return prod
                            }
                        })
                    })
                }

                props.createWarehouse({
                    name,
                    address,
                    id: Date.now(),
                    products
                })
                //redirect to /warehouses

            } else {
                Toast('Такой склад уже есть')
            }
        } else {
            Toast('Введите корректные данные')
        }
    }

    const onAdd = (item) => {
        if (products.filter(elem => elem.id === item.id).length > 0) {
            setProducts(products.map(elem => {
                if (elem.id === item.id) {
                    elem = item
                }
                return elem
            }))
        } else {
            setProducts(products.concat(item))
        }
    }

    return (
        <>
            <SwitchPage/>
            <Row styles="centerRow">
                <Col styles="input-field s4">
                    <input type="text" onChange={(e) => setName(e.target.value)}/>
                    <label>Название</label>
                </Col>
                <Col styles="input-field s4">
                    <input type="text" onChange={(e) => setAddress(e.target.value)}/>
                    <label>Адрес</label>
                </Col>
                <Col styles="s4">
                    <Button onClick={() => createWarehouse()}>Создать</Button>
                </Col>
            </Row>
            {OwnerWarehouse.length > 0 && <List
                items={OwnerWarehouse[0].products}
                type="add"
                onAdd={onAdd}
                title="Вы можете добавить товары из нераспределенного склада в этот склад"
            />}
        </>
    )
}

function mapStateToProps(state) {
    return {
        warehouses: state.warehousesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editWarehouse: (value) => {
            dispatch({type: 'CHANGE_WAREHOUSE', value})
        },
        createWarehouse: (value) => {
            dispatch({type: 'ADD_WAREHOUSE', value})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWarehouse)
