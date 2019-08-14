import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers'; // Our Reducers
import rootSaga from '../sagas'; // Our Sagas


// Setup Redux-Saga
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
   reducers,
   composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Initiate the root saga.
sagaMiddleware.run(rootSaga);

export default store;