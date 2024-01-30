import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import App from './App';
import User from './User';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';
import UserLogin from './components/UserLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/User/:user_id', // Use "/User" here, not "User"
    element: <User />
  },
  {
    path: '/AddUser', // Use "/User" here, not "User"
    element: <AddUser />
  },
  {
    path: 'EditUser/:user_id',
    element: <EditUser />
  },
  {
    path: '/UserLogin',
    element: <UserLogin/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
