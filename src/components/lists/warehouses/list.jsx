import React from 'react'
import {isMobile} from "react-device-detect";

import Row from "../../basic/row";
import Col from "../../basic/col";
import Button from "../../basic/button";

const List = (props) => (
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
                                <input type="number" id={`quantityProduct${index}`} min={0}
                                       defaultValue={item.quantity}/>
                                <label>всего на складе: {item.quantity}</label>
                            </Col>
                            <Col styles="s3">
                                <Button>{props.type === 'add' ? 'Добавить' : 'Убрать'}</Button>
                            </Col>
                        </Row>
                    </li>
                ))}
            </ul>
        </div>
    </>
)

export default List