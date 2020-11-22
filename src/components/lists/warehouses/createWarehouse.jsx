import React from 'react'
import {connect} from "react-redux";

import SwitchPage from "../../SwitchPage";
import Row from "../../basic/row";
import Col from "../../basic/col";
import Button from "../../basic/button";
import List from "./list";

const CreateWarehouse = (props) => {
    const OwnerWarehouse = props.warehouses.length > 0 && props.warehouses.filter(elem => elem.name === 'Нераспределенный склад 1')

    return (
        <>
            <SwitchPage/>
            <Row styles="centerRow">
                <Col styles="input-field s4">
                    <input type="text"/>
                    <label>Название</label>
                </Col>
                <Col styles="input-field s4">
                    <input type="text"/>
                    <label>Адрес</label>
                </Col>
                <Col styles="s4">
                    <Button>Создать</Button>
                </Col>
            </Row>
            {OwnerWarehouse.length > 0 && <List items={OwnerWarehouse[0].products} type="add" title="Вы можете добавить товары из нераспределенного склада в этот склад"/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateWarehouse)
