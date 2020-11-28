import React, {useEffect, useState} from 'react'
import {isMobile, isTablet} from 'react-device-detect'
import {connect} from "react-redux";

import Button from '../../basic/button'
import ModalEditProduct from "./modal";
import Toast from "../../../helpers/toast";
import Swipe from "../../Swipe";
import Row from '../../basic/row'
import Col from '../../basic/col'

import '../../../style/productsList.scss'
import {Link} from "react-router-dom";
import CreateProduct from "./createProduct";


const ProductsList = (props) => {
    const [modalContent, setModalContent] = useState(null)
    const [screenXStart, setScreenXStart] = useState()
    const [screenXEnd, setScreenXEnd] = useState()
    const [style, setStyle] = useState(100)


    useEffect(() => {
        if (screenXStart && screenXEnd) {
            if (screenXStart > screenXEnd) {
                setStyle(0)
            } else if (screenXStart < screenXEnd) {
                if (screenXEnd - screenXStart > 100) {
                    setStyle(100)
                }
            }
        }
    }, [screenXStart, screenXEnd])

    const handleModal = () => {
        setModalContent(null)
    }

    useEffect(() => {
        if (isMobile) {
            Toast('Для редактирования нажмите на блок')
        }
    }, [])

    const onClose = () => {
        setStyle(100)
    }

    return (
        <>
            {modalContent && <ModalEditProduct handleModal={handleModal} content={modalContent}/>}
            {!isMobile && <Row styles="right">
                <Link to="/create_product">
                    <Col>
                        <Button>
                            Создать продукт
                        </Button>
                    </Col>
                </Link>
            </Row>}
            <div
                onTouchStart={event => {
                    setScreenXStart(event.changedTouches[0].screenX)
                    setScreenXEnd(null)
                }}
                onTouchEnd={event => setScreenXEnd(event.changedTouches[0].screenX)}
                style={{position: 'relative'}}
            >
                {(isMobile || isTablet) && (
                    <>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            left: `${style}%`,
                            transitionDuration: '1s',
                            zIndex: '10',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <CreateProduct onClose={onClose}/>
                        </div>
                        <Swipe/>
                    </>
                )}
                <div>
                    {!isMobile && (
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
                    )}
                    <ul className="collection">
                        {props.products.length > 0 && props.products.map((product, index) => (
                            <li className={`collection-item ${!(index % 2) ? '#e3f2fd blue lighten-5' : ''}`}
                                key={index}>
                                {isMobile ? (
                                    <div
                                        onClick={() => {
                                            setModalContent(product)
                                        }}
                                    >
                                        <Row>
                                            <Col styles="s12">
                                                <h5>{product.name}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col styles="s6">
                                                {props.warehouses.map(warehouse => warehouse.products.map(prod => prod.id === product.id && (
                                                    <Row key={index}>
                                                        <span>{warehouse.address}</span>
                                                    </Row>
                                                )))}
                                            </Col>
                                            <Col styles="s4">
                                                {props.warehouses.map(warehouse => warehouse.products.map(prod => prod.id === product.id &&
                                                    <Row key={index}>
                                                        <span>{warehouse.name}</span>
                                                    </Row>
                                                ))
                                                }
                                            </Col>
                                            <Col styles="s2">
                                                {props.warehouses.map(warehouse => warehouse.products.map(prod => prod.id === product.id &&
                                                    <Row key={index}>
                                                        <span>{prod.quantity}</span>
                                                    </Row>
                                                ))}
                                            </Col>
                                        </Row>
                                    </div>
                                ) : (
                                    <Row>
                                        <Col styles="s2">
                                            <Row>
                                                <span>{product.name}</span>
                                            </Row>
                                        </Col>
                                        <Col styles="s2">
                                            {props.warehouses.map(warehouse => warehouse.products.map(prod => prod.id === product.id &&
                                                <Row key={index}>
                                                    <span>{warehouse.address}</span>
                                                </Row>
                                            ))}
                                        </Col>
                                        <Col styles="s3">
                                            {props.warehouses.map(warehouse => warehouse.products.map(prod => prod.id === product.id &&
                                                <Row key={index}>
                                                    <span>{warehouse.name}</span>
                                                </Row>
                                            ))}
                                        </Col>
                                        <Col styles="s2">
                                            {props.warehouses.map(warehouse => warehouse.products.map(prod => prod.id === product.id &&
                                                <Row key={index}>
                                                    <span>{prod.quantity}</span>
                                                </Row>
                                            ))}
                                        </Col>
                                        <Col styles="s3">
                                            <Row>
                                                <Button
                                                    onClick={() => {
                                                        setModalContent(product)
                                                    }}>
                                                    Редактирование
                                                </Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                )}

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
