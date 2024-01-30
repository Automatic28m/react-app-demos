// store/index.js
import { createStore, combineReducers } from 'redux';
import productReducer from '../reducers/productReducer';

const rootReducer = combineReducers({
  cart: productReducer,
  // ... other reducers
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
