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
    const [disabled, setDisabled] = useState([])
    const generalWarehouse = props.warehouses.length > 0 && props.warehouses.filter(elem => elem.name === 'Общий склад').pop()

    useEffect(() => {
        setFields({
            name: props.content.name,
            products: props.warehouses.map(warehouse => ({
                ...warehouse.products.filter(prod => prod.id === props.content.id).pop(),
                quantity: 0,
                warehouseId: warehouse.id
            }))
        })
    }, [])

    const handleChangeName = (value) => {
        setFields({...fields, name: value})
    }

    const handleChangeSelect = (warehouse, intoWarehouse) => {
        if (warehouse.id === intoWarehouse) {
            return Toast(`Товар уже находится в этом складе`)
        } else {
            setFields(prev => ({
                ...prev,
                products: prev.products.map(prod => {
                    if (prod.warehouseId === warehouse.id) {
                        prod = {
                            ...prod,
                            into: Number(intoWarehouse)
                        }
                    }
                    return prod
                })
            }))
        }
        // Toast(`"${warehouse.name}" --> "${intoWarehouse === generalWarehouse.id ? 'Общий' : intoWarehouse}", чтобы перенести нажмите "Перенести"`)
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
    console.log(fields.products)

    const handleTransfer = (indexProduct) => {
        if (!fields.products[indexProduct].into) {
            return Toast('Выберите склад отличающийся от нынешнего')
        }
        if (fields.products[indexProduct].quantity > 0) {

            setFields(prev => ({
                ...prev,
                products: prev.products.map((prod, index) => {
                    if (index === indexProduct) {
                        prod = {
                            ...prod,
                            type: 'transfer',
                        }
                    }
                    return prod
                })
            }))

            setDisabled(disabled.concat(indexProduct))
        } else {
            Toast('Вы не выбрали количество')
        }
    }

    const handleAdd = (indexProduct, product) => {
        if (fields.products[indexProduct].quantity > 0) {

            setFields(prev => ({
                ...prev,
                products: prev.products.map((prod, index) => {
                    if (index === indexProduct) {
                        prod = {
                            ...prod,
                            type: 'add',
                        }
                    }
                    return prod
                })
            }))

            setDisabled(disabled.concat(indexProduct))
        } else {
            Toast('Вы не выбрали количество')
        }

    }

    const handleRemove = (indexProduct, product) => {
        if (fields.products[indexProduct].quantity > 0) {

            setFields(prev => ({
                ...prev,
                products: prev.products.map((prod, index) => {
                    if (index === indexProduct) {
                        prod = {
                            ...prod,
                            type: 'remove',
                        }
                    }
                    return prod
                })
            }))

            setDisabled(disabled.concat(indexProduct))
        } else {
            Toast('Вы не выбрали количество')
        }
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

    const handleSave = () => {
        fields.products.map(elem => {
            let findWarehouse
            switch (elem.type) {
                case 'add':
                    findWarehouse = props.warehouses.filter(el => el.id === elem.warehouseId).pop()
                    props.editWarehouse({
                        ...findWarehouse,
                        products: findWarehouse.products.map(prod => {
                            if (prod.id === elem.id) {
                                prod = {
                                    ...prod,
                                    quantity: prod.quantity + elem.quantity
                                }
                            }
                            return prod
                        })
                    })
                    break;
                case 'remove':
                    findWarehouse = props.warehouses.filter(el => el.id === elem.warehouseId).pop()
                    props.editWarehouse({
                        ...findWarehouse,
                        products: findWarehouse.products.map(prod => {
                            if (prod.id === elem.id) {
                                prod = {
                                    ...prod,
                                    quantity: prod.quantity - elem.quantity
                                }
                            }
                            return prod
                        })
                    })
                    break;
                case 'transfer':
                    findWarehouse = props.warehouses.filter(el => el.id === elem.warehouseId).pop()
                    const findIntoWarehouse = props.warehouses.filter(el => el.id === elem.into).pop()
                    props.editWarehouse({
                        ...findWarehouse,
                        products: findWarehouse.products.map(prod => {
                            if (prod.id === elem.id) {
                                prod = {
                                    ...prod,
                                    quantity: prod.quantity - elem.quantity
                                }
                            }
                            return prod
                        })
                    })
                    props.editWarehouse({
                        ...findIntoWarehouse,
                        products: findIntoWarehouse.products.map(prod => {
                            if (prod.id === elem.id) {
                                prod = {
                                    ...prod,
                                    quantity: prod.quantity + elem.quantity
                                }
                            }
                            return prod
                        })
                    })
                    break
            }
        })

        props.handleModal()
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
                        <Button onClick={() => handleSave()} styles="green">
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
                        <Row styles="right">
                            <Button onClick={() => props.handleModal()} styles="margin">Отмена</Button>
                            <Button onClick={() => handleSave()} styles="margin green">Сохранить</Button>
                            <Button onClick={() => handleDelete()} styles="margin red">Удалить</Button>
                        </Row>
                    </Col>
                </Row>
            )}
            <h5>Склады</h5>
            <div>
                {!isMobile && <Row styles="titles">
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
                </Row>}
                <ul className="collection">
                    {props.warehouses.map((warehouse, index) => {
                        return warehouse.products.map(product => {
                            if (product.id === props.content.id) {
                                return (
                                    <li className="collection-item">
                                        {isMobile ? (
                                            <>
                                                <Row>
                                                    <Col styles="s6">
                                                        <span>{warehouse.name}</span>
                                                    </Col>
                                                    <Col styles="s6">
                                                        <span>{warehouse.address}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col styles="s7">
                                                        <input
                                                            type="number"
                                                            id={`quantityProduct${index}`}
                                                            min={0}
                                                            max={product.quantity}
                                                            defaultValue={0}
                                                            onChange={(e) => handleChangeProduct(warehouse.id, product, Number(e.target.value))}
                                                        />
                                                        <label>всего на складе: {product.quantity}</label>
                                                    </Col>
                                                    <Col styles="s5">
                                                        <select
                                                            style={{display: 'block'}}
                                                            onChange={(e) => handleChangeSelect(warehouse, Number(e.target.value))}
                                                        >
                                                            <option value={0} key={0}></option>
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
                                                </Row>
                                                <Row>
                                                    <Col styles="s4">
                                                        <Button
                                                            onClick={() => handleTransfer(index)}
                                                            disabled={disabled.includes(index)}
                                                        >
                                                            Перенести
                                                        </Button>
                                                    </Col>
                                                    <Col styles="s4">
                                                        <Button
                                                            onClick={() => handleAdd(index, product)}
                                                            disabled={disabled.includes(index)}
                                                        >
                                                            Добавить
                                                        </Button>
                                                    </Col>
                                                    <Col styles="s4">
                                                        <Button
                                                            onClick={() => handleRemove(index, product)}
                                                            disabled={disabled.includes(index)}
                                                        >
                                                            Убрать
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : (
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
                                                        defaultValue={0}
                                                        onChange={(e) => handleChangeProduct(warehouse.id, product, Number(e.target.value))}
                                                    />
                                                    <label>всего на складе: {product.quantity}</label>
                                                </Col>
                                                <Col styles="s2">
                                                    <select
                                                        style={{display: 'block'}}
                                                        onChange={(e) => handleChangeSelect(warehouse, Number(e.target.value))}
                                                    >
                                                        <option value={0} key={0}></option>
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
                                                    <Button
                                                        onClick={() => handleTransfer(index)}
                                                        disabled={disabled.includes(index)}
                                                    >
                                                        Перенести
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleAdd(index, product)}
                                                        disabled={disabled.includes(index)}
                                                    >
                                                        Добавить
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleRemove(index, product)}
                                                        disabled={disabled.includes(index)}
                                                    >
                                                        Убрать
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )}
                                    </li>
                                )
                            } else {
                                return null
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
        warehouses: state.warehousesReducer,
        products: state.productsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeProduct: (value) => {
            dispatch({type: 'REMOVE_PRODUCT', value})
        },
        editWarehouse: (value) => {
            dispatch({type: 'CHANGE_WAREHOUSE', value})
        },
        editProduct: (value) => {
            dispatch({type: 'CHANGE_PRODUCT', value})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProduct)
