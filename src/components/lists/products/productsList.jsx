import React, {useState} from 'react'
import {isMobile} from 'react-device-detect'
import {connect} from "react-redux";

import Row from '../../basic/row'
import Col from '../../basic/col'
import Button from '../../basic/button'
import ModalEditProduct from "./modal";
import SwitchPage from "../../SwitchPage";

import '../../../style/productsList.scss'

const ProductsList = (props) => {
    const [modalContent, setModalContent] = useState(null)

    const handleModal = () => {
        setModalContent(null)
    }
    return (
        <>
            {modalContent && <ModalEditProduct handleModal={handleModal} content={modalContent}/>}
            <div>
                <SwitchPage/>
                <div className={isMobile ? "main" : ""}>
                    <Row styles="titles">
                        <Col styles="s2">
                            <span>Название</span>
                        </Col>
                        <Col styles="s2">
                            <span>Адрес</span>
                        </Col>
                        <Col styles="s3">
                            <span>Склад</span>
                        </Col>
                        <Col styles="s2">
                            <span>Количество</span>
                        </Col>
                        <Col styles="s3">
                            <span>Действие</span>
                        </Col>
                    </Row>
                    <ul className="collection">
                        {props.products.length > 0 && props.products.map((product, index) => (
                            <li className="collection-item" key={index}>
                                <Row>
                                    <Col styles="s2">
                                        <Row>
                                            <span>{product.name}</span>
                                        </Row>
                                    </Col>
                                    <Col styles="s2">
                                        {props.warehouses.map(warehouse => warehouse.products.map(prod => {
                                            if (prod.id === product.id) {
                                                return (
                                                    <Row key={index}>
                                                        <span>{warehouse.address}</span>
                                                    </Row>
                                                )
                                            }
                                        }))}
                                    </Col>
                                    <Col styles="s3">
                                        {props.warehouses.map(warehouse => warehouse.products.map(prod => {
                                            if (prod.id === product.id) {
                                                return (
                                                    <Row key={index}>
                                                        <span>{warehouse.name}</span>
                                                    </Row>
                                                )
                                            }
                                        }))
                                        }
                                    </Col>
                                    <Col styles="s2">
                                        {props.warehouses.map(warehouse => warehouse.products.map(prod => {
                                            if (prod.id === product.id) {
                                                return (
                                                    <Row key={index}>
                                                        <span>{prod.quantity}</span>
                                                    </Row>
                                                )
                                            }
                                        }))}
                                    </Col>
                                    <Col styles="s3">
                                        <Button
                                            onClick={() => {
                                                setModalContent(product)
                                            }}>
                                            Редактирование
                                        </Button>
                                    </Col>
                                </Row>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        products: state.productsReducer,
        warehouses: state.warehousesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
