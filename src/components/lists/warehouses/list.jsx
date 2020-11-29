import React, {useState} from 'react'
import {isMobile} from 'react-device-detect'

import Row from "../../basic/row";
import Col from "../../basic/col";
import Button from "../../basic/button";

const List = (props) => {
    const [products, setProducts] = useState([])
    const [disabled, setDisabled] = useState([])
    const isGeneral = props.warehouseTitle === 'Общий склад'

    const selectQuantity = (item, value) => {
        if (products.length > 0 && products.filter(elem => elem.id === item.id).length > 0) {
            setProducts(products.map(elem => {
                if (elem.id === item.id) {
                    elem = {...elem, quantity: value}
                }

                return elem
            }))
        } else {
            if (props.type === 'remove') {
                setProducts(products.concat({
                    ...item, quantity: value
                }))
            } else {
                setProducts(products.concat({
                    ...item, quantity: value
                }))
            }
        }
    }

    const handleWarehouse = (item, index) => {
        setDisabled(disabled.concat(index))
        if (props.type === 'remove') {
            props.onRemove(products.filter(elem => elem.id === item.id).pop())
        } else {
            props.onAdd(products.filter(elem => elem.id === item.id).pop())
        }

    }


    return (
        <>
            {props.title && <h5>{props.title}</h5>}
            <div>
                {!isMobile && <Row styles="titles">
                    <Col styles={isGeneral ? 's6' : 's3'}>
                        <span>Название</span>
                    </Col>
                    <Col styles={isGeneral ? 's6' : 's3'}>
                        <span>Количество</span>
                    </Col>
                    {!isGeneral &&
                    <>
                        <Col styles="s3">
                            <span>{props.type === 'add' ? 'Добавить из общего' : 'Убрать в общий'}</span>
                        </Col>
                        <Col styles="s3">
                            <span>Действие</span>
                        </Col>
                    </>
                    }
                </Row>}
                <ul className="collection">
                    {props.items.map((item, index) => (
                        <li className="collection-item" key={index}>
                            <Row>
                                <Col styles={isGeneral ? 's6' : 's3'}>
                                    <Row>
                                        <span>{item.name}</span>
                                    </Row>
                                </Col>
                                <Col styles={isGeneral ? 's6' : 's3'}>
                                    <Row>
                                        <span>{item.quantity}</span>
                                    </Row>
                                </Col>
                                {!isGeneral &&
                                <>
                                    <Col styles="s3">
                                        <input
                                            type="number"
                                            id={`quantityProduct${index}`}
                                            min={1}
                                            max={item.quantity}
                                            onChange={(e) => selectQuantity(item, Number(e.target.value))}
                                            disabled={props.disabled}
                                        />
                                        <label>всего на складе: {item.quantity}</label>
                                    </Col>
                                    <Col styles="s3">
                                        <Button
                                            onClick={() => handleWarehouse(item, index)}
                                            disabled={!products.filter(elem => elem.id === item.id).length > 0 || disabled.includes(index)}
                                        >
                                            {props.type === 'add' ? 'Добавить' : 'Убрать'}
                                        </Button>
                                    </Col>
                                </>
                                }
                            </Row>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default List