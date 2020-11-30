import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'

function* addWarehouse(action) {
    yield delay(1000)
    try {
        yield put({ type: 'ADD_WAREHOUSE', value: action.value });
    } catch (e) {
    }
}
function* mySaga() {
    yield takeEvery("ADD_WAREHOUSE", addWarehouse);
}

export default mySaga;