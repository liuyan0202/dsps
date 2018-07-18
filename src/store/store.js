import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
let sagaMiddleware = createSagaMiddleware()
let store = createStore(reducer,applyMiddleware(logger),applyMiddleware(sagaMiddleware))
//类似于事件监听
sagaMiddleware.run(sagas)
export default store