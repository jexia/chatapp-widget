import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from "./reducers/combined";
import rootSaga  from "./sagas/index";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
