import React, {useState} from 'react'
import {isMobile} from 'react-device-detect'

import {initialState} from '../../../redux/reducers/warehouse'

import Row from '../../basic/row'
import Col from '../../basic/col'
import Button from '../../basic/button'

import '../../../style/modal.scss'
import List from "./list";

const ModalEditWarehouse = (props) => {
    const [fields, setFields] = useState({})

    const OwnerWarehouse = initialState && initialState.filter(elem => elem.name === 'Нераспределенный склад 1')

    const handleChange = (field, value) => {
        switch (field) {
            case 'name':
                setFields({...fields, [field]: value})
                break;
            case 'address':
                setFields({...fields, [field]: value})
                break;
            default:
                break;
        }
    }

    return (
        <div className="modal open">
            <div className="modal-content">
                <h4>Редактирование склада "{props.content.name}"</h4>
            </div>
            {isMobile ? (
                <>
                    <Row>
                        <Col styles="s6">
                            <input defaultValue={props.content.name} id="name" type="text" className="validate"
                                   onChange={(e) => handleChange('name', e.target.value)}/>
                        </Col>
                        <Col styles="s6">
                            <input defaultValue={props.content.address} id="address" type="text"
                                   className="validate"
                                   onChange={(e) => handleChange('name', e.target.value)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col styles="s6">
                            <Button onClick={() => props.handleModal()} styles="red">Отмена</Button>
                        </Col>
                        <Col styles="s6">
                            <Button onClick={() => props.handleModal()}>Сохранить</Button>
                        </Col>
                    </Row>
                </>
            ) : (
                <Row>
                    <Col styles="s2">
                        <input defaultValue={props.content.name} id="name" type="text" className="validate"
                               onChange={(e) => handleChange('name', e.target.value)}/>
                        <label className="active" htmlFor="first_name2">{props.content.name}</label>
                    </Col>
                    <Col styles="s2">

                        <input defaultValue={props.content.address} id="address" type="text" className="validate"
                               onChange={(e) => handleChange('name', e.target.value)}/>
                        <label className="active" htmlFor="first_name2">{props.content.address}</label>
                    </Col>
                    <Col styles="s2">&nbsp;</Col>
                    <Col styles="s6">
                        <Row>
                            <Button onClick={() => props.handleModal()} styles="red margin">Отмена</Button>
                            <Button onClick={() => props.handleModal()} styles="margin">Сохранить</Button>
                        </Row>
                    </Col>
                </Row>
            )}
            <div>
                <h5>Продукты</h5>
                <List items={props.content.products}/>
                {OwnerWarehouse.length > 0 && <List items={OwnerWarehouse[0].products}
                                                    title="Вы можете добавить товары из нераспределенного склада в этот склад"/>}
            </div>
        </div>
    )
}

export default ModalEditWarehouse