import React, {useEffect, useState} from 'react'
import {isMobile, isTablet} from 'react-device-detect'
import {connect} from "react-redux";

import ModalEditWarehouse from './modal'
import Row from '../../basic/row'
import Col from '../../basic/col'
import Button from '../../basic/button'

import '../../../style/warehouseList.scss'
import Swipe from "../../Swipe";
import CreateWarehouse from "./createWarehouse";
import Toast from "../../../helpers/toast";
import {Link} from "react-router-dom";


const WarehouseList = (props) => {
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

    useEffect(() => {
        if (isMobile) {
            Toast('Для редактирования нажмите на блок')
        }
    }, [])

    const handleModal = () => {
        setModalContent(null)
    }

    const onClose = () => {
        setStyle(100)
    }

    return (
        <>
            {modalContent && <ModalEditWarehouse handleModal={handleModal} content={modalContent}/>}
            {!isMobile && <Row styles="right">
                <Link to="/create_warehouse">
                    <Col>
                        <Button>
                            Создать склад
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
                            <CreateWarehouse onClose={onClose}/>
                        </div>
                        <Swipe/>
                    </>
                )}
                <div>
                    {!isMobile && <Row styles="titles">
                        <Col styles="s3">
                            <span>Название</span>
                        </Col>
                        <Col styles="s2">
                            <span>Адрес</span>
                        </Col>
                        <Col styles="s2">
                            <span>Товар</span>
                        </Col>
                        <Col styles="s2">
                            <span>Количество</span>
                        </Col>
                        <Col styles="s3">
                            <span>Действие</span>
                        </Col>
                    </Row>}
                    <ul className="collection with-header">
                        {props.warehouses.length > 0 && props.warehouses.map((item, index) => (
                            <li className={`collection-item ${!(index % 2) ? '#e3f2fd blue lighten-5' : ''}`}
                                key={index}>
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
                                            <Col styles="s12">
                                                <h5>{item.address}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col styles="s6">
                                                {item.products.map((product, index) => (
                                                    <Row key={index}>
                                                        <span>{product.name}</span>
                                                    </Row>
                                                ))}
                                            </Col>
                                            <Col styles="s6">
                                                {item.products.map((product, index) => (
                                                    <Row key={index}>
                                                        <span>{product.quantity}</span>
                                                    </Row>
                                                ))}
                                            </Col>
                                        </Row>
                                    </div>
                                ) : (
                                    <Row>
                                        <Col styles="s3">
                                            <Row>
                                                <span>{item.name}</span>
                                            </Row>
                                        </Col>
                                        <Col styles="s2">
                                            <Row>
                                                <span>{item.address}</span>
                                            </Row>
                                        </Col>
                                        <Col styles="s2">
                                            {item.products.map((product, index) => (
                                                <Row key={index}>
                                                    <span>{product.name}</span>
                                                </Row>
                                            ))}
                                        </Col>
                                        <Col styles="s2">
                                            {item.products.map((product, index) => (
                                                <Row key={index}>
                                                    <span>{product.quantity}</span>
                                                </Row>
                                            ))}
                                        </Col>
                                        <Col styles="s3">
                                            <Row>
                                                <Button onClick={() => {
                                                    setModalContent(item)
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
        warehouses: state.warehousesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseList)
