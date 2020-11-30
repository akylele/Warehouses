import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import configureStore from './redux/store'

const store = configureStore;

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import {Provider} from 'react-redux'
// import createSagaMiddleware from 'redux-saga'
// import { createStore, applyMiddleware } from 'redux'
//
// import App from './App';
//
// import reducer from './redux/reducers'
// import reportWebVitals from './reportWebVitals';
// import mySaga from './redux/sagas/sagas'
//
// import configureStore from './redux/store'
//
// import './index.css';
//
// const sagaMiddleware = createSagaMiddleware()
//
// const store = createStore(
//     reducer,
//     applyMiddleware(sagaMiddleware)
// )
//
// // sagaMiddleware.run(mySaga)
//
// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <App/>
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById('root')
// );
//
// reportWebVitals();



