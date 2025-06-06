import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import reducer from './reducers/productReducer'
import App from './App'
import ShoppingCart from './ShoppingCart'
import store from './store/index';

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/ShoppingCart',
    element: <ShoppingCart/>
  }
])

render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById('root')
)