import React, {useState} from 'react'
import {isMobile} from "react-device-detect";

import Row from "../../basic/row";
import Col from "../../basic/col";
import Button from "../../basic/button";

const List = (props) => {
    const [products, setProducts] = useState([])

    const selectQuantity = (item, value) => {
        if (products.length > 0 && products.filter(elem => elem.id === item.id).length > 0) {
            setProducts(products.map(elem => {
                if (elem.id === item.id) {
                    elem = {...elem, quantity: value}
                }

                return elem
            }))
        } else {
            setProducts(products.concat({
                ...item, quantity: value
            }))
        }
    }

    return (
        <>
            {props.title && <h5>{props.title}</h5>}
            <div className={isMobile ? "main" : ''}>
                <Row styles="titles">
                    <Col styles="s3">
                        <span>Название</span>
                    </Col>
                    <Col styles="s3">
                        <span>Количество на складе</span>
                    </Col>
                    <Col styles="s3">
                        <span>Убрать со склада (данное действие приведет к переносу товара в нераспределенный склад)</span>
                    </Col>
                    <Col styles="s3">
                        <span>Действие</span>
                    </Col>
                </Row>
                <ul className="collection">
                    {props.items.map((item, index) => (
                        <li className="collection-item" key={index}>
                            <Row>
                                <Col styles="s3">
                                    <Row>
                                        <span>{item.name}</span>
                                    </Row>
                                </Col>
                                <Col styles="s3">
                                    <Row>
                                        <span>{item.quantity}</span>
                                    </Row>
                                </Col>
                                <Col styles="s3">
                                    <input type="number" id={`quantityProduct${index}`} min={1} max={item.quantity}
                                           defaultValue={0}
                                           onChange={(e) => selectQuantity(item, e.target.value)}/>
                                    <label>всего на складе: {item.quantity}</label>
                                </Col>
                                <Col styles="s3">
                                    <Button
                                        onClick={props.type === 'add' ? () => props.onAdd(products.filter(elem => elem.id === item.id).pop()) : ''}
                                        disabled={!products.filter(elem => elem.id === item.id).length > 0}
                                    >
                                        {props.type === 'add' ? 'Добавить' : 'Убрать'}
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

export default List