import React, {useState} from 'react'
import {isMobile} from 'react-device-detect'
import {connect} from "react-redux";

import Toast from "../../../helpers/toast";
import Row from '../../basic/row'
import Col from '../../basic/col'
import Button from '../../basic/button'

import '../../../style/modal.scss'

const ModalEditProduct = (props) => {
    const [fields, setFields] = useState({})

    const handleChange = (field, value) => {
        switch (field) {
            case 'name':
                setFields({...fields, [field]: value})
                break;
            default:
                break
        }
    }

    const handleChangeSelect = (item, value) => {
        if (item.name === value) {
            return Toast(`Товар уже находится в этом складе`)
        }
        Toast(`"${item.name}" --> "${value}", чтобы перенести нажмите "Перенести"`)
    }

    return (
        <div className="modal open">
            <div className="modal-content">
                <h4>Редактирование продукта "{props.content.name}"</h4>
            </div>
            <Row>
                {isMobile ? (
                    <>
                        <Row>
                            <Col styles="s12">
                                <input defaultValue={props.content.name} id="name" type="text" className="validate"
                                       onChange={(e) => handleChange('name', e.target.value)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col styles="s6">
                                <Button onClick={() => props.handleModal()}>Отмена</Button>
                            </Col>
                            <Col styles="s6">
                                <Button onClick={() => props.handleModal()} styles="green">Сохранить</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col styles="s12">
                                <Button onClick={() => props.handleModal()} styles="red">Удалить</Button>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <Col styles="s2">
                            <input
                                defaultValue={props.content.name}
                                id="name"
                                type="text"
                                className="validate"
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                            <label className="active" htmlFor="first_name2">{props.content.name}</label>
                        </Col>
                        <Col styles="s4">&nbsp;</Col>
                        <Col styles="s6">
                            <Row>
                                <Button onClick={() => props.handleModal()} styles="margin">Отмена</Button>
                                <Button onClick={() => props.handleModal()} styles="margin green">Сохранить</Button>
                                <Button onClick={() => props.handleModal()} styles="margin red">Удалить</Button>
                            </Row>
                        </Col>
                    </>
                )}
            </Row>
            <Row>
                <h5>Склады</h5>
            </Row>
            <div className={isMobile ? "main" : ''}>
                <Row>
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
                        {console.log(props.content)}
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
                                                        defaultValue={product.quantity}
                                                    />
                                                    <label>всего на складе: {product.quantity}</label>
                                                </Col>
                                                <Col styles="s2">
                                                    <select style={{display: 'block'}}
                                                            onChange={(e) => handleChangeSelect(warehouse, e.target.value)}>
                                                        <option value="empty" key={0} selected></option>
                                                        {props.warehouses.length > 0 && props.warehouses.map((warehouse, index) => (
                                                            <option value={warehouse.name}
                                                                    key={index + 1}>{warehouse.name}</option>
                                                        ))}
                                                    </select>
                                                </Col>
                                                <Col styles="s2">
                                                    <Button>Перенести</Button>
                                                    <Button>Добавить</Button>
                                                    <Button>Убрать</Button>
                                                </Col>
                                            </Row>
                                        </li>
                                    )
                                }
                            })
                        })}
                    </ul>
                </Row>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProduct)
