import React from 'react'
import {connect} from 'react-redux';

import SwitchPage from "../../SwitchPage";
import Row from "../../basic/row";
import Col from "../../basic/col";
import Button from "../../basic/button";

import '../../../style/createProduct.scss'

const CreateProduct = (props) => {
    return (
        <>
            <SwitchPage/>
            <Row styles="centerRow">
                <Col styles="input-field s3">
                    <input type="text"/>
                    <label>Название</label>
                </Col>
                <Col styles="s3">
                    <select style={{display: 'block'}}>
                        <option value="empty" key={0} selected></option>
                        {props.warehouses.length > 0 && props.warehouses.map((warehouse, index) => (
                            <option value={warehouse.name}
                                    key={index + 1}>{warehouse.name} ( {warehouse.address} )</option>
                        ))}
                    </select>
                </Col>
                <Col styles="input-field s3">
                    <input type="number"/>
                    <label>Количество</label>
                </Col>
                <Col styles="s3">
                    <Button>Создать</Button>
                </Col>
            </Row>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)
