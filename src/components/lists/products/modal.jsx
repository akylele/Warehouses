import React, {useEffect, useState} from 'react'
import {isMobile} from 'react-device-detect'
import {connect} from "react-redux";

import Toast from "../../../helpers/toast";
import Row from '../../basic/row'
import Col from '../../basic/col'
import Button from '../../basic/button'

import '../../../style/modal.scss'

const ModalEditProduct = (props) => {
    const [fields, setFields] = useState({name: '', products: []})
    const [fieldsForChange, setFieldsForChange] = useState([])
    const generalWarehouse = props.warehouses.length > 0 && props.warehouses.filter(elem => elem.name === 'Общий склад').pop()

    useEffect(() => {
        setFields({
            name: props.content.name,
            products: props.warehouses.map(warehouse => ({
                ...warehouse.products.filter(prod => prod.id === props.content.id).pop(),
                warehouseId: warehouse.id
            }))
        })
    }, [])

    const handleChangeName = (value) => {
        setFields({...fields, name: value})
    }

    const handleChangeSelect = (item, intoWarehouse) => {
        if (item.id === intoWarehouse) {
            return Toast(`Товар уже находится в этом складе`)
        } else {
            setFields(prev => ({
                ...prev,
                products: prev.products.map(prod => {
                    if (prod.warehouseId === item.id) {
                        prod = {
                            ...prod,
                            into: Number(intoWarehouse)
                        }
                    }
                    return prod
                })
            }))
        }
        Toast(`"${item.name}" --> "${intoWarehouse === generalWarehouse.id ? 'Общий' : intoWarehouse}", чтобы перенести нажмите "Перенести"`)
    }

    const handleChangeProduct = (warehouseId, product, value) => {
        // if (fields.products.filter(prod => prod.warehouseId === warehouseId).length > 0) {
        setFields((prev) => ({
            ...prev,
            products: prev.products.map(prod => {
                if (prod.warehouseId === warehouseId) {
                    prod = {
                        ...prod,
                        quantity: value
                    }
                }
                return prod
            })
        }))
        // } else {
        //     setFields((prev) => ({
        //         ...prev,
        //         products: prev.products.concat({...product, quantity: value, warehouseId})
        //     }))
        // }
    }

    const handleTransfer = (indexProduct) => {
        if(fieldsForChange.length > 0){

        }else{
            Toast('Вы еще ничего не выбирали')
        }
    }

    const handleAdd = (product) => {

    }

    const handleRemove = (product) => {

    }

    const handleDelete = () => {
        // eslint-disable-next-line no-restricted-globals
        const res = confirm("Точно?")
        if (res) {
            props.removeProduct(props.content.id)
            props.warehouses.map(warehouse => {
                return props.editWarehouse({
                    ...warehouse,
                    products: warehouse.products.filter(prod => prod.id !== props.content.id)
                })
            })
            props.handleModal()
        } else {
            props.handleModal()
        }

    }

    return (
        <div className="modal open">
            {isMobile && (
                <Row>
                    <Col styles="s4">
                        <Button onClick={() => props.handleModal()}>
                            <i className="large material-icons">arrow_back</i>
                        </Button>
                    </Col>
                    <Col styles="s4">
                        <Button onClick={() => props.handleModal()} styles="green">
                            <i className="large material-icons">check_circle</i>
                        </Button>
                    </Col>
                    <Col styles="s4">
                        <Button onClick={() => handleDelete()} styles="red">
                            <i className="large material-icons">delete</i>
                        </Button>
                    </Col>
                </Row>
            )}
            <div className="modal-content">
                <h4>Редактирование продукта "{props.content.name}"</h4>
            </div>
            {isMobile ? (
                <Row>
                    <Col styles="s12">
                        <input
                            defaultValue={props.content.name}
                            id="name"
                            type="text"
                            className="validate"
                            onChange={(e) => handleChangeName(e.target.value)}
                        />
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col styles="s2">
                        <input
                            defaultValue={props.content.name}
                            id="name"
                            type="text"
                            className="validate"
                            onChange={(e) => handleChangeName(e.target.value)}
                        />
                        <label className="active" htmlFor="first_name2">{props.content.name}</label>
                    </Col>
                    <Col styles="s10">
                        <Row>
                            <Button onClick={() => props.handleModal()} styles="margin">Отмена</Button>
                            <Button onClick={() => props.handleModal()} styles="margin green">Сохранить</Button>
                            <Button onClick={() => handleDelete()} styles="margin red">Удалить</Button>
                        </Row>
                    </Col>
                </Row>
            )}
            <h5>Склады</h5>
            <div>
                <Row styles="titles">
                    <Col styles="s3">
                        <span>Название</span>
                    </Col>
                    <Col styles="s3">
                        <span>Адрес</span>
                    </Col>
                    <Col styles="s2">
                        <span>Количество</span>
                    </Col>
                    <Col styles="s2">
                        <span>Перенести товар</span>
                    </Col>
                    <Col styles="s2">
                        <span>Действие</span>
                    </Col>
                </Row>
                <ul className="collection">
                    {props.warehouses.map((warehouse, index) => {
                        return warehouse.products.map(product => {
                            if (product.id === props.content.id) {
                                return (
                                    <li className="collection-item">
                                        <Row>
                                            <Col styles="s3">
                                                <span>{warehouse.name}</span>
                                            </Col>
                                            <Col styles="s3">
                                                <span>{warehouse.address}</span>
                                            </Col>
                                            <Col styles="s2">
                                                <input
                                                    type="number"
                                                    id={`quantityProduct${index}`}
                                                    min={0}
                                                    max={product.quantity}
                                                    defaultValue={product.quantity}
                                                    onChange={(e) => handleChangeProduct(warehouse.id, product, Number(e.target.value))}
                                                />
                                                <label>всего на складе: {product.quantity}</label>
                                            </Col>
                                            <Col styles="s2">
                                                <select
                                                    style={{display: 'block'}}
                                                    onChange={(e) => handleChangeSelect(warehouse, e.target.value)}
                                                >
                                                    <option value={0} key={0}> </option>
                                                    {props.warehouses.length > 0 && props.warehouses.map((warehouse, index) => (
                                                        <option
                                                            value={warehouse.id}
                                                            key={index + 1}
                                                        >
                                                            {warehouse.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col styles="s2">
                                                <Button onClick={() => handleTransfer(index)}>Перенести</Button>
                                                <Button onClick={() => handleAdd(product)}>Добавить</Button>
                                                <Button onClick={() => handleRemove(product)}>Убрать</Button>
                                            </Col>
                                        </Row>
                                    </li>
                                )
                            }
                        })
                    })}
                </ul>
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
        removeProduct: (value) => {
            dispatch({type: 'REMOVE_PRODUCT', value})
        },
        editWarehouse: (value) => {
            dispatch({type: 'CHANGE_WAREHOUSE', value})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProduct)
