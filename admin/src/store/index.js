import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as reducers from './reducer';

const middleware = [thunk];
const store = createStore(combineReducers(reducers), applyMiddleware(...middleware));

export default store