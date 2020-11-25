import React, {useEffect, useState} from 'react'
import {isMobile} from 'react-device-detect'
import {connect} from "react-redux";

import ModalEditWarehouse from './modal'
import Row from '../../basic/row'
import Col from '../../basic/col'
import Button from '../../basic/button'
import SwitchPage from "../../SwitchPage";

import '../../../style/warehouseList.scss'
import CreateProduct from "../products/createProduct";
import Swipe from "../../Swipe";
import CreateWarehouse from "./createWarehouse";


const WarehouseList = (props) => {
    const [modalContent, setModalContent] = useState(null)
    const [screenXStart, setScreenXStart] = useState()
    const [screenXEnd, setScreenXEnd] = useState()
    const [style, setStyle] = useState(100)


    useEffect(() => {
        console.log(screenXStart, screenXEnd)
        if (screenXStart && screenXEnd) {
            if (screenXStart > screenXEnd) {
                setStyle(0)
            } else if (screenXStart < screenXEnd) {
                if (screenXEnd - screenXStart > 100) {
                    setStyle(100)
                }
            } else {}
        }
    }, [screenXStart, screenXEnd])

    const handleModal = () => {
        setModalContent(null)
    }

    const onClose = () => {
        setStyle(100)
    }

    return (
        <div
            onTouchStart={event => {
                setScreenXStart(event.changedTouches[0].screenX)
                setScreenXEnd(null)
            }}
            onTouchEnd={event => setScreenXEnd(event.changedTouches[0].screenX)}
            style={{position: 'relative'}}
        >
            <div style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: `${style}%`,
                transitionDuration: '1s',
                zIndex: '10',
                backdropFilter: 'blur(10px)'
            }}>
                <CreateWarehouse onClose={onClose}/>
            </div>
            <Swipe/>
            {modalContent && <ModalEditWarehouse handleModal={handleModal} content={modalContent}/>}
            <div className={isMobile ? "main" : ""}>
                {!isMobile && <Row styles="titles">
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
                </Row>}
                <ul className="collection with-header">
                    {props.warehouses.length > 0 && props.warehouses.map((item, index) => (
                        <li className={`collection-item ${!(index % 2) ? '#e3f2fd blue lighten-5' : ''}`} key={index}>
                            {isMobile ? (
                                <div
                                    onClick={() => {
                                        setModalContent(item)
                                    }}
                                >
                                    <Row>
                                        <Col styles="s12">
                                            <h5>{item.name}</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col styles="s6">
                                            {item.products.map((product, index) => (
                                                <Row key={index}>
                                                    <span>{product.name}</span>
                                                    <hr/>
                                                </Row>
                                            ))}
                                        </Col>
                                        <Col styles="s6">
                                            {item.products.map((product, index) => (
                                                <Row key={index}>
                                                    <span>{product.quantity}</span>
                                                    <hr/>
                                                </Row>
                                            ))}
                                        </Col>
                                    </Row>
                                </div>
                            ) : (
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
                                        <Button onClick={() => {
                                            setModalContent(item)
                                        }}>
                                            Редактирование
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </li>
                    ))}
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseList)
