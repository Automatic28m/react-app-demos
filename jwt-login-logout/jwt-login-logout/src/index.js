import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom'
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import App from './App';
import User from './User';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/user',
    element: <User />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
)
