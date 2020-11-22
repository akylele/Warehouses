import React, {useState} from 'react'
import {isMobile} from 'react-device-detect'

import Row from '../../basic/row'
import Col from '../../basic/col'
import Button from '../../basic/button'

import {initialState} from '../../../redux/reducers/products'

import '../../../style/productsList.scss'
import ModalEditProduct from "./modal";
import SwitchPage from "../../SwitchPage";

const ProductsList = () => {
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
                        {initialState && initialState.map((product, index) => (
                            <li className="collection-item" key={index}>
                                <Row>
                                    <Col styles="s2">
                                        <Row>
                                            <span>{product.name}</span>
                                        </Row>
                                    </Col>
                                    <Col styles="s2">
                                        {product.warehouses.map((warehouse, index) => (
                                            <Row key={index}>
                                                <span>{warehouse.address}</span>
                                            </Row>
                                        ))}
                                    </Col>
                                    <Col styles="s3">
                                        {product.warehouses.map((warehouse, index) => (
                                            <Row key={index}>
                                                <span>{warehouse.name}</span>
                                            </Row>
                                        ))}
                                    </Col>
                                    <Col styles="s2">
                                        {product.warehouses.map((warehouse, index) => (
                                            <Row key={index}>
                                                <span>{warehouse.quantity}</span>
                                            </Row>
                                        ))}
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

export default ProductsList