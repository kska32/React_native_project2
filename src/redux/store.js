import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';

import reducer from "./reducers";
import {rootSaga} from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default createStore( reducer,  applyMiddleware(sagaMiddleware,
      //(store)=>(next)=>(action)=>{
      //          console.log('mymiddleware-action:',action);
      //          next(action);
      //}
));

sagaMiddleware.run(rootSaga);