import React, {useState} from 'react'
import {isMobile} from 'react-device-detect'

import ModalEditWarehouse from './modal'
import Row from '../../basic/row'
import Col from '../../basic/col'
import Button from '../../basic/button'

import {initialState} from '../../../redux/reducers/warehouse'

import '../../../style/warehouseList.scss'
import SwitchPage from "../../SwitchPage";

const WarehouseList = () => {
    const [modalContent, setModalContent] = useState(null)

    const handleModal = () => {
        setModalContent(null)
    }

    return (
        <>
            {modalContent && <ModalEditWarehouse handleModal={handleModal} content={modalContent}/>}
            <SwitchPage/>
            <div className={isMobile ? "main" : ""}>
                <Row styles="titles">
                    <Col styles="s3">
                        <span>Название</span>
                    </Col>
                    <Col styles="s3">
                        <span>Товары на складе</span>
                    </Col>
                    <Col styles="s3">
                        <span>Количество товаров на складе</span>
                    </Col>
                    <Col styles="s3">
                        <span>Действие</span>
                    </Col>
                </Row>
                    <ul className="collection with-header">
                        {initialState && initialState.map((item, index) => (
                            <li className="collection-item" key={index}>
                                <Row>
                                    <Col styles="s3">
                                        <span>{item.name}</span>
                                    </Col>
                                    <Col styles="s3">
                                        {item.products.map((product, index) => (
                                            <Row key={index}>
                                                <span>{product.name}</span>
                                            </Row>
                                        ))}
                                    </Col>
                                    <Col styles="s3">
                                        {item.products.map((product, index) => (
                                            <Row key={index}>
                                                <span>{product.quantity}</span>
                                            </Row>
                                        ))}
                                    </Col>
                                    <Col styles="s3">
                                        <Button onClick={() => {setModalContent(item)}}>
                                            Редактирование
                                        </Button>
                                    </Col>
                                </Row>
                            </li>
                        ))}
                    </ul>
            </div>
        </>
    )
}

export default WarehouseList