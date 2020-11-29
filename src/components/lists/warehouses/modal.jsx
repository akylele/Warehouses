import React, {useEffect, useState} from 'react'
import {isMobile} from 'react-device-detect'
import {connect} from "react-redux";

import Row from '../../basic/row'
import Col from '../../basic/col'
import Button from '../../basic/button'
import List from "./list";

import '../../../style/modal.scss'

const ModalEditWarehouse = (props) => {
    const [form, setForm] = useState({})
    const [productsForRemoveFromGeneral, setProductsForRemoveFromGeneral] = useState([])
    const [productsForAddIntoGeneral, setProductsForAddIntoGeneral] = useState([])
    const generalWarehouse = props.warehouses.length > 0 && props.warehouses.filter(elem => elem.name === 'Общий склад').pop()

    useEffect(() => {
        setForm({
            ...props.content,
        })
    }, [])

    const handleChange = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const handleSave = () => {
        let itemsOutsideGeneral = productsForAddIntoGeneral.filter(elem => !generalWarehouse.products.map(el => el.id).includes(elem.id))

        props.editWarehouse({
            ...form
        })

        if (productsForRemoveFromGeneral.length > 0) {
            props.editWarehouse({
                ...generalWarehouse,
                products: generalWarehouse.products.map(elem => {
                    const findItem = productsForRemoveFromGeneral.filter(el => el.id === elem.id)
                    if (findItem.length > 0) {
                        elem = {
                            ...elem,
                            quantity: elem.quantity - findItem.pop().quantity
                        }
                    }
                    return elem
                })
            })
        }

        if (productsForAddIntoGeneral.length > 0) {
            let findItem

            let newArr = generalWarehouse.products.map(elem => {
                findItem = productsForAddIntoGeneral.filter(el => el.id === elem.id)
                if (findItem.length > 0) {
                    elem = {
                        ...elem,
                        quantity: elem.quantity + findItem.pop().quantity
                    }
                }
                return elem
            })

            if (itemsOutsideGeneral.length > 0) {
                newArr = newArr.concat(itemsOutsideGeneral)
            }

            props.editWarehouse({
                ...generalWarehouse,
                products: newArr
            })
        }

        props.handleModal()
    }
    const onRemove = (item) => {
        setForm({
            ...form,
            products: form.products.map(elem => {
                if (elem.id === item.id) {
                    elem = {
                        ...item,
                        quantity: elem.quantity - item.quantity
                    }
                }
                return elem
            })
        })

        setProductsForAddIntoGeneral(productsForAddIntoGeneral.concat({...item}))
    }
    const onAdd = (item) => {
        if (productsForRemoveFromGeneral.length > 0 && productsForRemoveFromGeneral.filter(elem => elem.id === item.id).length > 0) {
            setProductsForRemoveFromGeneral(productsForRemoveFromGeneral.map(elem => {
                if (elem.id === item.id) {
                    elem = item
                }
                return elem
            }))
        } else {
            setProductsForRemoveFromGeneral(productsForRemoveFromGeneral.concat(item))
        }

        if (form.products.filter(elem => elem.id === item.id).length > 0) {
            setForm({
                ...form,
                products: form.products.map(elem => {
                    if (elem.id === item.id) {
                        elem = {
                            ...elem,
                            quantity: Number(elem.quantity) + Number(item.quantity)
                        }
                    }
                    return elem
                })
            })
        } else {
            setForm({
                ...form,
                products: form.products.concat(item)
            })
        }
    }
    return (
        <div className="modal open">
            {isMobile && (
                <Row>
                    <Col styles="s6">
                        <Button onClick={() => props.handleModal()}>
                            <i className="large material-icons">arrow_back</i>
                        </Button>
                    </Col>
                    <Col styles="s6">
                        <Button onClick={() => handleSave()} styles="green">
                            <i className="large material-icons">check_circle</i>
                        </Button>
                    </Col>
                </Row>
            )}
            <div className="modal-content">
                <h4>Редактирование склада "{props.content.name}"</h4>
            </div>
            {props.content.name === 'Общий склад' &&
            <div className="card-panel red">
                <h5 className="red">
                    Вы не можете редактировать товары и название этого склада
                </h5>
            </div>}
            {isMobile ? (
                <>
                    <Row>
                        <Col styles="s12">
                            <input
                                disabled={props.content.name === 'Общий склад'}
                                defaultValue={props.content.name}
                                id="name"
                                type="text"
                                className="validate"
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col styles="s12">
                            <input
                                defaultValue={props.content.address}
                                id="address"
                                type="text"
                                className="validate"
                                onChange={(e) => handleChange('address', e.target.value)}
                            />
                        </Col>
                    </Row>
                </>
            ) : (
                <Row>
                    <Col styles="s2">
                        <input
                            disabled={props.content.name === 'Общий склад'}
                            defaultValue={props.content.name}
                            id="name"
                            type="text"
                            className="validate"
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                        <label
                            className="active"
                            htmlFor="first_name2">
                            {props.content.name}
                        </label>
                    </Col>
                    <Col styles="s2">
                        <input
                            defaultValue={props.content.address}
                            id="address"
                            type="text"
                            className="validate"
                            onChange={(e) => handleChange('address', e.target.value)}
                        />
                        <label
                            className="active"
                            htmlFor="first_name2">
                            {props.content.address}
                        </label>
                    </Col>
                    <Col styles="s2">&nbsp;</Col>
                    <Col styles="s6">
                        <Row>
                            <Button onClick={() => props.handleModal()} styles="red margin">Отмена</Button>
                            <Button onClick={() => handleSave()} styles="margin">Сохранить</Button>
                        </Row>
                    </Col>
                </Row>
            )}
            <div>
                <List
                    items={props.content.products}
                    type="remove"
                    title="Продукты"
                    onRemove={onRemove}
                    disabled={props.content.name === 'Общий склад'}
                    warehouseTitle={props.content.name}
                />
                {props.content.name !== 'Общий склад' &&
                <List
                    items={generalWarehouse.products}
                    type="add"
                    title="Вы можете добавить товары из общего склада в этот склад"
                    onAdd={onAdd}
                />
                }
            </div>
        </div>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditWarehouse)
