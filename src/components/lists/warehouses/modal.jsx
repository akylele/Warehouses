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
    const [productsForRemove, setProductsForRemove] = useState([])
    const OwnerWarehouse = props.warehouses.length > 0 && props.warehouses.filter(elem => elem.name === 'Общий склад')

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
        const findWarehouse = props.warehouses.filter(elem => elem.name === 'Общий склад').pop()
        props.editWarehouse({
            ...form
        })

        if (productsForRemove.length > 0) {
            props.editWarehouse({
                ...findWarehouse,
                products: findWarehouse.products.map(elem => {
                    const findItem = productsForRemove.filter(el => el.id === elem.id)
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
    }
    const onAdd = (item) => {
        if (productsForRemove.length > 0 && productsForRemove.filter(elem => elem.id === item.id).length > 0) {
            setProductsForRemove(productsForRemove.map(elem => {
                if (elem.id === item.id) {
                    elem = item
                }
                return elem
            }))
        } else {
            setProductsForRemove(productsForRemove.concat(item))
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
            <div className="modal-content">
                <h4>Редактирование склада "{props.content.name}"</h4>
            </div>
            {props.content.name === 'Общий склад' && <div className="card-panel red"><h5 className="red">Вы не можете редактировать товары и название этого склада</h5></div>}
            {isMobile ? (
                <>
                    <Row>
                        <Col styles="s6">
                            <input
                                disabled={props.content.name === 'Общий склад'}
                                defaultValue={props.content.name}
                                id="name"
                                type="text"
                                className="validate"
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </Col>
                        <Col styles="s6">
                            <input
                                defaultValue={props.content.address}
                                id="address"
                                type="text"
                                className="validate"
                                onChange={(e) => handleChange('address', e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col styles="s6">
                            <Button onClick={() => props.handleModal()} styles="red">Отмена</Button>
                        </Col>
                        <Col styles="s6">
                            <Button onClick={() => props.handleModal()}>Сохранить</Button>
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
                />
                {OwnerWarehouse.length > 0 && props.content.name !== 'Общий склад' &&
                <List
                    items={OwnerWarehouse[0].products}
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
