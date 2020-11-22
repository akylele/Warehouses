import React, {useState} from 'react'
import {isMobile} from 'react-device-detect'
import {connect} from "react-redux";

import ModalEditWarehouse from './modal'
import Row from '../../basic/row'
import Col from '../../basic/col'
import Button from '../../basic/button'
import SwitchPage from "../../SwitchPage";

import '../../../style/warehouseList.scss'


const WarehouseList = (props) => {
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
                        {props.warehouses.length > 0 && props.warehouses.map((item, index) => (
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

function mapStateToProps(state) {
    return {
        warehouses: state.warehousesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseList)
